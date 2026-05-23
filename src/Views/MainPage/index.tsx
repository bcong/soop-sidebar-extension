import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react-lite";
import { useSettingsStore } from "@Stores/index";
import SidebarView from "@Views/SidebarView";
import NavBar from "@Components/NavBar";
import SettingModal from "@Components/SettingModal";
import PreviewModal from "@Components/PreviewModal";
import { waitForElementAsync } from "@Utils/index";

const MainPage: React.FC = observer(() => {
    const settings = useSettingsStore();

    useEffect(() => {
        if (settings.isCustomSidebarEnabled) {
            document.body.classList.add("customSidebar");
        } else {
            document.body.classList.remove("customSidebar");
        }
        return () => document.body.classList.remove("customSidebar");
    }, [settings.isCustomSidebarEnabled]);

    // 다크모드 쿠키 무기한 유지
    useEffect(() => {
        if (!settings.isThemeLockEnabled) return;
        const refreshThemeCookie = () => {
            const entry = document.cookie
                .split(";")
                .map((c) => c.trim())
                .find((c) => c.startsWith("theme="));
            const value = entry ? entry.split("=")[1] : null;
            if (value) {
                document.cookie = `theme=${value}; max-age=${10 * 365 * 24 * 60 * 60}; path=/; domain=.sooplive.com`;
            }
        };
        refreshThemeCookie();
        const obs = new MutationObserver(refreshThemeCookie);
        obs.observe(document.documentElement, { attributes: true, attributeFilter: ["dark"] });
        return () => obs.disconnect();
    }, [settings.isThemeLockEnabled]);

    // 재배포 태그 제거
    useEffect(() => {
        if (!settings.isRemoveRedistributionTagEnabled) return;
        const style = document.createElement("style");
        style.textContent = `[data-type=cBox] .thumbs-box .allow { display: none !important; }`;
        document.head.appendChild(style);
        return () => style.remove();
    }, [settings.isRemoveRedistributionTagEnabled]);

    // 나중에 보기 버튼 제거
    useEffect(() => {
        if (!settings.isRemoveWatchLaterButtonEnabled) return;
        const style = document.createElement("style");
        style.textContent = `[data-type=cBox] .thumbs-box .later { display: none !important; }`;
        document.head.appendChild(style);
        return () => style.remove();
    }, [settings.isRemoveWatchLaterButtonEnabled]);

    // 방송 시작 시간 태그 제거
    useEffect(() => {
        if (!settings.isRemoveBroadStartTimeTagEnabled) return;
        const style = document.createElement("style");
        style.textContent = `[data-type=cBox] .thumbs-box .time { display: none !important; }`;
        document.head.appendChild(style);
        return () => style.remove();
    }, [settings.isRemoveBroadStartTimeTagEnabled]);

    // 캐러셀(전광판) 제거
    useEffect(() => {
        if (!settings.isRemoveCarouselEnabled) return;
        const style = document.createElement("style");
        style.textContent = `div[class^="player_player_wrap"] { display: none !important; }`;
        document.head.appendChild(style);
        return () => style.remove();
    }, [settings.isRemoveCarouselEnabled]);

    // 방송 제목 말줄임
    useEffect(() => {
        if (!settings.isBroadTitleTextEllipsisEnabled) return;
        const style = document.createElement("style");
        style.textContent = `[data-type=cBox] .cBox-info .title a { white-space: nowrap; text-overflow: ellipsis; display: inline-block; overflow: hidden; max-width: 100%; }`;
        document.head.appendChild(style);
        return () => style.remove();
    }, [settings.isBroadTitleTextEllipsisEnabled]);

    // 방송 목록 클릭 → 현재 탭으로 이동 (isSendLoadBroadEnabled 연동)
    useEffect(() => {
        if (!settings.isSendLoadBroadEnabled) return;
        const handleClick = (e: MouseEvent) => {
            if (e.ctrlKey || e.metaKey || e.shiftKey) return;
            const inCBox = (e.target as HTMLElement).closest('[data-type="cBox"]');
            if (!inCBox) return;
            const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="play.sooplive.com/"]');
            if (!anchor) return;
            e.preventDefault();
            e.stopPropagation();
            window.location.href = anchor.href;
        };
        document.addEventListener("click", handleClick, true);
        return () => document.removeEventListener("click", handleClick, true);
    }, [settings.isSendLoadBroadEnabled]);

    // 연령 제한 썸네일 마우스오버 보기
    useEffect(() => {
        if (!settings.isReplaceEmptyThumbnailEnabled) return;

        // HLS.js 동적 로드 (한 번만)
        const _uw: any = (() => {
            try {
                return unsafeWindow;
            } catch {
                return window;
            }
        })();
        if (!document.querySelector("script[data-hls-loader]")) {
            const hlsScript = document.createElement("script");
            hlsScript.src = "https://cdn.jsdelivr.net/npm/hls.js@latest";
            hlsScript.dataset.hlsLoader = "1";
            document.head.appendChild(hlsScript);
        }

        // HLS.js 로드 완료까지 대기 (sample.js는 @require로 미리 로드, 우리는 직접 대기 필요)
        const ensureHls = (): Promise<void> => {
            if (_uw.Hls) return Promise.resolve();
            return new Promise((resolve) => {
                const check = setInterval(() => {
                    if (_uw.Hls) {
                        clearInterval(check);
                        resolve();
                    }
                }, 100);
            });
        };

        const getBroadM3u8Domain = async (broadNumber: string): Promise<string | null> => {
            const params = new URLSearchParams({
                return_type: "gs_cdn_pc_web",
                use_cors: "true",
                cors_origin_url: "play.sooplive.com",
                broad_key: `${broadNumber}-common-master-hls`,
                player_mode: "landing",
                time: "0",
            });
            try {
                const res = await fetch(`https://livestream-manager.sooplive.com/broad_stream_assign.html?${params}`, {
                    credentials: "include",
                    cache: "no-store",
                });
                if (!res.ok) return null;
                const data = await res.json();
                return data.result === "1" && data.view_url ? data.view_url : null;
            } catch {
                return null;
            }
        };

        const getBroadAid = async (id: string, broadNumber: string): Promise<string | null> => {
            const payload = new URLSearchParams({
                bid: id,
                bno: broadNumber,
                from_api: "0",
                mode: "landing",
                player_type: "html5",
                stream_type: "common",
                quality: "sd",
                type: "aid",
                pwd: "",
            });
            try {
                const res = await fetch("https://live.sooplive.com/afreeca/player_live_api.php", {
                    method: "POST",
                    body: payload,
                    credentials: "include",
                    cache: "no-store",
                });
                const data = await res.json();
                return data?.CHANNEL?.AID ?? null;
            } catch {
                return null;
            }
        };

        const captureFrame = (video: HTMLVideoElement): Promise<string> =>
            new Promise((resolve) => {
                const canvas = document.createElement("canvas");
                canvas.width = 480;
                canvas.height = 270;
                const ctx = canvas.getContext("2d")!;
                const vr = video.videoWidth / video.videoHeight;
                const cr = 480 / 270;
                let dw = 480,
                    dh = 270,
                    ox = 0,
                    oy = 0;
                if (vr > cr) {
                    dh = 480 / vr;
                    oy = (270 - dh) / 2;
                } else {
                    dw = 270 * vr;
                    ox = (480 - dw) / 2;
                }
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, 480, 270);
                ctx.drawImage(video, ox, oy, dw, dh);
                resolve(canvas.toDataURL("image/webp"));
            });

        const loadFrame = async (id: string, broadNumber: string): Promise<string | null> => {
            await ensureHls();
            const Hls = _uw.Hls;
            if (!Hls?.isSupported()) return null;
            const [aid, baseUrl] = await Promise.all([getBroadAid(id, broadNumber), getBroadM3u8Domain(broadNumber)]);
            if (!aid || !baseUrl) return null;
            const m3u8 = `${baseUrl}?aid=${aid}`;
            const video = document.createElement("video");
            video.playbackRate = 16;
            const hls = new Hls();
            hls.loadSource(m3u8);
            hls.attachMedia(video);
            return new Promise((resolve) => {
                video.addEventListener(
                    "canplay",
                    async () => {
                        const data = await captureFrame(video);
                        video.pause();
                        video.src = "";
                        hls.destroy();
                        resolve(data);
                    },
                    { once: true },
                );
                setTimeout(() => {
                    hls.destroy();
                    resolve(null);
                }, 15000);
            });
        };

        const bindLink = (link: HTMLAnchorElement) => {
            if (link.dataset.adultThumbBound === "true") return;
            const img = link.querySelector<HTMLImageElement>("img");
            if (!img) return;
            link.dataset.adultThumbBound = "true";
            let intervalId: ReturnType<typeof setInterval> | null = null;

            const load = async () => {
                if (link.dataset.loading === "true") return;
                const m = (link.getAttribute("href") ?? "").match(/play\.sooplive\.com\/([^/]+)\/(\d+)/);
                if (!m) return;
                const [, id, broadNo] = m;
                link.dataset.loading = "true";
                if (!link.dataset.imageLoaded) {
                    img.style.filter = "grayscale(100%)";
                    img.style.transition = "filter 0.5s ease";
                }
                const frame = await loadFrame(id, broadNo);
                if (frame) {
                    img.src = frame;
                    img.style.objectFit = "cover";
                    img.style.filter = "none";
                    link.dataset.imageLoaded = "true";
                    link.dataset.lastLoadedTime = Date.now().toString();
                } else {
                    img.style.filter = "none";
                }
                link.dataset.loading = "false";
            };

            link.addEventListener("mouseenter", () => {
                const expired = Date.now() - parseInt(link.dataset.lastLoadedTime ?? "0", 10) > 30000;
                if (!link.dataset.imageLoaded || expired) load();
                intervalId = setInterval(load, 30000);
            });
            link.addEventListener("mouseleave", () => {
                if (intervalId) {
                    clearInterval(intervalId);
                    intervalId = null;
                }
            });
        };

        const scanAndBind = () => {
            document.querySelectorAll<HTMLElement>("[data-type=cBox] .thumbs-box .status.adult").forEach((el) => {
                const link = el.closest<HTMLElement>(".thumbs-box")?.querySelector<HTMLAnchorElement>("a[href]");
                if (link && !link.href.startsWith("https://vod.sooplive.com")) bindLink(link);
            });
        };

        scanAndBind();
        const obs = new MutationObserver(scanAndBind);
        obs.observe(document.body, { childList: true, subtree: true });
        return () => obs.disconnect();
    }, [settings.isReplaceEmptyThumbnailEnabled]);
    const [sidebarContainer, setSidebarContainer] = React.useState<HTMLElement | null>(null);

    useEffect(() => {
        const container = document.createElement("div");
        // position: fixed이므로 DOM 위치 무관하지만 sample.js처럼 #soop-gnb 뒤 배치 시도
        document.body.appendChild(container);
        setSidebarContainer(container);
        waitForElementAsync("#soop-gnb", 3000).then((gnb) => {
            if (gnb) gnb.insertAdjacentElement("afterend", container);
        });
        return () => container.remove();
    }, []);

    return (
        <>
            <NavBar />
            <SettingModal />
            {settings.isCustomSidebarEnabled &&
                sidebarContainer &&
                ReactDOM.createPortal(<SidebarView />, sidebarContainer)}
            <PreviewModal />
        </>
    );
});

export default MainPage;
