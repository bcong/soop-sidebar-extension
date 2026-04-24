// ==UserScript==
// @name         SOOP (숲) - 사이드바 UI 변경
// @name:ko      SOOP (숲) - 사이드바 UI 변경
// @version      20260411
// @description  사이드바 UI 변경, 채팅 모아보기, 차단기능 등
// @description:ko  사이드바 UI 변경, 채팅 모아보기, 차단기능 등
// @match        https://www.sooplive.com/*
// @match        https://play.sooplive.com/*
// @match        https://vod.sooplive.com/player/*
// @icon         https://res.sooplive.com/afreeca.ico
// @grant        unsafeWindow
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @connect      sooplive.com
// @connect      naver.com
// @run-at       document-end
// @license
// ==/UserScript==

(function () {
    "use strict";

    //======================================
    // 1. 전역 변수 및 설정 (Global Variables & Configuration)
    //======================================
    const NEW_UPDATE_DATE = 20260411;
    const CURRENT_URL = window.location.href;
    const IS_DARK_MODE = document.documentElement.getAttribute("dark") === "true";
    const HIDDEN_BJ_LIST = [];

    let allFollowUserIds = GM_getValue("allFollowUserIds", []);
    let STATION_FEED_DATA;

    let menuIds = {};
    let categoryMenuIds = {};

    let displayFollow = GM_getValue("displayFollow", 6);
    let displayMyplus = GM_getValue("displayMyplus", 6);
    let displayMyplusvod = GM_getValue("displayMyplusvod", 4);
    let displayTop = GM_getValue("displayTop", 6);

    let myplusOrder = GM_getValue("myplusOrder", 1);

    let blockedUsers = GM_getValue("blockedUsers", []);
    let blockedCategories = GM_getValue("blockedCategories", []);
    let nicknameWidth = GM_getValue("nicknameWidth", 126);

    let isOpenNewtabEnabled = GM_getValue("isOpenNewtabEnabled", 0);
    let isSidebarMinimized = GM_getValue("isSidebarMinimized", 0);
    let showSidebarOnScreenMode = GM_getValue("showSidebarOnScreenMode", 1);
    let showSidebarOnScreenModeAlways = GM_getValue("showSidebarOnScreenModeAlways", 0);
    let savedCategory = GM_getValue("szBroadCategory", 0);
    let isAutoChangeMuteEnabled = GM_getValue("isAutoChangeMuteEnabled", 0);
    let isAutoChangeQualityEnabled = GM_getValue("isAutoChangeQualityEnabled", 0);
    let isDuplicateRemovalEnabled = GM_getValue("isDuplicateRemovalEnabled", 1);
    let isRemainingBufferTimeEnabled = GM_getValue("isRemainingBufferTimeEnabled", 1);
    let preferredQualitySetting = GM_getValue("preferredQualitySetting", "off");
    let isPinnedStreamWithNotificationEnabled = GM_getValue("isPinnedStreamWithNotificationEnabled", 0);
    let isPinnedStreamWithPinEnabled = GM_getValue("isPinnedStreamWithPinEnabled", 0);
    let isBottomChatEnabled = GM_getValue("isBottomChatEnabled", 0);
    let isMakePauseButtonEnabled = GM_getValue("isMakePauseButtonEnabled", 1);
    let isCaptureButtonEnabled = GM_getValue("isCaptureButtonEnabled", 1);
    let isMakeSharpModeShortcutEnabled = GM_getValue("isMakeSharpModeShortcutEnabled", 1);
    let isMakeLowLatencyShortcutEnabled = GM_getValue("isMakeLowLatencyShortcutEnabled", 1);
    let isMakeQualityChangeShortcutEnabled = GM_getValue("isMakeQualityChangeShortcutEnabled", 0);
    let isSendLoadBroadEnabled = GM_getValue("isSendLoadBroadEnabled", 1);
    let isSelectBestQualityEnabled = GM_getValue("isSelectBestQualityEnabled", 1);
    let isHideSupporterBadgeEnabled = GM_getValue("isHideSupporterBadgeEnabled", 0);
    let isHideFanBadgeEnabled = GM_getValue("isHideFanBadgeEnabled", 0);
    let isHideSubBadgeEnabled = GM_getValue("isHideSubBadgeEnabled", 0);
    let isHideVIPBadgeEnabled = GM_getValue("isHideVIPBadgeEnabled", 0);
    let isHideManagerBadgeEnabled = GM_getValue("isHideManagerBadgeEnabled", 0);
    let isHideStreamerBadgeEnabled = GM_getValue("isHideStreamerBadgeEnabled", 0);
    let isVideoSkipHandlerEnabled = GM_getValue("isVideoSkipHandlerEnabled", 0);
    let isSmallUserLayoutEnabled = GM_getValue("isSmallUserLayoutEnabled", 0);
    let isChannelFeedEnabled = GM_getValue("isChannelFeedEnabled", 1);
    let isCustomSidebarEnabled = GM_getValue("isCustomSidebarEnabled", 1);
    let isThemeLockEnabled = GM_getValue("isThemeLockEnabled", 0);
    let isRemoveCarouselEnabled = GM_getValue("isRemoveCarouselEnabled", 0);
    let isDocumentTitleUpdateEnabled = GM_getValue("isDocumentTitleUpdateEnabled", 1);
    let isRemoveRedistributionTagEnabled = GM_getValue("isRemoveRedistributionTagEnabled", 1);
    let isRemoveWatchLaterButtonEnabled = GM_getValue("isRemoveWatchLaterButtonEnabled", 1);
    let isRemoveBroadStartTimeTagEnabled = GM_getValue("isRemoveBroadStartTimeTagEnabled", 0);
    let isBroadTitleTextEllipsisEnabled = GM_getValue("isBroadTitleTextEllipsisEnabled", 0);
    let isUnlockCopyPasteEnabled = GM_getValue("isUnlockCopyPasteEnabled", 0);
    let isAlignNicknameRightEnabled = GM_getValue("isAlignNicknameRightEnabled", 0);
    let isReplaceEmptyThumbnailEnabled = GM_getValue("isReplaceEmptyThumbnailEnabled", 1);
    let isThumbnailTooltipEnabled = GM_getValue("isThumbnailTooltipEnabled", 1);
    let isAutoScreenModeEnabled = GM_getValue("isAutoScreenModeEnabled", 0);
    let isAdjustDelayNoGridEnabled = GM_getValue("isAdjustDelayNoGridEnabled", 0);
    let ishideButtonsAboveChatInputEnabled = GM_getValue("ishideButtonsAboveChatInputEnabled", 0);
    let isRemoveShadowsFromCatchEnabled = GM_getValue("isRemoveShadowsFromCatchEnabled", 0);
    let isChzzkTopChannelsEnabled = GM_getValue("isChzzkTopChannelsEnabled", 0);
    let isChzzkFollowChannelsEnabled = GM_getValue("isChzzkFollowChannelsEnabled", 0);
    let isAdaptiveSpeedControlEnabled = GM_getValue("isAdaptiveSpeedControlEnabled", 0);
    let isNoAutoVODEnabled = GM_getValue("isNoAutoVODEnabled", 1);
    let isAutoResumeVideoEnabled = GM_getValue("isAutoResumeVideoEnabled", 0);
    let isRedirectLiveEnabled = GM_getValue("isRedirectLiveEnabled", 0);
    let redirectLiveSortOption = GM_getValue("redirectLiveSortOption", "custom");
    let isHideEsportsInfoEnabled = GM_getValue("isHideEsportsInfoEnabled", 0);
    let isBlockedCategorySortingEnabled = GM_getValue("isBlockedCategorySortingEnabled", 0);
    let isRandomSortEnabled = GM_getValue("isRandomSortEnabled", 0);
    let isPinnedOnlineOnlyEnabled = GM_getValue("isPinnedOnlineOnlyEnabled", 0);
    let isClickToMuteEnabled = GM_getValue("isClickToMuteEnabled", 0);
    let isVODHighlightEnabled = GM_getValue("isVODHighlightEnabled", 0);
    let isClickPlayerEventMapperEnabled = GM_getValue("isClickPlayerEventMapperEnabled", 0);
    let isFavoriteGroupEnabled = GM_getValue("isFavoriteGroupEnabled", 1);
    let isCategoryGroupEnabled = GM_getValue("isCategoryGroupEnabled", 1);
    let isShortenFavoriteGroupNameEnabled = GM_getValue("isShortenFavoriteGroupNameEnabled", 0);
    let isShortenCategoryNameEnabled = GM_getValue("isShortenCategoryNameEnabled", 0);

    let selectedFavoriteGroupIdx = isFavoriteGroupEnabled ? GM_getValue("selectedFavoriteGroupIdx", "all") : "all";
    let selectedPinnedCategoryIdx = isCategoryGroupEnabled ? GM_getValue("selectedPinnedCategoryIdx", "all") : "all";

    let sidebarSectionOrder = GM_getValue("sidebarSectionOrder", ["follow", "myplus", "myplusvod", "top"]);
    let pinnedCategories = GM_getValue("pinnedCategories", []); // 여러 카테고리 저장

    let allSections = [];

    // 섹션별 채널 데이터 Map: sectionId → Map<channelKey, {cd, element}>
    const sectionChannelMaps = new Map();
    // 섹션별 가상 리스트 인스턴스: sectionId → SidebarVirtualList
    const sectionVirtualLists = new Map();

    const WEB_PLAYER_SCROLL_LEFT = isSidebarMinimized ? 52 : 240;
    const qualityNameToInternalType = {
        sd: "LOW",
        hd: "NORMAL",
        hd4k: "HIGH_4000",
        hd8k: "HIGH_8000",
        original: "ORIGINAL",
        auto: "AUTO",
    };
    const BUTTON_DATA = [
        { href: "https://www.sooplive.com/live/all", text: "LIVE", onClickTarget: "#live > a" },
        { href: "https://www.sooplive.com/my/favorite", text: "MY", onClickTarget: "#my > a" },
        { href: "https://www.sooplive.com/directory/category", text: "탐색", onClickTarget: "#cate > a" },
        { href: "https://vod.sooplive.com/player/catch", text: "캐치", onClickTarget: "#catch > a" },
    ];

    let qualityChangeTimeout = null;
    let previousQualityBeforeDowngrade = null;
    let previousIsAutoMode = null;
    let didChangeToLowest = false;
    let previousViewers = 0;
    let previousTitle = "";
    let latestBufferTime = "";
    let latestViewerSuffix = "";

    // 플레이어 클릭 이벤트 설정
    const USER_CLICK_CONFIG = {
        click: GM_getValue("livePlayerLeftClickFunction", "toggleMute"),
        contextmenu: GM_getValue("livePlayerRightClickFunction", "toggleScreenMode"),
        // toggleMute, togglePause, toggleStop, toggleScreenMode, toggleFullscreen
    };

    let previewModalManager = null;

    const IS_DEV_MODE = false;

    const customLog = {
        log: function (...args) {
            if (IS_DEV_MODE) {
                console.log(...args);
            }
        },
        warn: function (...args) {
            if (IS_DEV_MODE) {
                console.warn(...args);
            }
        },
        error: function (...args) {
            if (IS_DEV_MODE) {
                console.error(...args);
            }
        },
    };

    //======================================
    // 2. CSS 스타일 정의 (CSS Styles)
    //======================================
    const CommonStyles = `

.customSidebar #serviceLnb {
    display: none !important;
}

.left_navbar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: fixed;
    flex-direction: row-reverse;
    top: 0px;
    left: 128px;
    z-index: 9999;
    background-color: white;
}
html[dark="true"] .left_navbar {
    background-color: #0c0d0e;
}

html[dark="true"] .left_nav_button {
    color: #e5e5e5;
}
html:not([dark="true"]) .left_nav_button {
    color: #1F1F23;
}
html[dark="true"] .left_nav_button {
    color: #e5e5e5;
}
html:not([dark="true"]) .left_nav_button {
    color: #1F1F23;
}

.left_navbar button.left_nav_button {
    position: relative;
    width: 68px;
    height: 64px;
    padding: 0;
    border: 0;
    cursor: pointer;
    z-index: 3001;
    font-size: 1.25em !important;
    font-weight: 600;
}

@media (max-width: 1280px) {
    #serviceHeader .left_navbar {
        left: 124px !important;
    }
    #serviceHeader .left_nav_button {
        width: 58px !important;
        font-size: 1.2em !important;
    }
}

@media (max-width: 1100px) {
    #serviceHeader .left_navbar {
        left: 120px !important;
    }
    #serviceHeader .left_nav_button {
        width: 46px !important;
        font-size: 1.1em !important;
    }
}

#sidebar {
    top: 64px;
    display: flex !important;
    flex-direction: column !important;
}

.starting-line .chatting-list-item .message-container .username {
    width: ${nicknameWidth}px !important;
}

.duration-overlay {
    position: absolute;
    top: 235px;
    right: 4px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 2px 5px;
    font-size: 15px;
    border-radius: 3px;
    z-index:9999;
    line-height: 17px;
}

#studioPlayKorPlayer,
#studioPlayKor,
#studioPlay,
.btn-broadcast {
    display: none;
}

#myModal {
    --bg-color-v8xK4z: #17181c;
    --surface-color-v8xK4z: #202229;
    --primary-text-v8xK4z: #f2f3f5;
    --secondary-text-v8xK4z: #a9adb6;
    --accent-color-v8xK4z: #4f8fb8;
    --border-color-v8xK4z: rgba(255, 255, 255, 0.09);
    --shadow-v8xK4z: 0 14px 40px rgba(0, 0, 0, 0.42);
    --font-family-v8xK4z: sans-serif;

    display: none;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.72);
    backdrop-filter: blur(4px);
    font-family: var(--font-family-v8xK4z);
    color: var(--primary-text-v8xK4z);
}

html:not([dark="true"]) #myModal {
    --bg-color-v8xK4z: #eef0f3;
    --surface-color-v8xK4z: #ffffff;
    --primary-text-v8xK4z: #14171c;
    --secondary-text-v8xK4z: #575d68;
    --accent-color-v8xK4z: #2f78a5;
    --border-color-v8xK4z: #d8dde4;
    --shadow-v8xK4z: 0 14px 36px rgba(17, 23, 34, 0.16);
    background-color: rgba(20, 24, 30, 0.28);
}

#myModal .modal-content_v8xK4z {
    background-color: var(--surface-color-v8xK4z);
    margin: 5vh auto;
    border: 1px solid var(--border-color-v8xK4z);
    border-radius: 10px;
    width: 850px;
    max-width: calc(100vw - 48px);
    height: 90vh;
    box-shadow: var(--shadow-v8xK4z);
    display: flex;
    flex-direction: row;
    overflow: hidden;
}

/* 인덱스 메뉴 스타일 */
#myModal .modal-index_v8xK4z {
    flex-shrink: 0;
    width: 196px;
    padding: 12px 0 8px;
    border-right: 1px solid var(--border-color-v8xK4z);
    background-color: var(--bg-color-v8xK4z);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

#myModal .modal-version_v8xK4z {
    margin-top: auto;
    padding: 14px 18px 13px;
    font-size: 11px;
    line-height: 1.5;
    color: var(--secondary-text-v8xK4z);
    border-top: 1px solid var(--border-color-v8xK4z);
    opacity: 0.95;
}

#myModal .index-title_v8xK4z {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.11em;
    padding: 8px 18px;
    margin: 0 0 6px;
    color: var(--secondary-text-v8xK4z);
}

#myModal .index-button_v8xK4z {
    display: block;
    width: auto;
    padding: 12px;
    // margin: 0 8px 4px;
    background: none;
    // border: 1px solid transparent;
    // border-radius: 6px;
    color: var(--secondary-text-v8xK4z);
    text-align: left;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.18s, color 0.18s, border-color 0.18s;
}

#myModal .index-button_v8xK4z:hover {
    background-color: rgba(255, 255, 255, 0.06);
    border-color: var(--border-color-v8xK4z);
    color: var(--primary-text-v8xK4z);
}

html:not([dark="true"]) #myModal .index-button_v8xK4z:hover {
    background-color: rgba(15, 20, 28, 0.04);
}

#myModal .index-button_v8xK4z.active {
    background-color: rgba(79, 143, 184, 0.18);
    border-color: rgba(79, 143, 184, 0.44);
    color: var(--primary-text-v8xK4z);
    font-weight: 600;
}

html:not([dark="true"]) #myModal .index-button_v8xK4z.active {
    background-color: rgba(47, 120, 165, 0.13);
    border-color: rgba(47, 120, 165, 0.3);
}

/* 메인 콘텐츠 영역 스타일 */
#myModal .modal-main-content_v8xK4z {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

#myModal .modal-header_v8xK4z {
    padding: 14px 22px;
    border-bottom: 1px solid var(--border-color-v8xK4z);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    background-color: var(--surface-color-v8xK4z);
    gap: 16px;
}

#myModal .modal-breadcrumb_v8xK4z {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    color: var(--primary-text-v8xK4z);
    font-size: 20px;
    font-weight: 600;
}

#myModal .breadcrumb-root_v8xK4z {
    flex-shrink: 0;
}

#myModal .breadcrumb-sep_v8xK4z {
    color: var(--secondary-text-v8xK4z);
    opacity: 0.6;
    font-size: 14px;
}

#myModal .breadcrumb-current_v8xK4z {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

#myModal .modal-search-container_v8xK4z {
    flex: 1;
    max-width: 360px;
}

#myModal .search-input-wrapper_v8xK4z {
    position: relative;
    display: flex;
    align-items: center;
}

#myModal .search-icon_v8xK4z {
    position: absolute;
    left: 12px;
    color: var(--secondary-text-v8xK4z);
    font-size: 14px;
    pointer-events: none;
}

#myModal #modal-search-input_v8xK4z {
    width: 100%;
    height: 30px;
    padding: 0 34px 0 34px;
    border-radius: 6px;
    border: 1px solid var(--border-color-v8xK4z);
    background-color: var(--bg-color-v8xK4z);
    color: var(--primary-text-v8xK4z);
    outline: none;
}

#myModal #modal-search-input_v8xK4z:focus {
    border-color: rgba(79, 143, 184, 0.55);
    box-shadow: 0 0 0 2px rgba(79, 143, 184, 0.18);
}

html:not([dark="true"]) #myModal #modal-search-input_v8xK4z:focus {
    border-color: rgba(47, 120, 165, 0.5);
    box-shadow: 0 0 0 2px rgba(47, 120, 165, 0.14);
}

#myModal #modal-search-input_v8xK4z::placeholder {
    color: var(--secondary-text-v8xK4z);
}

#myModal #modal-search-clear_v8xK4z {
    position: absolute;
    right: 8px;
    width: 20px;
    height: 20px;
    padding: 0;
    border: none;
    background: none;
    color: var(--secondary-text-v8xK4z);
    cursor: pointer;
    border-radius: 4px;
}

#myModal #modal-search-clear_v8xK4z:hover {
    background-color: rgba(255, 255, 255, 0.08);
    color: var(--primary-text-v8xK4z);
}

html:not([dark="true"]) #myModal #modal-search-clear_v8xK4z:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

#myModal .close-button_v8xK4z {
    background: none;
    border: none;
    color: var(--secondary-text-v8xK4z);
    font-size: 32px;
    font-weight: bold;
    cursor: pointer;
    width: 36px;
    height: 36px;
    border-radius: 6px;
    transition: color 0.2s, background-color 0.2s;
}

#myModal .close-button_v8xK4z:hover,
#myModal .close-button_v8xK4z:focus {
    color: var(--primary-text-v8xK4z);
}

html:not([dark="true"]) #myModal .close-button_v8xK4z:hover,
html:not([dark="true"]) #myModal .close-button_v8xK4z:focus {
    background-color: rgba(0, 0, 0, 0.05);
}

#myModal .modal-body_v8xK4z {
    padding: 24px;
    overflow-y: auto;
    flex-grow: 1;
    padding-bottom: 30vh;
}

#myModal .modal-footer_v8xK4z {
    padding-top: 24px;
    margin-top: 24px;
    border-top: 1px solid var(--border-color-v8xK4z);
}

#myModal .section-title_v8xK4z {
    font-size: 17px;
    font-weight: 600;
    color: var(--primary-text-v8xK4z);
    margin: 32px 0 16px;
    padding: 10px 14px;
    background-color: var(--bg-color-v8xK4z);
    border-left: 3px solid var(--accent-color-v8xK4z);
    border-radius: 4px;
    scroll-margin-top: 24px;
    user-select: none;
}

#myModal section:first-child .section-title_v8xK4z {
    margin-top: 0;
}

#myModal .option_v8xK4z {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid transparent;
    transition: background-color 0.2s, border-color 0.2s;
}

#myModal .option_v8xK4z label {
    font-size: 14px;
    color: var(--secondary-text-v8xK4z);
}
#myModal .option_v8xK4z:not(.multi-option_v8xK4z):hover {
    background-color: rgba(255, 255, 255, 0.05);
    border-color: var(--border-color-v8xK4z);
}

html:not([dark="true"]) #myModal .option_v8xK4z:not(.multi-option_v8xK4z):hover {
    background-color: rgba(0, 0, 0, 0.03);
}

#myModal .range-option_v8xK4z {
    grid-template-columns: auto 1fr;
    gap: 20px;
}

#myModal .range-container_v8xK4z {
    display: flex;
    align-items: center;
    gap: 15px;
}

#myModal input[type="range"] {
    width: 100%;
}

#myModal .range-value_v8xK4z {
    font-size: 15px;
    color: var(--primary-text-v8xK4z);
    min-width: 30px;
    text-align: right;
}

#myModal .switch_v8xK4z {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 28px;
}

#myModal .switch_v8xK4z input {
    opacity: 0;
    width: 0;
    height: 0;
}

#myModal .slider_v8xK4z {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #4d4d4d;
    transition: .4s;
    border-radius: 28px;
}

#myModal .slider_v8xK4z:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
}

#myModal input:checked + .slider_v8xK4z {
    background-color: var(--accent-color-v8xK4z);
}

#myModal input:focus + .slider_v8xK4z {
    box-shadow: 0 0 1px var(--accent-color-v8xK4z);
}

#myModal input:checked + .slider_v8xK4z:before {
    transform: translateX(22px);
}

#myModal .divider_v8xK4z {
    border: none;
    height: 1px;
    background-color: var(--border-color-v8xK4z);
    margin: 24px 0;
}

#myModal .option-details_v8xK4z {
    grid-column: 1 / -1;
    display: flex;
    gap: 15px;
}

#myModal .mapper-setting_v8xK4z {
    display: inline;
    margin-left: 16px;
}

#myModal .mapper-setting_v8xK4z select {
    background-color: var(--surface-color-v8xK4z);
    color: var(--primary-text-v8xK4z);
    border: 1px solid var(--border-color-v8xK4z);
    border-radius: 6px;
    padding: 5px 8px;
    outline: none;
}

#myModal textarea {
    grid-column: 1 / -1;
    width: 100%;
    background-color: var(--bg-color-v8xK4z);
    border: 1px solid var(--border-color-v8xK4z);
    border-radius: 6px;
    color: var(--primary-text-v8xK4z);
    padding: 10px;
    resize: vertical;
}

#myModal .description_v8xK4z {
    font-size: 13px;
    line-height: 1.5;
    color: var(--secondary-text-v8xK4z);
    margin: 0 0 10px;
}

#myModal .no-results_v8xK4z {
    padding: 40px;
    text-align: center;
    color: var(--secondary-text-v8xK4z);
    font-size: 14px;
}

#myModal .bug-report_v8xK4z a {
    color: var(--accent-color-v8xK4z);
    text-decoration: none;
}

#myModal .bug-report_v8xK4z a:hover {
    text-decoration: underline;
}

#myModal .modal-body_v8xK4z::-webkit-scrollbar,
#myModal .modal-index_v8xK4z::-webkit-scrollbar {
    width: 8px;
}

#myModal .modal-body_v8xK4z::-webkit-scrollbar-track,
#myModal .modal-index_v8xK4z::-webkit-scrollbar-track {
    background: var(--surface-color-v8xK4z);
}

#myModal .modal-body_v8xK4z::-webkit-scrollbar-thumb,
#myModal .modal-index_v8xK4z::-webkit-scrollbar-thumb {
    background-color: var(--border-color-v8xK4z);
    border-radius: 4px;
}

#myModal .modal-body_v8xK4z::-webkit-scrollbar-thumb:hover,
#myModal .modal-index_v8xK4z::-webkit-scrollbar-thumb:hover {
    background-color: #555;
}

/* 여러 옵션을 담는 부모 컨테이너 스타일 */
#myModal .multi-option_v8xK4z {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 6px; /* 아이템 사이의 간격 */
    padding: 0;
}

/* 개별 옵션 그룹(레이블+스위치) 스타일 */
#myModal .option-group_v8xK4z {
    /* flex: 1; 이 속성은 더 이상 필요 없으므로 제거합니다. */
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 8px;
    border-radius: 8px;
    border: 1px solid transparent;
    transition: background-color 0.2s, border-color 0.2s;
}
/* 개별 그룹에 마우스를 올렸을 때의 스타일 */
#myModal .option-group_v8xK4z:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: var(--border-color-v8xK4z);
}

html:not([dark="true"]) #myModal .option-group_v8xK4z:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

#myModal .subsection-title_v8xK4z {
    margin-top: 25px;
    margin-bottom: 15px;
    font-size: 15px;
    color: var(--primary-text-v8xK4z);
    font-weight: 600;
    border-bottom: 1px solid var(--border-color-v8xK4z);
    padding-bottom: 8px;
}
#myModal .order-list_v8xK4z {
    display: flex;
    flex-direction: row; /* 세로(column)에서 가로(row)로 변경 */
    flex-wrap: wrap;      /* 공간이 부족하면 다음 줄로 넘어가도록 설정 */
    gap: 8px;
}
#myModal .draggable-item_v8xK4z {
    background-color: var(--bg-color-v8xK4z);
    padding: 8px 12px; /* 패딩을 약간 조정하여 더 컴팩트하게 만듬 */
    border-radius: 5px;
    border: 1px solid var(--border-color-v8xK4z);
    cursor: grab;
    transition: background-color 0.2s, border-color 0.2s;
    font-size: 14px;
    white-space: nowrap; /* 아이템 내용이 줄바꿈되지 않도록 설정 */
}
#myModal .draggable-item_v8xK4z:hover {
    background-color: rgba(255, 255, 255, 0.08);
}

html:not([dark="true"]) #myModal .draggable-item_v8xK4z:hover {
    background-color: rgba(0, 0, 0, 0.04);
}
#myModal .draggable-item_v8xK4z.dragging_v8xK4z {
    opacity: 0.5;
    background-color: #5dade2;
    cursor: grabbing;
}
#openModalBtn {
    box-sizing: border-box;
    font-size: 12px;
    line-height: 1.2 !important;
    font-family: "NG";
    list-style: none;
    position: relative;
    margin-left: 12px;
    width: 40px;
    height: 40px;
}

#topInnerHeader #openModalBtn {
    margin-right: 12px;
}
#openModalBtn > button.btn-settings-ui {
    background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none'%3e%3cpath stroke='%23757B8A' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.4' d='M8.269 2.061c.44-1.815 3.022-1.815 3.462 0a1.782 1.782 0 0 0 2.658 1.101c1.595-.971 3.42.854 2.449 2.449a1.781 1.781 0 0 0 1.1 2.658c1.816.44 1.816 3.022 0 3.462a1.781 1.781 0 0 0-1.1 2.659c.971 1.595-.854 3.42-2.449 2.448a1.781 1.781 0 0 0-2.658 1.101c-.44 1.815-3.022 1.815-3.462 0a1.781 1.781 0 0 0-2.658-1.101c-1.595.972-3.42-.854-2.449-2.448a1.782 1.782 0 0 0-1.1-2.659c-1.816-.44-1.816-3.021 0-3.462a1.782 1.782 0 0 0 1.1-2.658c-.972-1.595.854-3.42 2.449-2.449a1.781 1.781 0 0 0 2.658-1.1Z'/%3e%3cpath stroke='%23757B8A' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.4' d='M13.1 10a3.1 3.1 0 1 1-6.2 0 3.1 3.1 0 0 1 6.2 0Z'/%3e%3c/svg%3e") 50% 50% no-repeat !important;
    background-size: 18px !important;
}
html[dark="true"] #openModalBtn > button.btn-settings-ui {
    background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none'%3e%3cpath stroke='%23ACB0B9' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.4' d='M8.269 2.061c.44-1.815 3.022-1.815 3.462 0a1.782 1.782 0 0 0 2.658 1.101c1.595-.971 3.42.854 2.449 2.449a1.781 1.781 0 0 0 1.1 2.658c1.816.44 1.816 3.022 0 3.462a1.781 1.781 0 0 0-1.1 2.659c.971 1.595-.854 3.42-2.449 2.448a1.781 1.781 0 0 0-2.658 1.101c-.44 1.815-3.022 1.815-3.462 0a1.781 1.781 0 0 0-2.658-1.101c-1.595.972-3.42-.854-2.449-2.448a1.782 1.782 0 0 0-1.1-2.659c-1.816-.44-1.816-3.021 0-3.462a1.782 1.782 0 0 0 1.1-2.658c-.972-1.595.854-3.42 2.449-2.449a1.781 1.781 0 0 0 2.658-1.1Z'/%3e%3cpath stroke='%23ACB0B9' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.4' d='M13.1 10a3.1 3.1 0 1 1-6.2 0 3.1 3.1 0 0 1 6.2 0Z'/%3e%3c/svg%3e") 50% 50% no-repeat !important;
    background-size: 18px !important;
}
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
/* .red-dot이 있을 때만 회전 */
#openModalBtn:has(.red-dot) .btn-settings-ui {
    animation: rotate 4s linear infinite;
    animation-duration: 4s; /* 4초에 한 번 회전 */
    animation-iteration-count: 10; /* 10번 반복 */
}
#sidebar.max {
    width: 240px;
}
#sidebar.min {
    width: 52px;
}
#sidebar.min .users-section a.user span {
    display: none;
}
#sidebar.min .users-section button {
    font-size:12px;
    padding: 4px;
}
#sidebar.max .button-fold-sidebar {
    background-size: 7px 11px;
    background-repeat: no-repeat;
    width: 26px;
    height: 26px;
    background-position: center;
    position: absolute;
    top: 13px;
    left: 200px;
}
#sidebar.max .button-unfold-sidebar {
    display:none;
}
#sidebar.min .button-fold-sidebar {
    display:none;
}
#sidebar.min .button-unfold-sidebar {
    background-size: 7px 11px;
    background-repeat: no-repeat;
    width: 26px;
    height: 26px;
    background-position: center;
    position: relative;
    top: 8px;
    left: 12px;
    padding-top:16px;
    padding-bottom:12px;
}
#sidebar.min .top-section span.max{
    display:none;
}
#sidebar.max .top-section span.min{
    display:none;
}
#toggleButton, #toggleButton2, #toggleButton3, #toggleButton4, #toggleButton5 {
    padding: 7px 0px;
    width: 100%;
    text-align: center;
    font-size: 14px;
}

html[dark="true"] #toggleButton,
html[dark="true"] #toggleButton2,
html[dark="true"] #toggleButton3,
html[dark="true"] #toggleButton4,
html[dark="true"] #toggleButton5 {
    color:#A1A1A1;
}

html:not([dark="true"]) #toggleButton,
html:not([dark="true"]) #toggleButton2,
html:not([dark="true"]) #toggleButton3,
html:not([dark="true"]) #toggleButton4,
html:not([dark="true"]) #toggleButton5 {
    color: #53535F;
}

#sidebar {
    grid-area: sidebar;
    padding-bottom: 360px;
    height: 100vh;
    overflow-y: auto;
    position: fixed;
    scrollbar-width: none; /* 파이어폭스 */
    transition: all 0.1s ease-in-out; /* 부드러운 전환 효과 */
}
#sidebar::-webkit-scrollbar {
    display: none;  /* Chrome, Safari, Edge */
}
#sidebar .top-section {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 12px 0px 6px 0px;
    line-height: 17px;
}
#sidebar .top-section > span {
    text-transform: uppercase;
    font-weight: 550;
    font-size: 14px;
    margin-top: 6px;
    margin-bottom: 2px;
}
.users-section .vl-spacer-top,
.users-section .vl-spacer-bottom {
    display: block;
    width: 100%;
    flex-shrink: 0;
}
.users-section .user.show-more {
    max-height: 0;
    opacity: 0;
    padding-top: 0;
    padding-bottom: 0;
    pointer-events: none;
}
.users-section .user {
    display: grid;
    grid-template-areas: "profile-picture username watchers" "profile-picture description blank";
    grid-template-columns: 40px auto auto;
    padding: 5px 10px;
    max-height: 50px;
    opacity: 1;
    overflow: hidden;
    transition: opacity 0.7s ease;
}
.users-section .user:hover {
    cursor: pointer;
}
.users-section .user .profile-picture {
    grid-area: profile-picture;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    line-height: 20px;
}
.users-section .user .username {
    grid-area: username;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.6px;
    margin-left:1px;
    line-height: 17px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.users-section .user .description {
    grid-area: description;
    font-size: 13px;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left:1px;
    line-height: 16px;
}
.users-section .user .watchers {
    grid-area: watchers;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-weight: 400;
    font-size: 14px;
    margin-right: 2px;
    line-height: 17px;
}
.users-section .user .watchers .dot {
    font-size: 10px;
    margin-right: 5px;
    color: #ff2424;
}
.users-section .user .watchers .dot.greendot {
    color: #34c76b !important;
}
.tooltip-container {
    z-index: 9999;
    width: 460px;
    height: auto;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);
    opacity: 0;
    overflow: hidden;
    pointer-events: none;
    background-color: #1a1a1b;
}

.tooltip-container.visible {
    opacity: 1;
    pointer-events: auto;
}

.tooltip-container .thumbs-box {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    background-color: #000;
    overflow: hidden;
}

.tooltip-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.tooltiptext {
    padding: 14px 20px;
    font-size: 18px;
    text-align: left;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    line-height: 22px;
    width: 100%;
    box-sizing: border-box;
}

.tooltiptext .dot {
    font-size: 11px;
    margin-right: 2px;
    vertical-align: middle;
    line-height: 22px;
    display: inline-block;
}

.tooltip-container .views,
.duration-overlay {
    display: flex;
    align-items: center;
    background: rgba(23, 25, 28, 0.85);
    height: 24px;
    padding: 0 10px;
    border-radius: 30px;
    color: #fff !important;
    font-size: 13px;
    line-height: 24px;
    z-index: 5;
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    bottom: auto;
}

.thumb-overlay-bottom {
    position: absolute;
    bottom: 8px;
    left: 8px;
    display: flex;
    gap: 6px;
    z-index: 10;
}

.tooltip-container .views:before {
    content: "";
    display: block;
    background: #ff2424;
    width: 6px;
    height: 6px;
    margin-right: 4px;
    border-radius: 50%;
}

.feed-stats-tooltip {
    display: flex;
    justify-content: flex-start;
    gap: 15px;
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid rgba(128, 128, 128, 0.2);
    font-size: 14px;
}

.feed-stats-tooltip .stat {
    display: flex;
    align-items: center;
    gap: 5px;
    opacity: 0.85;
}

html[dark="true"] .feed-stats-tooltip {
    border-top-color: rgba(255, 255, 255, 0.1);
}

html:not([dark="true"]) .feed-stats-tooltip {
    border-top-color: rgba(0, 0, 0, 0.1);
}

.icon-feed-like,
.icon-feed-view {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}

.icon-feed-comment {
    display: inline-block;
    margin-top: 2px;
    width: 18px;
    height: 18px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}

.icon-feed-like { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23757B8A' stroke-width='1.4' d='M7.032 14.847v-6.93l1.95-4.614a1.667 1.667 0 0 1 1.714-1.009l.036.004a1.667 1.667 0 0 1 1.488 1.657v2.221c0 .23.187.417.417.417h3.293a1.5 1.5 0 0 1 1.47 1.798l-1.161 5.737a2.5 2.5 0 0 1-2.45 2.003H9.633c-.148 0-.295-.02-.438-.058l-1.549-.423a.833.833 0 0 1-.614-.803ZM3.563 9.582c0-.92.747-1.666 1.667-1.666h.966c.46 0 .834.373.834.833v5.8c0 .46-.373.833-.834.833H5.23c-.92 0-1.667-.746-1.667-1.666V9.582Z'/%3e%3c/svg%3e"); }
.icon-feed-view { background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23757B8A%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M2%2012C2%2012%205%205%2012%205C19%205%2022%2012%2022%2012C22%2012%2019%2019%2012%2019C5%2019%202%2012%202%2012Z%22%20stroke-width%3D%221.6%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%223%22%20stroke-width%3D%221.6%22%2F%3E%3C%2Fsvg%3E"); }
.icon-feed-comment { background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M17%203.5C17%202.39543%2016.1046%201.5%2015%201.5H5C3.89543%201.5%203%202.39543%203%203.5V11.5C3%2012.6046%203.89543%2013.5%205%2013.5H8.5L10%2016.5L11.5%2013.5H15C16.1046%2013.5%2017%2012.6046%2017%2011.5V3.5Z%22%20stroke%3D%22%23757B8A%22%20stroke-width%3D%221.4%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cpath%20d%3D%22M6%205.5H14%22%20stroke%3D%22%23757B8A%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M6%208.5H11%22%20stroke%3D%22%23757B8A%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E"); }

html[dark="true"] .icon-feed-like { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23999' stroke-width='1.4' d='M7.032 14.847v-6.93l1.95-4.614a1.667 1.667 0 0 1 1.714-1.009l.036.004a1.667 1.667 0 0 1 1.488 1.657v2.221c0 .23.187.417.417.417h3.293a1.5 1.5 0 0 1 1.47 1.798l-1.161 5.737a2.5 2.5 0 0 1-2.45 2.003H9.633c-.148 0-.295-.02-.438-.058l-1.549-.423a.833.833 0 0 1-.614-.803ZM3.563 9.582c0-.92.747-1.666 1.667-1.666h.966c.46 0 .834.373.834.833v5.8c0 .46-.373.833-.834.833H5.23c-.92 0-1.667-.746-1.667-1.666V9.582Z'/%3e%3c/svg%3e"); }
html[dark="true"] .icon-feed-view { background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23aaa%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M2%2012C2%2012%205%205%2012%205C19%205%2022%2012%2022%2012C22%2012%2019%2019%2012%2019C5%2019%202%2012%202%2012Z%22%20stroke-width%3D%221.6%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%223%22%20stroke-width%3D%221.6%22%2F%3E%3C%2Fsvg%3E"); }
html[dark="true"] .icon-feed-comment { background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M17%203.5C17%202.39543%2016.1046%201.5%2015%201.5H5C3.89543%201.5%203%202.39543%203%203.5V11.5C3%2012.6046%203.89543%2013.5%205%2013.5H8.5L10%2016.5L11.5%2013.5H15C16.1046%2013.5%2017%2012.6046%2017%2011.5V3.5Z%22%20stroke%3D%22%23aaa%22%20stroke-width%3D%221.4%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cpath%20d%3D%22M6%205.5H14%22%20stroke%3D%22%23aaa%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M6%208.5H11%22%20stroke%3D%22%23aaa%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E"); }

.tooltip-container.feed-mode {
    width: 400px;
}

.tooltip-container.feed-mode img {
    height: 100%;
    object-fit: contain;
    background-color: #000;
}

.tooltip-feed-content {
    margin-top: 12px;
    padding: 10px;
    font-size: 15px;
    line-height: 1.6;
    text-align: left;
    border-radius: 6px;
    opacity: 0.9;
    word-break: break-all;
    max-height: 350px;
    overflow-y: auto;
}

html[dark="true"] .tooltip-feed-content {
    background-color: rgba(255, 255, 255, 0.05);
    color: #ddd;
}

html:not([dark="true"]) .tooltip-feed-content {
    background-color: rgba(0, 0, 0, 0.03);
    color: #444;
}

html[dark="true"] .tooltip-container {
    background-color: #26262C;
}

html[dark="true"] .tooltiptext {
    color: #fff;
    background-color: #26262C;
}

html[dark="true"] .tooltip-username {
    color: #fff;
}

html[dark="true"] .tooltip-description {
    color: #a9a9b3;
}

html:not([dark="true"]) .tooltip-container {
    background-color: #f0f0f5;
    border: 1px solid #dcdce6;
}

html:not([dark="true"]) .tooltiptext {
    color: #1a1a1b;
    background-color: #f0f0f5;
}

html:not([dark="true"]) .tooltip-username {
    color: #1a1a1b;
}

html:not([dark="true"]) .tooltip-description {
    color: #64646e;
}

.tooltip-header {
    margin-bottom: 6px;
    font-size: 17px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
}

.tooltip-username {
    font-weight: 600;
}

.tooltip-description {
    font-size: 14px;
    margin-left: 0;
    margin-top: 2px;
    display: block;
    opacity: 0.8;
}

.tooltip-title {
    line-height: 1.4;
    font-size: 17px;
    display: flex;
    align-items: center;
    gap: 6px;
}

.tooltip-time {
    font-size: 14px;
    opacity: 0.55;
    font-weight: 300;
    flex-shrink: 0;
}

.tooltiptext,
.tooltiptext * {
    font-family: inherit;
}

.profile-grayscale {
    filter: grayscale(100%) contrast(85%);
    opacity: .8;
}

#sidebar.max .small-user-layout.show-more {
    max-height: 0;
    opacity: 0;
    padding: 0 !important;
    pointer-events: none;
}
#sidebar.max .small-user-layout {
    grid-template-areas: "profile-picture username description watchers" !important;
    grid-template-columns: 24px auto 1fr auto !important;
    padding: 4px 10px !important;
    gap: 8px !important;
    max-height: 32px;
    opacity: 1;
    overflow: hidden;
    transition: opacity 0.4s ease;
}
#sidebar.max .small-user-layout .profile-picture {
    width: 24px !important;
    height: 24px !important;
    border-radius: 20% !important;
    object-fit: cover;
}
#sidebar.max .small-user-layout .username {
    max-width: 80px !important;
    font-size: 14px !important;
    line-height: 24px !important;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
#sidebar.max .small-user-layout .description {
    font-size: 12px !important;
    line-height: 24px !important;
}
#sidebar.max .small-user-layout .watchers {
    font-size: 14px !important;
    line-height: 24px !important;
}
#sidebar.max .small-user-layout .watchers .dot {
    font-size: 8px !important;
    margin-right: 4px !important;
}

.customSidebar #serviceHeader .a_d_banner {
    display: none !important;
}
.customSidebar #serviceHeader .btn_flexible+.logo_wrap {
    left: 24px !important;
}
.customSidebar #serviceHeader .logo_wrap {
    left: 24px !important;
}


html[dark="true"] .users-section .user.user-offline span {
    filter: grayscale(1) brightness(0.8); /* 다크모드: 완전 흑백과 약간 어둡게 */
}

html:not([dark="true"]) .users-section .user.user-offline span {
    opacity: 0.7; /* 밝은 모드: 투명하게 */
}


/* darkMode Sidebar Styles */

html[dark="true"] #sidebar.max .button-fold-sidebar {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none slice' viewBox='0 0 7 11'%3e%3cpath fill='%23f9f9f9' d='M5.87 11.01L.01 5.51 5.87.01l1.08 1.01-4.74 4.45L7 9.96 5.87 11z'/%3e%3c/svg%3e");
}
html[dark="true"] #sidebar.min .button-unfold-sidebar {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none slice' viewBox='0 0 7 11'%3e%3cpath fill='%23f9f9f9' d='M1.13 11.01l5.86-5.5L1.13.01.05 1.02l4.74 4.45L0 9.96 1.13 11z'/%3e%3c/svg%3e");
}
html[dark="true"] #sidebar {
    color: white;
    background-color: #1F1F23;
}
html[dark="true"] #sidebar .top-section > span {
    color:#DEDEE3;
}
html[dark="true"] #sidebar .top-section > span > a {
    color:#DEDEE3;
}
html[dark="true"] .users-section .user:hover {
    background-color: #26262c;
}
html[dark="true"] .users-section .user .username {
    color:#DEDEE3;
}
html[dark="true"] .users-section .user .description {
    color: #a1a1a1;
}
html[dark="true"] .users-section .user .watchers {
    color: #c0c0c0;
}

/* whiteMode Sidebar Styles */

html:not([dark="true"]) #sidebar.max .button-fold-sidebar {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none slice' viewBox='0 0 7 11'%3e%3cpath fill='%23888' d='M5.87 11.01L.01 5.51 5.87.01l1.08 1.01-4.74 4.45L7 9.96 5.87 11z'/%3e%3c/svg%3e");
}
html:not([dark="true"]) #sidebar.min .button-unfold-sidebar {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none slice' viewBox='0 0 7 11'%3e%3cpath fill='%23888' d='M1.13 11.01l5.86-5.5L1.13.01.05 1.02l4.74 4.45L0 9.96 1.13 11z'/%3e%3c/svg%3e");
}
html:not([dark="true"]) #sidebar {
    color: white;
    background-color: #EFEFF1;
}
html:not([dark="true"]) #sidebar .top-section > span {
    color:#0E0E10;
}
html:not([dark="true"]) #sidebar .top-section > span > a {
    color:#0E0E10;
}
html:not([dark="true"]) .users-section .user:hover {
    background-color: #E6E6EA;
}
html:not([dark="true"]) .users-section .user .username {
    color:#1F1F23;
}
html:not([dark="true"]) .users-section .user .description {
    color: #53535F;
}
html:not([dark="true"]) .users-section .user .watchers {
    color: black;
}

.chat-icon { position: absolute; bottom: 10px; right: 6px; width: 24px; height: 24px; cursor: pointer; z-index: 1000; background-size: contain; background-repeat: no-repeat; }
.chat-icon.statistics { right: 7px; width: 22px; height: 22px; bottom: 10px; }
html:not([dark="true"]) .trash-icon { background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20stroke%3D%22%23000%22%20stroke-width%3D%220%22%3E%3Cg%2F%3E%3Cg%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22%23CCC%22%20stroke-width%3D%22.192%22%2F%3E%3Cg%20fill%3D%22%236A6A75%22%20stroke%3D%22none%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.31%202.25h3.38c.217%200%20.406%200%20.584.028a2.25%202.25%200%200%201%201.64%201.183c.084.16.143.339.212.544l.111.335.03.085a1.25%201.25%200%200%200%201.233.825h3a.75.75%200%200%201%200%201.5h-17a.75.75%200%200%201%200-1.5h3.09a1.25%201.25%200%200%200%201.173-.91l.112-.335c.068-.205.127-.384.21-.544a2.25%202.25%200%200%201%201.641-1.183c.178-.028.367-.028.583-.028Zm-1.302%203a3%203%200%200%200%20.175-.428l.1-.3c.091-.273.112-.328.133-.368a.75.75%200%200%201%20.547-.395%203%203%200%200%201%20.392-.009h3.29c.288%200%20.348.002.392.01a.75.75%200%200%201%20.547.394c.021.04.042.095.133.369l.1.3.039.112q.059.164.136.315z%22%2F%3E%3Cpath%20d%3D%22M5.915%208.45a.75.75%200%201%200-1.497.1l.464%206.952c.085%201.282.154%202.318.316%203.132.169.845.455%201.551%201.047%202.104s1.315.793%202.17.904c.822.108%201.86.108%203.146.108h.879c1.285%200%202.324%200%203.146-.108.854-.111%201.578-.35%202.17-.904.591-.553.877-1.26%201.046-2.104.162-.813.23-1.85.316-3.132l.464-6.952a.75.75%200%200%200-1.497-.1l-.46%206.9c-.09%201.347-.154%202.285-.294%202.99-.137.685-.327%201.047-.6%201.303-.274.256-.648.422-1.34.512-.713.093-1.653.095-3.004.095h-.774c-1.35%200-2.29-.002-3.004-.095-.692-.09-1.066-.256-1.34-.512-.273-.256-.463-.618-.6-1.302-.14-.706-.204-1.644-.294-2.992z%22%2F%3E%3Cpath%20d%3D%22M9.425%2010.254a.75.75%200%200%201%20.821.671l.5%205a.75.75%200%200%201-1.492.15l-.5-5a.75.75%200%200%201%20.671-.821m5.15%200a.75.75%200%200%201%20.671.82l-.5%205a.75.75%200%200%201-1.492-.149l.5-5a.75.75%200%200%201%20.82-.671Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E"); }
html[dark="true"] .trash-icon { background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20stroke%3D%22%23000%22%20stroke-width%3D%220%22%3E%3Cg%2F%3E%3Cg%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22%23CCC%22%20stroke-width%3D%22.192%22%2F%3E%3Cg%20fill%3D%22%2394949C%22%20stroke%3D%22none%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.31%202.25h3.38c.217%200%20.406%200%20.584.028a2.25%202.25%200%200%201%201.64%201.183c.084.16.143.339.212.544l.111.335.03.085a1.25%201.25%200%200%200%201.233.825h3a.75.75%200%200%201%200%201.5h-17a.75.75%200%200%201%200-1.5h3.09a1.25%201.25%200%200%200%201.173-.91l.112-.335c.068-.205.127-.384.21-.544a2.25%202.25%200%200%201%201.641-1.183c.178-.028.367-.028.583-.028Zm-1.302%203a3%203%200%200%200%20.175-.428l.1-.3c.091-.273.112-.328.133-.368a.75.75%200%200%201%20.547-.395%203%203%200%200%201%20.392-.009h3.29c.288%200%20.348.002.392.01a.75.75%200%200%201%20.547.394c.021.04.042.095.133.369l.1.3.039.112q.059.164.136.315z%22%2F%3E%3Cpath%20d%3D%22M5.915%208.45a.75.75%200%201%200-1.497.1l.464%206.952c.085%201.282.154%202.318.316%203.132.169.845.455%201.551%201.047%202.104s1.315.793%202.17.904c.822.108%201.86.108%203.146.108h.879c1.285%200%202.324%200%203.146-.108.854-.111%201.578-.35%202.17-.904.591-.553.877-1.26%201.046-2.104.162-.813.23-1.85.316-3.132l.464-6.952a.75.75%200%200%200-1.497-.1l-.46%206.9c-.09%201.347-.154%202.285-.294%202.99-.137.685-.327%201.047-.6%201.303-.274.256-.648.422-1.34.512-.713.093-1.653.095-3.004.095h-.774c-1.35%200-2.29-.002-3.004-.095-.692-.09-1.066-.256-1.34-.512-.273-.256-.463-.618-.6-1.302-.14-.706-.204-1.644-.294-2.992z%22%2F%3E%3Cpath%20d%3D%22M9.425%2010.254a.75.75%200%200%201%20.821.671l.5%205a.75.75%200%200%201-1.492.15l-.5-5a.75.75%200%200%201%20.671-.821m5.15%200a.75.75%200%200%201%20.671.82l-.5%205a.75.75%200%200%201-1.492-.149l.5-5a.75.75%200%200%201%20.82-.671Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E"); }
html:not([dark="true"]) .statistics-icon_54334 { color: black; background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2264px%22%20height%3D%2264px%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22%235C5C66%22%3E%3Cg%20id%3D%22SVGRepo_bgCarrier%22%20stroke-width%3D%220%22%3E%3C%2Fg%3E%3Cg%20id%3D%22SVGRepo_tracerCarrier%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22%23CCCCCC%22%20stroke-width%3D%220.048%22%3E%3C%2Fg%3E%3Cg%20id%3D%22SVGRepo_iconCarrier%22%3E%3Cdefs%3E%3Cstyle%3E.a%7Bfill%3Anone%3Bstroke%3A%235C5C66%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3Bstroke-width%3A1.5px%3Bfill-rule%3Aevenodd%3B%7D%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cpath%20class%3D%22a%22%20d%3D%22M12%2C2A10%2C10%2C0%2C1%2C0%2C22%2C12H12Z%22%3E%3C%2Fpath%3E%3Cpath%20class%3D%22a%22%20d%3D%22M15%2C9h6.54077A10.02174%2C10.02174%2C0%2C0%2C0%2C15%2C2.45923Z%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E"); }
html[dark="true"] .statistics-icon_54334 { color: white; background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2264px%22%20height%3D%2264px%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22%23B0B0BA%22%20stroke%3D%22%23B0B0BA%22%3E%3Cg%20id%3D%22SVGRepo_bgCarrier%22%20stroke-width%3D%220%22%3E%3C%2Fg%3E%3Cg%20id%3D%22SVGRepo_tracerCarrier%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22%23CCCCCC%22%20stroke-width%3D%220.048%22%3E%3C%2Fg%3E%3Cg%20id%3D%22SVGRepo_iconCarrier%22%3E%3Cdefs%3E%3Cstyle%3E.a%7Bfill%3Anone%3Bstroke%3A%23B0B0BA%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3Bstroke-width%3A1.5px%3Bfill-rule%3Aevenodd%3B%7D%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cpath%20class%3D%22a%22%20d%3D%22M12%2C2A10%2C10%2C0%2C1%2C0%2C22%2C12H12Z%22%3E%3C%2Fpath%3E%3Cpath%20class%3D%22a%22%20d%3D%22M15%2C9h6.54077A10.02174%2C10.02174%2C0%2C0%2C0%2C15%2C2.45923Z%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E"); }

/*----- preview-modal 시작 -----*/

.preview-modal {
    display: none;
    position: fixed;
    z-index: 10000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(5px);
}

.preview-modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0;
    width: 80%;
    max-width: 800px;
    max-height: 800px;
    border-radius: 10px;
    border: 1px solid #cccccc52;
    overflow: hidden;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.7);
    pointer-events: auto;
}

.preview-modal .preview-close {
    position: absolute;
    top: 10px;
    right: 15px;
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    cursor: pointer;
    transition: color 0.3s ease;
    z-index: 10;
}

.preview-modal .preview-close:hover,
.preview-modal .preview-close:focus {
    color: #e50914;
}

.preview-modal .thumbnail-container {
    position: relative;
    width: 100%;
    height: 450px;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
}

.preview-modal .thumbnail-container img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
}

.preview-modal .preview-modal-content video {
    width: clamp(100%, 50vw, 800px);
    height: 449px;
    display: none;
}

.preview-modal .info {
    color: white;
    text-align: left;
    padding: 28px;
    background-color: rgba(0, 0, 0, 0.65);
}

.preview-modal .streamer-name {
    font-size: 50px;
    font-weight: bold;
    letter-spacing: -2px;
}

.preview-modal .video-title {
    font-size: 20px;
    margin: 20px 0 30px 0;
}

.preview-modal .tags {
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    flex-direction: row;
    margin-left: -3px;
}

.preview-modal .tags a {
    margin: 5px;
    color: white;
    text-decoration: none;
    border: 1px solid #fff;
    padding: 5px 10px;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.preview-modal .tags a:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.preview-modal .start-button {
    background-color: #2d6bffba;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    font-size: 22px;
    cursor: pointer;
    display: inline-block; /* inline-block으로 변경 */
    width: auto; /* 너비는 자동으로 */
    text-align: center;
    text-decoration: none;
    transition: background-color 0.3s;
}

.preview-modal .start-button:hover {
    background-color: #2d6bff8f;
}

/*----- preview-modal 끝 -----*/
    #category-group-wrapper,
    #favorite-group-wrapper {
        position: relative;
        margin-bottom: 5px;
    }
    #sidebar.min #category-group-wrapper,
    #sidebar.min #favorite-group-wrapper {
        display: none !important;
    }
    .fav-group-scroll-btn {
        position: absolute;
        top: -1px;
        width: 32px;
        height: 100%;
        border: none;
        font-size: 24px;
        font-weight: bold;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        visibility: hidden;
        opacity: 0;
        color: transparent;
        cursor: default;
        transition: opacity 0.2s, visibility 0.2s, color 0.2s;
    }
    .fav-group-scroll-btn.visible {
        visibility: visible;
        opacity: 1;
    }
    #category-group-wrapper:hover .fav-group-scroll-btn.visible,
    #favorite-group-wrapper:hover .fav-group-scroll-btn.visible {
        cursor: pointer;
    }

    /* [수정] ID 선택자를 클래스 선택자로 변경 */
    .scroll-btn-left { left: 0; }
    .scroll-btn-right { right: 0; }

    #favorite-group-tabs,
    #category-group-tabs {
        display: flex;
        align-items: center;
        overflow-x: auto;
        overflow-y: hidden;
        box-sizing: border-box;
        scrollbar-width: none;
        -ms-overflow-style: none;
        margin-left: 5px;
    }
    #favorite-group-tabs::-webkit-scrollbar,
    #category-group-tabs::-webkit-scrollbar {
        display: none;
    }
    .fav-group-tab {
        flex-shrink: 0;
        padding: 4px 10px;
        margin: 0 3px;
        cursor: pointer;
        border-radius: 15px;
        font-size: 13px;
        border: 1px solid transparent;
        transition: background-color 0.2s, color 0.2s;
    }
    .fav-group-tab.active {
        font-weight: bold;
    }

    /* --- 다크 모드 스타일 --- */
    html[dark="true"] #favorite-group-wrapper:hover .fav-group-scroll-btn.visible,
    html[dark="true"] #category-group-wrapper:hover .fav-group-scroll-btn.visible { /* [추가] 카테고리 래퍼용 hover 선택자 */
        color: #DEDEE3;
    }

    /* [수정] ID 선택자를 클래스 선택자로 변경 */
    html[dark="true"] .scroll-btn-left { background: linear-gradient(to right, #1F1F23, rgba(31, 31, 35, 0)); }
    html[dark="true"] .scroll-btn-right { background: linear-gradient(to left, #1F1F23, rgba(31, 31, 35, 0)); }

    html[dark="true"] .fav-group-tab { background-color: #2c2c31; color: #DEDEE3; }
    html[dark="true"] .fav-group-tab:hover { background-color: #3e3e44; }
    html[dark="true"] .fav-group-tab.active { background-color: #424242; }

    /* --- 화이트 모드 스타일 --- */
    html:not([dark="true"]) #favorite-group-wrapper:hover .fav-group-scroll-btn.visible,
    html:not([dark="true"]) #category-group-wrapper:hover .fav-group-scroll-btn.visible { /* [추가] 카테고리 래퍼용 hover 선택자 */
        color: #53535F;
    }

    /* [수정] ID 선택자를 클래스 선택자로 변경 */
    html:not([dark="true"]) .scroll-btn-left { background: linear-gradient(to right, #EFEFF1, rgba(239, 239, 241, 0)); }
    html:not([dark="true"]) .scroll-btn-right { background: linear-gradient(to left, #EFEFF1, rgba(239, 239, 241, 0)); }

    html:not([dark="true"]) .fav-group-tab { background-color: #E6E6EA; color: #53535F; }
    html:not([dark="true"]) .fav-group-tab:hover { background-color: #DCDDE1; }
    html:not([dark="true"]) .fav-group-tab.active { background-color: #d2d2d2; }

    `;
    //html:not([dark="true"]) (화이트)	#6A6A75
    //html[dark="true"] (다크)	#94949C

    const mainPageCommonStyles = `

._moreDot_layer button {
    text-align: left;
}

.customSidebar .btn_flexible {
    display: none;
}
#sidebar {
    z-index: 1401;
}

body.customSidebar main {
    padding-left: 238px !important;
}

body.customSidebar .catch_webplayer_wrap {
    margin-left: 24px !important;
}

    `;

    const playerCommonStyles = `
.default_logo.on { z-index: 0 !important; }
.screen_mode .left_navbar,
.fullScreen_mode .left_navbar {
    display: none;
}

.customSidebar .btn_flexible {
    display: none;
}

/* 스크롤바 스타일링 */
html {
    overflow: auto; /* 스크롤 기능 유지 */
}

/* Firefox 전용 스크롤바 감추기 */
html::-webkit-scrollbar {
    display: none; /* 크롬 및 사파리에서 */
}

/* Firefox에서는 아래와 같이 처리 */
html {
    scrollbar-width: none; /* Firefox에서 스크롤바 감추기 */
    -ms-overflow-style: none; /* Internet Explorer 및 Edge */
}

.customSidebar #player,
.customSidebar #webplayer #webplayer_contents #player_area .float_box,
.customSidebar #webplayer #webplayer_contents #player_area
{
    min-width: 180px !important;
}

.customSidebar.screen_mode #webplayer,
.customSidebar.screen_mode #sidebar
{
    transition: all 0.25s ease-in-out !important;
}

@media screen and (max-width: 892px) {
    .screen_mode.bottomChat #webplayer #player .view_ctrl,
    .screen_mode.bottomChat #webplayer .wrapping.side {
        display: block !important;
    }
}

.customSidebar #webplayer_contents {
    width: calc(100vw - ${WEB_PLAYER_SCROLL_LEFT}px) !important;
    gap:0 !important;
    padding: 0 !important;
    margin: 64px 0 0 !important;
    left: ${WEB_PLAYER_SCROLL_LEFT}px !important;
}

.customSidebar.top_hide #webplayer_contents,
.customSidebar.top_hide #sidebar {
    top: 0 !important;
    margin-top: 0 !important;
    min-height: 100vh !important;
}

/* sidebar가 .max 클래스를 가질 때, body에 .screen_mode가 없을 경우 */
body:not(.screen_mode):not(.fullScreen_mode):has(#sidebar.max) #webplayer_contents {
    width: calc(100vw - 240px) !important;
    left: 240px !important;
}

/* sidebar가 .min 클래스를 가질 때, body에 .screen_mode가 없을 경우 */
body:not(.screen_mode):not(.fullScreen_mode):has(#sidebar.min) #webplayer_contents {
    width: calc(100vw - 52px) !important;
    left: 52px !important;
}

.customSidebar.screen_mode #webplayer #webplayer_contents,
.customSidebar.fullScreen_mode #webplayer #webplayer_contents {
    top: 0 !important;
    left: 0 !important;
    width: 100vw;
    height: 100vh !important;
    margin: 0 !important;
}

.customSidebar.screen_mode #sidebar{
    top: 0 !important;
}

.customSidebar.screen_mode #sidebar .button-fold-sidebar,
.customSidebar.screen_mode #sidebar .button-unfold-sidebar
{
    display: none !important;
}

.customSidebar.screen_mode.showSidebar #sidebar{
    display: flex !important;
}

.customSidebar.screen_mode #webplayer_contents,
.customSidebar.fullScreen_mode #webplayer_contents{
    width: 100vw !important
}

.customSidebar.screen_mode.showSidebar:has(#sidebar.min) #webplayer_contents {
    width: calc(100vw - 52px) !important
}
.customSidebar.screen_mode.showSidebar:has(#sidebar.max) #webplayer_contents {
    width: calc(100vw - 240px) !important
}

.screen_mode.bottomChat #webplayer #webplayer_contents {
    top: 0 !important;
    margin: 0 !important;
}

.screen_mode.bottomChat #player {
    min-height: auto !important;
}

.screen_mode.bottomChat #webplayer #webplayer_contents {
    position: relative;
    box-sizing: border-box;
    flex: auto;
    display: flex;
    flex-direction: column !important;
    justify-content:flex-start !important;
}

.screen_mode.bottomChat #webplayer #webplayer_contents .wrapping.side {
    width: 100% !important;
    max-height: calc(100vh - (100vw * 9 / 16)) !important;
}

.screen_mode.bottomChat.showSidebar:has(#sidebar.min) #webplayer #webplayer_contents .wrapping.side {
    width: 100% !important;
    max-height: calc(100vh - ((100vw - 52px) * 9 / 16)) !important;
}
.screen_mode.bottomChat.showSidebar:has(#sidebar.max) #webplayer #webplayer_contents .wrapping.side {
    width: 100% !important;
    max-height: calc(100vh - ((100vw - 240px) * 9 / 16)) !important;
}

.screen_mode.bottomChat #webplayer #webplayer_contents .wrapping.side section.box.chatting_box {
    height: 100% !important;
}

.screen_mode.bottomChat #webplayer #webplayer_contents .wrapping.side section.box.chatting_box #chatting_area {
    height: 100% !important;
    min-height: 10vh !important;
}

.screen_mode.bottomChat #webplayer #webplayer_contents #player_area .htmlplayer_wrap,
.screen_mode.bottomChat #webplayer #webplayer_contents #player_area .htmlplayer_content,
.screen_mode.bottomChat #webplayer #webplayer_contents #player_area .float_box,
.screen_mode.bottomChat #webplayer #webplayer_contents #player_area #player {
    height: auto !important;
    max-height: max-content;
}

.customSidebar #player {
    max-height: 100vh !important;
}

`;

    //======================================
    // 3. 함수 정의 (Function Definitions)
    //======================================

    // 3.1. API 및 데이터 호출 함수 (API & Data Fetching)

    const fetchFavoriteGroups = async () => {
        const response = await fetchBroadList("https://myapi.sooplive.com/api/favorite/group/list", 50);
        return response?.data || [];
    };

    const getHiddenbjList = async () => {
        const url = "https://live.sooplive.com/api/hiddenbj/hiddenbjController.php";

        const response = await fetchBroadList(url, 25);

        if (response?.RESULT === 1) {
            return response.DATA || [];
        } else {
            return [];
        }
    };
    const getStationFeed = async () => {
        // 채널 피드가 비활성화된 경우 빈 배열을 반환합니다.
        if (!isChannelFeedEnabled) {
            return [];
        }

        const feedUrl = "https://myapi.sooplive.com/api/feed?index_reg_date=0&user_id=&is_bj_write=1&feed_type=&page=1";
        const response = await fetchBroadList(feedUrl, 150);

        return response?.data || [];
    };

    const loadCategoryData = () => {
        // 현재 시간 기록
        const currentTime = new Date().getTime();

        // 이전 실행 시간 불러오기
        const lastExecutionTime = GM_getValue("lastExecutionTime", 0);

        // 마지막 실행 시간으로부터 15분 이상 경과했는지 확인
        if (currentTime - lastExecutionTime >= 900000) {
            // URL에 현재 시간을 쿼리 스트링으로 추가해서 캐시 방지
            const url = "https://live.sooplive.com/script/locale/ko_KR/broad_category.js?" + currentTime;

            GM_xmlhttpRequest({
                method: "GET",
                url: url,
                headers: {
                    "Content-Type": "text/plain; charset=utf-8",
                },
                onload: function (response) {
                    if (response.status === 200) {
                        // 성공적으로 데이터를 받았을 때 처리할 코드 작성
                        let szBroadCategory = response.responseText;
                        customLog.log(szBroadCategory);
                        // 이후 처리할 작업 추가
                        szBroadCategory = JSON.parse(szBroadCategory.split("var szBroadCategory = ")[1].slice(0, -1));
                        if (szBroadCategory.CHANNEL.RESULT === "1") {
                            // 불필요한 키 제거 후 저장
                            const stripCategoryKeys = (categories) =>
                                categories.map(({ cate_no, cate_name, child }) => ({
                                    cate_no,
                                    cate_name,
                                    ...(child?.length ? { child: stripCategoryKeys(child) } : {}),
                                }));
                            const cleanData = {
                                CHANNEL: {
                                    RESULT: szBroadCategory.CHANNEL.RESULT,
                                    BROAD_CATEGORY: stripCategoryKeys(szBroadCategory.CHANNEL.BROAD_CATEGORY),
                                },
                            };
                            GM_setValue("szBroadCategory", cleanData);
                            // 현재 시간을 마지막 실행 시간으로 업데이트
                            GM_setValue("lastExecutionTime", currentTime);
                        }
                    } else {
                        customLog.error("Failed to load data:", response.statusText);
                    }
                },
                onerror: function (error) {
                    customLog.error("Error occurred while loading data:", error);
                },
            });
        }
    };
    // 만료된 fetchCache_ 항목을 GM 저장소에서 정리 (스크립트 시작 시 1회 실행)
    const cleanExpiredGMCache = async () => {
        try {
            const keys = await GM_listValues();
            const expired = keys.filter((k) => k.startsWith("fetchCache_"));
            await Promise.all(
                expired.map(async (k) => {
                    const val = await GM_getValue(k, null);
                    if (!val) {
                        await GM_setValue(k, undefined);
                        return;
                    }
                    try {
                        const { timestamp } = JSON.parse(val);
                        // 1시간 이상 지난 캐시 삭제
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
    cleanExpiredGMCache();

    // 동일 URL 동시 요청 중복 방지용 in-flight 맵
    const _fetchInFlight = new Map();

    // per-channel URL은 탭 간 공유 불필요 → GM 저장소 제외 대상
    const _isPerChannelUrl = (url) => /\/channels\/[0-9a-f]{32}\//i.test(url);

    const fetchBroadList = async (url, expiry_seconds = 50, timeout = 5000) => {
        const CACHE_EXPIRY_MS = expiry_seconds * 1000;
        const cacheKey = `fetchCache_${encodeURIComponent(url)}`;
        const skipGM = _isPerChannelUrl(url);

        const _parseAndValidateCache = (cachedDataString) => {
            if (!cachedDataString) return null;
            try {
                const { timestamp, data } = JSON.parse(cachedDataString);
                if (Date.now() - timestamp < CACHE_EXPIRY_MS) return data;
            } catch (e) {
                customLog.warn(url, "Cache parse error, ignoring.", e);
            }
            return null;
        };

        // 1. LocalStorage 확인
        const localData = _parseAndValidateCache(localStorage.getItem(cacheKey));
        if (localData) return localData;

        // 2. GM 저장소 확인 (per-channel URL은 건너뜀)
        if (!skipGM) {
            const gmDataString = await GM_getValue(cacheKey, null);
            const gmData = _parseAndValidateCache(gmDataString);
            if (gmData) {
                localStorage.setItem(cacheKey, gmDataString);
                return gmData;
            }
        }

        // 3. 동일 URL이 이미 요청 중이면 그 Promise를 재사용 (중복 요청 방지)
        if (_fetchInFlight.has(cacheKey)) {
            return _fetchInFlight.get(cacheKey);
        }

        // 4. 실제 요청
        const fetchPromise = new Promise((resolve) => {
            let timeoutId;

            if (timeout) {
                timeoutId = setTimeout(() => {
                    customLog.error(url, `Request timed out after ${timeout} ms`);
                    resolve([]);
                }, timeout);
            }

            GM_xmlhttpRequest({
                method: "GET",
                url: url,
                headers: { "Content-Type": "application/json" },
                onload: async (response) => {
                    if (timeoutId) clearTimeout(timeoutId);
                    _fetchInFlight.delete(cacheKey);

                    try {
                        if (response.status >= 200 && response.status < 300) {
                            const jsonResponse = JSON.parse(response.responseText);

                            if (jsonResponse?.RESULT === -1 || (jsonResponse?.code && jsonResponse.code < 0)) {
                                customLog.error(
                                    url,
                                    `API Error (Login Required or other): ${jsonResponse.MSG || jsonResponse.message}`,
                                );
                                localStorage.removeItem(cacheKey);
                                if (!skipGM) await GM_setValue(cacheKey, undefined);
                                resolve([]);
                            } else {
                                const cacheData = JSON.stringify({ timestamp: Date.now(), data: jsonResponse });
                                localStorage.setItem(cacheKey, cacheData);
                                if (!skipGM) await GM_setValue(cacheKey, cacheData);
                                resolve(jsonResponse);
                            }
                        } else if (response.status === 401) {
                            customLog.error(url, "Unauthorized: 401 error - possibly invalid credentials");
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
                    customLog.error(url, "Request error: " + error.message);
                    resolve([]);
                },
            });
        });

        _fetchInFlight.set(cacheKey, fetchPromise);
        return fetchPromise;
    };
    const getBroadM3u8Domain = async (broadNumber) => {
        const baseUrl = "https://livestream-manager.sooplive.com/broad_stream_assign.html";
        const params = new URLSearchParams({
            return_type: "gs_cdn_pc_web",
            use_cors: "true",
            cors_origin_url: "play.sooplive.com",
            broad_key: `${broadNumber}-common-master-hls`,
            player_mode: "landing",
            time: "0",
        });

        const requestUrl = `${baseUrl}?${params.toString()}`;

        try {
            const res = await fetch(requestUrl, {
                method: "GET",
                credentials: "include",
                cache: "no-store",
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();

            if (data.result === "1" && data.view_url) {
                customLog.log("M3U8 URL:", data.view_url);
                return data.view_url;
            } else {
                customLog.log("Failed to retrieve M3U8 URL:", data);
                return null;
            }
        } catch (error) {
            customLog.error("Error fetching M3U8 URL:", error);
            return null;
        }
    };

    const getBroadAid2 = async (id, broadNumber, quality = "original") => {
        const basePayload = {
            bid: id,
            bno: broadNumber,
            from_api: "0",
            mode: "landing",
            player_type: "html5",
            stream_type: "common",
            quality: quality,
        };

        // AID 요청 함수
        const requestAid = async (password = "") => {
            const payload = {
                ...basePayload,
                type: "aid",
                pwd: password,
            };
            const options = {
                method: "POST",
                body: new URLSearchParams(payload),
                credentials: "include",
                cache: "no-store",
            };
            const res = await fetch("https://live.sooplive.com/afreeca/player_live_api.php", options);
            return await res.json();
        };

        // LIVE 요청 함수
        const requestLive = async () => {
            const payload = {
                ...basePayload,
                type: "live",
                pwd: "",
            };
            const options = {
                method: "POST",
                body: new URLSearchParams(payload),
                credentials: "include",
                cache: "no-store",
            };
            const res = await fetch("https://live.sooplive.com/afreeca/player_live_api.php", options);
            return await res.json();
        };

        try {
            // 1차: 비밀번호 없이 AID 요청
            const result1 = await requestAid("");
            if (result1?.CHANNEL?.AID) {
                customLog.log(result1.CHANNEL.AID);
                return result1.CHANNEL.AID;
            }

            // 2차: LIVE 요청으로 BPWD 확인
            const result2 = await requestLive();
            if (result2?.CHANNEL?.BPWD === "Y") {
                const password = prompt("비밀번호를 입력하세요:");
                if (password === null) return null;

                // 3차: 입력된 비밀번호로 다시 AID 요청
                const retryResult = await requestAid(password);
                if (retryResult?.CHANNEL?.AID) {
                    customLog.log(result1.CHANNEL.AID);
                    return retryResult.CHANNEL.AID;
                } else {
                    alert("비밀번호가 틀렸거나 종료된 방송입니다.");
                }
            }

            return null;
        } catch (error) {
            customLog.log("오류 발생:", error);
            return null;
        }
    };

    const getM3u8url = async (id, broadNumber, quality = "hd") => {
        try {
            // Use Promise.all to initiate both requests concurrently
            const [aid, baseUrl] = await Promise.all([
                getBroadAid2(id, broadNumber, quality),
                getBroadM3u8Domain(broadNumber),
            ]);

            if (!aid) {
                customLog.log("Failed to get AID. Cannot construct complete URL.");
                return null;
            }

            if (!baseUrl) {
                customLog.log("Failed to get base M3u8 URL. Cannot construct complete URL.");
                return null;
            }

            // Construct the complete URL by appending the AID
            const completeUrl = `${baseUrl}?aid=${aid}`;
            customLog.log("Complete Broad URL:", completeUrl);
            return completeUrl;
        } catch (error) {
            customLog.error("Error in getM3u8url:", error);
            return null;
        }
    };

    const getLatestFrameData = async (id, broadNumber) => {
        const videoElement = document.createElement("video");
        videoElement.playbackRate = 16; // 빠른 재생 속도 설정

        const m3u8url = await getM3u8url(id, broadNumber, "sd");

        if (unsafeWindow.Hls.isSupported()) {
            const hls = new unsafeWindow.Hls();
            hls.loadSource(m3u8url);
            hls.attachMedia(videoElement);

            return new Promise((resolve) => {
                videoElement.addEventListener("canplay", async () => {
                    const frameData = await captureLatestFrame(videoElement);
                    resolve(frameData);
                    videoElement.pause();
                    videoElement.src = "";
                });
            });
        } else {
            customLog.error("HLS.js를 지원하지 않는 브라우저입니다.");
            return null;
        }
    };

    // 3.2. 핵심 유틸리티 함수 (Core Utility Functions)

    /**
     * 즐겨찾기 목록에서 우선순위에 따라 정렬된 '라이브 방송 목록 전체'를 반환하는 함수
     * @param {object} favoriteData - fetch로 받아온 즐겨찾기 데이터
     * @returns {object[]} - 우선순위에 따라 정렬된 방송 정보 객체 배열
     */
    function getPrioritizedLiveBroadcasts(favoriteData) {
        if (!favoriteData?.data?.length) {
            return []; // 비어있는 배열 반환
        }

        const liveCategories = {
            pinnedOnline: [],
            notifiedOnline: [],
            normalOnline: [],
        };

        favoriteData.data.forEach((item) => {
            if (item.is_live !== true) return;

            const isPin = item.is_pin === true;
            const isMobilePush = item.is_mobile_push === "Y";
            const broadInfo = item.broad_info?.[0];

            if (!broadInfo) return;

            if (isPin) liveCategories.pinnedOnline.push(broadInfo);
            else if (isMobilePush) liveCategories.notifiedOnline.push(broadInfo);
            else liveCategories.normalOnline.push(broadInfo);
        });

        const compareWatchers = (a, b) => (b.total_view_cnt || 0) - (a.total_view_cnt || 0);
        Object.values(liveCategories).forEach((category) => {
            category.sort(compareWatchers);
        });

        // 우선순위에 따라 카테고리를 합쳐서 최종 목록을 만듭니다.
        const prioritizedList = [
            ...liveCategories.pinnedOnline,
            ...liveCategories.notifiedOnline,
            ...liveCategories.normalOnline,
        ];

        return prioritizedList;
    }

    function getFollowList(callback) {
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://myapi.sooplive.com/api/favorite",
            headers: {
                "Content-Type": "application/json",
            },
            onload: function (response) {
                try {
                    const res = JSON.parse(response.responseText);
                    if (res.code === -10000) {
                        callback([]);
                    } else {
                        // user_id만 추출
                        const userIdList = res.data.map((item) => item.user_id);
                        // 저장
                        GM_setValue("allFollowUserIds", userIdList);
                        // 콜백 전달
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
    }

    function waitForVariable(varName, timeout = 20000) {
        return new Promise((resolve, reject) => {
            let e = 0;
            const t = setInterval(() => {
                unsafeWindow[varName]
                    ? (clearInterval(t), resolve(unsafeWindow[varName]))
                    : ((e += 200),
                      e >= timeout && (clearInterval(t), reject(new Error(`'${varName}' 변수를 찾지 못했습니다.`))));
            }, 200);
        });
    }
    const loadHlsScript = () => {
        // hls.js 동적 로드
        const hlsScript = document.createElement("script");
        hlsScript.src = "https://cdn.jsdelivr.net/npm/hls.js@latest";
        hlsScript.onload = function () {
            customLog.log("hls.js가 성공적으로 로드되었습니다.");
        };
        hlsScript.onerror = function () {
            customLog.error("hls.js 로드 중 오류가 발생했습니다.");
        };
        document.head.appendChild(hlsScript);
    };
    const checkIfTimeover = (timestamp) => {
        const now = Date.now();
        const inputTime = timestamp * 1000; // 초 단위 타임스탬프를 밀리초로 변환

        // 24시간(1일) = 86400000 밀리초
        return now - inputTime > 86400000;
    };
    const timeSince = (serverTimeStr) => {
        // 입력 문자열 → ISO 8601 + KST 오프셋으로 변환
        const toKSTDate = (str) => {
            const iso = str.replace(" ", "T") + "+09:00";
            return new Date(iso);
        };

        const postTime = toKSTDate(serverTimeStr).getTime(); // 게시물 작성 시각 (KST)
        const now = Date.now(); // 현재 시각 (밀리초 기준, UTC)

        const seconds = Math.floor((now - postTime) / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 365) return `${Math.floor(days / 365)}년 전`;
        if (days > 30) return `${Math.floor(days / 30)}개월 전`;
        if (days > 0) return `${days}일 전`;
        if (hours > 0) return `${hours}시간 전`;
        if (minutes > 0) return `${minutes}분 전`;

        return `${seconds}초 전`;
    };
    const waitForElement = (selector, callback, timeout = 10000) => {
        let observer = null;

        const timeoutId = setTimeout(() => {
            if (observer) {
                observer.disconnect();
                customLog.warn(`[waitForElement] Timeout: '${selector}' 요소를 ${timeout}ms 내에 찾지 못했습니다.`);
            }
        }, timeout);

        const element = document.querySelector(selector);
        if (element) {
            clearTimeout(timeoutId);
            callback(selector, element);
            return;
        }

        observer = new MutationObserver((mutations, obs) => {
            const targetElement = document.querySelector(selector);
            if (targetElement) {
                obs.disconnect();
                clearTimeout(timeoutId);
                callback(selector, targetElement);
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    };
    const waitForElementAsync = (selector, timeout = 10000) => {
        return new Promise((resolve, reject) => {
            // 1. 요소가 이미 존재하는지 즉시 확인
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
                return;
            }

            let observer = null;

            // 2. 타임아웃 설정: 지정된 시간이 지나면 reject 실행
            const timeoutId = setTimeout(() => {
                if (observer) {
                    observer.disconnect();
                    // new Error 객체를 사용해 더 명확한 에러 스택 추적 가능
                    //reject(new Error(`Timeout: '${selector}' 요소를 ${timeout}ms 내에 찾지 못했습니다.`));
                }
            }, timeout);

            // 3. MutationObserver 설정: DOM 변경 감지
            observer = new MutationObserver((mutations) => {
                // 변경이 감지되면 요소를 다시 찾아봄
                const targetElement = document.querySelector(selector);
                if (targetElement) {
                    observer.disconnect(); // 관찰 중단
                    clearTimeout(timeoutId); // 타임아웃 타이머 제거
                    resolve(targetElement); // Promise 성공 처리
                }
            });

            // 4. 관찰 시작
            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });
        });
    };
    const waitForLivePlayer = (timeout = 10000) => {
        return new Promise((resolve, reject) => {
            const interval = 1500;
            let elapsed = 0;

            const check = () => {
                if (unsafeWindow.livePlayer) {
                    resolve(unsafeWindow.livePlayer);
                } else {
                    elapsed += interval;
                    if (elapsed >= timeout) {
                        reject(new Error("livePlayer 객체를 찾지 못했습니다."));
                    } else {
                        setTimeout(check, interval);
                    }
                }
            };

            check();
        });
    };
    const waitForNonEmptyArray = async () => {
        const timeout = new Promise(
            (resolve) => setTimeout(() => resolve([]), 3000), // 3초 후 빈 배열 반환
        );

        const checkArray = (async () => {
            while (allFollowUserIds.length === 0) {
                await new Promise((resolve) => setTimeout(resolve, 100)); // 100ms 대기
            }
            return allFollowUserIds;
        })();

        return Promise.race([timeout, checkArray]);
    };
    const manageRedDot = (targetDiv) => {
        const RED_DOT_CLASS = "red-dot";
        const style = document.createElement("style");
        style.textContent = `
        .${RED_DOT_CLASS} {
            position: absolute;
            top: 8px;
            right: 8px;
            width: 4px;
            height: 4px;
            background-color: red;
            border-radius: 50%;
        }
        `;
        document.head.appendChild(style);

        const lastUpdateDate = GM_getValue("lastUpdateDate", 0);
        const btn = targetDiv;

        // 빨간 점 추가 함수
        const showRedDot = () => {
            if (!btn || document.querySelector(`#openModalBtn .${RED_DOT_CLASS}`)) return;
            const redDot = document.createElement("div");
            redDot.classList.add(RED_DOT_CLASS);
            btn.parentElement.appendChild(redDot);
        };

        // 빨간 점 제거 함수
        const hideRedDot = () => {
            const redDot = document.querySelector(`#openModalBtn .${RED_DOT_CLASS}`);
            if (redDot) redDot.remove();
        };

        // 날짜를 비교하여 빨간 점 표시
        if (NEW_UPDATE_DATE > lastUpdateDate) {
            showRedDot();
        } else {
            hideRedDot();
        }

        // 버튼 클릭 시 이벤트 핸들러 추가
        btn?.addEventListener("click", () => {
            GM_setValue("lastUpdateDate", NEW_UPDATE_DATE);
            hideRedDot();
        });
    };
    const addNumberSeparator = (number) => {
        number = Number(number);

        // 숫자가 10,000 이상일 때
        if (number >= 10000) {
            const displayNumber = (number / 10000).toFixed(1);
            return displayNumber.endsWith(".0") ? displayNumber.slice(0, -2) + "만" : displayNumber + "만";
        }

        return number.toLocaleString();
    };
    const addNumberSeparatorAll = (number) => {
        number = Number(number);

        // 숫자가 10,000 이상일 때
        if (number >= 10000) {
            const displayNumber = (number / 10000).toFixed(1);
            return displayNumber.endsWith(".0") ? displayNumber.slice(0, -2) + "만" : displayNumber + "만";
        }
        // 숫자가 1,000 이상일 때
        else if (number >= 1000) {
            const displayNumber = (number / 1000).toFixed(1);
            return displayNumber.endsWith(".0") ? displayNumber.slice(0, -2) + "천" : displayNumber + "천";
        }

        // 기본적으로 쉼표 추가
        return number.toLocaleString();
    };
    const getCategoryName = (targetCateNo) => {
        const searchCategory = (categories) => {
            for (const category of categories) {
                if (category.cate_no === targetCateNo) {
                    return category.cate_name;
                }

                if (category.child?.length) {
                    const result = searchCategory(category.child);
                    if (result) return result;
                }
            }
        };

        return searchCategory(savedCategory.CHANNEL.BROAD_CATEGORY);
    };
    const getCategoryNo = (targetCateName) => {
        const searchCategory = (categories) => {
            for (const category of categories) {
                if (category.cate_name === targetCateName) {
                    return category.cate_no;
                }

                if (category.child?.length) {
                    const result = searchCategory(category.child);
                    if (result) return result;
                }
            }
        };

        return searchCategory(savedCategory.CHANNEL.BROAD_CATEGORY);
    };
    const compareWatchers = (a, b) => {
        // Get watchers data only once for each element
        const watchersA = a.dataset.watchers ? +a.dataset.watchers : 0; // Use dataset for better performance
        const watchersB = b.dataset.watchers ? +b.dataset.watchers : 0; // Use dataset for better performance
        return watchersB - watchersA; // Sort by watchers
    };
    const stableRandomOrder = (() => {
        // 한 번에 여러 개를 정렬할 때 일관된 랜덤성을 유지하려면, 미리 섞어주는 방식이 좋습니다.
        // 이 함수는 내부적으로 shuffle된 index 맵을 사용해서 안정적인 무작위 정렬을 구현합니다.

        let randomMap = new WeakMap();

        return (a, b) => {
            if (!randomMap.has(a)) randomMap.set(a, Math.random());
            if (!randomMap.has(b)) randomMap.set(b, Math.random());
            return randomMap.get(a) - randomMap.get(b);
        };
    })();
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    const isElementVisible = (selector) => {
        const el = document.querySelector(selector);
        if (!el) return false; // 요소가 없음

        const style = window.getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") {
            return false; // CSS로 숨겨진 경우
        }

        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
            return false; // 크기가 0인 경우
        }

        // 화면 안에 일부라도 보이는 경우
        return (
            rect.bottom > 0 &&
            rect.right > 0 &&
            rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left < (window.innerWidth || document.documentElement.clientWidth)
        );
    };
    const updateBodyClass = (targetClass) => {
        if (!window.matchMedia("(orientation: portrait)").matches) {
            document.body.classList.remove(targetClass);
            document.querySelector(".expand-toggle-li").style.display = "none";
        } else {
            document.querySelector(".expand-toggle-li").style.display = "block";
        }
    };
    const extractDateTime = (text) => {
        const [dateStr, timeStr] = text.split(" "); // split 한 번으로 날짜와 시간을 동시에 얻기
        const dateTimeStr = `${dateStr}T${timeStr}Z`; // 문자열 템플릿 사용
        return new Date(dateTimeStr);
    };
    const getElapsedTime = (broadcastStartTimeText, type) => {
        const broadcastStartTime = extractDateTime(broadcastStartTimeText);
        broadcastStartTime.setHours(broadcastStartTime.getHours() - 9);
        const currentTime = new Date();
        const timeDiff = currentTime - broadcastStartTime;

        const secondsElapsed = Math.floor(timeDiff / 1000);
        const hoursElapsed = Math.floor(secondsElapsed / 3600);
        const minutesElapsed = Math.floor((secondsElapsed % 3600) / 60);
        const remainingSeconds = secondsElapsed % 60;
        let formattedTime = "";

        if (type === "HH:MM:SS") {
            formattedTime = `${String(hoursElapsed).padStart(2, "0")}:${String(minutesElapsed).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
        } else if (type === "HH:MM") {
            if (hoursElapsed > 0) {
                formattedTime = `${String(hoursElapsed)}시간 `;
            }
            formattedTime += `${String(minutesElapsed)}분`;
        }
        return formattedTime;
    };
    const isUserTyping = () => {
        const active = document.activeElement;
        const tag = active?.tagName?.toUpperCase();
        return tag === "INPUT" || tag === "TEXTAREA" || active?.isContentEditable || active?.id === "write_area";
    };
    const observeElementChanges = (targetSelector, callback, options = {}) => {
        /**
         * 지정된 요소의 DOM 변경을 감지하고, 변경 시 콜백 함수를 실행하는 범용 유틸리티 함수입니다.
         *
         * @param {string} targetSelector - 감시할 요소의 CSS 선택자입니다.
         * @param {function(MutationRecord[], MutationObserver): void} callback - DOM 변경이 감지되었을 때 실행할 콜백 함수입니다.
         * @param {Object} [options] - 관찰에 대한 설정 객체입니다. (선택 사항)
         * @param {boolean} [options.once=false] - true로 설정하면 콜백을 한 번만 실행하고 관찰을 자동 중단합니다.
         * @param {MutationObserverInit} [options] - MutationObserver의 표준 설정도 포함합니다. (childList, subtree, attributes 등)
         * @returns {MutationObserver|null} 생성된 MutationObserver 인스턴스를 반환합니다.
         */
        // 1. 감시할 대상 요소 선택
        const targetElement = document.querySelector(targetSelector);
        if (!targetElement) {
            customLog.error(
                `[observeElementChanges] 오류: 선택자 '${targetSelector}'에 해당하는 요소를 찾을 수 없습니다.`,
            );
            return null;
        }

        // 2. 콜백 함수 유효성 검사
        if (typeof callback !== "function") {
            customLog.error(`[observeElementChanges] 오류: 두 번째 인자로 전달된 콜백이 함수가 아닙니다.`);
            return null;
        }

        // 3. 옵션 분리 및 설정
        // options 객체에서 'once' 속성을 분리하고, 나머지는 observer 설정으로 사용합니다.
        const { once = false, ...observerOptions } = options;

        const defaultConfig = {
            childList: true, // 기본값: 자식 요소 변경 감지
            subtree: true, // 기본값: 하위 트리까지 감지
        };
        // 기본 설정, 사용자 지정 observer 설정을 병합
        const config = { ...defaultConfig, ...observerOptions };

        // 4. MutationObserver 인스턴스 생성 및 콜백 연결
        const observer = new MutationObserver((mutationsList, observer) => {
            // 사용자 콜백 실행
            callback(mutationsList, observer);

            // 5. 'once' 옵션이 true이면, 콜백 실행 후 즉시 관찰 중단
            if (once) {
                observer.disconnect();
                customLog.log(
                    `[observeElementChanges] '${targetSelector}' 요소에 대한 관찰이 1회 실행 후 중단되었습니다.`,
                );
            }
        });

        // 6. 관찰 시작
        observer.observe(targetElement, config);
        customLog.log(`[observeElementChanges] '${targetSelector}' 요소에 대한 관찰을 시작합니다. (once: ${once})`);

        // 7. 생성된 observer 인스턴스 반환
        return observer;
    };
    const observeUrlChanges = (() => {
        let lastUrl = window.location.pathname;
        const callbacks = new Set();
        let isObserving = false;

        const triggerCallbacks = (newUrl) => {
            if (newUrl !== lastUrl) {
                lastUrl = newUrl;
                callbacks.forEach((cb) => cb(newUrl));
            }
        };

        const startObserving = () => {
            if (isObserving) return;
            isObserving = true;

            window.addEventListener("popstate", () => {
                triggerCallbacks(window.location.pathname);
            });

            const originalPushState = history.pushState;
            const originalReplaceState = history.replaceState;

            history.pushState = function (...args) {
                originalPushState.apply(this, args);
                triggerCallbacks(args[2]?.toString() || window.location.pathname);
            };

            history.replaceState = function (...args) {
                originalReplaceState.apply(this, args);
                triggerCallbacks(args[2]?.toString() || window.location.pathname);
            };
        };

        return function registerCallback(callback) {
            startObserving();
            callbacks.add(callback);

            // 개별 콜백 제거 가능
            return function disconnect() {
                callbacks.delete(callback);
            };
        };
    })();
    const waitForConditionAsync = (conditionFn, timeout = 10000) => {
        /**
         * 주어진 조건 함수(conditionFn)가 true를 반환할 때까지 기다리는 Promise를 반환합니다.
         * @param {() => boolean} conditionFn - true 또는 false를 반환하는 조건 함수.
         * @param {number} [timeout=10000] - 기다릴 최대 시간 (밀리초).
         * @returns {Promise<void>} 조건이 충족되면 resolve되는 Promise.
         */
        return new Promise((resolve, reject) => {
            // 1. 즉시 조건 확인
            if (conditionFn()) {
                resolve();
                return;
            }

            let observer = null;

            // 2. 타임아웃 설정
            const timeoutId = setTimeout(() => {
                if (observer) {
                    observer.disconnect();
                    reject(new Error("Timeout: 조건이 지정된 시간 내에 충족되지 않았습니다."));
                }
            }, timeout);

            // 3. MutationObserver로 body의 모든 변화를 감지
            observer = new MutationObserver(() => {
                if (conditionFn()) {
                    observer.disconnect();
                    clearTimeout(timeoutId);
                    resolve();
                }
            });

            observer.observe(document.body, { childList: true, subtree: true, attributes: true });
        });
    };
    const observeClassChanges = (targetSelector, callback) => {
        /**
         * 지정된 요소의 'class' 속성 변경만을 감지하고, 변경 시 콜백 함수를 실행하는 유틸리티 함수입니다.
         * 이 함수는 MutationObserver를 사용하여 불필요한 DOM 변경 감지를 최소화합니다.
         *
         * @param {string} targetSelector - 감시할 요소의 CSS 선택자입니다.
         * @param {function(MutationRecord[], MutationObserver): void} callback - 'class' 속성 변경이 감지되었을 때 실행할 콜백 함수입니다.
         * @returns {MutationObserver|null} 생성된 MutationObserver 인스턴스를 반환합니다.
         */

        // 1. 감시할 대상 요소 선택
        const targetElement = document.querySelector(targetSelector);
        if (!targetElement) {
            customLog.error(
                `[observeClassChanges] 오류: 선택자 '${targetSelector}'에 해당하는 요소를 찾을 수 없습니다.`,
            );
            return null;
        }

        // 2. 콜백 함수 유효성 검사
        if (typeof callback !== "function") {
            customLog.error(`[observeClassChanges] 오류: 두 번째 인자로 전달된 콜백이 함수가 아닙니다.`);
            return null;
        }

        // 3. MutationObserver 설정 (class 변화에만 집중)
        const config = {
            attributes: true, // 속성 변경 감지 활성화
            attributeFilter: ["class"], // 'class' 속성만 필터링하여 감지
            childList: false, // 자식 요소 변경 감지 비활성화 (기본값 재정의)
            subtree: false, // 하위 트리 변경 감지 비활성화 (기본값 재정의)
        };

        // 4. MutationObserver 인스턴스 생성 및 콜백 연결
        const observer = new MutationObserver((mutationsList, observerInstance) => {
            // 'class' 속성 변경에 대한 모든 변경 레코드를 순회하며 콜백 실행
            // 실제 콜백 함수는 모든 mutationList를 받을 수 있지만,
            // 이 옵션으로 인해 class attribute 변경만 여기에 전달됩니다.
            callback(mutationsList, observerInstance);
        });

        // 5. 관찰 시작
        observer.observe(targetElement, config);
        customLog.log(`[observeClassChanges] '${targetSelector}' 요소의 클래스 변경 감시를 시작합니다.`);

        // 6. 생성된 observer 인스턴스 반환 (필요시 중단 등을 위해)
        return observer;
    };
    const loadScript = (url) => {
        return new Promise((resolve, reject) => {
            // 동일한 스크립트가 이미 로드되었는지 확인
            if (document.querySelector(`script[src="${url}"]`)) {
                customLog.log(`스크립트가 이미 로드됨: ${url}`);
                resolve();
                return;
            }

            const script = document.createElement("script");
            script.src = url;
            script.onload = () => {
                customLog.log(`스크립트 로드 성공: ${url}`);
                resolve();
            };
            script.onerror = () => {
                customLog.error(`스크립트 로드 실패: ${url}`);
                reject(new Error(`${url} 로드 실패`));
            };
            document.head.appendChild(script);
        });
    };

    // 3.3. 차단 기능 관련 함수 (Blocking Features)

    function savePinnedCategories() {
        GM_setValue("pinnedCategories", pinnedCategories);
    }

    function pinCategory(categoryName, categoryId) {
        if (!pinnedCategories.some((cat) => cat.categoryId === categoryId)) {
            pinnedCategories.push({ categoryName, categoryId });
            savePinnedCategories();
            alert(`카테고리 '${categoryName}'을(를) 탭에 추가했습니다.\n해제는 Tampermonkey 메뉴에서 가능합니다.`);
            registerCategoryUnpinMenu({ categoryName, categoryId });
        } else {
            alert(`'${categoryName}' 카테고리는 이미 추가되어 있습니다.`);
        }
    }

    function unpinCategory(categoryId) {
        const categoryToRemove = pinnedCategories.find((cat) => cat.categoryId === categoryId);
        if (categoryToRemove) {
            pinnedCategories = pinnedCategories.filter((cat) => cat.categoryId !== categoryId);
            savePinnedCategories();
            alert(`'${categoryToRemove.categoryName}' 카테고리 고정을 해제했습니다.`);
            unregisterCategoryUnpinMenu(categoryToRemove.categoryId);
            if (selectedPinnedCategoryIdx === categoryId) {
                selectedPinnedCategoryIdx = "all";
                GM_setValue("selectedPinnedCategoryIdx", "all");
            }
        }
    }

    function registerCategoryUnpinMenu(category) {
        if (!category || !category.categoryName) return;
        let menuId = GM_registerMenuCommand(`📌 탭 해제 - ${category.categoryName}`, () => {
            unpinCategory(category.categoryId);
        });
        categoryMenuIds[category.categoryId] = menuId;
    }

    function unregisterCategoryUnpinMenu(categoryId) {
        let menuId = categoryMenuIds[categoryId];
        if (menuId) {
            GM_unregisterMenuCommand(menuId);
            delete categoryMenuIds[categoryId];
        }
    }

    function saveBlockedUsers() {
        GM_setValue("blockedUsers", blockedUsers);
    }
    function blockUser(userName, userId) {
        // 이미 차단된 사용자인지 확인
        if (!isUserBlocked(userId)) {
            blockedUsers.push({ userName, userId });
            saveBlockedUsers();
            alert(`사용자 ${userName}(${userId})를 차단했습니다.\n차단 해제 메뉴는 템퍼몽키 아이콘을 누르면 있습니다.`);
            registerUnblockMenu({ userName, userId });
        } else {
            alert(`사용자 ${userName}(${userId})는 이미 차단되어 있습니다.`);
        }
    }
    function unblockUser(userId) {
        // 차단된 사용자 목록에서 해당 사용자 찾기
        let unblockedUser = blockedUsers.find((user) => user.userId === userId);

        // 사용자를 찾았을 때만 차단 해제 및 메뉴 삭제 수행
        if (unblockedUser) {
            // 차단된 사용자 목록에서 해당 사용자 제거
            blockedUsers = blockedUsers.filter((user) => user.userId !== userId);

            // 변경된 목록을 저장
            GM_setValue("blockedUsers", blockedUsers);

            alert(`사용자 ${userId}의 차단이 해제되었습니다.`);

            unregisterUnblockMenu(unblockedUser.userName);
        }
    }
    function isUserBlocked(userId) {
        return blockedUsers.some((user) => user.userId === userId);
    }
    function registerUnblockMenu(user) {
        // GM_registerMenuCommand로 메뉴를 등록하고 메뉴 ID를 기록
        let menuId = GM_registerMenuCommand(`💔 차단 해제 - ${user.userName}`, function () {
            unblockUser(user.userId);
        });

        // 메뉴 ID를 기록
        menuIds[user.userName] = menuId;
    }
    function unregisterUnblockMenu(userName) {
        // userName을 기반으로 저장된 메뉴 ID를 가져와서 삭제
        let menuId = menuIds[userName];
        if (menuId) {
            GM_unregisterMenuCommand(menuId);
            delete menuIds[userName]; // 삭제된 메뉴 ID를 객체에서도 제거
        }
    }
    function saveBlockedCategories() {
        GM_setValue("blockedCategories", blockedCategories);
    }
    function blockCategory(categoryName, categoryId) {
        // 이미 차단된 카테고리인지 확인
        if (!isCategoryBlocked(categoryId)) {
            blockedCategories.push({ categoryName, categoryId });
            saveBlockedCategories();
            alert(
                `카테고리 ${categoryName}(${categoryId})를 차단했습니다.\n차단 해제 메뉴는 템퍼몽키 아이콘을 누르면 있습니다.`,
            );
            registerCategoryUnblockMenu({ categoryName, categoryId });
        } else {
            alert(`카테고리 ${categoryName}(${categoryId})는 이미 차단되어 있습니다.`);
        }
    }
    function unblockCategory(categoryId) {
        // 차단된 카테고리 목록에서 해당 카테고리 찾기
        let unblockedCategory = blockedCategories.find((category) => category.categoryId === categoryId);

        // 카테고리를 찾았을 때만 차단 해제 및 메뉴 삭제 수행
        if (unblockedCategory) {
            // 차단된 카테고리 목록에서 해당 카테고리 제거
            blockedCategories = blockedCategories.filter((category) => category.categoryId !== categoryId);

            // 변경된 목록을 저장
            GM_setValue("blockedCategories", blockedCategories);

            alert(`카테고리 ${categoryId}의 차단이 해제되었습니다.`);

            unregisterCategoryUnblockMenu(unblockedCategory.categoryName);
        }
    }
    function isCategoryBlocked(categoryId) {
        return blockedCategories.some((category) => category.categoryId === categoryId);
    }
    function registerCategoryUnblockMenu(category) {
        // GM_registerMenuCommand로 카테고리 메뉴를 등록하고 메뉴 ID를 기록
        let menuId = GM_registerMenuCommand(`💔 카테고리 차단 해제 - ${category.categoryName}`, function () {
            unblockCategory(category.categoryId);
        });

        // 메뉴 ID를 기록
        categoryMenuIds[category.categoryName] = menuId;
    }
    function unregisterCategoryUnblockMenu(categoryName) {
        // categoryName을 기반으로 저장된 메뉴 ID를 가져와서 삭제
        let menuId = categoryMenuIds[categoryName];
        if (menuId) {
            GM_unregisterMenuCommand(menuId);
            delete categoryMenuIds[categoryName]; // 삭제된 메뉴 ID를 객체에서도 제거
        }
    }

    // =================================================================
    // 3.4. UI 생성 및 조작 함수 (UI Generation & Manipulation) - 개선안
    // =================================================================

    // [수정] 그룹 이름 옆의 숫자 카운트를 제거한 최종 버전
    const createFavoriteGroupTabs = async (sectionParent) => {
        if (!isFavoriteGroupEnabled) return;

        const existingWrapper = document.getElementById("favorite-group-wrapper");
        if (existingWrapper) existingWrapper.remove();

        const groups = await fetchFavoriteGroups();
        if (groups.length === 0) return;

        const wrapper = document.createElement("div");
        wrapper.id = "favorite-group-wrapper";

        const tabContainer = document.createElement("div");
        tabContainer.id = "favorite-group-tabs";

        const createTab = (title, idx) => {
            const tab = document.createElement("div");
            tab.className = "fav-group-tab";

            // 옵션이 켜져 있고 '전체' 탭이 아닐 경우, 이름을 한 글자로 축약
            if (isShortenFavoriteGroupNameEnabled && idx !== "all") {
                tab.textContent = title.substring(0, 1);
            } else {
                tab.textContent = title;
            }
            // 마우스를 올렸을 때 전체 이름이 보이도록 title 속성 추가
            tab.title = title;

            tab.dataset.idx = idx;

            if (idx == selectedFavoriteGroupIdx) {
                tab.classList.add("active");
            }

            tab.addEventListener("click", async (e) => {
                const newIdx = e.currentTarget.dataset.idx;
                if (newIdx == selectedFavoriteGroupIdx) return;

                selectedFavoriteGroupIdx = newIdx;
                GM_setValue("selectedFavoriteGroupIdx", newIdx);

                tabContainer.querySelectorAll(".fav-group-tab").forEach((t) => t.classList.remove("active"));
                e.currentTarget.classList.add("active");

                const followSectionConfig = allSections.find((s) => s.id === "follow");
                if (followSectionConfig) {
                    await createAndPopulateSection(followSectionConfig, true);
                }
            });
            return tab;
        };

        tabContainer.appendChild(createTab("전체", "all"));
        groups.forEach((group) => {
            tabContainer.appendChild(createTab(group.title, group.idx));
        });

        const scrollLeftBtn = document.createElement("button");
        scrollLeftBtn.id = "scroll-left-btn";
        scrollLeftBtn.className = "fav-group-scroll-btn scroll-btn-left"; // 클래스 추가
        scrollLeftBtn.innerHTML = "‹";

        const scrollRightBtn = document.createElement("button");
        scrollRightBtn.id = "scroll-right-btn";
        scrollRightBtn.className = "fav-group-scroll-btn scroll-btn-right"; // 클래스 추가
        scrollRightBtn.innerHTML = "›";

        wrapper.appendChild(scrollLeftBtn);
        wrapper.appendChild(tabContainer);
        wrapper.appendChild(scrollRightBtn);

        const userSection = sectionParent.querySelector(".users-section.follow");
        if (userSection) {
            sectionParent.insertBefore(wrapper, userSection);
        }

        const updateScrollButtonsVisibility = () => {
            const isScrollable = tabContainer.scrollWidth > tabContainer.clientWidth;

            if (!isScrollable) {
                scrollLeftBtn.classList.remove("visible");
                scrollRightBtn.classList.remove("visible");
                return;
            }

            scrollLeftBtn.classList.toggle("visible", tabContainer.scrollLeft > 1);

            const isAtEnd = tabContainer.scrollWidth - tabContainer.clientWidth - tabContainer.scrollLeft < 1;
            scrollRightBtn.classList.toggle("visible", !isAtEnd);
        };

        const scrollAmount = 150;
        scrollLeftBtn.addEventListener("click", () => {
            tabContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        });
        scrollRightBtn.addEventListener("click", () => {
            tabContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });

        const debouncedUpdate = debounce(updateScrollButtonsVisibility, 50);
        tabContainer.addEventListener("scroll", debouncedUpdate);

        new ResizeObserver(updateScrollButtonsVisibility).observe(tabContainer);

        setTimeout(updateScrollButtonsVisibility, 100);
    };

    // === 신규 '카테고리 탭' 생성 함수 ===
    const createCategoryTabs = async (sectionParent) => {
        if (!isCategoryGroupEnabled) return;
        const existingWrapper = document.getElementById("category-group-wrapper");
        if (existingWrapper) existingWrapper.remove();

        if (pinnedCategories.length === 0) return;

        const wrapper = document.createElement("div");
        wrapper.id = "category-group-wrapper";
        wrapper.style.position = "relative";
        wrapper.style.marginBottom = "5px";

        const tabContainer = document.createElement("div");
        tabContainer.id = "category-group-tabs";
        tabContainer.style.display = "flex";
        tabContainer.style.alignItems = "center";
        tabContainer.style.overflowX = "auto";
        tabContainer.style.overflowY = "hidden";
        tabContainer.style.boxSizing = "border-box";
        tabContainer.style.scrollbarWidth = "none";
        tabContainer.style.marginLeft = "5px";
        tabContainer.style.setProperty("-ms-overflow-style", "none");

        const createTab = (title, idx) => {
            const tab = document.createElement("div");
            tab.className = "fav-group-tab";

            // 옵션이 켜져 있고 '전체' 탭이 아닐 경우, 이름을 한 글자로 축약
            if (isShortenCategoryNameEnabled && idx !== "all") {
                tab.textContent = title.substring(0, 1);
            } else {
                tab.textContent = title;
            }
            // 마우스를 올렸을 때 전체 이름이 보이도록 title 속성 추가
            tab.title = title;

            tab.dataset.idx = idx;

            if (idx == selectedPinnedCategoryIdx) {
                tab.classList.add("active");
            }

            tab.addEventListener("click", async (e) => {
                const newIdx = e.currentTarget.dataset.idx;
                if (newIdx == selectedPinnedCategoryIdx) return;

                selectedPinnedCategoryIdx = newIdx;
                GM_setValue("selectedPinnedCategoryIdx", newIdx);

                tabContainer.querySelectorAll(".fav-group-tab").forEach((t) => t.classList.remove("active"));
                e.currentTarget.classList.add("active");

                const topSectionConfig = allSections.find((s) => s.id === "top");
                if (topSectionConfig) {
                    await createAndPopulateSection(topSectionConfig, true);
                }
            });
            return tab;
        };

        tabContainer.appendChild(createTab("전체", "all"));
        pinnedCategories.forEach((cat) => {
            tabContainer.appendChild(createTab(cat.categoryName, cat.categoryId));
        });

        const scrollLeftBtn = document.createElement("button");
        scrollLeftBtn.id = "scroll-left-btn-cat";
        scrollLeftBtn.className = "fav-group-scroll-btn scroll-btn-left"; // 클래스 추가
        scrollLeftBtn.innerHTML = "‹";

        const scrollRightBtn = document.createElement("button");
        scrollRightBtn.id = "scroll-right-btn-cat";
        scrollRightBtn.className = "fav-group-scroll-btn scroll-btn-right"; // 클래스 추가
        scrollRightBtn.innerHTML = "›";

        wrapper.appendChild(scrollLeftBtn);
        wrapper.appendChild(tabContainer);
        wrapper.appendChild(scrollRightBtn);

        const userSection = sectionParent.querySelector(".users-section.top");
        if (userSection) {
            sectionParent.insertBefore(wrapper, userSection);
        }

        const updateScrollButtonsVisibility = () => {
            const isScrollable = tabContainer.scrollWidth > tabContainer.clientWidth;
            if (!isScrollable) {
                scrollLeftBtn.classList.remove("visible");
                scrollRightBtn.classList.remove("visible");
                return;
            }
            scrollLeftBtn.classList.toggle("visible", tabContainer.scrollLeft > 1);
            const isAtEnd = tabContainer.scrollWidth - tabContainer.clientWidth - tabContainer.scrollLeft < 1;
            scrollRightBtn.classList.toggle("visible", !isAtEnd);
        };

        const scrollAmount = 150;
        scrollLeftBtn.addEventListener("click", () => {
            tabContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        });
        scrollRightBtn.addEventListener("click", () => {
            tabContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });

        const debouncedUpdate = debounce(updateScrollButtonsVisibility, 50);
        tabContainer.addEventListener("scroll", debouncedUpdate);
        new ResizeObserver(updateScrollButtonsVisibility).observe(tabContainer);
        setTimeout(updateScrollButtonsVisibility, 100);
    };

    // ----------------------------------------------------------------
    // 채널 고유 키 생성: Map 및 가상 리스트에서 배열 인덱스 대신 사용
    // ----------------------------------------------------------------
    const getChannelKey = (cd) => {
        const { channel, type, args } = cd;
        switch (type) {
            case "soop_live":
                return `live_${channel.broad_no}`;
            case "soop_feed":
                return `feed_${channel.user_id}_${args[0]?.reg_timestamp ?? 0}`;
            case "soop_offline":
                return `off_${channel.user_id}`;
            case "soop_vod":
                return `vod_${channel.title_no}`;
            case "chzzk":
                return `chz_${channel.channel?.channelId}`;
            default:
                return `unk_${String(channel.user_id ?? Math.random()).slice(0, 20)}`;
        }
    };

    // element 기반 비교 함수 (가상 리스트 아이템용)
    const compareWatchersByEl = (a, b) => compareWatchers(a.element, b.element);

    // {key, element} 배열을 sortFollowSection 로직으로 정렬
    const sortFollowSectionItems = (items) => {
        const elToKey = new Map(items.map(({ key, element }) => [element, key]));
        const sortedEls = sortFollowSection(items.map((i) => i.element));
        return sortedEls.map((el) => ({ key: elToKey.get(el), element: el }));
    };

    // 기존 채널 엘리먼트의 시청자 수만 갱신 (재생성 없이 Map 기반 업데이트)
    const updateChannelElement = (element, cd) => {
        const { channel, type } = cd;
        let newViewerCount;
        switch (type) {
            case "soop_live":
                newViewerCount = channel.total_view_cnt;
                break;
            case "chzzk": {
                const liveInfo = channel.liveInfo;
                newViewerCount = liveInfo ? liveInfo.concurrentUserCount : channel.concurrentUserCount;
                break;
            }
            default:
                return; // feed/offline/vod은 시청자 수 갱신 불필요
        }
        if (newViewerCount == null) return;
        element.setAttribute("data-watchers", newViewerCount);
        const watchersEl = element.querySelector(".watchers");
        if (watchersEl) {
            const dotEl = watchersEl.querySelector(".dot");
            watchersEl.textContent = addNumberSeparator(newViewerCount);
            if (dotEl) watchersEl.prepend(dotEl);
        }
    };

    // ----------------------------------------------------------------
    // 채널 목록 렌더러 (Map diff 기반, 가상화 없음)
    // ----------------------------------------------------------------
    class SidebarVirtualList {
        constructor({ container, allItems, displayLimit, onAfterRender }) {
            this.container = container;
            this.allItems = allItems; // [{key, element}, ...] 정렬된 전체 목록
            this.displayLimit = displayLimit;
            this.onAfterRender = onAfterRender || null;
            this._render();
        }

        _visibleItems() {
            return this.allItems.slice(0, this.displayLimit);
        }

        _render() {
            const items = this._visibleItems();

            // 기존 DOM 비우기
            while (this.container.firstChild) {
                this.container.removeChild(this.container.firstChild);
            }

            // 전체 아이템 순서대로 추가
            for (const item of items) {
                this.container.appendChild(item.element);
            }

            if (this.onAfterRender) this.onAfterRender();
        }

        updateItems(newAllItems, newDisplayLimit) {
            this.allItems = newAllItems;
            if (newDisplayLimit !== undefined) this.displayLimit = newDisplayLimit;
            this._render();
        }

        setDisplayLimit(newLimit) {
            this.displayLimit = newLimit;
            this._render();
        }

        destroy() {
            // scroll listener 없음
        }
    }

    /**
     * 범용 사이드바 섹션 생성 및 채우기 함수
     * Map 기반 채널 추적 + 가상 리스트로 뷰포트 내 아이템만 렌더링
     */
    const createAndPopulateSection = async (config, update = false) => {
        const { id, containerSelector, fetchData, createElement, displayCount, showMoreButtonId } = config;

        const sectionContainer = document.querySelector(containerSelector);
        if (!sectionContainer) {
            const sidebar = document.getElementById("sidebar");
            if (!sidebar || update) return;

            const { title, href, iconHtml } = config;
            const sectionHtml = `
            <div class="top-section ${id}" style="display: none">
                <span class="max"><a href="${href}">${title}</a></span>
                <span class="min"><a href="${href}">${iconHtml}</a></span>
            </div>
            <div class="users-section ${id}"></div>
        `;
            sidebar.insertAdjacentHTML("beforeend", sectionHtml);
        }

        const container = document.querySelector(containerSelector);
        if (!container) return;

        const topSection = document.querySelector(`.top-section.${id}`);
        let sectionParentNode = topSection?.parentNode;

        if (!sectionParentNode) {
            const sidebar = document.getElementById("sidebar");
            if (!sidebar || update) return;

            const { title, href, iconHtml } = config;
            const sectionHtml = `
            <div class="section-wrapper ${id}">
                <div class="top-section ${id}" style="display: none">
                    <span class="max"><a href="${href}">${title}</a></span>
                    <span class="min"><a href="${href}">${iconHtml}</a></span>
                </div>
                <div class="users-section ${id}"></div>
            </div>`;
            sidebar.insertAdjacentHTML("beforeend", sectionHtml);
            sectionParentNode = sidebar.querySelector(`.section-wrapper.${id}`);
        }

        if (id === "follow" && !update) {
            await createFavoriteGroupTabs(sectionParentNode);
        }
        if (id === "top" && !update) {
            await createCategoryTabs(sectionParentNode);
        }

        const sidebar = document.getElementById("sidebar");
        const afterRenderCb = isThumbnailTooltipEnabled ? () => makeThumbnailTooltip() : null;

        // --- 최초 로딩 ---
        if (!update) {
            try {
                const channels = await fetchData();
                if (!channels || channels.length === 0) {
                    container.innerHTML = "";
                    return;
                }
                if (topSection) topSection.style.display = "";

                // 채널 Map 구성: key → {cd, element}
                const channelMap = new Map();
                channels.forEach((cd) => {
                    const key = getChannelKey(cd);
                    const element = createElement(cd.channel, cd.type, ...cd.args);
                    if (element) channelMap.set(key, { cd, element });
                });
                sectionChannelMaps.set(id, channelMap);

                // 정렬된 아이템 배열 구성
                let allItems = [...channelMap.entries()].map(([key, { element }]) => ({ key, element }));
                if (id === "follow") allItems = sortFollowSectionItems(allItems);
                else if (id === "myplus" && !myplusOrder) allItems.sort(compareWatchersByEl);
                else if (id === "top" || id === "myplusvod") allItems.sort(compareWatchersByEl);

                container.innerHTML = "";

                const vl = new SidebarVirtualList({
                    container,
                    sidebar,
                    allItems,
                    displayLimit: displayCount,
                    onAfterRender: afterRenderCb,
                });
                sectionVirtualLists.set(id, vl);

                if (allItems.length > displayCount) {
                    const hiddenCount = allItems.length - displayCount;
                    createShowMoreButton(container, showMoreButtonId, hiddenCount, displayCount, id);
                }
            } catch (error) {
                customLog.error(`[${id}] 섹션 로딩 실패:`, error);
                container.innerHTML = `<div class="error-indicator">오류: ${error.message}</div>`;
            }
        }
        // --- 업데이트: Map 기반 diff —변경된 채널만 처리 ---
        else {
            const existingMap = sectionChannelMaps.get(id) || new Map();
            const existingVl = sectionVirtualLists.get(id);
            const currentLimit = existingVl ? existingVl.displayLimit : displayCount;

            try {
                const newChannelsData = await fetchData();

                if (!newChannelsData || newChannelsData.length === 0) {
                    sectionChannelMaps.set(id, new Map());
                    if (existingVl) existingVl.updateItems([], displayCount);
                    const existingBtn = document.getElementById(showMoreButtonId);
                    if (existingBtn) existingBtn.remove();
                    return;
                }

                if (topSection) topSection.style.display = "";

                // diff: 기존 엘리먼트 재사용, 신규만 생성, 없어진 것은 자동 제거
                const newMap = new Map();
                newChannelsData.forEach((cd) => {
                    const key = getChannelKey(cd);
                    if (existingMap.has(key)) {
                        const existing = existingMap.get(key);
                        updateChannelElement(existing.element, cd);
                        newMap.set(key, { cd, element: existing.element });
                    } else {
                        const element = createElement(cd.channel, cd.type, ...cd.args);
                        if (element) newMap.set(key, { cd, element });
                    }
                });
                sectionChannelMaps.set(id, newMap);

                // 정렬된 아이템 배열 재구성
                let allItems = [...newMap.entries()].map(([key, { element }]) => ({ key, element }));
                if (id === "follow") allItems = sortFollowSectionItems(allItems);
                else if (id === "myplus" && !myplusOrder) allItems.sort(compareWatchersByEl);
                else if (id === "top" || id === "myplusvod") allItems.sort(compareWatchersByEl);

                const newDisplayLimit = Math.max(currentLimit, displayCount);

                if (existingVl) {
                    existingVl.onAfterRender = afterRenderCb;
                    existingVl.updateItems(allItems, newDisplayLimit);
                } else {
                    container.innerHTML = "";
                    const vl = new SidebarVirtualList({
                        container,
                        sidebar,
                        allItems,
                        displayLimit: newDisplayLimit,
                        onAfterRender: afterRenderCb,
                    });
                    sectionVirtualLists.set(id, vl);
                }

                // 더 보기 버튼 갱신
                const existingBtn = document.getElementById(showMoreButtonId);
                if (existingBtn) existingBtn.remove();
                if (allItems.length > displayCount) {
                    const hiddenCount = allItems.length - newDisplayLimit;
                    createShowMoreButton(container, showMoreButtonId, hiddenCount, displayCount, id);
                }
            } catch (error) {
                customLog.error(`[${id}] 섹션 업데이트 실패:`, error);
            }
        }
    };

    /**
     * 즐겨찾기 섹션의 복합적인 정렬 로직을 처리하는 함수
     * @param {Array<HTMLElement>} elements - 정렬할 유저 요소 배열
     * @returns {Array<HTMLElement>} 복합 정렬된 유저 요소 배열
     */
    const sortFollowSection = (elements) => {
        const categories = {
            pinnedOnline: [],
            pinnedOffline: [],
            notifiedOnline: [],
            blocked: [],
            normalOnline: [],
            other: [],
        };

        elements.forEach((user) => {
            const isPin = user.getAttribute("is_pin") === "Y";
            const hasBroadThumbnail = user.hasAttribute("broad_thumbnail");
            const isMobilePush = user.getAttribute("is_mobile_push") === "Y";
            const isOffline = user.hasAttribute("is_offline");
            const broad_cate_no = user.getAttribute("broad_cate_no");
            const isBlocked =
                isBlockedCategorySortingEnabled && blockedCategories.some((b) => b.categoryId === broad_cate_no);

            if (isPin && hasBroadThumbnail) categories.pinnedOnline.push(user);
            else if (isPin) categories.pinnedOffline.push(user);
            else if (isMobilePush && !isOffline) categories.notifiedOnline.push(user);
            else if (isBlocked) categories.blocked.push(user);
            else if (!isMobilePush && !isOffline) categories.normalOnline.push(user);
            else categories.other.push(user);
        });

        // 각 카테고리 내부 정렬
        const sortOrder = isRandomSortEnabled ? stableRandomOrder : compareWatchers;
        Object.keys(categories).forEach((key) => {
            categories[key].sort(key === "other" ? compareWatchers : sortOrder);
        });

        return [
            ...categories.pinnedOnline,
            ...categories.pinnedOffline,
            ...categories.notifiedOnline,
            ...categories.normalOnline,
            ...categories.blocked,
            ...categories.other,
        ];
    };

    /**
     * 즐겨찾기 섹션의 데이터를 가져옵니다.
     * @returns {Promise<Array>} 채널 정보 배열
     */
    const fetchDataForFollowSection = async () => {
        // [수정] 선택된 그룹에 따라 API URL을 동적으로 변경
        const soopApiUrl =
            selectedFavoriteGroupIdx === "all"
                ? "https://myapi.sooplive.com/api/favorite"
                : `https://myapi.sooplive.com/api/favorite/${selectedFavoriteGroupIdx}`;

        const [soopData, chzzkData, feedData] = await Promise.all([
            fetchBroadList(soopApiUrl, 50), // 수정된 URL 사용
            isChzzkFollowChannelsEnabled
                ? fetchBroadList("https://api.chzzk.naver.com/service/v1/channels/followings/live", 50)
                : Promise.resolve(null),
            isChannelFeedEnabled ? getStationFeed() : Promise.resolve([]),
        ]);

        if (selectedFavoriteGroupIdx === "all" && soopData?.data) {
            extractFollowUserIds(soopData);
        }

        const feedUserIdSet = new Set(feedData.map((item) => item.station_user_id));
        let combinedList = [];

        // 숲(SOOP) 채널 처리
        if (soopData?.data) {
            soopData.data.forEach((item) => {
                const { is_live, user_id, broad_info } = item;
                const is_mobile_push = isPinnedStreamWithNotificationEnabled === 1 ? item.is_mobile_push : "N";
                const is_pin = isPinnedStreamWithPinEnabled === 1 ? item.is_pin : false;

                if (is_live) {
                    broad_info.forEach((channel) =>
                        combinedList.push({ channel, args: [is_mobile_push, is_pin], type: "soop_live" }),
                    );
                } else if (feedUserIdSet.has(user_id)) {
                    feedData
                        .filter((feed) => feed.station_user_id === user_id && !checkIfTimeover(feed.reg_timestamp))
                        .forEach((feedItem) =>
                            combinedList.push({ channel: item, args: [feedItem], type: "soop_feed" }),
                        );
                } else if (is_pin && !isPinnedOnlineOnlyEnabled) {
                    combinedList.push({ channel: item, args: [null], type: "soop_offline" });
                }
            });
        }

        // 치지직(CHZZK) 채널 처리
        if (selectedFavoriteGroupIdx === "all" && chzzkData?.code === 200) {
            chzzkData.content.followingList.forEach((item) => {
                const is_mobile_push =
                    isPinnedStreamWithNotificationEnabled === 1
                        ? item?.channel?.personalData?.following?.notification
                            ? "Y"
                            : "N"
                        : "N";
                combinedList.push({ channel: item, args: [is_mobile_push], type: "chzzk" });
            });
        }

        return combinedList;
    };

    /**
     * 인기 채널 섹션의 데이터를 가져옵니다.
     * @returns {Promise<Array>} 채널 정보 배열
     */
    const fetchDataForTopSection = async () => {
        const soopApiUrl =
            selectedPinnedCategoryIdx === "all"
                ? "https://live.sooplive.com/api/main_broad_list_api.php?selectType=action&orderType=view_cnt&pageNo=1&lang=ko_KR"
                : `https://live.sooplive.com/api/main_broad_list_api.php?selectType=cate&selectValue=${selectedPinnedCategoryIdx}&orderType=view_cnt&pageNo=1&lang=ko_KR`;

        const [hiddenBjList, soopData, chzzkData] = await Promise.all([
            getHiddenbjList(),
            fetchBroadList(soopApiUrl, 100),
            isChzzkTopChannelsEnabled
                ? fetchBroadList("https://api.chzzk.naver.com/service/v1/lives?size=50&sortType=POPULAR", 100)
                : Promise.resolve(null),
        ]);

        HIDDEN_BJ_LIST.length = 0;
        HIDDEN_BJ_LIST.push(...hiddenBjList);

        let combinedList = [];

        if (soopData?.broad) {
            soopData.broad.forEach((channel) => {
                const isBlocked =
                    HIDDEN_BJ_LIST.includes(channel.user_id) ||
                    isCategoryBlocked(channel.broad_cate_no) ||
                    isUserBlocked(channel.user_id);
                if (!isBlocked) {
                    combinedList.push({ channel, args: [0, 0], type: "soop_live" });
                }
            });
        }

        if (selectedPinnedCategoryIdx === "all" && chzzkData?.content?.data) {
            chzzkData.content.data.forEach((channel) => {
                const isBlocked = false;
                if (!isBlocked) {
                    combinedList.push({ channel, args: [0], type: "chzzk" });
                }
            });
        }

        return combinedList;
    };

    /**
     * 추천 채널 및 VOD 섹션의 데이터를 가져옵니다.
     * @returns {Promise<object>} live와 vod를 포함하는 객체
     */
    const fetchDataForMyplusSection = async () => {
        const response = await fetchBroadList(
            "https://live.sooplive.com/api/myplus/preferbjLiveVodController.php?nInitCnt=6&szRelationType=C",
            100,
        );

        if (!response || typeof response !== "object" || response.RESULT === -1 || !response.DATA) {
            return { live: [], vod: [] };
        }

        await (isDuplicateRemovalEnabled && displayFollow ? waitForNonEmptyArray() : Promise.resolve());

        const { live_list = [], vod_list = [] } = response.DATA;

        const filterBlocked = (channel, isVod = false) => {
            const title = isVod ? channel.title : channel.broad_title;
            const category = isVod ? channel.category : channel.broad_cate_no;

            if (isUserBlocked(channel.user_id) || isCategoryBlocked(category)) {
                return false;
            }

            if (isDuplicateRemovalEnabled && !isVod && allFollowUserIds.includes(channel.user_id)) {
                return false;
            }

            return true;
        };

        return {
            live: live_list
                .filter((channel) => filterBlocked(channel, false))
                .map((channel) => ({ channel, args: [0, 0], type: "soop_live" })),
            vod: vod_list
                .filter((channel) => filterBlocked(channel, true))
                .map((channel) => ({ channel, args: [], type: "soop_vod" })),
        };
    };

    /**
     * 범용 createElement 함수
     * 채널 데이터의 타입에 따라 적절한 생성 함수를 호출합니다.
     * @param {object} channel - 채널 데이터
     * @param {string} type - 채널 데이터의 소스 타입
     * @param  {...any} args - 각 생성 함수에 필요한 추가 인자들
     * @returns {HTMLElement | null} 생성된 DOM 요소
     */
    const createUniversalElement = (channel, type, ...args) => {
        switch (type) {
            case "soop_live":
                return createUserElement(channel, ...args);
            case "soop_feed":
            case "soop_offline":
                return createUserElementOffline(channel, ...args);
            case "soop_vod":
                return createUserElementVod(channel, ...args);
            case "chzzk":
                return createUserElementChzzk(channel, ...args);
            default:
                customLog.warn("알 수 없는 채널 타입:", type, channel);
                return null;
        }
    };

    /**
     * 개선된 사이드바 초기화 함수 (기존 generateBroadcastElements 대체)
     * @param {boolean} [update=false] - 업데이트 여부
     */
    const initializeSidebar = async (update = false) => {
        customLog.log(`방송 목록 갱신 시작: ${new Date().toLocaleString()}`);

        const myplusIcon = IS_DARK_MODE
            ? `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABkUlEQVR4nO2Wu0oDQRSGExQsBO/BC2Kl4CNY+ABW4hMIFpZi4RuI4gtYCRYm3eE/m4th5uiKKQWDoiAiIqKlqIjaCBYjQyaYFIYsJruI+eHAzuwM/zdnDjMTi7X0l0XkdwNyBOgnQG+lUqorNPN0utADyDGzmIpIhmKez+d7mXWxZKpvmWXGfgPy2nRzIukD5MQZ3hD5Y0QyXmrrh6aae57fzyynbuXXzGrUGBNn1tsOYKdp5rlcbgDQZ26vrzKZ/RHbzyxLDugd2J9oijmRSjDLuVvlJVF+qPwP0Lu23/NksWGGXF3ZlXGRzR4MlscVCoV2QN5qjLeZeQZknYjafg1ApBLV49RUbfPvAGQ1MEDsh3YQeZ6adgCPkQAw62FXOy9RAcy6WjiMCmDNAWxEBCC+q4G50AGMMXG793Zu+eAKFQCQSZf++0ATuUEAzDLv0k+RAACy6QBWIgFg92awh1HoAEqpDkA+AP2ZTO51hgpgjInb29EVYDGQuVW9F0ydsRALKm6M8R2glwObt9TSv9MXwO1y9weCI98AAAAASUVORK5CYII=" style="width:24px">`
            : `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABmElEQVR4nO2Wu0oDQRSGNyhYCN6DF8RKwUewENKmyWXO2VMkuznHGLQLFr6BKL6AlWChpa2lYCsYFAUREREtRUXURrBQVk+ICpEsJruI+WFgZ3aG/5t/Z2fGspr6yyKa7UTkXUS5BeBVx3E6AjNPpaQLkfcQ5bVSeCMQ82w22w0gJc8UQC6Mkbg+PzTcnKjQg8j7OutzotwIkTuq9euGmqfTuV4AOdC4z4xxhi3LigDwmiaw3jDzTCbTh8iHH0Z8mkxOD3ntxkhRzZ8ApsYaYk6UjwLIkcZ8QiQD5XcAsqXtM3UzxC8ru1IA5DiRKPSX+8VisVZEfqzWX9O6A5AlImr5NQBRPvq5nzEy8ZP5N5AF3wBWlbofEeUmNb2bUACMcQb1r7kPCYCTOn4nFABEXtQElkMCkG1dA+kwACLet/fGljeuQAEAZFxnf+VrINYJwLaZdQ/YDAUAgFc0gfmQAOT9zuBtRoEDxOPFNkR+RpQX13XbgwaIeKejxl/yZe6p1gOmlmLbnLf8CutizpcAPOfbvKmm/p3eAMYsiMeMK5ANAAAAAElFTkSuQmCC" style="width:24px">`;
        const followIcon = IS_DARK_MODE
            ? `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD1ElEQVR4nO2YXYhVVRTHd6NZ1tAH9CA9CAYJZb4oCdVDUhS9GFQPvSgWPViQiklmRJzCh3orIgijGFAo2Gf9z5mud85aZ6Y69SSSEBrlFGTli0+hqGkf0sSac+/Mvnvy3nvu5wjnBxcunLP+e6191tp77W1MSUlJSckgqFartwLyLJGMAzIN8AWALwF8EpBPgOQJa+2SVjr6ThTxk0T8aW47q3GhphkT8TNxnN3SM8ettcuJ+FWAzwIy0/zHJ6KI77uSVhjK/fpOKx0iPkMke8fGsuu7cn58fPJ2gL9p7XjD4P9owDMzM9fUdYIgGCGS1/RZQa0j6kPHzhPxKU/0GMA7rE3uPnAgvVFnSP8TyW5AfvUGf6+uRSTvNz6TX4B0VxRN3qUaqhWGvIaIdxLJcU/nVOEgNG3cmSeSPwHepjPZzEad9lLqDYDf9Cbh3WapEQTBSBTx8/mY81+iUDrlOT/vfBQlDxawfblJSrzUrk4Y8kYviD0FVhu3YHmbKQggH/2P8x8W1SGSF9zCbmt10qXSzflmaXMlKpXKDUT8nfMVj2uKFdWx1i5xayIM061tBMCxM/s7TIdE0cTq2tp+gmjyzk51iHinMxFow0B+rBvoCmOGTBjyGicjplsaAHx+PoBs1AwZa7NRJyPOtzSobeuzBgcPJjeZIWPt1M0FA9C8nSuaRwfiZRMAecxZiX4wrdDlrlDR9BnKm8e6Px+0NAjD5GEn4n+jSDaYIRHH6Xr1YT4jeGNLI23C8p5nLogvOtkLuiUIghGAv3T8+LZtYyB9yGu+dpsBQ15LUrgeARlzqv/vQaYSwOsA+csZ/+PCItriatW7LbC11RWmz1hbXZG323Oz/722Jh2JxfHEWkAuOnl4tJ+bm7XZqI7hOH8RSO/pSpRIngLksiM6kWXZUtNjsixbqtrOOJf17NwTcW2pvdb4UJIk1/VE3Bizf//Ra3XP8Vrw7aaXALLPW5nGrbXLutW11i5zN6vab5/pBwuDYO7m5sDmzn/mab5j+kl+zm0496adHFY0BYn40ECdrwPw694nnyqy1Om7gHw+FOfrAPKKVxNftdN+6zsAf+19xbfMMNBDt9ts6RpeqVRua3ZhQCSHvZl/2wwTInmxMQg9wC/csfMd1j3oz9psN4uBMEw2N14b8kmiqTvqz62dWgnwT+4mRZQ8ZxYTRPK0Nn1OEL/pzYS16SqAf/buTreYxQjAj7u3aYCcrv3qQV0iSjeZxUyYXwmeW3gzJ38A8oi5GgCSewH+3Zn5s0TpA+ZqIo7T9Vq4+UUZrxu2PyUlJSWmL/wH5eEJ5sFzGH4AAAAASUVORK5CYII=" style="width:20px">`
            : `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADyUlEQVR4nO1YTWhdVRA+/TH+Ba3gorgQFBS0ulEsqItXFCWLmuZ8k0GSvDtzo/C0YFu0+IfIU7rQnSKCIIo7XYmRIiL+oCsRBbFimwr+ddOVWKy2aovK5OYl552Q9+59P7kp3A8O5OWe+c7MnJk5c45zFSpUqFBhLTA9PX3Z5KTMAjoHyDygfwByGtAfAX3Te/HMvKkbj80hSgHIW5nsAodxzRPJO4Cmu3bploEpzswXAvIkICeI9L/OQ44wJ7euxkWU3mZzcvD8BugTqnpBX8qPj993BaBfdl+wbZwxg51zG1o8zWZzI6BP2bciXIB+YTr0rDyRHIsIvyHSvcyz19fr9YvNQ/Y3oPuJ5OfIiy+1uAB5Ofr2E5E8PDGRXGccxkUk2wDZB8ihaO6xwkZkYRN6Xv6anJQHzJOdZEzpyIvPEMmz0f9e7BQazWZzI5E+aGuGO1EonCwEQuWZk1p+WX109ZBIHsnLQ6Q7IiMey11twoQ1z+dddHlxeW2l8vJqUR5AdoeJnas6WakMY75T2KyGnTsbFxHpt4HyhyzEivIw86b2nEi0q5DV4sBze12PmJhIrl2s7UeA9JpeeQDZFzji7a4CRHq0JWAVxpUMItkWGDDfVQDQk8sG8KgrGcw8GoT0ya4Cdqy3BGZmZi5xJYO5cWlBAyxulzL/blcyvNexICcPdxWwclcoaYYMQOcCfV7pKkCkdwYW/8ss211JYNabTYdAnx155DYs9jytMPq4l7OgXzSzluKTwPtf5xb2Pr0jauL2uzUGVrQkBfORSN4IrP9nLUPJ+/QmQP8O1n+9MEnW4urhsAVm1q1uyGDWrVm7vaT8d9aa9EiW3gjoqSCUvhrm4cbMo7ZGsN4p7+s39EUKKAF6NtiJ92q12mY3YNRqtc3GHSh/1u7OAyG3ljpK6oNjY3vOHwi5c67RaJxnZ064hve6xw0SRHogMmKOmUf65WXmkfCwWhwH3DAQG0Ek7/fzcsDMI0T6bsT5ghsmsntu20580MtlxUIQ0INrqnwLRPp0tOUfFil1NheQj0pRvgUieTzaiU/ztN82h0g/i5R/zpWBxUv3UrNlNXxqauryTg8GRPJ5ZPjzrkwA8lC7EXaBX3liZyfs8kXfZPygS2WvIJJ6+GyYPdrOXt36zpxcSSTfh4cUoPe79QQgudeavkDJX+xlgrl+FZH8EHj+DKCJW4/wXsbbX9PkuI3g92kgvcetZ1D2JPh7/DJHJH96n97lzgV4n94CyK+B508Aers7l8AL99mFxD1qF5Sy9alQoUIFNxT8D3rbJQHjF4hlAAAAAElFTkSuQmCC" style="width:20px">`;
        const topIcon = IS_DARK_MODE
            ? `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAExUlEQVR4nO1ZaYgcVRB+HlkVjyheibckxgNRQZSomB8RFC8MElGiP0T9LSgiASELgkpERRGPxeBqghhfV3XPrpN+1bsx8yMRVOKJENR4H9FVo+sRjbKulDPtfN07Mz1s98xOYD94sDtd7+v63lGv6rUxs5hFb8L35Xxm97k2/dvsSSCKlhDJOLNMVpv7zfPCS8yeAM+LLmWWXXXnq41Iftdnppfhee5idbTutPtaG4ogii4yvQhmOZtIdsKo77A2PINo5BQi+RJEjAdBdK7pJRCVTyRy38HIf2GtLIyf699JEe5ba0dPML0AaysHMcu74NwPRHLaVDtZyCxjYPf22rXRgWYm0d/fvzeR+LjGmcPFzew9Ty7EDU4krBxmpkAkq2BE/2EOb2ijz4pUdFplZgLM4XnM7i+I9Q+031dWg/C/fd9dYLqJUql0MJFsB+c3WWv3abe/2jJLBWZhu+4l0y0QuWfB+Z+nE1GYw+NSYXeN6QZ8X65KreEV0+VilhuTXOEVppMYHKzsz+w+hvX7Yl5OZrceZvOjMAz3M50CkdwDI7/T2vDIvJzM0VG6DIF3pekEgqByaHLNutuL4maO7gDeH60dnWuKBpH0w0s+GRjYOqcobmttH7N81rGzQddlMtcJb812yp2qa5rZbfP9DYuy7JndbclcyfYVJsDzwpuSWWZr8kqlsi+RvAF93sqaMWttnzpe75N9qrcNIjcC03tvtr2snFrQuLvb6Hcf2IeFOK8bill2x8S+Hy7IOqCY3a9pAfqbtS8f26qv729YBAP1p574uQUwR8uB9L1se3kJ7D/QBiLWt9H//fpguWsLEFBPvJjlwda20VKwndAkTUvIaqYa/x4tbc3hHppOgthKwEZ4+fJmdpOTk3vhxtV8CZx6Dje02jbjIZLrQUCUWwBmnRoam9npdOM1CrObDwLmJ4t9WdacZ+R0TC1yC9CTsb4mRw9vZkfk3oFRXj2VRx4GAW824xkeHj4Cy9PcArTgiAk1vje2iZaA87sa5UjWlucly8nG1ysDA1vnYLGTW0B1OcRLqHGOghklkTzTggv2gnuhkU25XD4MuMZzC0hWXtGZ6edaSWnMjm1a3flowQ8C/mh0K+F54Vlg82FuAcxuGKb05vRz33fXYNzP4sNzgSi6eqoAuQX4SgUIkLuA0G/g0NOw/u/PFuAegRF+sgHfEAzYnbkF6PEeH0S6VNLpALPbAg5dmc0XXQ4DshmfBYEcH6ct+k683csFvEFIjxrm8Rj7mwsIF4CAT1vMZqUQ56tOhoshHZjAEIgbuJ0ip1pX1xM2kwzFE/Gzwr8naAEPL/5Gs87a7z/Fvw8NbTw6i6d2HvxfV5v60tkBMxmYolEqjRzDLF/hMR8E7iRm9ypkj9dl8aRynS3WRidjqK7ebJfnmU4gCKJzMNcnku91I4JDr7W6rNUbuWTCJ5uVA/7/Rc8B00kQucv0RbDZ0u3RRtlmLVt9rFk/+s/5Ln2Cqn55wUJlSvn4ijqjFZW26nczt6m5aLdNs9CuOF8XMTqXSJ7AcnMabTeze3zduvCQrjqfFKKb0D2P4TSr1WqDQQ0CplegN3e165c1tY06VpsdbWNE7nUieUpPa2vtATPt7yxmYar4F3KMj24yKDCnAAAAAElFTkSuQmCC" style="width:22px">`
            : `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEzklEQVR4nO1ZaYgcVRB+URMVb7zibTDGA1FBFA90QSHGY3emq/qhO9Nd1TuR+aegiAhCFgSViIoiHmCI+kOMP4zHD0Ex8UciqOCJENR4H4nX6iYao5JVKjOdru6Znp5s98xOYD940DOvXr2q96req6pnzCxmMZiwli4A4K+lybfZkwBAlwHwJCL/Jw2A/0DkK8yeAERaDMDbQuGjRn9KnxlkIAaXNgTdJfT3jRYpAcCXmEGE44ydA8ATkdnQJmvHzgQITkXkb5U5TVrL55lBAkDtJET+Ua30N9Z6C8N++dZKINJma/0TzSDAWnsgAH+o7P0XAD69lc5bCEA/qR163/O8A8xMYnx8fC9EXq1t3HH4wjR6xOBi7eAA9LzwMDMFAF6mVn7Kdfn67DFBRZ9OALzMzAQcJzgfgP5Rq39Pt2MRablS4l9r/YtMPzEyUjsIkTcqIdZaa/fudrzQAtAbavxG8SXTLwDwSmXHv0/nRHGc6vH62EWkFaYfQPSvjdtwUJkuL9flaoLX1aaXYOb9EOlztfrP5uWJyKuUQ3+2ZMmN+5peAYDvUJNNWDt2ZF6ejuMdJWao+N5ueoFSiQ+N2yzfVBRvRLpZ7eqv1tYPMUUDgMbVKn1Rr9fnFsXbWjsPkb7q2d0gdqljHQBemi1U7TSxaUTaUC77i7LoXZduiMdKdl5hCiCSF48yOzMfGhraB5HeUQq/l7VjtrELm8Mx3dzqu6PAa0qBO7PoxRGTCQ0A39bFuLsU/SuFCC8OBcB/h4zLZTqliwtqaxsFtlpLx3UaWy77i5QZbZcbP7cCjkOuWv2PsugB+Dkl+CfNFv5e1cX4jyP6AHIrEA+86N5OtI4TXK6U3SFBmqSQEqmG/wtNxnz3TSdATAUAvR5NTm4H0jkJx10Z8eCntEMLbfp8/nWK9tXcCuioU47GdLoAdBnFcarHhH3yrZN9AC6n8SmX/TN0aJFbAbkZIwf2D09XgD5QW7+8tZ/vV/3vpvEZHR09QqenuRWQhCNkKOd7WiFLrdq2djGStTw/nk62L6/U6/W5OtnJrUCzqtY0ofYxSiKifKIDr12+gEjPtKOpVCqHKV6ThfqA43hnJfslk5IzO1IyveYjCb86pf5qV5VApLOVkp8WoAC9rFYkaO33S/rcz+YX3QsAwXBrf1BT871YhAK3KgFXJ/sB+HHVf3cWPwB+QNE/2jofvxQp4N+SW4Hm9d68iGh7MhxApPWRifE1WfwQ6Sq1wut0X6kUnKDClild3cuFRAUhtmo6jtdnfxokllI2/mXabsqcpig0nW8qDBH0EagduJskp5FXRwGbib0p0A61UMW+J0gCr5j/IFFnU4Hfwv+Hh5cencVH7gNlQhOR6dAmpdgLpmiMjNSOBeDv9DVfKvHJAPRm+J/rBjaLj451EGm9td6CeJFMKts83/QC1vK5OtYH4J/FEdXvtzoVa6Uilwj41gkPJfwWuQdMLwHgX9mYKJ6wqPZgSrQ5B4AeSh9HW/r2BCUvL4lEJSnMGhFGMqpGHZUWS/20A/0GiUL7Inwi1XxEp5u726Ax9uFqtXpwX4WPK+ItAOCn9XGa3Xa+WD4ph4AZFEjlrlF+oRXiqPKcJCvcaDu/3wagx+S2ttbuP9PyzmIWpoH/AeaUFWmyMuZqAAAAAElFTkSuQmCC" style="width:22px">`;

        // myplus 데이터를 먼저 가져와서 live와 vod로 분리
        const myplusData =
            displayMyplus > 0 || displayMyplusvod > 0 ? await fetchDataForMyplusSection() : { live: [], vod: [] };

        // 각 섹션에 대한 설정을 객체 배열로 정의
        allSections = [
            {
                id: "follow",
                title: "즐겨찾기 채널",
                href: "https://www.sooplive.com/my/favorite",
                iconHtml: followIcon,
                containerSelector: ".users-section.follow",
                fetchData: fetchDataForFollowSection,
                createElement: createUniversalElement,
                showMoreButtonId: "toggleButton2",
                displayCount: displayFollow,
                enabled: displayFollow > 0,
            },
            {
                id: "myplus",
                title: "추천 채널",
                href: "#",
                iconHtml: myplusIcon,
                containerSelector: ".users-section.myplus",
                fetchData: async () => myplusData.live,
                createElement: createUniversalElement,
                showMoreButtonId: "toggleButton",
                displayCount: displayMyplus,
                enabled: displayMyplus > 0,
            },
            {
                id: "top",
                title: "인기 채널",
                href: "https://www.sooplive.com/live/all",
                iconHtml: topIcon,
                containerSelector: ".users-section.top",
                fetchData: fetchDataForTopSection,
                createElement: createUniversalElement,
                showMoreButtonId: "toggleButton3",
                displayCount: displayTop,
                enabled: displayTop > 0,
            },
            {
                id: "myplusvod",
                title: "추천 VOD",
                href: "#",
                iconHtml: myplusIcon,
                containerSelector: ".users-section.myplusvod",
                fetchData: async () => myplusData.vod,
                createElement: createUniversalElement,
                showMoreButtonId: "toggleButton4",
                displayCount: displayMyplusvod,
                enabled: displayMyplusvod > 0,
            },
        ];

        // 저장된 순서(sidebarSectionOrder)에 따라 섹션 배열을 재정렬
        const sectionMap = new Map(allSections.map((s) => [s.id, s]));
        const sections = sidebarSectionOrder.map((id) => sectionMap.get(id)).filter(Boolean);

        // 활성화된 섹션만 병렬로 처리
        const activeSections = sections.filter((s) => s.enabled);
        await Promise.all(activeSections.map((config) => createAndPopulateSection(config, update)));

        customLog.log(`방송 목록 갱신 완료: ${new Date().toLocaleString()}`);
    };

    /**
     * 기존 generateBroadcastElements 함수는 이 새로운 함수를 호출하도록 변경합니다.
     */
    const generateBroadcastElements = async (update) => {
        // 갱신 시에는, 기존에 표시되던 섹션만 다시 로드합니다.
        if (update) {
            await initializeSidebar(true);
            return;
        }

        // 첫 로딩 시, 모든 활성화된 섹션을 렌더링합니다.
        await initializeSidebar(false);
    };

    const makeTopNavbarAndSidebar = (page) => {
        // .left_navbar를 찾거나 생성
        let leftNavbar = document.body.querySelector(".left_navbar");
        if (!leftNavbar) {
            leftNavbar = document.createElement("div");
            leftNavbar.className = "left_navbar";

            (async () => {
                const serviceHeaderDiv = await waitForElementAsync("#serviceHeader");
                serviceHeaderDiv.prepend(leftNavbar);
            })();
        }

        // 버튼을 미리 만들어 DocumentFragment에 추가
        const buttonFragment = document.createDocumentFragment();

        BUTTON_DATA.reverse().forEach((data) => {
            const newButton = document.createElement("a");
            newButton.innerHTML = `<button type="button" class="left_nav_button">${data.text}</button>`;

            const isTargetUrl = CURRENT_URL.startsWith("https://www.sooplive.com");

            // 이벤트 리스너 함수 정의
            const triggerClick = (event) => {
                event.preventDefault();
                const targetElement =
                    isTargetUrl && data.onClickTarget ? document.querySelector(data.onClickTarget) : null;
                if (targetElement) {
                    targetElement.click(); // 타겟 요소 클릭
                } else {
                    customLog.warn("타겟 요소를 찾을 수 없음:", data.onClickTarget);
                }
            };

            // MutationObserver 설정: 타겟 요소가 로드될 때까지 기다림
            if (isTargetUrl && data.onClickTarget) {
                const observer = new MutationObserver((mutations, observer) => {
                    const targetElement = document.querySelector(data.onClickTarget);
                    if (targetElement) {
                        observer.disconnect(); // 요소가 확인되면 Observer 중지
                        newButton.addEventListener("click", triggerClick);
                    }
                });
                observer.observe(document.body, { childList: true, subtree: true });
            } else {
                // 기본 링크 설정
                newButton.href = data.href;
                newButton.target = isOpenNewtabEnabled ? "_blank" : "_self";
            }

            buttonFragment.appendChild(newButton);
        });

        leftNavbar.appendChild(buttonFragment); // 한 번에 추가

        const tooltipContainer = document.createElement("div");
        tooltipContainer.classList.add("tooltip-container");

        const sidebarClass = isSidebarMinimized ? "min" : "max";

        if (page === "main") {
            const newHtml = `
            <div id="sidebar" class="max"></div>
            `;
            const serviceLnbElement = document.getElementById("soop-gnb");
            if (serviceLnbElement) {
                serviceLnbElement.insertAdjacentHTML("afterend", newHtml);
            }
            document.body.appendChild(tooltipContainer);
        }

        if (page === "player") {
            const sidebarHtml = `
            <div id="sidebar" class="${sidebarClass}"></div>
            `;
            document.body.insertAdjacentHTML("beforeend", sidebarHtml);
            document.body.appendChild(tooltipContainer);
        }
    };

    /**
     * 유저 UI 요소를 생성하는 함수 (addEventListener 방식으로 개선)
     * @param {object} channel - 채널 데이터 객체
     * @param {string} is_mobile_push - 알림 설정 여부 ('Y'/'N')
     * @param {boolean} is_pin - 상단 고정 여부
     * @returns {HTMLElement} 생성된 a 태그 요소
     */
    const createUserElement = (channel, is_mobile_push, is_pin) => {
        const {
            user_id,
            broad_no,
            total_view_cnt,
            broad_title,
            user_nick,
            broad_start,
            broad_cate_no,
            category_name,
            subscription_only,
        } = channel;

        const isSubOnly = Number(subscription_only || 0) > 0;
        const playerLink = `https://play.sooplive.com/${user_id}/${broad_no}`;

        const userElement = document.createElement("a");
        userElement.className = "user";
        if (isSmallUserLayoutEnabled) userElement.classList.add("small-user-layout");

        userElement.href = playerLink;
        if (isOpenNewtabEnabled) {
            userElement.target = "_blank";
        } else {
            userElement.target = "_self";
        }

        // (개선) 인라인 'onclick' 대신 addEventListener 사용
        if (isSendLoadBroadEnabled && !isOpenNewtabEnabled) {
            userElement.addEventListener("click", (event) => {
                if (event.ctrlKey || !window.location.href.includes("play.sooplive.com")) return;

                event.preventDefault();
                event.stopPropagation();

                const loadingElement = document.body.querySelector("div.loading");
                if (loadingElement && getComputedStyle(loadingElement).display === "none" && unsafeWindow.liveView) {
                    (async () => {
                        document.querySelector("#play.stop")?.click();
                        await new Promise((resolve) => setTimeout(resolve, 250));
                        unsafeWindow.liveView.playerController.sendLoadBroad(user_id, broad_no);
                        await new Promise((resolve) => setTimeout(resolve, 200));
                        if (!!document.querySelector("._Modal_UI_Wrap.dimed")) {
                            location.href = playerLink;
                        }
                    })();
                } else {
                    location.href = playerLink;
                }
            });
        }

        userElement.setAttribute("data-watchers", total_view_cnt);
        userElement.setAttribute("broad_thumbnail", `https://liveimg.sooplive.com/m/${broad_no}`);
        userElement.setAttribute("tooltip", broad_title);
        userElement.setAttribute("user_id", user_id);
        userElement.setAttribute("broad_start", broad_start);
        userElement.setAttribute("broad_cate_no", broad_cate_no);
        userElement.setAttribute("is_mobile_push", is_mobile_push || "N");
        userElement.setAttribute("is_pin", is_pin ? "Y" : "N");

        // --- 자식 요소 생성 ---
        const profilePicture = document.createElement("img");
        profilePicture.className = "profile-picture";
        profilePicture.src = `https://stimg.sooplive.com/LOGO/${user_id.slice(0, 2)}/${user_id}/m/${user_id}.webp`;
        profilePicture.loading = "lazy";
        profilePicture.onerror = function () {
            this.onerror = null;
            this.src = `https://profile.img.sooplive.com/LOGO/${user_id.slice(0, 2)}/${user_id}/m/${user_id}.jpg`;
        };

        // (개선) 프로필 사진 클릭 이벤트 핸들러
        profilePicture.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();

            const isSidebarMinimized = document.getElementById("sidebar")?.offsetWidth === 52;
            const targetUrl = isSidebarMinimized ? playerLink : `https://ch.sooplive.com/${user_id}`;

            if (isOpenNewtabEnabled || !isSidebarMinimized) {
                window.open(targetUrl, "_blank");
            } else {
                if (event.ctrlKey) {
                    window.open(playerLink, "_blank");
                    return;
                }
                if (isSendLoadBroadEnabled && unsafeWindow.liveView) {
                    unsafeWindow.liveView.playerController.sendLoadBroad(user_id, broad_no);
                } else {
                    location.href = playerLink;
                }
            }
        });

        // 나머지 UI 요소 생성 (innerHTML을 사용하여 간결하게 처리)
        const usernameText = is_pin || is_mobile_push === "Y" ? `🖈${user_nick}` : user_nick;
        const usernameTitle = is_pin
            ? "고정됨(상단 고정 켜짐)"
            : is_mobile_push === "Y"
              ? "고정됨(알림 받기 켜짐)"
              : "";
        const descriptionText = category_name || getCategoryName(broad_cate_no);
        const dotSymbol = isSubOnly ? "★" : "●";
        const dotTitle = isSubOnly ? "구독+ 전용" : "";

        userElement.innerHTML = `
        <span class="username" title="${usernameTitle}">${usernameText}</span>
        <span class="description" title="${descriptionText}">${descriptionText}</span>
        <span class="watchers">
            <span class="dot" role="img" title="${dotTitle}">${dotSymbol}</span>${addNumberSeparator(total_view_cnt)}
        </span>
    `;
        userElement.prepend(profilePicture); // 조립된 요소 앞에 프로필 사진 추가

        return userElement;
    };
    const createUserElementChzzk = (channel, is_mobile_push) => {
        const {
            liveTitle,
            liveImageUrl,
            concurrentUserCount,
            openDate,
            liveCategoryValue: liveCategoryValue,
            channel: channelInfo,
            liveInfo: liveInfo,
        } = channel;
        const userId = channelInfo.channelId;
        const playerLink = `https://chzzk.naver.com/live/${userId}`;
        const channelPage = `https://chzzk.naver.com/${userId}`;
        const emptyImage =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVQIHWNgAAAAAgABz8g15QAAAABJRU5ErkJggg==";
        const broadThumbnail = liveImageUrl ? liveImageUrl.split("{type}").join("360") : emptyImage;
        const category = liveInfo ? liveInfo?.liveCategoryValue : liveCategoryValue;
        const viewerNumber = liveInfo ? liveInfo?.concurrentUserCount : concurrentUserCount;
        const titleText = liveInfo ? liveInfo?.liveTitle : liveTitle;

        const userElement = document.createElement("a");
        userElement.className = "user";
        if (isSmallUserLayoutEnabled) userElement.classList.add("small-user-layout");
        userElement.href = playerLink;
        userElement.target = "_self";

        userElement.setAttribute("data-watchers", viewerNumber);
        userElement.setAttribute("broad_thumbnail", broadThumbnail);
        userElement.setAttribute("tooltip", titleText);
        userElement.setAttribute("user_id", userId);
        userElement.setAttribute("broad_start", openDate ?? "NotAvailable");
        userElement.setAttribute("is_mobile_push", is_mobile_push === "Y" ? "Y" : "N");
        userElement.setAttribute("is_pin", "N");
        userElement.setAttribute("broad_cate_no", category);

        const profilePicture = document.createElement("img");
        profilePicture.className = "profile-picture";
        profilePicture.src = channelInfo?.channelImageUrl;
        profilePicture.loading = "lazy";

        profilePicture.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            const isSidebarMinimized = document.getElementById("sidebar")?.offsetWidth === 52;
            const targetUrl = isSidebarMinimized ? playerLink : channelPage;
            window.open(targetUrl, "_self");
        });

        const usernameText = is_mobile_push === "Y" ? `🖈${channelInfo.channelName}` : channelInfo.channelName;
        const usernameTitle = is_mobile_push === "Y" ? "고정됨(알림 받기 켜짐)" : "";

        userElement.innerHTML = `
        <span class="username" title="${usernameTitle}">${usernameText}</span>
        <span class="description" title="${category}">${category}</span>
        <span class="watchers">
            <span class="dot greendot" role="img">●</span>${addNumberSeparator(viewerNumber)}
        </span>
    `;
        userElement.prepend(profilePicture);

        return userElement;
    };
    const createUserElementVod = (channel) => {
        const { user_id, title_no, view_cnt, title, user_nick, vod_duration, reg_date, thumbnail } = channel;
        const playerLink = `https://vod.sooplive.com/player/${title_no}`;
        const channelPage = `https://ch.sooplive.com/${user_id}`;

        const userElement = document.createElement("a");
        userElement.className = "user";
        if (isSmallUserLayoutEnabled) userElement.classList.add("small-user-layout");
        userElement.href = playerLink;
        if (isOpenNewtabEnabled) userElement.target = "_blank";

        userElement.setAttribute("data-watchers", view_cnt);
        userElement.setAttribute("broad_thumbnail", thumbnail.replace("http://", "https://"));
        userElement.setAttribute("tooltip", title);
        userElement.setAttribute("user_id", user_id);
        userElement.setAttribute("vod_duration", vod_duration);

        const profilePicture = document.createElement("img");
        profilePicture.className = "profile-picture profile-grayscale";
        profilePicture.src = `https://stimg.sooplive.com/LOGO/${user_id.slice(0, 2)}/${user_id}/m/${user_id}.webp`;
        profilePicture.loading = "lazy";
        profilePicture.onerror = function () {
            this.onerror = null;
            this.src = `https://profile.img.sooplive.com/LOGO/${user_id.slice(0, 2)}/${user_id}/m/${user_id}.jpg`;
        };

        profilePicture.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            const isSidebarMinimized = document.getElementById("sidebar")?.offsetWidth === 52;
            const targetUrl = isSidebarMinimized ? playerLink : channelPage;
            if (isOpenNewtabEnabled || !isSidebarMinimized) {
                window.open(targetUrl, "_blank");
            } else {
                location.href = playerLink;
            }
        });

        userElement.innerHTML = `
        <span class="username" title="${user_nick}">${user_nick}</span>
        <span class="description" title="${vod_duration}">${vod_duration}</span>
        <span class="watchers">${timeSince(reg_date)}</span>
    `;
        userElement.prepend(profilePicture);

        return userElement;
    };
    const createUserElementOffline = (channel, isFeeditem) => {
        const { user_id, user_nick, is_mobile_push, is_pin } = channel;
        const playerLink = isFeeditem ? isFeeditem.url : `https://ch.sooplive.com/${user_id}`;

        const userElement = document.createElement("a");
        userElement.className = "user user-offline";
        if (isSmallUserLayoutEnabled) userElement.classList.add("small-user-layout");
        userElement.href = playerLink;
        userElement.target = "_blank";

        userElement.setAttribute("user_id", user_id);
        userElement.setAttribute("is_offline", "Y");
        userElement.setAttribute("is_mobile_push", is_mobile_push || "N");
        userElement.setAttribute("is_pin", is_pin ? "Y" : "N");
        userElement.setAttribute("data-watchers", isFeeditem ? isFeeditem.reg_timestamp : channel.total_view_cnt || 0);

        if (isFeeditem) {
            userElement.classList.add("user-feed");
            userElement.setAttribute("data-like-cnt", String(isFeeditem.like_cnt ?? isFeeditem.recommend_cnt ?? 0));
            userElement.setAttribute("data-read-cnt", String(isFeeditem.read_cnt ?? isFeeditem.view_cnt ?? 0));
            userElement.setAttribute("data-comment-cnt", String(isFeeditem.comment_cnt ?? 0));
            userElement.setAttribute("data-content", isFeeditem.content ?? "");
        }

        if (isFeeditem && isFeeditem.photo_cnt > 0) {
            // 피드에 사진이 있는 경우: 툴팁을 위한 속성 설정
            userElement.setAttribute("broad_thumbnail", `https:${isFeeditem.photos[0].url}`);
            userElement.setAttribute("tooltip", isFeeditem.title_name);
        } else if (isFeeditem) {
            // 피드는 있지만 사진이 없는 경우
            userElement.setAttribute("tooltip", isFeeditem.title_name);
            // 썸네일이 없으므로 툴팁 리스너를 비활성화합니다.
            userElement.setAttribute("data-tooltip-listener", "false");
        } else {
            // 오프라인이고 피드 아이템도 없는 경우
            // 툴팁 리스너를 비활성화합니다.
            userElement.setAttribute("data-tooltip-listener", "false");
        }

        const profilePicture = document.createElement("img");
        profilePicture.className = "profile-picture profile-grayscale";
        profilePicture.src = `https://stimg.sooplive.com/LOGO/${user_id.slice(0, 2)}/${user_id}/m/${user_id}.webp`;
        profilePicture.loading = "lazy";
        profilePicture.onerror = function () {
            this.onerror = null;
            this.src = `https://profile.img.sooplive.com/LOGO/${user_id.slice(0, 2)}/${user_id}/m/${user_id}.jpg`;
        };

        profilePicture.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            const isSidebarMinimized = document.getElementById("sidebar")?.offsetWidth === 52;
            const targetUrl = isSidebarMinimized ? playerLink : `https://ch.sooplive.com/${user_id}`;
            window.open(targetUrl, "_blank");
        });

        const usernameText = is_pin ? `🖈${user_nick}` : user_nick;
        const descriptionText = isFeeditem ? isFeeditem.title_name : "";
        const watchersHTML = isFeeditem
            ? isFeeditem.reg_date_human
            : '<span class="dot profile-grayscale" role="img">●</span>오프라인';

        userElement.innerHTML = `
        <span class="username" title="${usernameText}">${usernameText}</span>
        <span class="description" title="${descriptionText}">${descriptionText}</span>
        <span class="watchers">${watchersHTML}</span>
    `;
        userElement.prepend(profilePicture);

        return userElement;
    };

    const insertFoldButton = () => {
        const foldButton = `
        <div class="button-fold-sidebar" role="button"></div>
        <div class="button-unfold-sidebar" role="button"></div>
        `;

        const webplayer_scroll =
            document.getElementById("webplayer_scroll") || document.getElementById("list-container");
        const serviceLnbElement = document.getElementById("sidebar");

        if (serviceLnbElement) {
            serviceLnbElement.insertAdjacentHTML("beforeend", foldButton);

            // 클릭 이벤트 리스너를 정의
            const toggleSidebar = () => {
                isSidebarMinimized = !isSidebarMinimized;

                // max 클래스가 있으면 제거하고 min 클래스 추가
                if (serviceLnbElement.classList.toggle("max")) {
                    serviceLnbElement.classList.remove("min");
                    webplayer_scroll.style.left = "240px";
                } else {
                    serviceLnbElement.classList.remove("max");
                    serviceLnbElement.classList.add("min");
                    webplayer_scroll.style.left = "52px";
                }

                // isSidebarMinimized 값을 저장
                GM_setValue("isSidebarMinimized", isSidebarMinimized ? 1 : 0);
            };

            // 버튼에 클릭 이벤트 리스너 추가
            const buttons = serviceLnbElement.querySelectorAll(".button-fold-sidebar, .button-unfold-sidebar");
            for (const button of buttons) {
                button.addEventListener("click", toggleSidebar);
            }
        }
    };

    const extractFollowUserIds = (response) => {
        allFollowUserIds = response.data.map((item) => item.user_id); // 모든 user_id를 추출하여 전역 배열에 저장
        GM_setValue("allFollowUserIds", allFollowUserIds);
    };

    const makeThumbnailTooltip = () => {
        try {
            const sidebar = document.getElementById("sidebar");
            // 1. NodeList를 처음에 한 번만 배열로 변환하여 재사용
            const elements = sidebar.querySelectorAll("a.user");
            const elementsArray = Array.from(elements); // 개선점 1 적용

            let tooltipContainer = document.querySelector(".tooltip-container");
            if (!tooltipContainer) {
                tooltipContainer = document.createElement("div");
                tooltipContainer.className = "tooltip-container";
                document.body.appendChild(tooltipContainer);
            }
            const hoverTimeouts = new Map();

            elements.forEach((element) => {
                const isOffline = element.getAttribute("data-tooltip-listener") === "false";
                if (isOffline) return;

                const hasEventListener = element.getAttribute("data-tooltip-listener") === "true";
                if (!hasEventListener) {
                    element.addEventListener("mouseenter", (e) => {
                        const uniqueId = `tooltip-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
                        element.setAttribute("data-hover-tooltip-id", uniqueId);

                        const timeoutId = setTimeout(() => {
                            if (
                                element.matches(":hover") &&
                                element.getAttribute("data-hover-tooltip-id") === uniqueId
                            ) {
                                showTooltip(element, uniqueId);
                            }
                        }, 48);
                        hoverTimeouts.set(element, timeoutId);
                    });

                    element.addEventListener("mouseleave", (e) => {
                        element.removeAttribute("data-hover-tooltip-id");

                        const timeoutId = hoverTimeouts.get(element);
                        if (timeoutId) {
                            clearTimeout(timeoutId);
                            hoverTimeouts.delete(element);
                        }

                        const to = e.relatedTarget;
                        const isGoingToAnotherElement = elementsArray.some((el) => {
                            const isOffline = el.getAttribute("data-tooltip-listener") === "false";
                            return el !== element && el.contains(to) && !isOffline;
                        });
                        if (!isGoingToAnotherElement) {
                            tooltipContainer.classList.remove("visible");
                            tooltipContainer.removeAttribute("data-tooltip-id");
                            tooltipContainer.innerHTML = ""; // 초기화
                        }
                    });

                    // 'window' 이벤트 리스너는 루프 안에서 제거

                    element.setAttribute("data-tooltip-listener", "true");
                }
            });

            // 2. 'window' 이벤트 리스너는 루프 밖에서 한 번만 등록
            if (!window.hasMyTooltipMouseOutListener) {
                // 중복 등록을 막기 위한 플래그
                window.addEventListener("mouseout", (e) => {
                    if (!e.relatedTarget && !e.toElement) {
                        tooltipContainer.classList.remove("visible");
                        tooltipContainer.innerHTML = "";
                    }
                });
                window.hasMyTooltipMouseOutListener = true; // 플래그 설정
            }

            async function showTooltip(element, uniqueId) {
                // hover 중인지 다시 검사
                if (element.getAttribute("data-hover-tooltip-id") !== uniqueId) return;

                tooltipContainer.setAttribute("data-tooltip-id", uniqueId);

                const topBarHeight = document.getElementById("serviceHeader")?.offsetHeight ?? 0;
                const isScreenMode = document.body.classList.contains("screen_mode");
                const elementRect = element.getBoundingClientRect();
                const offsetX = elementRect.left + sidebar.offsetWidth;

                let imgSrc = element.getAttribute("broad_thumbnail");
                const broadTitle = element.getAttribute("tooltip");
                let broadStart = element.getAttribute("broad_start");
                const vodDuration = element.getAttribute("vod_duration");
                const randomTimeCode = Date.now();
                const userId = element.getAttribute("user_id");
                const isFeed = element.classList.contains("user-feed");
                const username = element.querySelector("span.username")?.textContent?.trim() ?? "";
                const description = element.querySelector("span.description")?.textContent?.trim() ?? "";

                if (broadStart === "NotAvailable") {
                    try {
                        const getThumbnailJson = await fetchBroadList(
                            `https://api.chzzk.naver.com/service/v1/channels/${userId}/data?fields=topExposedVideos`,
                            100,
                        );
                        if (getThumbnailJson?.code === 200) {
                            const topExposedVideos = getThumbnailJson.content?.topExposedVideos;
                            if (topExposedVideos?.openLive?.liveImageUrl) {
                                const newThumbnail = topExposedVideos.openLive.liveImageUrl.split("{type}").join("360");
                                const newBroadStart = topExposedVideos.openLive.openDate;

                                if (
                                    tooltipContainer.getAttribute("data-tooltip-id") === uniqueId &&
                                    element.getAttribute("data-hover-tooltip-id") === uniqueId
                                ) {
                                    element.setAttribute("broad_thumbnail", newThumbnail);
                                    element.setAttribute("broad_start", newBroadStart);
                                    imgSrc = newThumbnail;
                                    broadStart = newBroadStart;
                                }
                            }
                        }
                    } catch (error) {
                        customLog.error("Error in fetching thumbnail:", error);
                    }
                }

                if (element.getAttribute("data-hover-tooltip-id") !== uniqueId) return;

                // 방송 시간 && 이미지 && !게시판이미지
                if (broadStart && imgSrc?.startsWith("http") && !imgSrc?.startsWith("https://stimg.")) {
                    imgSrc += `?${Math.floor(randomTimeCode / 10000)}`;
                }

                const durationText = broadStart ? getElapsedTime(broadStart, "HH:MM") : vodDuration;
                const displayTime = durationText || "";
                const viewText = element.getAttribute("data-watchers") || "";

                let headerHtml = `
                    <div class="tooltip-header">
                        <strong class="tooltip-username">${username}</strong>
                        ${isFeed && displayTime ? `<span class="tooltip-time">· ${displayTime}</span>` : ""}
                        ${!isFeed && description && description !== broadTitle ? `<span class="tooltip-description">${description}</span>` : ""}
                    </div>
                    <div class="tooltip-title">${broadTitle || ""}</div>
                `;

                if (isFeed) {
                    tooltipContainer.classList.add("feed-mode");
                    const feedContent = element.getAttribute("data-content");
                    if (feedContent) {
                        headerHtml += `<div class="tooltip-feed-content">${feedContent}</div>`;
                    }
                } else {
                    tooltipContainer.classList.remove("feed-mode");
                }

                const viewsHtml = !isFeed && viewText ? `<div class="views">${viewText}</div>` : "";
                const durationHtml = !isFeed && displayTime ? `<div class="duration-overlay">${displayTime}</div>` : "";

                let feedStatsHtml = "";
                if (isFeed) {
                    const likeCnt = element.getAttribute("data-like-cnt") || 0;
                    const readCnt = element.getAttribute("data-read-cnt") || 0;
                    const commentCnt = element.getAttribute("data-comment-cnt") || 0;
                    feedStatsHtml = `
                        <div class="feed-stats-tooltip">
                            <span class="stat"><i class="icon-feed-like"></i> ${likeCnt}</span>
                            <span class="stat"><i class="icon-feed-view"></i> ${readCnt}</span>
                            <span class="stat"><i class="icon-feed-comment"></i> ${commentCnt}</span>
                        </div>
                    `;
                }

                tooltipContainer.innerHTML = `
                    ${
                        imgSrc
                            ? `
                    <div class="thumbs-box">
                        <img src="${imgSrc}">
                        <div class="thumb-overlay-bottom">
                            ${viewsHtml}
                            ${durationHtml}
                        </div>
                    </div>`
                            : ""
                    }
                    <div class="tooltiptext">
                        ${headerHtml}
                        ${feedStatsHtml}
                    </div>
                `;

                tooltipContainer.style.left = `${offsetX}px`;
                tooltipContainer.classList.add("visible");

                const tooltipHeight = tooltipContainer.offsetHeight || 220;
                const viewportHeight = window.innerHeight;
                let top = elementRect.top + elementRect.height / 2 - tooltipHeight / 2;

                if (top + tooltipHeight > viewportHeight) {
                    top = viewportHeight - tooltipHeight - 10;
                }
                top = Math.max(top, isScreenMode ? 0 : topBarHeight);
                tooltipContainer.style.top = `${top}px`;
            }
        } catch (error) {
            customLog.error("makeThumbnailTooltip 함수에서 오류가 발생했습니다:", error);
        }
    };
    /**
     * 사이드바 순서 조정 UI를 생성하고 드래그 앤 드롭 이벤트를 설정하는 함수
     */
    const populateOrderUI = () => {
        const orderListContainer = document.getElementById("sidebar-order-list");
        if (!orderListContainer) return;

        orderListContainer.innerHTML = ""; // 기존 목록 초기화

        const allSectionsInfo = {
            follow: { name: "⭐ 즐겨찾기" },
            top: { name: "🔥 인기" },
            myplus: { name: "👍 추천 LIVE" },
            myplusvod: { name: "🎞️ 추천 VOD" },
        };

        // 현재 저장된 순서대로 UI 아이템 생성
        sidebarSectionOrder.forEach((sectionId) => {
            const sectionInfo = allSectionsInfo[sectionId];
            if (sectionInfo) {
                const item = document.createElement("div");
                item.className = "draggable-item_v8xK4z";
                item.draggable = true;
                item.dataset.sectionId = sectionId;
                item.textContent = sectionInfo.name;
                orderListContainer.appendChild(item);
            }
        });

        // 드래그 앤 드롭 이벤트 리스너 추가
        const draggables = orderListContainer.querySelectorAll(".draggable-item_v8xK4z");
        draggables.forEach((draggable) => {
            draggable.addEventListener("dragstart", () => {
                draggable.classList.add("dragging_v8xK4z");
            });

            draggable.addEventListener("dragend", () => {
                draggable.classList.remove("dragging_v8xK4z");
            });
        });

        orderListContainer.addEventListener("dragover", (e) => {
            e.preventDefault();
            // 마우스의 X좌표(e.clientX)를 기준으로 위치 계산
            const afterElement = getDragAfterElement(orderListContainer, e.clientX);
            const dragging = document.querySelector(".dragging_v8xK4z");
            if (afterElement == null) {
                orderListContainer.appendChild(dragging);
            } else {
                orderListContainer.insertBefore(dragging, afterElement);
            }
        });

        orderListContainer.addEventListener("drop", (e) => {
            e.preventDefault();
            const newOrder = [...orderListContainer.querySelectorAll(".draggable-item_v8xK4z")].map(
                (item) => item.dataset.sectionId,
            );
            sidebarSectionOrder = newOrder;
            GM_setValue("sidebarSectionOrder", newOrder);
            customLog.log("New sidebar order saved:", newOrder);
        });

        // 가로 정렬을 위해 X축 기준으로 다음 요소를 찾는 함수로 수정
        function getDragAfterElement(container, x) {
            const draggableElements = [...container.querySelectorAll(".draggable-item_v8xK4z:not(.dragging_v8xK4z)")];
            return draggableElements.reduce(
                (closest, child) => {
                    const box = child.getBoundingClientRect();
                    // Y축(top, height) 대신 X축(left, width) 기준으로 offset 계산
                    const offset = x - box.left - box.width / 2;
                    if (offset < 0 && offset > closest.offset) {
                        return { offset: offset, element: child };
                    } else {
                        return closest;
                    }
                },
                { offset: Number.NEGATIVE_INFINITY },
            ).element;
        }
    };

    /**
     * '더 보기' 버튼을 생성하고 관련 이벤트를 처리하는 함수 (모든 상태 처리)
     * @param {HTMLElement} container - 버튼이 추가될 부모 컨테이너 요소
     * @param {string} buttonId - 버튼에 할당할 고유 ID
     * @param {number} hiddenCount - 현재 숨겨진 항목의 수
     * @param {number} initialDisplayCount - 초기에 표시되는 항목의 수 (접기 시 기준)
     */
    const createShowMoreButton = (container, buttonId, hiddenCount, initialDisplayCount, sectionId) => {
        const existingButton = document.getElementById(buttonId);
        if (existingButton) existingButton.remove();

        const toggleButton = document.createElement("button");
        toggleButton.id = buttonId;
        toggleButton.title = "좌클릭: 더 보기/접기, 우클릭: 초기화";

        if (hiddenCount > 0) {
            toggleButton.textContent = `더 보기 (${hiddenCount})`;
        } else {
            toggleButton.textContent = "접기";
        }

        container.appendChild(toggleButton);

        const displayPerClick = 10;

        toggleButton.addEventListener("click", () => {
            const vl = sectionVirtualLists.get(sectionId);
            if (!vl) return;
            const total = vl.allItems.length;
            if (toggleButton.textContent === "접기") {
                vl.setDisplayLimit(initialDisplayCount);
                toggleButton.textContent = `더 보기 (${total - initialDisplayCount})`;
            } else {
                const newLimit = Math.min(vl.displayLimit + displayPerClick, total);
                vl.setDisplayLimit(newLimit);
                const remaining = total - newLimit;
                toggleButton.textContent = remaining > 0 ? `더 보기 (${remaining})` : "접기";
            }
        });

        toggleButton.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            const vl = sectionVirtualLists.get(sectionId);
            if (!vl) return;
            vl.setDisplayLimit(initialDisplayCount);
            toggleButton.textContent = `더 보기 (${vl.allItems.length - initialDisplayCount})`;
        });
    };

    const addModalSettings = (serviceUtilDiv) => {
        const openModalBtn = document.createElement("div");
        openModalBtn.setAttribute("id", "openModalBtn");
        const link = document.createElement("button");
        link.setAttribute("class", "btn-settings-ui");
        openModalBtn.appendChild(link);

        serviceUtilDiv.prepend(openModalBtn);

        // 모달 컨텐츠를 담고 있는 HTML 문자열
        const modalContentHTML = `
<div id="myModal" class="modal_v8xK4z">
    <div class="modal-content_v8xK4z">
        <nav class="modal-index_v8xK4z">
            <h3 class="index-title_v8xK4z">설정 메뉴</h3>
            <button class="index-button_v8xK4z active" data-target-id="broadcast-options-title">방송 목록</button>
            <button class="index-button_v8xK4z" data-target-id="sidebar-options-title">사이드바</button>
            <button class="index-button_v8xK4z" data-target-id="live-player-options-title">LIVE 플레이어</button>
            <button class="index-button_v8xK4z" data-target-id="vod-player-options-title">VOD 플레이어</button>
            <button class="index-button_v8xK4z" data-target-id="chat-options-title">채팅창</button>
            <button class="index-button_v8xK4z" data-target-id="etc-options-title">기타</button>
            <button class="index-button_v8xK4z" data-target-id="management-title">차단/부가설명</button>
            <div class="modal-version_v8xK4z">
                SOOP Sidebar UI<br>
                (${NEW_UPDATE_DATE})
            </div>
        </nav>

        <div class="modal-main-content_v8xK4z">
            <header class="modal-header_v8xK4z">
                <div class="modal-breadcrumb_v8xK4z">
                    <span class="breadcrumb-root_v8xK4z">SOOP UI</span>
                    <span class="breadcrumb-sep_v8xK4z">»</span>
                    <span class="breadcrumb-current_v8xK4z" id="modal-breadcrumb-current">방송 목록</span>
                </div>
                <div class="modal-search-container_v8xK4z">
                    <div class="search-input-wrapper_v8xK4z">
                        <span class="search-icon_v8xK4z">🔍</span>
                        <input type="text" id="modal-search-input_v8xK4z" placeholder="설정 검색..." autocomplete="off">
                        <button id="modal-search-clear_v8xK4z" title="검색 비우기" style="display:none;">&times;</button>
                    </div>
                </div>
                <button class="close-button_v8xK4z" aria-label="닫기">&times;</button>
            </header>

            <div class="modal-body_v8xK4z">
                <section>
                    <h3 id="broadcast-options-title" class="section-title_v8xK4z">방송 목록 옵션</h3>
                    <div class="option_v8xK4z multi-option_v8xK4z">
                    <div class="option_v8xK4z">
                        <label for="switchRemoveRedistributionTag">탐방허용 태그 ❌</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchRemoveRedistributionTag">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="switchRemoveWatchLaterButton">나중에 보기 버튼 ❌</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchRemoveWatchLaterButton">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="switchRemoveBroadStartTimeTag">방송 시작 시간 ❌</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchRemoveBroadStartTimeTag">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    </div>

                    <div class="option_v8xK4z">
                        <label for="switchReplaceEmptyThumbnail">🖱️마우스 오버시 🔞연령 제한 썸네일 보기</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchReplaceEmptyThumbnail">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="switchThumbnailTooltip">🖱️마우스 오버시 📷썸네일 미리보기 툴팁</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchThumbnailTooltip">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="switchRemoveCarousel">자동 재생되는 채널 전광판 ❌</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchRemoveCarousel">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="switchBroadTitleTextEllipsis">방송 제목이 긴 경우 ...으로 생략하기</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchBroadTitleTextEllipsis">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                </section>

                <div class="divider_v8xK4z"></div>

                <section>
                    <h3 id="sidebar-options-title" class="section-title_v8xK4z">사이드바 옵션</h3>
                    <div class="option_v8xK4z">
                        <label for="switchCustomSidebar">사이드바 사용 (해제시 기본 사이드바)</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchCustomSidebar">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>

                    <div class="option_v8xK4z range-option_v8xK4z customSidebarOptionsContainer">
                        <label for="favoriteChannelsDisplay">⌗ [즐겨찾기 채널] 표시 수</label>
                        <div class="range-container_v8xK4z">
                            <input type="range" id="favoriteChannelsDisplay" min="0" max="100" title="0 = 숨김">
                            <span id="favoriteChannelsDisplayValue" class="range-value_v8xK4z">${displayFollow}</span>
                        </div>
                    </div>
                    <div class="option_v8xK4z range-option_v8xK4z customSidebarOptionsContainer">
                        <label for="myPlusChannelsDisplay">⌗ [추천 채널] 표시 수</label>
                        <div class="range-container_v8xK4z">
                            <input type="range" id="myPlusChannelsDisplay" min="0" max="40" title="0 = 숨김">
                            <span id="myPlusChannelsDisplayValue" class="range-value_v8xK4z">${displayMyplus}</span>
                        </div>
                    </div>
                    <div class="option_v8xK4z range-option_v8xK4z customSidebarOptionsContainer">
                        <label for="myPlusVODDisplay">⌗ [추천 VOD] 표시 수</label>
                        <div class="range-container_v8xK4z">
                            <input type="range" id="myPlusVODDisplay" min="0" max="40" title="0 = 숨김">
                            <span id="myPlusVODDisplayValue" class="range-value_v8xK4z">${displayMyplusvod}</span>
                        </div>
                    </div>
                    <div class="option_v8xK4z range-option_v8xK4z customSidebarOptionsContainer">
                        <label for="popularChannelsDisplay">⌗ [인기 채널] 표시 수</label>
                        <div class="range-container_v8xK4z">
                            <input type="range" id="popularChannelsDisplay" min="0" max="40" title="0 = 숨김">
                            <span id="popularChannelsDisplayValue" class="range-value_v8xK4z">${displayTop}</span>
                        </div>
                    </div>

                    <h4 class="subsection-title_v8xK4z customSidebarOptionsContainer">섹션 순서 (드래그하여 순서 변경)</h4>
                    <div id="sidebar-order-list" class="order-list_v8xK4z customSidebarOptionsContainer"></div>
                    <div class="divider_v8xK4z customSidebarOptionsContainer" style="margin-top: 15px; margin-bottom: 15px;"></div>

                    <div class="option_v8xK4z customSidebarOptionsContainer">
                        <label for="switchSmallUserLayout">🥜미니 방송 목록</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchSmallUserLayout">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z customSidebarOptionsContainer">
                        <label for="sendLoadBroadCheck">⚡새로고침 없는 방송 전환 사용</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="sendLoadBroadCheck">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z customSidebarOptionsContainer">
                        <label for="switchFavoriteGroups">[⭐즐겨찾기] 📂그룹 탭 표시</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchFavoriteGroups">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z customSidebarOptionsContainer">
                        <label for="switchShortenFavoriteGroupName">[⭐즐겨찾기] 📂그룹 탭 이름을 한 글자로 축약</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchShortenFavoriteGroupName">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z customSidebarOptionsContainer">
                        <label for="switchRandomSort">[⭐즐겨찾기] 🔀랜덤 정렬 (해제시 시청자 많은 순)</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchRandomSort">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z customSidebarOptionsContainer">
                        <label for="switchChannelFeed">[⭐즐겨찾기] 💤오프라인 채널의 최신 글 보기</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchChannelFeed">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z customSidebarOptionsContainer">
                        <label for="switchBlockedCategorySorting">[⭐즐겨찾기] 🚫차단된 카테고리를 👇하단으로 이동</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchBlockedCategorySorting">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z customSidebarOptionsContainer">
                        <label for="fixNotificationChannel">[⭐즐겨찾기] 🔔알림 설정된 채널을 📌상단 고정</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="fixNotificationChannel">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z customSidebarOptionsContainer">
                        <label for="fixFixedChannel" title="MY 페이지에서 스트리머 고정 버튼(핀 모양)을 누르면 사이드바에 고정이 됩니다.">[⭐즐겨찾기] 스트리머 관리에서 📌고정된 채널을 📌상단 고정<sup>1)</sup></label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="fixFixedChannel">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z customSidebarOptionsContainer">
                        <label for="switchPinnedOnlineOnly">[⭐즐겨찾기] ☀️온라인일 때만 📌상단 고정하기</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchPinnedOnlineOnly">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z customSidebarOptionsContainer">
                        <label for="mpSortByViewers">[👍🏻추천채널] 정렬을 👍추천순으로 변경 (해제시 시청자순)</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="mpSortByViewers">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z customSidebarOptionsContainer">
                        <label for="removeDuplicates">[👍🏻추천채널] 즐겨찾기 🗐 중복 제거</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="removeDuplicates">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z customSidebarOptionsContainer">
                        <label for="switchCategoryGroups">[🔥인기채널] 📂카테고리 탭 표시</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchCategoryGroups">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z customSidebarOptionsContainer">
                        <label for="switchShortenCategoryName">[🔥인기채널] 📂카테고리 탭 이름을 한 글자로 축약</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchShortenCategoryName">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="openInNewTab">방송 목록 클릭 시 ⿻ 새 탭으로 열기</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="openInNewTab">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                </section>

                <div class="divider_v8xK4z"></div>

                <section>
                    <h3 id="live-player-options-title" class="section-title_v8xK4z">LIVE 플레이어 옵션</h3>
                    <div class="option_v8xK4z">
                        <label for="switchNoAutoVOD">방송 종료 후 🤖자동 VOD 재생 ❌</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchNoAutoVOD">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="switchAutoResumeVideo">🔄새로고침 / 방송 종료 후 영상 자동 재개</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchAutoResumeVideo">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z" id="redirectLiveOptionContainer">
                        <label for="switchRedirectLive">방송 종료 후 🤖자동 LIVE 이동 ✅<sup>3)</sup>

                        <div class="mapper-setting_v8xK4z">
                            <select id="redirectLiveSortOption">
                                <option value="custom">커스텀</option>
                                <option value="mostViewers">시청자 많은 순</option>
                                <option value="leastViewers">시청자 적은 순</option>
                                <option value="random">랜덤</option>
                            </select>
                        </div>

                        </label>

                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchRedirectLive">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="switchHideEsportsInfo">E-Sports 정보 ❌</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchHideEsportsInfo">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="showPauseButton">[플레이어] ⏸️일시정지 버튼</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="showPauseButton">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="switchCaptureButton">[플레이어] LIVE / VOD 📸스크린샷 버튼</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchCaptureButton">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="selectPreferredQuality">[플레이어] 방송 진입시 화질 고정</label>
                        <div class="mapper-setting_v8xK4z">
                            <select id="selectPreferredQuality">
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

                    <div class="option_v8xK4z multi-option_v8xK4z">
                    <div class="option_v8xK4z">
                        <label for="switchClickPlayerEventMapper">[플레이어] 🖱️클릭/우클릭 기능 매핑

                        <div class="mapper-setting_v8xK4z">
                            <label for="selectLeftClick">좌</label>
                            <select id="selectLeftClick">
                                <option value="none">없음</option>
                                <option value="toggleMute">음소거</option>
                                <option value="togglePause">일시정지</option>
                                <option value="toggleStop">정지</option>
                                <option value="toggleScreenMode"> 스크린모드</option>
                                <option value="toggleFullscreen">전체화면</option>
                            </select>
                        </div>
                        <div class="mapper-setting_v8xK4z">
                            <label for="selectRightClick">우</label>
                            <select id="selectRightClick">
                                <option value="none">없음</option>
                                <option value="toggleMute">음소거</option>
                                <option value="togglePause">일시정지</option>
                                <option value="toggleStop">정지</option>
                                <option value="toggleScreenMode">스크린 모드</option>
                                <option value="toggleFullscreen">전체화면</option>
                            </select>
                        </div>

                        </label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchClickPlayerEventMapper">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    </div>

                    <div class="option_v8xK4z">
                        <label for="showBufferTime">[채팅창] 방송 ⏳딜레이 (남은 버퍼 시간) 표시</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="showBufferTime">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="switchVideoSkipHandler">[⌨️단축키] 좌/우 방향키를 눌러 1초 전/후로 ⏭️이동</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchVideoSkipHandler">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="switchSharpmodeShortcut">[⌨️단축키] ✨'선명한 모드'(e) 활성화</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchSharpmodeShortcut">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="switchLLShortcut">[⌨️단축키] 🚀'시차 단축'(d) 활성화**</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchLLShortcut">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="switchAdjustDelayNoGrid">[⌨️단축키] (d)를 '앞당기기'로 변경<br>(위 옵션** 활성화 필수, 비 그리드 사용자만)</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchAdjustDelayNoGrid">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="switchQualityChangeShortcut">[⌨️단축키] 화질 변경(1️⃣숫자) 활성화</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchQualityChangeShortcut">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>

                    <div class="option_v8xK4z">
                        <label for="mutedInactiveTabs">[⿻ 브라우저 탭] 전환시 🔇음소거</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="mutedInactiveTabs">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="switchAutoChangeQuality">[⿻ 브라우저 탭] 전환시 화질 ⬇️낮추기</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchAutoChangeQuality">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>

                    <div class="option_v8xK4z">
                        <label for="switchDocumentTitleUpdate">[⿻ 브라우저 탭] 제목에 📊시청자 수 표시</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchDocumentTitleUpdate">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="switchShowSidebarOnScreenModeAlways">[🎬스크린 모드] 항상 사이드바 보기</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchShowSidebarOnScreenModeAlways">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="mouseOverSideBar">[🎬스크린 모드] 좌상단 🖱️마우스 오버시 사이드바 보기</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="mouseOverSideBar">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="chatPosition">[🎬스크린 모드] ↕️세로로 긴 화면에서 채팅창을 👇아래에 위치</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="chatPosition">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="switchAutoScreenMode">[🎬스크린 모드] 🤖자동 스크린 모드</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchAutoScreenMode">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                </section>

                <div class="divider_v8xK4z"></div>

                <section>
                    <h3 id="vod-player-options-title" class="section-title_v8xK4z">VOD 플레이어 옵션</h3>
                    <div class="option_v8xK4z">
                        <label for="selectBestQuality">✨최고화질 🤖자동 선택</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="selectBestQuality">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="switchRemoveShadowsFromCatch">CATCH 플레이어 하단의 그림자 효과 ❌</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchRemoveShadowsFromCatch">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="switchVODHighlight">VOD 💡하이라이트(별별랭킹) 타임라인 활성화</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchVODHighlight">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                </section>

                <div class="divider_v8xK4z"></div>

                <section>
                    <h3 id="chat-options-title" class="section-title_v8xK4z">채팅창 옵션</h3>
                    <div class="option_v8xK4z range-option_v8xK4z">
                        <label for="nicknameWidthDisplay">⌗ [닉네임] 가로 크기 (채팅 메시지 정렬시)</label>
                        <div class="range-container_v8xK4z">
                            <input type="range" id="nicknameWidthDisplay" min="86" max="186">
                            <span id="nicknameWidthDisplayValue" class="range-value_v8xK4z">${nicknameWidth}</span>
                        </div>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="switchAlignNicknameRight">[닉네임] ➡️오른쪽으로 붙이기 (채팅 메시지 정렬시)</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchAlignNicknameRight">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>

                    <div class="option_v8xK4z multi-option_v8xK4z">
                    <div class="option_v8xK4z">
                        <label for="selectHideSupporterBadge">서포터 배지 ❌</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="selectHideSupporterBadge">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="selectHideFanBadge">팬 배지 ❌</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="selectHideFanBadge">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="selectHideSubBadge">구독팬 배지 ❌</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="selectHideSubBadge">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="selectHideVIPBadge">열혈팬 배지 ❌</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="selectHideVIPBadge">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="selectHideMngrBadge">매니저 배지 ❌</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="selectHideMngrBadge">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="selectHideStreamerBadge">스트리머 배지 ❌</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="selectHideStreamerBadge">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    </div>

                    <div class="option_v8xK4z">
                        <label for="switchUnlockCopyPaste">[채팅 입력란] ✂️복사/붙여넣기 기능 복원</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchUnlockCopyPaste">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="switchHideButtonsAboveChatInput">[채팅 입력란] 버튼 탭 ❌</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchHideButtonsAboveChatInput">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>

                </section>

                <div class="divider_v8xK4z"></div>

                <section>
                    <h3 id="etc-options-title" class="section-title_v8xK4z">기타 옵션</h3>

                    <div class="option_v8xK4z multi-option_v8xK4z">
                    <div class="option_v8xK4z">
                        <label for="switchChzzkFollowChannels">치지직 ❤️팔로우 채널 🤝🏻통합<sup>4)</sup></label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchChzzkFollowChannels">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    <div class="option_v8xK4z">
                        <label for="switchChzzkTopChannels">치지직 🔥인기 채널 🤝🏻통합</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchChzzkTopChannels">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                    </div>

                    <div class="option_v8xK4z">
                        <label for="switchThemeLock">🎨 테마 쿠키 무기한 유지</label>
                        <label class="switch_v8xK4z">
                            <input type="checkbox" id="switchThemeLock">
                            <span class="slider_v8xK4z round"></span>
                        </label>
                    </div>
                </section>

                <footer class="modal-footer_v8xK4z">
                    <h3 id="management-title" class="section-title_v8xK4z">차단 관리 및 부가 설명</h3>
                    <p class="description_v8xK4z">⛔채널 차단: 본문 방송 목록 -> ⋮ 버튼 -> [이 브라우저에서 ... 숨기기]</p>
                    <p class="description_v8xK4z">✅카테고리 탭 추가: 본문 방송 목록 -> ⋮ 버튼 -> [이 카테고리를 탭에 추가]</p>
                    <p class="description_v8xK4z">✅카테고리 탭 해제: Tampermonkey 아이콘을 눌러서 가능합니다.</p>
                    <div class="divider_v8xK4z"></div>
                    <p class="description_v8xK4z">1) MY 페이지에서 스트리머 고정 버튼(📌)을 누르면 사이드바에 고정이 됩니다.</p>
                    <p class="description_v8xK4z">3) 즐겨찾기 채널 중에서만 이동. 커스텀은 고정->알림->일반 순. 열린 탭 체크 후 이동.</p>
                    <p class="description_v8xK4z">4) 치지직 로그인이 되어있지 않으면 응답지연이 생겨서 느려집니다</p>
                    <p class="description_v8xK4z">5) 'SOOP (숲) - 현재 방송을 보고 있는 스트리머' 실행 필요. 없을 시 0명으로 나옵니다</p>

                    <p class="description_v8xK4z bug-report_v8xK4z">🐛버그 신고는 <a href="https://greasyfork.org/ko/scripts/484713" target="_blank">Greasy Fork</a>에서 가능합니다.</p>
                </footer>
            </div>
        </div>
    </div>
</div>

`;

        // 3. 모달 기능 구현
        document.body.insertAdjacentHTML("beforeend", modalContentHTML);

        const modal = document.getElementById("myModal");

        if (modal) {
            let isFirstOpen = true;
            let currentActiveButton = modal.querySelector(".index-button_v8xK4z.active");

            const closeModal = () => {
                modal.style.display = "none";
                document.body.style.overflow = "";
            };

            const breadcrumbCurrent = modal.querySelector("#modal-breadcrumb-current");
            const setActiveIndexButton = (button) => {
                if (!button || button === currentActiveButton) return;
                currentActiveButton?.classList.remove("active");
                button.classList.add("active");
                currentActiveButton = button;
                if (breadcrumbCurrent) {
                    breadcrumbCurrent.textContent = button.textContent.trim();
                }
            };

            const searchInput = modal.querySelector("#modal-search-input_v8xK4z");
            const searchClearButton = modal.querySelector("#modal-search-clear_v8xK4z");

            openModalBtn.addEventListener("click", () => {
                modal.style.display = "block";
                document.body.style.overflow = "hidden";

                if (isFirstOpen) {
                    updateSettingsData();
                    isFirstOpen = false;
                }
                populateOrderUI(); // 모달이 열릴 때마다 순서 UI 갱신
                setActiveIndexButton(
                    modal.querySelector('.index-button_v8xK4z[data-target-id="broadcast-options-title"]'),
                );
            });

            const closeBtn = modal.querySelector(".close-button_v8xK4z");
            if (closeBtn) {
                closeBtn.addEventListener("click", closeModal);
            }

            modal.addEventListener("click", (event) => {
                if (event.target === modal) {
                    closeModal();
                }
            });

            window.addEventListener("keydown", (event) => {
                if (event.key === "Escape" && modal.style.display === "block") {
                    closeModal();
                }
            });

            // 인덱스 메뉴 및 스크롤 기능
            const indexButtons = modal.querySelectorAll(".index-button_v8xK4z");
            const optionsContainer = modal.querySelector(".modal-body_v8xK4z");
            const sectionTitles = modal.querySelectorAll(".section-title_v8xK4z");

            indexButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    const targetId = button.getAttribute("data-target-id");
                    const targetElement = document.getElementById(targetId);
                    if (targetElement && optionsContainer) {
                        setActiveIndexButton(button);
                        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                });
            });

            const handleSearch = (query) => {
                const normalizedQuery = query.toLowerCase().trim();
                optionsContainer.querySelector(".no-results_v8xK4z")?.remove();

                const sections = optionsContainer.querySelectorAll("section, footer");
                const dividers = optionsContainer.querySelectorAll(".divider_v8xK4z");

                if (!normalizedQuery) {
                    sections.forEach((section) => (section.style.display = ""));
                    dividers.forEach((divider) => (divider.style.display = ""));
                    optionsContainer
                        .querySelectorAll(
                            ".option_v8xK4z, .subsection-title_v8xK4z, .description_v8xK4z, .section-title_v8xK4z",
                        )
                        .forEach((element) => {
                            element.style.display = "";
                        });
                    return;
                }

                let visibleSectionCount = 0;
                sections.forEach((section) => {
                    const childCandidates = section.querySelectorAll(
                        ".option_v8xK4z, .subsection-title_v8xK4z, .description_v8xK4z",
                    );
                    let hasVisibleContent = false;

                    childCandidates.forEach((element) => {
                        const isVisible = element.textContent.toLowerCase().includes(normalizedQuery);
                        element.style.display = isVisible ? "" : "none";
                        if (isVisible) hasVisibleContent = true;
                    });

                    const title = section.querySelector(".section-title_v8xK4z");
                    const sectionMatch = title?.textContent.toLowerCase().includes(normalizedQuery);
                    if (title) title.style.display = sectionMatch || hasVisibleContent ? "" : "none";

                    section.style.display = sectionMatch || hasVisibleContent ? "" : "none";
                    if (section.style.display !== "none") visibleSectionCount++;
                });

                dividers.forEach((divider) => {
                    const previous = divider.previousElementSibling;
                    const next = divider.nextElementSibling;
                    divider.style.display =
                        previous && next && previous.style.display !== "none" && next.style.display !== "none"
                            ? ""
                            : "none";
                });

                if (visibleSectionCount === 0) {
                    const noResults = document.createElement("div");
                    noResults.className = "no-results_v8xK4z";
                    noResults.innerHTML = `
                        <div style="font-size:24px; margin-bottom:10px;">🔍</div>
                        <p>"${query}"에 대한 검색 결과가 없습니다.</p>
                    `;
                    optionsContainer.appendChild(noResults);
                }
            };

            if (searchInput && searchClearButton) {
                searchInput.addEventListener("input", () => {
                    const value = searchInput.value;
                    searchClearButton.style.display = value ? "block" : "none";
                    handleSearch(value);
                });

                searchClearButton.addEventListener("click", () => {
                    searchInput.value = "";
                    searchClearButton.style.display = "none";
                    handleSearch("");
                    searchInput.focus();
                });
            }

            const observer = new IntersectionObserver(
                (entries) => {
                    // 활성화 영역에 들어온(isIntersecting) 모든 항목을 필터링합니다.
                    const intersectingEntries = entries.filter((entry) => entry.isIntersecting);

                    // 활성화 영역에 항목이 하나 이상 있는 경우
                    if (intersectingEntries.length > 0) {
                        // 가장 마지막에 들어온 항목을 선택합니다 (일반적으로 배열의 마지막 요소).
                        const lastEntry = intersectingEntries[intersectingEntries.length - 1];
                        const targetId = lastEntry.target.id;
                        const newActiveButton = modal.querySelector(
                            `.index-button_v8xK4z[data-target-id="${targetId}"]`,
                        );
                        setActiveIndexButton(newActiveButton);
                    }
                },
                {
                    root: optionsContainer,
                    // 활성화 영역을 컨테이너 상단 10%로 좁혀 더 정밀하게 만듭니다.
                    rootMargin: "0px 0px -90% 0px",
                    threshold: 0,
                },
            );

            sectionTitles.forEach((title) => {
                observer.observe(title);
            });
        }
    };
    const updateSettingsData = () => {
        const setCheckboxAndSaveValue = (elementId, storageVariable, storageKey) => {
            const checkbox = document.getElementById(elementId);

            // elementId가 유효한 경우에만 체크박스를 설정
            if (checkbox) {
                checkbox.checked = storageVariable === 1;

                checkbox.addEventListener("change", (event) => {
                    GM_setValue(storageKey, event.target.checked ? 1 : 0);
                    storageVariable = event.target.checked ? 1 : 0;
                });
            } else {
                customLog.warn(`Checkbox with id "${elementId}" not found.`);
            }
        };

        // 함수를 사용하여 각 체크박스를 설정하고 값을 저장합니다.
        setCheckboxAndSaveValue("fixFixedChannel", isPinnedStreamWithPinEnabled, "isPinnedStreamWithPinEnabled");
        setCheckboxAndSaveValue(
            "fixNotificationChannel",
            isPinnedStreamWithNotificationEnabled,
            "isPinnedStreamWithNotificationEnabled",
        );
        setCheckboxAndSaveValue("showBufferTime", isRemainingBufferTimeEnabled, "isRemainingBufferTimeEnabled");
        setCheckboxAndSaveValue("mutedInactiveTabs", isAutoChangeMuteEnabled, "isAutoChangeMuteEnabled");
        setCheckboxAndSaveValue("switchAutoChangeQuality", isAutoChangeQualityEnabled, "isAutoChangeQualityEnabled");
        setCheckboxAndSaveValue("mpSortByViewers", myplusOrder, "myplusOrder");
        setCheckboxAndSaveValue("removeDuplicates", isDuplicateRemovalEnabled, "isDuplicateRemovalEnabled");
        setCheckboxAndSaveValue("openInNewTab", isOpenNewtabEnabled, "isOpenNewtabEnabled");
        setCheckboxAndSaveValue("mouseOverSideBar", showSidebarOnScreenMode, "showSidebarOnScreenMode");
        setCheckboxAndSaveValue(
            "switchShowSidebarOnScreenModeAlways",
            showSidebarOnScreenModeAlways,
            "showSidebarOnScreenModeAlways",
        );
        setCheckboxAndSaveValue("chatPosition", isBottomChatEnabled, "isBottomChatEnabled");
        setCheckboxAndSaveValue("showPauseButton", isMakePauseButtonEnabled, "isMakePauseButtonEnabled");
        setCheckboxAndSaveValue("switchCaptureButton", isCaptureButtonEnabled, "isCaptureButtonEnabled");
        setCheckboxAndSaveValue(
            "switchSharpmodeShortcut",
            isMakeSharpModeShortcutEnabled,
            "isMakeSharpModeShortcutEnabled",
        );
        setCheckboxAndSaveValue("switchLLShortcut", isMakeLowLatencyShortcutEnabled, "isMakeLowLatencyShortcutEnabled");
        setCheckboxAndSaveValue(
            "switchQualityChangeShortcut",
            isMakeQualityChangeShortcutEnabled,
            "isMakeQualityChangeShortcutEnabled",
        );
        setCheckboxAndSaveValue("sendLoadBroadCheck", isSendLoadBroadEnabled, "isSendLoadBroadEnabled");
        setCheckboxAndSaveValue("selectBestQuality", isSelectBestQualityEnabled, "isSelectBestQualityEnabled");
        setCheckboxAndSaveValue("selectHideSupporterBadge", isHideSupporterBadgeEnabled, "isHideSupporterBadgeEnabled");
        setCheckboxAndSaveValue("selectHideFanBadge", isHideFanBadgeEnabled, "isHideFanBadgeEnabled");
        setCheckboxAndSaveValue("selectHideSubBadge", isHideSubBadgeEnabled, "isHideSubBadgeEnabled");
        setCheckboxAndSaveValue("selectHideVIPBadge", isHideVIPBadgeEnabled, "isHideVIPBadgeEnabled");
        setCheckboxAndSaveValue("selectHideMngrBadge", isHideManagerBadgeEnabled, "isHideManagerBadgeEnabled");
        setCheckboxAndSaveValue("selectHideStreamerBadge", isHideStreamerBadgeEnabled, "isHideStreamerBadgeEnabled");
        setCheckboxAndSaveValue("switchThemeLock", isThemeLockEnabled, "isThemeLockEnabled");
        setCheckboxAndSaveValue("switchVideoSkipHandler", isVideoSkipHandlerEnabled, "isVideoSkipHandlerEnabled");
        setCheckboxAndSaveValue("switchSmallUserLayout", isSmallUserLayoutEnabled, "isSmallUserLayoutEnabled");
        setCheckboxAndSaveValue("switchChannelFeed", isChannelFeedEnabled, "isChannelFeedEnabled");
        setCheckboxAndSaveValue("switchCustomSidebar", isCustomSidebarEnabled, "isCustomSidebarEnabled");
        setCheckboxAndSaveValue("switchRemoveCarousel", isRemoveCarouselEnabled, "isRemoveCarouselEnabled");
        setCheckboxAndSaveValue(
            "switchDocumentTitleUpdate",
            isDocumentTitleUpdateEnabled,
            "isDocumentTitleUpdateEnabled",
        );
        setCheckboxAndSaveValue(
            "switchRemoveRedistributionTag",
            isRemoveRedistributionTagEnabled,
            "isRemoveRedistributionTagEnabled",
        );
        setCheckboxAndSaveValue(
            "switchRemoveWatchLaterButton",
            isRemoveWatchLaterButtonEnabled,
            "isRemoveWatchLaterButtonEnabled",
        );
        setCheckboxAndSaveValue(
            "switchBroadTitleTextEllipsis",
            isBroadTitleTextEllipsisEnabled,
            "isBroadTitleTextEllipsisEnabled",
        );
        setCheckboxAndSaveValue(
            "switchRemoveBroadStartTimeTag",
            isRemoveBroadStartTimeTagEnabled,
            "isRemoveBroadStartTimeTagEnabled",
        );
        setCheckboxAndSaveValue("switchUnlockCopyPaste", isUnlockCopyPasteEnabled, "isUnlockCopyPasteEnabled");
        setCheckboxAndSaveValue("switchAlignNicknameRight", isAlignNicknameRightEnabled, "isAlignNicknameRightEnabled");
        setCheckboxAndSaveValue(
            "switchReplaceEmptyThumbnail",
            isReplaceEmptyThumbnailEnabled,
            "isReplaceEmptyThumbnailEnabled",
        );
        setCheckboxAndSaveValue("switchThumbnailTooltip", isThumbnailTooltipEnabled, "isThumbnailTooltipEnabled");
        setCheckboxAndSaveValue("switchAutoScreenMode", isAutoScreenModeEnabled, "isAutoScreenModeEnabled");
        setCheckboxAndSaveValue("switchAdjustDelayNoGrid", isAdjustDelayNoGridEnabled, "isAdjustDelayNoGridEnabled");
        setCheckboxAndSaveValue(
            "switchHideButtonsAboveChatInput",
            ishideButtonsAboveChatInputEnabled,
            "ishideButtonsAboveChatInputEnabled",
        );
        setCheckboxAndSaveValue(
            "switchRemoveShadowsFromCatch",
            isRemoveShadowsFromCatchEnabled,
            "isRemoveShadowsFromCatchEnabled",
        );
        setCheckboxAndSaveValue(
            "switchChzzkFollowChannels",
            isChzzkFollowChannelsEnabled,
            "isChzzkFollowChannelsEnabled",
        );
        setCheckboxAndSaveValue("switchChzzkTopChannels", isChzzkTopChannelsEnabled, "isChzzkTopChannelsEnabled");
        setCheckboxAndSaveValue("switchNoAutoVOD", isNoAutoVODEnabled, "isNoAutoVODEnabled");
        setCheckboxAndSaveValue("switchAutoResumeVideo", isAutoResumeVideoEnabled, "isAutoResumeVideoEnabled");
        setCheckboxAndSaveValue("switchRedirectLive", isRedirectLiveEnabled, "isRedirectLiveEnabled");
        setCheckboxAndSaveValue("switchHideEsportsInfo", isHideEsportsInfoEnabled, "isHideEsportsInfoEnabled");
        setCheckboxAndSaveValue(
            "switchBlockedCategorySorting",
            isBlockedCategorySortingEnabled,
            "isBlockedCategorySortingEnabled",
        );
        setCheckboxAndSaveValue("switchRandomSort", isRandomSortEnabled, "isRandomSortEnabled");
        setCheckboxAndSaveValue("switchPinnedOnlineOnly", isPinnedOnlineOnlyEnabled, "isPinnedOnlineOnlyEnabled");
        setCheckboxAndSaveValue("switchClickToMute", isClickToMuteEnabled, "isClickToMuteEnabled");
        setCheckboxAndSaveValue("switchVODHighlight", isVODHighlightEnabled, "isVODHighlightEnabled");
        setCheckboxAndSaveValue(
            "switchClickPlayerEventMapper",
            isClickPlayerEventMapperEnabled,
            "isClickPlayerEventMapperEnabled",
        );
        setCheckboxAndSaveValue("switchFavoriteGroups", isFavoriteGroupEnabled, "isFavoriteGroupEnabled");
        setCheckboxAndSaveValue("switchCategoryGroups", isCategoryGroupEnabled, "isCategoryGroupEnabled");
        setCheckboxAndSaveValue(
            "switchShortenFavoriteGroupName",
            isShortenFavoriteGroupNameEnabled,
            "isShortenFavoriteGroupNameEnabled",
        );
        setCheckboxAndSaveValue(
            "switchShortenCategoryName",
            isShortenCategoryNameEnabled,
            "isShortenCategoryNameEnabled",
        );

        const handleRangeInput = (inputId, displayId, currentValue, storageKey) => {
            const input = document.getElementById(inputId);
            input.value = currentValue;

            input.addEventListener("input", (event) => {
                const newValue = parseInt(event.target.value); // event.target.value로 변경
                if (newValue !== currentValue) {
                    GM_setValue(storageKey, newValue);
                    currentValue = newValue;
                    document.getElementById(displayId).textContent = newValue;
                    if (inputId === "nicknameWidthDisplay") setWidthNickname(newValue);
                }
            });
        };

        handleRangeInput("favoriteChannelsDisplay", "favoriteChannelsDisplayValue", displayFollow, "displayFollow");
        handleRangeInput("myPlusChannelsDisplay", "myPlusChannelsDisplayValue", displayMyplus, "displayMyplus");
        handleRangeInput("myPlusVODDisplay", "myPlusVODDisplayValue", displayMyplusvod, "displayMyplusvod");
        handleRangeInput("popularChannelsDisplay", "popularChannelsDisplayValue", displayTop, "displayTop");
        handleRangeInput("nicknameWidthDisplay", "nicknameWidthDisplayValue", nicknameWidth, "nicknameWidth");

        // 1. Select 메뉴를 위한 새로운 헬퍼 함수를 정의합니다.
        const setSelectAndSaveValue = (elementId, storageKey, defaultValue) => {
            const select = document.getElementById(elementId);
            if (select) {
                // Greasemonkey에 저장된 값을 불러와 select 메뉴의 초기 값을 설정합니다.
                select.value = GM_getValue(storageKey, defaultValue);

                // select 메뉴의 값이 변경될 때마다 새로운 값을 저장합니다.
                select.addEventListener("change", (event) => {
                    GM_setValue(storageKey, event.target.value);
                });
            } else {
                customLog.warn(`Select element with id "${elementId}" not found.`);
            }
        };

        // 2. 새로 만든 헬퍼 함수를 사용하여 각 Select 메뉴를 설정합니다.
        setSelectAndSaveValue("selectLeftClick", "livePlayerLeftClickFunction", "toggleMute");
        setSelectAndSaveValue("selectRightClick", "livePlayerRightClickFunction", "toggleScreenMode");
        setSelectAndSaveValue("selectPreferredQuality", "preferredQualitySetting", "off");

        setSelectAndSaveValue("redirectLiveSortOption", "redirectLiveSortOption", "custom");

        // 하위 옵션 숨기기
        setupDependentVisibility({
            controllers: [document.getElementById("switchNoAutoVOD")],
            targets: [document.getElementById("redirectLiveOptionContainer")],
        });

        setupDependentVisibility({
            controllers: [document.getElementById("switchCustomSidebar")],
            targets: [...document.querySelectorAll(".customSidebarOptionsContainer")],
        });
    };
    const openHlsStream = (nickname, m3u8Url) => {
        // HTML과 JavaScript 코드 생성
        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${nickname}</title>
  <style>
    body {
        background-color: black;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        overflow: hidden;
        position: relative;  /* 자식 요소 위치 조정을 위해 추가 */
    }
    #video {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        max-height: 100%;
        max-width: 100%;
    }
    #overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);  /* 반투명 배경 */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 5;  /* 비디오보다 위에 보이도록 설정 */
    }
    #muteButton {
        background-color: rgba(255, 255, 255, 0.8);
        border: none;
        border-radius: 50%;
        padding: 30px;  /* 버튼 크기 증가 */
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 36px;  /* 아이콘 크기 증가 */
        z-index: 10;  /* 버튼이 다른 요소 위에 보이도록 설정 */
    }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
  <video id="video" controls autoplay muted></video>
  <div id="overlay">
    <button id="muteButton"><i class="fas fa-volume-mute"></i></button>
  </div>
  <script>
    const video = document.getElementById("video");
    const muteButton = document.getElementById("muteButton");
    const overlay = document.getElementById("overlay");

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource("${m3u8Url}");
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = "${m3u8Url}";
      video.addEventListener("loadedmetadata", function () {
        video.play();
      });
    }

    const toggleMute = () => {
      video.muted = !video.muted;
      muteButton.innerHTML = video.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
      overlay.style.display = 'none';  // 버튼 클릭 후 레이어 사라지도록 설정
    };

    // 버튼 클릭 시 음소거 해제
    muteButton.addEventListener("click", (event) => {
      event.stopPropagation(); // 클릭 이벤트 전파 방지
      toggleMute();
    });

    // 문서의 아무 곳을 클릭해도 음소거 해제
    overlay.addEventListener("click", toggleMute);
  </script>
</body>
</html>
    `;

        // Blob 생성
        const blob = new Blob([htmlContent], { type: "text/html" });
        const blobUrl = URL.createObjectURL(blob);

        // 새로운 창으로 Blob URL 열기
        window.open(blobUrl, "_blank");
    };
    unsafeWindow.openHlsStream = openHlsStream;

    const captureLatestFrame = (videoElement) => {
        return new Promise((resolve) => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // 캔버스 크기 설정 (480x270)
            const canvasWidth = 480;
            const canvasHeight = 270;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            // 원본 비디오의 비율을 유지하면서 크기 계산
            const videoRatio = videoElement.videoWidth / videoElement.videoHeight;
            const canvasRatio = canvasWidth / canvasHeight;

            let drawWidth, drawHeight;
            let offsetX = 0,
                offsetY = 0;

            if (videoRatio > canvasRatio) {
                drawWidth = canvasWidth;
                drawHeight = canvasWidth / videoRatio;
                offsetY = (canvasHeight - drawHeight) / 2;
            } else {
                drawHeight = canvasHeight;
                drawWidth = canvasHeight * videoRatio;
                offsetX = (canvasWidth - drawWidth) / 2;
            }

            // 배경을 검은색으로 채우기
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            // 비디오의 현재 프레임을 캔버스에 그림
            ctx.drawImage(videoElement, offsetX, offsetY, drawWidth, drawHeight);

            // webp 형식으로 변환 후 반환
            const dataURL = canvas.toDataURL("image/webp");
            resolve(dataURL); // 데이터 URL 반환
        });
    };
    const replaceThumbnails = (thumbsBoxLinks) => {
        for (const thumbsBoxLink of thumbsBoxLinks) {
            const thumbsBox = thumbsBoxLink.closest(".thumbs-box");
            const imgElement = thumbsBoxLink.querySelector("img");
            if (!thumbsBox || !imgElement || thumbsBoxLink.dataset.adultThumbBound === "true") continue;

            thumbsBoxLink.dataset.adultThumbBound = "true";
            let refreshIntervalId = null;

            const loadAdultThumbnail = async () => {
                if (thumbsBoxLink.dataset.loading === "true") return;

                const hrefValue = thumbsBoxLink.getAttribute("href") || "";
                const matched = hrefValue.match(/play\.sooplive\.com\/([^/]+)\/(\d+)/);
                if (!matched) return;

                const [, id, broadNumber] = matched;
                thumbsBoxLink.dataset.loading = "true";

                if (!thumbsBoxLink.dataset.imageLoaded) {
                    imgElement.style.filter = "grayscale(100%) blur(2px)";
                    imgElement.style.transition = "filter 0.5s ease";
                }

                try {
                    const frameData = await getLatestFrameData(id, broadNumber);
                    if (frameData) {
                        imgElement.src = frameData;
                        imgElement.style.objectFit = "cover";
                        imgElement.style.filter = "none";
                        thumbsBoxLink.dataset.imageLoaded = "true";
                        thumbsBoxLink.dataset.lastLoadedTime = Date.now().toString();
                    } else {
                        imgElement.style.filter = "none";
                    }
                } catch (error) {
                    customLog.error("Adult thumbnail load failed:", error);
                    imgElement.style.filter = "none";
                } finally {
                    thumbsBoxLink.dataset.loading = "false";
                }
            };

            thumbsBoxLink.addEventListener("mouseenter", () => {
                const isExpired = Date.now() - parseInt(thumbsBoxLink.dataset.lastLoadedTime || "0", 10) > 30000;
                if (!thumbsBoxLink.dataset.imageLoaded || isExpired) {
                    loadAdultThumbnail();
                }
                refreshIntervalId = setInterval(loadAdultThumbnail, 30000);
            });

            thumbsBoxLink.addEventListener("mouseleave", () => {
                if (refreshIntervalId) {
                    clearInterval(refreshIntervalId);
                    refreshIntervalId = null;
                }
            });
        }
    };

    /**
     * =================================================================
     * 프리뷰 모달 클래스 (PreviewModal Class)
     * 모달 관련 모든 기능(생성, 열기, 닫기, 이벤트 연결 등)을 캡슐화합니다.
     * =================================================================
     */
    class PreviewModal {
        /**
         * PreviewModal 클래스의 생성자
         */
        constructor() {
            this.elements = null;

            this.isOpenNewtabEnabled = isOpenNewtabEnabled; // '참여하기' 버튼 클릭 시 새 탭에서 열지 여부

            this.hls = null;
        }

        /**
         * [내부 메서드] 모달에 필요한 DOM 요소를 생성하고 body에 추가합니다.
         * 이 메서드는 모달이 처음 열릴 때 한 번만 호출됩니다.
         */
        _createModal() {
            const modal = document.createElement("div");
            modal.className = "preview-modal";

            const modalContent = document.createElement("div");
            modalContent.className = "preview-modal-content";

            const closeButton = document.createElement("span");
            closeButton.className = "preview-close";
            closeButton.innerHTML = "&times;";

            const videoPlayer = document.createElement("video");
            videoPlayer.controls = true;

            const infoContainer = document.createElement("div");
            infoContainer.className = "info";

            const streamerName = document.createElement("div");
            streamerName.className = "streamer-name";

            const videoTitle = document.createElement("div");
            videoTitle.className = "video-title";

            const tagsContainer = document.createElement("div");
            tagsContainer.className = "tags";

            const startButton = document.createElement("a");
            startButton.className = "start-button";
            startButton.textContent = "참여하기 >";

            infoContainer.append(streamerName, tagsContainer, videoTitle, startButton);
            modalContent.append(closeButton, videoPlayer, infoContainer);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);

            // 생성된 요소들을 클래스의 elements 속성에 저장합니다.
            this.elements = { modal, videoPlayer, streamerName, videoTitle, tagsContainer, startButton };

            // 이벤트 핸들러를 연결합니다. 'this'가 클래스 인스턴스를 가리키도록 화살표 함수를 사용합니다.
            closeButton.onclick = () => this.close();
            startButton.onclick = () => {
                setTimeout(() => this.close(), 1000);
            };
            window.onclick = (event) => {
                if (event.target === this.elements.modal) {
                    this.close();
                }
            };
        }

        /**
         * 모달을 닫고 비디오 재생을 중지합니다.
         */
        close() {
            if (!this.elements) return; // 모달이 생성되지 않았으면 아무것도 하지 않음

            this.elements.modal.style.display = "none";
            this.elements.videoPlayer.pause();
            this.elements.videoPlayer.src = "";

            // HLS 인스턴스가 있으면 파괴하여 메모리 누수를 방지합니다.
            if (this.hls) {
                this.hls.destroy();
                this.hls = null;
            }
        }

        /**
         * [핵심] 방송 데이터를 기반으로 미리보기 모달을 엽니다.
         * @param {object} data - { id, broadNumber, streamerName, videoTitle, tags }
         */
        async open(data) {
            // 모달 DOM이 아직 생성되지 않았다면, 이 시점에서 생성합니다.
            if (!this.elements) {
                this._createModal();
            }

            // 모달이 이미 열려있으면 중단
            if (this.elements.modal.style.display === "block") {
                return;
            }

            // 필수 데이터 확인
            if (!data.id || !data.broadNumber) {
                customLog.error("미리보기를 위한 필수 정보(id, broadNumber)가 부족합니다.");
                return;
            }

            const playerLink = `https://play.sooplive.com/${data.id}/${data.broadNumber}`;

            try {
                // `getM3u8url`은 외부에 정의된 함수라고 가정합니다.
                const m3u8url = await getM3u8url(data.id, data.broadNumber, "hd");

                const modalData = { ...data, m3u8url, playerLink };

                this._updateContent(modalData); // 모달 내용 업데이트
                this.elements.modal.style.display = "block"; // 모달 보이기
            } catch (error) {
                customLog.error("방송 정보를 가져오는 데 실패했습니다:", error);
                // 에러 발생 시 참여하기 버튼이라도 활성화되도록 처리할 수 있습니다.
                const errorData = { ...data, m3u8url: null, playerLink };
                this._updateContent(errorData);
                this.elements.modal.style.display = "block";
            }
        }

        /**
         * [내부 메서드] 받은 데이터를 기반으로 모달의 내용을 업데이트합니다.
         * @param {object} data - 모달에 표시할 모든 정보
         */
        _updateContent(data) {
            const { videoPlayer, streamerName, videoTitle, tagsContainer, startButton } = this.elements;
            const { m3u8url, playerLink, streamerName: name, videoTitle: title, tags } = data;

            const hrefTarget = this.isOpenNewtabEnabled ? "_blank" : "_self";

            streamerName.textContent = name;
            videoTitle.textContent = title;
            this._updateTags(tagsContainer, tags);

            startButton.setAttribute("href", playerLink);
            startButton.setAttribute("target", hrefTarget);

            // 비디오 플레이어 설정
            if (m3u8url) {
                this._setupVideoPlayer(videoPlayer, m3u8url);
            } else {
                // M3U8 주소를 가져오지 못한 경우 비디오 플레이어를 숨김 처리할 수 있습니다.
                videoPlayer.style.display = "none";
            }
        }

        /**
         * [내부 메서드] 태그 목록을 업데이트합니다.
         * @param {HTMLElement} tagsContainer - 태그가 표시될 부모 요소
         * @param {Array<object>} tags - 태그 정보 배열 [{ text, href }]
         */
        _updateTags(tagsContainer, tags = []) {
            tagsContainer.innerHTML = ""; // 이전 태그 모두 제거
            tags.forEach((tag) => {
                const tagElement = document.createElement("a");
                tagElement.textContent = tag.text;
                tagElement.href = tag.href;
                tagsContainer.appendChild(tagElement);
            });
        }

        /**
         * [내부 메서드] HLS.js를 사용하여 비디오 플레이어를 설정하고 재생합니다.
         * @param {HTMLVideoElement} videoPlayer - 비디오 플레이어 요소
         * @param {string} m3u8url - 재생할 M3U8 주소
         */
        _setupVideoPlayer(videoPlayer, m3u8url) {
            const playVideo = () => {
                const savedVolume = localStorage.getItem("videoPlayerVolume");
                videoPlayer.volume = savedVolume !== null ? parseFloat(savedVolume) : 0.5;
                videoPlayer.style.display = "block";
                videoPlayer.play();
            };

            videoPlayer.onvolumechange = () => {
                localStorage.setItem("videoPlayerVolume", videoPlayer.volume);
            };

            if (unsafeWindow.Hls.isSupported()) {
                // 이전 HLS 인스턴스가 있다면 파괴
                if (this.hls) {
                    this.hls.destroy();
                }
                this.hls = new unsafeWindow.Hls();
                this.hls.loadSource(m3u8url);
                this.hls.attachMedia(videoPlayer);
                this.hls.on(unsafeWindow.Hls.Events.MANIFEST_PARSED, playVideo);
            } else if (videoPlayer.canPlayType("application/vnd.apple.mpegurl")) {
                videoPlayer.src = m3u8url;
                videoPlayer.addEventListener("loadedmetadata", playVideo, { once: true }); // 이벤트가 한 번만 실행되도록 설정
            } else {
                alert("이 브라우저는 HLS 비디오를 지원하지 않습니다.");
            }
        }

        /**
         * 썸네일 링크 목록에 미리보기 이벤트 리스너를 추가합니다.
         * @param {NodeListOf<Element>} thumbsBoxLinks - 썸네일 링크 요소 목록
         */
        attachToThumbnails(thumbsBoxLinks) {
            for (const thumbsBoxLink of thumbsBoxLinks) {
                if (thumbsBoxLink.classList.contains("preview-checked")) continue;
                thumbsBoxLink.classList.add("preview-checked");

                const hrefValue = thumbsBoxLink.getAttribute("href");
                if (!hrefValue?.includes("play.sooplive.com")) continue;

                const eventType = "click";

                thumbsBoxLink.addEventListener(eventType, async (event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    const [, , , id, broadNumber] = hrefValue.split("/");
                    const parent = thumbsBoxLink.parentNode.parentNode;
                    const streamerName = parent.querySelector(".nick").innerText;
                    const videoTitle = parent.querySelector(".title a").innerText;
                    const tagNodes = parent.querySelectorAll(".tag_wrap a");

                    const tags = Array.from(tagNodes).map((tag) => ({
                        text: tag.innerText,
                        href:
                            tag.getAttribute("class") === "category"
                                ? `https://www.sooplive.com/directory/category/${encodeURIComponent(tag.innerText)}/live`
                                : `https://www.sooplive.com/search?hash=hashtag&tagname=${encodeURIComponent(tag.innerText)}&hashtype=live&stype=hash&acttype=live&location=live_main&inflow_tab=`,
                    }));

                    const broadcastData = { id, broadNumber, streamerName, videoTitle, tags };
                    await this.open(broadcastData); // 클래스의 open 메서드 호출
                });
            }
        }

        /**
         * 사이드바 링크의 oncontextmenu 속성에서 호출될 헬퍼 함수
         * @param {HTMLElement} element - 우클릭된 <a> 요소
         * @param {Event} event - contextmenu 이벤트 객체
         */
        async handleSidebarContextMenu(element, event) {
            event.preventDefault();
            event.stopPropagation();

            const href = element.getAttribute("href");
            const parts = href.split("/");
            const id = element.dataset.userId || parts[3];
            const broadNumber = parts[4];

            if (!id || !broadNumber) {
                customLog.error("ID 또는 방송 번호를 추출할 수 없습니다.", element);
                return;
            }

            const streamerName = element.querySelector(".username")?.innerText || id;
            const videoTitle = element.getAttribute("tooltip") || element.querySelector(".description")?.innerText;
            const categorySpan = element.querySelector(".description");

            const tags = [];
            if (categorySpan) {
                const categoryText = categorySpan.innerText;
                tags.push({
                    text: categoryText,
                    href: `https://www.sooplive.com/directory/category/${encodeURIComponent(categoryText)}/live`,
                });
            }

            const broadcastData = { id, broadNumber, streamerName, videoTitle, tags };
            await this.open(broadcastData);
        }
    }

    const removeUnwantedTags = () => {
        if (isRemoveCarouselEnabled) {
            GM_addStyle(`
                div[class^="player_player_wrap"] {
                    display: none !important;
                }
            `);
        }

        if (isRemoveRedistributionTagEnabled) {
            GM_addStyle(`
                [data-type=cBox] .thumbs-box .allow {
                    display: none !important;
                }
            `);
        }

        if (isRemoveWatchLaterButtonEnabled) {
            GM_addStyle(`
                [data-type=cBox] .thumbs-box .later {
                    display: none !important;
                }
            `);
        }

        if (isRemoveBroadStartTimeTagEnabled) {
            GM_addStyle(`
                [data-type=cBox] .thumbs-box .time {
                    display: none !important;
                }
            `);
        }

        if (isBroadTitleTextEllipsisEnabled) {
            GM_addStyle(`
                [data-type=cBox] .cBox-info .title a {
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    display: inline-block;
                }
            `);
        }
    };
    const setupThemeLock = () => {
        // 현재 theme 쿠키 값을 읽어 max-age=10년으로 덮어씀
        const refreshThemeCookie = () => {
            const entry = document.cookie
                .split(";")
                .map((c) => c.trim())
                .find((c) => c.startsWith("theme="));
            const value = entry ? entry.split("=")[1] : null;
            if (value) {
                document.cookie = `theme=${value}; max-age=${10 * 365 * 24 * 60 * 60}; path=/; domain=.sooplive.com`;
                customLog.log(`[테마 무기한] 쿠키 갱신: ${value}`);
            }
        };

        // 초기 적용
        refreshThemeCookie();

        // 사이트가 html[dark]를 바꾸면 (테마 변경) → 쿠키 만료도 새로 갱신
        const domObserver = new MutationObserver(() => {
            refreshThemeCookie();
        });
        domObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["dark"] });
    };
    const setupAutoResumeVideo = () => {
        // 1. #stop_screen 감지 → "VOD 보기" 자동 클릭
        const watchStopScreen = () => {
            const stopScreen = document.getElementById("stop_screen");
            if (!stopScreen) {
                setTimeout(watchStopScreen, 1000);
                return;
            }

            const tryClickVodLink = () => {
                const vodLink = stopScreen.querySelector(".nextplay a");
                if (vodLink) {
                    customLog.log("[자동재개] #stop_screen 감지 → VOD 보기 클릭");
                    vodLink.click();
                }
            };

            // 이미 표시 중인 경우 즉시 처리
            if (stopScreen.style.display === "block") {
                setTimeout(tryClickVodLink, 800);
            }

            // 이후 표시 상태 변화 감시
            const observer = new MutationObserver(() => {
                if (stopScreen.style.display === "block") {
                    setTimeout(tryClickVodLink, 800);
                }
            });
            observer.observe(stopScreen, { attributes: true, attributeFilter: ["style"] });
        };

        // 2. 비디오 요소 감지 → 초기 일시정지 상태이면 자동 재생
        const watchVideoOnLoad = () => {
            const video = document.querySelector("video");
            if (!video) {
                setTimeout(watchVideoOnLoad, 500);
                return;
            }

            // readyState >= 2 (HAVE_CURRENT_DATA) 이면 이미 준비됨
            const tryPlay = () => {
                if (video.paused && !video.ended && video.readyState >= 2) {
                    customLog.log("[자동재개] 초기 일시정지 감지 → 자동 재생");
                    video.play().catch((e) => customLog.warn("[자동재개] play() 실패:", e));
                }
            };

            if (video.readyState >= 2) {
                tryPlay();
            } else {
                video.addEventListener("canplay", tryPlay, { once: true });
            }
        };

        watchStopScreen();
        watchVideoOnLoad();
    };
    const appendPauseButton = async () => {
        try {
            // 기존 버튼이 있다면 제거
            const existingButton = document.body.querySelector("#closeStream");
            if (existingButton) {
                existingButton.remove();
            }

            // time_shift_play 버튼이 숨겨져 있을 때만 버튼 생성
            const timeShiftButton = await waitForElementAsync("button#time_shift_play");
            if (window.getComputedStyle(timeShiftButton).display !== "none") return;

            const ctrlDiv = document.body.querySelector("div.ctrl");
            if (!ctrlDiv) return;

            const newCloseStreamButton = document.createElement("button");
            newCloseStreamButton.type = "button";
            newCloseStreamButton.id = "closeStream";
            newCloseStreamButton.className = "pause on";

            const tooltipDiv = document.createElement("div");
            tooltipDiv.className = "tooltip";
            const spanElement = document.createElement("span");
            spanElement.textContent = "일시정지";

            tooltipDiv.appendChild(spanElement);
            newCloseStreamButton.appendChild(tooltipDiv);
            ctrlDiv.insertBefore(newCloseStreamButton, ctrlDiv.firstChild);

            newCloseStreamButton.addEventListener("click", (e) => {
                e.preventDefault();
                toggleStream(newCloseStreamButton, spanElement);
            });
        } catch (error) {
            customLog.error("스트리밍 종료 버튼 생성 실패:", error);
        }
    };

    const toggleStream = (button, spanElement) => {
        try {
            if (button.classList.contains("on")) {
                unsafeWindow.livePlayer.closeStreamConnector();
                button.classList.remove("on", "pause");
                button.classList.add("off", "play");
                spanElement.textContent = "재생";
            } else {
                unsafeWindow.livePlayer._startBroad();
                button.classList.remove("off", "play");
                button.classList.add("on", "pause");
                spanElement.textContent = "일시정지";
            }
        } catch (error) {
            customLog.log(error);
        }
    };
    const setWidthNickname = (wpx) => {
        if (typeof wpx === "number" && wpx > 0) {
            // wpx가 유효한 값인지 확인
            GM_addStyle(`
            .starting-line .chatting-list-item .message-container .username {
                width: ${wpx}px !important;
            }
        `);
        } else {
            customLog.warn("Invalid width value provided for setWidthNickname."); // 유효하지 않은 값 경고
        }
    };
    const hideBadges = () => {
        const badgeSettings = [
            { key: "isHideSupporterBadgeEnabled", className: "support" },
            { key: "isHideFanBadgeEnabled", className: "fan" },
            { key: "isHideSubBadgeEnabled", className: "sub" },
            { key: "isHideVIPBadgeEnabled", className: "vip" },
            { key: "isHideManagerBadgeEnabled", className: "manager" },
            { key: "isHideStreamerBadgeEnabled", className: "streamer" },
        ];

        // 각 배지 숨김 설정 값 가져오기
        const settings = badgeSettings.map((setting) => ({
            key: setting.key,
            enabled: GM_getValue(setting.key),
            className: setting.className,
        }));

        // 모든 배지 숨김 설정이 비활성화된 경우 종료
        if (!settings.some((setting) => setting.enabled)) {
            return;
        }

        // 활성화된 설정에 대한 CSS 규칙 생성
        let cssRules = settings
            .filter((setting) => setting.enabled)
            .map((setting) => `[class^="grade-badge-${setting.className}"] { display: none !important; }`)
            .join("\n");

        // 서브 배지용 CSS 규칙 추가
        if (settings.find((s) => s.className === "sub" && s.enabled)) {
            const thumbSpanSelector = CURRENT_URL.startsWith("https://play.sooplive.com/")
                ? "#chat_area div.username > button > span.thumb"
                : "#chatMemo div.username > button > span.thumb";
            cssRules += `\n${thumbSpanSelector} { display: none !important; }`;
        }

        // CSS 규칙 한 번만 적용
        GM_addStyle(cssRules);
    };
    const unlockCopyPaste = (targetDiv) => {
        const writeArea = document.getElementById("write_area");

        // 복사 기능
        const handleCopy = (event) => {
            event.preventDefault(); // 기본 복사 동작 막기
            const selectedText = window.getSelection().toString(); // 선택된 텍스트 가져오기
            if (selectedText) {
                event.clipboardData.setData("text/plain", selectedText); // 클립보드에 텍스트 쓰기
            }
        };

        // 잘라내기 기능
        const handleCut = (event) => {
            event.preventDefault(); // 기본 잘라내기 동작 막기
            const selectedText = window.getSelection().toString(); // 선택된 텍스트 가져오기
            if (selectedText) {
                event.clipboardData.setData("text/plain", selectedText); // 클립보드에 텍스트 쓰기
                document.execCommand("delete"); // 선택된 텍스트 삭제
            }
        };

        // 붙여넣기 기능
        const handlePaste = (event) => {
            event.preventDefault(); // 기본 붙여넣기 동작 막기
            const text = (event.clipboardData || window.clipboardData).getData("text"); // 클립보드에서 텍스트 가져오기
            document.execCommand("insertText", false, text); // 텍스트를 수동으로 삽입
        };

        // 이벤트 리스너 등록
        writeArea.addEventListener("copy", handleCopy);
        writeArea.addEventListener("cut", handleCut);
        writeArea.addEventListener("paste", handlePaste);
    };
    const alignNicknameRight = () => {
        GM_addStyle(`
        .starting-line .chatting-list-item .message-container .username > button {
            float: right !important;
            white-space: nowrap;
        }
        `);
    };
    const hideButtonsAboveChatInput = () => {
        const style = `
        .chatbox .actionbox .chat_item_list {
            display: none !important;
        }
        .chatbox .actionbox {
            height: auto !important;
        }
        `;
        GM_addStyle(style);
    };
    const makeCaptureButton = () => {
        const svgDataUrl =
            "data:image/svg+xml,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20stroke%3D%22%23fff%22%3E%3Cg%20stroke-width%3D%220%22%2F%3E%3Cg%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22%23CCC%22%20stroke-width%3D%22.048%22%2F%3E%3Cg%20stroke-width%3D%221.488%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M21%2013c0-2.667-.5-5-1-5.333-.32-.214-1.873-.428-4-.553C14.808%207.043%2017%205%2012%205S9.192%207.043%208%207.114c-2.127.125-3.68.339-4%20.553C3.5%208%203%2010.333%203%2013s.5%205%201%205.333S8%2019%2012%2019s7.5-.333%208-.667c.5-.333%201-2.666%201-5.333%22%2F%3E%3Cpath%20d%3D%22M12%2016a3%203%200%201%200%200-6%203%203%200%200%200%200%206%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E";

        // 1. CSS 삽입
        const style = document.createElement("style");
        style.textContent = `
    #player .imageCapture {
      overflow: visible;
      color: rgba(0, 0, 0, 0);
      width: 32px;
      height: 32px;
      margin: 0;
      font-size: 0;
      opacity: 0.9;
      background: url("${svgDataUrl}") 50% 50% no-repeat;
      background-size: 82%;
      border: none;
      padding: 0;
      cursor: pointer;
      position: relative;
    }
    #player .imageCapture:hover {
      opacity: 1;
    }
  `;
        document.head.appendChild(style);

        const captureVideoFrame = (shouldDownloadImmediately = false) => {
            const video = document.getElementById("livePlayer") || document.getElementById("video");
            if (!video) {
                customLog.error("비디오 요소를 찾을 수 없습니다.");
                return;
            }

            // 캔버스 생성 및 비디오의 현재 프레임 그리기
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            // 파일명을 위한 타임스탬프 생성
            const now = new Date();
            const pad = (n) => String(n).padStart(2, "0");
            const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
            const filename = `capture_${timestamp}.jpg`;

            // 캔버스 이미지를 JPEG Blob 객체로 변환
            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        customLog.error("Blob 데이터를 생성하는데 실패했습니다.");
                        return;
                    }

                    // --- 여기서 인자에 따라 동작이 분기됩니다 ---

                    if (shouldDownloadImmediately) {
                        // [분기 1] 즉시 다운로드 로직
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = filename;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url); // 다운로드 후 즉시 URL 해제
                    } else {
                        // [분기 2] 새 탭에서 열기 로직
                        const imgURL = URL.createObjectURL(blob);
                        const html = `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <title>ScreenShot (${video.videoWidth}x${video.videoHeight})</title>
              <style>
                body { margin: 0; background: #000; display: flex; justify-content: center; align-items: center; height: 100vh; position: relative; }
                img { max-width: 100%; max-height: 100%; }
                #downloadBtn { position: absolute; top: 16px; right: 16px; padding: 8px 12px; background-color: #ffffffcc; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: bold; }
              </style>
            </head>
            <body>
              <img id="capturedImg" src="${imgURL}" alt="영상 캡쳐 이미지">
              <button id="downloadBtn">다운로드 ${filename}</button>
              <script>
                // 새 탭 안의 다운로드 버튼 클릭 이벤트
                document.getElementById('downloadBtn').addEventListener('click', () => {
                  const a = document.createElement('a');
                  a.href = document.getElementById('capturedImg').src;
                  a.download = '${filename}';
                  a.click();
                });

                // 새 탭이 닫힐 때 Blob URL을 해제하여 메모리 누수 방지
                window.addEventListener('beforeunload', () => {
                  URL.revokeObjectURL("${imgURL}");
                });
              </script>
            </body>
            </html>`;

                        const blobURL = URL.createObjectURL(new Blob([html], { type: "text/html;charset=UTF-8" }));
                        window.open(blobURL, "_blank");
                        // 여기서 imgURL을 해제하면 새 탭에서 이미지가 보이지 않으므로, 새 탭 내부에서 해제합니다.
                    }
                },
                "image/jpeg",
                0.92,
            );
        };
        // 2. 버튼 생성
        const createButton = () => {
            const btn = document.createElement("button");
            btn.className = "imageCapture";
            btn.type = "button";
            btn.title = "클릭: 새 탭에서 보기 / 우클릭: 바로 다운로드";

            // 좌클릭: 새 탭에서 열기
            btn.addEventListener("click", () => {
                try {
                    // 인자를 false 또는 생략하여 호출
                    captureVideoFrame(false);
                } catch (err) {
                    customLog.error("캡처 실패:", err);
                }
            });

            // 우클릭: 즉시 다운로드
            btn.addEventListener("contextmenu", (event) => {
                event.preventDefault(); // 기본 컨텍스트 메뉴 방지
                try {
                    // 인자를 true로 전달하여 호출
                    captureVideoFrame(true);
                } catch (err) {
                    customLog.error("캡처 및 다운로드 실패:", err);
                }
            });

            return btn;
        };
        // 3. 버튼 삽입
        const insertButton = async () => {
            try {
                const container = await waitForElementAsync("#player .player_ctrlBox .ctrlBox .right_ctrl");

                if (container && !container.querySelector(".imageCapture")) {
                    const btn = createButton();
                    container.insertBefore(btn, container.firstChild);
                }
            } catch (error) {
                customLog.error("버튼 추가 실패! 원인:", error.message);
            }
        };

        insertButton();
    };
    const addStyleRemoveShadowsFromCatch = () => {
        const style = `
            .catch_webplayer_wrap .vod_player:after {
                background-image: none !important;
            }
        `;
        GM_addStyle(style);
    };
    const setupSettingButtonTopbar = async () => {
        const serviceUtilDiv = await waitForElementAsync("div.serviceUtil");
        addModalSettings(serviceUtilDiv);
        const openModalBtnDiv = await waitForElementAsync("#openModalBtn > button");
        manageRedDot(openModalBtnDiv);
    };

    /**
     * 컨트롤러 상태에 따라 타겟 요소의 가시성을 제어하는 함수.
     * 타겟의 원래 display 속성을 기억하여 복원합니다.
     * @param {object} options
     * @param {HTMLInputElement[]} options.controllers - 상태를 제어할 체크박스 요소들의 배열
     * @param {HTMLElement[]} options.targets - 가시성이 제어될 요소들의 배열
     */
    function setupDependentVisibility(options) {
        const { controllers, targets } = options;

        if (
            !Array.isArray(controllers) ||
            controllers.length === 0 ||
            !Array.isArray(targets) ||
            targets.length === 0
        ) {
            console.error("필수 요소(controllers 배열, targets 배열)가 올바르게 전달되지 않았습니다.");
            return;
        }

        // 1. 함수가 처음 실행될 때 각 타겟의 원래 display 값을 data 속성에 저장
        targets.forEach((target) => {
            if (!target) return;
            // getComputedStyle로 CSS 파일에 정의된 display 값까지 가져옴
            const originalDisplay = window.getComputedStyle(target).display;

            // 만약 처음부터 display: none; 이었다면, 보여줄 때를 대비해 'block'을 기본값으로 저장
            target.dataset.originalDisplay = originalDisplay === "none" ? "block" : originalDisplay;
        });

        const updateVisibility = () => {
            const isAnyControllerChecked = controllers.some((controller) => controller.checked);

            targets.forEach((target) => {
                if (!target) return;
                // 2. 보여줄 때는 저장해둔 원래 display 값을 사용하고, 숨길 때는 'none'으로 설정
                target.style.display = isAnyControllerChecked ? target.dataset.originalDisplay : "none";
            });
        };

        controllers.forEach((controller) => {
            controller.addEventListener("change", updateVisibility);
        });

        // 초기 가시성 설정
        updateVisibility();
    }

    function displayCenterVolume(isMuted, currentVolume) {
        // 필요한 UI 요소들을 찾습니다.
        const centerVolumeText = document.querySelector(".volume_text");
        const centerButton = document.querySelector(".center_btn");
        const centerVolumeIcon = document.querySelector(".volume_icon");

        if (!centerVolumeText || !centerButton || !centerVolumeIcon) {
            customLog.error("중앙 볼륨 표시 UI 요소를 찾을 수 없습니다.");
            return;
        }

        // 상태에 따라 아이콘 클래스와 표시될 텍스트를 결정합니다.
        let t = "";
        isMuted ? (t = "mute") : currentVolume < 0.5 && (t = "low");
        let e = isMuted ? 0 : currentVolume;

        // UI 요소들을 화면에 표시합니다.
        centerVolumeText.textContent = `${Math.round(100 * e)}%`;
        centerVolumeText.classList.remove("hide_text");
        centerButton.classList.remove("fadeOut");
        centerButton.querySelectorAll("div, button").forEach((el) => {
            if (!el.classList.contains("volume_icon")) {
                el.style.display = "none";
            }
        });
        centerVolumeIcon.classList.remove("low", "mute");
        if (t) {
            centerVolumeIcon.classList.add(t);
        }
        centerVolumeIcon.style.display = "block";

        // 0.4초 후에 UI를 다시 숨깁니다.
        setTimeout(() => {
            centerButton.classList.add("fadeOut");
            centerVolumeText.classList.add("hide_text");
            centerVolumeIcon.style.display = "none";
        }, 400);
    }

    // 3.5. 이벤트 핸들러 및 옵저버 (Event Handlers & Observers)
    class PlayerEventMapper {
        constructor(playerElement, videoElement, buttonSelectors) {
            this.player = playerElement;
            this.video = videoElement;
            this.buttons = {};
            this.actions = {};
            this._initializeButtons(buttonSelectors);
        }

        async _initializeButtons(selectors) {
            const buttonEntries = await Promise.all(
                Object.entries(selectors).map(async ([key, selector]) => {
                    const element = await waitForElementAsync(selector);
                    if (!element)
                        customLog.error(`[EventMapper] '${key}' 버튼을 찾을 수 없습니다. (셀렉터: ${selector})`);
                    return [key, element];
                }),
            );

            this.buttons = Object.fromEntries(buttonEntries.filter((entry) => entry[1]));
            this._defineActions();

            customLog.log("[EventMapper] 모든 버튼이 준비되었습니다.", this.buttons);
            this.player.dispatchEvent(new Event("mapper-ready"));
        }

        _defineActions() {
            this.actions = {
                none: () => {
                    return;
                },
                toggleMute: () => {
                    if (!this.buttons.mute) return;
                    this.buttons.mute.click();
                    setTimeout(() => {
                        displayCenterVolume(this.video.muted, this.video.volume);
                    }, 50);
                },
                togglePause: () => {
                    if (!this.buttons.pause) return;
                    const computedStyle = window.getComputedStyle(this.buttons.pause);
                    if (computedStyle.display === "none") {
                        return;
                    }
                    this.buttons.pause.click();
                },
                toggleStop: () => {
                    if (!this.buttons.stop) return;
                    this.buttons.stop.click();
                },
                toggleScreenMode: () => {
                    if (!this.buttons.screenMode) return;
                    this.buttons.screenMode.click();
                },
                toggleFullscreen: () => {
                    if (!this.buttons.fullscreen) return;
                    this.buttons.fullscreen.click();
                },
            };
        }

        // 이벤트를 특정 액션에 매핑하는 핵심 메소드 (키보드 관련 로직 제거됨)
        map(eventType, actionName) {
            if (typeof this.actions[actionName] !== "function") {
                customLog.error(`[EventMapper] '${actionName}'은(는) 유효한 액션이 아닙니다.`);
                return;
            }

            const listener = (event) => {
                // 비디오 영역 클릭 시에만 동작하도록 제한
                if (event.target.id !== "videoLayerCover" && event.target !== this.player) {
                    return;
                }
                event.preventDefault(); // 우클릭 메뉴, 더블클릭 선택 등 기본 동작 방지

                // 매핑된 액션 실행
                this.actions[actionName]();
            };

            // 플레이어에 마우스 이벤트 리스너 추가
            this.player.addEventListener(eventType, listener);
        }

        // 설정 객체를 받아와서 모든 매핑을 한 번에 적용 (키보드 관련 로직 제거됨)
        applyConfiguration(config) {
            for (const eventType in config) {
                const actionName = config[eventType];
                this.map(eventType, actionName);
            }
            customLog.log("[EventMapper] 사용자 설정이 적용되었습니다.", config);
        }
    }

    const checkSidebarVisibility = () => {
        let intervalId = null;
        let lastExecutionTime = Date.now(); // 마지막 실행 시점 기록

        const handleVisibilityChange = () => {
            const body = document.body;
            const isScreenmode = body.classList.contains("screen_mode");
            const isShowSidebar = body.classList.contains("showSidebar");
            const isFullScreenmode = body.classList.contains("fullScreen_mode");
            const isSidebarHidden = (isScreenmode ? !isShowSidebar : false) || isFullScreenmode;
            const webplayer = document.getElementById("webplayer");
            const webplayerStyle = webplayer?.style;
            const sidebar = document.getElementById("sidebar");

            // 스크린 모드에서 사이드바 항상 보이는 옵션
            if (webplayer && isScreenmode && showSidebarOnScreenModeAlways && !isShowSidebar) {
                body.classList.add("showSidebar");
                webplayer.style.left = "0px";
                webplayer.style.left = sidebar.offsetWidth + "px";
                webplayer.style.width = `calc(100vw - ${sidebar.offsetWidth}px)`;
            }

            // 사이드바가 보이는 상태에서 스크린 모드 종료할 때
            if (webplayer && !isScreenmode && isShowSidebar) {
                body.classList.remove("showSidebar");
                webplayerStyle.removeProperty("width");
                webplayerStyle.removeProperty("left");
            }

            if (document.visibilityState === "visible" && isSidebarHidden) {
                customLog.log("#sidebar는 숨겨져 있음");
                return;
            }

            const currentTime = Date.now();
            const timeSinceLastExecution = (currentTime - lastExecutionTime) / 1000; // 초 단위로 변환

            if (document.visibilityState === "visible" && timeSinceLastExecution >= 60) {
                customLog.log("탭 활성화됨");
                generateBroadcastElements(1);
                lastExecutionTime = currentTime; // 갱신 시점 기록
                restartInterval(); // 인터벌 재시작
            } else if (document.visibilityState === "visible") {
                customLog.log("60초 미만 경과: 방송 목록 갱신하지 않음");
            } else {
                customLog.log(`탭 비활성화됨: 마지막 갱신 = ${parseInt(timeSinceLastExecution)}초 전`);
            }
        };

        const restartInterval = () => {
            if (intervalId) clearInterval(intervalId); // 기존 인터벌 중단

            intervalId = setInterval(() => {
                handleVisibilityChange();
            }, 60 * 1000); // 60초마다 실행
        };

        (async () => {
            const sidebarDiv = await waitForElementAsync("#sidebar");
            observeClassChanges("body", handleVisibilityChange);
            restartInterval(); // 인터벌 시작
            document.addEventListener("visibilitychange", handleVisibilityChange);
        })();
    };
    const processStreamers = () => {
        const processedLayers = new Set(); // 처리된 레이어를 추적

        // 버튼 생성 및 클릭 이벤트 처리
        const createHideButton = (listItem, optionsLayer) => {
            const hideButton = document.createElement("button"); // "숨기기" 버튼 생성
            hideButton.type = "button";

            const span = document.createElement("span");
            span.textContent = "이 브라우저에서 스트리머 숨기기";

            hideButton.appendChild(span);

            // 클릭 이벤트 추가
            hideButton.addEventListener("click", () => {
                const userNameElement = listItem.querySelector("a.nick > span"); // 사용자 이름 요소
                const userIdElement = listItem.querySelector(".cBox-info > a"); // 사용자 ID 요소

                if (userNameElement && userIdElement) {
                    const userId = userIdElement.href.split("/")[3]; // 사용자 ID 추출
                    const userName = userNameElement.innerText; // 사용자 이름 추출

                    customLog.log(`Blocking user: ${userName}, ID: ${userId}`); // 로그 추가

                    if (userId && userName) {
                        blockUser(userName, userId); // 사용자 차단 함수 호출
                        listItem.style.display = "none";
                    }
                } else {
                    customLog.log("User elements not found."); // 요소가 없을 경우 로그 추가
                }
            });

            optionsLayer.appendChild(hideButton); // 옵션 레이어에 버튼 추가
        };
        /*  */
        const createCategoryHideButton = (listItem, optionsLayer) => {
            const hideButton = document.createElement("button"); // "숨기기" 버튼 생성
            hideButton.type = "button";

            const span = document.createElement("span");
            span.textContent = "이 브라우저에서 해당 카테고리 숨기기";

            hideButton.appendChild(span);

            // 클릭 이벤트 추가 [data-type=cBox] .cBox-info .tag_wrap a.category
            hideButton.addEventListener("click", () => {
                const categoryElement = listItem.querySelector(".cBox-info .tag_wrap a.category");

                if (categoryElement) {
                    const categoryName = categoryElement.textContent;
                    const categoryNo = getCategoryNo(categoryName);
                    if (categoryName && categoryNo) {
                        blockCategory(categoryName, categoryNo);
                    }
                } else {
                    customLog.log("User elements not found."); // 요소가 없을 경우 로그 추가
                }
            });

            optionsLayer.appendChild(hideButton); // 옵션 레이어에 버튼 추가
        };
        const createCategoryPinButton = (listItem, optionsLayer) => {
            const pinButton = document.createElement("button");
            pinButton.type = "button";
            const span = document.createElement("span");
            span.textContent = "이 카테고리를 탭에 추가";
            pinButton.appendChild(span);
            pinButton.addEventListener("click", () => {
                const categoryElement = listItem.querySelector(".cBox-info .tag_wrap a.category");
                if (categoryElement) {
                    const categoryName = categoryElement.textContent;
                    const categoryNo = getCategoryNo(categoryName);
                    if (categoryName && categoryNo) {
                        pinCategory(categoryName, categoryNo);
                    }
                }
            });
            const blockCategoryButton = Array.from(optionsLayer.querySelectorAll("button")).find((btn) =>
                btn.textContent.includes("카테고리 숨기기"),
            );
            if (blockCategoryButton) {
                blockCategoryButton.insertAdjacentElement("afterend", pinButton);
            } else {
                optionsLayer.appendChild(pinButton);
            }
        };

        // DOM 변경 감지 및 처리
        const handleDOMChange = (mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === "childList") {
                    const moreOptionsContainer = document.querySelector("div._moreDot_wrapper"); // 추가 옵션 컨테이너
                    const optionsLayer = moreOptionsContainer
                        ? moreOptionsContainer.querySelector("div._moreDot_layer")
                        : null; // 옵션 레이어

                    if (optionsLayer && optionsLayer.style.display !== "none" && !processedLayers.has(optionsLayer)) {
                        const activeButton = document.querySelector("button.more_dot.on"); // 활성화된 버튼
                        const listItem = activeButton.closest('li[data-type="cBox"]'); // 가장 가까운 리스트 아이템 찾기

                        if (listItem) {
                            createHideButton(listItem, optionsLayer); // 숨기기 버튼 생성
                            createCategoryHideButton(listItem, optionsLayer);
                            createCategoryPinButton(listItem, optionsLayer); // Add the pin button
                            processedLayers.add(optionsLayer); // 이미 처리된 레이어로 추가
                        }
                    } else if (!optionsLayer) {
                        processedLayers.clear(); // 요소가 없을 때 처리된 레이어 초기화
                    }

                    // cBox-list의 리스트 아이템 처리
                    const cBoxListItems = document.querySelectorAll(
                        'div.cBox-list li[data-type="cBox"]:not(.hide-checked)',
                    );

                    // cBoxListItems를 for...of 루프로 반복
                    for (const listItem of cBoxListItems) {
                        listItem.classList.add("hide-checked");
                        const userIdElement = listItem.querySelector(".cBox-info > a"); // 사용자 ID 요소
                        const categoryElement = listItem.querySelector(".cBox-info .tag_wrap a.category");

                        if (userIdElement) {
                            const userId = userIdElement.href.split("/")[3]; // 사용자 ID 추출

                            // 차단된 사용자일 경우 li 삭제
                            if (isUserBlocked(userId)) {
                                listItem.style.display = "none";
                                customLog.log(`Removed blocked user with ID: ${userId}`); // 로그 추가
                            }
                        }

                        if (categoryElement) {
                            const categoryName = categoryElement.textContent;
                            if (isCategoryBlocked(getCategoryNo(categoryName))) {
                                listItem.style.display = "none";
                                customLog.log(`Removed blocked category with Name: ${categoryName}`); // 로그 추가
                            }
                        }
                    }

                    // 빈 썸네일 대체
                    if (isReplaceEmptyThumbnailEnabled) {
                        const noThumbsBoxLinks = Array.from(
                            document.querySelectorAll("[data-type=cBox] .thumbs-box .status.adult"),
                        )
                            .map((statusElement) => statusElement.closest(".thumbs-box")?.querySelector("a[href]"))
                            .filter((link) => link && !link.href.startsWith("https://vod.sooplive.com"));
                        if (noThumbsBoxLinks.length) replaceThumbnails(noThumbsBoxLinks);
                    }

                    // 본문 방송 목록의 새 탭 열기 방지
                    if (!isOpenNewtabEnabled) {
                        setTimeout(removeTargetFromLinks, 100);
                    }
                }
            }
        };

        const observer = new MutationObserver(handleDOMChange); // DOM 변경 감지기

        const config = { childList: true, subtree: true };

        observer.observe(document.body, config);
    };

    const showSidebarOnMouseOver = () => {
        const sidebar = document.getElementById("sidebar");
        const videoLayer = document.getElementById("player");
        const webplayerContents = document.getElementById("webplayer");
        const body = document.body;
        webplayerContents.style.left = "0px";
        webplayerContents.style.width = "100vw";

        const handleSidebarMouseOver = () => {
            if (body.classList.contains("screen_mode") && !body.classList.contains("showSidebar")) {
                body.classList.add("showSidebar");
                webplayerContents.style.left = sidebar.offsetWidth + "px";
                webplayerContents.style.width = `calc(100vw - ${sidebar.offsetWidth}px)`;
            }
        };

        const handleSidebarMouseOut = () => {
            if (body.classList.contains("screen_mode") && body.classList.contains("showSidebar")) {
                body.classList.remove("showSidebar");
                webplayerContents.style.left = "0px";
                webplayerContents.style.width = "100vw";
            }
        };

        const mouseMoveHandler = (event) => {
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            if (!body.classList.contains("showSidebar")) {
                // videoLayer 기반 높이 50%와 전체 창 높이의 25% 중 더 작은 값을 사용합니다.
                const triggerHeight = Math.min(videoLayer.clientHeight / 2, window.innerHeight / 4);

                if (mouseX < 52 && mouseY > 100 && mouseY < triggerHeight) {
                    handleSidebarMouseOver();
                }
            } else {
                if (mouseX < sidebar.clientWidth && mouseY < sidebar.clientHeight) {
                    handleSidebarMouseOver();
                } else {
                    handleSidebarMouseOut();
                }
            }
        };

        const windowMouseOutHandler = (event) => {
            if (!event.relatedTarget && !event.toElement) {
                handleSidebarMouseOut();
            }
        };

        document.addEventListener("mousemove", mouseMoveHandler);
        window.addEventListener("mouseout", windowMouseOutHandler); // 창 벗어남 감지
    };

    const setupKeydownHandler = (targetCode, toggleFunction) => {
        document.addEventListener(
            "keydown",
            (event) => {
                if (event.code === targetCode && !isUserTyping()) {
                    toggleFunction();
                }
            },
            true,
        );
    };
    const toggleSharpModeShortcut = () => {
        setupKeydownHandler("KeyE", togglesharpModeCheck); // E 키
        updateLabel("clear_screen", "선명한 모드", "선명한 모드(e)");
    };
    const toggleLowLatencyShortcut = () => {
        setupKeydownHandler("KeyD", toggleDelayCheck); // D 키
        updateLabel("delay_check", "시차 단축", "시차 단축(d)");
    };
    const updateLabel = (forId, oldText, newText) => {
        const labelElement = document.body.querySelector(`#player label[for="${forId}"]`);
        if (labelElement) {
            labelElement.innerHTML = labelElement.innerHTML.replace(oldText, newText);
        } else {
            customLog.error("Label element not found.");
        }
    };
    const togglesharpModeCheck = () => {
        const sharpModeCheckElement = document.getElementById("clear_screen");
        if (sharpModeCheckElement) {
            sharpModeCheckElement.click();
            showPlayerBar("quality_box");
        }
    };
    const toggleDelayCheck = () => {
        if (isAdjustDelayNoGridEnabled) {
            moveToLatestBufferedPoint();
        } else {
            const delayCheckElement = document.getElementById("delay_check");
            if (delayCheckElement) {
                delayCheckElement.click();
                showPlayerBar("setting_box");
            }
        }
    };
    const showPlayerBar = (target) => {
        const player = document.getElementById("player");
        player.classList.add("mouseover");

        let settingButton, settingBoxOn;
        if (target === "quality_box") {
            settingButton = document.body.querySelector("#player button.btn_quality_mode");
            settingBoxOn = document.body.querySelector(".quality_box.on");
        } else if (target === "setting_box") {
            settingButton = document.body.querySelector("#player button.btn_setting");
            settingBoxOn = document.body.querySelector(".setting_box.on");
        }

        if (settingButton) {
            if (!settingBoxOn) {
                settingButton.click();
            }
            setTimeout(() => {
                // 현재 열려있는(on 클래스를 가진) 설정 박스를 찾습니다.
                const openBox = document.body.querySelector(".quality_box.on, .setting_box.on");
                // 만약 있다면 .on 클래스를 제거합니다.
                if (openBox) {
                    openBox.classList.remove("on");
                }

                player.classList.remove("mouseover"); // 이 코드는 그대로 유지합니다.
            }, 1500);
        } else {
            // 버튼을 못 찾았더라도 mouseover는 제거해줍니다.
            setTimeout(() => {
                player.classList.remove("mouseover");
            }, 1500);
            customLog.error("Setting button not found or not visible.");
        }
    };
    const moveToLatestBufferedPoint = () => {
        const video = document.querySelector("video");
        const buffered = video.buffered;

        if (buffered.length > 0) {
            // 버퍼링된 구간의 마지막 시간
            const bufferedEnd = buffered.end(buffered.length - 1);
            const targetTime = bufferedEnd - 2; // 2초 전으로 설정

            // targetTime이 현재 시간보다 뒤에 있을 경우에만 이동
            if (targetTime > video.currentTime) {
                video.currentTime = targetTime;
            }
        }
    };
    const checkPlayerPageHeaderAd = async () => {
        try {
            const headerAd = await waitForElementAsync("#header_ad", 5000);
            headerAd.remove();
        } catch (error) {
            customLog.info("헤더 광고가 없습니다. (정상)");
        }
    };
    const getRemainingBufferTime = (video) => {
        const buffered = video.buffered;
        if (buffered.length > 0) {
            // 마지막 버퍼의 끝과 현재 시간의 차이를 계산
            const remainingBufferTime = buffered.end(buffered.length - 1) - video.currentTime;

            // 0초 또는 정수일 경우 소수점 한 자리로 반환
            return remainingBufferTime >= 0 ? remainingBufferTime.toFixed(remainingBufferTime % 1 === 0 ? 0 : 1) : "";
        }
        return ""; // 버퍼가 없으면 빈 문자열 반환
    };
    const insertRemainingBuffer = (element) => {
        const video = element;
        const emptyChat = document.body.querySelector("#empty_chat");

        // video의 onprogress 이벤트 핸들러
        video.onprogress = () => {
            const remainingBufferTime = getRemainingBufferTime(video); // remainingBufferTime 계산
            if (emptyChat && remainingBufferTime !== "") {
                emptyChat.innerText = `${remainingBufferTime}s 지연됨`;
            }

            // broadState li 다음에 버퍼 시간 li 표시 (복수 위치 대응)
            document.querySelectorAll("[id='broadState']").forEach((broadState) => {
                const timeLi = broadState.closest("li");
                if (!timeLi) return;
                let bufferLi = timeLi.nextElementSibling;
                if (!bufferLi || !bufferLi.classList.contains("broadStateBuffer")) {
                    bufferLi = document.createElement("li");
                    bufferLi.classList.add("broadStateBuffer");
                    timeLi.insertAdjacentElement("afterend", bufferLi);
                }
                bufferLi.textContent = remainingBufferTime !== "" ? `${remainingBufferTime}s` : "";
            });

            latestBufferTime = remainingBufferTime;
            if (remainingBufferTime !== "") {
                const baseTitle = previousTitle || document.title.split(" ")[0];
                let title = baseTitle;
                if (isDocumentTitleUpdateEnabled && latestViewerSuffix) {
                    title += latestViewerSuffix;
                }
                title += ` • ${remainingBufferTime}s`;
                document.title = title;
            }
        };
    };
    const isVideoInPiPMode = () => {
        const videoElement = document.body.querySelector("video");
        return videoElement && document.pictureInPictureElement === videoElement;
    };
    const handleMuteByVisibility = () => {
        if (!isAutoChangeMuteEnabled || isVideoInPiPMode()) return;

        const button = document.body.querySelector("#btn_sound");

        if (document.hidden) {
            // 탭이 비활성화됨
            if (!button.classList.contains("mute")) {
                button.click();
                customLog.log("탭이 비활성화됨, 음소거");
            }
        } else {
            // 탭이 활성화됨
            if (button.classList.contains("mute")) {
                button.click();
                customLog.log("탭이 활성화됨, 음소거 해제");
            }
        }
    };
    const registerVisibilityChangeHandler = () => {
        document.addEventListener("visibilitychange", handleMuteByVisibility, true);
    };
    const handleVisibilityChangeForQuality = async () => {
        if (!isAutoChangeQualityEnabled || isVideoInPiPMode()) return;

        if (document.hidden) {
            customLog.log("[탭 상태] 비활성화됨");

            previousQualityBeforeDowngrade = getCurrentInternalQuality();
            previousIsAutoMode = getIsAutoQualityMode();

            if (!previousQualityBeforeDowngrade) {
                customLog.warn("[현재 화질] 정보를 가져오지 못함");
            } else {
                customLog.log(`[현재 화질 저장] ${previousQualityBeforeDowngrade} (자동모드: ${previousIsAutoMode})`);
            }

            qualityChangeTimeout = setTimeout(async () => {
                await changeQualityLivePlayer("LOW"); // LOW = 최저화질
                didChangeToLowest = true;
                customLog.log("[타이머 실행] 최저화질로 전환됨");
            }, 6500);

            customLog.log("[타이머] 몇 초 후 최저화질로 변경 예약됨");
        } else {
            customLog.log("[탭 상태] 활성화됨");

            if (qualityChangeTimeout) {
                clearTimeout(qualityChangeTimeout);
                qualityChangeTimeout = null;
                customLog.log("[타이머] 예약된 최저화질 변경 취소됨");
            }

            if (didChangeToLowest && previousQualityBeforeDowngrade) {
                const current = getCurrentInternalQuality();
                if (previousIsAutoMode) {
                    if (getIsAutoQualityMode()) {
                        customLog.log("[복귀] 이미 자동 모드이므로 변경 생략");
                    } else {
                        await changeQualityLivePlayer("AUTO");
                        customLog.log("[복귀] 자동 모드 복원됨");
                    }
                } else {
                    if (current === previousQualityBeforeDowngrade) {
                        customLog.log(`[복귀] 현재 화질(${current})과 동일하여 복원 생략`);
                    } else {
                        await changeQualityLivePlayer(previousQualityBeforeDowngrade);
                        customLog.log(`[복귀] 수동 화질 복원됨 → ${previousQualityBeforeDowngrade}`);
                    }
                }
            } else {
                customLog.log("[복귀] 화질 변경 없었으므로 복원 생략");
            }

            // 상태 초기화
            didChangeToLowest = false;
            previousQualityBeforeDowngrade = null;
            previousIsAutoMode = null;
        }
    };
    const registerVisibilityChangeHandlerForQuality = () => {
        document.addEventListener("visibilitychange", handleVisibilityChangeForQuality, true);
    };
    const videoSkipHandler = (e) => {
        const activeElement = document.activeElement;
        const tagName = activeElement.tagName.toLowerCase();

        // 입력란 활성화 여부 체크
        const isInputActive =
            tagName === "input" ||
            tagName === "textarea" ||
            activeElement.id === "write_area" ||
            activeElement.contentEditable === "true";

        // 입력란이 활성화되어 있지 않은 경우 비디오 제어
        if (!isInputActive) {
            const video = document.querySelector("video");
            if (video) {
                switch (e.code) {
                    case "ArrowRight":
                        // 오른쪽 방향키: 동영상을 1초 앞으로 이동
                        video.currentTime += 1;
                        break;
                    case "ArrowLeft":
                        // 왼쪽 방향키: 동영상을 1초 뒤로 이동
                        video.currentTime -= 1;
                        break;
                }
            }
        }
    };
    const homePageCurrentTab = async () => {
        try {
            const logoLink = await waitForElementAsync("#logo > a");
            logoLink.removeAttribute("target");
        } catch (error) {
            customLog.error("로고 링크 처리 실패:", error);
        }
    };
    const useBottomChat = () => {
        const toggleBottomChat = () => {
            const playerArea = document.querySelector("#player_area");
            if (!playerArea) {
                customLog.warn("#player_area 요소를 찾을 수 없습니다.");
                return;
            }

            const playerHeight = playerArea.getBoundingClientRect().height;
            const browserHeight = window.innerHeight;

            const isPortrait = window.innerHeight * 1.1 > window.innerWidth;

            document.body.classList.toggle("bottomChat", isPortrait);
        };

        window.addEventListener("resize", debounce(toggleBottomChat, 500));
        toggleBottomChat();
    };
    const getViewersNumber = (raw = false) => {
        const element = document.querySelector("#nAllViewer");

        if (!element) return "0";

        const rawNumber = element.innerText.replace(/,/g, "").trim();

        if (Boolean(raw)) {
            return rawNumber;
        }

        return addNumberSeparator(rawNumber);
    };
    const updateTitleWithViewers = () => {
        const originalTitle = document.title.split(" ")[0]; // 기존 제목의 첫 번째 단어
        const viewers = getViewersNumber(true); // 현재 시청자 수 갱신
        const formattedViewers = addNumberSeparatorAll(viewers); // 형식화된 시청자 수
        let title = originalTitle;

        if (originalTitle !== previousTitle) {
            previousViewers = 0; // 제목이 변경되면 이전 시청자 수 초기화
        }

        if (viewers && previousViewers) {
            if (viewers > previousViewers) {
                latestViewerSuffix = ` 🔺${formattedViewers}`;
            } else if (viewers < previousViewers) {
                latestViewerSuffix = ` 🔻${formattedViewers}`;
            } else {
                latestViewerSuffix = ` • ${formattedViewers}`; // 시청자 수가 변동 없을 때
            }
        } else {
            latestViewerSuffix = ` • ${formattedViewers}`; // 시청자 수가 변동 없을 때
        }

        title += latestViewerSuffix;

        if (isRemainingBufferTimeEnabled && latestBufferTime !== "") {
            title += ` • ${latestBufferTime}s`;
        }

        document.title = title; // 제목을 업데이트
        previousViewers = viewers; // 이전 시청자 수 업데이트
        previousTitle = originalTitle; // 현재 제목을 이전 제목으로 업데이트
    };

    const checkMediaInfo = async (mediaName, isAutoLevelEnabled) => {
        if (mediaName !== "original" || isAutoLevelEnabled) {
            // 원본 화질로 설정되지 않은 경우 or 자동 화질 선택인 경우
            const player = await waitForElementAsync("#player");
            player.className = "video mouseover ctrl_output";

            // 설정 버튼 클릭
            const settingButton = await waitForElementAsync(
                "#player > div.player_ctrlBox > div.ctrlBox > div.right_ctrl .setting_box > button.btn_setting",
            );
            settingButton.click();

            // 화질 변경 리스트 대기
            const settingList = await waitForElementAsync(
                "#player > div.player_ctrlBox > div.ctrlBox > div.right_ctrl .setting_box.on .setting_list",
            );
            const spanElement = Array.from(settingList.querySelectorAll("span")).find((el) =>
                el.textContent.includes("화질 변경"),
            );
            const buttonElement = spanElement.closest("button");
            buttonElement.click();

            // 두 번째 설정 대기
            const resolutionButton = await waitForElementAsync(
                "#player > div.player_ctrlBox > div.ctrlBox > div.right_ctrl .setting_box .setting_list_subLayer ul > li:nth-child(2) > button",
            );
            resolutionButton.click();
            resolutionButton.className = "video";
        }
    };
    const getCurrentInternalQuality = () => {
        try {
            const playerInfo = unsafeWindow.LivePlayer.getPlayerInfo();
            return playerInfo?.quality || null;
        } catch (e) {
            customLog.warn("[getCurrentInternalQuality] 오류 발생:", e);
            return null;
        }
    };
    const getIsAutoQualityMode = () => {
        try {
            const playerInfo = unsafeWindow.LivePlayer.getPlayerInfo();
            return !!playerInfo?.qualityInfo?.isAuto;
        } catch (e) {
            customLog.warn("[getIsAutoQualityMode] 오류 발생:", e);
            return false;
        }
    };
    const changeQualityLivePlayer = async (qualityName) => {
        const current = getCurrentInternalQuality();
        if (current === qualityName) {
            customLog.log(`[화질 변경 스킵] 현재(${current}) = 요청(${qualityName})`);
            return;
        }

        try {
            unsafeWindow.livePlayer.changeQuality(qualityName);
            customLog.log(`[화질 변경] → ${qualityName}`);
        } catch (e) {
            customLog.warn("[changeQualityLivePlayer] 변경 실패:", e);
        }
    };
    const selectPreferredQuality = async () => {
        try {
            const livePlayer = await waitForLivePlayer();
            const info = await livePlayer.getLiveInfo();
            const presets = info.CHANNEL.VIEWPRESET.filter((p) => p.name !== "auto" && p.bps);

            if (!presets || presets.length === 0) {
                customLog.warn("화질 정보를 찾을 수 없습니다.");
                return;
            }

            presets.sort((a, b) => parseInt(b.label_resolution || 0) - parseInt(a.label_resolution || 0));

            let targetPreset;

            if (preferredQualitySetting === "max") {
                targetPreset = presets[0];
            } else {
                const targetRes = parseInt(preferredQualitySetting);
                targetPreset = presets.find((p) => parseInt(p.label_resolution || 0) === targetRes);
                if (!targetPreset) {
                    // 정확한 화질이 없으면 가장 가까운 낮은 화질 선택
                    const lower = presets.filter((p) => parseInt(p.label_resolution || 0) <= targetRes);
                    targetPreset = lower.length > 0 ? lower[0] : presets[presets.length - 1];
                }
            }

            const targetName = qualityNameToInternalType[targetPreset.name];

            if (!targetName) {
                customLog.warn(`화질 ${targetPreset.name}에 대한 매핑이 없습니다.`);
                return;
            }

            customLog.log(`화질 ${targetPreset.label}(${targetName})로 변경 시도`);
            livePlayer.changeQuality(targetName);
        } catch (e) {
            customLog.error(e.message);
        }
    };

    const initializeQualityShortcuts = () => {
        // --- 1. 상태 관리 변수 ---
        let shortcutMap = new Map();
        let isKeyListenerAdded = false;

        // --- 2. 핵심 로직 함수 ---
        const setupQualityShortcuts = async (targetDiv) => {
            try {
                const qualityBox = targetDiv || document.querySelector(".quality_box ul");
                // 화질 목록이 없거나, 화질 목록의 li 요소가 없으면 실행 중단 (안정성 강화)
                if (!qualityBox || !qualityBox.querySelector("li")) {
                    customLog.log("화질 목록을 찾을 수 없어 단축키 설정을 건너뜁니다.");
                    return;
                }

                customLog.log("화질 목록 변경 감지. 단축키를 업데이트합니다.");
                const livePlayer = await waitForLivePlayer();
                const info = await livePlayer.getLiveInfo();
                const presets = info.CHANNEL.VIEWPRESET;

                if (!presets || presets.length === 0) return;

                // (이하 화질 정렬, 버튼 매핑, 단축키 설정 로직은 원본과 동일)
                presets.sort((a, b) => {
                    if (a.name === "auto") return -1;
                    if (b.name === "auto") return 1;
                    return parseInt(b.label_resolution || 0) - parseInt(a.label_resolution || 0);
                });

                const buttonMap = new Map();
                qualityBox.querySelectorAll("li button").forEach((btn) => {
                    if (btn.closest("li")?.style.display !== "none") {
                        const span = btn.querySelector("span");
                        if (span) {
                            const currentText = span.textContent.split(" (")[0].trim();
                            buttonMap.set(currentText, btn);
                        }
                    }
                });

                const newShortcutMap = new Map();
                const shortcutKeys = ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

                presets.forEach((preset, index) => {
                    if (index >= shortcutKeys.length) return;
                    const button = buttonMap.get(preset.label);
                    if (button) {
                        const shortcutKey = shortcutKeys[index];
                        const internalType = qualityNameToInternalType[preset.name];
                        if (internalType) {
                            newShortcutMap.set(shortcutKey, internalType);
                            button.querySelector("span").textContent = `${preset.label} (${shortcutKey})`;
                        }
                    }
                });

                shortcutMap = newShortcutMap;
            } catch (e) {
                customLog.error("화질 단축키 설정 중 오류 발생:", e);
            }
        };

        // --- 3. 이벤트 핸들러 ---
        const handleQualityKeyDown = async (event) => {
            if (isUserTyping()) return;
            const key = event.key === "~" ? "`" : event.key;
            if (shortcutMap.has(key)) {
                event.preventDefault();
                const targetQuality = shortcutMap.get(key);
                try {
                    showPlayerBar();
                    const livePlayer = await waitForLivePlayer();
                    livePlayer.changeQuality(targetQuality);
                } catch (e) {
                    customLog.error("화질 변경에 실패했습니다.", e);
                }
            }
        };

        // --- 4. 기능 설치 로직 ---

        // 키보드 리스너는 한 번만 설치
        if (!isKeyListenerAdded) {
            document.addEventListener("keydown", handleQualityKeyDown, true);
            isKeyListenerAdded = true;
        }

        // 디바운스가 적용된 단축키 설정 함수 생성
        const debouncedSetup = debounce(setupQualityShortcuts, 1000);
        (async () => {
            const qualityBoxDiv = await waitForElementAsync(".quality_box ul");
            setupQualityShortcuts(qualityBoxDiv);
        })();
        observeUrlChanges(() => {
            setTimeout(setupQualityShortcuts, 2000);
        });
    };
    /**
     * 탭 동기화 기능을 관리하는 매니저 객체를 생성하고 반환합니다.
     * @param {object} options - 설정 객체
     * @param {function(string[]): void} [options.onUpdate] - 탭 목록이 변경될 때마다 호출될 콜백 함수. URL 배열을 인자로 받습니다.
     * @param {string} [options.urlPattern] - 유저 ID와 방송 ID를 감지할 URL 패턴. 예: "/play/{userId}/{broadcastId}"
     * @param {number} [options.heartbeatIntervalMs=5000] - Heartbeat 주기 (밀리초)
     * @param {number} [options.timeoutMs=10000] - 탭 만료 시간 (밀리초)
     * @returns {{isTargetTabOpen: (function(string, string): boolean), getActiveTabs: (function(): string[]), destroy: (function(): void)}}
     */
    function createTabSyncManager(options = {}) {
        // --- 1. 설정 및 내부 상태 변수 ---
        const {
            onUpdate,
            urlPattern = "/{userId}/{broadcastId}", // 기본 URL 패턴 정의
            heartbeatIntervalMs = 1000,
            timeoutMs = 10000,
        } = options;

        const channel = new BroadcastChannel("sooplive_tab_tracker");
        const tabId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const activeTabs = {}; // 다른 탭들의 정보
        let currentUrls = []; // 자기 자신을 포함한 전체 URL 목록 (내부 상태)

        // --- 2. 내부 헬퍼 함수 ---
        const now = () => Date.now();
        const debounce = (func, delay) => {
            let timeoutId;
            return (...args) => {
                clearTimeout(timeoutId);
                setTimeout(() => func.apply(this, args), delay);
            };
        };

        const broadcast = (type) => {
            // 현재 URL을 항상 최신으로 유지
            channel.postMessage({ type, tabId, url: location.href, timestamp: now() });
        };

        const _updateListeners = () => {
            // 만료된 탭 정리
            const cutoff = now() - timeoutMs;
            for (const id in activeTabs) {
                if (activeTabs[id].lastSeen < cutoff) delete activeTabs[id];
            }

            // 최신 URL 목록 생성
            const allUrls = [location.href, ...Object.values(activeTabs).map(({ url }) => url)];
            currentUrls = [...new Set(allUrls)]; // 내부 상태 업데이트

            // 외부 콜백 호출
            if (typeof onUpdate === "function") {
                onUpdate(currentUrls);
            }
        };

        const updateListeners = debounce(_updateListeners, 100);

        // --- 3. 이벤트 핸들러 및 초기화 ---
        channel.onmessage = (e) => {
            const { type, tabId: senderId, url, timestamp } = e.data || {};
            if (!senderId || !url || senderId === tabId) return;
            if (type === "join" || type === "heartbeat") activeTabs[senderId] = { url, lastSeen: timestamp };
            else if (type === "leave") delete activeTabs[senderId];
            updateListeners();
        };

        const intervalId = setInterval(() => broadcast("heartbeat"), heartbeatIntervalMs);
        window.addEventListener("beforeunload", () => destroy());

        // 초기 진입 메시지 및 상태 업데이트
        broadcast("join");
        updateListeners();

        // --- 4. 외부로 공개될 API 메소드 ---

        /**
         * 특정 방송 탭이 열려 있는지 확인합니다.
         * @param {string} userId - 확인할 유저 아이디
         * @param {string} broadcastId - 확인할 방송 번호
         * @returns {boolean}
         */
        function isTargetTabOpen(userId, broadcastId) {
            if (!userId || !broadcastId) return false;

            // urlPattern을 기반으로 실제 찾을 경로 조각을 만듭니다.
            const targetPath = urlPattern.replace("{userId}", userId).replace("{broadcastId}", broadcastId);

            return currentUrls.some((url) => url.includes(targetPath));
        }

        /**
         * 현재 활성화된 모든 탭의 URL 목록을 반환합니다.
         * @returns {string[]}
         */
        function getActiveTabs() {
            return [...currentUrls]; // 외부에서 수정하지 못하도록 복사본 반환
        }

        /**
         * 모든 동기화 작업을 중지하고 리소스를 정리합니다.
         */
        function destroy() {
            broadcast("leave");
            clearInterval(intervalId);
            channel.close();
            // 필요하다면 onUpdate 콜백도 null 처리
            customLog.log("TabSyncManager가 종료되었습니다.");
        }

        // --- 5. API 객체 반환 ---
        return {
            isTargetTabOpen,
            getActiveTabs,
            destroy,
        };
    }

    // 3.6. 스크립트 실행 관리 함수 (Execution Management)
    const runCommonFunctions = () => {
        if (isCustomSidebarEnabled) {
            //orderSidebarSection();
            hideUsersSection();
            generateBroadcastElements(0);
            checkSidebarVisibility();
        }
        setupSettingButtonTopbar();

        blockedUsers.forEach(function (user) {
            registerUnblockMenu(user);
        });

        blockedCategories.forEach(function (category) {
            registerCategoryUnblockMenu(category);
        });

        pinnedCategories.forEach(function (category) {
            registerCategoryUnpinMenu(category);
        });
    };
    const hideUsersSection = () => {
        const styles = [
            !displayMyplus && "#sidebar .myplus { display: none !important; }",
            !displayMyplusvod && "#sidebar .myplusvod { display: none !important; }",
            !displayTop && "#sidebar .top { display: none !important; }",
        ]
            .filter(Boolean)
            .join(" "); // 빈 값 제거 및 합침

        if (styles) {
            GM_addStyle(styles);
        }
    };
    const removeTargetFromLinks = () => {
        try {
            const links = document.querySelectorAll("#container a[target], .side_list a[target]");
            links.forEach((link) => {
                link.removeAttribute("target");
            });
        } catch (error) {
            customLog.error("target 속성 제거 중 오류 발생:", error);
        }
    };
    class VODHighlightScanner {
        #API_URL = "https://apisabana.sooplive.com/service/vod_star2_stats.php";
        #CHAPTER_API_URL = "https://stbbs.sooplive.com/api/chapter/Controllers/ChapterListController.php";
        #vodCore;
        #videoInfo = {};
        #highlights = [];
        #isScanCompleted = false;
        #modal = null;
        #controlButton = null;

        constructor(vodCore, bbsNo) {
            if (!vodCore || !bbsNo) throw new Error("vodCore 또는 bbsNo 객체가 누락되었습니다.");

            this.#vodCore = vodCore;
            this.#videoInfo = {
                nTitleNo: vodCore.config.titleNo || vodCore.config.title_no,
                nStationNo: vodCore.config.stationNo || vodCore.config.station_no,
                nBbsNo: bbsNo,
                szLoginId: vodCore.config.loginId || "",
            };

            if (!this.#videoInfo.nTitleNo || !this.#videoInfo.nStationNo || !this.#videoInfo.nBbsNo) {
                throw new Error(`필수 파라미터가 누락되었습니다: ${JSON.stringify(this.#videoInfo)}`);
            }
            this.#modal = new DraggableResizableModal("vod-highlight-scanner", "VOD 하이라이트");
            this.#setupControlButton();
        }

        static #secondsToHMS(seconds) {
            seconds = Math.floor(seconds);
            const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
            const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
            const s = String(seconds % 60).padStart(2, "0");
            return `[${h}:${m}:${s}]`;
        }

        // [수정] 버튼 클릭 시 토글 동작을 하도록 onclick 핸들러 변경
        #setupControlButton() {
            const chatWrap = document.querySelector(".chatting-item-wrap");
            if (chatWrap) {
                this.#controlButton = document.createElement("button");
                this.#controlButton.id = "hl-control-btn";
                this.#controlButton.className = "chat-icon statistics-icon_54334 statistics";
                this.#controlButton.onclick = () => {
                    if (this.#isScanCompleted) {
                        this.#modal.isVisible() ? this.hidePanel() : this.showPanel();
                    } else {
                        this.startScan();
                    }
                };
                chatWrap.appendChild(this.#controlButton);
                this.#updateButton("", false);
            }
        }

        #updateButton(text, disabled) {
            if (this.#controlButton) {
                this.#controlButton.textContent = text;
                this.#controlButton.disabled = disabled;
            }
        }
        #showNotification(message, isError = false) {
            this.#modal?.showNotification(message, isError);
        }

        async startScan() {
            if (!this.#videoInfo.szLoginId) {
                this.showPanel();
                this.#showNotification("비로그인 (일부 기능 제한)", false, 5000);
            }
            this.#updateButton("", true);
            this.#highlights = [];

            try {
                const chapterApiUrl = `${this.#CHAPTER_API_URL}?nTitleNo=${this.#videoInfo.nTitleNo}&szFileType=REVIEW`;
                const chapterPromise = fetch(chapterApiUrl, { credentials: "include" }).then((res) => res.json());

                const menuParams = new URLSearchParams({
                    szAction: "list",
                    nDeviceType: "1",
                    szSysType: "html5",
                    nTitleNo: this.#videoInfo.nTitleNo,
                    szLang: "ko_KR",
                    szLoginId: this.#videoInfo.szLoginId,
                });
                const menuPromise = fetch(this.#API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: menuParams.toString(),
                    credentials: "include",
                }).then((res) => res.json());

                const [chapterResult, menuData] = await Promise.all([chapterPromise, menuPromise]);

                if (chapterResult?.result === 1 && chapterResult.data) {
                    chapterResult.data.forEach((chapter) => {
                        this.#highlights.push({ seconds: chapter.time_sec, description: `[🚩챕터] ${chapter.title}` });
                    });
                }

                if (menuData?.result === 1 && menuData.data) {
                    const excludedModules = new Set(["BjFavView", "BjHappy", "BjUpCnt"]);
                    const dataPromises = menuData.data
                        .filter((module) => !excludedModules.has(module.module_name))
                        .map((module) => {
                            const viewParams = new URLSearchParams({
                                szAction: "view",
                                nDeviceType: "1",
                                nTitleNo: this.#videoInfo.nTitleNo,
                                szLang: "ko_KR",
                                nStationNo: this.#videoInfo.nStationNo,
                                nBbsNo: this.#videoInfo.nBbsNo,
                                szType: module.data_type === "1" ? "user" : "bj",
                                szModule: module.module_name,
                                nIdx: module.idx,
                                szSysType: "html5",
                                szLoginId: this.#videoInfo.szLoginId,
                            });
                            return fetch(this.#API_URL, {
                                method: "POST",
                                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                                body: viewParams.toString(),
                                credentials: "include",
                            })
                                .then((res) => res.json())
                                .then((data) => ({ module, data }));
                        });

                    const allData = await Promise.all(dataPromises);
                    for (const { module, data } of allData) {
                        if (data.result !== 1 || !data.data) continue;
                        const { title } = module;

                        if (data.data.cnt && Array.isArray(data.data.cnt) && data.data.cnt.length > 0) {
                            let overallPeak = { minute: -1, value: -1 };
                            for (const [minute, value] of data.data.cnt) {
                                if (value > overallPeak.value) {
                                    overallPeak = { minute, value };
                                }
                            }
                            if (overallPeak.minute !== -1) {
                                const unit = title.includes("채팅") ? "개" : "명";
                                const description = `🚀 최고 ${title.replace(" 그래프", "")}: ${overallPeak.value.toLocaleString()}${unit}`;
                                this.#highlights.push({ seconds: overallPeak.minute * 60, description });
                            }
                        } else if (
                            Array.isArray(data.data) &&
                            data.data.length > 0 &&
                            data.data[0]?.hasOwnProperty("duration")
                        ) {
                            data.data.forEach((item) => {
                                this.#highlights.push({ seconds: item.duration, description: title });
                            });
                        }
                    }
                }

                this.#highlights.sort((a, b) => a.seconds - b.seconds);
                this.#isScanCompleted = true;
                this.#updateButton("", false);
                this.#showNotification(`분석 완료! (${this.#highlights.length}개)`);
                this.showPanel();
            } catch (error) {
                this.#updateButton("", false);
                this.#showNotification(error.message, true);
            }
        }

        populatePanel() {
            const contentElement = this.#modal.getContentElement();
            if (!contentElement) return;

            this.#modal.setTitle(`VOD 하이라이트 (${this.#highlights.length}개)`);

            if (this.#highlights.length === 0) {
                contentElement.innerHTML = `<div style="padding:10px; color: #aaa;">분석된 하이라이트가 없습니다.</div>`;
                return;
            }

            const list = document.createElement("ul");
            list.style.cssText = "list-style:none; padding:5px; margin:0;";

            this.#highlights.forEach((activity) => {
                const item = document.createElement("li");
                item.style.cssText =
                    "display:flex; gap:12px; align-items:flex-start; padding:8px 10px; border-radius:4px; font-size:15px;";

                item.innerHTML = `
                <span class="timestamp" data-seconds="${activity.seconds}" style="font-size: 16px; color:#a9a9b3; cursor:pointer; white-space:nowrap; font-weight:bold; flex-shrink: 0; line-height: 1.5;">
                    ${VODHighlightScanner.#secondsToHMS(activity.seconds)}
                </span>
                <div class="description" style="font-size: 16px; color:#dcdcdc; line-height: 1.5;">
                    ${activity.description}
                </div>`;
                item.querySelector(".timestamp").onclick = () => {
                    this.#vodCore.seek(activity.seconds);
                };
                list.appendChild(item);
            });

            contentElement.innerHTML = "";
            contentElement.appendChild(list);
        }

        showPanel() {
            this.populatePanel();
            this.#modal.show();
        }

        hidePanel() {
            this.#modal.hide();
        }

        destroy() {
            this.#modal?.destroy();
            this.#controlButton?.remove();
        }
    }
    // 다른 스크립트와의 CSS 클래스 이름 충돌을 방지하기 위해 페이지 로드 시 한 번만 고유한 접미사를 생성합니다.
    const uniqueStyleSuffix = Math.random().toString(36).substring(2, 8);

    /**
     * 기본 클래스 이름에 고유한 접미사를 추가하여 스코프가 지정된 CSS 클래스 이름을 반환합니다.
     * @param {string} baseName 기본 클래스 이름
     * @returns {string} 고유한 접미사가 추가된 클래스 이름 (예: 'modal-header-a1b2c3')
     */
    const scopedClass = (baseName) => `${baseName}-${uniqueStyleSuffix}`;
    /**
     * 드래그 및 크기 조절이 가능한 재사용 가능한 모달 클래스입니다.
     * 위치, 크기, 표시 상태를 관리하고 localStorage에 상태를 저장합니다.
     * CSS 클래스 이름에 고유한 접미사를 사용하여 스타일 충돌을 방지합니다.
     */
    class DraggableResizableModal {
        #modalElement = null;
        #headerElement = null;
        #contentElement = null;
        #resizeHandleElement = null;
        #closeButton = null;
        #titleElement = null;
        #id = "";
        #localStorageKey = "";
        #initialState = {};

        #notificationElement = null;
        #notificationTimeout = null;

        constructor(id, title, initialState = {}) {
            this.#id = id;
            this.#localStorageKey = `MODAL_STATE_${this.#id}`;
            this.#initialState = {
                width: "400px",
                height: "400px",
                top: "150px",
                right: "150px",
                left: "auto",
                ...initialState,
            };
            this.#init(title);
        }

        #init(title) {
            this.#addStyles();
            this.#modalElement = document.createElement("div");
            this.#modalElement.id = this.#id;
            this.#modalElement.className = scopedClass("draggable-modal");
            this.#modalElement.style.display = "none";

            this.#modalElement.innerHTML = `
            <div class="${scopedClass("modal-header")}">
                <span class="${scopedClass("modal-header-title")}">${title}</span>
                <span class="${scopedClass("modal-notification")}"></span>
                <button class="${scopedClass("modal-close-btn")}">&times;</button>
            </div>
            <div class="${scopedClass("modal-content")}"></div>
            <div class="${scopedClass("modal-resize-handle")}"></div>
        `;

            document.body.appendChild(this.#modalElement);

            this.#headerElement = this.#modalElement.querySelector(`.${scopedClass("modal-header")}`);
            this.#contentElement = this.#modalElement.querySelector(`.${scopedClass("modal-content")}`);
            this.#resizeHandleElement = this.#modalElement.querySelector(`.${scopedClass("modal-resize-handle")}`);
            this.#closeButton = this.#modalElement.querySelector(`.${scopedClass("modal-close-btn")}`);
            this.#titleElement = this.#modalElement.querySelector(`.${scopedClass("modal-header-title")}`);
            this.#notificationElement = this.#modalElement.querySelector(`.${scopedClass("modal-notification")}`);

            this.#closeButton.onclick = () => this.hide();
            this.#initDraggableAndResizable();
            this.#loadState();
        }

        #addStyles() {
            const styleId = `draggable-modal-styles-${uniqueStyleSuffix}`;
            if (document.getElementById(styleId)) return;

            GM_addStyle(`
            .${scopedClass("draggable-modal")} { display: none; flex-direction: column; background-color: #202024; border: 1px solid #444; border-radius: 8px; box-shadow: 0 5px 20px rgba(0,0,0,0.4); z-index: 9999; color: #efeff1; min-width: 300px; min-height: 200px; position: fixed; overflow: hidden; }
            .${scopedClass("modal-header")} { padding: 10px 15px; background-color: #2a2a2e; cursor: move; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #444; color: #fff; }
            .${scopedClass("modal-header-title")} { font-weight: bold; pointer-events: none; flex-grow: 1; }
            .${scopedClass("modal-close-btn")} { background: none; border: none; color: #aaa; font-size: 20px; cursor: pointer; line-height: 1; margin-left: 10px; }
            .${scopedClass("modal-close-btn")}:hover { color: #fff; }
            .${scopedClass("modal-content")} { flex-grow: 1; overflow-y: auto; padding: 10px; background-color: #18181b; }
            .${scopedClass("modal-resize-handle")} { position: absolute; right: 0; bottom: 0; width: 15px; height: 15px; cursor: se-resize; z-index: 10000; }
            .${scopedClass("modal-resize-handle")}::after { content: ''; position: absolute; right: 2px; bottom: 2px; width: 8px; height: 8px; background: linear-gradient(135deg, transparent 40%, #888 40%, #888 60%, transparent 60%); pointer-events: none; }
            .${scopedClass("modal-notification")} { color: #6bff96; font-size: 13px; font-weight: bold; opacity: 0; transition: opacity 0.5s; pointer-events: none; text-align: right; margin: 0 10px; }
        `).id = styleId;
        }

        /**
         * [수정됨] 드래그 및 리사이즈 로직 개선
         * 모달이 창 밖으로 나가지 않도록 위치와 크기를 제한합니다.
         */
        #initDraggableAndResizable() {
            const panel = this.#modalElement;
            const header = this.#headerElement;
            const resizeHandle = this.#resizeHandleElement;
            let isDragging = false,
                isResizing = false,
                initial = {};

            const onDrag = (e) => {
                e.preventDefault();

                if (isDragging) {
                    // 1. 새로운 위치 계산
                    let newLeft = e.clientX - initial.x;
                    let newTop = e.clientY - initial.y;

                    // 2. 뷰포트 경계 계산 (모달의 크기 고려)
                    const maxLeft = window.innerWidth - panel.offsetWidth;
                    const maxTop = window.innerHeight - panel.offsetHeight;

                    // 3. 위치를 뷰포트 안으로 제한 (0보다 작거나, 최대값보다 크지 않게)
                    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
                    newTop = Math.max(0, Math.min(newTop, maxTop));

                    panel.style.top = `${newTop}px`;
                    panel.style.left = `${newLeft}px`;
                    panel.style.right = "auto";
                }

                if (isResizing) {
                    // 1. 리사이즈될 최대 너비와 높이 계산 (모달의 현재 위치 고려)
                    const maxWidth = window.innerWidth - panel.offsetLeft;
                    const maxHeight = window.innerHeight - panel.offsetTop;

                    // 2. 새로운 너비와 높이 계산
                    let newWidth = initial.w + (e.clientX - initial.x);
                    let newHeight = initial.h + (e.clientY - initial.y);

                    // 3. 크기를 최소/최대값 사이로 제한
                    newWidth = Math.max(300, Math.min(newWidth, maxWidth));
                    newHeight = Math.max(200, Math.min(newHeight, maxHeight));

                    panel.style.width = `${newWidth}px`;
                    panel.style.height = `${newHeight}px`;
                }
            };

            const stopActions = () => {
                if (isDragging || isResizing) this.#saveState();
                isDragging = isResizing = false;
                document.documentElement.style.userSelect = "";
                window.removeEventListener("mousemove", onDrag);
                window.removeEventListener("mouseup", stopActions);
            };

            header.addEventListener("mousedown", (e) => {
                if (e.target.closest(`.${scopedClass("modal-close-btn")}`)) return;
                isDragging = true;
                initial = { x: e.clientX - panel.offsetLeft, y: e.clientY - panel.offsetTop };
                document.documentElement.style.userSelect = "none";
                window.addEventListener("mousemove", onDrag);
                window.addEventListener("mouseup", stopActions);
            });

            resizeHandle.addEventListener("mousedown", (e) => {
                isResizing = true;
                initial = { x: e.clientX, y: e.clientY, w: panel.offsetWidth, h: panel.offsetHeight };
                document.documentElement.style.userSelect = "none";
                e.preventDefault();
                e.stopPropagation();
                window.addEventListener("mousemove", onDrag);
                window.addEventListener("mouseup", stopActions);
            });
        }

        #saveState() {
            const state = {
                width: this.#modalElement.style.width,
                height: this.#modalElement.style.height,
                top: this.#modalElement.style.top,
                left: this.#modalElement.style.left,
                right: this.#modalElement.style.right,
            };
            localStorage.setItem(this.#localStorageKey, JSON.stringify(state));
        }

        #loadState() {
            let savedState;
            try {
                savedState = JSON.parse(localStorage.getItem(this.#localStorageKey));
            } catch (e) {
                /* 무시 */
            }

            if (savedState) {
                Object.assign(this.#modalElement.style, savedState);
            } else {
                Object.assign(this.#modalElement.style, this.#initialState);
            }
        }

        /**
         * [수정됨] 모달이 화면 밖에 있는지 확인하고 위치를 리셋하는 메서드
         * display:none 상태의 요소는 좌표가 0이므로, 정확한 측정을 위해 잠시 투명하게 표시했다가 되돌립니다.
         */
        #resetPositionIfOffscreen() {
            // 1. 측정을 위해 잠시 투명하게 보이도록 설정
            this.#modalElement.style.visibility = "hidden";
            this.#modalElement.style.display = "flex";

            // 2. 이제 정확한 좌표를 측정할 수 있음
            const rect = this.#modalElement.getBoundingClientRect();

            // 3. 원래의 보이지 않는 상태로 즉시 복구
            this.#modalElement.style.display = "none";
            this.#modalElement.style.visibility = "visible";

            // 4. 측정된 좌표로 화면 밖에 있는지 판별 (여유 공간 50px)
            const isOffscreen =
                rect.bottom < 50 ||
                rect.right < 50 ||
                rect.top > window.innerHeight - 50 ||
                rect.left > window.innerWidth - 50;

            if (isOffscreen) {
                // 5. 화면 밖에 있을 경우에만 위치를 초기화
                Object.assign(this.#modalElement.style, this.#initialState);
                this.#saveState(); // 리셋된 위치를 저장
            }
        }

        show() {
            this.#resetPositionIfOffscreen();
            this.#modalElement.style.display = "flex";
            const modals = document.querySelectorAll(`.${scopedClass("draggable-modal")}`);
            const maxZ = Math.max(
                9999,
                ...Array.from(modals).map((el) => parseFloat(window.getComputedStyle(el).zIndex) || 0),
            );
            this.#modalElement.style.zIndex = maxZ + 1;
        }

        hide() {
            this.#modalElement.style.display = "none";
        }
        isVisible() {
            return this.#modalElement.style.display !== "none";
        }
        getContentElement() {
            return this.#contentElement;
        }
        setTitle(newTitle) {
            if (this.#titleElement) this.#titleElement.textContent = newTitle;
        }

        showNotification(message, isError = false, duration = 3000) {
            if (!this.#notificationElement) return;
            clearTimeout(this.#notificationTimeout);
            this.#notificationElement.textContent = message;
            this.#notificationElement.style.color = isError ? "#ff6b6b" : "#6bff96";
            this.#notificationElement.style.opacity = "1";
            this.#notificationTimeout = setTimeout(() => {
                this.#notificationElement.style.opacity = "0";
            }, duration);
        }

        destroy() {
            clearTimeout(this.#notificationTimeout);
            this.#modalElement?.remove();
        }
    }

    //======================================
    // 4. 메인 실행 로직 (Main Execution Logic)
    //======================================
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            loadCategoryData();
        });
    } else {
        loadCategoryData();
    }

    // 4.1. 메인 페이지 실행 (sooplive.com)
    if (isThemeLockEnabled) setupThemeLock();

    if (CURRENT_URL.startsWith("https://www.sooplive.com")) {
        GM_addStyle(CommonStyles);
        GM_addStyle(mainPageCommonStyles);
        if (isReplaceEmptyThumbnailEnabled) {
            loadHlsScript();
            previewModalManager = new PreviewModal();
        }
        if (isCustomSidebarEnabled) document.body.classList.add("customSidebar");
        (async () => {
            const serviceLnbDiv = await waitForElementAsync("#serviceLnb");
            if (isCustomSidebarEnabled) makeTopNavbarAndSidebar("main");
            runCommonFunctions();
        })();
        removeUnwantedTags();
        processStreamers();

        return;
    }

    // 4.2. 플레이어 페이지 실행 (play.sooplive.com)
    if (CURRENT_URL.startsWith("https://play.sooplive.com")) {
        // Embed 페이지에서는 실행하지 않음
        const pattern = /^https:\/\/play.sooplive.com\/.*\/.*\/embed(\?.*)?$/;
        if (pattern.test(CURRENT_URL) || CURRENT_URL.includes("vtype=chat")) {
            return;
        }
        GM_addStyle(CommonStyles);
        GM_addStyle(playerCommonStyles);
        hideBadges();

        if (isCustomSidebarEnabled) document.body.classList.add("customSidebar");
        if (isCustomSidebarEnabled) {
            makeTopNavbarAndSidebar("player");
            insertFoldButton();
            if (showSidebarOnScreenMode && !showSidebarOnScreenModeAlways) {
                showSidebarOnMouseOver();
            }
        }
        if (isBottomChatEnabled) useBottomChat();
        if (isMakePauseButtonEnabled) {
            appendPauseButton();
            observeUrlChanges(appendPauseButton);
        }
        if (isAutoResumeVideoEnabled) {
            setupAutoResumeVideo();
            observeUrlChanges(setupAutoResumeVideo);
        }
        if (isMakeSharpModeShortcutEnabled) toggleSharpModeShortcut();
        if (isMakeLowLatencyShortcutEnabled) toggleLowLatencyShortcut();
        if (isMakeQualityChangeShortcutEnabled) initializeQualityShortcuts();
        if (isRemainingBufferTimeEnabled) {
            (async () => {
                const livePlayerDiv = await waitForElementAsync("#livePlayer");
                insertRemainingBuffer(livePlayerDiv);
            })();
        }
        if (isCaptureButtonEnabled) {
            makeCaptureButton();
        }
        if (isVideoSkipHandlerEnabled) {
            (async () => {
                const livePlayerDiv = await waitForElementAsync("#livePlayer");
                window.addEventListener("keydown", videoSkipHandler);
            })();
        }
        registerVisibilityChangeHandler();
        registerVisibilityChangeHandlerForQuality();

        if (preferredQualitySetting && preferredQualitySetting !== "off") {
            selectPreferredQuality();
            observeUrlChanges(() => {
                setTimeout(selectPreferredQuality, 4000);
            });
        }

        checkPlayerPageHeaderAd();
        if (!isOpenNewtabEnabled) {
            homePageCurrentTab();
        }
        if (isDocumentTitleUpdateEnabled) {
            setTimeout(updateTitleWithViewers, 10000);
            setInterval(updateTitleWithViewers, 60000);
        }
        runCommonFunctions();

        if (isUnlockCopyPasteEnabled) {
            (async () => {
                const writeArea = await waitForElementAsync("#write_area");
                unlockCopyPaste(writeArea);
            })();
        }

        if (isAlignNicknameRightEnabled) {
            alignNicknameRight();
        }

        if (isAutoScreenModeEnabled) {
            (async () => {
                const btnScreenModeDiv = await waitForElementAsync("#livePlayer");
                if (!document.body.classList.contains("screen_mode")) {
                    document.body.querySelector("#player .btn_screen_mode").click();
                }
            })();
        }

        if (isClickPlayerEventMapperEnabled) {
            async function initializePlayerControls() {
                const player = await waitForElementAsync("#player");
                const video = await waitForElementAsync("#livePlayer");

                if (!player || !video) {
                    customLog.error("플레이어 또는 비디오 요소를 찾을 수 없어 시스템을 시작할 수 없습니다.");
                    return;
                }

                const pauseSelector = document.querySelector("#closeStream") ? "#closeStream" : "#time_shift_play";

                const buttonSelectors = {
                    mute: "#btn_sound",
                    pause: pauseSelector,
                    stop: "#play",
                    screenMode: ".btn_screen_mode",
                    fullscreen: ".btn_fullScreen_mode",
                };

                const mapper = new PlayerEventMapper(player, video, buttonSelectors);

                mapper.player.addEventListener("mapper-ready", () => {
                    mapper.applyConfiguration(USER_CLICK_CONFIG);
                });
            }

            // 스크립트 실행
            initializePlayerControls();
        }

        if (ishideButtonsAboveChatInputEnabled) {
            hideButtonsAboveChatInput();
        }

        if (isNoAutoVODEnabled) {
            let redirectRetryTimer = null;
            let disconnectUrlObserver = null;

            const tabManager = createTabSyncManager({
                urlPattern: "play.sooplive.com/{userId}/{broadcastId}",
            });
            const cancelAutoRedirectRetry = () => {
                if (redirectRetryTimer) {
                    clearTimeout(redirectRetryTimer); // 예약된 setTimeout을 취소
                    redirectRetryTimer = null; // 타이머 ID 변수 초기화
                    customLog.log("사용자 활동이 감지되어 자동 전환 재시도를 중단합니다.");
                }
            };
            /**
             * 지정된 기준에 따라 다음 라이브 방송으로 전환하는 함수 (안전 장치 및 재시도 로직 추가됨)
             * @param {number} retryCount - 현재까지의 재시도 횟수
             */
            async function redirectLiveWithTabCheck(retryCount = 0) {
                // --- 설정 변수 ---
                const MAX_RETRIES = 100; // 최대 재시도 횟수
                const RETRY_DELAY_MS = 10000; // 재시도 사이의 대기 시간 (10초)
                const LOCK_KEY = "auto_redirect_lock";
                const LOCK_TIMEOUT_MS = 10000; // 잠금 유효 시간 (10초)

                // 1. 최대 재시도 횟수를 초과하면 실행을 완전히 중단합니다.
                if (retryCount >= MAX_RETRIES) {
                    customLog.log(`최대 재시도 횟수(${MAX_RETRIES}회)를 초과하여 자동 전환을 중단합니다.`);
                    return;
                }

                try {
                    const now = Date.now();
                    const lockTimestamp = localStorage.getItem(LOCK_KEY);

                    // 2. 다른 탭이 유효한 잠금을 가지고 있는지 확인합니다.
                    if (lockTimestamp && now - parseInt(lockTimestamp, 10) < LOCK_TIMEOUT_MS) {
                        customLog.log(
                            `다른 탭에서 자동 전환 진행 중... ${RETRY_DELAY_MS / 1000}초 후 재시도합니다. (시도 ${retryCount + 1}/${MAX_RETRIES})`,
                        );
                        // 재시도 로직: 일정 시간 대기 후, 재시도 횟수를 늘려 다시 함수를 호출합니다.
                        redirectRetryTimer = setTimeout(() => redirectLiveWithTabCheck(retryCount + 1), RETRY_DELAY_MS);
                        return; // 현재 실행은 중단하고, 예약된 다음 시도를 기다립니다.
                    }

                    // 3. 유효한 잠금이 없으므로, 현재 탭이 잠금을 획득하고 리디렉션을 시작합니다.
                    customLog.log("잠금을 획득하여 자동 전환을 시작합니다.");
                    localStorage.setItem(LOCK_KEY, now.toString());

                    const sortMethod = redirectLiveSortOption;
                    customLog.log(`방송 종료. 다음 방송 자동 전환을 시작합니다. (선택 기준: ${sortMethod})`);
                    const favoriteData = await fetchBroadList("https://myapi.sooplive.com/api/favorite", 50);

                    let potentialTargets = getPrioritizedLiveBroadcasts(favoriteData);

                    if (!potentialTargets.length) {
                        customLog.log("자동으로 전환할 라이브 방송을 찾지 못했습니다.");
                        localStorage.removeItem(LOCK_KEY); // 전환할 방송이 없으므로 잠금 해제
                        return;
                    }

                    // ... (정렬 로직은 이전과 동일) ...
                    switch (sortMethod) {
                        case "mostViewers":
                            potentialTargets.sort((a, b) => (b.total_view_cnt || 0) - (a.total_view_cnt || 0));
                            customLog.log("시청자 많은 순으로 후보 목록을 정렬했습니다.");
                            break;
                        case "leastViewers":
                            potentialTargets.sort((a, b) => (a.total_view_cnt || 0) - (b.total_view_cnt || 0));
                            customLog.log("시청자 적은 순으로 후보 목록을 정렬했습니다.");
                            break;
                        case "random":
                            for (let i = potentialTargets.length - 1; i > 0; i--) {
                                const j = Math.floor(Math.random() * (i + 1));
                                [potentialTargets[i], potentialTargets[j]] = [potentialTargets[j], potentialTargets[i]];
                            }
                            customLog.log("후보 목록을 무작위로 섞었습니다.");
                            break;
                        case "custom":
                        default:
                            customLog.log("기존 우선순위(고정/알림/일반)를 사용합니다.");
                            break;
                    }

                    customLog.log(`전환할 후보 방송: ${potentialTargets.length}개`);

                    for (const target of potentialTargets) {
                        const userId = target.user_id;
                        const broadcastId = target.broad_no;

                        if (!userId || !broadcastId) {
                            continue;
                        }

                        const isAlreadyOpen = tabManager.isTargetTabOpen(userId, broadcastId);

                        if (!isAlreadyOpen) {
                            customLog.log(`다음 우선순위 방송[${userId}/${broadcastId}]을 찾았습니다. 전환합니다.`);
                            // 리디렉션이 성공하면 이 탭의 스크립트 실행은 중단됩니다.
                            // 잠금은 타임아웃으로 자동 해제됩니다.
                            unsafeWindow.liveView.playerController.sendLoadBroad(userId, broadcastId);
                            return;
                        } else {
                            customLog.log(
                                `방송[${userId}/${broadcastId}]은(는) 이미 열려있어 건너뜁니다. 다음 우선순위를 확인합니다.`,
                            );
                        }
                    }

                    customLog.log("모든 우선순위의 라이브 방송이 이미 열려있습니다. 전환하지 않습니다.");
                    localStorage.removeItem(LOCK_KEY); // 모든 작업이 끝났으므로 잠금 해제
                } catch (error) {
                    customLog.error("다음 방송 자동 전환 중 오류가 발생했습니다:", error);
                    localStorage.removeItem(LOCK_KEY); // 오류 발생 시에도 잠금 해제
                }
            }

            function disableAutoVOD() {
                const container = unsafeWindow.liveView?.aContainer?.[1];

                if (container?.autoPlayVodBanner) {
                    if (isRedirectLiveEnabled === 1) {
                        container.autoPlayVodBanner.show = redirectLiveWithTabCheck;
                        if (!disconnectUrlObserver) {
                            disconnectUrlObserver = observeUrlChanges(cancelAutoRedirectRetry);
                        }
                        customLog.log("자동 LIVE 전환 기능 활성화");
                    } else {
                        container.autoPlayVodBanner.show = () => {
                            customLog.log("VOD 자동 재생 비활성화");
                        };
                    }
                } else {
                    setTimeout(disableAutoVOD, 3000);
                }
            }
            disableAutoVOD();
        }

        if (isHideEsportsInfoEnabled) {
            GM_addStyle(`
              body:not(.screen_mode,.fullScreen_mode,.embeded_mode)
              #webplayer #webplayer_contents #player_area
              .broadcast_information.detail_open .esports_info {
                    display: none !important;
              }
              .broadcast_information .esports_info {
                    display: none !important;
              }
              `);
        }

        if (true) {
            const tabManager = createTabSyncManager({
                urlPattern: "https://play.sooplive.com/{userId}/{broadcastId}",
            });
        }

        return;
    }

    // 4.3. VOD 페이지 실행 (vod.sooplive.com)
    if (CURRENT_URL.startsWith("https://vod.sooplive.com/player/")) {
        const isBaseUrl = (url) => /https:\/\/vod\.sooplive\.co\.kr\/player\/\d+/.test(url) && !isCatchUrl(url);
        const isCatchUrl = (url) =>
            /https:\/\/vod\.sooplive\.co\.kr\/player\/\d+\/catch/.test(url) ||
            /https:\/\/vod\.sooplive\.co\.kr\/player\/catch/.test(url);

        // 다시보기 페이지
        if (isBaseUrl(CURRENT_URL)) {
            GM_addStyle(CommonStyles);
            hideBadges();

            const waitForVodMediaInfo = async () => {
                try {
                    const vodCore = await waitForVariable("vodCore");
                    const mediaInfo = await new Promise((resolve, reject) => {
                        const MEDIA_INFO_TIMEOUT = 15000;
                        const timer = setInterval(() => {
                            const info = vodCore.playerController?._currentMediaInfo;
                            if (info?.name) {
                                clearTimeout(timeoutHandle);
                                clearInterval(timer);
                                resolve(info);
                            }
                        }, 1000);
                        const timeoutHandle = setTimeout(() => {
                            clearInterval(timer); // 불필요한 인터벌 중지
                            reject(new Error("미디어 정보(mediaInfo) 로딩 시간을 초과했습니다."));
                        }, MEDIA_INFO_TIMEOUT);
                    });
                    checkMediaInfo(mediaInfo.name, mediaInfo.isAutoLevelEnabled);
                } catch (error) {
                    customLog.error("VOD 플레이어 초기화에 실패했습니다:", error);
                }
            };

            if (isVODHighlightEnabled) {
                let highlightScannerInstance = null;
                async function initHighlightScanApp() {
                    try {
                        const vodCore = await waitForVariable("vodCore");
                        const titleNo = vodCore.config.titleNo || vodCore.config.title_no;
                        const mobileApiUrl = "https://api.m.sooplive.com/station/video/a/view";
                        const params = new URLSearchParams({ nTitleNo: titleNo, nApiLevel: 11, nPlaylistIdx: 0 });
                        const response = await fetch(mobileApiUrl, {
                            method: "POST",
                            headers: { "Content-Type": "application/x-www-form-urlencoded" },
                            body: params.toString(),
                            credentials: "include",
                        });
                        const videoData = await response.json();
                        if (videoData.result !== 1 || !videoData.data.bbs_no) {
                            throw new Error(
                                `모바일 API에서 bbs_no를 가져오는 데 실패했습니다: ${videoData.message || "알 수 없는 오류"}`,
                            );
                        }
                        const bbsNo = videoData.data.bbs_no;
                        highlightScannerInstance?.destroy();
                        highlightScannerInstance = new VODHighlightScanner(vodCore, bbsNo);
                    } catch (err) {
                        customLog.error("VOD 스캐너 초기화 실패:", err);
                        highlightScannerInstance?.destroy();
                    }
                }

                initHighlightScanApp();
                observeUrlChanges(() => {
                    highlightScannerInstance?.destroy();
                    setTimeout(initHighlightScanApp, 1000);
                });
            }

            if (isSelectBestQualityEnabled) {
                waitForVodMediaInfo();
                observeUrlChanges(() => {
                    setTimeout(waitForVodMediaInfo, 2000);
                });
            }
            if (isCaptureButtonEnabled) {
                makeCaptureButton();
            }

            setupSettingButtonTopbar();

            if (isAlignNicknameRightEnabled) {
                alignNicknameRight();
            }

            // 캐치 페이지
        } else if (isCatchUrl(CURRENT_URL)) {
            GM_addStyle(CommonStyles);
            GM_addStyle(mainPageCommonStyles);
            if (isCustomSidebarEnabled) document.body.classList.add("customSidebar");
            (async () => {
                const serviceLnbDiv = await waitForElementAsync("#serviceLnb");
                if (isCustomSidebarEnabled) makeTopNavbarAndSidebar("main");
                runCommonFunctions();
            })();
            if (isRemoveShadowsFromCatchEnabled) addStyleRemoveShadowsFromCatch();
        }
    }
})();
