import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { useSidebarStore, useSettingsStore } from "@Stores/index";
import type { I_ChannelData } from "@Types/index.d";
import { addNumberSeparator } from "@Utils/format";
import { blockUser } from "@Utils/blocking";
import { customLog } from "@Utils/index";

interface ChannelItemProps {
  data: I_ChannelData;
}

const ChannelItem: React.FC<ChannelItemProps> = observer(({ data }) => {
  const settings = useSettingsStore();
  const sidebarStore = useSidebarStore();
  const { channel } = data;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (settings.isOpenNewtabEnabled) {
      e.preventDefault();
      window.open(
        `https://play.sooplive.com/${channel.user_id}/${channel.broad_no}`,
        "_blank"
      );
    }
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (
      confirm(`"${channel.user_nick}" (${channel.user_id}) 를 차단하시겠습니까?`)
    ) {
      blockUser(
        channel.user_id,
        channel.user_nick,
        sidebarStore.blockedUsers,
        (newList) => sidebarStore.setBlockedUsers(newList)
      );
    }
  };

  const liveUrl = `https://play.sooplive.com/${channel.user_id}/${channel.broad_no}`;
  const profileUrl =
    channel.profile_image ||
    `//profile.img.sooplive.com/LOGO/${channel.user_id.slice(0, 2)}/${channel.user_id}/${channel.user_id}.jpg`;

  const isPinned = channel.isPinned;
  const isNotified = channel.is_mobile_push === "Y";

  return (
    <a
      className={`user${settings.isSmallUserLayoutEnabled ? " small-user-layout" : ""}`}
      href={liveUrl}
      target={settings.isOpenNewtabEnabled ? "_blank" : "_self"}
      rel="noreferrer"
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      title={`${channel.user_nick}: ${channel.broad_title}`}
    >
      <img
        className="profile-picture"
        src={profileUrl}
        alt={channel.user_nick}
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://profile.img.sooplive.com/LOGO/no_profile.png";
        }}
      />
      <span className="username">
        {isPinned && "📌"}
        {isNotified && "🔔"}
        {channel.user_nick}
      </span>
      <span className="description">{channel.broad_title}</span>
      <span className="watchers">
        <span className="dot">●</span>
        {addNumberSeparator(channel.total_view_cnt)}
      </span>
    </a>
  );
});

export default ChannelItem;
