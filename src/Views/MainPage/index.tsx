import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react-lite";
import { useSettingsStore, useSidebarStore } from "@Stores/index";
import SidebarView from "@Views/SidebarView";
import NavBar from "@Components/NavBar";
import PreviewModal from "@Components/PreviewModal";
import { awaitElement } from "@Utils/index";
import { showTooltip, hideTooltip } from "@Components/TooltipPreview";

const MainPage: React.FC = observer(() => {
  const settings = useSettingsStore();
  const sidebarStore = useSidebarStore();

  useEffect(() => {
    document.body.classList.add("customSidebar");
  }, []);

  // 다크모드 고정
  useEffect(() => {
    if (settings.isThemeLockEnabled) {
      document.documentElement.setAttribute("dark", "");
    }
  }, [settings.isThemeLockEnabled]);

  // 재배포 태그 제거
  useEffect(() => {
    if (!settings.isRemoveRedistributionTagEnabled) return;
    const tags = document.querySelectorAll(
      ".redistribution_tag, .badge-rebroadcast"
    );
    tags.forEach((t) => (t as HTMLElement).remove());
  }, [settings.isRemoveRedistributionTagEnabled]);

  // 나중에 보기 버튼 제거
  useEffect(() => {
    if (!settings.isRemoveWatchLaterButtonEnabled) return;
    const style = document.createElement("style");
    style.textContent = `.btn-watch-later, .add-wish-list { display: none !important; }`;
    document.head.appendChild(style);
    return () => style.remove();
  }, [settings.isRemoveWatchLaterButtonEnabled]);

  // 방송 시작 시간 태그 제거
  useEffect(() => {
    if (!settings.isRemoveBroadStartTimeTagEnabled) return;
    const style = document.createElement("style");
    style.textContent = `.broad-start-time, [class*="broad-start-time"] { display: none !important; }`;
    document.head.appendChild(style);
    return () => style.remove();
  }, [settings.isRemoveBroadStartTimeTagEnabled]);

  // 캐러셀 제거
  useEffect(() => {
    if (!settings.isRemoveCarouselEnabled) return;
    const style = document.createElement("style");
    style.textContent = `.carousel-wrapper, [class*="carousel"] { display: none !important; }`;
    document.head.appendChild(style);
    return () => style.remove();
  }, [settings.isRemoveCarouselEnabled]);

  // 썸네일 툴팁
  useEffect(() => {
    if (!settings.isThumbnailTooltipEnabled) return;
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const item = target.closest("[data-broadcast-no]") as HTMLElement | null;
      if (!item) return;
      const broadNo = item.dataset.broadcastNo;
      const userId = item.dataset.userId ?? "";
      const userNick = item.dataset.userNick ?? "";
      const broadTitle = item.dataset.broadTitle ?? "";
      if (!broadNo) return;
      showTooltip(
        {
          userId,
          userNick,
          broadTitle,
          broadNo,
          type: "live",
        },
        e.clientX,
        e.clientY
      );
    };
    const handleMouseOut = () => hideTooltip();
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [settings.isThumbnailTooltipEnabled]);

  // 사이드바 컨테이너 탐색 후 마운트
  const [sidebarTarget, setSidebarTarget] =
    React.useState<Element | null>(null);

  useEffect(() => {
    awaitElement("#sidebar").then((el) => {
      if (el) setSidebarTarget(el);
    });
  }, []);

  return (
    <>
      <NavBar />
      {sidebarTarget &&
        ReactDOM.createPortal(<SidebarView />, sidebarTarget)}
      <PreviewModal />
    </>
  );
});

export default MainPage;
