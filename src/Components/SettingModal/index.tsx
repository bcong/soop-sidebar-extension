import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react-lite";
import { useSettingsStore, useSidebarStore } from "@Stores/index";
import "./style.less";

// ============================================================
// 설정 모달 — 전체 7개 섹션
// ============================================================

// ============================================================
// 설정 내보내기/불러오기 유틸
// ============================================================
const EXPORT_KEYS = [
    "isCustomSidebarEnabled",
    "isRandomSortEnabled",
    "isFavoriteGroupEnabled",
    "isShortenFavoriteGroupNameEnabled",
    "isCategoryGroupEnabled",
    "isShortenCategoryNameEnabled",
    "isChannelFeedEnabled",
    "isBlockedCategorySortingEnabled",
    "isPinnedStreamWithNotificationEnabled",
    "isPinnedStreamWithPinEnabled",
    "isPinnedOnlineOnlyEnabled",
    "isSmallUserLayoutEnabled",
    "isSendLoadBroadEnabled",
    "isDuplicateRemovalEnabled",
    "isTopDuplicateRemovalEnabled",
    "myplusOrder",
    "isChzzkFollowChannelsEnabled",
    "isChzzkTopChannelsEnabled",
    "displayFollow",
    "displayMyplus",
    "pollIntervalSeconds",
    "displayMyplusvod",
    "displayTop",
    "nicknameWidth",
    "isAlignNicknameRightEnabled",
    "isThemeLockEnabled",
    "isRemoveRedistributionTagEnabled",
    "isRemoveWatchLaterButtonEnabled",
    "isRemoveBroadStartTimeTagEnabled",
    "isReplaceEmptyThumbnailEnabled",
    "isThumbnailTooltipEnabled",
    "isRemoveCarouselEnabled",
    "isBroadTitleTextEllipsisEnabled",
    "isNoAutoVODEnabled",
    "isAutoReloadAfterBroadcastEndEnabled",
    "isHideEsportsInfoEnabled",
    "isShowPauseButtonEnabled",
    "isCaptureButtonEnabled",
    "preferredQuality",
    "isClickPlayerEventMapperEnabled",
    "selectLeftClick",
    "selectRightClick",
    "isShowBufferTimeTitleEnabled",
    "isShowBufferTimeChatEnabled",
    "isSharpmodeShortcutEnabled",
    "isLLShortcutEnabled",
    "isQualityChangeShortcutEnabled",
    "isMutedInactiveTabsEnabled",
    "isAutoChangeQualityEnabled",
    "isDocumentTitleUpdateEnabled",
    "isShowSidebarOnScreenModeAlwaysEnabled",
    "isMouseOverSideBarEnabled",
    "isChatPositionEnabled",
    "isAutoScreenModeEnabled",
    "isClickToMuteEnabled",
    "isSelectBestQualityEnabled",
    "isVODHighlightEnabled",
    "isHideSupporterBadgeEnabled",
    "isHideFanBadgeEnabled",
    "isHideSubBadgeEnabled",
    "isHideVIPBadgeEnabled",
    "isHideMngrBadgeEnabled",
    "isHideStreamerBadgeEnabled",
    "isUnlockCopyPasteEnabled",
    "isHideButtonsAboveChatInputEnabled",
    "isHideChatItemsEnabled",
] as const;

async function compressSettings(data: unknown): Promise<string> {
    const encoded = new TextEncoder().encode(JSON.stringify(data));
    const cs = new (CompressionStream as unknown as new (format: string) => {
        writable: WritableStream;
        readable: ReadableStream;
    })("deflate-raw");
    const writer = cs.writable.getWriter();
    writer.write(encoded);
    writer.close();
    const chunks: Uint8Array[] = [];
    const reader = (cs.readable as ReadableStream<Uint8Array>).getReader();
    for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
    }
    const bytes = new Uint8Array(chunks.reduce((n, c) => n + c.length, 0));
    let off = 0;
    for (const c of chunks) {
        bytes.set(c, off);
        off += c.length;
    }
    let binary = "";
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
}

async function decompressSettings(b64: string): Promise<unknown> {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const ds = new (DecompressionStream as unknown as new (format: string) => {
        writable: WritableStream;
        readable: ReadableStream;
    })("deflate-raw");
    const writer = ds.writable.getWriter();
    writer.write(bytes);
    writer.close();
    const chunks: Uint8Array[] = [];
    const reader = (ds.readable as ReadableStream<Uint8Array>).getReader();
    for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
    }
    const combined = new Uint8Array(chunks.reduce((n, c) => n + c.length, 0));
    let off = 0;
    for (const c of chunks) {
        combined.set(c, off);
        off += c.length;
    }
    return JSON.parse(new TextDecoder().decode(combined));
}

const SECTIONS = [
    { id: "broadcast-options-title", label: "방송 목록" },
    { id: "sidebar-options-title", label: "사이드바" },
    { id: "live-player-options-title", label: "LIVE 플레이어" },
    { id: "vod-player-options-title", label: "VOD 플레이어" },
    { id: "chat-options-title", label: "채팅창" },
    { id: "etc-options-title", label: "기타" },
    { id: "management-title", label: "차단/부가설명" },
];

// -------
// Toggle — sample.js와 동일: label > input + span.slider_v8xK4z.round
// -------
const Toggle: React.FC<{
    checked: boolean;
    onChange: (val: boolean) => void;
    id?: string;
}> = ({ checked, onChange, id }) => (
    <label className="switch_v8xK4z">
        <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span className="slider_v8xK4z round" />
    </label>
);

// -------
// Badge — 설정 항목 카테고리 배지
// -------
type BadgeKey =
    | "list"
    | "sidebar"
    | "follow"
    | "myplus"
    | "top"
    | "live"
    | "vod"
    | "player"
    | "chat"
    | "shortcut"
    | "tab"
    | "screen"
    | "nickname"
    | "etc";

const BADGE_CONFIG: Record<BadgeKey, { label: string; bg: string; color: string }> = {
    list: { label: "목록", bg: "rgba(121,134,203,0.18)", color: "#7986cb" },
    sidebar: { label: "사이드바", bg: "rgba(77,182,172,0.18)", color: "#4db6ac" },
    follow: { label: "즐겨찾기", bg: "rgba(249,168,37,0.18)", color: "#f9a825" },
    myplus: { label: "추천채널", bg: "rgba(102,187,106,0.18)", color: "#66bb6a" },
    top: { label: "인기채널", bg: "rgba(239,83,80,0.18)", color: "#ef5350" },
    live: { label: "LIVE", bg: "rgba(229,57,53,0.18)", color: "#ef5350" },
    vod: { label: "VOD", bg: "rgba(103,58,183,0.18)", color: "#9575cd" },
    etc: { label: "기타", bg: "rgba(158,158,158,0.18)", color: "#9e9e9e" },
    player: { label: "플레이어", bg: "rgba(33,150,243,0.18)", color: "#42a5f5" },
    chat: { label: "채팅창", bg: "rgba(0,188,212,0.18)", color: "#26c6da" },
    shortcut: { label: "단축키", bg: "rgba(156,39,176,0.18)", color: "#ce93d8" },
    tab: { label: "탭", bg: "rgba(96,125,139,0.18)", color: "#90a4ae" },
    screen: { label: "스크린", bg: "rgba(25,118,210,0.18)", color: "#64b5f6" },
    nickname: { label: "닉네임", bg: "rgba(233,30,99,0.18)", color: "#f48fb1" },
};

const B: React.FC<{ k: BadgeKey }> = ({ k }) => {
    const c = BADGE_CONFIG[k];
    return (
        <span
            style={{
                display: "inline-block",
                padding: "1px 6px",
                marginRight: 8,
                borderRadius: 3,
                fontSize: "10px",
                fontWeight: 700,
                lineHeight: "16px",
                verticalAlign: "middle",
                background: c.bg,
                color: c.color,
                border: `1px solid ${c.color}55`,
                whiteSpace: "nowrap",
                flexShrink: 0,
            }}
        >
            {c.label}
        </span>
    );
};

// -------
// 단일 옵션 행 (badge + label + Toggle)
// -------
const Opt: React.FC<{
    id: string;
    badge?: BadgeKey;
    label: React.ReactNode;
    checked: boolean;
    onChange: (val: boolean) => void;
}> = ({ id, badge, label, checked, onChange }) => (
    <div className="option_v8xK4z">
        <label htmlFor={id}>
            {badge != null && <B k={badge} />}
            {label}
        </label>
        <Toggle checked={checked} onChange={onChange} id={id} />
    </div>
);

// ============================================================
// Main modal component
// ============================================================

const SettingModal: React.FC = observer(() => {
    const s = useSettingsStore();
    const sb = useSidebarStore();
    const [open, setOpen] = useState(false);
    const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
    const [searchText, setSearchText] = useState("");
    const [exportMsg, setExportMsg] = useState("");
    const [importMsg, setImportMsg] = useState("");
    const bodyRef = useRef<HTMLDivElement>(null);
    const [triggerContainer, setTriggerContainer] = useState<HTMLElement | null>(null);

    // sample.js addModalSettings: div#openModalBtn을 div.serviceUtil에 prepend
    useEffect(() => {
        const containerDiv = document.createElement("div");
        containerDiv.setAttribute("id", "openModalBtn");

        const attach = (serviceUtil: Element) => {
            serviceUtil.prepend(containerDiv);
            setTriggerContainer(containerDiv);
        };

        const existing = document.querySelector("div.serviceUtil");
        if (existing) {
            attach(existing);
        } else {
            const observer = new MutationObserver(() => {
                const el = document.querySelector("div.serviceUtil");
                if (el) {
                    observer.disconnect();
                    attach(el);
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
            return () => {
                observer.disconnect();
                containerDiv.remove();
            };
        }
        return () => containerDiv.remove();
    }, []);

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    // ESC 닫기
    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [open]);

    // 스크롤 위치에 따라 좌측 메뉴 활성 섹션 실시간 업데이트
    useEffect(() => {
        if (!open) return;
        const container = bodyRef.current;
        if (!container) return;
        const updateActive = () => {
            let active = SECTIONS[0].id;
            const containerTop = container.getBoundingClientRect().top;
            for (const sec of SECTIONS) {
                const el = container.querySelector<HTMLElement>(`#${sec.id}`);
                if (!el) continue;
                const relTop = el.getBoundingClientRect().top - containerTop;
                if (relTop <= 80) {
                    active = sec.id;
                }
            }
            setActiveSection(active);
        };
        container.addEventListener("scroll", updateActive, { passive: true });
        return () => container.removeEventListener("scroll", updateActive);
    }, [open]);

    const scrollToSection = (id: string) => {
        setActiveSection(id);
        const el = bodyRef.current?.querySelector(`#${id}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const version = (typeof GM_info !== "undefined" ? GM_info?.script?.version : "") || __SCRIPT_VERSION__;

    const handleExport = async () => {
        const data: Record<string, unknown> = {};
        for (const key of EXPORT_KEYS) {
            data[key] = (s as unknown as Record<string, unknown>)[key];
        }
        // SidebarStore 핀/차단 목록
        data["pinnedChzzkUsers"] = sb.pinnedChzzkUsers;
        data["pinnedCategories"] = sb.pinnedCategories;
        data["blockedUsers"] = sb.blockedUsers;
        data["blockedCategories"] = sb.blockedCategories;
        try {
            const compressed = await compressSettings(data);
            await navigator.clipboard.writeText(compressed);
            setExportMsg("복사됨");
            setTimeout(() => setExportMsg(""), 2500);
        } catch {
            setExportMsg("복사 실패");
            setTimeout(() => setExportMsg(""), 3000);
        }
    };

    const handleImport = async () => {
        try {
            const text = (await navigator.clipboard.readText()).trim();
            if (!text) throw new Error("empty");
            let data: unknown;
            try {
                data = await decompressSettings(text);
            } catch {
                data = JSON.parse(text);
            }
            if (typeof data !== "object" || data === null) throw new Error("invalid");
            const SIDEBAR_KEYS = ["pinnedChzzkUsers", "pinnedCategories", "blockedUsers", "blockedCategories"] as const;
            for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
                if ((EXPORT_KEYS as readonly string[]).includes(key)) {
                    (s as unknown as { setSetting: (k: string, v: unknown) => void }).setSetting(key, value);
                } else if ((SIDEBAR_KEYS as readonly string[]).includes(key)) {
                    if (key === "pinnedChzzkUsers") sb.setPinnedChzzkUsers(value as string[]);
                    else if (key === "pinnedCategories") sb.setPinnedCategories(value as typeof sb.pinnedCategories);
                    else if (key === "blockedUsers") sb.setBlockedUsers(value as typeof sb.blockedUsers);
                    else if (key === "blockedCategories") sb.setBlockedCategories(value as typeof sb.blockedCategories);
                }
            }
            setImportMsg("적용 완료");
            setTimeout(() => setImportMsg(""), 3000);
        } catch {
            setImportMsg("올바르지 않은 설정 코드");
            setTimeout(() => setImportMsg(""), 3000);
        }
    };

    const modal = open ? (
        <div
            id="myModal"
            className="modal_v8xK4z"
            style={{ display: "block" }}
            onClick={(e) => {
                if (e.target === e.currentTarget) closeModal();
            }}
        >
            <div className="modal-content_v8xK4z">
                {/* 인덱스 nav — sample.js와 동일 구조 */}
                <nav className="modal-index_v8xK4z">
                    <h3 className="index-title_v8xK4z">설정 메뉴</h3>
                    {SECTIONS.map((sec) => (
                        <button
                            key={sec.id}
                            className={`index-button_v8xK4z${activeSection === sec.id ? " active" : ""}`}
                            data-target-id={sec.id}
                            onClick={() => scrollToSection(sec.id)}
                        >
                            {sec.label}
                        </button>
                    ))}
                    <div
                        style={{
                            marginTop: "auto",
                            padding: "6px 0 0",
                            display: "flex",
                            flexDirection: "column",
                            gap: 4,
                        }}
                    >
                        <button
                            className="index-button_v8xK4z"
                            onClick={handleExport}
                            disabled={!!exportMsg}
                            style={{
                                textAlign: "left",
                                color: exportMsg === "복사 실패" ? "#f44336" : exportMsg ? "#4caf50" : undefined,
                            }}
                        >
                            {exportMsg || "내보내기"}
                        </button>
                        <button
                            className="index-button_v8xK4z"
                            onClick={handleImport}
                            disabled={!!importMsg}
                            style={{
                                textAlign: "left",
                                color:
                                    importMsg === "올바르지 않은 설정 코드"
                                        ? "#f44336"
                                        : importMsg
                                          ? "#4caf50"
                                          : undefined,
                            }}
                        >
                            {importMsg || "불러오기"}
                        </button>
                    </div>
                    <div className="modal-version_v8xK4z">
                        SOOP Sidebar UI
                        <br />({version})
                    </div>
                </nav>

                {/* 메인 콘텐츠 */}
                <div className="modal-main-content_v8xK4z">
                    {/* 헤더 */}
                    <header className="modal-header_v8xK4z">
                        <div className="modal-search-container_v8xK4z">
                            <div className="search-input-wrapper_v8xK4z">
                                <span className="search-icon_v8xK4z">
                                    <i className="fa fa-search" />
                                </span>
                                <input
                                    id="modal-search-input_v8xK4z"
                                    type="text"
                                    placeholder="설정 검색..."
                                    autoComplete="off"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                                <button
                                    id="modal-search-clear_v8xK4z"
                                    title="검색 비우기"
                                    style={{ display: searchText ? undefined : "none" }}
                                    onClick={() => setSearchText("")}
                                >
                                    &times;
                                </button>
                            </div>
                        </div>
                        <button className="close-button_v8xK4z" aria-label="닫기" onClick={closeModal}>
                            &times;
                        </button>
                    </header>

                    {/* 본문 */}
                    <div className="modal-body_v8xK4z" ref={bodyRef}>
                        {/* ── 방송 목록 ── */}
                        <section>
                            <h3 id="broadcast-options-title" className="section-title_v8xK4z">
                                방송 목록 옵션
                            </h3>
                            <div className="option_v8xK4z multi-option_v8xK4z">
                                <Opt
                                    id="switchRemoveRedistributionTag"
                                    badge="list"
                                    label="탐방허용 태그 숨기기"
                                    checked={s.isRemoveRedistributionTagEnabled}
                                    onChange={(v) => s.setSetting("isRemoveRedistributionTagEnabled", v)}
                                />
                                <Opt
                                    id="switchRemoveWatchLaterButton"
                                    badge="list"
                                    label="나중에 보기 버튼 숨기기"
                                    checked={s.isRemoveWatchLaterButtonEnabled}
                                    onChange={(v) => s.setSetting("isRemoveWatchLaterButtonEnabled", v)}
                                />
                                <Opt
                                    id="switchRemoveBroadStartTimeTag"
                                    badge="list"
                                    label="방송 시작 시간 숨기기"
                                    checked={s.isRemoveBroadStartTimeTagEnabled}
                                    onChange={(v) => s.setSetting("isRemoveBroadStartTimeTagEnabled", v)}
                                />
                            </div>
                            <Opt
                                id="switchReplaceEmptyThumbnail"
                                badge="list"
                                label="마우스 오버 시 연령 제한 썸네일 보기"
                                checked={s.isReplaceEmptyThumbnailEnabled}
                                onChange={(v) => s.setSetting("isReplaceEmptyThumbnailEnabled", v)}
                            />
                            <Opt
                                id="switchThumbnailTooltip"
                                badge="list"
                                label="마우스 오버 시 썸네일 미리보기 툴팁"
                                checked={s.isThumbnailTooltipEnabled}
                                onChange={(v) => s.setSetting("isThumbnailTooltipEnabled", v)}
                            />
                            <Opt
                                id="switchRemoveCarousel"
                                badge="list"
                                label="자동 재생되는 채널 전광판 숨기기"
                                checked={s.isRemoveCarouselEnabled}
                                onChange={(v) => s.setSetting("isRemoveCarouselEnabled", v)}
                            />
                            <Opt
                                id="switchBroadTitleTextEllipsis"
                                badge="list"
                                label="방송 제목이 긴 경우 ...으로 생략하기"
                                checked={s.isBroadTitleTextEllipsisEnabled}
                                onChange={(v) => s.setSetting("isBroadTitleTextEllipsisEnabled", v)}
                            />
                        </section>

                        <div className="divider_v8xK4z" />

                        {/* ── 사이드바 ── */}
                        <section>
                            <h3 id="sidebar-options-title" className="section-title_v8xK4z">
                                사이드바 옵션
                            </h3>
                            <Opt
                                id="switchCustomSidebar"
                                badge="sidebar"
                                label="사이드바 사용 (해제 시 기본 사이드바)"
                                checked={s.isCustomSidebarEnabled}
                                onChange={(v) => s.setSetting("isCustomSidebarEnabled", v)}
                            />
                            <div className="option_v8xK4z range-option_v8xK4z customSidebarOptionsContainer">
                                <label htmlFor="favoriteChannelsDisplay">
                                    <B k="follow" />
                                    즐겨찾기 채널 표시 수
                                </label>
                                <div className="range-container_v8xK4z">
                                    <input
                                        type="range"
                                        id="favoriteChannelsDisplay"
                                        min={0}
                                        max={100}
                                        title="0 = 숨김"
                                        value={s.displayFollow}
                                        onChange={(e) => s.setSetting("displayFollow", Number(e.target.value))}
                                    />
                                    <span id="favoriteChannelsDisplayValue" className="range-value_v8xK4z">
                                        {s.displayFollow}
                                    </span>
                                </div>
                            </div>
                            <div className="option_v8xK4z range-option_v8xK4z customSidebarOptionsContainer">
                                <label htmlFor="myPlusChannelsDisplay">
                                    <B k="myplus" />
                                    추천 채널 표시 수
                                </label>
                                <div className="range-container_v8xK4z">
                                    <input
                                        type="range"
                                        id="myPlusChannelsDisplay"
                                        min={0}
                                        max={40}
                                        title="0 = 숨김"
                                        value={s.displayMyplus}
                                        onChange={(e) => s.setSetting("displayMyplus", Number(e.target.value))}
                                    />
                                    <span id="myPlusChannelsDisplayValue" className="range-value_v8xK4z">
                                        {s.displayMyplus}
                                    </span>
                                </div>
                            </div>
                            <div className="option_v8xK4z range-option_v8xK4z customSidebarOptionsContainer">
                                <label htmlFor="myPlusVODDisplay">
                                    <B k="myplus" />
                                    추천 VOD 표시 수
                                </label>
                                <div className="range-container_v8xK4z">
                                    <input
                                        type="range"
                                        id="myPlusVODDisplay"
                                        min={0}
                                        max={40}
                                        title="0 = 숨김"
                                        value={s.displayMyplusvod}
                                        onChange={(e) => s.setSetting("displayMyplusvod", Number(e.target.value))}
                                    />
                                    <span id="myPlusVODDisplayValue" className="range-value_v8xK4z">
                                        {s.displayMyplusvod}
                                    </span>
                                </div>
                            </div>
                            <div className="option_v8xK4z range-option_v8xK4z customSidebarOptionsContainer">
                                <label htmlFor="popularChannelsDisplay">
                                    <B k="top" />
                                    인기 채널 표시 수
                                </label>
                                <div className="range-container_v8xK4z">
                                    <input
                                        type="range"
                                        id="popularChannelsDisplay"
                                        min={0}
                                        max={40}
                                        title="0 = 숨김"
                                        value={s.displayTop}
                                        onChange={(e) => s.setSetting("displayTop", Number(e.target.value))}
                                    />
                                    <span id="popularChannelsDisplayValue" className="range-value_v8xK4z">
                                        {s.displayTop}
                                    </span>
                                </div>
                            </div>
                            <div className="option_v8xK4z customSidebarOptionsContainer">
                                <label htmlFor="pollIntervalSelect">
                                    <B k="sidebar" />
                                    새로고침 주기
                                </label>
                                <div className="mapper-setting_v8xK4z">
                                    <select
                                        id="pollIntervalSelect"
                                        value={s.pollIntervalSeconds}
                                        onChange={(e) => s.setSetting("pollIntervalSeconds", Number(e.target.value))}
                                    >
                                        {Array.from({ length: 12 }, (_, i) => (i + 1) * 5).map((sec) => (
                                            <option key={sec} value={sec}>
                                                {sec}초
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div
                                className="divider_v8xK4z customSidebarOptionsContainer"
                                style={{ marginTop: 15, marginBottom: 15 }}
                            />
                            <Opt
                                id="switchSmallUserLayout"
                                badge="sidebar"
                                label="미니 방송 목록"
                                checked={s.isSmallUserLayoutEnabled}
                                onChange={(v) => s.setSetting("isSmallUserLayoutEnabled", v)}
                            />
                            <Opt
                                id="sendLoadBroadCheck"
                                badge="sidebar"
                                label="새로고침 없는 방송 전환 사용"
                                checked={s.isSendLoadBroadEnabled}
                                onChange={(v) => s.setSetting("isSendLoadBroadEnabled", v)}
                            />
                            <Opt
                                id="switchFavoriteGroups"
                                badge="follow"
                                label="그룹 탭 표시"
                                checked={s.isFavoriteGroupEnabled}
                                onChange={(v) => s.setSetting("isFavoriteGroupEnabled", v)}
                            />
                            <Opt
                                id="switchShortenFavoriteGroupName"
                                badge="follow"
                                label="그룹 탭 이름을 한 글자로 축약"
                                checked={s.isShortenFavoriteGroupNameEnabled}
                                onChange={(v) => s.setSetting("isShortenFavoriteGroupNameEnabled", v)}
                            />
                            <Opt
                                id="switchRandomSort"
                                badge="sidebar"
                                label="랜덤 정렬 (해제 시 시청자 많은 순)"
                                checked={s.isRandomSortEnabled}
                                onChange={(v) => s.setSetting("isRandomSortEnabled", v)}
                            />
                            <Opt
                                id="switchChannelFeed"
                                badge="follow"
                                label="오프라인 채널의 최신 글 보기"
                                checked={s.isChannelFeedEnabled}
                                onChange={(v) => s.setSetting("isChannelFeedEnabled", v)}
                            />
                            <Opt
                                id="switchBlockedCategorySorting"
                                badge="follow"
                                label="차단된 카테고리를 하단으로 이동"
                                checked={s.isBlockedCategorySortingEnabled}
                                onChange={(v) => s.setSetting("isBlockedCategorySortingEnabled", v)}
                            />
                            <Opt
                                id="fixNotificationChannel"
                                badge="follow"
                                label="알림 설정된 채널을 상단 고정"
                                checked={s.isPinnedStreamWithNotificationEnabled}
                                onChange={(v) => s.setSetting("isPinnedStreamWithNotificationEnabled", v)}
                            />
                            <Opt
                                id="fixFixedChannel"
                                badge="follow"
                                label="스트리머 관리에서 고정된 채널을 상단 고정"
                                checked={s.isPinnedStreamWithPinEnabled}
                                onChange={(v) => s.setSetting("isPinnedStreamWithPinEnabled", v)}
                            />
                            <Opt
                                id="switchPinnedOnlineOnly"
                                badge="follow"
                                label="온라인일 때만 상단 고정하기"
                                checked={s.isPinnedOnlineOnlyEnabled}
                                onChange={(v) => s.setSetting("isPinnedOnlineOnlyEnabled", v)}
                            />
                            <Opt
                                id="mpSortByViewers"
                                badge="sidebar"
                                label="정렬을 추천순으로 변경 (해제 시 시청자순)"
                                checked={Boolean(s.myplusOrder)}
                                onChange={(v) => s.setSetting("myplusOrder", v ? 1 : 0)}
                            />
                            <Opt
                                id="removeDuplicates"
                                badge="follow"
                                label="즐겨찾기 중복 제거"
                                checked={s.isDuplicateRemovalEnabled}
                                onChange={(v) => s.setSetting("isDuplicateRemovalEnabled", v)}
                            />
                            <Opt
                                id="switchTopDuplicateRemoval"
                                badge="top"
                                label="인기채널 즐겨찾기 중복 제거"
                                checked={s.isTopDuplicateRemovalEnabled}
                                onChange={(v) => s.setSetting("isTopDuplicateRemovalEnabled", v)}
                            />
                            <Opt
                                id="switchCategoryGroups"
                                badge="top"
                                label="카테고리 탭 표시"
                                checked={s.isCategoryGroupEnabled}
                                onChange={(v) => s.setSetting("isCategoryGroupEnabled", v)}
                            />
                            <Opt
                                id="switchShortenCategoryName"
                                badge="top"
                                label="카테고리 탭 이름을 한 글자로 축약"
                                checked={s.isShortenCategoryNameEnabled}
                                onChange={(v) => s.setSetting("isShortenCategoryNameEnabled", v)}
                            />
                        </section>

                        <div className="divider_v8xK4z" />

                        {/* ── LIVE 플레이어 ── */}
                        <section>
                            <h3 id="live-player-options-title" className="section-title_v8xK4z">
                                LIVE 플레이어 옵션
                            </h3>
                            <Opt
                                id="switchNoAutoVOD"
                                badge="live"
                                label="방송 종료 후 자동 VOD 재생 중지"
                                checked={s.isNoAutoVODEnabled}
                                onChange={(v) => s.setSetting("isNoAutoVODEnabled", v)}
                            />
                            <Opt
                                id="switchAutoReloadAfterBroadcastEnd"
                                badge="live"
                                label="방종 후 방송 재시작 시 자동 진입"
                                checked={s.isAutoReloadAfterBroadcastEndEnabled}
                                onChange={(v) => s.setSetting("isAutoReloadAfterBroadcastEndEnabled", v)}
                            />
                            {/* redirectLive 제거 */}
                            <Opt
                                id="switchHideEsportsInfo"
                                badge="live"
                                label="E-Sports 정보 숨기기"
                                checked={s.isHideEsportsInfoEnabled}
                                onChange={(v) => s.setSetting("isHideEsportsInfoEnabled", v)}
                            />
                            <Opt
                                id="showPauseButton"
                                badge="player"
                                label="일시정지 버튼"
                                checked={s.isShowPauseButtonEnabled}
                                onChange={(v) => s.setSetting("isShowPauseButtonEnabled", v)}
                            />
                            <Opt
                                id="switchCaptureButton"
                                badge="player"
                                label="LIVE / VOD 스크린샷 버튼"
                                checked={s.isCaptureButtonEnabled}
                                onChange={(v) => s.setSetting("isCaptureButtonEnabled", v)}
                            />
                            <Opt
                                id="switchClickToMute"
                                badge="player"
                                label="클릭으로 음소거"
                                checked={s.isClickToMuteEnabled}
                                onChange={(v) => s.setSetting("isClickToMuteEnabled", v)}
                            />
                            <div className="option_v8xK4z">
                                <label htmlFor="selectPreferredQuality">
                                    <B k="player" />
                                    방송 진입 시 화질 고정
                                </label>
                                <div className="mapper-setting_v8xK4z">
                                    <select
                                        id="selectPreferredQuality"
                                        value={s.preferredQuality}
                                        onChange={(e) => s.setSetting("preferredQuality", e.target.value)}
                                    >
                                        <option value="off">사용 안함</option>
                                        <option value="max">최대화질</option>
                                        <option value="1440">1440p</option>
                                        <option value="1080">1080p</option>
                                        <option value="720">720p</option>
                                        <option value="540">540p</option>
                                        <option value="360">360p</option>
                                    </select>
                                </div>
                            </div>
                            {/* 클릭/우클릭 매핑 */}
                            <div className="option_v8xK4z">
                                <label htmlFor="switchClickPlayerEventMapper">
                                    <B k="player" />
                                    클릭/우클릭 기능 매핑
                                </label>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <div
                                        className="mapper-setting_v8xK4z"
                                        style={{ marginLeft: 0, display: "inline-flex", alignItems: "center", gap: 4 }}
                                    >
                                        <label htmlFor="selectLeftClick">좌</label>
                                        <select
                                            id="selectLeftClick"
                                            value={s.selectLeftClick}
                                            onChange={(e) => s.setSetting("selectLeftClick", e.target.value)}
                                        >
                                            <option value="none">없음</option>
                                            <option value="toggleMute">음소거</option>
                                            <option value="togglePause">일시정지</option>
                                            <option value="toggleStop">정지</option>
                                            <option value="toggleScreenMode">스크린모드</option>
                                            <option value="toggleFullscreen">전체화면</option>
                                        </select>
                                    </div>
                                    <div
                                        className="mapper-setting_v8xK4z"
                                        style={{ marginLeft: 0, display: "inline-flex", alignItems: "center", gap: 4 }}
                                    >
                                        <label htmlFor="selectRightClick">우</label>
                                        <select
                                            id="selectRightClick"
                                            value={s.selectRightClick}
                                            onChange={(e) => s.setSetting("selectRightClick", e.target.value)}
                                        >
                                            <option value="none">없음</option>
                                            <option value="toggleMute">음소거</option>
                                            <option value="togglePause">일시정지</option>
                                            <option value="toggleStop">정지</option>
                                            <option value="toggleScreenMode">스크린 모드</option>
                                            <option value="toggleFullscreen">전체화면</option>
                                        </select>
                                    </div>
                                    <Toggle
                                        checked={s.isClickPlayerEventMapperEnabled}
                                        onChange={(v) => s.setSetting("isClickPlayerEventMapperEnabled", v)}
                                        id="switchClickPlayerEventMapper"
                                    />
                                </div>
                            </div>
                            <Opt
                                id="showBufferTimeChat"
                                badge="chat"
                                label="방송 딜레이 표시"
                                checked={s.isShowBufferTimeChatEnabled}
                                onChange={(v) => s.setSetting("isShowBufferTimeChatEnabled", v)}
                            />
                            <Opt
                                id="switchSharpmodeShortcut"
                                badge="shortcut"
                                label="'선명한 모드'(e) 활성화"
                                checked={s.isSharpmodeShortcutEnabled}
                                onChange={(v) => s.setSetting("isSharpmodeShortcutEnabled", v)}
                            />
                            <Opt
                                id="switchLLShortcut"
                                badge="shortcut"
                                label="'시차 단축'(d) 활성화"
                                checked={s.isLLShortcutEnabled}
                                onChange={(v) => s.setSetting("isLLShortcutEnabled", v)}
                            />
                            <Opt
                                id="switchQualityChangeShortcut"
                                badge="shortcut"
                                label="화질 변경(숫자) 활성화"
                                checked={s.isQualityChangeShortcutEnabled}
                                onChange={(v) => s.setSetting("isQualityChangeShortcutEnabled", v)}
                            />
                            <Opt
                                id="mutedInactiveTabs"
                                badge="tab"
                                label="전환 시 음소거"
                                checked={s.isMutedInactiveTabsEnabled}
                                onChange={(v) => s.setSetting("isMutedInactiveTabsEnabled", v)}
                            />
                            <Opt
                                id="switchAutoChangeQuality"
                                badge="tab"
                                label="전환 시 화질 낮추기"
                                checked={s.isAutoChangeQualityEnabled}
                                onChange={(v) => s.setSetting("isAutoChangeQualityEnabled", v)}
                            />
                            <Opt
                                id="switchDocumentTitleUpdate"
                                badge="tab"
                                label="제목에 시청자 수 표시"
                                checked={s.isDocumentTitleUpdateEnabled}
                                onChange={(v) => s.setSetting("isDocumentTitleUpdateEnabled", v)}
                            />
                            <Opt
                                id="showBufferTimeTitle"
                                badge="tab"
                                label="제목에 방송 딜레이 표시"
                                checked={s.isShowBufferTimeTitleEnabled}
                                onChange={(v) => s.setSetting("isShowBufferTimeTitleEnabled", v)}
                            />
                            <Opt
                                id="switchShowSidebarOnScreenModeAlways"
                                badge="screen"
                                label="항상 사이드바 보기"
                                checked={s.isShowSidebarOnScreenModeAlwaysEnabled}
                                onChange={(v) => s.setSetting("isShowSidebarOnScreenModeAlwaysEnabled", v)}
                            />
                            <Opt
                                id="mouseOverSideBar"
                                badge="screen"
                                label="좌상단 마우스 오버 시 사이드바 보기"
                                checked={s.isMouseOverSideBarEnabled}
                                onChange={(v) => s.setSetting("isMouseOverSideBarEnabled", v)}
                            />

                            <Opt
                                id="chatPosition"
                                badge="screen"
                                label="세로로 긴 화면에서 채팅창을 아래에 위치"
                                checked={s.isChatPositionEnabled}
                                onChange={(v) => s.setSetting("isChatPositionEnabled", v)}
                            />
                            <Opt
                                id="switchAutoScreenMode"
                                badge="screen"
                                label="자동 스크린 모드"
                                checked={s.isAutoScreenModeEnabled}
                                onChange={(v) => s.setSetting("isAutoScreenModeEnabled", v)}
                            />
                        </section>

                        <div className="divider_v8xK4z" />

                        {/* ── VOD 플레이어 ── */}
                        <section>
                            <h3 id="vod-player-options-title" className="section-title_v8xK4z">
                                VOD 플레이어 옵션
                            </h3>
                            <Opt
                                id="selectBestQuality"
                                badge="vod"
                                label="최고화질 자동 선택"
                                checked={s.isSelectBestQualityEnabled}
                                onChange={(v) => s.setSetting("isSelectBestQualityEnabled", v)}
                            />
                            <Opt
                                id="switchVODHighlight"
                                badge="vod"
                                label="VOD 하이라이트(별별랭킹) 타임라인 활성화"
                                checked={s.isVODHighlightEnabled}
                                onChange={(v) => s.setSetting("isVODHighlightEnabled", v)}
                            />
                        </section>

                        <div className="divider_v8xK4z" />

                        {/* ── 채팅창 ── */}
                        <section>
                            <h3 id="chat-options-title" className="section-title_v8xK4z">
                                채팅창 옵션
                            </h3>
                            <div className="option_v8xK4z range-option_v8xK4z">
                                <label htmlFor="nicknameWidthDisplay">
                                    <B k="nickname" />
                                    가로 크기 (채팅 메시지 정렬 시)
                                </label>
                                <div className="range-container_v8xK4z">
                                    <input
                                        type="range"
                                        id="nicknameWidthDisplay"
                                        min={86}
                                        max={186}
                                        value={s.nicknameWidth}
                                        onChange={(e) => s.setSetting("nicknameWidth", Number(e.target.value))}
                                    />
                                    <span id="nicknameWidthDisplayValue" className="range-value_v8xK4z">
                                        {s.nicknameWidth}
                                    </span>
                                </div>
                            </div>
                            <Opt
                                id="switchAlignNicknameRight"
                                badge="nickname"
                                label="오른쪽으로 붙이기 (채팅 메시지 정렬 시)"
                                checked={s.isAlignNicknameRightEnabled}
                                onChange={(v) => s.setSetting("isAlignNicknameRightEnabled", v)}
                            />
                            <div className="option_v8xK4z multi-option_v8xK4z">
                                <Opt
                                    id="selectHideSupporterBadge"
                                    badge="chat"
                                    label="서포터 배지 숨기기"
                                    checked={s.isHideSupporterBadgeEnabled}
                                    onChange={(v) => s.setSetting("isHideSupporterBadgeEnabled", v)}
                                />
                                <Opt
                                    id="selectHideFanBadge"
                                    badge="chat"
                                    label="팬 배지 숨기기"
                                    checked={s.isHideFanBadgeEnabled}
                                    onChange={(v) => s.setSetting("isHideFanBadgeEnabled", v)}
                                />
                                <Opt
                                    id="selectHideSubBadge"
                                    badge="chat"
                                    label="구독팬 배지 숨기기"
                                    checked={s.isHideSubBadgeEnabled}
                                    onChange={(v) => s.setSetting("isHideSubBadgeEnabled", v)}
                                />
                                <Opt
                                    id="selectHideVIPBadge"
                                    badge="chat"
                                    label="열혈팬 배지 숨기기"
                                    checked={s.isHideVIPBadgeEnabled}
                                    onChange={(v) => s.setSetting("isHideVIPBadgeEnabled", v)}
                                />
                                <Opt
                                    id="selectHideMngrBadge"
                                    badge="chat"
                                    label="매니저 배지 숨기기"
                                    checked={s.isHideMngrBadgeEnabled}
                                    onChange={(v) => s.setSetting("isHideMngrBadgeEnabled", v)}
                                />
                                <Opt
                                    id="selectHideStreamerBadge"
                                    badge="chat"
                                    label="스트리머 배지 숨기기"
                                    checked={s.isHideStreamerBadgeEnabled}
                                    onChange={(v) => s.setSetting("isHideStreamerBadgeEnabled", v)}
                                />
                            </div>
                            <Opt
                                id="switchUnlockCopyPaste"
                                badge="chat"
                                label="복사/붙여넣기 기능 복원"
                                checked={s.isUnlockCopyPasteEnabled}
                                onChange={(v) => s.setSetting("isUnlockCopyPasteEnabled", v)}
                            />
                            <Opt
                                id="switchHideButtonsAboveChatInput"
                                badge="chat"
                                label="버튼 탭 숨기기"
                                checked={s.isHideButtonsAboveChatInputEnabled}
                                onChange={(v) => s.setSetting("isHideButtonsAboveChatInputEnabled", v)}
                            />
                            <Opt
                                id="switchHideChatItems"
                                badge="chat"
                                label="채팅창 메뉴 숨기기"
                                checked={s.isHideChatItemsEnabled}
                                onChange={(v) => s.setSetting("isHideChatItemsEnabled", v)}
                            />
                        </section>

                        <div className="divider_v8xK4z" />

                        {/* ── 기타 ── */}
                        <section>
                            <h3 id="etc-options-title" className="section-title_v8xK4z">
                                기타 옵션
                            </h3>
                            <div className="option_v8xK4z multi-option_v8xK4z">
                                <Opt
                                    id="switchChzzkFollowChannels"
                                    badge="etc"
                                    label="치지직 팔로우 채널 통합"
                                    checked={s.isChzzkFollowChannelsEnabled}
                                    onChange={(v) => s.setSetting("isChzzkFollowChannelsEnabled", v)}
                                />
                                <Opt
                                    id="switchChzzkTopChannels"
                                    badge="etc"
                                    label="치지직 인기 채널 통합"
                                    checked={s.isChzzkTopChannelsEnabled}
                                    onChange={(v) => s.setSetting("isChzzkTopChannelsEnabled", v)}
                                />
                                <Opt
                                    id="switchChzzkPinSync"
                                    badge="etc"
                                    label="치지직 상위 고정 동기화"
                                    checked={s.isChzzkPinSyncEnabled}
                                    onChange={(v) => s.setSetting("isChzzkPinSyncEnabled", v)}
                                />
                            </div>
                            <Opt
                                id="switchThemeLock"
                                badge="etc"
                                label="테마 쿠키 무기한 유지"
                                checked={s.isThemeLockEnabled}
                                onChange={(v) => s.setSetting("isThemeLockEnabled", v)}
                            />
                        </section>

                        {/* ── 차단/부가설명 (footer) ── */}
                        <footer className="modal-footer_v8xK4z">
                            <h3 id="management-title" className="section-title_v8xK4z">
                                차단 관리 및 부가 설명
                            </h3>
                            <p className="description_v8xK4z">
                                <i className="fa fa-ban" /> 채널 차단: 본문 방송 목록 -&gt; ⋮ 버튼 -&gt; [이
                                브라우저에서 ... 숨기기]
                            </p>
                            <p className="description_v8xK4z">
                                <i className="fa fa-check-circle" /> 카테고리 탭 추가: 본문 방송 목록 -&gt; ⋮ 버튼 -&gt;
                                [이 카테고리를 탭에 추가]
                            </p>
                            <p className="description_v8xK4z">
                                <i className="fa fa-check-circle" /> 카테고리 탭 해제: Tampermonkey 아이콘을 눌러서
                                가능합니다.
                            </p>
                            <div className="divider_v8xK4z" />
                            <p className="description_v8xK4z">
                                1) MY 페이지에서 스트리머 고정 버튼(
                                <i className="fa fa-thumb-tack" />
                                )을 누르면 사이드바에 고정이 됩니다.
                            </p>
                            <p className="description_v8xK4z">
                                3) 즐겨찾기 채널 중에서만 이동. 커스텀은 고정-&gt;알림-&gt;일반 순. 열린 탭 체크 후
                                이동.
                            </p>
                            <p className="description_v8xK4z">
                                4) 치지직 로그인이 되어있지 않으면 응답지연이 생겨서 느려집니다
                            </p>
                            <p className="description_v8xK4z">
                                5) &apos;SOOP (숲) - 현재 방송을 보고 있는 스트리머&apos; 실행 필요. 없을 시 0명으로
                                나옵니다
                            </p>
                        </footer>

                        <div className="divider_v8xK4z" />
                    </div>
                </div>
            </div>
        </div>
    ) : null;

    return (
        <>
            {ReactDOM.createPortal(modal, document.body)}
            {triggerContainer &&
                ReactDOM.createPortal(
                    <button className="btn-settings-ui" onClick={openModal} title="사이드바 설정" />,
                    triggerContainer,
                )}
        </>
    );
});

export default SettingModal;
