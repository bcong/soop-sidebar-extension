import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useSettingsStore, useSidebarStore } from "@Stores/index";
import SidebarSection from "@Components/SidebarSection";
import { FavoriteGroupTabs, CategoryGroupTabs } from "@Components/GroupTabs";
import TooltipPreview, { showTooltip, hideTooltip } from "@Components/TooltipPreview";
import { fetchFavoriteGroups, loadCategoryData } from "@Utils/api";
import "./style.less";

const SidebarView: React.FC = observer(() => {
    const settings = useSettingsStore();
    const sidebarStore = useSidebarStore();

    // 마운트 시 데이터 로드
    useEffect(() => {
        // 카테고리 데이터 로드 (15분 캐시)
        loadCategoryData();

        // 즐겨찾기 그룹 로드
        if (settings.isFavoriteGroupEnabled) {
            fetchFavoriteGroups().then((groups) => sidebarStore.setFavoriteGroups(groups));
        }

        // 폴링 시작
        sidebarStore.startPolling(settings.pollIntervalSeconds);

        return () => {
            sidebarStore.stopPolling();
        };
    }, []);

    // 주기 변경 시 폴링 재시작
    useEffect(() => {
        sidebarStore.stopPolling();
        sidebarStore.startPolling(settings.pollIntervalSeconds);
    }, [settings.pollIntervalSeconds]);

    // 즐찾 정렬/핀 설정 변경 → 즉시 재처리
    useEffect(() => {
        sidebarStore.reprocessFollow();
    }, [
        settings.isPinnedStreamWithNotificationEnabled,
        settings.isPinnedStreamWithPinEnabled,
        settings.isPinnedOnlineOnlyEnabled,
        settings.isRandomSortEnabled,
        settings.isBlockedCategorySortingEnabled,
        settings.isChannelFeedEnabled,
    ]);

    // 추천 채널 정렬 설정 변경 → 즉시 재처리
    useEffect(() => {
        sidebarStore.reprocessMyplus();
    }, [settings.myplusOrder]);

    // 썸네일 툴팁 (모든 페이지 공통)
    useEffect(() => {
        if (!settings.isThumbnailTooltipEnabled) return;
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // SOOP 채널 hover
            const soopItem = target.closest("[data-broadcast-no]") as HTMLElement | null;
            if (soopItem) {
                const broadNo = soopItem.dataset.broadcastNo;
                const userId = soopItem.dataset.userId ?? "";
                const userNick = soopItem.dataset.userNick ?? "";
                const broadTitle = soopItem.dataset.broadTitle ?? "";
                if (!broadNo) return;
                const broadStart = soopItem.dataset.broadStart;
                const totalViewCntRaw = soopItem.dataset.totalViewCnt;
                const totalViewCnt = totalViewCntRaw !== undefined ? parseInt(totalViewCntRaw, 10) : undefined;
                showTooltip(
                    { userId, userNick, broadTitle, broadNo, broadStart, totalViewCnt, type: "live" },
                    e.clientX,
                    e.clientY,
                );
                return;
            }

            // Chzzk 채널 hover
            const chzzkItem = target.closest("[data-chzzk-channel-id]") as HTMLElement | null;
            if (chzzkItem) {
                const userId = chzzkItem.dataset.chzzkChannelId ?? "";
                const userNick = chzzkItem.dataset.channelName ?? "";
                const broadTitle = chzzkItem.dataset.liveTitle ?? "";
                const thumbnailUrl = chzzkItem.dataset.liveImageUrl || undefined;
                const broadStart = chzzkItem.dataset.openDate || undefined;
                const viewsRaw = chzzkItem.dataset.concurrentUserCount;
                const totalViewCnt = viewsRaw !== undefined ? parseInt(viewsRaw, 10) : undefined;
                showTooltip(
                    {
                        userId,
                        userNick,
                        broadTitle,
                        thumbnailUrl,
                        broadStart,
                        totalViewCnt,
                        type: "live",
                        platform: "chzzk",
                    },
                    e.clientX,
                    e.clientY,
                );
            }
        };
        const handleMouseOut = () => hideTooltip();
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);
        return () => {
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
        };
    }, [settings.isThumbnailTooltipEnabled]);

    // 인기 채널 중복 제거 설정 변경 → 즉시 재처리
    useEffect(() => {
        sidebarStore.reprocessTop();
    }, [settings.isTopDuplicateRemovalEnabled]);

    // 새로고침 프로그래스바
    const [refreshProgress, setRefreshProgress] = useState(0);
    useEffect(() => {
        const INTERVAL = settings.pollIntervalSeconds * 1000;
        const tick = () => {
            const elapsed = sidebarStore.lastFetchTime ? Date.now() - sidebarStore.lastFetchTime : 0;
            setRefreshProgress(Math.min(100, (elapsed / INTERVAL) * 100));
        };
        tick();
        const timer = setInterval(tick, 500);
        return () => clearInterval(timer);
    }, [sidebarStore.lastFetchTime, settings.pollIntervalSeconds]);

    // 사이드바 접기/펼치기 CSS 클래스
    const sidebarClass = `${settings.isSidebarMinimized ? "min" : "max"}`;
    const handleToggle = () => settings.setSetting("isSidebarMinimized", !settings.isSidebarMinimized);

    return (
        <div id="sidebar" className={sidebarClass}>
            <div id="sidebar-refresh-bar">
                <div id="sidebar-refresh-fill" style={{ width: `${refreshProgress}%` }} />
            </div>
            <div className="button-fold-sidebar" role="button" onClick={handleToggle}>
                <span className="sidebar-refresh-countdown"></span>
            </div>
            <div className="button-unfold-sidebar" role="button" onClick={handleToggle}></div>
            {/* 즐겨찾기 섹션 (그룹 탭 포함) */}
            {settings.displayFollow > 0 && (
                <SidebarSection
                    id="follow"
                    title="즐겨찾기 채널"
                    href="https://www.sooplive.com/my/favorite"
                    channels={sidebarStore.followChannels}
                    isLoading={sidebarStore.isFollowLoading}
                    maxCount={settings.displayFollow}
                >
                    {settings.isFavoriteGroupEnabled && <FavoriteGroupTabs />}
                </SidebarSection>
            )}

            {/* 추천 채널 섹션 */}
            {settings.displayMyplus > 0 && (
                <SidebarSection
                    id="myplus"
                    title="추천 채널"
                    href="https://www.sooplive.com/myplus"
                    channels={sidebarStore.myplusChannels}
                    isLoading={sidebarStore.isMyplusLoading}
                    maxCount={settings.displayMyplus}
                />
            )}

            {/* 인기 채널 섹션 (카테고리 탭 포함) */}
            {settings.displayTop > 0 && (
                <SidebarSection
                    id="top"
                    title="인기 채널"
                    href="https://www.sooplive.com/live/all"
                    channels={sidebarStore.topChannels}
                    isLoading={sidebarStore.isTopLoading}
                    maxCount={settings.displayTop}
                >
                    {settings.isCategoryGroupEnabled && sidebarStore.pinnedCategories.length > 0 && (
                        <CategoryGroupTabs />
                    )}
                </SidebarSection>
            )}

            {/* 툴팁 */}
            <TooltipPreview />
        </div>
    );
});

export default SidebarView;
