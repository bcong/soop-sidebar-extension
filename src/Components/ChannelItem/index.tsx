import React from "react";
import { observer } from "mobx-react-lite";
import "./style.less";
import { useSidebarStore, useSettingsStore } from "@Stores/index";
import type { I_ChannelData } from "@Types/index.d";
import { addNumberSeparator } from "@Utils/format";
import { blockUser } from "@Utils/blocking";
import { getCategoryName } from "@Utils/api";
import { sleep } from "@Utils/index";

interface ChannelItemProps {
    data: I_ChannelData;
}

const ChannelItem: React.FC<ChannelItemProps> = observer(({ data }) => {
    const settings = useSettingsStore();
    const sidebarStore = useSidebarStore();
    const { channel } = data;

    const liveUrl = `https://play.sooplive.com/${channel.user_id}/${channel.broad_no}`;
    const isOnPlayerPage = window.location.href.includes("play.sooplive.com");

    const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        // sendLoadBroad: 새로고침 없는 방송 전환 (플레이어 페이지에서 isOpenNewtab보다 우선)
        if (settings.isSendLoadBroadEnabled && isOnPlayerPage && !e.ctrlKey) {
            e.preventDefault();
            e.stopPropagation();

            const liveView = (unsafeWindow as any).liveView ?? (window as any).liveView;
            const loadingEl = document.querySelector<HTMLElement>("div.loading");
            const isLoading = loadingEl ? window.getComputedStyle(loadingEl).display !== "none" : false;

            if (!isLoading && liveView) {
                try {
                    const stopBtn = document.querySelector<HTMLElement>("#play.stop");
                    if (stopBtn) {
                        stopBtn.click();
                        await sleep(250);
                    }
                    liveView.playerController.sendLoadBroad(channel.user_id, channel.broad_no);
                    await sleep(200);
                    if (document.querySelector("._Modal_UI_Wrap.dimed")) {
                        window.location.href = liveUrl;
                    }
                } catch {
                    window.location.href = liveUrl;
                }
            } else {
                window.location.href = liveUrl;
            }
            return;
        }
    };

    const handleProfileClick = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const sidebar = document.getElementById("sidebar");
        const isSidebarMinimized = sidebar ? sidebar.offsetWidth <= 52 : false;
        const targetUrl = isSidebarMinimized ? liveUrl : `https://ch.sooplive.com/${channel.user_id}`;

        if (!isSidebarMinimized) {
            window.open(targetUrl, "_blank");
            return;
        }

        if (e.ctrlKey) {
            window.open(liveUrl, "_blank");
            return;
        }

        const liveView = (unsafeWindow as any).liveView ?? (window as any).liveView;
        if (settings.isSendLoadBroadEnabled && liveView) {
            liveView.playerController.sendLoadBroad(channel.user_id, channel.broad_no);
        } else {
            window.location.href = liveUrl;
        }
    };

    const handleContextMenu = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (confirm(`"${channel.user_nick}" (${channel.user_id}) 를 차단하시겠습니까?`)) {
            blockUser(channel.user_id, channel.user_nick, sidebarStore.blockedUsers, (newList) =>
                sidebarStore.setBlockedUsers(newList),
            );
        }
    };

    const profileUrl =
        channel.profile_image ||
        `https://stimg.sooplive.com/LOGO/${channel.user_id.slice(0, 2)}/${channel.user_id}/m/${channel.user_id}.webp`;

    const isPinned = channel.isPinned;
    const isNotified = channel.is_mobile_push === "Y";

    return (
        <a
            className={`user${settings.isSmallUserLayoutEnabled ? " small-user-layout" : ""}`}
            href={liveUrl}
            target="_self"
            rel="noreferrer"
            onClick={handleClick}
            onContextMenu={handleContextMenu}
            data-broadcast-no={channel.broad_no}
            data-user-id={channel.user_id}
            data-user-nick={channel.user_nick}
            data-broad-title={channel.broad_title}
            data-broad-start={channel.broad_start}
            data-total-view-cnt={channel.total_view_cnt}
        >
            {!settings.isProfileHidden && (
                <div className="profile-picture-container">
                    <img
                        className="profile-picture"
                        src={profileUrl}
                        alt={channel.user_nick}
                        loading="lazy"
                        onClick={isOnPlayerPage ? handleProfileClick : undefined}
                        onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            const uid = channel.user_id;
                            img.src = `https://profile.img.sooplive.com/LOGO/${uid.slice(0, 2)}/${uid}/m/${uid}.jpg`;
                            img.onerror = () => {
                                img.src = "https://profile.img.sooplive.com/LOGO/no_profile.png";
                            };
                        }}
                    />
                    {isPinned && <span className="pin-badge">🖈</span>}
                </div>
            )}
            <span className="username">
                {isNotified && <i className="fa fa-bell" style={{ marginRight: 3, fontSize: 11 }} />}
                {channel.user_nick}
            </span>
            {!settings.isCategoryHidden && (
                <span className="description">
                    {channel.category_name || getCategoryName(channel.broad_cate_no) || ""}
                </span>
            )}
            <span className="watchers">
                <span className="dot">●</span>
                {addNumberSeparator(channel.total_view_cnt)}
            </span>
        </a>
    );
});

export default ChannelItem;
