import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react-lite";
import { GM_xmlhttpRequest } from "vite-plugin-monkey/dist/client";
import { useSettingsStore } from "@Stores/index";
import { waitForElementAsync, observeUrlChanges } from "@Utils/index";
import "./style.less";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _uw: any = (() => {
    try {
        return unsafeWindow;
    } catch {
        return window;
    }
})();

// ── 원본 sample2.js 와 동일한 rank 관련 상수 ────────────────────────────────
const rankToSvgMap: Record<string, string> = {
    건빵: "",
    팬: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 15 14'%3e%3crect width='14' height='14' x='.615' fill='%2375AA5C' rx='3'/%3e%3cpath fill='%23fff' d='M5.105 3.43h5.02v1.32h-3.45V6.4h2.99v1.22h-2.99v2.95h-1.57V3.43Z'/%3e%3c/svg%3e",
    구독자: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'%3e%3ccircle cx='12' cy='12' r='12' fill='%23EF565F'/%3e%3cpath stroke='%23fff' stroke-width='1.17' d='M16.8 14.092c.228.042.446.07.655.07 1.75 0 2.705-1.223 2.705-2.711 0-1.489-.955-2.69-2.705-2.69-.169 0-.345.02-.525.047'/%3e%3cpath fill='%23fff' stroke='%23fff' stroke-linejoin='round' stroke-width='.992' d='M5.418 13.588a5.473 5.473 0 0 0 5.446 5.014c2.392 0 4.573-1.544 5.372-3.688.11-.299.323-1.18.323-1.625V7.445a.843.843 0 0 0-.843-.843H6.242a.843.843 0 0 0-.843.843v5.3l.019.843Z'/%3e%3cpath fill='%23EF565F' fill-rule='evenodd' d='M11.63 9.367a.757.757 0 0 0-1.298 0l-.715 1.19-1.35.312a.759.759 0 0 0-.4 1.236l.908 1.048-.12 1.382a.757.757 0 0 0 1.05.764l1.276-.541 1.276.54a.757.757 0 0 0 1.05-.763l-.12-1.382.908-1.048a.759.759 0 0 0-.401-1.236l-1.35-.313-.715-1.189Z' clip-rule='evenodd'/%3e%3c/svg%3e",
    매니저: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='14' height='15' fill='none'%3e%3crect width='14' height='14' y='.5' fill='%2353B1AE' rx='3'/%3e%3cpath fill='%23fff' d='M3.155 3.93h2.21l1.67 4.91h.02l1.58-4.91h2.21v7.14h-1.47V6.01h-.02l-1.75 5.06h-1.21l-1.75-5.01h-.02v5.01h-1.47V3.93Z'/%3e%3c/svg%3e",
    열혈팬: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='14' height='15' fill='none'%3e%3crect width='14' height='14' y='.5' fill='%23D65B8F' rx='3'/%3e%3cpath fill='%23fff' d='M3 5.323c0 1.282 1.06 2.09 2.395 2.09 1.397 0 2.405-.84 2.405-2.09 0-1.27-1.008-2.174-2.405-2.174C4.008 3.149 3 4.073 3 5.323Zm1.197 0c0-.64.536-1.155 1.198-1.155.745 0 1.197.514 1.197 1.155 0 .567-.462 1.071-1.197 1.071-.714 0-1.198-.451-1.198-1.07ZM11 7.673V2.575H9.8v1.1H8.333l.022 1.135H9.8v1.021H8.355l-.022 1.064H9.8v.778H11Zm0 4.752v-1.02H5.875v-.67H11V8.123H4.525v1.01h5.202v.67H4.58v2.622H11Z'/%3e%3c/svg%3e",
    스트리머:
        "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none'%3e%3crect width='14' height='14' fill='%23F60' rx='3'/%3e%3crect width='3.359' height='6.6' x='5.32' y='1.5' fill='%23fff' rx='1.68'/%3e%3cpath fill='%23fff' d='M6.3 10h1.4v2.75H6.3z'/%3e%3cpath stroke='%23fff' stroke-width='1.4' d='M10.707 6.469c0 1.96-1.66 3.55-3.707 3.55-2.048 0-3.707-1.59-3.707-3.55'/%3e%3c/svg%3e",
};

const gradeToKorean: Record<string, string> = {
    normal: "건빵",
    fan: "팬",
    subscription: "구독자",
    manager: "매니저",
    vip: "열혈팬",
    streamer: "스트리머",
};

function getKoreanRank(grade: string): string {
    return gradeToKorean[grade] ?? grade;
}

function getBorderColorByRank(koreanRank: string): string {
    switch (koreanRank) {
        case "스트리머":
            return "#FF6600";
        case "매니저":
            return "#53B1AE";
        case "열혈팬":
            return "#D65B8F";
        case "구독자":
            return "#E09135";
        case "팬":
            return "#75AA5C";
        default:
            return "gray";
    }
}

type WatchingUser = { userId: string; nickname: string; grade: string; source: "following" | "registered" };
type SortOrder = "date" | "favorites" | "rank";

function getProfileUrl(userId: string): string {
    return `https://profile.img.sooplive.com/LOGO/${userId.substring(0, 2)}/${userId}/m/${userId}.webp`;
}

const WS_WORKER_CODE = `
self.onmessage = function(e) {
    var followingSet = new Set(e.data.followingSet || []);
    var registeredSet = new Set(e.data.registeredSet || []);
    var newViewers = e.data.newViewers || []; // Array<{uid, nickname, grade}>
    var newViewerIds = newViewers.map(function(v) { return v.uid; });

    if (followingSet.size === 0 && registeredSet.size === 0) {
        self.postMessage({ found: [], newViewerIds: newViewerIds });
        return;
    }

    var found = [];
    var seenIds = new Set();

    // Phase 1: 개별 등록 유저 (1순위)
    if (registeredSet.size > 0) {
        for (var i = 0; i < newViewers.length; i++) {
            var v = newViewers[i];
            if (registeredSet.has(v.uid) && !seenIds.has(v.uid)) {
                seenIds.add(v.uid);
                found.push({ userId: v.uid, nickname: v.nickname, grade: v.grade, source: 'registered' });
            }
        }
    }
    // Phase 2: 즐겨찾기 (2순위)
    if (followingSet.size > 0) {
        for (var i = 0; i < newViewers.length; i++) {
            var v = newViewers[i];
            if (followingSet.has(v.uid) && !seenIds.has(v.uid)) {
                seenIds.add(v.uid);
                found.push({ userId: v.uid, nickname: v.nickname, grade: v.grade, source: 'following' });
            }
        }
    }

    self.postMessage({ found: found, newViewerIds: newViewerIds });
};
`;

const COOLDOWN_MS = 10_000;

const WatchingStreamers: React.FC = observer(() => {
    const settings = useSettingsStore();

    const [watchingUsers, setWatchingUsers] = useState<WatchingUser[]>([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [container, setContainer] = useState<Element | null>(null);
    const [scannedCount, setScannedCount] = useState(0);
    const [displayScannedCount, setDisplayScannedCount] = useState(0);

    const [countdown, setCountdown] = useState(0);
    const followingSetRef = useRef<Set<string>>(new Set());
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const workerRef = useRef<Worker | null>(null);
    const isFetchingRef = useRef(false);
    const lastRefreshTimeRef = useRef(0);
    // 캐시: uid → WatchingUser(발견) | null(탐색했으나 대상 아님)
    const viewerCacheRef = useRef<Map<string, WatchingUser | null>>(new Map());
    // 워커 무응답 시 잠금 해제용 타임아웃
    const workerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    // 워커 응답을 Promise로 기다리기 위한 콜백
    const workerCallbackRef = useRef<(() => void) | null>(null);
    // 다음 자동 갱신 시각
    const nextFireTimeRef = useRef(0);

    // ── Web Worker 초기화 ────────────────────────────────────────────
    useEffect(() => {
        const blob = new Blob([WS_WORKER_CODE], { type: "application/javascript" });
        const url = URL.createObjectURL(blob);
        const worker = new Worker(url);
        workerRef.current = worker;

        worker.onmessage = (e: MessageEvent<{ found: WatchingUser[]; newViewerIds: string[] }>) => {
            if (workerTimeoutRef.current) {
                clearTimeout(workerTimeoutRef.current);
                workerTimeoutRef.current = null;
            }
            const { found, newViewerIds } = e.data;
            // 새로 탐색한 uid를 캐시에 기록
            for (const uid of newViewerIds) {
                if (!viewerCacheRef.current.has(uid)) {
                    viewerCacheRef.current.set(uid, null);
                }
            }
            for (const user of found) {
                viewerCacheRef.current.set(user.userId, user);
            }
            const allFound = Array.from(viewerCacheRef.current.values()).filter((u): u is WatchingUser => u !== null);
            setWatchingUsers(allFound);
            setScannedCount(viewerCacheRef.current.size);
            // fetchAndFilter의 postAndWait Promise를 해제
            if (workerCallbackRef.current) {
                workerCallbackRef.current();
                workerCallbackRef.current = null;
            }
        };
        worker.onerror = () => {
            if (workerTimeoutRef.current) {
                clearTimeout(workerTimeoutRef.current);
                workerTimeoutRef.current = null;
            }
            // 대기 중인 Promise가 있으면 해제
            if (workerCallbackRef.current) {
                workerCallbackRef.current();
                workerCallbackRef.current = null;
            }
        };

        return () => {
            if (workerTimeoutRef.current) {
                clearTimeout(workerTimeoutRef.current);
                workerTimeoutRef.current = null;
            }
            worker.terminate();
            URL.revokeObjectURL(url);
        };
    }, []);

    // ── .broadcast_information 컨테이너 탐지 ─────────────────────────
    useEffect(() => {
        if (!settings.isWatchingStreamersEnabled) {
            setContainer(null);
            return;
        }

        let mounted = true;

        const tryAttach = () => {
            const el = document.querySelector(".broadcast_information");
            if (el && mounted) setContainer(el);
        };

        tryAttach();

        if (!document.querySelector(".broadcast_information")) {
            const obs = new MutationObserver(() => {
                const el = document.querySelector(".broadcast_information");
                if (el) {
                    obs.disconnect();
                    if (mounted) setContainer(el);
                }
            });
            obs.observe(document.body, { childList: true, subtree: true });
            return () => {
                mounted = false;
                obs.disconnect();
            };
        }

        return () => {
            mounted = false;
        };
    }, [settings.isWatchingStreamersEnabled]);

    // ── 언마운트 시 #view_streamer 제거 ─────────────────────────────
    useEffect(() => {
        return () => {
            document.getElementById("view_streamer")?.remove();
        };
    }, []);

    // ── 즐겨찾기 목록 가져오기 ───────────────────────────────────────
    const fetchFollowingList = useCallback(() => {
        if (!settings.isWatchingStreamersFollowingListEnabled) {
            followingSetRef.current = new Set();
            return;
        }
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://myapi.sooplive.com/api/favorite",
            headers: { "Content-Type": "application/json" },
            onload: (response) => {
                try {
                    const data = JSON.parse(response.responseText);
                    if (data.code === -10000 || !Array.isArray(data.data)) {
                        followingSetRef.current = new Set();
                        return;
                    }
                    followingSetRef.current = new Set<string>(
                        data.data.map((item: { user_id: string }) => item.user_id),
                    );
                } catch {
                    followingSetRef.current = new Set();
                }
            },
            onerror: () => {
                followingSetRef.current = new Set();
            },
        });
    }, [settings.isWatchingStreamersFollowingListEnabled]);

    // ── 대상 목록 변경 시 캐시 초기화 ────────────────────────────────
    useEffect(() => {
        viewerCacheRef.current.clear();
        setScannedCount(0);
        setDisplayScannedCount(0);
    }, [settings.isWatchingStreamersFollowingListEnabled, settings.watchingStreamersRegisteredUsers]);

    // ── 탐색 카운터 애니메이션 ─────────────────────────────────────────
    useEffect(() => {
        if (displayScannedCount === scannedCount) return;
        if (displayScannedCount > scannedCount) {
            setDisplayScannedCount(scannedCount);
            return;
        }
        const step = Math.max(1, Math.ceil((scannedCount - displayScannedCount) / 15));
        const timer = setTimeout(() => {
            setDisplayScannedCount((prev) => Math.min(scannedCount, prev + step));
        }, 30);
        return () => clearTimeout(timer);
    }, [scannedCount, displayScannedCount]);

    // ── 시청자 목록 필터링 ────────────────────────────────────────────
    const fetchAndFilter = useCallback(async () => {
        if (!settings.isWatchingStreamersEnabled) return;
        if (isFetchingRef.current) return;

        const lv = _uw.liveView ?? (window as unknown as { liveView: unknown }).liveView;
        if (!lv?.Chat?.chatUserListLayer) return;

        isFetchingRef.current = true;

        const followingArr = settings.isWatchingStreamersFollowingListEnabled
            ? Array.from(followingSetRef.current)
            : [];
        const registeredArr = settings.watchingStreamersRegisteredUsers.map((u) => u.userId);

        // 현재 시청자 목록에서 캐시에 없는 신규 시청자만 추출
        const getNewViewers = (): Array<{ uid: string; nickname: string; grade: string }> => {
            const viewerListRaw = lv.Chat.chatUserListLayer.userListSeparatedByGrade;
            if (!viewerListRaw) return [];

            const GRADE_ORDER = ["streamer", "manager", "vip", "subscription", "fan", "normal"];
            const grades = Object.keys(viewerListRaw).sort((a, b) => {
                const ai = GRADE_ORDER.indexOf(a);
                const bi = GRADE_ORDER.indexOf(b);
                return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi);
            });
            const currentViewerIds = new Set<string>();
            const allCurrentViewers: Array<{ uid: string; nickname: string; grade: string }> = [];
            for (const grade of grades) {
                const list = (
                    viewerListRaw as Record<string, Array<{ id?: string; nickname?: string; type?: string }>>
                )[grade];
                if (!Array.isArray(list)) continue;
                for (const v of list) {
                    if (!v.id || v.type === "title") continue;
                    const uid = v.id.split("(")[0];
                    if (!currentViewerIds.has(uid)) {
                        currentViewerIds.add(uid);
                        allCurrentViewers.push({ uid, nickname: v.nickname ?? "", grade });
                    }
                }
            }
            // 나간 시청자 캐시에서 제거
            for (const uid of Array.from(viewerCacheRef.current.keys())) {
                if (!currentViewerIds.has(uid)) viewerCacheRef.current.delete(uid);
            }
            return allCurrentViewers.filter((v) => !viewerCacheRef.current.has(v.uid));
        };

        // 신규 시청자를 워커로 보내고 응답 대기 (Promise)
        const postAndWait = (newViewers: Array<{ uid: string; nickname: string; grade: string }>): Promise<void> => {
            if (newViewers.length === 0) {
                const allFound = Array.from(viewerCacheRef.current.values()).filter(
                    (u): u is WatchingUser => u !== null,
                );
                setWatchingUsers(allFound);
                setScannedCount(viewerCacheRef.current.size);
                return Promise.resolve();
            }
            return new Promise<void>((resolve) => {
                if (workerTimeoutRef.current) clearTimeout(workerTimeoutRef.current);
                // 25초 안에 응답 없으면 강제 해제
                workerTimeoutRef.current = setTimeout(() => {
                    workerTimeoutRef.current = null;
                    workerCallbackRef.current = null;
                    resolve();
                }, 25000);
                workerCallbackRef.current = resolve;
                workerRef.current?.postMessage({
                    followingSet: followingArr,
                    registeredSet: registeredArr,
                    newViewers,
                });
            });
        };

        try {
            if (followingArr.length === 0 && registeredArr.length === 0) {
                setWatchingUsers([]);
                setScannedCount(viewerCacheRef.current.size);
                return;
            }

            lv.Chat.chatUserListLayer.reconnect();
            lv.playerController.sendChUser();

            // ① 1차 스캔: 1.5초 후 빠른 초기 결과
            await new Promise<void>((resolve) => setTimeout(resolve, 1500));
            await postAndWait(getNewViewers());

            // ② 2차 스캔: 2.5초 더 대기 후 추가 수신된 시청자 delta
            await new Promise<void>((resolve) => setTimeout(resolve, 2500));
            await postAndWait(getNewViewers());
        } finally {
            isFetchingRef.current = false;
            setIsRefreshing(false);
        }
    }, [
        settings.isWatchingStreamersEnabled,
        settings.isWatchingStreamersFollowingListEnabled,
        settings.watchingStreamersRegisteredUsers,
    ]);

    // ── 폴링 및 URL 변경 감지 ─────────────────────────────────────────
    useEffect(() => {
        if (!settings.isWatchingStreamersEnabled) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }

        fetchFollowingList();

        const startPolling = async () => {
            await waitForElementAsync(".broadcast_information");
            void fetchAndFilter();
        };
        void startPolling();

        if (intervalRef.current) clearInterval(intervalRef.current);
        const intervalMs = settings.watchingStreamersIntervalMinutes * 60 * 1000;
        nextFireTimeRef.current = Date.now() + intervalMs;
        intervalRef.current = setInterval(() => {
            nextFireTimeRef.current = Date.now() + intervalMs;
            void fetchAndFilter();
        }, intervalMs);

        const unsub = observeUrlChanges(() => {
            // 방송 이동 시 이전 캐시 전부 초기화
            setWatchingUsers([]);
            viewerCacheRef.current.clear();
            setScannedCount(0);
            setDisplayScannedCount(0);
            isFetchingRef.current = false;
            setTimeout(() => {
                const el = document.querySelector(".broadcast_information");
                if (el) setContainer(el);
            }, 500);
            fetchFollowingList();
            void fetchAndFilter();
        });

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            unsub();
        };
    }, [
        settings.isWatchingStreamersEnabled,
        settings.watchingStreamersIntervalMinutes,
        fetchFollowingList,
        fetchAndFilter,
    ]);

    // ── 카운트다운 tick ───────────────────────────────────────────────
    useEffect(() => {
        if (!settings.isWatchingStreamersEnabled) return;
        const tick = setInterval(() => {
            setCountdown(Math.max(0, Math.ceil((nextFireTimeRef.current - Date.now()) / 1000)));
        }, 1000);
        return () => clearInterval(tick);
    }, [settings.isWatchingStreamersEnabled]);

    // ── 새로고침 버튼 클릭 ────────────────────────────────────────────
    const handleRefreshClick = useCallback(() => {
        const now = Date.now();
        if (now - lastRefreshTimeRef.current < COOLDOWN_MS) return;
        lastRefreshTimeRef.current = now;
        // 진행 중인 워커 대기 Promise 해제 후 재시작
        if (workerCallbackRef.current) {
            workerCallbackRef.current();
            workerCallbackRef.current = null;
        }
        if (workerTimeoutRef.current) {
            clearTimeout(workerTimeoutRef.current);
            workerTimeoutRef.current = null;
        }
        nextFireTimeRef.current = Date.now() + settings.watchingStreamersIntervalMinutes * 60 * 1000;
        isFetchingRef.current = false;
        setIsRefreshing(true);
        void fetchAndFilter();
    }, [fetchAndFilter, settings.watchingStreamersIntervalMinutes]);

    // ── 정렬 (settings 값 사용) ─────────────────────────────────────
    const sortedUsers = [...watchingUsers];
    const currentSortOrder = settings.watchingStreamersSortOrder as SortOrder;
    if (currentSortOrder === "rank") {
        const order = ["streamer", "manager", "vip", "subscription", "fan", "normal"];
        sortedUsers.sort((a, b) => order.indexOf(a.grade) - order.indexOf(b.grade));
    } else if (currentSortOrder === "favorites") {
        // source 우선 (registered → following), 같은 source 내에서 grade 순
        const srcOrder: Record<string, number> = { registered: 0, following: 1 };
        const gradeOrder = ["streamer", "manager", "vip", "subscription", "fan", "normal"];
        sortedUsers.sort(
            (a, b) =>
                (srcOrder[a.source] ?? 9) - (srcOrder[b.source] ?? 9) ||
                gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade),
        );
    }
    // date(기본): 워커 출력 순 = 개별등록(1) → 즐겨찾기(2), 각 그룹 내 grade 순(3)

    // ── 렌더 ─────────────────────────────────────────────────────────
    if (!settings.isWatchingStreamersEnabled || !container) return null;
    if (watchingUsers.length > 0 && watchingUsers.length < settings.watchingStreamersMinDisplay) return null;

    return ReactDOM.createPortal(
        <div id="view_streamer" className="view_streamer">
            <div className="ws-header">
                <span
                    className="ws-count-badge"
                    title={`${watchingUsers.length}명 발견 / ${displayScannedCount.toLocaleString()}명 탐색`}
                >
                    <span className="ws-count-icon">👤</span>
                    <span className="ws-count-num">
                        {watchingUsers.length}
                        <span className="ws-scanned-num">/{displayScannedCount.toLocaleString()}</span>
                    </span>
                </span>
                <span
                    className={`ws-refresh-btn${isRefreshing ? " ws-refreshing" : ""}`}
                    title="새로고침"
                    onClick={handleRefreshClick}
                >
                    ↺
                </span>
                <span className="ws-countdown-label" title="다음 갱신까지">
                    {isRefreshing
                        ? "..."
                        : countdown >= 60
                          ? `${Math.floor(countdown / 60)}:${String(countdown % 60).padStart(2, "0")}`
                          : `${countdown}s`}
                </span>
            </div>

            {/* 유저 목록 */}
            <div id="user-list-container">
                {sortedUsers.map((user) => {
                    const koreanRank = getKoreanRank(user.grade);
                    const usernameWithRank = `${user.nickname} (${koreanRank})`;
                    const profileUrl = getProfileUrl(user.userId);
                    const svgUrl = rankToSvgMap[koreanRank];
                    const stationUrl = `https://www.sooplive.com/station/${user.userId}`;

                    return settings.isWatchingStreamersTextModeEnabled ? (
                        // ── 텍스트 모드 (원본과 동일한 구조)
                        <a
                            key={user.userId}
                            className="user-link textMode"
                            href={stationUrl}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {svgUrl && (
                                <img
                                    src={svgUrl}
                                    alt={koreanRank}
                                    title={koreanRank}
                                    style={{ width: 17, height: 17 }}
                                />
                            )}
                            {" " + user.nickname}
                            <span className="custom-tooltip">
                                <span
                                    className="tooltip-profile-img"
                                    style={{ backgroundImage: `url(${profileUrl})` }}
                                />
                            </span>
                        </a>
                    ) : (
                        // ── 이미지 모드 (원본과 동일한 구조)
                        <a key={user.userId} className="user-link" href={stationUrl} target="_blank" rel="noreferrer">
                            <div className="user-image-wrapper">
                                <img
                                    className="profile-picture-chat"
                                    src={profileUrl}
                                    alt={usernameWithRank}
                                    loading="lazy"
                                    style={{
                                        width: settings.watchingStreamersProfileSize,
                                        height: settings.watchingStreamersProfileSize,
                                    }}
                                />
                                <div
                                    className="color-dot"
                                    style={{ backgroundColor: getBorderColorByRank(koreanRank) }}
                                />
                            </div>
                            <span className="custom-tooltip">{usernameWithRank}</span>
                        </a>
                    );
                })}
            </div>
        </div>,
        container,
    );
});

export default WatchingStreamers;
