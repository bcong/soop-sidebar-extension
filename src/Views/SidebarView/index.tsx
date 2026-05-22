import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useSettingsStore, useSidebarStore } from "@Stores/index";
import SidebarSection from "@Components/SidebarSection";
import { FavoriteGroupTabs, CategoryGroupTabs } from "@Components/GroupTabs";
import TooltipPreview from "@Components/TooltipPreview";
import { fetchFavoriteGroups } from "@Utils/api";

const SidebarView: React.FC = observer(() => {
  const settings = useSettingsStore();
  const sidebarStore = useSidebarStore();

  // 마운트 시 데이터 로드
  useEffect(() => {
    // 즐겨찾기 그룹 로드
    if (settings.isFavoriteGroupEnabled) {
      fetchFavoriteGroups().then((groups) =>
        sidebarStore.setFavoriteGroups(groups)
      );
    }

    // 폴링 시작 (30초 간격)
    sidebarStore.startPolling(30);

    return () => {
      sidebarStore.stopPolling();
    };
  }, []);

  // 사이드바 접기/펼치기 CSS 클래스
  const sidebarClass = `${settings.isSidebarMinimized ? "min" : "max"}`;

  const handleFoldClick = () => {
    settings.setSetting("isSidebarMinimized", true);
  };
  const handleUnfoldClick = () => {
    settings.setSetting("isSidebarMinimized", false);
  };

  return (
    <div id="sidebar" className={sidebarClass}>
      {/* 접기/펼치기 버튼 */}
      <button
        className="button-fold-sidebar"
        onClick={handleFoldClick}
        title="사이드바 접기"
      />
      <button
        className="button-unfold-sidebar"
        onClick={handleUnfoldClick}
        title="사이드바 펼치기"
      />

      {/* 즐겨찾기 그룹 탭 */}
      {settings.isFavoriteGroupEnabled && !settings.isSidebarMinimized && (
        <FavoriteGroupTabs />
      )}

      {/* 카테고리 탭 */}
      {settings.isCategoryGroupEnabled &&
        !settings.isSidebarMinimized &&
        sidebarStore.pinnedCategories.length > 0 && <CategoryGroupTabs />}

      {/* 즐겨찾기 섹션 */}
      {settings.displayFollow && (
        <SidebarSection
          id="users-section-follow"
          title="즐겨찾기"
          href="https://www.sooplive.com/myplus"
          channels={sidebarStore.followChannels}
          isLoading={sidebarStore.isFollowLoading}
          isMinimized={settings.isSidebarMinimized}
          defaultExpanded
        />
      )}

      {/* 마이플러스 섹션 */}
      {settings.displayMyplus && (
        <SidebarSection
          id="users-section-myplus"
          title="마이플러스"
          href="https://www.sooplive.com/myplus"
          channels={sidebarStore.myplusChannels}
          isLoading={sidebarStore.isMyplusLoading}
          isMinimized={settings.isSidebarMinimized}
        />
      )}

      {/* 인기 방송 섹션 */}
      {settings.displayTop && (
        <SidebarSection
          id="users-section-top"
          title="인기 방송"
          href="https://www.sooplive.com/"
          channels={sidebarStore.topChannels}
          isLoading={sidebarStore.isTopLoading}
          isMinimized={settings.isSidebarMinimized}
        />
      )}

      {/* 툴팁 */}
      <TooltipPreview />
    </div>
  );
});

export default SidebarView;
