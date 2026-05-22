// ===========================
// 설정 키 타입
// ===========================
export type T_SETTING_KEY =
  | "isCustomSidebarEnabled"
  | "isRandomSortEnabled"
  | "isFavoriteGroupEnabled"
  | "isShortenFavoriteGroupNameEnabled"
  | "isCategoryGroupEnabled"
  | "isShortenCategoryNameEnabled"
  | "isChannelFeedEnabled"
  | "isBlockedCategorySortingEnabled"
  | "isPinnedStreamWithNotificationEnabled"
  | "isPinnedStreamWithPinEnabled"
  | "isPinnedOnlineOnlyEnabled"
  | "isSmallUserLayoutEnabled"
  | "isSendLoadBroadEnabled"
  | "isOpenNewtabEnabled"
  | "isDuplicateRemovalEnabled"
  | "isTopDuplicateRemovalEnabled"
  | "myplusOrder"
  | "isChzzkFollowChannelsEnabled"
  | "isChzzkTopChannelsEnabled"
  | "displayFollow"
  | "displayMyplus"
  | "displayMyplusvod"
  | "displayTop"
  | "nicknameWidth"
  | "isThemeLockEnabled"
  | "isRemoveRedistributionTagEnabled"
  | "isRemoveWatchLaterButtonEnabled"
  | "isRemoveBroadStartTimeTagEnabled"
  | "isReplaceEmptyThumbnailEnabled"
  | "isThumbnailTooltipEnabled"
  | "isRemoveCarouselEnabled"
  | "isBroadTitleTextEllipsisEnabled"
  | "isNoAutoVODEnabled"
  | "isAutoResumeVideoEnabled"
  | "isRedirectLiveEnabled"
  | "redirectLiveSortOption"
  | "isHideEsportsInfoEnabled"
  | "isShowPauseButtonEnabled"
  | "isCaptureButtonEnabled"
  | "preferredQuality"
  | "isClickPlayerEventMapperEnabled"
  | "selectLeftClick"
  | "selectRightClick"
  | "isShowBufferTimeEnabled"
  | "isVideoSkipHandlerEnabled"
  | "isSharpmodeShortcutEnabled"
  | "isLLShortcutEnabled"
  | "isAdjustDelayNoGridEnabled"
  | "isQualityChangeShortcutEnabled"
  | "isMutedInactiveTabsEnabled"
  | "isAutoChangeQualityEnabled"
  | "isDocumentTitleUpdateEnabled"
  | "isShowSidebarOnScreenModeAlwaysEnabled"
  | "isMouseOverSideBarEnabled"
  | "isChatPositionEnabled"
  | "isAutoScreenModeEnabled"
  | "isSelectBestQualityEnabled"
  | "isRemoveShadowsFromCatchEnabled"
  | "isVODHighlightEnabled"
  | "isAlignNicknameRightEnabled"
  | "isHideSupporterBadgeEnabled"
  | "isHideFanBadgeEnabled"
  | "isHideSubBadgeEnabled"
  | "isHideVIPBadgeEnabled"
  | "isHideMngrBadgeEnabled"
  | "isHideStreamerBadgeEnabled"
  | "isUnlockCopyPasteEnabled"
  | "isHideButtonsAboveChatInputEnabled"
  | "isSidebarMinimized"
  | "sidebarSectionOrder"
  | "selectedFavoriteGroupIdx"
  | "selectedPinnedCategoryIdx"
  | "blockedUsers"
  | "blockedCategories"
  | "pinnedCategories"
  | "pinnedChzzkUsers"
  | "allFollowUserIds"
  | "WEB_PLAYER_SCROLL_LEFT";

// ===========================
// 채널 데이터 타입
// ===========================
export interface I_SoopLiveChannel {
  user_id: string;
  broad_no: string | number;
  total_view_cnt: number;
  broad_title: string;
  user_nick: string;
  broad_start: string;
  broad_cate_no: string;
  category_name?: string;
  subscription_only?: number | string;
  is_mobile_push?: string;
  is_pin?: boolean;
}

export interface I_SoopFavoriteItem {
  user_id: string;
  user_nick?: string;
  is_live: boolean;
  is_mobile_push?: string;
  is_pin?: boolean;
  broad_info?: I_SoopLiveChannel[];
  profile_image?: string;
}

export interface I_SoopVodChannel {
  user_id: string;
  title_no: string | number;
  view_cnt: number;
  title: string;
  user_nick: string;
  vod_duration?: number;
  reg_date?: string;
  thumbnail?: string;
  category?: string;
}

export interface I_ChzzkLiveChannel {
  channel: {
    channelId: string;
    channelName: string;
    channelImageUrl?: string;
    personalData?: {
      following?: {
        notification?: boolean;
      };
    };
  };
  liveInfo?: {
    liveTitle: string;
    liveImageUrl?: string;
    concurrentUserCount: number;
    liveCategoryValue?: string;
  };
  liveTitle?: string;
  liveImageUrl?: string;
  concurrentUserCount?: number;
  liveCategoryValue?: string;
  openDate?: string;
}

export interface I_FeedItem {
  station_user_id: string;
  reg_timestamp: number;
  title?: string;
  file_cover?: string;
  broad_view_cnt?: number;
  like_cnt?: number;
  comment_cnt?: number;
  content?: string;
}

// ===========================
// 채널 데이터 래퍼 타입 (범용)
// ===========================
export type T_ChannelType =
  | "soop_live"
  | "soop_feed"
  | "soop_offline"
  | "soop_vod"
  | "chzzk";

export interface I_ChannelData {
  channel: any;
  type: T_ChannelType;
  args: any[];
}

// ===========================
// 차단/고정 목록 타입
// ===========================
export interface I_BlockedUser {
  userName: string;
  userId: string;
}

export interface I_BlockedCategory {
  categoryName: string;
  categoryId: string;
}

export interface I_PinnedCategory {
  categoryName: string;
  categoryId: string;
}

// ===========================
// 카테고리 타입
// ===========================
export interface I_Category {
  cate_no: string;
  cate_name: string;
  child?: I_Category[];
}

export interface I_CategoryData {
  CHANNEL: {
    RESULT: string;
    BROAD_CATEGORY: I_Category[];
  };
}

// ===========================
// 즐겨찾기 그룹 타입
// ===========================
export interface I_FavoriteGroup {
  idx: string | number;
  title: string;
}

// ===========================
// 섹션 설정 타입
// ===========================
export interface I_SectionConfig {
  id: string;
  title: string;
  href: string;
  iconHtml: string;
  containerSelector: string;
  fetchData: () => Promise<I_ChannelData[]>;
  createElement: (
    channel: any,
    type: T_ChannelType,
    ...args: any[]
  ) => HTMLElement | null;
  showMoreButtonId: string;
  displayCount: number;
  enabled: boolean;
}

// ===========================
// unsafeWindow 확장 타입
// ===========================
declare global {
  interface Window {
    livePlayer?: any;
    liveView?: any;
    Hls?: any;
  }
}
