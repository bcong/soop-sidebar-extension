import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react-lite";
import { useSettingsStore } from "@Stores/index";
import { waitForElementAsync } from "@Utils/index";
import "./style.module.less";

// sample.js BUTTON_DATA와 동일한 구조
const BUTTON_DATA = [
    { id: "nav-live", label: "LIVE", href: "https://www.sooplive.com/live/all", onClickTarget: "#live > a" },
    { id: "nav-my", label: "MY", href: "https://www.sooplive.com/my/favorite", onClickTarget: "#my > a" },
    {
        id: "nav-search",
        label: "탐색",
        href: "https://www.sooplive.com/directory/category",
        onClickTarget: "#cate > a",
    },
    { id: "nav-catch", label: "캐치", href: "https://vod.sooplive.com/player/catch", onClickTarget: "#catch > a" },
];

const isMainPage = () => window.location.href.startsWith("https://www.sooplive.com");

const NavButtons: React.FC = observer(() => {
    const settings = useSettingsStore();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, onClickTarget?: string) => {
        if (isMainPage() && onClickTarget) {
            const targetEl = document.querySelector(onClickTarget);
            if (targetEl) {
                e.preventDefault();
                (targetEl as HTMLElement).click();
            }
        }
    };

    return (
        <>
            {/* sample.js처럼 reverse() 후 추가 — flex-direction:row-reverse와 조합해 LIVE→캐치 순서 */}
            {[...BUTTON_DATA].reverse().map((btn) => (
                <a
                    key={btn.id}
                    id={btn.id}
                    href={btn.href}
                    target="_self"
                    rel="noreferrer"
                    onClick={(e) => handleClick(e, btn.onClickTarget)}
                >
                    <button type="button" className="left_nav_button">
                        {btn.label}
                    </button>
                </a>
            ))}
        </>
    );
});

const NavBar: React.FC = observer(() => {
    const [container, setContainer] = useState<Element | null>(null);

    useEffect(() => {
        // 기존 .left_navbar 재사용 (sooplive.com 기본 제공 시)
        const existing = document.querySelector(".left_navbar");
        if (existing) {
            setContainer(existing);
            return;
        }
        // 없으면 div 생성 → #serviceHeader 앞에 prepend (sample.js 동일)
        const div = document.createElement("div");
        div.className = "left_navbar";
        waitForElementAsync("#serviceHeader").then((serviceHeader) => {
            if (serviceHeader) {
                serviceHeader.prepend(div);
            } else {
                document.body.prepend(div);
            }
            setContainer(div);
        });
    }, []);

    if (!container) return null;
    return ReactDOM.createPortal(<NavButtons />, container);
});

export default NavBar;
