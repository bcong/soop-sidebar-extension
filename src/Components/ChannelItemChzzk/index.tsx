import React from "react";
import { observer } from "mobx-react-lite";
import "../ChannelItem/style.less";
import { useSidebarStore, useSettingsStore } from "@Stores/index";
import type { I_ChannelData } from "@Types/index.d";
import { addNumberSeparator } from "@Utils/format";
import { blockUser } from "@Utils/blocking";

interface ChannelItemChzzkProps {
    data: I_ChannelData;
}

const ChannelItemChzzk: React.FC<ChannelItemChzzkProps> = observer(({ data }) => {
    const settings = useSettingsStore();
    const sidebarStore = useSidebarStore();
    const { channel } = data;

    const channelId = channel.channel?.channelId ?? channel.channelId;
    const channelName = channel.channel?.channelName ?? channel.channelName ?? channelId;
    const liveTitle = channel.liveInfo?.liveTitle ?? channel.liveTitle ?? "";
    const category = channel.liveInfo?.liveCategoryValue ?? channel.liveCategoryValue ?? "";
    const viewers = channel.liveInfo?.concurrentUserCount ?? channel.concurrentUserCount ?? 0;
    const profileUrl = channel.channel?.channelImageUrl ?? channel.channelImageUrl;
    const liveImageUrl = (channel.liveInfo?.liveImageUrl ?? channel.liveImageUrl ?? "").replace("{type}", "360");
    const openDate = channel.liveInfo?.openDate ?? channel.openDate ?? "";

    const isPinned = sidebarStore.pinnedChzzkUsers.includes(channelId);

    const handlePinClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isPinned) {
            sidebarStore.setPinnedChzzkUsers(sidebarStore.pinnedChzzkUsers.filter((id) => id !== channelId));
        } else {
            sidebarStore.setPinnedChzzkUsers([...sidebarStore.pinnedChzzkUsers, channelId]);
        }
    };

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        if (confirm(`"${channelName}" (${channelId}) 를 차단하시겠습니까?`)) {
            blockUser(channelId, channelName, sidebarStore.blockedUsers, (newList) =>
                sidebarStore.setBlockedUsers(newList),
            );
        }
    };

    const liveUrl = `https://chzzk.naver.com/live/${channelId}`;

    return (
        <a
            className={`user${settings.isSmallUserLayoutEnabled ? " small-user-layout" : ""}`}
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            onContextMenu={handleContextMenu}
            data-chzzk-channel-id={channelId}
            data-channel-name={channelName}
            data-live-title={liveTitle}
            data-concurrent-user-count={viewers}
            data-live-image-url={liveImageUrl}
            data-open-date={openDate}
        >
            <div className="profile-picture-container">
                {profileUrl && (
                    <img
                        className="profile-picture"
                        src={profileUrl}
                        alt={channelName}
                        loading="lazy"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://profile.img.sooplive.com/LOGO/no_profile.png";
                        }}
                    />
                )}
                {isPinned && <span className="pin-badge">🖈</span>}
            </div>
            <span className="username">{channelName}</span>
            <span className="description">{category}</span>
            <span className="watchers">
                <span className="dot greendot">●</span>
                {addNumberSeparator(viewers)}
            </span>
            <button
                className={`chzzk-pin-btn${isPinned ? " pinned" : ""}`}
                onClick={handlePinClick}
                title={isPinned ? "고정 해제" : "상단 고정"}
            >
                <i className="fa fa-thumb-tack" />
            </button>
        </a>
    );
});

export default ChannelItemChzzk;
