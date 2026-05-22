import React, { useEffect, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { useSettingsStore, useSidebarStore } from "@Stores/index";
import SidebarView from "@Views/SidebarView";
import PlayerControls from "@Components/PlayerControls";
import PreviewModal from "@Components/PreviewModal";
import ReactDOM from "react-dom";
import { awaitElement, isUserTyping } from "@Utils/index";

const PlayerPage: React.FC = observer(() => {
  const settings = useSettingsStore();
  const sidebarStore = useSidebarStore();

  // 다크모드 고정
  useEffect(() => {
    if (settings.isThemeLockEnabled) {
      document.documentElement.setAttribute("dark", "");
    }
  }, [settings.isThemeLockEnabled]);

  // 뱃지 숨기기 (GM_addStyle)
  useEffect(() => {
    const cssRules: string[] = [];
    if (settings.isHideSupporterBadgeEnabled)
      cssRules.push(`.badge-supporter { display: none !important; }`);
    if (settings.isHideFanBadgeEnabled)
      cssRules.push(`.badge-fan { display: none !important; }`);
    if (settings.isHideSubBadgeEnabled)
      cssRules.push(`.badge-subscriber { display: none !important; }`);
    if (settings.isHideVIPBadgeEnabled)
      cssRules.push(`.badge-vip { display: none !important; }`);
    if (settings.isHideMngrBadgeEnabled)
      cssRules.push(`.badge-manager { display: none !important; }`);
    if (settings.isHideStreamerBadgeEnabled)
      cssRules.push(`.badge-streamer { display: none !important; }`);
    if (settings.isHideButtonsAboveChatInputEnabled)
      cssRules.push(`.chat-input-area-btn { display: none !important; }`);
    if (cssRules.length === 0) return;
    if (typeof GM_addStyle !== "undefined") {
      GM_addStyle(cssRules.join("\n"));
    } else {
      const style = document.createElement("style");
      style.textContent = cssRules.join("\n");
      document.head.appendChild(style);
    }
  }, [
    settings.isHideSupporterBadgeEnabled,
    settings.isHideFanBadgeEnabled,
    settings.isHideSubBadgeEnabled,
    settings.isHideVIPBadgeEnabled,
    settings.isHideMngrBadgeEnabled,
    settings.isHideStreamerBadgeEnabled,
    settings.isHideButtonsAboveChatInputEnabled,
  ]);

  // 채팅 위치 변경
  useEffect(() => {
    if (!settings.isChatPositionEnabled) return;
    document.body.classList.add("chat-position-changed");
    return () => document.body.classList.remove("chat-position-changed");
  }, [settings.isChatPositionEnabled]);

  // 비활성 탭 음소거
  useEffect(() => {
    if (!settings.isMutedInactiveTabsEnabled) return;
    const handler = () => {
      const video = document.querySelector("video");
      if (!video) return;
      video.muted = document.hidden;
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, [settings.isMutedInactiveTabsEnabled]);

  // 키보드 단축키
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (isUserTyping()) return;
      // Alt+S: 고화질
      if (e.altKey && e.key === "s" && settings.isSharpmodeShortcutEnabled) {
        e.preventDefault();
        (
          document.querySelector('[class*="quality-btn"]') as HTMLElement
        )?.click();
      }
      // Alt+L: 저지연
      if (e.altKey && e.key === "l" && settings.isLLShortcutEnabled) {
        e.preventDefault();
        (
          document.querySelector('[class*="lowlatency-btn"]') as HTMLElement
        )?.click();
      }
      // Alt+Q: 화질 변경
      if (e.altKey && e.key === "q" && settings.isQualityChangeShortcutEnabled) {
        e.preventDefault();
        (
          document.querySelector('[class*="quality-select"]') as HTMLElement
        )?.click();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [
    settings.isSharpmodeShortcutEnabled,
    settings.isLLShortcutEnabled,
    settings.isQualityChangeShortcutEnabled,
  ]);

  // 문서 제목 업데이트
  useEffect(() => {
    if (!settings.isDocumentTitleUpdateEnabled) return;
    const updateTitle = () => {
      const nick =
        document.querySelector(".nick")?.textContent ??
        document.querySelector('[class*="streamer-nick"]')?.textContent ??
        "";
      if (nick) {
        document.title = `${nick} - SOOP`;
      }
    };
    updateTitle();
    const timer = setInterval(updateTitle, 5000);
    return () => clearInterval(timer);
  }, [settings.isDocumentTitleUpdateEnabled]);

  // 사이드바 마운트
  const [sidebarTarget, setSidebarTarget] =
    React.useState<Element | null>(null);

  useEffect(() => {
    awaitElement("#sidebar").then((el) => {
      if (el) setSidebarTarget(el);
    });

    sidebarStore.startPolling(30);
    return () => sidebarStore.stopPolling();
  }, []);

  return (
    <>
      {sidebarTarget &&
        ReactDOM.createPortal(<SidebarView />, sidebarTarget)}
      <PlayerControls />
      <PreviewModal />
    </>
  );
});

export default PlayerPage;
