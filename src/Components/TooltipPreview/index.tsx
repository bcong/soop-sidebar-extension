import React, { useEffect, useRef, useState, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { useSettingsStore } from "@Stores/index";
import { addNumberSeparator } from "@Utils/format";
import { getElapsedTime } from "@Utils/format";

interface TooltipData {
  userId: string;
  userNick: string;
  broadTitle: string;
  broadNo?: string | number;
  broadStart?: string;
  totalViewCnt?: number;
  broadCateNo?: string;
  thumbnailUrl?: string;
  type: "live" | "vod" | "feed" | "offline";
}

let globalShowFn: ((data: TooltipData, x: number, y: number) => void) | null = null;
let globalHideFn: (() => void) | null = null;

export const showTooltip = (
  data: TooltipData,
  x: number,
  y: number
): void => {
  globalShowFn?.(data, x, y);
};

export const hideTooltip = (): void => {
  globalHideFn?.();
};

const TooltipPreview: React.FC = observer(() => {
  const settings = useSettingsStore();
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [data, setData] = useState<TooltipData | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    globalShowFn = (tooltipData, x, y) => {
      if (!settings.isThumbnailTooltipEnabled) return;
      setData(tooltipData);
      setPos({ x, y });
      setVisible(true);
    };
    globalHideFn = () => setVisible(false);

    return () => {
      globalShowFn = null;
      globalHideFn = null;
    };
  }, [settings.isThumbnailTooltipEnabled]);

  // 화면 밖으로 나가지 않도록 위치 조정
  useEffect(() => {
    if (!visible || !ref.current) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let x = pos.x + 15;
    let y = pos.y + 15;

    if (x + rect.width > vw) x = pos.x - rect.width - 10;
    if (y + rect.height > vh) y = vh - rect.height - 10;

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
  }, [visible, pos]);

  if (!settings.isThumbnailTooltipEnabled || !visible || !data) return null;

  const thumbnailSrc =
    data.thumbnailUrl ||
    (data.broadNo
      ? `https://liveimg.sooplive.com/m/${data.broadNo}.jpg`
      : null);

  const elapsed =
    data.broadStart && data.type === "live"
      ? getElapsedTime(data.broadStart, "HH:MM")
      : null;

  return (
    <div
      ref={ref}
      className={`tooltip-container${visible ? " visible" : ""}`}
      style={{ position: "fixed" }}
    >
      {thumbnailSrc && (
        <div className="thumbs-box">
          <img src={thumbnailSrc} alt={data.broadTitle} />
          {data.totalViewCnt !== undefined && (
            <div className="thumb-overlay-bottom">
              <div className="views">
                {addNumberSeparator(data.totalViewCnt)}명
              </div>
              {elapsed && (
                <div className="duration-overlay">{elapsed}</div>
              )}
            </div>
          )}
        </div>
      )}
      <div className="tooltiptext">
        <div className="tooltip-header">
          <span className="tooltip-username">{data.userNick}</span>
          {elapsed && (
            <span className="tooltip-time">{elapsed}</span>
          )}
        </div>
        <span className="tooltip-description">{data.broadTitle}</span>
      </div>
    </div>
  );
});

export default TooltipPreview;
