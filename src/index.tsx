import { createRoot } from "react-dom/client";
import { startTransition } from "react";
import { configure } from "mobx";
import "./global.less";
import App from "./App";
import { StoreProvider } from "@Stores/index";

// MobX 반응을 React startTransition으로 스케줄링 → 채널 목록 업데이트가 저우선순위로 처리되어 브라우저 응답성 유지
configure({
    reactionScheduler: (f) => startTransition(f),
});

// ── GM API 폴리필 (Vite dev 환경용 — Tampermonkey 없이 실행 시) ──
if (typeof GM_getValue === "undefined") {
    const _store = new Map<string, unknown>(
        Object.entries(localStorage)
            .filter(([k]) => k.startsWith("GM_"))
            .map(([k, v]) => {
                try {
                    return [k.slice(3), JSON.parse(v)] as [string, unknown];
                } catch {
                    return [k.slice(3), v] as [string, unknown];
                }
            }),
    );
    (window as any).GM_getValue = (key: string, def?: unknown): unknown => (_store.has(key) ? _store.get(key) : def);
    (window as any).GM_setValue = (key: string, val: unknown) => {
        _store.set(key, val);
        localStorage.setItem(`GM_${key}`, JSON.stringify(val));
    };
    (window as any).GM_listValues = () => [..._store.keys()];
    (window as any).GM_addStyle = (css: string) => {
        const s = document.createElement("style");
        s.textContent = css;
        document.head.appendChild(s);
    };
    (window as any).GM_registerMenuCommand = () => {};
    (window as any).GM_unregisterMenuCommand = () => {};
    (window as any).GM_xmlhttpRequest = () => {};
}

// Font Awesome v4 CSS 주입
const _faLink = document.createElement("link");
_faLink.rel = "stylesheet";
_faLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
document.head.appendChild(_faLink);

function mount() {
    // Tampermonkey에서 DOM이 없을 수도 있으므로 안전하게 컨테이너 생성
    let container = document.getElementById("__soop_ext_root__");
    if (!container) {
        container = document.createElement("div");
        container.id = "__soop_ext_root__";
        container.style.display = "none"; // 실제 UI는 Portal로 렌더
        document.body.appendChild(container);
    }

    createRoot(container).render(
        <StoreProvider>
            <App />
        </StoreProvider>,
    );
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
} else {
    mount();
}
