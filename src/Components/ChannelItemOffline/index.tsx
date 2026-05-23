import React from "react";
import { observer } from "mobx-react-lite";
import "../ChannelItem/style.module.less";
import { useSettingsStore } from "@Stores/index";
import type { I_ChannelData } from "@Types/index.d";
import { timeSince } from "@Utils/format";

interface ChannelItemOfflineProps {
    data: I_ChannelData;
}

const ChannelItemOffline: React.FC<ChannelItemOfflineProps> = observer(({ data }) => {
    const settings = useSettingsStore();
    const { channel } = data;

    const userId = channel.user_id ?? channel.station_user_id;
    const userNick = channel.user_nick ?? userId;
    const profileUrl =
        channel.profile_image || `https://stimg.sooplive.com/LOGO/${userId.slice(0, 2)}/${userId}/m/${userId}.webp`;

    const isFeed = data.type === "soop_feed";

    const stationUrl = `https://www.sooplive.com/${userId}`;

    if (isFeed) {
        return (
            <a
                className={`user user-offline${settings.isSmallUserLayoutEnabled ? " small-user-layout" : ""}`}
                href={stationUrl}
                target="_self"
                rel="noreferrer"
                title={`${userNick} - 피드`}
            >
                <img
                    className="profile-picture profile-grayscale"
                    src={profileUrl}
                    alt={userNick}
                    loading="lazy"
                    onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = `https://profile.img.sooplive.com/LOGO/${userId.slice(0, 2)}/${userId}/m/${userId}.jpg`;
                        img.onerror = () => {
                            img.src = "https://profile.img.sooplive.com/LOGO/no_profile.png";
                        };
                    }}
                />
                <span className="username">{userNick}</span>
                <span className="description">{channel.title ?? channel.content?.slice(0, 30) ?? "피드"}</span>
                <span className="watchers">
                    {channel.reg_timestamp ? timeSince(new Date(channel.reg_timestamp * 1000).toISOString()) : ""}
                </span>
            </a>
        );
    }

    return (
        <a
            className={`user user-offline${settings.isSmallUserLayoutEnabled ? " small-user-layout" : ""}`}
            href={stationUrl}
            target="_self"
            rel="noreferrer"
            title={userNick}
        >
            <img
                className="profile-picture profile-grayscale"
                src={profileUrl}
                alt={userNick}
                loading="lazy"
                onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = `https://profile.img.sooplive.com/LOGO/${userId.slice(0, 2)}/${userId}/m/${userId}.jpg`;
                    img.onerror = () => {
                        img.src = "https://profile.img.sooplive.com/LOGO/no_profile.png";
                    };
                }}
            />
            <span className="username">{userNick}</span>
            <span className="description">오프라인</span>
            <span className="watchers">
                <span className="dot profile-grayscale" role="img">
                    ●
                </span>
                오프라인
            </span>
        </a>
    );
});

export default ChannelItemOffline;
