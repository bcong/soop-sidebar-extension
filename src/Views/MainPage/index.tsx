import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react-lite";
import { useSettingsStore } from "@Stores/index";
import SidebarView from "@Views/SidebarView";
import NavBar from "@Components/NavBar";
import SettingModal from "@Components/SettingModal";
import PreviewModal from "@Components/PreviewModal";
import { waitForElementAsync } from "@Utils/index";

const MainPage: React.FC = observer(() => {
    const settings = useSettingsStore();

    useEffect(() => {
        if (settings.isCustomSidebarEnabled) {
            document.body.classList.add("customSidebar");
        } else {
            document.body.classList.remove("customSidebar");
        }
        return () => document.body.classList.remove("customSidebar");
    }, [settings.isCustomSidebarEnabled]);

    // 다크모드 쿠키 무기한 유지
    useEffect(() => {
        if (!settings.isThemeLockEnabled) return;
        const refreshThemeCookie = () => {
            const entry = document.cookie
                .split(";")
                .map((c) => c.trim())
                .find((c) => c.startsWith("theme="));
            const value = entry ? entry.split("=")[1] : null;
            if (value) {
                document.cookie = `theme=${value}; max-age=${10 * 365 * 24 * 60 * 60}; path=/; domain=.sooplive.com`;
            }
        };
        refreshThemeCookie();
        const obs = new MutationObserver(refreshThemeCookie);
        obs.observe(document.documentElement, { attributes: true, attributeFilter: ["dark"] });
        return () => obs.disconnect();
    }, [settings.isThemeLockEnabled]);

    // 재배포 태그 제거
    useEffect(() => {
        if (!settings.isRemoveRedistributionTagEnabled) return;
        const style = document.createElement("style");
        style.textContent = `[data-type=cBox] .thumbs-box .allow { display: none !important; }`;
        document.head.appendChild(style);
        return () => style.remove();
    }, [settings.isRemoveRedistributionTagEnabled]);

    // 나중에 보기 버튼 제거
    useEffect(() => {
        if (!settings.isRemoveWatchLaterButtonEnabled) return;
        const style = document.createElement("style");
        style.textContent = `[data-type=cBox] .thumbs-box .later { display: none !important; }`;
        document.head.appendChild(style);
        return () => style.remove();
    }, [settings.isRemoveWatchLaterButtonEnabled]);

    // 방송 시작 시간 태그 제거
    useEffect(() => {
        if (!settings.isRemoveBroadStartTimeTagEnabled) return;
        const style = document.createElement("style");
        style.textContent = `[data-type=cBox] .thumbs-box .time { display: none !important; }`;
        document.head.appendChild(style);
        return () => style.remove();
    }, [settings.isRemoveBroadStartTimeTagEnabled]);

    // 캐러셀(전광판) 제거
    useEffect(() => {
        if (!settings.isRemoveCarouselEnabled) return;
        const style = document.createElement("style");
        style.textContent = `div[class^="player_player_wrap"] { display: none !important; }`;
        document.head.appendChild(style);
        return () => style.remove();
    }, [settings.isRemoveCarouselEnabled]);

    // 방송 제목 말줄임
    useEffect(() => {
        if (!settings.isBroadTitleTextEllipsisEnabled) return;
        const style = document.createElement("style");
        style.textContent = `[data-type=cBox] .cBox-info .title a { white-space: nowrap; text-overflow: ellipsis; display: inline-block; overflow: hidden; max-width: 100%; }`;
        document.head.appendChild(style);
        return () => style.remove();
    }, [settings.isBroadTitleTextEllipsisEnabled]);

    // 방송 목록 클릭 → 현재 탭으로 이동 (isSendLoadBroadEnabled 연동)
    useEffect(() => {
        if (!settings.isSendLoadBroadEnabled) return;
        const handleClick = (e: MouseEvent) => {
            if (e.ctrlKey || e.metaKey || e.shiftKey) return;
            const inCBox = (e.target as HTMLElement).closest('[data-type="cBox"]');
            if (!inCBox) return;
            const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="play.sooplive.com/"]');
            if (!anchor) return;
            e.preventDefault();
            e.stopPropagation();
            window.location.href = anchor.href;
        };
        document.addEventListener("click", handleClick, true);
        return () => document.removeEventListener("click", handleClick, true);
    }, [settings.isSendLoadBroadEnabled]);

    // 사이드바 컨테이너: body에 즉시 추가 후 #soop-gnb 뒤로 이동 시도
    const [sidebarContainer, setSidebarContainer] = React.useState<HTMLElement | null>(null);

    useEffect(() => {
        const container = document.createElement("div");
        // position: fixed이므로 DOM 위치 무관하지만 sample.js처럼 #soop-gnb 뒤 배치 시도
        document.body.appendChild(container);
        setSidebarContainer(container);
        waitForElementAsync("#soop-gnb", 3000).then((gnb) => {
            if (gnb) gnb.insertAdjacentElement("afterend", container);
        });
        return () => container.remove();
    }, []);

    return (
        <>
            <NavBar />
            <SettingModal />
            {settings.isCustomSidebarEnabled &&
                sidebarContainer &&
                ReactDOM.createPortal(<SidebarView />, sidebarContainer)}
            <PreviewModal />
        </>
    );
});

export default MainPage;
