import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { useSettingsStore } from "@Stores/index";
import { addNumberSeparator } from "@Utils/format";
import { getElapsedTime } from "@Utils/format";
import { fetchBroadList } from "@Utils/api";
import "./style.less";

// ── HLS 프레임 캡처 유틸리티 (19금 썸네일 fallback) ──────────────────────────
const _uwTooltip: any = (() => {
    try {
        return unsafeWindow;
    } catch {
        return window;
    }
})();

function ensureHlsJs(): Promise<void> {
    if (_uwTooltip.Hls) return Promise.resolve();
    return new Promise((resolve) => {
        if (document.querySelector("script[data-hls-loader]")) {
            const check = setInterval(() => {
                if (_uwTooltip.Hls) {
                    clearInterval(check);
                    resolve();
                }
            }, 100);
            return;
        }
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/hls.js@latest";
        script.dataset.hlsLoader = "1";
        script.onload = () => resolve();
        document.head.appendChild(script);
    });
}

async function getBroadM3u8Domain(broadNo: string): Promise<string | null> {
    const params = new URLSearchParams({
        return_type: "gs_cdn_pc_web",
        use_cors: "true",
        cors_origin_url: "play.sooplive.com",
        broad_key: `${broadNo}-common-master-hls`,
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
}

async function getBroadAid(userId: string, broadNo: string): Promise<string | null> {
    const payload = new URLSearchParams({
        bid: userId,
        bno: broadNo,
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
}

function captureVideoFrame(video: HTMLVideoElement): Promise<string> {
    return new Promise((resolve) => {
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
}

async function loadAdultFrame(userId: string, broadNo: string): Promise<string | null> {
    await ensureHlsJs();
    const Hls = _uwTooltip.Hls;
    if (!Hls?.isSupported()) return null;
    const [aid, baseUrl] = await Promise.all([getBroadAid(userId, broadNo), getBroadM3u8Domain(broadNo)]);
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
                const frame = await captureVideoFrame(video);
                video.pause();
                video.src = "";
                hls.destroy();
                resolve(frame);
            },
            { once: true },
        );
        setTimeout(() => {
            hls.destroy();
            resolve(null);
        }, 15000);
    });
}

// broadNo → base64 캡처 캐시 (탭 수명 동안 유지)
const adultFrameCache = new Map<string, string>();
// broadNo → 마지막 HLS 시도 타임스탬프 (30s 쿨다운, sample.js 동일 방식)
const adultFrameTimestamps = new Map<string, number>();
// ─────────────────────────────────────────────────────────────────────────────

interface TooltipData {
    userId: string;
    userNick: string;
    broadTitle: string;
    broadNo?: string | number;
    broadStart?: string;
    totalViewCnt?: number;
    broadCateNo?: string;
    thumbnailUrl?: string;
    type: "live" | "vod" | "feed" | "offline";
    platform?: "chzzk";
}

let globalShowFn: ((data: TooltipData, x: number, y: number) => void) | null = null;
let globalHideFn: (() => void) | null = null;

export const showTooltip = (data: TooltipData, x: number, y: number): void => {
    globalShowFn?.(data, x, y);
};

export const hideTooltip = (): void => {
    globalHideFn?.();
};

const TooltipPreview: React.FC = observer(() => {
    const settings = useSettingsStore();
    const [visible, setVisible] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [data, setData] = useState<TooltipData | null>(null);
    const [resolvedThumbnail, setResolvedThumbnail] = useState<string | null>(null);
    const [capturedFrame, setCapturedFrame] = useState<string | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    // SOOP 라이브 스트림: 툴팁 표시 시 즉시 HLS 캡처 (sample.js replaceThumbnails 방식)
    // onError 대신 적극적(proactive) 방식 — SOOP은 19금 썸네일에 HTTP 200 placeholder를 반환하므로 onError 불가
    useEffect(() => {
        if (!settings.isReplaceEmptyThumbnailEnabled) return;
        if (!data?.userId || !data?.broadNo || data.type !== "live" || data.platform === "chzzk") return;

        const broadNoStr = String(data.broadNo);
        const userId = data.userId;
        let cancelled = false;

        // 캐시 확인
        const cached = adultFrameCache.get(broadNoStr);
        if (cached) {
            setCapturedFrame(cached);
            return;
        }

        // 30초 이내 로드 시도 여부 확인 (sample.js와 동일한 30s 만료 로직)
        const lastTime = adultFrameTimestamps.get(broadNoStr) ?? 0;
        if (Date.now() - lastTime < 30000) return;
        adultFrameTimestamps.set(broadNoStr, Date.now());

        (async () => {
            const frame = await loadAdultFrame(userId, broadNoStr);
            if (cancelled) {
                // hover 이탈로 취소된 경우 쿨다운 제거 → 다음 hover 시 즉시 재시도
                if (!adultFrameCache.has(broadNoStr)) adultFrameTimestamps.delete(broadNoStr);
                return;
            }
            if (!frame) return;
            adultFrameCache.set(broadNoStr, frame);
            setCapturedFrame(frame);
        })();

        return () => {
            cancelled = true;
        };
    }, [data, settings.isReplaceEmptyThumbnailEnabled]);

    // Chzzk 썸네일 fallback: liveImageUrl이 없으면 채널 데이터 API에서 가져옴
    useEffect(() => {
        setCapturedFrame(null);
        if (!data) {
            setResolvedThumbnail(null);
            return;
        }
        const direct =
            data.thumbnailUrl || (data.broadNo ? `https://liveimg.sooplive.com/m/${data.broadNo}.jpg` : null);
        if (direct) {
            setResolvedThumbnail(direct);
            return;
        }
        if (data.platform === "chzzk" && data.userId) {
            setResolvedThumbnail(null);
            fetchBroadList(
                `https://api.chzzk.naver.com/service/v1/channels/${data.userId}/data?fields=topExposedVideos`,
                100,
            )
                .then((res: any) => {
                    const liveImageUrl = res?.content?.topExposedVideos?.openLive?.liveImageUrl;
                    if (liveImageUrl) {
                        setResolvedThumbnail(liveImageUrl.replace("{type}", "360"));
                    }
                })
                .catch(() => {});
        } else {
            setResolvedThumbnail(null);
        }
    }, [data]);

    useEffect(() => {
        globalShowFn = (tooltipData, x, y) => {
            if (!settings.isThumbnailTooltipEnabled) return;
            setData(tooltipData);
            setPos({ x, y });
            setVisible(true);
        };
        globalHideFn = () => setVisible(false);

        return () => {
            globalShowFn = null;
            globalHideFn = null;
        };
    }, [settings.isThumbnailTooltipEnabled]);

    // 화면 밖으로 나가지 않도록 위치 조정
    useEffect(() => {
        if (!visible || !ref.current) return;
        const el = ref.current;
        const rect = el.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        let x = pos.x + 15;
        let y = pos.y + 15;

        if (x + rect.width > vw) x = pos.x - rect.width - 10;
        if (y + rect.height > vh) y = vh - rect.height - 10;

        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
    }, [visible, pos]);

    if (!settings.isThumbnailTooltipEnabled || !visible || !data) return null;

    const cacheBuster = `?${Math.floor(Date.now() / 10000)}`;
    const thumbnailSrc = capturedFrame
        ? capturedFrame
        : resolvedThumbnail
          ? resolvedThumbnail +
            (resolvedThumbnail.startsWith("http") && !resolvedThumbnail.startsWith("https://stimg.") ? cacheBuster : "")
          : null;

    const elapsed = data.broadStart && data.type === "live" ? getElapsedTime(data.broadStart, "HH:MM") : null;

    return (
        <div ref={ref} className={`tooltip-container${visible ? " visible" : ""}`} style={{ position: "fixed" }}>
            {thumbnailSrc && (
                <div className="thumbs-box">
                    <img src={thumbnailSrc} alt={data.broadTitle} />
                    {data.totalViewCnt !== undefined && (
                        <div className="thumb-overlay-bottom">
                            <div className="views">{addNumberSeparator(data.totalViewCnt)}명</div>
                            {elapsed && <div className="duration-overlay">{elapsed}</div>}
                        </div>
                    )}
                </div>
            )}
            <div className="tooltiptext">
                <div className="tooltip-header">
                    <span className="tooltip-username">{data.userNick}</span>
                    {elapsed && <span className="tooltip-time">{elapsed}</span>}
                </div>
                <span className="tooltip-description">{data.broadTitle}</span>
            </div>
        </div>
    );
});

export default TooltipPreview;
