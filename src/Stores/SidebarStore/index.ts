import { makeObservable, observable, action, runInAction } from "mobx";
import { fetchBroadList, getStationFeed, getHiddenbjList, fetchFavoriteGroups, getFollowList } from "@Utils/api";
import { isCategoryBlocked, isUserBlocked, isCategoryPinned } from "@Utils/blocking";
import type {
  I_SoopLiveChannel,
  I_ChzzkLiveChannel,
  I_SoopVodChannel,
  I_FeedItem,
  I_BlockedUser,
  I_BlockedCategory,
  I_PinnedCategory,
  I_FavoriteGroup,
  T_ChannelType,
  I_ChannelData,
} from "@Types/index.d";
import type { SettingsStore } from "@Stores/SettingsStore";

export class SidebarStore {
  // 데이터 맵 (섹션 ID → 채널 배열)
  followChannels: I_ChannelData[] = [];
  myplusChannels: I_ChannelData[] = [];
  myplusVodChannels: I_ChannelData[] = [];
  topChannels: I_ChannelData[] = [];

  // 탭 관련
  favoriteGroups: I_FavoriteGroup[] = [];
  selectedFavoriteGroupIdx = 0;
  selectedPinnedCategoryIdx = 0;

  // 차단/고정 목록
  blockedUsers: I_BlockedUser[] = [];
  blockedCategories: I_BlockedCategory[] = [];
  pinnedCategories: I_PinnedCategory[] = [];
  pinnedChzzkUsers: string[] = [];

  // 팔로우 유저 ID 목록 (중복 제거용)
  allFollowUserIds: string[] = [];

  // 숨김 BJ 목록
  hiddenBjList: string[] = [];

  // 로딩 상태
  isFollowLoading = false;
  isMyplusLoading = false;
  isTopLoading = false;

  // 폴링 타이머
  private _pollTimer: ReturnType<typeof setInterval> | null = null;

  private _settings: SettingsStore;

  constructor(settings: SettingsStore) {
    this._settings = settings;

    // GM 저장된 목록 로드
    try {
      this.blockedUsers = JSON.parse(
        GM_getValue("blockedUsers", "[]") as string
      );
    } catch {
      this.blockedUsers = [];
    }
    try {
      this.blockedCategories = JSON.parse(
        GM_getValue("blockedCategories", "[]") as string
      );
    } catch {
      this.blockedCategories = [];
    }
    try {
      this.pinnedCategories = JSON.parse(
        GM_getValue("pinnedCategories", "[]") as string
      );
    } catch {
      this.pinnedCategories = [];
    }
    try {
      this.pinnedChzzkUsers = JSON.parse(
        GM_getValue("pinnedChzzkUsers", "[]") as string
      );
    } catch {
      this.pinnedChzzkUsers = [];
    }
    try {
      this.allFollowUserIds = GM_getValue("allFollowUserIds", []) as string[];
    } catch {
      this.allFollowUserIds = [];
    }

    this.selectedFavoriteGroupIdx = settings.selectedFavoriteGroupIdx;
    this.selectedPinnedCategoryIdx = settings.selectedPinnedCategoryIdx;

    makeObservable(this, {
      followChannels: observable,
      myplusChannels: observable,
      myplusVodChannels: observable,
      topChannels: observable,
      favoriteGroups: observable,
      selectedFavoriteGroupIdx: observable,
      selectedPinnedCategoryIdx: observable,
      blockedUsers: observable,
      blockedCategories: observable,
      pinnedCategories: observable,
      pinnedChzzkUsers: observable,
      allFollowUserIds: observable,
      hiddenBjList: observable,
      isFollowLoading: observable,
      isMyplusLoading: observable,
      isTopLoading: observable,
      setFollowChannels: action,
      setMyplusChannels: action,
      setTopChannels: action,
      setFavoriteGroups: action,
      setSelectedFavoriteGroupIdx: action,
      setSelectedPinnedCategoryIdx: action,
      setBlockedUsers: action,
      setBlockedCategories: action,
      setPinnedCategories: action,
      setPinnedChzzkUsers: action,
      setAllFollowUserIds: action,
    });
  }

  // ===========================
  // Action setters
  // ===========================

  setFollowChannels(channels: I_ChannelData[]): void {
    this.followChannels = channels;
  }

  setMyplusChannels(channels: I_ChannelData[]): void {
    this.myplusChannels = channels;
  }

  setTopChannels(channels: I_ChannelData[]): void {
    this.topChannels = channels;
  }

  setFavoriteGroups(groups: I_FavoriteGroup[]): void {
    this.favoriteGroups = groups;
  }

  setSelectedFavoriteGroupIdx(idx: number): void {
    this.selectedFavoriteGroupIdx = idx;
    this._settings.setSetting("selectedFavoriteGroupIdx", idx);
  }

  setSelectedPinnedCategoryIdx(idx: number): void {
    this.selectedPinnedCategoryIdx = idx;
    this._settings.setSetting("selectedPinnedCategoryIdx", idx);
  }

  setBlockedUsers(users: I_BlockedUser[]): void {
    this.blockedUsers = users;
    GM_setValue("blockedUsers", JSON.stringify(users));
  }

  setBlockedCategories(cats: I_BlockedCategory[]): void {
    this.blockedCategories = cats;
    GM_setValue("blockedCategories", JSON.stringify(cats));
  }

  setPinnedCategories(cats: I_PinnedCategory[]): void {
    this.pinnedCategories = cats;
    GM_setValue("pinnedCategories", JSON.stringify(cats));
  }

  setPinnedChzzkUsers(users: string[]): void {
    this.pinnedChzzkUsers = users;
    GM_setValue("pinnedChzzkUsers", JSON.stringify(users));
  }

  setAllFollowUserIds(ids: string[]): void {
    this.allFollowUserIds = ids;
  }

  // ===========================
  // 데이터 fetch
  // ===========================

  async fetchFollowData(): Promise<void> {
    if (!this._settings.displayFollow) return;
    runInAction(() => { this.isFollowLoading = true; });

    try {
      const groupIdx = this.selectedFavoriteGroupIdx;
      const url = groupIdx > 0
        ? `https://myapi.sooplive.com/api/favorite?group_idx=${groupIdx}`
        : "https://myapi.sooplive.com/api/favorite?cate_type=LIVEON";

      const res = await fetchBroadList(url, 50);
      const data = res?.data ?? [];

      const hiddenBjList = await getHiddenbjList();
      const feedItems = await getStationFeed(this._settings.isChannelFeedEnabled);

      runInAction(() => {
        this.hiddenBjList = hiddenBjList;
        this.isFollowLoading = false;
        this.followChannels = this._processFollowData(data, hiddenBjList, feedItems);
      });
    } catch (e) {
      runInAction(() => { this.isFollowLoading = false; });
    }
  }

  private _processFollowData(
    data: any[],
    hiddenBjList: string[],
    feedItems: any[]
  ): I_ChannelData[] {
    const s = this._settings;
    const result: I_ChannelData[] = [];

    for (const item of data) {
      const userId = item.user_id;

      if (hiddenBjList.includes(userId)) continue;
      if (isUserBlocked(userId, this.blockedUsers)) continue;

      if (item.broad_info?.length) {
        for (const broad of item.broad_info) {
          if (isCategoryBlocked(broad.broad_cate_no, this.blockedCategories)) continue;

          const isPinned = s.isPinnedStreamWithNotificationEnabled && item.is_mobile_push === "Y"
            || s.isPinnedStreamWithPinEnabled && item.is_pin;

          const chzzkChannelId = this.pinnedChzzkUsers.find(
            (c) => c === userId
          );

          result.push({
            channel: {
              ...broad,
              user_nick: item.user_nick || broad.user_nick || userId,
              profile_image: item.profile_image,
              is_mobile_push: item.is_mobile_push,
              is_pin: item.is_pin,
              isPinned,
              chzzkChannelId,
            },
            type: "soop_live" as T_ChannelType,
            args: [],
          });
        }
      } else if (s.isChannelFeedEnabled) {
        const feed = feedItems.find(
          (f: any) => f.station_user_id === userId
        );
        if (feed) {
          result.push({
            channel: {
              ...feed,
              user_nick: item.user_nick || userId,
              profile_image: item.profile_image,
            },
            type: "soop_feed" as T_ChannelType,
            args: [],
          });
        } else {
          result.push({
            channel: {
              user_id: userId,
              user_nick: item.user_nick || userId,
              profile_image: item.profile_image,
            },
            type: "soop_offline" as T_ChannelType,
            args: [],
          });
        }
      }
    }

    // 정렬
    if (s.isRandomSortEnabled) {
      result.sort(() => Math.random() - 0.5);
    }

    // 핀 상단
    const pinned = result.filter((c) => c.channel.isPinned);
    const rest = result.filter((c) => !c.channel.isPinned);
    return [...pinned, ...rest];
  }

  async fetchMyplusData(): Promise<void> {
    if (!this._settings.displayMyplus) return;
    runInAction(() => { this.isMyplusLoading = true; });

    try {
      const url = "https://myapi.sooplive.com/api/my-plus/on-air?type=LIVEON&page=1&per_page=200";
      const res = await fetchBroadList(url, 50);
      const data = res?.data ?? [];

      runInAction(() => {
        this.isMyplusLoading = false;
        this.myplusChannels = data
          .filter((item: any) => !isUserBlocked(item.user_id, this.blockedUsers))
          .filter((item: any) => !isCategoryBlocked(item.broad_cate_no, this.blockedCategories))
          .map((item: any): I_ChannelData => ({
            channel: item,
            type: "soop_live" as T_ChannelType,
            args: [],
          }));
      });
    } catch (e) {
      runInAction(() => { this.isMyplusLoading = false; });
    }
  }

  async fetchTopData(): Promise<void> {
    if (!this._settings.displayTop) return;
    runInAction(() => { this.isTopLoading = true; });

    try {
      const url = "https://live.sooplive.com/api/get_station_list.php?type=html5&szOrder=view_cnt&nPageNo=1&nListCnt=50&szBjId=&szSearchWord=&nCateNo=0";
      const res = await fetchBroadList(url, 50);
      const data = res?.DATA ?? [];

      runInAction(() => {
        this.isTopLoading = false;
        this.topChannels = data
          .filter((item: any) => !isUserBlocked(item.user_id, this.blockedUsers))
          .filter((item: any) => !isCategoryBlocked(item.broad_cate_no, this.blockedCategories))
          .map((item: any): I_ChannelData => ({
            channel: item,
            type: "soop_live" as T_ChannelType,
            args: [],
          }));
      });
    } catch (e) {
      runInAction(() => { this.isTopLoading = false; });
    }
  }

  async fetchAllData(): Promise<void> {
    await Promise.all([
      this.fetchFollowData(),
      this.fetchMyplusData(),
      this.fetchTopData(),
    ]);
  }

  startPolling(intervalSeconds = 30): void {
    this.fetchAllData();
    this._pollTimer = setInterval(() => {
      this.fetchAllData();
    }, intervalSeconds * 1000);
  }

  stopPolling(): void {
    if (this._pollTimer) {
      clearInterval(this._pollTimer);
      this._pollTimer = null;
    }
  }
}
