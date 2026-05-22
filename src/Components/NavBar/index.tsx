import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react-lite";
import { useSettingsStore } from "@Stores/index";
import SettingModal from "@Components/SettingModal";

const BUTTON_DATA = [
  { id: "nav-live", label: "LIVE", href: "https://www.sooplive.com/live" },
  { id: "nav-my", label: "MY", href: "https://www.sooplive.com/myplus" },
  {
    id: "nav-search",
    label: "탐색",
    href: "https://www.sooplive.com/search",
  },
  {
    id: "nav-catch",
    label: "캐치",
    href: "https://www.sooplive.com/catch",
  },
];

const NavButtons: React.FC = observer(() => {
  const settings = useSettingsStore();

  return (
    <>
      {BUTTON_DATA.map((btn) => (
        <li key={btn.id} id={btn.id} className="nav_v8xK4z-item">
          <a
            href={btn.href}
            className="nav_v8xK4z-btn"
            target={settings.isOpenNewtabEnabled ? "_blank" : "_self"}
            rel="noreferrer"
          >
            {btn.label}
          </a>
        </li>
      ))}
      <SettingModal />
    </>
  );
});

const NavBar: React.FC = observer(() => {
  const [container, setContainer] = useState<Element | null>(null);

  useEffect(() => {
    // .left_navbar가 없으면 새로 만들어 body에 추가
    let navbar =
      document.querySelector(".left_navbar") ??
      document.querySelector('[class*="left_navbar"]');
    if (!navbar) {
      const div = document.createElement("ul");
      div.className = "left_navbar";
      document.body.appendChild(div);
      navbar = div;
    }
    setContainer(navbar);
  }, []);

  if (!container) return null;
  return ReactDOM.createPortal(<NavButtons />, container);
});

export default NavBar;
