import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import type { I_ChannelData } from "@Types/index.d";
import ChannelItem from "@Components/ChannelItem";
import ChannelItemChzzk from "@Components/ChannelItemChzzk";
import ChannelItemOffline from "@Components/ChannelItemOffline";
import { useSettingsStore } from "@Stores/index";
import "./style.module.less";

const DEFAULT_SHOW_COUNT = 30;

interface SidebarSectionProps {
    id: string;
    title: string;
    href: string;
    channels: I_ChannelData[];
    isLoading?: boolean;
    maxCount?: number;
    children?: React.ReactNode;
}

const SECTION_FA_ICONS: Record<string, string> = {
    follow: "fa-star",
    myplus: "fa-thumbs-up",
    top: "fa-fire",
};

const SidebarSection: React.FC<SidebarSectionProps> = observer(
    ({ id, title, href, channels, isLoading = false, maxCount, children }) => {
        const settings = useSettingsStore();
        const [showAll, setShowAll] = useState(false);

        const limit = maxCount && maxCount > 0 ? maxCount : DEFAULT_SHOW_COUNT;

        // 표시 수 설정이 바뀌면 더보기 상태 초기화
        useEffect(() => {
            setShowAll(false);
        }, [limit]);

        const visibleChannels = showAll ? channels : channels.slice(0, limit);

        const renderChannel = (data: I_ChannelData, idx: number) => {
            switch (data.type) {
                case "chzzk":
                    return <ChannelItemChzzk key={`chzzk_${data.channel.channel?.channelId ?? idx}`} data={data} />;
                case "soop_offline":
                case "soop_feed":
                    return <ChannelItemOffline key={`${data.type}_${data.channel.user_id ?? idx}`} data={data} />;
                default:
                    return <ChannelItem key={`soop_${data.channel.user_id}_${data.channel.broad_no}`} data={data} />;
            }
        };

        if (channels.length === 0 && !isLoading) {
            return null;
        }

        return (
            <div className={`section-wrapper ${id}`}>
                <div className={`top-section ${id}`}>
                    <span className="max">
                        <a href={href} target="_blank" rel="noreferrer">
                            {title}
                        </a>
                    </span>
                    <span className="min">
                        <a href={href} target="_blank" rel="noreferrer">
                            <i className={`fa ${SECTION_FA_ICONS[id] ?? "fa-list"} section-icon`} />
                        </a>
                    </span>
                </div>
                {children}
                <div className={`users-section ${id}`}>
                    {isLoading ? (
                        <div style={{ padding: "8px 10px", fontSize: 13, color: "#888" }}>로딩 중...</div>
                    ) : (
                        <>
                            {visibleChannels.map((data, idx) => renderChannel(data, idx))}
                            {!showAll && channels.length > limit && (
                                <button className="user show-more" onClick={() => setShowAll(true)}>
                                    + {channels.length - limit}개 더보기
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        );
    },
);

export default SidebarSection;
