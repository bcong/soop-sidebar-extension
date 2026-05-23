import { GM_xmlhttpRequest, GM_setValue, GM_getValue } from "vite-plugin-monkey/dist/client";
import { customLog } from "./index";
import type { I_CategoryData } from "@Types/index.d";

// ===========================
// in-flight 중복 요청 방지
// ===========================
const _fetchInFlight = new Map<string, Promise<any>>();

const _isPerChannelUrl = (url: string): boolean => /\/channels\/[0-9a-f]{32}\//i.test(url);

const _parseAndValidateCache = (cachedDataString: string | null, expiryMs: number): any | null => {
    if (!cachedDataString) return null;
    try {
        const { timestamp, data } = JSON.parse(cachedDataString);
        if (Date.now() - timestamp < expiryMs) return data;
    } catch (e) {
        customLog.warn("Cache parse error, ignoring.", e);
    }
    return null;
};

// ===========================
// 공통 fetch 함수 (캐시 포함)
// ===========================
export const fetchBroadList = async (url: string, expiry_seconds = 50, timeout = 0): Promise<any> => {
    const CACHE_EXPIRY_MS = expiry_seconds * 1000;
    const cacheKey = `fetchCache_${encodeURIComponent(url)}`;
    const skipGM = _isPerChannelUrl(url);

    // 1. LocalStorage 확인
    const localData = _parseAndValidateCache(localStorage.getItem(cacheKey), CACHE_EXPIRY_MS);
    if (localData) {
        return localData;
    }

    // 2. GM 저장소 확인
    if (!skipGM) {
        const gmDataString = await GM_getValue<string | null>(cacheKey, null);
        const gmData = _parseAndValidateCache(gmDataString, CACHE_EXPIRY_MS);
        if (gmData) {
            if (gmDataString) localStorage.setItem(cacheKey, gmDataString);
            return gmData;
        }
    }

    // 3. 동일 URL 중복 요청 방지
    if (_fetchInFlight.has(cacheKey)) {
        return _fetchInFlight.get(cacheKey)!;
    }

    // 4. 실제 요청
    const fetchPromise = new Promise<any>((resolve) => {
        let timeoutId: ReturnType<typeof setTimeout> | undefined;

        if (timeout) {
            timeoutId = setTimeout(() => {
                customLog.error(url, `Request timed out after ${timeout} ms`);
                console.error(`[SOOP API] 타임아웃 (${timeout}ms):`, url);
                // inflight 유지: 실제 응답이 도착하면 onload에서 캐시에 저장됨
                resolve([]);
            }, timeout);
        }

        GM_xmlhttpRequest({
            method: "GET",
            url,
            headers: { "Content-Type": "application/json" },
            onload: async (response) => {
                if (timeoutId) clearTimeout(timeoutId);
                _fetchInFlight.delete(cacheKey);

                try {
                    if (response.status >= 200 && response.status < 300) {
                        const jsonResponse = JSON.parse(response.responseText);

                        if (jsonResponse?.RESULT === -1 || (jsonResponse?.code && jsonResponse.code < 0)) {
                            customLog.error(url, `API Error: ${jsonResponse.MSG || jsonResponse.message}`);
                            console.error(
                                `[SOOP API] API 오류 (RESULT=${jsonResponse?.RESULT ?? jsonResponse?.code}):`,
                                url,
                                jsonResponse,
                            );
                            localStorage.removeItem(cacheKey);
                            if (!skipGM) await GM_setValue(cacheKey, undefined);
                            resolve([]);
                        } else {
                            const cacheData = JSON.stringify({
                                timestamp: Date.now(),
                                data: jsonResponse,
                            });
                            localStorage.setItem(cacheKey, cacheData);
                            if (!skipGM) await GM_setValue(cacheKey, cacheData);
                            resolve(jsonResponse);
                        }
                    } else if (response.status === 401) {
                        customLog.error(url, "Unauthorized: 401 error");
                        resolve([]);
                    } else {
                        customLog.error(url, `Error: ${response.status}`);
                        resolve([]);
                    }
                } catch (error) {
                    customLog.error(url, "Parsing error: ", error);
                    resolve([]);
                }
            },
            onerror: (error) => {
                if (timeoutId) clearTimeout(timeoutId);
                _fetchInFlight.delete(cacheKey);
                customLog.error(url, "Request error: " + error);
                resolve([]);
            },
        });
    });

    _fetchInFlight.set(cacheKey, fetchPromise);
    return fetchPromise;
};

// ===========================
// SOOP API 함수들
// ===========================

export const fetchFavoriteGroups = async () => {
    const response = await fetchBroadList("https://myapi.sooplive.com/api/favorite/group/list", 50);
    return response?.data ?? [];
};

export const getHiddenbjList = async (): Promise<string[]> => {
    const url = "https://live.sooplive.com/api/hiddenbj/hiddenbjController.php";
    const response = await fetchBroadList(url, 25);
    if (response?.RESULT === 1) {
        return response.DATA ?? [];
    }
    return [];
};

export const getStationFeed = async (isChannelFeedEnabled: boolean): Promise<any[]> => {
    if (!isChannelFeedEnabled) return [];

    const feedUrl = "https://myapi.sooplive.com/api/feed?index_reg_date=0&user_id=&is_bj_write=1&feed_type=&page=1";
    const response = await fetchBroadList(feedUrl, 150);
    return response?.data ?? [];
};

export const loadCategoryData = (): void => {
    const currentTime = new Date().getTime();
    const lastExecutionTime = GM_getValue<number>("lastExecutionTime", 0);

    if (currentTime - lastExecutionTime >= 900000) {
        const url = `https://live.sooplive.com/script/locale/ko_KR/broad_category.js?${currentTime}`;

        GM_xmlhttpRequest({
            method: "GET",
            url,
            headers: { "Content-Type": "text/plain; charset=utf-8" },
            onload: function (response) {
                if (response.status === 200) {
                    let szBroadCategory: any = response.responseText;
                    szBroadCategory = JSON.parse(szBroadCategory.split("var szBroadCategory = ")[1].slice(0, -1));
                    if (szBroadCategory.CHANNEL.RESULT === "1") {
                        const stripCategoryKeys = (categories: any[]): any[] =>
                            categories.map(({ cate_no, cate_name, child }: any) => ({
                                cate_no,
                                cate_name,
                                ...(child?.length ? { child: stripCategoryKeys(child) } : {}),
                            }));

                        const cleanData: I_CategoryData = {
                            CHANNEL: {
                                RESULT: szBroadCategory.CHANNEL.RESULT,
                                BROAD_CATEGORY: stripCategoryKeys(szBroadCategory.CHANNEL.BROAD_CATEGORY),
                            },
                        };
                        GM_setValue("szBroadCategory", cleanData);
                        GM_setValue("lastExecutionTime", currentTime);
                    }
                } else {
                    customLog.error("Failed to load category data:", response.statusText);
                }
            },
            onerror: function (error) {
                customLog.error("Error loading category data:", error);
            },
        });
    }
};

export const cleanExpiredGMCache = async (): Promise<void> => {
    try {
        const keys = await GM_listValues();
        const expired = keys.filter((k) => k.startsWith("fetchCache_"));
        await Promise.all(
            expired.map(async (k) => {
                const val = await GM_getValue<string | null>(k, null);
                if (!val) {
                    await GM_setValue(k, undefined);
                    return;
                }
                try {
                    const { timestamp } = JSON.parse(val);
                    if (Date.now() - timestamp > 3600_000) {
                        await GM_setValue(k, undefined);
                    }
                } catch {
                    await GM_setValue(k, undefined);
                }
            }),
        );
    } catch (e) {
        customLog.warn("cleanExpiredGMCache error:", e);
    }
};

export const getBroadM3u8Domain = async (broadNumber: string | number): Promise<string | null> => {
    const baseUrl = "https://livestream-manager.sooplive.com/broad_stream_assign.html";
    const params = new URLSearchParams({
        return_type: "gs_cdn_pc_web",
        use_cors: "true",
        cors_origin_url: "play.sooplive.com",
        broad_key: `${broadNumber}-common-master-hls`,
        player_mode: "landing",
        time: "0",
    });

    try {
        const res = await fetch(`${baseUrl}?${params.toString()}`, {
            method: "GET",
            credentials: "include",
            cache: "no-store",
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        if (data.result === "1" && data.view_url) {
            return data.view_url;
        }
        return null;
    } catch (error) {
        customLog.error("Error fetching M3U8 URL:", error);
        return null;
    }
};

export const getBroadAid2 = async (
    id: string,
    broadNumber: string | number,
    quality = "original",
): Promise<string | null> => {
    const basePayload = {
        bid: id,
        bno: String(broadNumber),
        from_api: "0",
        mode: "landing",
        player_type: "html5",
        stream_type: "common",
        quality,
    };

    const requestAid = async (password = "") => {
        const payload = { ...basePayload, type: "aid", pwd: password };
        const res = await fetch("https://live.sooplive.com/afreeca/player_live_api.php", {
            method: "POST",
            body: new URLSearchParams(payload),
            credentials: "include",
            cache: "no-store",
        });
        return await res.json();
    };

    const requestLive = async () => {
        const payload = { ...basePayload, type: "live", pwd: "" };
        const res = await fetch("https://live.sooplive.com/afreeca/player_live_api.php", {
            method: "POST",
            body: new URLSearchParams(payload),
            credentials: "include",
            cache: "no-store",
        });
        return await res.json();
    };

    try {
        const result1 = await requestAid("");
        if (result1?.CHANNEL?.AID) return result1.CHANNEL.AID;

        const result2 = await requestLive();
        if (result2?.CHANNEL?.BPWD === "Y") {
            const password = prompt("비밀번호를 입력하세요:");
            if (password === null) return null;

            const retryResult = await requestAid(password);
            if (retryResult?.CHANNEL?.AID) return retryResult.CHANNEL.AID;
            else alert("비밀번호가 틀렸거나 종료된 방송입니다.");
        }

        return null;
    } catch (error) {
        customLog.log("오류 발생:", error);
        return null;
    }
};

export const getM3u8url = async (id: string, broadNumber: string | number, quality = "hd"): Promise<string | null> => {
    try {
        const [aid, baseUrl] = await Promise.all([
            getBroadAid2(id, broadNumber, quality),
            getBroadM3u8Domain(broadNumber),
        ]);

        if (!aid || !baseUrl) return null;
        return `${baseUrl}?aid=${aid}`;
    } catch (error) {
        customLog.error("Error in getM3u8url:", error);
        return null;
    }
};

export const getFollowList = (callback: (userIds: string[]) => void): void => {
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://myapi.sooplive.com/api/favorite",
        headers: { "Content-Type": "application/json" },
        onload: function (response) {
            try {
                const res = JSON.parse(response.responseText);
                if (res.code === -10000) {
                    callback([]);
                } else {
                    const userIdList = res.data.map((item: any) => item.user_id);
                    GM_setValue("allFollowUserIds", userIdList);
                    callback(userIdList);
                }
            } catch (e) {
                customLog.error("Parsing error:", e);
                callback([]);
            }
        },
        onerror: function (error) {
            customLog.error("Request error:", error);
            callback([]);
        },
    });
};

export const getCategoryName = (cateNo: string | number | undefined): string => {
    if (!cateNo) return "";
    const saved = GM_getValue<I_CategoryData | null>("szBroadCategory", null);
    if (!saved?.CHANNEL?.BROAD_CATEGORY) return "";

    const search = (categories: I_CategoryData["CHANNEL"]["BROAD_CATEGORY"]): string => {
        for (const cat of categories) {
            if (String(cat.cate_no) === String(cateNo)) return cat.cate_name;
            if (cat.child?.length) {
                const found = search(cat.child);
                if (found) return found;
            }
        }
        return "";
    };

    return search(saved.CHANNEL.BROAD_CATEGORY);
};
