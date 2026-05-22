import { makeObservable, observable, action, runInAction } from "mobx";
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
  isSendLoadBroadEnabled: boolean;
  isOpenNewtabEnabled: boolean;
  isDuplicateRemovalEnabled: boolean;
  isTopDuplicateRemovalEnabled: boolean;
  myplusOrder: string;
  isChzzkFollowChannelsEnabled: boolean;
  isChzzkTopChannelsEnabled: boolean;
  displayFollow: boolean;
  displayMyplus: boolean;
  displayMyplusvod: boolean;
  displayTop: boolean;

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
  isAutoResumeVideoEnabled: boolean;
  isRedirectLiveEnabled: boolean;
  redirectLiveSortOption: string;
  isHideEsportsInfoEnabled: boolean;
  isShowPauseButtonEnabled: boolean;
  isCaptureButtonEnabled: boolean;
  preferredQuality: string;
  isClickPlayerEventMapperEnabled: boolean;
  selectLeftClick: string;
  selectRightClick: string;
  isShowBufferTimeEnabled: boolean;
  isVideoSkipHandlerEnabled: boolean;
  isSharpmodeShortcutEnabled: boolean;
  isLLShortcutEnabled: boolean;
  isAdjustDelayNoGridEnabled: boolean;
  isQualityChangeShortcutEnabled: boolean;
  isMutedInactiveTabsEnabled: boolean;
  isAutoChangeQualityEnabled: boolean;
  isDocumentTitleUpdateEnabled: boolean;
  isShowSidebarOnScreenModeAlwaysEnabled: boolean;
  isMouseOverSideBarEnabled: boolean;
  isChatPositionEnabled: boolean;
  isAutoScreenModeEnabled: boolean;

  // VOD 플레이어
  isSelectBestQualityEnabled: boolean;
  isRemoveShadowsFromCatchEnabled: boolean;
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

  // 카테고리 데이터
  savedCategory: I_CategoryData | null;

  // 다크 모드
  isDarkMode: boolean;

  constructor() {
    this.isCustomSidebarEnabled = GM_getValue("isCustomSidebarEnabled", true);
    this.isRandomSortEnabled = GM_getValue("isRandomSortEnabled", false);
    this.isFavoriteGroupEnabled = GM_getValue("isFavoriteGroupEnabled", true);
    this.isShortenFavoriteGroupNameEnabled = GM_getValue(
      "isShortenFavoriteGroupNameEnabled",
      false
    );
    this.isCategoryGroupEnabled = GM_getValue("isCategoryGroupEnabled", true);
    this.isShortenCategoryNameEnabled = GM_getValue(
      "isShortenCategoryNameEnabled",
      false
    );
    this.isChannelFeedEnabled = GM_getValue("isChannelFeedEnabled", false);
    this.isBlockedCategorySortingEnabled = GM_getValue(
      "isBlockedCategorySortingEnabled",
      true
    );
    this.isPinnedStreamWithNotificationEnabled = GM_getValue(
      "isPinnedStreamWithNotificationEnabled",
      true
    );
    this.isPinnedStreamWithPinEnabled = GM_getValue(
      "isPinnedStreamWithPinEnabled",
      false
    );
    this.isPinnedOnlineOnlyEnabled = GM_getValue(
      "isPinnedOnlineOnlyEnabled",
      false
    );
    this.isSmallUserLayoutEnabled = GM_getValue(
      "isSmallUserLayoutEnabled",
      false
    );
    this.isSendLoadBroadEnabled = GM_getValue("isSendLoadBroadEnabled", true);
    this.isOpenNewtabEnabled = GM_getValue("isOpenNewtabEnabled", false);
    this.isDuplicateRemovalEnabled = GM_getValue(
      "isDuplicateRemovalEnabled",
      true
    );
    this.isTopDuplicateRemovalEnabled = GM_getValue(
      "isTopDuplicateRemovalEnabled",
      true
    );
    this.myplusOrder = GM_getValue("myplusOrder", "viewerCount");
    this.isChzzkFollowChannelsEnabled = GM_getValue(
      "isChzzkFollowChannelsEnabled",
      false
    );
    this.isChzzkTopChannelsEnabled = GM_getValue(
      "isChzzkTopChannelsEnabled",
      false
    );
    this.displayFollow = GM_getValue("displayFollow", true);
    this.displayMyplus = GM_getValue("displayMyplus", true);
    this.displayMyplusvod = GM_getValue("displayMyplusvod", false);
    this.displayTop = GM_getValue("displayTop", true);

    this.nicknameWidth = GM_getValue("nicknameWidth", 60);
    this.isAlignNicknameRightEnabled = GM_getValue(
      "isAlignNicknameRightEnabled",
      false
    );
    this.isSidebarMinimized = GM_getValue("isSidebarMinimized", false);
    this.sidebarSectionOrder = GM_getValue("sidebarSectionOrder", "");
    this.selectedFavoriteGroupIdx = GM_getValue("selectedFavoriteGroupIdx", 0);
    this.selectedPinnedCategoryIdx = GM_getValue(
      "selectedPinnedCategoryIdx",
      0
    );

    this.isThemeLockEnabled = GM_getValue("isThemeLockEnabled", false);
    this.isRemoveRedistributionTagEnabled = GM_getValue(
      "isRemoveRedistributionTagEnabled",
      true
    );
    this.isRemoveWatchLaterButtonEnabled = GM_getValue(
      "isRemoveWatchLaterButtonEnabled",
      false
    );
    this.isRemoveBroadStartTimeTagEnabled = GM_getValue(
      "isRemoveBroadStartTimeTagEnabled",
      false
    );
    this.isReplaceEmptyThumbnailEnabled = GM_getValue(
      "isReplaceEmptyThumbnailEnabled",
      true
    );
    this.isThumbnailTooltipEnabled = GM_getValue(
      "isThumbnailTooltipEnabled",
      true
    );
    this.isRemoveCarouselEnabled = GM_getValue("isRemoveCarouselEnabled", true);
    this.isBroadTitleTextEllipsisEnabled = GM_getValue(
      "isBroadTitleTextEllipsisEnabled",
      false
    );

    this.isNoAutoVODEnabled = GM_getValue("isNoAutoVODEnabled", true);
    this.isAutoResumeVideoEnabled = GM_getValue(
      "isAutoResumeVideoEnabled",
      false
    );
    this.isRedirectLiveEnabled = GM_getValue("isRedirectLiveEnabled", false);
    this.redirectLiveSortOption = GM_getValue(
      "redirectLiveSortOption",
      "viewerCount"
    );
    this.isHideEsportsInfoEnabled = GM_getValue(
      "isHideEsportsInfoEnabled",
      false
    );
    this.isShowPauseButtonEnabled = GM_getValue(
      "isShowPauseButtonEnabled",
      true
    );
    this.isCaptureButtonEnabled = GM_getValue("isCaptureButtonEnabled", false);
    this.preferredQuality = GM_getValue("preferredQuality", "original");
    this.isClickPlayerEventMapperEnabled = GM_getValue(
      "isClickPlayerEventMapperEnabled",
      false
    );
    this.selectLeftClick = GM_getValue("selectLeftClick", "play_pause");
    this.selectRightClick = GM_getValue("selectRightClick", "mute");
    this.isShowBufferTimeEnabled = GM_getValue(
      "isShowBufferTimeEnabled",
      false
    );
    this.isVideoSkipHandlerEnabled = GM_getValue(
      "isVideoSkipHandlerEnabled",
      true
    );
    this.isSharpmodeShortcutEnabled = GM_getValue(
      "isSharpmodeShortcutEnabled",
      false
    );
    this.isLLShortcutEnabled = GM_getValue("isLLShortcutEnabled", false);
    this.isAdjustDelayNoGridEnabled = GM_getValue(
      "isAdjustDelayNoGridEnabled",
      false
    );
    this.isQualityChangeShortcutEnabled = GM_getValue(
      "isQualityChangeShortcutEnabled",
      false
    );
    this.isMutedInactiveTabsEnabled = GM_getValue(
      "isMutedInactiveTabsEnabled",
      false
    );
    this.isAutoChangeQualityEnabled = GM_getValue(
      "isAutoChangeQualityEnabled",
      false
    );
    this.isDocumentTitleUpdateEnabled = GM_getValue(
      "isDocumentTitleUpdateEnabled",
      false
    );
    this.isShowSidebarOnScreenModeAlwaysEnabled = GM_getValue(
      "isShowSidebarOnScreenModeAlwaysEnabled",
      false
    );
    this.isMouseOverSideBarEnabled = GM_getValue(
      "isMouseOverSideBarEnabled",
      false
    );
    this.isChatPositionEnabled = GM_getValue("isChatPositionEnabled", false);
    this.isAutoScreenModeEnabled = GM_getValue(
      "isAutoScreenModeEnabled",
      false
    );

    this.isSelectBestQualityEnabled = GM_getValue(
      "isSelectBestQualityEnabled",
      false
    );
    this.isRemoveShadowsFromCatchEnabled = GM_getValue(
      "isRemoveShadowsFromCatchEnabled",
      false
    );
    this.isVODHighlightEnabled = GM_getValue("isVODHighlightEnabled", true);

    this.isHideSupporterBadgeEnabled = GM_getValue(
      "isHideSupporterBadge",
      false
    );
    this.isHideFanBadgeEnabled = GM_getValue("isHideFanBadge", false);
    this.isHideSubBadgeEnabled = GM_getValue("isHideSubBadge", false);
    this.isHideVIPBadgeEnabled = GM_getValue("isHideVIPBadge", false);
    this.isHideMngrBadgeEnabled = GM_getValue("isHideMngrBadge", false);
    this.isHideStreamerBadgeEnabled = GM_getValue(
      "isHideStreamerBadge",
      false
    );
    this.isUnlockCopyPasteEnabled = GM_getValue(
      "isUnlockCopyPasteEnabled",
      false
    );
    this.isHideButtonsAboveChatInputEnabled = GM_getValue(
      "isHideButtonsAboveChatInputEnabled",
      false
    );

    this.savedCategory = GM_getValue("szBroadCategory", null);
    this.isDarkMode =
      document.documentElement.getAttribute("dark") === "true" ||
      document.documentElement.classList.contains("dark");

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
      isSendLoadBroadEnabled: observable,
      isOpenNewtabEnabled: observable,
      isDuplicateRemovalEnabled: observable,
      isTopDuplicateRemovalEnabled: observable,
      myplusOrder: observable,
      isChzzkFollowChannelsEnabled: observable,
      isChzzkTopChannelsEnabled: observable,
      displayFollow: observable,
      displayMyplus: observable,
      displayMyplusvod: observable,
      displayTop: observable,
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
      isAutoResumeVideoEnabled: observable,
      isRedirectLiveEnabled: observable,
      redirectLiveSortOption: observable,
      isHideEsportsInfoEnabled: observable,
      isShowPauseButtonEnabled: observable,
      isCaptureButtonEnabled: observable,
      preferredQuality: observable,
      isClickPlayerEventMapperEnabled: observable,
      selectLeftClick: observable,
      selectRightClick: observable,
      isShowBufferTimeEnabled: observable,
      isVideoSkipHandlerEnabled: observable,
      isSharpmodeShortcutEnabled: observable,
      isLLShortcutEnabled: observable,
      isAdjustDelayNoGridEnabled: observable,
      isQualityChangeShortcutEnabled: observable,
      isMutedInactiveTabsEnabled: observable,
      isAutoChangeQualityEnabled: observable,
      isDocumentTitleUpdateEnabled: observable,
      isShowSidebarOnScreenModeAlwaysEnabled: observable,
      isMouseOverSideBarEnabled: observable,
      isChatPositionEnabled: observable,
      isAutoScreenModeEnabled: observable,
      isSelectBestQualityEnabled: observable,
      isRemoveShadowsFromCatchEnabled: observable,
      isVODHighlightEnabled: observable,
      isHideSupporterBadgeEnabled: observable,
      isHideFanBadgeEnabled: observable,
      isHideSubBadgeEnabled: observable,
      isHideVIPBadgeEnabled: observable,
      isHideMngrBadgeEnabled: observable,
      isHideStreamerBadgeEnabled: observable,
      isUnlockCopyPasteEnabled: observable,
      isHideButtonsAboveChatInputEnabled: observable,
      savedCategory: observable,
      isDarkMode: observable,
      setSetting: action,
      setDarkMode: action,
    });
  }

  setSetting<K extends keyof this>(key: K, value: this[K]): void {
    (this as any)[key] = value;
    GM_setValue(key as string, value);

    // 다이나믹 CSS 변수 처리
    if (key === "nicknameWidth") {
      document.documentElement.style.setProperty(
        "--nickname-width",
        `${value}px`
      );
    }
  }

  setDarkMode(val: boolean): void {
    this.isDarkMode = val;
  }
}
