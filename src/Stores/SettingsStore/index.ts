import { GM_getValue, GM_setValue } from "vite-plugin-monkey/dist/client";
import { makeObservable, observable, action } from "mobx";
import type { I_CategoryData } from "@Types/index.d";

export class SettingsStore {
    // 사이드바 전반
    isCustomSidebarEnabled: boolean;
    isRandomSortEnabled: boolean;
    isFavoriteGroupEnabled: boolean;
    isShortenFavoriteGroupNameEnabled: boolean;
    isCategoryGroupEnabled: boolean;
    isShortenCategoryNameEnabled: boolean;
    isChannelFeedEnabled: boolean;
    isBlockedCategorySortingEnabled: boolean;
    isPinnedStreamWithNotificationEnabled: boolean;
    isPinnedStreamWithPinEnabled: boolean;
    isPinnedOnlineOnlyEnabled: boolean;
    isSmallUserLayoutEnabled: boolean;
    isProfileHidden: boolean;
    isCategoryHidden: boolean;
    isSendLoadBroadEnabled: boolean;
    isDuplicateRemovalEnabled: boolean;
    isTopDuplicateRemovalEnabled: boolean;
    myplusOrder: number;
    isChzzkFollowChannelsEnabled: boolean;
    isChzzkTopChannelsEnabled: boolean;
    isChzzkPinSyncEnabled: boolean;
    displayFollow: number;
    displayMyplus: number;
    displayMyplusvod: number;
    displayTop: number;
    pollIntervalSeconds: number;

    // 사이드바 UI
    nicknameWidth: number;
    isAlignNicknameRightEnabled: boolean;
    isSidebarMinimized: boolean;
    sidebarSectionOrder: string;
    selectedFavoriteGroupIdx: number;
    selectedPinnedCategoryIdx: number;

    // 테마 / 메인 페이지
    isThemeLockEnabled: boolean;
    isRemoveRedistributionTagEnabled: boolean;
    isRemoveWatchLaterButtonEnabled: boolean;
    isRemoveBroadStartTimeTagEnabled: boolean;
    isReplaceEmptyThumbnailEnabled: boolean;
    isThumbnailTooltipEnabled: boolean;
    isRemoveCarouselEnabled: boolean;
    isBroadTitleTextEllipsisEnabled: boolean;

    // LIVE 플레이어
    isNoAutoVODEnabled: boolean;
    isAutoReloadAfterBroadcastEndEnabled: boolean;
    isHideEsportsInfoEnabled: boolean;
    isShowPauseButtonEnabled: boolean;
    isCaptureButtonEnabled: boolean;
    preferredQuality: string;
    isClickPlayerEventMapperEnabled: boolean;
    selectLeftClick: string;
    selectRightClick: string;
    isShowBufferTimeTitleEnabled: boolean;
    isShowBufferTimeChatEnabled: boolean;
    isSharpmodeShortcutEnabled: boolean;
    isLLShortcutEnabled: boolean;
    isQualityChangeShortcutEnabled: boolean;
    isMutedInactiveTabsEnabled: boolean;
    isAutoChangeQualityEnabled: boolean;
    isDocumentTitleUpdateEnabled: boolean;
    isShowSidebarOnScreenModeAlwaysEnabled: boolean;
    isMouseOverSideBarEnabled: boolean;
    isChatPositionEnabled: boolean;
    isAutoScreenModeEnabled: boolean;

    isClickToMuteEnabled: boolean;

    // VOD 플레이어
    isSelectBestQualityEnabled: boolean;
    isVODHighlightEnabled: boolean;

    // 채팅창
    isHideSupporterBadgeEnabled: boolean;
    isHideFanBadgeEnabled: boolean;
    isHideSubBadgeEnabled: boolean;
    isHideVIPBadgeEnabled: boolean;
    isHideMngrBadgeEnabled: boolean;
    isHideStreamerBadgeEnabled: boolean;
    isUnlockCopyPasteEnabled: boolean;
    isHideButtonsAboveChatInputEnabled: boolean;
    isHideChatItemsEnabled: boolean;

    // 카테고리 데이터
    savedCategory: I_CategoryData | null;

    // 다크 모드
    isDarkMode: boolean;

    // 시청 스트리머 (현재 방송을 보고 있는 스트리머)
    isWatchingStreamersEnabled: boolean;
    watchingStreamersIntervalMinutes: number;
    watchingStreamersProfileSize: number;
    isWatchingStreamersTextModeEnabled: boolean;
    watchingStreamersSortOrder: string;
    isWatchingStreamersFollowingListEnabled: boolean;
    watchingStreamersRegisteredUsers: Array<{ userName: string; userId: string }>;
    watchingStreamersMinDisplay: number;

    constructor() {
        this.isCustomSidebarEnabled = GM_getValue("isCustomSidebarEnabled", true);
        this.isRandomSortEnabled = GM_getValue("isRandomSortEnabled", false);
        this.isFavoriteGroupEnabled = GM_getValue("isFavoriteGroupEnabled", true);
        this.isShortenFavoriteGroupNameEnabled = GM_getValue("isShortenFavoriteGroupNameEnabled", false);
        this.isCategoryGroupEnabled = GM_getValue("isCategoryGroupEnabled", true);
        this.isShortenCategoryNameEnabled = GM_getValue("isShortenCategoryNameEnabled", false);
        this.isChannelFeedEnabled = GM_getValue("isChannelFeedEnabled", false);
        this.isBlockedCategorySortingEnabled = GM_getValue("isBlockedCategorySortingEnabled", true);
        this.isPinnedStreamWithNotificationEnabled = GM_getValue("isPinnedStreamWithNotificationEnabled", true);
        this.isPinnedStreamWithPinEnabled = GM_getValue("isPinnedStreamWithPinEnabled", false);
        this.isPinnedOnlineOnlyEnabled = GM_getValue("isPinnedOnlineOnlyEnabled", false);
        this.isSmallUserLayoutEnabled = GM_getValue("isSmallUserLayoutEnabled", false);
        this.isProfileHidden = GM_getValue("isProfileHidden", false);
        this.isCategoryHidden = GM_getValue("isCategoryHidden", false);
        this.isSendLoadBroadEnabled = GM_getValue("isSendLoadBroadEnabled", true);
        this.isDuplicateRemovalEnabled = GM_getValue("isDuplicateRemovalEnabled", true);
        this.isTopDuplicateRemovalEnabled = GM_getValue("isTopDuplicateRemovalEnabled", true);
        const storedMyplusOrder = GM_getValue("myplusOrder", 1);
        this.myplusOrder =
            typeof storedMyplusOrder === "number" ? storedMyplusOrder : storedMyplusOrder === "viewerCount" ? 0 : 1;
        this.isChzzkFollowChannelsEnabled = GM_getValue("isChzzkFollowChannelsEnabled", false);
        this.isChzzkTopChannelsEnabled = GM_getValue("isChzzkTopChannelsEnabled", false);
        this.isChzzkPinSyncEnabled = GM_getValue("isChzzkPinSyncEnabled", false);
        this.displayFollow = GM_getValue("displayFollow", 6);
        this.displayMyplus = GM_getValue("displayMyplus", 6);
        this.displayMyplusvod = GM_getValue("displayMyplusvod", 4);
        this.displayTop = GM_getValue("displayTop", 6);
        this.pollIntervalSeconds = GM_getValue("pollIntervalSeconds", 30);

        this.nicknameWidth = GM_getValue("nicknameWidth", 60);
        this.isAlignNicknameRightEnabled = GM_getValue("isAlignNicknameRightEnabled", false);
        this.isSidebarMinimized = GM_getValue("isSidebarMinimized", false);
        this.sidebarSectionOrder = GM_getValue("sidebarSectionOrder", "");
        this.selectedFavoriteGroupIdx = GM_getValue("selectedFavoriteGroupIdx", 0);
        this.selectedPinnedCategoryIdx = GM_getValue("selectedPinnedCategoryIdx", 0);

        this.isThemeLockEnabled = GM_getValue("isThemeLockEnabled", false);
        this.isRemoveRedistributionTagEnabled = GM_getValue("isRemoveRedistributionTagEnabled", true);
        this.isRemoveWatchLaterButtonEnabled = GM_getValue("isRemoveWatchLaterButtonEnabled", false);
        this.isRemoveBroadStartTimeTagEnabled = GM_getValue("isRemoveBroadStartTimeTagEnabled", false);
        this.isReplaceEmptyThumbnailEnabled = GM_getValue("isReplaceEmptyThumbnailEnabled", true);
        this.isThumbnailTooltipEnabled = GM_getValue("isThumbnailTooltipEnabled", true);
        this.isRemoveCarouselEnabled = GM_getValue("isRemoveCarouselEnabled", true);
        this.isBroadTitleTextEllipsisEnabled = GM_getValue("isBroadTitleTextEllipsisEnabled", false);

        this.isNoAutoVODEnabled = GM_getValue("isNoAutoVODEnabled", true);
        this.isAutoReloadAfterBroadcastEndEnabled = GM_getValue("isAutoReloadAfterBroadcastEndEnabled", true);
        this.isHideEsportsInfoEnabled = GM_getValue("isHideEsportsInfoEnabled", false);
        this.isShowPauseButtonEnabled = GM_getValue("isMakePauseButtonEnabled", true);
        this.isCaptureButtonEnabled = GM_getValue("isCaptureButtonEnabled", false);
        this.preferredQuality = GM_getValue("preferredQualitySetting", "off");
        this.isClickPlayerEventMapperEnabled = GM_getValue("isClickPlayerEventMapperEnabled", false);
        this.selectLeftClick = GM_getValue("livePlayerLeftClickFunction", "toggleMute");
        this.selectRightClick = GM_getValue("livePlayerRightClickFunction", "toggleScreenMode");
        this.isShowBufferTimeTitleEnabled = GM_getValue("isShowBufferTimeTitleEnabled", false);
        this.isShowBufferTimeChatEnabled = GM_getValue("isShowBufferTimeChatEnabled", false);
        this.isSharpmodeShortcutEnabled = GM_getValue("isMakeSharpModeShortcutEnabled", true);
        this.isLLShortcutEnabled = GM_getValue("isMakeLowLatencyShortcutEnabled", true);
        this.isQualityChangeShortcutEnabled = GM_getValue("isMakeQualityChangeShortcutEnabled", false);
        this.isMutedInactiveTabsEnabled = GM_getValue("isAutoChangeMuteEnabled", false);
        this.isAutoChangeQualityEnabled = GM_getValue("isAutoChangeQualityEnabled", false);
        this.isDocumentTitleUpdateEnabled = GM_getValue("isDocumentTitleUpdateEnabled", true);
        this.isShowSidebarOnScreenModeAlwaysEnabled = GM_getValue("showSidebarOnScreenModeAlways", false);
        this.isMouseOverSideBarEnabled = GM_getValue("showSidebarOnScreenMode", true);
        this.isChatPositionEnabled = GM_getValue("isBottomChatEnabled", false);
        this.isAutoScreenModeEnabled = GM_getValue("isAutoScreenModeEnabled", false);
        this.isClickToMuteEnabled = GM_getValue("isClickToMuteEnabled", false);

        this.isSelectBestQualityEnabled = GM_getValue("isSelectBestQualityEnabled", false);
        this.isVODHighlightEnabled = GM_getValue("isVODHighlightEnabled", true);

        this.isHideSupporterBadgeEnabled = GM_getValue("isHideSupporterBadgeEnabled", false);
        this.isHideFanBadgeEnabled = GM_getValue("isHideFanBadgeEnabled", false);
        this.isHideSubBadgeEnabled = GM_getValue("isHideSubBadgeEnabled", false);
        this.isHideVIPBadgeEnabled = GM_getValue("isHideVIPBadgeEnabled", false);
        this.isHideMngrBadgeEnabled = GM_getValue("isHideManagerBadgeEnabled", false);
        this.isHideStreamerBadgeEnabled = GM_getValue("isHideStreamerBadgeEnabled", false);
        this.isUnlockCopyPasteEnabled = GM_getValue("isUnlockCopyPasteEnabled", false);
        this.isHideButtonsAboveChatInputEnabled = GM_getValue("ishideButtonsAboveChatInputEnabled", false);
        this.isHideChatItemsEnabled = GM_getValue("isHideChatItemsEnabled", false);

        this.savedCategory = GM_getValue("szBroadCategory", null);
        this.isDarkMode =
            document.documentElement.getAttribute("dark") === "true" ||
            document.documentElement.classList.contains("dark");

        this.isWatchingStreamersEnabled = GM_getValue("isWatchingStreamersEnabled", true);
        this.watchingStreamersIntervalMinutes = GM_getValue("watchingStreamersIntervalMinutes", 3);
        this.watchingStreamersProfileSize = GM_getValue("watchingStreamersProfileSize", 46);
        this.isWatchingStreamersTextModeEnabled = GM_getValue("isWatchingStreamersTextModeEnabled", false);
        this.watchingStreamersSortOrder = GM_getValue("watchingStreamersSortOrder", "date");
        this.isWatchingStreamersFollowingListEnabled = GM_getValue("isWatchingStreamersFollowingListEnabled", true);
        this.watchingStreamersRegisteredUsers = GM_getValue("watchingStreamersRegisteredUsers", []);
        this.watchingStreamersMinDisplay = GM_getValue("watchingStreamersMinDisplay", 5000);

        makeObservable(this, {
            isCustomSidebarEnabled: observable,
            isRandomSortEnabled: observable,
            isFavoriteGroupEnabled: observable,
            isShortenFavoriteGroupNameEnabled: observable,
            isCategoryGroupEnabled: observable,
            isShortenCategoryNameEnabled: observable,
            isChannelFeedEnabled: observable,
            isBlockedCategorySortingEnabled: observable,
            isPinnedStreamWithNotificationEnabled: observable,
            isPinnedStreamWithPinEnabled: observable,
            isPinnedOnlineOnlyEnabled: observable,
            isSmallUserLayoutEnabled: observable,
            isProfileHidden: observable,
            isCategoryHidden: observable,
            isSendLoadBroadEnabled: observable,
            isDuplicateRemovalEnabled: observable,
            isTopDuplicateRemovalEnabled: observable,
            myplusOrder: observable,
            isChzzkFollowChannelsEnabled: observable,
            isChzzkTopChannelsEnabled: observable,
            isChzzkPinSyncEnabled: observable,
            displayFollow: observable,
            displayMyplus: observable,
            displayMyplusvod: observable,
            displayTop: observable,
            pollIntervalSeconds: observable,
            nicknameWidth: observable,
            isAlignNicknameRightEnabled: observable,
            isSidebarMinimized: observable,
            sidebarSectionOrder: observable,
            selectedFavoriteGroupIdx: observable,
            selectedPinnedCategoryIdx: observable,
            isThemeLockEnabled: observable,
            isRemoveRedistributionTagEnabled: observable,
            isRemoveWatchLaterButtonEnabled: observable,
            isRemoveBroadStartTimeTagEnabled: observable,
            isReplaceEmptyThumbnailEnabled: observable,
            isThumbnailTooltipEnabled: observable,
            isRemoveCarouselEnabled: observable,
            isBroadTitleTextEllipsisEnabled: observable,
            isNoAutoVODEnabled: observable,
            isAutoReloadAfterBroadcastEndEnabled: observable,
            isHideEsportsInfoEnabled: observable,
            isShowPauseButtonEnabled: observable,
            isCaptureButtonEnabled: observable,
            preferredQuality: observable,
            isClickPlayerEventMapperEnabled: observable,
            selectLeftClick: observable,
            selectRightClick: observable,
            isShowBufferTimeTitleEnabled: observable,
            isShowBufferTimeChatEnabled: observable,
            isSharpmodeShortcutEnabled: observable,
            isLLShortcutEnabled: observable,
            isQualityChangeShortcutEnabled: observable,
            isMutedInactiveTabsEnabled: observable,
            isAutoChangeQualityEnabled: observable,
            isDocumentTitleUpdateEnabled: observable,
            isShowSidebarOnScreenModeAlwaysEnabled: observable,
            isMouseOverSideBarEnabled: observable,
            isChatPositionEnabled: observable,
            isAutoScreenModeEnabled: observable,
            isClickToMuteEnabled: observable,
            isSelectBestQualityEnabled: observable,
            isVODHighlightEnabled: observable,
            isHideSupporterBadgeEnabled: observable,
            isHideFanBadgeEnabled: observable,
            isHideSubBadgeEnabled: observable,
            isHideVIPBadgeEnabled: observable,
            isHideMngrBadgeEnabled: observable,
            isHideStreamerBadgeEnabled: observable,
            isUnlockCopyPasteEnabled: observable,
            isHideButtonsAboveChatInputEnabled: observable,
            isHideChatItemsEnabled: observable,
            savedCategory: observable,
            isDarkMode: observable,
            isWatchingStreamersEnabled: observable,
            watchingStreamersIntervalMinutes: observable,
            watchingStreamersProfileSize: observable,
            isWatchingStreamersTextModeEnabled: observable,
            watchingStreamersSortOrder: observable,
            isWatchingStreamersFollowingListEnabled: observable,
            watchingStreamersRegisteredUsers: observable,
            watchingStreamersMinDisplay: observable,
            setSetting: action,
            setDarkMode: action,
        });
    }

    // React 프로퍼티명 → sample.js GM 스토리지 키 매핑
    private static readonly STORAGE_KEY_MAP: Partial<Record<string, string>> = {
        isShowPauseButtonEnabled: "isMakePauseButtonEnabled",
        preferredQuality: "preferredQualitySetting",
        selectLeftClick: "livePlayerLeftClickFunction",
        selectRightClick: "livePlayerRightClickFunction",

        isSharpmodeShortcutEnabled: "isMakeSharpModeShortcutEnabled",
        isLLShortcutEnabled: "isMakeLowLatencyShortcutEnabled",
        isQualityChangeShortcutEnabled: "isMakeQualityChangeShortcutEnabled",
        isMutedInactiveTabsEnabled: "isAutoChangeMuteEnabled",
        isShowSidebarOnScreenModeAlwaysEnabled: "showSidebarOnScreenModeAlways",
        isMouseOverSideBarEnabled: "showSidebarOnScreenMode",
        isChatPositionEnabled: "isBottomChatEnabled",
        isHideSupporterBadgeEnabled: "isHideSupporterBadgeEnabled",
        isHideFanBadgeEnabled: "isHideFanBadgeEnabled",
        isHideSubBadgeEnabled: "isHideSubBadgeEnabled",
        isHideVIPBadgeEnabled: "isHideVIPBadgeEnabled",
        isHideMngrBadgeEnabled: "isHideManagerBadgeEnabled",
        isHideStreamerBadgeEnabled: "isHideStreamerBadgeEnabled",
        isHideButtonsAboveChatInputEnabled: "ishideButtonsAboveChatInputEnabled",
    };

    setSetting<K extends keyof this>(key: K, value: this[K]): void {
        (this as any)[key] = value;
        const storageKey = SettingsStore.STORAGE_KEY_MAP[key as string] ?? (key as string);
        GM_setValue(storageKey, value);

        // 다이나믹 CSS 변수 처리
        if (key === "nicknameWidth") {
            document.documentElement.style.setProperty("--nickname-width", `${value}px`);
        }
    }

    setDarkMode(val: boolean): void {
        this.isDarkMode = val;
    }
}
