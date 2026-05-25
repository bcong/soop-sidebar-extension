import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { useSettingsStore } from "@Stores/index";
import SidebarView from "@Views/SidebarView";
import PlayerControls from "@Components/PlayerControls";
import PreviewModal from "@Components/PreviewModal";
import NavBar from "@Components/NavBar";
import SettingModal from "@Components/SettingModal";
import WatchingStreamers from "@Components/WatchingStreamers";
import ReactDOM from "react-dom";
import { isUserTyping, customLog, sleep, waitForElementAsync, observeUrlChanges } from "@Utils/index";

// dev 모드에서 unsafeWindow가 정의되지 않으므로 window로 대체
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _uw: any = (() => {
    try {
        return unsafeWindow;
    } catch {
        return window;
    }
})();

// ── 화질명 → 내부 타입 매핑 (sample.js qualityNameToInternalType) ──
const QUALITY_MAP: Record<string, string> = {
    sd: "LOW",
    hd: "NORMAL",
    hd4k: "HIGH_4000",
    hd8k: "HIGH_8000",
    original: "ORIGINAL",
    auto: "AUTO",
};

// ── livePlayer 준비 대기 ──────────────────────────────────────────
function waitForLivePlayer(timeout = 10000): Promise<any> {
    return new Promise((resolve, reject) => {
        const interval = 1500;
        let elapsed = 0;
        const check = () => {
            const lp = _uw?.livePlayer ?? (window as any).livePlayer;
            if (lp) {
                resolve(lp);
            } else {
                elapsed += interval;
                if (elapsed >= timeout) {
                    reject(new Error("livePlayer 객체를 찾지 못했습니다."));
                } else {
                    setTimeout(check, interval);
                }
            }
        };
        check();
    });
}

// ── GM_addStyle 래퍼 ─────────────────────────────────────────────
function addStyle(css: string) {
    if (typeof GM_addStyle !== "undefined") {
        GM_addStyle(css);
    } else {
        const style = document.createElement("style");
        style.textContent = css;
        document.head.appendChild(style);
    }
}

const PlayerPage: React.FC = observer(() => {
    const settings = useSettingsStore();

    // 뷰어 수 / 버퍼 타임 추적용 refs (re-render 방지)
    const prevViewersRef = useRef(0);
    const prevTitleRef = useRef("");
    const latestBufferTimeRef = useRef("");
    const latestViewerSuffixRef = useRef("");

    // 자동 화질 변경용 refs
    const qualityChangeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const prevQualityRef = useRef<string | null>(null);
    const updateTitleRef = useRef<(() => void) | null>(null);
    const prevIsAutoModeRef = useRef<boolean | null>(null);
    const didChangedToLowestRef = useRef(false);

    // ─── 다크모드 쿠키 무기한 유지 ────────────────────────────────────
    useEffect(() => {
        if (!settings.isThemeLockEnabled) return;
        const refreshThemeCookie = () => {
            const entry = document.cookie
                .split(";")
                .map((c) => c.trim())
                .find((c) => c.startsWith("theme="));
            const value = entry ? entry.split("=")[1] : null;
            if (value) {
                document.cookie = `theme=${value}; max-age=${10 * 365 * 24 * 60 * 60}; path=/; domain=.sooplive.com`;
            }
        };
        refreshThemeCookie();
        const obs = new MutationObserver(refreshThemeCookie);
        obs.observe(document.documentElement, { attributes: true, attributeFilter: ["dark"] });
        return () => obs.disconnect();
    }, [settings.isThemeLockEnabled]);

    // ─── 배지 숨기기 ─────────────────────────────────────────────────
    useEffect(() => {
        const cssRules: string[] = [];
        if (settings.isHideSupporterBadgeEnabled) cssRules.push(`.badge-supporter { display: none !important; }`);
        if (settings.isHideFanBadgeEnabled) cssRules.push(`.badge-fan { display: none !important; }`);
        if (settings.isHideSubBadgeEnabled) cssRules.push(`.badge-subscriber { display: none !important; }`);
        if (settings.isHideVIPBadgeEnabled) cssRules.push(`.badge-vip { display: none !important; }`);
        if (settings.isHideMngrBadgeEnabled) cssRules.push(`.badge-manager { display: none !important; }`);
        if (settings.isHideStreamerBadgeEnabled) cssRules.push(`.badge-streamer { display: none !important; }`);
        if (cssRules.length > 0) addStyle(cssRules.join("\n"));
    }, [
        settings.isHideSupporterBadgeEnabled,
        settings.isHideFanBadgeEnabled,
        settings.isHideSubBadgeEnabled,
        settings.isHideVIPBadgeEnabled,
        settings.isHideMngrBadgeEnabled,
        settings.isHideStreamerBadgeEnabled,
    ]);

    // ─── 채팅창 입력란 위 버튼 숨기기 ───────────────────────────────
    useEffect(() => {
        if (!settings.isHideButtonsAboveChatInputEnabled) return;
        addStyle(`
            .chatbox .actionbox .chat_item_list { display: none !important; }
            .chatbox .actionbox { height: auto !important; }
        `);
    }, [settings.isHideButtonsAboveChatInputEnabled]);

    // ─── 채팅창 메뉴 숨기기 ────────────────────────────────
    useEffect(() => {
        if (!settings.isHideChatItemsEnabled) return;
        const style = document.createElement("style");
        style.textContent = `
            .chatbox .actionbox .chat_item_list { display: none !important; }
            .chatbox .actionbox { height: auto !important; }
        `;
        document.head.appendChild(style);
        return () => style.remove();
    }, [settings.isHideChatItemsEnabled]);

    // ─── e스포츠 정보 숨기기 ─────────────────────────────────────────
    useEffect(() => {
        if (!settings.isHideEsportsInfoEnabled) return;
        addStyle(`
            body:not(.screen_mode,.fullScreen_mode,.embeded_mode)
            #webplayer #webplayer_contents #player_area
            .broadcast_information.detail_open .esports_info {
                display: none !important;
            }
            .broadcast_information .esports_info {
                display: none !important;
            }
        `);
    }, [settings.isHideEsportsInfoEnabled]);

    // ─── 닉네임 오른쪽 정렬 ──────────────────────────────────────────
    useEffect(() => {
        if (!settings.isAlignNicknameRightEnabled) return;
        addStyle(`
            .starting-line .chatting-list-item .message-container .username > button {
                float: right !important;
                white-space: nowrap;
            }
        `);
    }, [settings.isAlignNicknameRightEnabled]);

    // ─── 채팅 위치 변경 ──────────────────────────────────────────────
    useEffect(() => {
        if (!settings.isChatPositionEnabled) return;
        document.body.classList.add("chat-position-changed");
        return () => document.body.classList.remove("chat-position-changed");
    }, [settings.isChatPositionEnabled]);

    // ─── 비활성 탭 음소거 (버튼 방식 — sample.js handleMuteByVisibility) ─
    useEffect(() => {
        if (!settings.isMutedInactiveTabsEnabled) return;
        const isInPiP = () => {
            const v = document.querySelector("video");
            return v ? document.pictureInPictureElement === v : false;
        };
        const handler = () => {
            if (isInPiP()) return;
            const btn = document.querySelector<HTMLElement>("#btn_sound");
            if (!btn) return;
            if (document.hidden) {
                if (!btn.classList.contains("mute")) btn.click();
            } else {
                if (btn.classList.contains("mute")) btn.click();
            }
        };
        document.addEventListener("visibilitychange", handler, true);
        return () => document.removeEventListener("visibilitychange", handler, true);
    }, [settings.isMutedInactiveTabsEnabled]);

    // ─── 비활성 탭 화질 낮추기 (handleVisibilityChangeForQuality) ─────
    useEffect(() => {
        if (!settings.isAutoChangeQualityEnabled) return;
        const isInPiP = () => {
            const v = document.querySelector("video");
            return v ? document.pictureInPictureElement === v : false;
        };
        const getCurrentQuality = (): string | null => {
            try {
                return _uw.LivePlayer?.getPlayerInfo()?.quality ?? null;
            } catch {
                return null;
            }
        };
        const getIsAutoMode = (): boolean => {
            try {
                return !!_uw.LivePlayer?.getPlayerInfo()?.qualityInfo?.isAuto;
            } catch {
                return false;
            }
        };
        const changeQuality = (name: string) => {
            try {
                _uw.livePlayer?.changeQuality(name);
            } catch {
                // noop
            }
        };
        const handler = () => {
            if (isInPiP()) return;
            if (document.hidden) {
                prevQualityRef.current = getCurrentQuality();
                prevIsAutoModeRef.current = getIsAutoMode();
                qualityChangeTimerRef.current = setTimeout(() => {
                    changeQuality("LOW");
                    didChangedToLowestRef.current = true;
                    customLog.log("[탭 숨김] 최저화질로 전환됨");
                }, 6500);
            } else {
                if (qualityChangeTimerRef.current) {
                    clearTimeout(qualityChangeTimerRef.current);
                    qualityChangeTimerRef.current = null;
                }
                if (didChangedToLowestRef.current && prevQualityRef.current) {
                    if (prevIsAutoModeRef.current) {
                        changeQuality("AUTO");
                    } else {
                        changeQuality(prevQualityRef.current);
                    }
                }
                didChangedToLowestRef.current = false;
                prevQualityRef.current = null;
                prevIsAutoModeRef.current = null;
            }
        };
        document.addEventListener("visibilitychange", handler, true);
        return () => {
            document.removeEventListener("visibilitychange", handler, true);
            if (qualityChangeTimerRef.current) clearTimeout(qualityChangeTimerRef.current);
        };
    }, [settings.isAutoChangeQualityEnabled]);

    // ─── 키보드 단축키 (E: 선명모드, D: 저지연, Arrow: skip) ─────────
    useEffect(() => {
        const moveToLatestBufferedPoint = () => {
            const video = document.querySelector("video");
            if (!video) return;
            const { buffered } = video;
            if (buffered.length > 0) {
                const target = buffered.end(buffered.length - 1) - 2;
                if (target > video.currentTime) video.currentTime = target;
            }
        };

        const showPlayerBar = (target: "quality_box" | "setting_box") => {
            const player = document.getElementById("player");
            if (!player) return;
            player.classList.add("mouseover");
            const btn = player.querySelector<HTMLElement>(
                target === "quality_box" ? "button.btn_quality_mode" : "button.btn_setting",
            );
            const boxOn = player.querySelector(target === "quality_box" ? ".quality_box.on" : ".setting_box.on");
            if (btn && !boxOn) btn.click();
            setTimeout(() => {
                const openBox = player.querySelector(".quality_box.on, .setting_box.on");
                if (openBox) openBox.classList.remove("on");
                player.classList.remove("mouseover");
            }, 1500);
        };

        const handler = (e: KeyboardEvent) => {
            if (isUserTyping()) return;

            // Key E: 선명한 모드
            if (e.code === "KeyE" && settings.isSharpmodeShortcutEnabled) {
                e.stopPropagation();
                const el = document.getElementById("clear_screen");
                if (el) {
                    el.click();
                    showPlayerBar("quality_box");
                }
            }

            // Key D: 저지연 / 버퍼 이동
            if (e.code === "KeyD" && settings.isLLShortcutEnabled) {
                e.stopPropagation();
                const el = document.getElementById("delay_check");
                if (el) {
                    el.click();
                    showPlayerBar("setting_box");
                }
            }
        };

        document.addEventListener("keydown", handler, true);
        return () => document.removeEventListener("keydown", handler, true);
    }, [settings.isSharpmodeShortcutEnabled, settings.isLLShortcutEnabled]);

    // ─── 화질 번호 단축키 (`, 1-9) ──────────────────────────────────
    useEffect(() => {
        if (!settings.isQualityChangeShortcutEnabled) return;
        let shortcutMap = new Map<string, string>();

        const setupShortcuts = async () => {
            try {
                const livePlayer = await waitForLivePlayer();
                const info = await livePlayer.getLiveInfo();
                const presets: any[] = info?.CHANNEL?.VIEWPRESET ?? [];
                if (!presets.length) return;
                presets.sort((a, b) => {
                    if (a.name === "auto") return -1;
                    if (b.name === "auto") return 1;
                    return parseInt(b.label_resolution ?? 0) - parseInt(a.label_resolution ?? 0);
                });
                const keys = ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
                const newMap = new Map<string, string>();
                presets.forEach((preset, i) => {
                    if (i >= keys.length) return;
                    const internalType = QUALITY_MAP[preset.name];
                    if (internalType) newMap.set(keys[i], internalType);
                });
                shortcutMap = newMap;
                customLog.log("[화질 단축키] 설정 완료:", [...newMap.entries()]);
            } catch (e) {
                customLog.error("화질 단축키 설정 실패:", e);
            }
        };

        const keyHandler = (e: KeyboardEvent) => {
            if (isUserTyping()) return;
            const key = e.key === "~" ? "`" : e.key;
            if (shortcutMap.has(key)) {
                e.preventDefault();
                try {
                    _uw.livePlayer?.changeQuality(shortcutMap.get(key));
                } catch {
                    // noop
                }
            }
        };

        setupShortcuts();
        document.addEventListener("keydown", keyHandler, true);
        return () => document.removeEventListener("keydown", keyHandler, true);
    }, [settings.isQualityChangeShortcutEnabled]);

    // ─── 문서 제목 업데이트 (시청자 수 추세 포함) ────────────────────
    useEffect(() => {
        const enabled = settings.isDocumentTitleUpdateEnabled || settings.isShowBufferTimeTitleEnabled;
        if (!enabled) {
            document.title = document.title.split(" ")[0];
            return;
        }
        const updateTitle = () => {
            const baseTitle = document.title.split(" ")[0];

            if (settings.isDocumentTitleUpdateEnabled) {
                const viewersEl = document.querySelector<HTMLElement>("#nAllViewer");
                const rawViewers = viewersEl ? parseInt(viewersEl.innerText.replace(/,/g, "").trim(), 10) || 0 : 0;
                if (rawViewers) {
                    latestViewerSuffixRef.current = ` • ${rawViewers.toLocaleString()}`;
                }
            }

            let title = baseTitle;
            if (settings.isDocumentTitleUpdateEnabled) title += latestViewerSuffixRef.current;
            if (settings.isShowBufferTimeTitleEnabled && latestBufferTimeRef.current) {
                title += ` • ${latestBufferTimeRef.current}s`;
            }
            document.title = title;
        };

        updateTitle();
        updateTitleRef.current = updateTitle;
        const t2 = setInterval(updateTitle, 60000);
        return () => {
            clearInterval(t2);
            updateTitleRef.current = null;
            document.title = document.title.split(" ")[0];
        };
    }, [settings.isDocumentTitleUpdateEnabled, settings.isShowBufferTimeTitleEnabled]);

    // ─── 버퍼 지연 시간 표시 (insertRemainingBuffer) ─────────────────
    useEffect(() => {
        if (!settings.isShowBufferTimeTitleEnabled && !settings.isShowBufferTimeChatEnabled) return;
        let videoEl: HTMLVideoElement | null = null;

        waitForElementAsync("#livePlayer").then((el) => {
            if (!el) return;
            videoEl = el as HTMLVideoElement;
            videoEl.onprogress = () => {
                const { buffered, currentTime } = videoEl!;
                let remaining = "";
                if (buffered.length > 0) {
                    const diff = buffered.end(buffered.length - 1) - currentTime;
                    if (diff >= 0) remaining = diff.toFixed(diff % 1 === 0 ? 0 : 1);
                }
                latestBufferTimeRef.current = remaining;

                if (settings.isShowBufferTimeTitleEnabled) {
                    updateTitleRef.current?.();
                }

                if (settings.isShowBufferTimeChatEnabled) {
                    const emptyChat = document.querySelector<HTMLElement>("#empty_chat");
                    if (emptyChat && remaining) emptyChat.innerText = `${remaining}s 지연됨`;

                    document.querySelectorAll("[id='broadState']").forEach((el) => {
                        const timeLi = el.closest("li");
                        if (!timeLi) return;
                        let bufLi = timeLi.nextElementSibling as HTMLElement | null;
                        if (!bufLi?.classList.contains("broadStateBuffer")) {
                            bufLi = document.createElement("li");
                            bufLi.classList.add("broadStateBuffer");
                            timeLi.insertAdjacentElement("afterend", bufLi);
                        }
                        bufLi.textContent = remaining ? `${remaining}s` : "";
                    });
                }
            };
        });

        return () => {
            if (videoEl) videoEl.onprogress = null;
            const emptyChat = document.querySelector<HTMLElement>("#empty_chat");
            if (emptyChat) emptyChat.innerText = "";
            document.querySelectorAll<HTMLElement>(".broadStateBuffer").forEach((el) => el.remove());
        };
    }, [settings.isShowBufferTimeTitleEnabled, settings.isShowBufferTimeChatEnabled]);

    // ─── 선호 화질 자동 선택 (selectPreferredQuality) ────────────────
    useEffect(() => {
        if (!settings.preferredQuality || settings.preferredQuality === "off") return;

        const selectQuality = async () => {
            try {
                const livePlayer = await waitForLivePlayer();
                const info = await livePlayer.getLiveInfo();
                const presets: any[] = (info?.CHANNEL?.VIEWPRESET ?? []).filter((p: any) => p.name !== "auto" && p.bps);
                if (!presets.length) {
                    customLog.warn("화질 정보를 찾을 수 없습니다.");
                    return;
                }
                presets.sort((a, b) => parseInt(b.label_resolution ?? 0) - parseInt(a.label_resolution ?? 0));

                let target: any;
                if (settings.preferredQuality === "max") {
                    target = presets[0];
                } else {
                    const targetRes = parseInt(settings.preferredQuality);
                    target = presets.find((p) => parseInt(p.label_resolution ?? 0) === targetRes);
                    if (!target) {
                        const lower = presets.filter((p) => parseInt(p.label_resolution ?? 0) <= targetRes);
                        target = lower.length > 0 ? lower[0] : presets[presets.length - 1];
                    }
                }

                const internalType = QUALITY_MAP[target.name];
                if (!internalType) return;
                customLog.log(`[선호 화질] ${target.label}(${internalType})로 변경`);
                livePlayer.changeQuality(internalType);
            } catch (e: any) {
                customLog.error("선호 화질 설정 실패:", e.message);
            }
        };

        selectQuality();
        const unsub = observeUrlChanges(() => setTimeout(selectQuality, 4000));
        return unsub;
    }, [settings.preferredQuality]);

    // ─── 플레이어 클릭 이벤트 매퍼 (PlayerEventMapper) ───────────────
    useEffect(() => {
        if (!settings.isClickPlayerEventMapperEnabled) return;

        const userClickConfig: Record<string, string> = {
            click: settings.selectLeftClick,
            contextmenu: settings.selectRightClick,
        };

        const displayCenterVolume = (isMuted: boolean, volume: number) => {
            const textEl = document.querySelector<HTMLElement>(".volume_text");
            const centerBtn = document.querySelector<HTMLElement>(".center_btn");
            const iconEl = document.querySelector<HTMLElement>(".volume_icon");
            if (!textEl || !centerBtn || !iconEl) return;
            const v = isMuted ? 0 : volume;
            const cls = isMuted ? "mute" : volume < 0.5 ? "low" : "";
            textEl.textContent = `${Math.round(100 * v)}%`;
            textEl.classList.remove("hide_text");
            centerBtn.classList.remove("fadeOut");
            centerBtn.querySelectorAll<HTMLElement>("div, button").forEach((el) => {
                if (!el.classList.contains("volume_icon")) el.style.display = "none";
            });
            iconEl.classList.remove("low", "mute");
            if (cls) iconEl.classList.add(cls);
            iconEl.style.display = "block";
            setTimeout(() => {
                centerBtn.classList.add("fadeOut");
                textEl.classList.add("hide_text");
                iconEl.style.display = "none";
            }, 400);
        };

        const initMapper = async () => {
            const player = await waitForElementAsync("#player");
            const video = await waitForElementAsync("#livePlayer");
            if (!player || !video) return;

            const pauseSelector = document.querySelector("#closeStream") ? "#closeStream" : "#time_shift_play";
            const selectors: Record<string, string> = {
                mute: "#btn_sound",
                pause: pauseSelector,
                stop: "#play",
                screenMode: ".btn_screen_mode",
                fullscreen: ".btn_fullScreen_mode",
            };

            const buttons: Record<string, HTMLElement | null> = {};
            await Promise.all(
                Object.entries(selectors).map(async ([k, sel]) => {
                    buttons[k] = (await waitForElementAsync(sel)) as HTMLElement | null;
                }),
            );

            const vid = video as HTMLVideoElement;
            const actions: Record<string, () => void> = {
                none: () => {},
                toggleMute: () => {
                    buttons.mute?.click();
                    setTimeout(() => displayCenterVolume(vid.muted, vid.volume), 50);
                },
                togglePause: () => {
                    if (!buttons.pause) return;
                    if (window.getComputedStyle(buttons.pause).display === "none") return;
                    buttons.pause.click();
                },
                toggleStop: () => buttons.stop?.click(),
                toggleScreenMode: () => buttons.screenMode?.click(),
                toggleFullscreen: () => buttons.fullscreen?.click(),
            };

            Object.entries(userClickConfig).forEach(([eventType, actionName]) => {
                if (!actionName || actionName === "none") return;
                player.addEventListener(eventType, (e: Event) => {
                    if ((e.target as HTMLElement).closest(".player_ctrlBox")) return;
                    e.preventDefault();
                    actions[actionName]?.();
                });
            });

            customLog.log("[EventMapper] 초기화 완료");
        };

        initMapper();
    }, [settings.isClickPlayerEventMapperEnabled, settings.selectLeftClick, settings.selectRightClick]);

    // ─── 스크린모드 마우스오버 사이드바 (showSidebarOnMouseOver) ──────
    useEffect(() => {
        if (!settings.isMouseOverSideBarEnabled || !settings.isCustomSidebarEnabled) return;

        const webplayer = document.getElementById("webplayer");
        if (webplayer) {
            webplayer.style.left = "0px";
            webplayer.style.width = "100vw";
        }

        const mouseMoveHandler = (e: MouseEvent) => {
            const body = document.body;
            const sidebar = document.getElementById("sidebar");
            const wp = document.getElementById("webplayer");
            const videoLayer = document.getElementById("player");
            if (!sidebar || !wp) return;

            const { clientX: mouseX, clientY: mouseY } = e;

            if (!body.classList.contains("showSidebar")) {
                const triggerHeight = Math.min(
                    (videoLayer?.clientHeight ?? window.innerHeight) / 2,
                    window.innerHeight / 4,
                );
                if (mouseX < 52 && mouseY > 100 && mouseY < triggerHeight && body.classList.contains("screen_mode")) {
                    body.classList.add("showSidebar");
                    wp.style.left = `${sidebar.offsetWidth}px`;
                    wp.style.width = `calc(100vw - ${sidebar.offsetWidth}px)`;
                }
            } else if (body.classList.contains("screen_mode")) {
                if (mouseX >= sidebar.clientWidth || mouseY >= sidebar.clientHeight) {
                    body.classList.remove("showSidebar");
                    wp.style.left = "0px";
                    wp.style.width = "100vw";
                }
            }
        };

        const mouseOutHandler = (e: MouseEvent) => {
            if (!e.relatedTarget && !(e as any).toElement) {
                const body = document.body;
                const wp = document.getElementById("webplayer");
                if (body.classList.contains("screen_mode") && body.classList.contains("showSidebar")) {
                    body.classList.remove("showSidebar");
                    if (wp) {
                        wp.style.left = "0px";
                        wp.style.width = "100vw";
                    }
                }
            }
        };

        document.addEventListener("mousemove", mouseMoveHandler);
        window.addEventListener("mouseout", mouseOutHandler);
        return () => {
            document.removeEventListener("mousemove", mouseMoveHandler);
            window.removeEventListener("mouseout", mouseOutHandler);
        };
    }, [settings.isMouseOverSideBarEnabled, settings.isCustomSidebarEnabled]);

    // ─── 스크린모드 항상 사이드바 표시 ───────────────────────────────
    useEffect(() => {
        if (!settings.isShowSidebarOnScreenModeAlwaysEnabled || !settings.isCustomSidebarEnabled) return;

        const handleClassChange = () => {
            const body = document.body;
            const sidebar = document.getElementById("sidebar");
            const wp = document.getElementById("webplayer");
            if (!wp) return;

            const isScreen = body.classList.contains("screen_mode");
            const isShow = body.classList.contains("showSidebar");

            if (isScreen && !isShow && sidebar) {
                body.classList.add("showSidebar");
                wp.style.left = `${sidebar.offsetWidth}px`;
                wp.style.width = `calc(100vw - ${sidebar.offsetWidth}px)`;
            }
            if (!isScreen && isShow) {
                body.classList.remove("showSidebar");
                wp.style.removeProperty("width");
                wp.style.removeProperty("left");
            }
        };

        const observer = new MutationObserver(handleClassChange);
        observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
        document.addEventListener("visibilitychange", handleClassChange);
        handleClassChange();

        return () => {
            observer.disconnect();
            document.removeEventListener("visibilitychange", handleClassChange);
        };
    }, [settings.isShowSidebarOnScreenModeAlwaysEnabled, settings.isCustomSidebarEnabled]);

    // ─── 자동 스크린 모드 ────────────────────────────────────────────
    useEffect(() => {
        if (!settings.isAutoScreenModeEnabled) return;
        waitForElementAsync("#livePlayer").then(() => {
            if (!document.body.classList.contains("screen_mode")) {
                document.querySelector<HTMLElement>("#player .btn_screen_mode")?.click();
            }
        });
    }, [settings.isAutoScreenModeEnabled]);

    // ─── 복사/붙여넣기 잠금 해제 (unlockCopyPaste) ──────────────────
    useEffect(() => {
        if (!settings.isUnlockCopyPasteEnabled) return;

        let writeArea: Element | null = null;

        const handleCopy = (e: ClipboardEvent) => {
            e.preventDefault();
            const text = window.getSelection()?.toString();
            if (text) e.clipboardData?.setData("text/plain", text);
        };
        const handleCut = (e: ClipboardEvent) => {
            e.preventDefault();
            const text = window.getSelection()?.toString();
            if (text) {
                e.clipboardData?.setData("text/plain", text);
                document.execCommand("delete");
            }
        };
        const handlePaste = (e: ClipboardEvent) => {
            e.preventDefault();
            const text = (e.clipboardData ?? (window as any).clipboardData)?.getData("text") ?? "";
            document.execCommand("insertText", false, text);
        };

        waitForElementAsync("#write_area").then((el) => {
            if (!el) return;
            writeArea = el;
            el.addEventListener("copy", handleCopy as EventListener);
            el.addEventListener("cut", handleCut as EventListener);
            el.addEventListener("paste", handlePaste as EventListener);
        });

        return () => {
            if (writeArea) {
                writeArea.removeEventListener("copy", handleCopy as EventListener);
                writeArea.removeEventListener("cut", handleCut as EventListener);
                writeArea.removeEventListener("paste", handlePaste as EventListener);
            }
        };
    }, [settings.isUnlockCopyPasteEnabled]);

    // ─── 방종 후 방송 재시작 자동 진입 ──────────────────────────────
    useEffect(() => {
        if (!settings.isAutoReloadAfterBroadcastEndEnabled) return;

        const intl = new Intl.DateTimeFormat("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        });

        const pollForRestart = async (signal: AbortSignal) => {
            const bjid = location.pathname.split("/")[1];
            if (!bjid || signal.aborted) return;

            // 방종 화면(.notBroadingInfoTitle)이 나타날 때까지 대기 (abort 지원)
            const titleEl = await new Promise<Element | null>((resolve) => {
                const existing = document.querySelector(".notBroadingInfoTitle");
                if (existing) {
                    resolve(existing);
                    return;
                }

                const observer = new MutationObserver(() => {
                    const target = document.querySelector(".notBroadingInfoTitle");
                    if (target) {
                        observer.disconnect();
                        signal.removeEventListener("abort", onAbort);
                        resolve(target);
                    }
                });
                const onAbort = () => {
                    observer.disconnect();
                    resolve(null);
                };
                signal.addEventListener("abort", onAbort, { once: true });
                observer.observe(document.body, { childList: true, subtree: true });
            });

            if (!titleEl || signal.aborted) return;

            // 방송 재시작 폴링
            let bno: number | undefined;
            do {
                if (signal.aborted) return;
                await sleep(1000);
                if (signal.aborted) return;

                try {
                    const res = await fetch("https://live.sooplive.com/afreeca/player_live_api.php", {
                        headers: { "content-type": "application/x-www-form-urlencoded" },
                        body: `bid=${bjid}&bno=null&type=live&pwd=&player_type=html5&stream_type=common&quality=HD&mode=landing&from_api=0&is_revive=false`,
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                        signal,
                    });
                    const data = await res.json();
                    bno = data?.CHANNEL?.BNO;
                } catch {
                    if (signal.aborted) return;
                }

                // 현재 시간 표시
                const el = document.querySelector(".notBroadingInfoTitle");
                if (el) el.textContent = `방송 시작을 기다리는 중이에요 (${intl.format(new Date())})`;
            } while (!bno || bno <= 0);

            if (signal.aborted) return;

            const parts = location.pathname.split("/");
            const currentBno = parts[parts.length - 1];
            if (String(bno) !== currentBno) {
                location.pathname = `/${bjid}/${bno}`;
            }
        };

        let ac = new AbortController();
        pollForRestart(ac.signal);

        // URL 변경(방송 전환) 시 재시작
        const stopUrlObserver = observeUrlChanges(() => {
            ac.abort();
            ac = new AbortController();
            pollForRestart(ac.signal);
        });

        return () => {
            ac.abort();
            stopUrlObserver();
        };
    }, [settings.isAutoReloadAfterBroadcastEndEnabled]);

    // ─── VOD 자동 재생 방지 ───────────────────────────────────────────
    useEffect(() => {
        if (!settings.isNoAutoVODEnabled) return;

        const disableAutoVOD = () => {
            const lv = _uw.liveView ?? (window as any).liveView;
            const container = lv?.aContainer?.[1];
            if (!container?.autoPlayVodBanner) {
                setTimeout(disableAutoVOD, 3000);
                return;
            }
            container.autoPlayVodBanner.show = () => {};
        };

        disableAutoVOD();
    }, [settings.isNoAutoVODEnabled]);

    // ─── 로고/검색 링크 현재 탭으로 열기 (homePageCurrentTab) ──────────
    useEffect(() => {
        if (!settings.isSendLoadBroadEnabled) return;

        const applyCurrentTab = () => {
            document.querySelectorAll<HTMLAnchorElement>("#logo > a, #serviceHeader a[target]").forEach((el) => {
                el.removeAttribute("target");
            });
        };

        waitForElementAsync("#logo > a").then((el) => {
            if (el) applyCurrentTab();
        });

        const unsub = observeUrlChanges(() => setTimeout(applyCurrentTab, 200));
        return unsub;
    }, [settings.isSendLoadBroadEnabled]);

    // ─── cBox-list 방송 링크 클릭 → sendLoadBroad ──────────────────
    useEffect(() => {
        if (!settings.isSendLoadBroadEnabled) return;

        const handleClick = (e: MouseEvent) => {
            if (e.ctrlKey || e.metaKey) return;
            const inCBox = (e.target as HTMLElement).closest('[data-type="cBox"]');
            if (!inCBox) return;
            const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="play.sooplive.com/"]');
            if (!anchor) return;
            const match = anchor.href.match(/play\.sooplive\.com\/([^/?#]+)\/(\d+)/);
            if (!match) return;
            const [, user_id, broad_no] = match;
            const lv = _uw.liveView ?? (window as any).liveView;
            if (!lv?.playerController?.sendLoadBroad) return;
            e.preventDefault();
            e.stopPropagation();
            lv.playerController.sendLoadBroad(user_id, broad_no);
        };

        document.addEventListener("click", handleClick, true);
        return () => document.removeEventListener("click", handleClick, true);
    }, [settings.isSendLoadBroadEnabled]);

    // ─── 연령 제한 썸네일 마우스오버 보기 ─────────────────────────────
    useEffect(() => {
        if (!settings.isReplaceEmptyThumbnailEnabled) return;

        if (!document.querySelector("script[data-hls-loader]")) {
            const hlsScript = document.createElement("script");
            hlsScript.src = "https://cdn.jsdelivr.net/npm/hls.js@latest";
            hlsScript.dataset.hlsLoader = "1";
            document.head.appendChild(hlsScript);
        }

        const ensureHls = (): Promise<void> => {
            if (_uw.Hls) return Promise.resolve();
            return new Promise((resolve) => {
                const check = setInterval(() => {
                    if (_uw.Hls) {
                        clearInterval(check);
                        resolve();
                    }
                }, 100);
            });
        };

        const getBroadM3u8Domain = async (broadNumber: string): Promise<string | null> => {
            const params = new URLSearchParams({
                return_type: "gs_cdn_pc_web",
                use_cors: "true",
                cors_origin_url: "play.sooplive.com",
                broad_key: `${broadNumber}-common-master-hls`,
                player_mode: "landing",
                time: "0",
            });
            try {
                const res = await fetch(`https://livestream-manager.sooplive.com/broad_stream_assign.html?${params}`, {
                    credentials: "include",
                    cache: "no-store",
                });
                if (!res.ok) return null;
                const data = await res.json();
                return data.result === "1" && data.view_url ? data.view_url : null;
            } catch {
                return null;
            }
        };

        const getBroadAid = async (id: string, broadNumber: string): Promise<string | null> => {
            const payload = new URLSearchParams({
                bid: id,
                bno: broadNumber,
                from_api: "0",
                mode: "landing",
                player_type: "html5",
                stream_type: "common",
                quality: "sd",
                type: "aid",
                pwd: "",
            });
            try {
                const res = await fetch("https://live.sooplive.com/afreeca/player_live_api.php", {
                    method: "POST",
                    body: payload,
                    credentials: "include",
                    cache: "no-store",
                });
                const data = await res.json();
                return data?.CHANNEL?.AID ?? null;
            } catch {
                return null;
            }
        };

        const captureFrame = (video: HTMLVideoElement): Promise<string> =>
            new Promise((resolve) => {
                const canvas = document.createElement("canvas");
                canvas.width = 480;
                canvas.height = 270;
                const ctx = canvas.getContext("2d")!;
                const vr = video.videoWidth / video.videoHeight;
                const cr = 480 / 270;
                let dw = 480,
                    dh = 270,
                    ox = 0,
                    oy = 0;
                if (vr > cr) {
                    dh = 480 / vr;
                    oy = (270 - dh) / 2;
                } else {
                    dw = 270 * vr;
                    ox = (480 - dw) / 2;
                }
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, 480, 270);
                ctx.drawImage(video, ox, oy, dw, dh);
                resolve(canvas.toDataURL("image/webp"));
            });

        const loadFrame = async (id: string, broadNumber: string): Promise<string | null> => {
            await ensureHls();
            const Hls = _uw.Hls;
            if (!Hls?.isSupported()) return null;
            const [aid, baseUrl] = await Promise.all([getBroadAid(id, broadNumber), getBroadM3u8Domain(broadNumber)]);
            if (!aid || !baseUrl) return null;
            const m3u8 = `${baseUrl}?aid=${aid}`;
            const video = document.createElement("video");
            video.playbackRate = 16;
            const hls = new Hls();
            hls.loadSource(m3u8);
            hls.attachMedia(video);
            return new Promise((resolve) => {
                video.addEventListener(
                    "canplay",
                    async () => {
                        const data = await captureFrame(video);
                        video.pause();
                        video.src = "";
                        hls.destroy();
                        resolve(data);
                    },
                    { once: true },
                );
                setTimeout(() => {
                    hls.destroy();
                    resolve(null);
                }, 15000);
            });
        };

        const bindLink = (link: HTMLAnchorElement) => {
            if (link.dataset.adultThumbBound === "true") return;
            const img = link.querySelector<HTMLImageElement>("img");
            if (!img) return;
            link.dataset.adultThumbBound = "true";
            let intervalId: ReturnType<typeof setInterval> | null = null;

            const load = async () => {
                if (link.dataset.loading === "true") return;
                const m = (link.getAttribute("href") ?? "").match(/play\.sooplive\.com\/([^/]+)\/(\d+)/);
                if (!m) return;
                const [, id, broadNo] = m;
                link.dataset.loading = "true";
                if (!link.dataset.imageLoaded) {
                    img.style.filter = "grayscale(100%)";
                    img.style.transition = "filter 0.5s ease";
                }
                const frame = await loadFrame(id, broadNo);
                if (frame) {
                    img.src = frame;
                    img.style.objectFit = "cover";
                    img.style.filter = "none";
                    link.dataset.imageLoaded = "true";
                    link.dataset.lastLoadedTime = Date.now().toString();
                } else {
                    img.style.filter = "none";
                }
                link.dataset.loading = "false";
            };

            link.addEventListener("mouseenter", () => {
                const expired = Date.now() - parseInt(link.dataset.lastLoadedTime ?? "0", 10) > 30000;
                if (!link.dataset.imageLoaded || expired) load();
                intervalId = setInterval(load, 30000);
            });
            link.addEventListener("mouseleave", () => {
                if (intervalId) {
                    clearInterval(intervalId);
                    intervalId = null;
                }
            });
        };

        const scanAndBind = () => {
            document.querySelectorAll<HTMLElement>("[data-type=cBox] .thumbs-box .status.adult").forEach((el) => {
                const link = el.closest<HTMLElement>(".thumbs-box")?.querySelector<HTMLAnchorElement>("a[href]");
                if (link && !link.href.startsWith("https://vod.sooplive.com")) bindLink(link);
            });
        };

        scanAndBind();
        const obs = new MutationObserver(scanAndBind);
        obs.observe(document.body, { childList: true, subtree: true });
        return () => obs.disconnect();
    }, [settings.isReplaceEmptyThumbnailEnabled]);

    // ─── 사이드바 마운트 ─────────────────────────────────────────────
    const [sidebarTarget, setSidebarTarget] = React.useState<HTMLElement | null>(null);

    // ─── 스크린모드 우측 호버 채팅 패널 ───────────────────────────────
    const [screenChatVisible, setScreenChatVisible] = React.useState(false);
    const [screenChatUrl, setScreenChatUrl] = React.useState<string | null>(null);
    const screenChatVisibleRef = useRef(false);

    useEffect(() => {
        addStyle(`
            #screen-chat-panel {
                position: fixed;
                right: 0;
                top: 0;
                height: 100vh;
                width: 360px;
                z-index: 1402;
                background: #0e0e10;
                border-left: 1px solid #333;
                box-shadow: -4px 0 16px rgba(0,0,0,0.6);
            }
            #screen-chat-panel iframe {
                width: 100%;
                height: 100%;
                border: none;
                display: block;
            }
        `);
    }, []);

    useEffect(() => {
        if (!settings.isCustomSidebarEnabled) return;
        const CHAT_WIDTH = 360;
        const TRIGGER = 52;

        const handleMouseMove = (e: MouseEvent) => {
            const body = document.body;
            if (!body.classList.contains("screen_mode")) {
                if (screenChatVisibleRef.current) {
                    screenChatVisibleRef.current = false;
                    setScreenChatVisible(false);
                }
                return;
            }
            const mouseX = e.clientX;
            const vw = window.innerWidth;
            if (!screenChatVisibleRef.current) {
                if (mouseX > vw - TRIGGER) {
                    const parts = window.location.pathname.replace(/^\//, "").split("/").filter(Boolean);
                    if (parts.length >= 2) {
                        screenChatVisibleRef.current = true;
                        setScreenChatUrl(`https://play.sooplive.com/${parts[0]}/${parts[1]}?vtype=chat`);
                        setScreenChatVisible(true);
                    }
                }
            } else {
                if (mouseX < vw - CHAT_WIDTH - 20) {
                    screenChatVisibleRef.current = false;
                    setScreenChatVisible(false);
                }
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        return () => document.removeEventListener("mousemove", handleMouseMove);
    }, [settings.isCustomSidebarEnabled]);

    useEffect(() => {
        const container = document.createElement("div");
        document.body.appendChild(container);
        setSidebarTarget(container);
        return () => {
            container.remove();
        };
    }, []);

    useEffect(() => {
        if (settings.isCustomSidebarEnabled) {
            document.body.classList.add("customSidebar");
        } else {
            document.body.classList.remove("customSidebar");
        }
        return () => document.body.classList.remove("customSidebar");
    }, [settings.isCustomSidebarEnabled]);

    return (
        <>
            {settings.isCustomSidebarEnabled && sidebarTarget && ReactDOM.createPortal(<SidebarView />, sidebarTarget)}
            {settings.isCustomSidebarEnabled && screenChatVisible && screenChatUrl && (
                <div id="screen-chat-panel">
                    <iframe
                        src={screenChatUrl}
                        title="채팅 미리보기"
                        sandbox="allow-scripts allow-same-origin allow-forms"
                    />
                </div>
            )}
            <NavBar />
            <SettingModal />
            <PlayerControls />
            <PreviewModal />
            <WatchingStreamers />
        </>
    );
});

export default PlayerPage;
