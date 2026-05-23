import React, { useRef, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useSidebarStore, useSettingsStore } from "@Stores/index";
import type { I_FavoriteGroup, I_PinnedCategory } from "@Types/index.d";
import "./style.less";

// ============================================================
// 즐겨찾기 그룹 탭
// ============================================================

const FavoriteGroupTabs: React.FC = observer(() => {
    const settings = useSettingsStore();
    const sidebarStore = useSidebarStore();
    const tabsRef = useRef<HTMLDivElement>(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);

    const updateScrollBtns = () => {
        const el = tabsRef.current;
        if (!el) return;
        setShowLeft(el.scrollLeft > 0);
        setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    useEffect(() => {
        const el = tabsRef.current;
        if (!el) return;
        el.addEventListener("scroll", updateScrollBtns);
        updateScrollBtns();
        return () => el.removeEventListener("scroll", updateScrollBtns);
    }, [sidebarStore.favoriteGroups]);

    const scroll = (dir: "left" | "right") => {
        const el = tabsRef.current;
        if (!el) return;
        el.scrollBy({ left: dir === "left" ? -100 : 100, behavior: "smooth" });
    };

    const allTab = { idx: 0, title: "전체" } as I_FavoriteGroup;
    const tabs = [allTab, ...sidebarStore.favoriteGroups];

    return (
        <div id="favorite-group-wrapper">
            <button
                className={`fav-group-scroll-btn scroll-btn-left${showLeft ? " visible" : ""}`}
                onClick={() => scroll("left")}
            >
                ‹
            </button>
            <div id="favorite-group-tabs" ref={tabsRef}>
                {tabs.map((group) => (
                    <button
                        key={group.idx}
                        className={`fav-group-tab${sidebarStore.selectedFavoriteGroupIdx === Number(group.idx) ? " active" : ""}`}
                        onClick={() => {
                            sidebarStore.setSelectedFavoriteGroupIdx(Number(group.idx));
                            sidebarStore.fetchFollowData();
                        }}
                    >
                        {settings.isShortenFavoriteGroupNameEnabled ? String(group.title).slice(0, 4) : group.title}
                    </button>
                ))}
            </div>
            <button
                className={`fav-group-scroll-btn scroll-btn-right${showRight ? " visible" : ""}`}
                onClick={() => scroll("right")}
            >
                ›
            </button>
        </div>
    );
});

// ============================================================
// 카테고리 탭
// ============================================================

const CategoryGroupTabs: React.FC = observer(() => {
    const sidebarStore = useSidebarStore();
    const tabsRef = useRef<HTMLDivElement>(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);

    const updateScrollBtns = () => {
        const el = tabsRef.current;
        if (!el) return;
        setShowLeft(el.scrollLeft > 0);
        setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    useEffect(() => {
        const el = tabsRef.current;
        if (!el) return;
        el.addEventListener("scroll", updateScrollBtns);
        updateScrollBtns();
        return () => el.removeEventListener("scroll", updateScrollBtns);
    }, [sidebarStore.pinnedCategories]);

    const scroll = (dir: "left" | "right") => {
        const el = tabsRef.current;
        if (!el) return;
        el.scrollBy({ left: dir === "left" ? -100 : 100, behavior: "smooth" });
    };

    const allTab = { categoryId: "0", categoryName: "전체" } as I_PinnedCategory;
    const tabs = [allTab, ...sidebarStore.pinnedCategories];

    return (
        <div id="category-group-wrapper">
            <button
                className={`fav-group-scroll-btn scroll-btn-left${showLeft ? " visible" : ""}`}
                onClick={() => scroll("left")}
            >
                ‹
            </button>
            <div id="category-group-tabs" ref={tabsRef}>
                {tabs.map((cat) => (
                    <button
                        key={cat.categoryId}
                        className={`fav-group-tab${sidebarStore.selectedPinnedCategoryIdx === Number(cat.categoryId) ? " active" : ""}`}
                        onClick={() => {
                            sidebarStore.setSelectedPinnedCategoryIdx(Number(cat.categoryId));
                        }}
                    >
                        {cat.categoryName}
                    </button>
                ))}
            </div>
            <button
                className={`fav-group-scroll-btn scroll-btn-right${showRight ? " visible" : ""}`}
                onClick={() => scroll("right")}
            >
                ›
            </button>
        </div>
    );
});

export { FavoriteGroupTabs, CategoryGroupTabs };
