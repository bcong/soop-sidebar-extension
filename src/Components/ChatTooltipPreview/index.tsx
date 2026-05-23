import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { useSettingsStore } from "@Stores/index";
import "./style.less";

interface ChatData {
    userId: string;
    broadNo: string;
}

let globalShowChatFn: ((data: ChatData, y: number) => void) | null = null;
let globalHideChatFn: (() => void) | null = null;

export const showChatTooltip = (data: ChatData, y: number): void => {
    globalShowChatFn?.(data, y);
};

export const hideChatTooltip = (): void => {
    globalHideChatFn?.();
};

const CHAT_WIDTH = 340;
const CHAT_HEIGHT = 540;

const ChatTooltipPreview: React.FC = observer(() => {
    const settings = useSettingsStore();
    const [visible, setVisible] = useState(false);
    const [posY, setPosY] = useState(0);
    const [data, setData] = useState<ChatData | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        globalShowChatFn = (chatData, y) => {
            if (!settings.isChatTooltipEnabled) return;
            setData(chatData);
            setPosY(y);
            setVisible(true);
        };
        globalHideChatFn = () => setVisible(false);
        return () => {
            globalShowChatFn = null;
            globalHideChatFn = null;
        };
    }, [settings.isChatTooltipEnabled]);

    // 화면 밖으로 나가지 않도록 Y 위치 조정
    useEffect(() => {
        if (!visible || !ref.current) return;
        const vh = window.innerHeight;
        let y = posY - CHAT_HEIGHT / 2;
        if (y + CHAT_HEIGHT > vh - 10) y = vh - CHAT_HEIGHT - 10;
        if (y < 10) y = 10;
        ref.current.style.top = `${y}px`;
    }, [visible, posY]);

    if (!settings.isChatTooltipEnabled || !visible || !data) return null;

    const chatUrl = `https://play.sooplive.com/${data.userId}/${data.broadNo}?vtype=chat`;

    return (
        <div ref={ref} className={`chat-tooltip-container${visible ? " visible" : ""}`}>
            <iframe
                src={chatUrl}
                className="chat-tooltip-iframe"
                title="채팅 미리보기"
                sandbox="allow-scripts allow-same-origin allow-forms"
            />
        </div>
    );
});

export default ChatTooltipPreview;
