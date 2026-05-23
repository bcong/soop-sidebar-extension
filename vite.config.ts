import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import monkey from "vite-plugin-monkey";
import path from "path";

const buildVersion = new Date().toISOString().replace(/[-T:]/g, "").slice(0, 14);

export default defineConfig({
    resolve: {
        alias: {
            "@Types": path.resolve(__dirname, "src/@types"),
            "@Utils": path.resolve(__dirname, "src/Utils"),
            "@Stores": path.resolve(__dirname, "src/Stores"),
            "@Components": path.resolve(__dirname, "src/Components"),
            "@Views": path.resolve(__dirname, "src/Views"),
            "@Styles": path.resolve(__dirname, "src/Styles"),
        },
    },
    plugins: [
        react(),
        monkey({
            entry: "src/index.tsx",
            userscript: {
                name: "SOOP (숲) - 사이드바 UI 변경",
                namespace: "https://github.com/bcong",
                version: buildVersion,
                description:
                    "SOOP 사이드바를 커스텀 UI로 대체합니다. 즐겨찾기/인기/추천 채널, 설정 모달, 플레이어 기능 강화.",
                author: "bcong",
                license: "MIT",
                match: [
                    "https://www.sooplive.com/*",
                    "https://play.sooplive.com/*",
                    "https://vod.sooplive.com/player/*",
                ],
                grant: [
                    "unsafeWindow",
                    "GM_addStyle",
                    "GM_xmlhttpRequest",
                    "GM_setValue",
                    "GM_getValue",
                    "GM_listValues",
                    "GM_registerMenuCommand",
                    "GM_unregisterMenuCommand",
                ],
                icon: "https://res.sooplive.co.kr/afreeca.ico",
                connect: ["sooplive.com", "naver.com"],
                downloadURL:
                    "https://raw.githubusercontent.com/bcong/soop-sidebar-extension/master/dist/userscripts.user.js",
                updateURL:
                    "https://raw.githubusercontent.com/bcong/soop-sidebar-extension/master/dist/userscripts.user.js",
                "run-at": "document-end",
            },
            build: {
                fileName: "userscripts.user.js",
                externalGlobals: {},
            },
        }),
    ],
    build: {
        minify: false,
    },
    define: {
        __SCRIPT_VERSION__: JSON.stringify(buildVersion),
    },
});
