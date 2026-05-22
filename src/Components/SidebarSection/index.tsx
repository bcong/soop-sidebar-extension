import React, { useState, useRef, useCallback, useMemo } from "react";
import { observer } from "mobx-react-lite";
import type { I_ChannelData } from "@Types/index.d";
import ChannelItem from "@Components/ChannelItem";
import ChannelItemChzzk from "@Components/ChannelItemChzzk";
import ChannelItemOffline from "@Components/ChannelItemOffline";

const DEFAULT_SHOW_COUNT = 30;

interface SidebarSectionProps {
  id: string;
  title: string;
  href: string;
  channels: I_ChannelData[];
  isLoading?: boolean;
  isMinimized?: boolean;
  defaultExpanded?: boolean;
}

const SidebarSection: React.FC<SidebarSectionProps> = observer(
  ({
    id,
    title,
    href,
    channels,
    isLoading = false,
    isMinimized = false,
    defaultExpanded = true,
  }) => {
    const [showAll, setShowAll] = useState(false);
    const [collapsed, setCollapsed] = useState(!defaultExpanded);

    const visibleChannels = useMemo(() => {
      if (collapsed) return [];
      if (showAll) return channels;
      return channels.slice(0, DEFAULT_SHOW_COUNT);
    }, [channels, showAll, collapsed]);

    const renderChannel = (data: I_ChannelData, idx: number) => {
      switch (data.type) {
        case "chzzk":
          return <ChannelItemChzzk key={`${data.channel.channel?.channelId}_${idx}`} data={data} />;
        case "soop_offline":
        case "soop_feed":
          return <ChannelItemOffline key={`${data.channel.user_id}_${idx}`} data={data} />;
        default:
          return (
            <ChannelItem
              key={`${data.channel.user_id}_${data.channel.broad_no}_${idx}`}
              data={data}
            />
          );
      }
    };

    if (isMinimized) {
      return null;
    }

    return (
      <div className="users-section" id={id}>
        <div className="top-section">
          <span className="max">
            <a href={href} target="_blank" rel="noreferrer">
              {title}
            </a>
          </span>
          <button
            id={`toggleButton_${id}`}
            onClick={() => setCollapsed((p) => !p)}
            title={collapsed ? "펼치기" : "접기"}
          >
            {collapsed ? "▶" : "▼"}
          </button>
        </div>

        {!collapsed && (
          <>
            {isLoading ? (
              <div style={{ padding: "8px 10px", fontSize: 13, color: "#888" }}>
                로딩 중...
              </div>
            ) : channels.length === 0 ? (
              <div style={{ padding: "8px 10px", fontSize: 13, color: "#888" }}>
                방송 중인 채널이 없습니다.
              </div>
            ) : (
              <>
                {visibleChannels.map((data, idx) => renderChannel(data, idx))}
                {!showAll && channels.length > DEFAULT_SHOW_COUNT && (
                  <button
                    className="user show-more"
                    style={{
                      maxHeight: "initial",
                      opacity: 1,
                      padding: "4px 0",
                      pointerEvents: "initial",
                    }}
                    onClick={() => setShowAll(true)}
                  >
                    + {channels.length - DEFAULT_SHOW_COUNT}개 더보기
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>
    );
  }
);

export default SidebarSection;
