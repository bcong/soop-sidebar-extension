import React from "react";
import MainPage from "@Views/MainPage";
import PlayerPage from "@Views/PlayerPage";
import VodPage from "@Views/VodPage";

function detectPage(): "main" | "player" | "vod" | null {
    const { hostname, pathname } = window.location;
    if (hostname === "vod.sooplive.com" && pathname.startsWith("/player")) {
        return "vod";
    }
    if (hostname === "play.sooplive.com") {
        const url = window.location.href;
        const embedPattern = /^https:\/\/play\.sooplive\.com\/.*\/.*\/embed(\?.*)?$/;
        if (embedPattern.test(url) || url.includes("vtype=chat")) return null;
        return "player";
    }
    if (hostname === "www.sooplive.com") {
        return "main";
    }
    return null;
}

const App: React.FC = () => {
    const page = detectPage();

    if (page === "main") return <MainPage />;
    if (page === "player") return <PlayerPage />;
    if (page === "vod") return <VodPage />;
    return null;
};

export default App;
