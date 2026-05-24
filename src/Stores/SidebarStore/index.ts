import { makeObservable, observable, action, runInAction } from "mobx";
import { fetchBroadList, getStationFeed, getHiddenbjList } from "@Utils/api";
import { syncPush, syncPull, fetchChzzkUserId, isSyncConfigured } from "@Utils/pinSync";
import type {
    I_BlockedUser,
    I_BlockedCategory,
    I_PinnedCategory,
    I_FavoriteGroup,
    T_ChannelType,
    I_ChannelData,
} from "@Types/index.d";
import type { SettingsStore } from "@Stores/SettingsStore";

/** SOOP/Chzzk 구분 없이 시청자 수 추출 */
function getViewerCount(c: I_ChannelData): number {
    if (c.type === "chzzk") {
        return c.channel?.liveInfo?.concurrentUserCount ?? c.channel?.concurrentUserCount ?? 0;
    }
    return (c.channel?.total_view_cnt as number) ?? 0;
}

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

    // 마지막 fetch 시각 (프로그래스바용)
    lastFetchTime = 0;

    // 마지막 핀 동기화 시각
    lastSyncTime: number = GM_getValue("lastSyncTime", 0) as number;

    // 폴링 타이머
    private _pollTimer: ReturnType<typeof setTimeout> | null = null;

    private _settings: SettingsStore;

    // 원본 API 데이터 캐시 (설정 변경 시 재처리용)
    private _rawFollow: { soopData: any[]; chzzkRes: any; hiddenBjList: string[]; feedItems: any[] } | null = null;
    private _rawMyplus: { liveList: any[]; vodList: any[] } | null = null;
    private _rawTop: { soopData: any[]; chzzkRes: any } | null = null;

    constructor(settings: SettingsStore) {
        this._settings = settings;

        // GM 저장된 목록 로드
        try {
            this.blockedUsers = JSON.parse(GM_getValue("blockedUsers", "[]") as string);
        } catch {
            this.blockedUsers = [];
        }
        try {
            this.blockedCategories = JSON.parse(GM_getValue("blockedCategories", "[]") as string);
        } catch {
            this.blockedCategories = [];
        }
        try {
            this.pinnedCategories = JSON.parse(GM_getValue("pinnedCategories", "[]") as string);
        } catch {
            this.pinnedCategories = [];
        }
        try {
            this.pinnedChzzkUsers = JSON.parse(GM_getValue("pinnedChzzkUsers", "[]") as string);
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

        // localStorage 캐시에서 이전 채널 데이터 동기 로드 (빠른 초기 표시)
        this._initFromLocalStorageCache();

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
            lastFetchTime: observable,
            lastSyncTime: observable,
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
            reprocessFollow: action,
            reprocessMyplus: action,
            reprocessTop: action,
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
        if (isSyncConfigured() && this._settings.isChzzkPinSyncEnabled) {
            this._getChzzkUserId().then((uid) => {
                if (uid) syncPush(uid, users).catch(() => {});
            });
        }
        // 핀 변경 즉시 즐찾 목록 재정렬
        this.reprocessFollow();
    }

    setAllFollowUserIds(ids: string[]): void {
        this.allFollowUserIds = ids;
    }

    // 설정 변경 시 저장된 원본 데이터로 즉시 재처리
    reprocessFollow(): void {
        if (!this._rawFollow) return;
        const _t0 = performance.now();
        console.log("[Sidebar] reprocessFollow START");
        const { soopData, chzzkRes, hiddenBjList, feedItems } = this._rawFollow;
        const processed = this._processFollowData(soopData, chzzkRes, hiddenBjList, feedItems);
        this._diffApply(this.followChannels, processed);
        console.log(`[Sidebar] reprocessFollow END ${(performance.now() - _t0).toFixed(1)}ms`);
    }

    reprocessMyplus(): void {
        if (!this._rawMyplus) return;
        const _t0 = performance.now();
        console.log("[Sidebar] reprocessMyplus START");
        const { liveList } = this._rawMyplus;
        const blockedUserSet = new Set(this.blockedUsers.map((u) => u.userId));
        const blockedCatSet = new Set(this.blockedCategories.map((c) => c.categoryId));
        let liveChannels = liveList
            .filter((item: any) => !blockedUserSet.has(item.user_id))
            .filter((item: any) => !blockedCatSet.has(item.broad_cate_no))
            .map((item: any): I_ChannelData => ({ channel: item, type: "soop_live" as T_ChannelType, args: [] }));
        if (!this._settings.myplusOrder) {
            liveChannels = liveChannels.sort(
                (a, b) => ((b.channel.total_view_cnt ?? 0) as number) - ((a.channel.total_view_cnt ?? 0) as number),
            );
        }
        this._diffApply(this.myplusChannels, liveChannels);
        console.log(`[Sidebar] reprocessMyplus END ${(performance.now() - _t0).toFixed(1)}ms`);
    }

    reprocessTop(): void {
        if (!this._rawTop) return;
        const _t0 = performance.now();
        console.log("[Sidebar] reprocessTop START");
        const { soopData, chzzkRes } = this._rawTop;
        const result: I_ChannelData[] = [];
        const hiddenBjSet = new Set(this.hiddenBjList);
        const blockedUserSet = new Set(this.blockedUsers.map((u) => u.userId));
        const blockedCatSet = new Set(this.blockedCategories.map((c) => c.categoryId));
        const followSet = this._settings.isTopDuplicateRemovalEnabled ? new Set(this.allFollowUserIds) : null;
        for (const item of soopData) {
            if (hiddenBjSet.has(item.user_id)) continue;
            if (blockedUserSet.has(item.user_id)) continue;
            if (blockedCatSet.has(item.broad_cate_no)) continue;
            if (followSet?.has(item.user_id)) continue;
            result.push({ channel: item, type: "soop_live" as T_ChannelType, args: [] });
        }
        if (this.selectedPinnedCategoryIdx === 0 && chzzkRes?.content?.data) {
            const chzzkFollowSet = new Set(
                this._settings.isTopDuplicateRemovalEnabled
                    ? this.followChannels
                          .filter((c) => c.type === "chzzk")
                          .map((c) => c.channel?.channel?.channelId)
                          .filter(Boolean)
                    : [],
            );
            for (const item of chzzkRes.content.data) {
                if (chzzkFollowSet.has(item.channel?.channelId)) continue;
                result.push({ channel: item, type: "chzzk" as T_ChannelType, args: [] });
            }
        }
        // SOOP+Chzzk 통합 시청자순 정렬
        result.sort((a, b) => getViewerCount(b) - getViewerCount(a));
        this._diffApply(this.topChannels, result);
        console.log(`[Sidebar] reprocessTop END ${(performance.now() - _t0).toFixed(1)}ms`);
    }

    // ===========================
    // 데이터 fetch
    // ===========================

    async fetchFollowData(): Promise<void> {
        if (!this._settings.displayFollow) return;
        const _t0 = performance.now();
        console.log("[Sidebar] fetchFollowData START");
        if (this.followChannels.length === 0) {
            runInAction(() => {
                this.isFollowLoading = true;
            });
        }

        try {
            const groupIdx = this.selectedFavoriteGroupIdx;
            const soopUrl =
                groupIdx > 0
                    ? `https://myapi.sooplive.com/api/favorite/${groupIdx}`
                    : "https://myapi.sooplive.com/api/favorite";

            const [soopRes, chzzkRes, hiddenBjList, feedItems] = await Promise.all([
                fetchBroadList(soopUrl, 50),
                groupIdx === 0 && this._settings.isChzzkFollowChannelsEnabled
                    ? fetchBroadList("https://api.chzzk.naver.com/service/v1/channels/followings/live", 50)
                    : Promise.resolve(null),
                getHiddenbjList(),
                getStationFeed(this._settings.isChannelFeedEnabled),
            ]);

            // 치지직 유저 ID 저장값 무효화: 설정 꺼짐 → 삭제, 인증 실패(로그아웃) → 삭제
            if (!this._settings.isChzzkFollowChannelsEnabled) {
                GM_setValue("chzzkUserId", "");
            } else if (groupIdx === 0 && chzzkRes !== null && chzzkRes.code !== 200) {
                GM_setValue("chzzkUserId", "");
            }

            // soopRes가 [] (배열)이면 타임아웃/API 오류 → 이전 채널 유지
            const hasSoopError = Array.isArray(soopRes);
            const soopData: any[] = hasSoopError ? [] : (soopRes?.data ?? []);
            if (hasSoopError && this.followChannels.length > 0) {
                // 오류/타임아웃이지만 이전 데이터가 있으면 유지
                runInAction(() => {
                    this.hiddenBjList = hiddenBjList;
                    this.isFollowLoading = false;
                });
                return;
            }

            // 팔로우 유저 ID 갱신 (중복 제거용)
            if (groupIdx === 0 && soopRes?.data) {
                runInAction(() => {
                    this.allFollowUserIds = soopData.map((item: any) => item.user_id).filter(Boolean);
                });
            }

            const processed = this._processFollowData(soopData, chzzkRes, hiddenBjList, feedItems);

            runInAction(() => {
                // 원본 데이터 저장 (설정 변경 시 재처리용)
                this._rawFollow = { soopData, chzzkRes, hiddenBjList, feedItems };
                this.hiddenBjList = hiddenBjList;
                this.isFollowLoading = false;
                this._diffApply(this.followChannels, processed);
                // 팔로우 완료 후 인기채널 중복 제거 재처리
                // (fetchTopData와 동시 실행 시 allFollowUserIds가 비어 있을 수 있으므로)
                if (this._settings.isTopDuplicateRemovalEnabled && this._rawTop) {
                    this.reprocessTop();
                }
            });
        } catch (e) {
            console.error("[SOOP Sidebar] fetchFollowData 에러:", e);
            runInAction(() => {
                this.isFollowLoading = false;
            });
        } finally {
            console.log(`[Sidebar] fetchFollowData END ${(performance.now() - _t0).toFixed(1)}ms`);
        }
    }

    private _processFollowData(
        soopData: any[],
        chzzkRes: any,
        hiddenBjList: string[],
        feedItems: any[],
    ): I_ChannelData[] {
        const _t0 = performance.now();
        console.log("[Sidebar] _processFollowData START");
        const s = this._settings;
        const result: I_ChannelData[] = [];

        // O(1) 조회를 위해 Set으로 변환
        const hiddenBjSet = new Set(hiddenBjList);
        const blockedUserSet = new Set(this.blockedUsers.map((u) => u.userId));
        const blockedCatSet = new Set(this.blockedCategories.map((c) => c.categoryId));
        const pinnedChzzkSet = new Set(this.pinnedChzzkUsers);

        for (const item of soopData) {
            const userId = item.user_id;

            if (hiddenBjSet.has(userId)) continue;
            if (blockedUserSet.has(userId)) continue;

            if (item.broad_info?.length) {
                for (const broad of item.broad_info) {
                    const catBlocked = blockedCatSet.has(broad.broad_cate_no);
                    // isBlockedCategorySortingEnabled: true → 하단 이동, false → 완전 제외
                    if (catBlocked && !s.isBlockedCategorySortingEnabled) continue;

                    // 차단된 카테고리 방송은 핀 불가
                    const isPinned =
                        !catBlocked &&
                        ((s.isPinnedStreamWithNotificationEnabled && item.is_mobile_push === "Y") ||
                            (s.isPinnedStreamWithPinEnabled && item.is_pin));

                    const chzzkChannelId = pinnedChzzkSet.has(userId) ? userId : undefined;

                    result.push({
                        channel: {
                            ...broad,
                            user_nick: item.user_nick || broad.user_nick || userId,
                            profile_image: item.profile_image,
                            is_mobile_push: item.is_mobile_push,
                            is_pin: item.is_pin,
                            isPinned,
                            _isCategoryBlocked: catBlocked,
                            chzzkChannelId,
                        },
                        type: "soop_live" as T_ChannelType,
                        args: [],
                    });
                }
            } else if (s.isChannelFeedEnabled) {
                // isPinnedOnlineOnlyEnabled = false 일 때만 오프라인 채널도 고정 허용
                const isPinned =
                    !s.isPinnedOnlineOnlyEnabled &&
                    ((s.isPinnedStreamWithNotificationEnabled && item.is_mobile_push === "Y") ||
                        (s.isPinnedStreamWithPinEnabled && item.is_pin));
                const feed = feedItems.find((f: any) => f.station_user_id === userId);
                if (feed) {
                    result.push({
                        channel: {
                            ...feed,
                            user_nick: item.user_nick || userId,
                            profile_image: item.profile_image,
                            isPinned,
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
                            isPinned,
                        },
                        type: "soop_offline" as T_ChannelType,
                        args: [],
                    });
                }
            }
        }

        // Chzzk 팔로우 채널 추가
        if (chzzkRes?.code === 200) {
            const followingList: any[] = chzzkRes.content?.followingList ?? [];
            for (const item of followingList) {
                const channelId = item?.channel?.channelId ?? item?.channelId;
                const isMobilePush =
                    s.isPinnedStreamWithNotificationEnabled && item?.channel?.personalData?.following?.notification
                        ? "Y"
                        : "N";
                const isPinned = channelId ? pinnedChzzkSet.has(channelId) : false;
                result.push({
                    channel: { ...item, isPinned },
                    type: "chzzk" as T_ChannelType,
                    args: [isMobilePush],
                });
            }
        }

        // 정렬
        if (s.isRandomSortEnabled) {
            result.sort(() => Math.random() - 0.5);
        }

        // 차단된 카테고리 채널 분리 (isBlockedCategorySortingEnabled: 하단 이동)
        const blockedCat = result.filter((c) => c.channel._isCategoryBlocked);
        const main = result.filter((c) => !c.channel._isCategoryBlocked);

        // 핀 상단
        const pinned = main.filter((c) => c.channel.isPinned);
        const rest = main.filter((c) => !c.channel.isPinned);

        // 랜덤이 아닌 경우 SOOP+Chzzk 통합 시청자순 정렬
        if (!s.isRandomSortEnabled) {
            rest.sort((a, b) => getViewerCount(b) - getViewerCount(a));
        }

        const _result = [...pinned, ...rest, ...blockedCat];
        console.log(`[Sidebar] _processFollowData END (${_result.length}ch) ${(performance.now() - _t0).toFixed(1)}ms`);
        return _result;
    }

    async fetchMyplusData(): Promise<void> {
        const { displayMyplus, displayMyplusvod } = this._settings;
        if (!displayMyplus && !displayMyplusvod) return;
        const _t0 = performance.now();
        console.log("[Sidebar] fetchMyplusData START");
        if (this.myplusChannels.length === 0) {
            runInAction(() => {
                this.isMyplusLoading = true;
            });
        }

        try {
            // displayMyplusvod가 0이면 서버에 VOD를 요청하지 않음 (nInitCnt=0)
            const nInitCnt = displayMyplusvod > 0 ? 6 : 0;
            const url = `https://live.sooplive.com/api/myplus/preferbjLiveVodController.php?nInitCnt=${nInitCnt}&szRelationType=C`;
            const res = await fetchBroadList(url, 50);

            const liveList: any[] = res?.DATA?.live_list ?? [];
            const vodList: any[] = displayMyplusvod > 0 ? (res?.DATA?.vod_list ?? []) : [];

            runInAction(() => {
                this._rawMyplus = { liveList, vodList };
                this.isMyplusLoading = false;
                const blockedUserSet = new Set(this.blockedUsers.map((u) => u.userId));
                const blockedCatSet = new Set(this.blockedCategories.map((c) => c.categoryId));
                if (displayMyplus > 0) {
                    let liveChannels = liveList
                        .filter((item: any) => !blockedUserSet.has(item.user_id))
                        .filter((item: any) => !blockedCatSet.has(item.broad_cate_no))
                        .map(
                            (item: any): I_ChannelData => ({
                                channel: item,
                                type: "soop_live" as T_ChannelType,
                                args: [],
                            }),
                        );

                    // myplusOrder === 0 이면 시청자 수 순 정렬
                    if (!this._settings.myplusOrder) {
                        liveChannels = liveChannels.sort(
                            (a, b) =>
                                ((b.channel.total_view_cnt ?? 0) as number) -
                                ((a.channel.total_view_cnt ?? 0) as number),
                        );
                    }

                    this._diffApply(this.myplusChannels, liveChannels);
                }

                if (displayMyplusvod > 0) {
                    this.myplusVodChannels = vodList
                        .filter((item: any) => !blockedUserSet.has(item.user_id))
                        .map(
                            (item: any): I_ChannelData => ({
                                channel: item,
                                type: "soop_live" as T_ChannelType,
                                args: [],
                            }),
                        );
                }
            });
        } catch (e) {
            runInAction(() => {
                this.isMyplusLoading = false;
            });
        } finally {
            console.log(`[Sidebar] fetchMyplusData END ${(performance.now() - _t0).toFixed(1)}ms`);
        }
    }

    async fetchTopData(): Promise<void> {
        if (!this._settings.displayTop) return;
        const _t0 = performance.now();
        console.log("[Sidebar] fetchTopData START");
        if (this.topChannels.length === 0) {
            runInAction(() => {
                this.isTopLoading = true;
            });
        }

        try {
            const catIdx = this.selectedPinnedCategoryIdx;
            const soopUrl =
                catIdx === 0
                    ? "https://live.sooplive.com/api/main_broad_list_api.php?selectType=action&orderType=view_cnt&pageNo=1&lang=ko_KR"
                    : `https://live.sooplive.com/api/main_broad_list_api.php?selectType=cate&selectValue=${catIdx}&orderType=view_cnt&pageNo=1&lang=ko_KR`;

            const [soopRes, chzzkRes] = await Promise.all([
                fetchBroadList(soopUrl, 100),
                this._settings.isChzzkTopChannelsEnabled
                    ? fetchBroadList("https://api.chzzk.naver.com/service/v1/lives?size=100&sortType=POPULAR", 100)
                    : Promise.resolve(null),
            ]);

            const soopData: any[] = soopRes?.broad ?? [];

            const result: I_ChannelData[] = [];
            const hiddenBjSet = new Set(this.hiddenBjList);
            const blockedUserSet = new Set(this.blockedUsers.map((u) => u.userId));
            const blockedCatSet = new Set(this.blockedCategories.map((c) => c.categoryId));
            const followSet = this._settings.isTopDuplicateRemovalEnabled ? new Set(this.allFollowUserIds) : null;

            // 원본 데이터 저장 (설정 변경 시 재처리용)
            this._rawTop = { soopData, chzzkRes };

            for (const item of soopData) {
                if (hiddenBjSet.has(item.user_id)) continue;
                if (blockedUserSet.has(item.user_id)) continue;
                if (blockedCatSet.has(item.broad_cate_no)) continue;
                if (followSet?.has(item.user_id)) continue;
                result.push({ channel: item, type: "soop_live" as T_ChannelType, args: [] });
            }

            // Chzzk 인기 채널 추가
            if (catIdx === 0 && chzzkRes?.content?.data) {
                const chzzkFollowSet = new Set(
                    this._settings.isTopDuplicateRemovalEnabled
                        ? this.followChannels
                              .filter((c) => c.type === "chzzk")
                              .map((c) => c.channel?.channel?.channelId)
                              .filter(Boolean)
                        : [],
                );
                for (const item of chzzkRes.content.data) {
                    if (chzzkFollowSet.has(item.channel?.channelId)) continue;
                    result.push({ channel: item, type: "chzzk" as T_ChannelType, args: [] });
                }
            }

            // SOOP+Chzzk 통합 시청자순 정렬
            result.sort((a, b) => getViewerCount(b) - getViewerCount(a));

            runInAction(() => {
                this.isTopLoading = false;
                this._diffApply(this.topChannels, result);
            });
        } catch (e) {
            runInAction(() => {
                this.isTopLoading = false;
            });
        } finally {
            console.log(`[Sidebar] fetchTopData END ${(performance.now() - _t0).toFixed(1)}ms`);
        }
    }

    async fetchAllData(): Promise<void> {
        const _t0 = performance.now();
        console.log("[Sidebar] fetchAllData START");
        runInAction(() => {
            this.lastFetchTime = Date.now();
        });
        await Promise.all([this.fetchFollowData(), this.fetchMyplusData(), this.fetchTopData()]);
        await this._syncPull();
        console.log(`[Sidebar] fetchAllData END ${(performance.now() - _t0).toFixed(1)}ms`);
    }

    /** 치지직 유저 ID를 GM 스토리지에서 읽어 반환. 없으면 1회 fetch 후 GM_setValue로 저장 */
    private async _getChzzkUserId(): Promise<string | null> {
        const stored = GM_getValue("chzzkUserId", "") as string;
        if (stored) return stored;
        const uid = await fetchChzzkUserId();
        if (uid) GM_setValue("chzzkUserId", uid);
        return uid;
    }

    private async _syncPull(): Promise<void> {
        if (!this._settings.isChzzkPinSyncEnabled || !isSyncConfigured()) return;
        const _t0 = performance.now();
        console.log("[Sidebar] _syncPull START");
        try {
            const uid = await this._getChzzkUserId();
            if (!uid) return;
            const pins = await syncPull(uid);
            const now = Date.now();
            GM_setValue("lastSyncTime", now);
            runInAction(() => {
                this.lastSyncTime = now;
            });
            if (pins.length === 0) return;
            const current = JSON.stringify([...this.pinnedChzzkUsers].sort());
            const remote = JSON.stringify([...pins].sort());
            if (remote === current) return;
            runInAction(() => {
                this.pinnedChzzkUsers = pins;
                GM_setValue("pinnedChzzkUsers", JSON.stringify(pins));
                this.reprocessFollow();
            });
        } catch {
            // 네트워크 오류 무시
        } finally {
            console.log(`[Sidebar] _syncPull END ${(performance.now() - _t0).toFixed(1)}ms`);
        }
    }

    startPolling(intervalSeconds = 30): void {
        this.stopPolling();
        this.fetchAllData();
        // 첫 요청 후 10초 재시도, 이후 intervalSeconds 간격 유지
        this._pollTimer = setTimeout(() => {
            this.fetchAllData();
            this._pollTimer = setInterval(() => {
                this.fetchAllData();
            }, intervalSeconds * 1000) as unknown as ReturnType<typeof setTimeout>;
        }, 10 * 1000);
    }

    stopPolling(): void {
        if (this._pollTimer) {
            clearTimeout(this._pollTimer);
            this._pollTimer = null;
        }
    }

    // ===========================
    // 주요 업데이트
    // ===========================

    /** localStorage 캐시에서 이전 데이터 동기 로드 — 첫 렌더링 종료 전에 채널 표시 */
    private _initFromLocalStorageCache(): void {
        const _t0 = performance.now();
        console.log("[Sidebar] _initFromLocalStorageCache START");
        const readCache = (url: string, expiryMs: number): any | null => {
            try {
                const raw = localStorage.getItem(`fetchCache_${encodeURIComponent(url)}`);
                if (!raw) return null;
                const { timestamp, data } = JSON.parse(raw);
                return Date.now() - timestamp < expiryMs ? data : null;
            } catch {
                return null;
            }
        };

        // 즐찾기
        const followData = readCache("https://myapi.sooplive.com/api/favorite", 50_000);
        if (followData?.data?.length) {
            const channels: I_ChannelData[] = [];
            for (const item of followData.data as any[]) {
                if (item.broad_info?.length) {
                    for (const broad of item.broad_info) {
                        channels.push({
                            channel: {
                                ...broad,
                                user_nick: item.user_nick || broad.user_nick || item.user_id,
                                profile_image: item.profile_image,
                                is_mobile_push: item.is_mobile_push,
                            },
                            type: "soop_live" as T_ChannelType,
                            args: [],
                        });
                    }
                }
            }
            if (channels.length > 0) {
                this.followChannels = channels;
            }
        }

        // 추천
        const myplusData = readCache(
            "https://live.sooplive.com/api/myplus/preferbjLiveVodController.php?nInitCnt=6&szRelationType=C",
            50_000,
        );
        if (myplusData?.DATA?.live_list?.length) {
            this.myplusChannels = (myplusData.DATA.live_list as any[]).map(
                (item: any): I_ChannelData => ({
                    channel: item,
                    type: "soop_live" as T_ChannelType,
                    args: [],
                }),
            );
        }

        // 인기
        const topData = readCache(
            "https://live.sooplive.com/api/main_broad_list_api.php?selectType=action&orderType=view_cnt&pageNo=1&lang=ko_KR",
            100_000,
        );
        if (topData?.broad?.length) {
            this.topChannels = (topData.broad as any[]).map(
                (item: any): I_ChannelData => ({
                    channel: item,
                    type: "soop_live" as T_ChannelType,
                    args: [],
                }),
            );
        }
        console.log(`[Sidebar] _initFromLocalStorageCache END ${(performance.now() - _t0).toFixed(1)}ms`);
    }

    // ===========================
    // 채널 목록 diff 업데이트
    // ===========================

    private _getChannelKey(c: I_ChannelData): string {
        if (c.type === "chzzk") {
            return `chzzk_${c.channel?.channel?.channelId ?? c.channel?.channelId ?? ""}`;
        }
        if (c.type === "soop_feed") return `feed_${c.channel?.user_id ?? ""}`;
        if (c.type === "soop_offline") return `offline_${c.channel?.user_id ?? ""}`;
        if (c.type === "soop_vod") return `vod_${c.channel?.user_id ?? ""}_${c.channel?.title_no ?? ""}`;
        return `soop_${c.channel?.user_id ?? ""}_${c.channel?.broad_no ?? ""}`;
    }

    private _updateMutableFields(existing: I_ChannelData, next: I_ChannelData): void {
        const e = existing.channel as any;
        const n = next.channel as any;
        if (existing.type === "soop_live") {
            e.total_view_cnt = n.total_view_cnt;
            e.broad_title = n.broad_title;
            e.category_name = n.category_name;
            e.broad_cate_no = n.broad_cate_no;
            e.is_mobile_push = n.is_mobile_push;
            e.isPinned = n.isPinned;
            if (n.profile_image != null) e.profile_image = n.profile_image;
        } else if (existing.type === "chzzk") {
            if (n.liveInfo) e.liveInfo = n.liveInfo;
            if (n.concurrentUserCount != null) e.concurrentUserCount = n.concurrentUserCount;
            if (n.liveTitle != null) e.liveTitle = n.liveTitle;
            if (n.liveCategoryValue != null) e.liveCategoryValue = n.liveCategoryValue;
        }
    }

    /** 기존 배열을 in-place로 diff 업데이트. 없어진 채널 제거, 기존 채널 필드 업데이트, 새 채널 삽입, 순서 재정렬 */
    private _diffApply(current: I_ChannelData[], next: I_ChannelData[]): void {
        const _t0 = performance.now();
        console.log(`[Sidebar] _diffApply START (${current.length} → ${next.length})`);
        const currentMap = new Map(current.map((c) => [this._getChannelKey(c), c]));
        const nextMap = new Map(next.map((c) => [this._getChannelKey(c), c]));

        // 기존 채널 필드 업데이트 (같은 참조 유지)
        for (const [key, existing] of currentMap) {
            const newItem = nextMap.get(key);
            if (newItem) this._updateMutableFields(existing, newItem);
        }

        // next 순서 기준으로 재구성: 기존 참조 재사용, 신규는 그대로 삽입 — O(n)
        const newOrder = next.map((n) => currentMap.get(this._getChannelKey(n)) ?? n);
        current.splice(0, current.length, ...newOrder);
        console.log(`[Sidebar] _diffApply END ${(performance.now() - _t0).toFixed(1)}ms`);
    }
}
