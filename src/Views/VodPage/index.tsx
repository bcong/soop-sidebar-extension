import React, { useEffect, useState, useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react-lite";
import { useSettingsStore } from "@Stores/index";
import SidebarView from "@Views/SidebarView";

// ============================================================
// 드래그·리사이즈 가능 모달 (VOD 하이라이트 뷰어)
// ============================================================

interface HighlightItem {
    time: number; // seconds
    title: string;
    label?: string;
}

interface DraggableModalProps {
    items: HighlightItem[];
    onSeek: (time: number) => void;
    onClose: () => void;
}

const DraggableResizableModal: React.FC<DraggableModalProps> = ({ items, onSeek, onClose }) => {
    const [pos, setPos] = useState({ x: 80, y: 80 });
    const [size, setSize] = useState({ w: 280, h: 320 });
    const dragging = useRef(false);
    const dragStart = useRef({ mx: 0, my: 0, px: 0, py: 0 });
    const resizing = useRef(false);
    const resizeStart = useRef({ mx: 0, my: 0, w: 0, h: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).classList.contains("resize-handle_v8xK4z")) {
            return;
        }
        e.preventDefault();
        dragging.current = true;
        dragStart.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };
        const onMove = (ev: MouseEvent) => {
            if (!dragging.current) return;
            setPos({
                x: dragStart.current.px + ev.clientX - dragStart.current.mx,
                y: dragStart.current.py + ev.clientY - dragStart.current.my,
            });
        };
        const onUp = () => {
            dragging.current = false;
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
        };
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
    };

    const handleResizeDown = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        resizing.current = true;
        resizeStart.current = { mx: e.clientX, my: e.clientY, w: size.w, h: size.h };
        const onMove = (ev: MouseEvent) => {
            if (!resizing.current) return;
            setSize({
                w: Math.max(180, resizeStart.current.w + ev.clientX - resizeStart.current.mx),
                h: Math.max(120, resizeStart.current.h + ev.clientY - resizeStart.current.my),
            });
        };
        const onUp = () => {
            resizing.current = false;
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
        };
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
    };

    const formatTime = (secs: number): string => {
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        const s = Math.floor(secs % 60);
        if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
        return `${m}:${String(s).padStart(2, "0")}`;
    };

    return (
        <div
            className="draggable-modal_v8xK4z"
            style={{
                position: "fixed",
                left: pos.x,
                top: pos.y,
                width: size.w,
                height: size.h,
                zIndex: 99999,
                overflow: "hidden",
                cursor: "grab",
                userSelect: "none",
            }}
            onMouseDown={handleMouseDown}
        >
            <div className="draggable-modal-header_v8xK4z">
                <span>VOD 하이라이트</span>
                <button onClick={onClose} className="draggable-modal-close_v8xK4z">
                    &times;
                </button>
            </div>
            <div className="draggable-modal-body_v8xK4z" style={{ overflow: "auto", height: "calc(100% - 36px)" }}>
                {items.length === 0 ? (
                    <div className="no-highlights_v8xK4z">하이라이트 없음</div>
                ) : (
                    <ul className="highlight-list_v8xK4z">
                        {items.map((item, i) => (
                            <li key={i} className="highlight-item_v8xK4z" onClick={() => onSeek(item.time)}>
                                <span className="highlight-time_v8xK4z">{formatTime(item.time)}</span>
                                <span className="highlight-title_v8xK4z">{item.title}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div
                className="resize-handle_v8xK4z"
                style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    width: 14,
                    height: 14,
                    cursor: "se-resize",
                }}
                onMouseDown={handleResizeDown}
            />
        </div>
    );
};

// ============================================================
// VOD 하이라이트 스캐너
// ============================================================

interface HighlightEntry extends HighlightItem {}

function useHighlightScanner(): HighlightEntry[] {
    const [items, setItems] = useState<HighlightEntry[]>([]);

    useEffect(() => {
        const scan = () => {
            const els = document.querySelectorAll<HTMLElement>(".vod-highlight, [data-highlight-time]");
            if (els.length === 0) return;
            const entries: HighlightEntry[] = Array.from(els).map((el) => ({
                time: Number(el.dataset.highlightTime ?? el.dataset.time ?? 0),
                title: el.dataset.title ?? el.textContent?.trim() ?? "",
            }));
            setItems(entries);
        };

        scan();
        const timer = setInterval(scan, 3000);
        return () => clearInterval(timer);
    }, []);

    return items;
}

// ============================================================
// VOD 페이지 메인 컴포넌트
// ============================================================

const VodPage: React.FC = observer(() => {
    const settings = useSettingsStore();
    const { pathname } = window.location;

    // 캐치 페이지 여부: /player/catch 또는 /player/<num>/catch
    const isCatchPage =
        pathname === "/player/catch" || pathname.startsWith("/player/catch/") || /\/player\/\d+\/catch/.test(pathname);

    // ─── 캐치 페이지: 사이드바 마운트 ────────────────────────────
    const [sidebarTarget, setSidebarTarget] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (!isCatchPage || !settings.isCustomSidebarEnabled) return;
        document.body.classList.add("customSidebar");
        const container = document.createElement("div");
        document.body.appendChild(container);
        setSidebarTarget(container);
        return () => {
            container.remove();
            document.body.classList.remove("customSidebar");
        };
    }, [isCatchPage, settings.isCustomSidebarEnabled]);

    // ─── 일반 VOD 기능 ────────────────────────────────────────────
    const highlightItems = useHighlightScanner();
    const [showHighlights, setShowHighlights] = useState(false);

    // 최고 화질 자동 선택
    useEffect(() => {
        if (!settings.isSelectBestQualityEnabled) return;

        const trySelect = () => {
            const qualityBtns = document.querySelectorAll<HTMLElement>(
                '[class*="quality"] option, [class*="resolution"] option',
            );
            if (qualityBtns.length > 0) {
                const select = qualityBtns[0].closest("select") as HTMLSelectElement;
                if (select) {
                    // 첫 번째(최고 화질)를 선택
                    select.selectedIndex = 0;
                    select.dispatchEvent(new Event("change", { bubbles: true }));
                }
                return true;
            }
            return false;
        };

        // 폴링으로 화질 메뉴가 나타날 때까지 재시도
        const timer = setInterval(() => {
            if (trySelect()) clearInterval(timer);
        }, 500);
        const timeout = setTimeout(() => clearInterval(timer), 10000);

        return () => {
            clearInterval(timer);
            clearTimeout(timeout);
        };
    }, [settings.isSelectBestQualityEnabled]);

    // VOD 하이라이트 버튼 표시
    useEffect(() => {
        if (!settings.isVODHighlightEnabled) return;
        if (highlightItems.length === 0) return;
        setShowHighlights(true);
    }, [settings.isVODHighlightEnabled, highlightItems.length]);

    const handleSeek = useCallback((time: number) => {
        const video = document.querySelector("video");
        if (video) video.currentTime = time;
    }, []);

    return (
        <>
            {/* 캐치 페이지 사이드바 */}
            {isCatchPage && sidebarTarget && ReactDOM.createPortal(<SidebarView />, sidebarTarget)}

            {/* 일반 VOD 하이라이트 모달 */}
            {!isCatchPage && settings.isVODHighlightEnabled && showHighlights && (
                <DraggableResizableModal
                    items={highlightItems}
                    onSeek={handleSeek}
                    onClose={() => setShowHighlights(false)}
                />
            )}
        </>
    );
});

export default VodPage;
