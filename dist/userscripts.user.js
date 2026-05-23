// ==UserScript==
// @name         SOOP (숲) - 사이드바 UI 변경
// @namespace    https://github.com/bcong
// @version      20260524004723
// @author       bcong
// @description  SOOP 사이드바를 커스텀 UI로 대체합니다. 즐겨찾기/인기/추천 채널, 설정 모달, 플레이어 기능 강화.
// @license      MIT
// @icon         https://res.sooplive.co.kr/afreeca.ico
// @downloadURL  https://raw.githubusercontent.com/bcong/soop-sidebar-extension/master/dist/userscripts.user.js
// @updateURL    https://raw.githubusercontent.com/bcong/soop-sidebar-extension/master/dist/userscripts.user.js
// @match        https://www.sooplive.com/*
// @match        https://play.sooplive.com/*
// @match        https://vod.sooplive.com/player/*
// @connect      sooplive.com
// @connect      naver.com
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_info
// @grant        GM_listValues
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_unregisterMenuCommand
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

(o=>{if(typeof GM_addStyle=="function"){GM_addStyle(o);return}const e=document.createElement("style");e.textContent=o,document.head.append(e)})(` :root{--nickname-width: 60px;--wp-scroll-left: 240px}.customSidebar #serviceLnb{display:none!important}.starting-line .chatting-list-item .message-container .username{width:var(--nickname-width)!important}#studioPlayKorPlayer,#studioPlayKor,#studioPlay,.btn-broadcast{display:none}._moreDot_layer button{text-align:left}.customSidebar #serviceHeader .a_d_banner{display:none!important}.customSidebar #serviceHeader .btn_flexible+.logo_wrap{left:24px!important}.customSidebar #serviceHeader .logo_wrap{left:24px!important}.customSidebar .btn_flexible{display:none}#sidebar{z-index:1401}#sidebar-refresh-bar{position:absolute;top:0;left:0;right:0;height:2px;overflow:hidden;z-index:1}#sidebar-refresh-fill{height:100%;background:currentColor;opacity:.25;transition:width .5s linear}#sidebar.min .chzzk-pin-btn{display:none}body.customSidebar main{padding-left:238px!important}body.customSidebar .catch_webplayer_wrap{margin-left:24px!important}.default_logo.on{z-index:0!important}html{overflow:auto;scrollbar-width:none;-ms-overflow-style:none}html::-webkit-scrollbar{display:none}.customSidebar #player,.customSidebar #webplayer #webplayer_contents #player_area .float_box,.customSidebar #webplayer #webplayer_contents #player_area{min-width:180px!important}.customSidebar.screen_mode #webplayer,.customSidebar.screen_mode #sidebar{transition:all .25s ease-in-out!important}@media screen and (max-width: 892px){.screen_mode.bottomChat #webplayer #player .view_ctrl,.screen_mode.bottomChat #webplayer .wrapping.side{display:block!important}}.customSidebar #webplayer_contents{width:calc(100vw - var(--wp-scroll-left))!important;gap:0!important;padding:0!important;margin:64px 0 0!important;left:var(--wp-scroll-left)!important}.customSidebar.top_hide #webplayer_contents,.customSidebar.top_hide #sidebar{top:0!important;margin-top:0!important;min-height:100vh!important}body:not(.screen_mode):not(.fullScreen_mode):has(#sidebar.max) #webplayer_contents{width:calc(100vw - 240px)!important;left:240px!important}body:not(.screen_mode):not(.fullScreen_mode):has(#sidebar.min) #webplayer_contents{width:calc(100vw - 52px)!important;left:52px!important}.customSidebar.screen_mode #webplayer #webplayer_contents,.customSidebar.fullScreen_mode #webplayer #webplayer_contents{top:0!important;left:0!important;width:100vw;height:100vh!important;margin:0!important}.customSidebar.screen_mode #sidebar,.customSidebar.fullScreen_mode #sidebar{top:0!important;display:none!important}.customSidebar.screen_mode.showSidebar #sidebar{display:flex!important}.customSidebar.screen_mode #webplayer_contents,.customSidebar.fullScreen_mode #webplayer_contents{width:100vw!important}.customSidebar.screen_mode.showSidebar:has(#sidebar.min) #webplayer_contents{width:calc(100vw - 52px)!important}.customSidebar.screen_mode.showSidebar:has(#sidebar.max) #webplayer_contents{width:calc(100vw - 240px)!important}.screen_mode.bottomChat #webplayer #webplayer_contents{top:0!important;margin:0!important}.screen_mode.bottomChat #player{min-height:auto!important}.screen_mode.bottomChat #webplayer #webplayer_contents{position:relative;box-sizing:border-box;flex:auto;display:flex;flex-direction:column!important;justify-content:flex-start!important}.screen_mode.bottomChat #webplayer #webplayer_contents .wrapping.side{width:100%!important;max-height:calc(100vh - 56.25vw)!important}.screen_mode.bottomChat.showSidebar:has(#sidebar.min) #webplayer #webplayer_contents .wrapping.side{width:100%!important;max-height:calc(100vh - ((100vw - 52px)*.5625))!important}.screen_mode.bottomChat.showSidebar:has(#sidebar.max) #webplayer #webplayer_contents .wrapping.side{width:100%!important;max-height:calc(100vh - ((100vw - 240px)*.5625))!important}.screen_mode.bottomChat #webplayer #webplayer_contents .wrapping.side section.box.chatting_box{height:100%!important}.screen_mode.bottomChat #webplayer #webplayer_contents .wrapping.side section.box.chatting_box #chatting_area{height:100%!important;min-height:10vh!important}.screen_mode.bottomChat #webplayer #webplayer_contents #player_area .htmlplayer_wrap,.screen_mode.bottomChat #webplayer #webplayer_contents #player_area .htmlplayer_content,.screen_mode.bottomChat #webplayer #webplayer_contents #player_area .float_box,.screen_mode.bottomChat #webplayer #webplayer_contents #player_area #player{height:auto!important;max-height:max-content}.customSidebar #player{max-height:100vh!important}.profile-grayscale{filter:grayscale(100%) contrast(85%);opacity:.8}#sidebar.max .small-user-layout{grid-template-areas:"profile-picture username description watchers"!important;grid-template-columns:24px auto 1fr auto!important;padding:4px 10px!important;gap:8px!important;max-height:32px;opacity:1;overflow:hidden;transition:opacity .4s ease}#sidebar.max .small-user-layout.show-more{max-height:0;opacity:0;padding:0!important;pointer-events:none}#sidebar.max .small-user-layout .profile-picture{width:24px!important;height:24px!important;border-radius:20%!important;object-fit:cover}#sidebar.max .small-user-layout .username{max-width:80px!important;font-size:14px!important;line-height:24px!important;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}#sidebar.max .small-user-layout .description{font-size:12px!important;line-height:24px!important}#sidebar.max .small-user-layout .watchers{font-size:14px!important;line-height:24px!important}#sidebar.max .small-user-layout .watchers .dot{font-size:8px!important;margin-right:4px!important}.section-wrapper>.top-section{display:flex;align-items:center;justify-content:space-around;margin:12px 0 6px;line-height:17px;border-left:3px solid transparent}.section-wrapper>.top-section.follow{border-left-color:#f9a825}.section-wrapper>.top-section.myplus{border-left-color:#4db6ac}.section-wrapper>.top-section.top{border-left-color:#ef5350}.section-wrapper>.top-section>span{text-transform:uppercase;font-weight:550;font-size:14px;margin-top:6px;margin-bottom:2px}.section-wrapper>.top-section>button{border:none;background:none;cursor:pointer;padding:2px 6px;font-size:11px;opacity:.6;line-height:1;flex-shrink:0}.section-wrapper>.top-section>button:hover{opacity:1}.section-wrapper>.top-section .min{display:flex;align-items:center;justify-content:center;width:100%}.section-wrapper>.top-section .min a{display:flex;align-items:center;justify-content:center;width:36px;height:36px}.section-wrapper>.top-section .section-icon{display:inline-block;font-size:18px}.top-section.follow .section-icon{color:#f9a825}.top-section.myplus .section-icon{color:#66bb6a}.top-section.top .section-icon{color:#ef5350}.users-section .vl-spacer-bottom{display:block;width:100%;flex-shrink:0}.users-section .user.show-more{display:block;grid-template-areas:unset;grid-template-columns:unset;max-height:36px;opacity:1;padding:6px 0;pointer-events:auto;text-align:center;font-size:13px;background:none;border:none;cursor:pointer;width:100%}.users-section .user{display:grid;grid-template-areas:"profile-picture username watchers" "profile-picture description blank";grid-template-columns:40px auto auto;padding:5px 10px;max-height:50px;opacity:1;overflow:visible;content-visibility:auto;contain-intrinsic-size:0 60px;position:relative}.users-section .user:hover{cursor:pointer}.users-section .user .chzzk-pin-btn{display:none;position:absolute;right:6px;top:50%;transform:translateY(-50%);background:#1e1e23d1;border:1px solid rgba(255,255,255,.22);cursor:pointer;font-size:13px;padding:3px 6px;border-radius:5px;line-height:1;color:#c8c8cc;z-index:2;box-shadow:0 1px 4px #0006;transition:background .12s,border-color .12s}.users-section .user .chzzk-pin-btn:hover{background:#32323cf2;border-color:#ffffff73;color:#fff}.users-section .user .chzzk-pin-btn.pinned{color:gold;border-color:#ffd70080}.users-section .user:hover .chzzk-pin-btn{display:block}.users-section .user .profile-picture-container{grid-area:profile-picture;position:relative;display:flex;align-items:center;overflow:visible}.users-section .user .profile-picture-container .pin-badge{position:absolute;top:-7px;left:-7px;font-size:20px;line-height:1;pointer-events:none;transform:rotate(-45deg);filter:brightness(0) invert(1) drop-shadow(0 1px 5px #000000);z-index:1}.users-section .user .profile-picture{grid-area:profile-picture;width:30px;height:30px;border-radius:50%;line-height:20px}.users-section .user .username{grid-area:username;font-size:14px;font-weight:600;letter-spacing:.6px;margin-left:1px;line-height:17px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users-section .user .description{grid-area:description;font-size:13px;font-weight:400;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-left:1px;line-height:16px}.users-section .user .watchers{grid-area:watchers;display:flex;align-items:center;justify-content:flex-end;font-weight:400;font-size:14px;margin-right:2px;line-height:17px}.users-section .user .watchers .dot{font-size:10px;margin-right:5px;color:#ff2424}.users-section .user .watchers .dot.greendot{color:#34c76b!important}#toggleButton,#toggleButton2,#toggleButton3,#toggleButton4,#toggleButton5{padding:7px 0;width:100%;text-align:center;font-size:14px}html[dark=true] #toggleButton,html[dark=true] #toggleButton2,html[dark=true] #toggleButton3,html[dark=true] #toggleButton4,html[dark=true] #toggleButton5{color:#a1a1a1}html:not([dark=true]) #toggleButton,html:not([dark=true]) #toggleButton2,html:not([dark=true]) #toggleButton3,html:not([dark=true]) #toggleButton4,html:not([dark=true]) #toggleButton5{color:#53535f}html[dark=true] .section-wrapper>.top-section>button{color:#a1a1a1}html[dark=true] .users-section .user:hover{background-color:#26262c}html[dark=true] .users-section .user .username{color:#dedee3}html[dark=true] .users-section .user .description{color:#a1a1a1}html[dark=true] .users-section .user .watchers{color:silver}html[dark=true] .users-section .user.user-offline span{filter:grayscale(1) brightness(.8)}html[dark=true] .users-section .user.show-more{color:#a1a1a1}html:not([dark=true]) .section-wrapper>.top-section>button{color:#53535f}html:not([dark=true]) .users-section .user:hover{background-color:#e6e6ea}html:not([dark=true]) .users-section .user .username{color:#1f1f23}html:not([dark=true]) .users-section .user .description{color:#53535f}html:not([dark=true]) .users-section .user .watchers{color:#000}html:not([dark=true]) .users-section .user.user-offline span{opacity:.7}html:not([dark=true]) .users-section .user.show-more{color:#53535f}#category-group-wrapper,#favorite-group-wrapper{position:relative;margin-bottom:5px}#sidebar.min #category-group-wrapper,#sidebar.min #favorite-group-wrapper{display:none!important}.fav-group-scroll-btn{position:absolute;top:-1px;width:32px;height:100%;border:none;font-size:24px;font-weight:700;z-index:10;display:flex;align-items:center;justify-content:center;visibility:hidden;opacity:0;color:transparent;cursor:default;transition:opacity .2s,visibility .2s,color .2s}.fav-group-scroll-btn.visible{visibility:visible;opacity:1}.fav-group-scroll-btn.scroll-btn-left{left:0}.fav-group-scroll-btn.scroll-btn-right{right:0}#category-group-wrapper:hover .fav-group-scroll-btn.visible,#favorite-group-wrapper:hover .fav-group-scroll-btn.visible{cursor:pointer}#favorite-group-tabs,#category-group-tabs{display:flex;align-items:center;overflow-x:auto;overflow-y:hidden;box-sizing:border-box;scrollbar-width:none;-ms-overflow-style:none;margin-left:5px}#favorite-group-tabs::-webkit-scrollbar,#category-group-tabs::-webkit-scrollbar{display:none}.fav-group-tab{flex-shrink:0;padding:4px 10px;margin:0 3px;cursor:pointer;border-radius:15px;font-size:13px;border:1px solid transparent;transition:background-color .2s,color .2s}.fav-group-tab.active{font-weight:700}html[dark=true] #favorite-group-wrapper:hover .fav-group-scroll-btn.visible,html[dark=true] #category-group-wrapper:hover .fav-group-scroll-btn.visible{color:#dedee3}html[dark=true] .scroll-btn-left{background:linear-gradient(to right,#1f1f23,#1f1f2300)}html[dark=true] .scroll-btn-right{background:linear-gradient(to left,#1f1f23,#1f1f2300)}html[dark=true] .fav-group-tab{background-color:#2c2c31;color:#dedee3}html[dark=true] .fav-group-tab:hover{background-color:#3e3e44}html[dark=true] .fav-group-tab.active{background-color:#424242}html:not([dark=true]) #favorite-group-wrapper:hover .fav-group-scroll-btn.visible,html:not([dark=true]) #category-group-wrapper:hover .fav-group-scroll-btn.visible{color:#53535f}html:not([dark=true]) .scroll-btn-left{background:linear-gradient(to right,#efeff1,#efeff100)}html:not([dark=true]) .scroll-btn-right{background:linear-gradient(to left,#efeff1,#efeff100)}html:not([dark=true]) .fav-group-tab{background-color:#e6e6ea;color:#53535f}html:not([dark=true]) .fav-group-tab:hover{background-color:#dcdde1}html:not([dark=true]) .fav-group-tab.active{background-color:#d2d2d2}.tooltip-container{z-index:9999;width:460px;height:auto;position:fixed;display:flex;flex-direction:column;align-items:center;border-radius:10px;box-shadow:5px 5px 10px #00000080;opacity:0;overflow:hidden;pointer-events:none;background-color:#1a1a1b}.tooltip-container.visible{opacity:1;pointer-events:auto}.tooltip-container .thumbs-box{position:relative;width:100%;aspect-ratio:16 / 9;background-color:#000;overflow:hidden}.tooltip-container img{width:100%;height:100%;object-fit:cover;border-top-left-radius:10px;border-top-right-radius:10px}.tooltip-container .views{display:flex;align-items:center;background:#17191cd9;height:24px;padding:0 10px;border-radius:30px;color:#fff!important;font-size:13px;line-height:24px;z-index:5;position:relative}.tooltip-container .views:before{content:"";display:block;background:#ff2424;width:6px;height:6px;margin-right:4px;border-radius:50%}.tooltip-container.feed-mode{width:400px}.tooltip-container.feed-mode img{height:100%;object-fit:contain;background-color:#000}.tooltiptext{padding:14px 20px;font-size:18px;text-align:left;border-bottom-left-radius:10px;border-bottom-right-radius:10px;line-height:22px;width:100%;box-sizing:border-box}.tooltiptext .dot{font-size:11px;margin-right:2px;vertical-align:middle;line-height:22px;display:inline-block}.tooltiptext,.tooltiptext *{font-family:inherit}.thumb-overlay-bottom{position:absolute;bottom:8px;left:8px;display:flex;gap:6px;z-index:10}.duration-overlay{display:flex;align-items:center;background:#17191cd9;height:24px;padding:0 10px;border-radius:30px;color:#fff!important;font-size:13px;line-height:24px;z-index:5;position:relative;top:auto;left:auto;right:auto;bottom:auto}.feed-stats-tooltip{display:flex;justify-content:flex-start;gap:15px;margin-top:10px;padding-top:10px;border-top:1px solid rgba(128,128,128,.2);font-size:14px}.feed-stats-tooltip .stat{display:flex;align-items:center;gap:5px;opacity:.85}.icon-feed-like,.icon-feed-view{display:inline-block;width:20px;height:20px;background-size:contain;background-repeat:no-repeat;background-position:center}.icon-feed-comment{display:inline-block;margin-top:2px;width:18px;height:18px;background-size:contain;background-repeat:no-repeat;background-position:center}.icon-feed-like{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23757B8A' stroke-width='1.4' d='M7.032 14.847v-6.93l1.95-4.614a1.667 1.667 0 0 1 1.714-1.009l.036.004a1.667 1.667 0 0 1 1.488 1.657v2.221c0 .23.187.417.417.417h3.293a1.5 1.5 0 0 1 1.47 1.798l-1.161 5.737a2.5 2.5 0 0 1-2.45 2.003H9.633c-.148 0-.295-.02-.438-.058l-1.549-.423a.833.833 0 0 1-.614-.803ZM3.563 9.582c0-.92.747-1.666 1.667-1.666h.966c.46 0 .834.373.834.833v5.8c0 .46-.373.833-.834.833H5.23c-.92 0-1.667-.746-1.667-1.666V9.582Z'/%3e%3c/svg%3e")}html[dark=true] .icon-feed-like{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23999' stroke-width='1.4' d='M7.032 14.847v-6.93l1.95-4.614a1.667 1.667 0 0 1 1.714-1.009l.036.004a1.667 1.667 0 0 1 1.488 1.657v2.221c0 .23.187.417.417.417h3.293a1.5 1.5 0 0 1 1.47 1.798l-1.161 5.737a2.5 2.5 0 0 1-2.45 2.003H9.633c-.148 0-.295-.02-.438-.058l-1.549-.423a.833.833 0 0 1-.614-.803ZM3.563 9.582c0-.92.747-1.666 1.667-1.666h.966c0 .46.373.833.834.833v5.8c0 .46-.373.833-.834.833H5.23c-.92 0-1.667-.746-1.667-1.666V9.582Z'/%3e%3c/svg%3e")}.tooltip-feed-content{margin-top:12px;padding:10px;font-size:15px;line-height:1.6;text-align:left;border-radius:6px;opacity:.9;word-break:break-all;max-height:350px;overflow-y:auto}.tooltip-header{margin-bottom:6px;font-size:17px;display:flex;align-items:center;flex-wrap:wrap;gap:6px}.tooltip-username{font-weight:600;font-size:13px}.tooltip-description{font-size:17px;margin-left:0;margin-top:2px;display:block;color:#fff!important}.tooltip-title{line-height:1.4;font-size:22px;color:#fff!important;display:flex;align-items:center;gap:6px}.tooltip-time{font-size:14px;opacity:.55;font-weight:300;flex-shrink:0}html[dark=true] .tooltip-container{background-color:#26262c}html[dark=true] .tooltiptext{color:#fff;background-color:#26262c}html[dark=true] .tooltip-username{color:#fff}html[dark=true] .tooltip-description{color:#fff!important}html[dark=true] .feed-stats-tooltip{border-top-color:#ffffff1a}html[dark=true] .tooltip-feed-content{background-color:#ffffff0d;color:#ddd}html:not([dark=true]) .tooltip-container{background-color:#f0f0f5;border:1px solid #dcdce6}html:not([dark=true]) .tooltiptext{color:#1a1a1b;background-color:#f0f0f5}html:not([dark=true]) .tooltip-username{color:#1a1a1b}html:not([dark=true]) .tooltip-description{color:#fff!important}html:not([dark=true]) .feed-stats-tooltip{border-top-color:#0000001a}html:not([dark=true]) .tooltip-feed-content{background-color:#00000008;color:#444}#sidebar{top:64px;left:0;display:flex!important;flex-direction:column!important;grid-area:sidebar;padding-bottom:360px;height:100vh;overflow-y:auto;position:fixed;scrollbar-width:none;transition:width .1s ease-in-out;z-index:1401}#sidebar::-webkit-scrollbar{display:none}#sidebar.max{width:240px}#sidebar.max .button-fold-sidebar{background-size:7px 11px;background-repeat:no-repeat;width:26px;height:26px;background-position:center;position:absolute;top:13px;left:200px}#sidebar.max .button-fold-sidebar .sidebar-refresh-countdown{position:absolute;right:30px;top:50%;transform:translateY(-50%);font-size:10px;color:#888;white-space:nowrap;pointer-events:none;-webkit-user-select:none;user-select:none}#sidebar.max .button-unfold-sidebar,#sidebar.max .top-section span.min{display:none}#sidebar.min{width:52px}#sidebar.min .button-fold-sidebar{display:none}#sidebar.min .button-unfold-sidebar{background-size:7px 11px;background-repeat:no-repeat;width:26px;height:26px;background-position:center;position:relative;top:8px;left:12px;padding-top:16px;padding-bottom:12px}#sidebar.min .top-section span.max,#sidebar.min .users-section a.user span{display:none}#sidebar.min .users-section button{font-size:12px;padding:4px}html[dark=true] #sidebar{color:#fff;background-color:#1f1f23}html[dark=true] #sidebar .top-section>span{color:#dedee3}html[dark=true] #sidebar .top-section>span>a{color:#dedee3}html[dark=true] #sidebar.max .button-fold-sidebar{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none slice' viewBox='0 0 7 11'%3e%3cpath fill='%23f9f9f9' d='M5.87 11.01L.01 5.51 5.87.01l1.08 1.01-4.74 4.45L7 9.96 5.87 11z'/%3e%3c/svg%3e")}html[dark=true] #sidebar.min .button-unfold-sidebar{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none slice' viewBox='0 0 7 11'%3e%3cpath fill='%23f9f9f9' d='M1.13 11.01l5.86-5.5L1.13.01.05 1.02l4.74 4.45L0 9.96 1.13 11z'/%3e%3c/svg%3e")}html:not([dark=true]) #sidebar{color:#fff;background-color:#efeff1}html:not([dark=true]) #sidebar .top-section>span{color:#0e0e10}html:not([dark=true]) #sidebar .top-section>span>a{color:#0e0e10}html:not([dark=true]) #sidebar.max .button-fold-sidebar{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none slice' viewBox='0 0 7 11'%3e%3cpath fill='%23888' d='M5.87 11.01L.01 5.51 5.87.01l1.08 1.01-4.74 4.45L7 9.96 5.87 11z'/%3e%3c/svg%3e")}html:not([dark=true]) #sidebar.min .button-unfold-sidebar{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none slice' viewBox='0 0 7 11'%3e%3cpath fill='%23888' d='M1.13 11.01l5.86-5.5L1.13.01.05 1.02l4.74 4.45L0 9.96 1.13 11z'/%3e%3c/svg%3e")}.customSidebar.screen_mode #sidebar .button-fold-sidebar,.customSidebar.screen_mode #sidebar .button-unfold-sidebar{display:none!important}.left_navbar{display:flex;align-items:center;justify-content:flex-end;position:fixed;flex-direction:row-reverse;top:0;left:128px;z-index:9999;background-color:#fff}.left_navbar button.left_nav_button{position:relative;width:68px;height:64px;padding:0;border:0;cursor:pointer;z-index:3001;font-size:1.25em!important;font-weight:600}html[dark=true] .left_navbar{background-color:#0c0d0e}html[dark=true] .left_nav_button{color:#e5e5e5}html:not([dark=true]) .left_nav_button{color:#1f1f23}.screen_mode .left_navbar,.fullScreen_mode .left_navbar{display:none}@media (max-width: 1280px){#serviceHeader .left_navbar{left:124px!important}#serviceHeader .left_nav_button{width:58px!important;font-size:1.2em!important}}@media (max-width: 1100px){#serviceHeader .left_navbar{left:120px!important}#serviceHeader .left_nav_button{width:46px!important;font-size:1.1em!important}}@keyframes rotate{0%{transform:rotate(0)}to{transform:rotate(360deg)}}#openModalBtn{box-sizing:border-box;font-size:12px;line-height:1.2!important;font-family:NG;list-style:none;position:relative;margin-left:12px;width:40px;height:40px}#openModalBtn>button.btn-settings-ui{display:block;width:100%;height:100%;border:none;cursor:pointer;padding:0;background:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none'%3e%3cpath stroke='%23757B8A' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.4' d='M8.269 2.061c.44-1.815 3.022-1.815 3.462 0a1.782 1.782 0 0 0 2.658 1.101c1.595-.971 3.42.854 2.449 2.449a1.781 1.781 0 0 0 1.1 2.658c1.816.44 1.816 3.022 0 3.462a1.781 1.781 0 0 0-1.1 2.659c.971 1.595-.854 3.42-2.449 2.448a1.781 1.781 0 0 0-2.658 1.101c-.44 1.815-3.022 1.815-3.462 0a1.781 1.781 0 0 0-2.658-1.101c-1.595.972-3.42-.854-2.449-2.448a1.782 1.782 0 0 0-1.1-2.659c-1.816-.44-1.816-3.021 0-3.462a1.782 1.782 0 0 0 1.1-2.658c-.972-1.595.854-3.42 2.449-2.449a1.781 1.781 0 0 0 2.658-1.1Z'/%3e%3cpath stroke='%23757B8A' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.4' d='M13.1 10a3.1 3.1 0 1 1-6.2 0 3.1 3.1 0 0 1 6.2 0Z'/%3e%3c/svg%3e") 50% 50% no-repeat!important;background-size:18px!important}html[dark=true] #openModalBtn>button.btn-settings-ui{background:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none'%3e%3cpath stroke='%23ACB0B9' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.4' d='M8.269 2.061c.44-1.815 3.022-1.815 3.462 0a1.782 1.782 0 0 0 2.658 1.101c1.595-.971 3.42.854 2.449 2.449a1.781 1.781 0 0 0 1.1 2.658c1.816.44 1.816 3.022 0 3.462a1.781 1.781 0 0 0-1.1 2.659c.971 1.595-.854 3.42-2.449 2.448a1.781 1.781 0 0 0-2.658 1.101c-.44 1.815-3.022 1.815-3.462 0a1.781 1.781 0 0 0-2.658-1.101c-1.595.972-3.42-.854-2.449-2.448a1.782 1.782 0 0 0-1.1-2.659c-1.816-.44-1.816-3.021 0-3.462a1.782 1.782 0 0 0 1.1-2.658c-.972-1.595.854-3.42 2.449-2.449a1.781 1.781 0 0 0 2.658-1.1Z'/%3e%3cpath stroke='%23ACB0B9' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.4' d='M13.1 10a3.1 3.1 0 1 1-6.2 0 3.1 3.1 0 0 1 6.2 0Z'/%3e%3c/svg%3e") 50% 50% no-repeat!important;background-size:18px!important}#openModalBtn:has(.red-dot) .btn-settings-ui{animation:rotate 4s linear 10}#topInnerHeader #openModalBtn{margin-right:12px}#myModal{--bg-color-v8xK4z: #17181c;--surface-color-v8xK4z: #202229;--primary-text-v8xK4z: #f2f3f5;--secondary-text-v8xK4z: #a9adb6;--accent-color-v8xK4z: #4f8fb8;--border-color-v8xK4z: rgba(255, 255, 255, .09);--shadow-v8xK4z: 0 14px 40px rgba(0, 0, 0, .42);--font-family-v8xK4z: sans-serif;display:none;position:fixed;z-index:9999;left:0;top:0;width:100%;height:100%;overflow:hidden;background-color:#000000b8;font-family:var(--font-family-v8xK4z);color:var(--primary-text-v8xK4z)}html:not([dark=true]) #myModal{--bg-color-v8xK4z: #eef0f3;--surface-color-v8xK4z: #ffffff;--primary-text-v8xK4z: #14171c;--secondary-text-v8xK4z: #575d68;--accent-color-v8xK4z: #2f78a5;--border-color-v8xK4z: #d8dde4;--shadow-v8xK4z: 0 14px 36px rgba(17, 23, 34, .16);background-color:#14181e47}#myModal .modal-content_v8xK4z{background-color:var(--surface-color-v8xK4z);margin:5vh auto;border:1px solid var(--border-color-v8xK4z);border-radius:10px;width:850px;max-width:calc(100vw - 48px);height:90vh;box-shadow:var(--shadow-v8xK4z);display:flex;flex-direction:row;overflow:hidden}#myModal .modal-index_v8xK4z{flex-shrink:0;width:196px;padding:12px 0 8px;border-right:1px solid var(--border-color-v8xK4z);background-color:var(--bg-color-v8xK4z);overflow-y:auto;display:flex;flex-direction:column}#myModal .modal-index_v8xK4z::-webkit-scrollbar{width:8px}#myModal .modal-index_v8xK4z::-webkit-scrollbar-track{background:var(--surface-color-v8xK4z)}#myModal .modal-index_v8xK4z::-webkit-scrollbar-thumb{background-color:var(--border-color-v8xK4z);border-radius:4px}#myModal .modal-index_v8xK4z::-webkit-scrollbar-thumb:hover{background-color:#555}#myModal .modal-version_v8xK4z{padding:8px 18px;font-size:10px;line-height:1.4;color:var(--secondary-text-v8xK4z);border-top:1px solid var(--border-color-v8xK4z);opacity:.7}#myModal .index-title_v8xK4z{font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.11em;padding:8px 18px;margin:0 0 6px;color:var(--secondary-text-v8xK4z)}#myModal .index-button_v8xK4z{display:block;width:auto;padding:12px;background:none;color:var(--secondary-text-v8xK4z);text-align:left;font-size:13px;font-weight:500;cursor:pointer;transition:background-color .18s,color .18s,border-color .18s}#myModal .index-button_v8xK4z:hover{background-color:#ffffff0f;border-color:var(--border-color-v8xK4z);color:var(--primary-text-v8xK4z)}#myModal .index-button_v8xK4z.active{background-color:#4f8fb82e;border-color:#4f8fb870;color:var(--primary-text-v8xK4z);font-weight:600}html:not([dark=true]) #myModal .index-button_v8xK4z:hover{background-color:#0f141c0a}html:not([dark=true]) #myModal .index-button_v8xK4z.active{background-color:#2f78a521;border-color:#2f78a54d}#myModal .modal-main-content_v8xK4z{flex-grow:1;display:flex;flex-direction:column;overflow:hidden}#myModal .modal-header_v8xK4z{padding:14px 22px;border-bottom:1px solid var(--border-color-v8xK4z);display:flex;justify-content:space-between;align-items:center;flex-shrink:0;background-color:var(--surface-color-v8xK4z);gap:16px}#myModal .modal-breadcrumb_v8xK4z{display:flex;align-items:center;gap:8px;min-width:0;color:var(--primary-text-v8xK4z);font-size:20px;font-weight:600}#myModal .modal-breadcrumb_v8xK4z .breadcrumb-root_v8xK4z{flex-shrink:0}#myModal .modal-breadcrumb_v8xK4z .breadcrumb-sep_v8xK4z{color:var(--secondary-text-v8xK4z);opacity:.6;font-size:14px}#myModal .modal-breadcrumb_v8xK4z .breadcrumb-current_v8xK4z{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#myModal .modal-search-container_v8xK4z{flex:1;max-width:360px}#myModal .modal-search-container_v8xK4z .search-input-wrapper_v8xK4z{position:relative;display:flex;align-items:center}#myModal .modal-search-container_v8xK4z .search-icon_v8xK4z{position:absolute;left:12px;color:var(--secondary-text-v8xK4z);font-size:14px;pointer-events:none}#myModal #modal-search-input_v8xK4z{width:100%;height:30px;padding:0 34px;border-radius:6px;border:1px solid var(--border-color-v8xK4z);background-color:var(--bg-color-v8xK4z);color:var(--primary-text-v8xK4z);outline:none}#myModal #modal-search-input_v8xK4z:focus{border-color:#4f8fb88c;box-shadow:0 0 0 2px #4f8fb82e}#myModal #modal-search-input_v8xK4z::placeholder{color:var(--secondary-text-v8xK4z)}html:not([dark=true]) #myModal #modal-search-input_v8xK4z:focus{border-color:#2f78a580;box-shadow:0 0 0 2px #2f78a524}#myModal #modal-search-clear_v8xK4z{position:absolute;right:8px;width:20px;height:20px;padding:0;border:none;background:none;color:var(--secondary-text-v8xK4z);cursor:pointer;border-radius:4px}#myModal #modal-search-clear_v8xK4z:hover{background-color:#ffffff14;color:var(--primary-text-v8xK4z)}html:not([dark=true]) #myModal #modal-search-clear_v8xK4z:hover{background-color:#0000000d}#myModal .close-button_v8xK4z{background:none;border:none;color:var(--secondary-text-v8xK4z);font-size:32px;font-weight:700;cursor:pointer;width:36px;height:36px;border-radius:6px;transition:color .2s,background-color .2s}#myModal .close-button_v8xK4z:hover,#myModal .close-button_v8xK4z:focus{color:var(--primary-text-v8xK4z)}html:not([dark=true]) #myModal .close-button_v8xK4z:hover,html:not([dark=true]) #myModal .close-button_v8xK4z:focus{background-color:#0000000d}#myModal .modal-body_v8xK4z{padding:24px;overflow-y:auto;flex-grow:1;padding-bottom:30vh}#myModal .modal-body_v8xK4z::-webkit-scrollbar{width:8px}#myModal .modal-body_v8xK4z::-webkit-scrollbar-track{background:var(--surface-color-v8xK4z)}#myModal .modal-body_v8xK4z::-webkit-scrollbar-thumb{background-color:var(--border-color-v8xK4z);border-radius:4px}#myModal .modal-body_v8xK4z::-webkit-scrollbar-thumb:hover{background-color:#555}#myModal .modal-footer_v8xK4z{padding-top:24px;margin-top:24px;border-top:1px solid var(--border-color-v8xK4z)}#myModal .section-title_v8xK4z{font-size:17px;font-weight:600;color:var(--primary-text-v8xK4z);margin:32px 0 16px;padding:10px 14px;background-color:var(--bg-color-v8xK4z);border-left:3px solid var(--accent-color-v8xK4z);border-radius:4px;scroll-margin-top:24px;-webkit-user-select:none;user-select:none}#myModal section:first-child .section-title_v8xK4z{margin-top:0}#myModal .option_v8xK4z{display:grid;grid-template-columns:1fr auto;align-items:center;gap:12px;padding:10px 12px;border-radius:8px;border:1px solid transparent;transition:background-color .2s,border-color .2s}#myModal .option_v8xK4z label{display:flex;align-items:center;font-size:14px;color:var(--secondary-text-v8xK4z)}#myModal .option_v8xK4z:not(.multi-option_v8xK4z):hover{background-color:#ffffff0d;border-color:var(--border-color-v8xK4z)}html:not([dark=true]) #myModal .option_v8xK4z:not(.multi-option_v8xK4z):hover{background-color:#00000008}#myModal .range-option_v8xK4z{grid-template-columns:auto 1fr;gap:20px}#myModal .range-container_v8xK4z{display:flex;align-items:center;gap:15px}#myModal input[type=range]{width:100%}#myModal .range-value_v8xK4z{font-size:15px;color:var(--primary-text-v8xK4z);min-width:30px;text-align:right}#myModal .switch_v8xK4z{position:relative;display:inline-block;width:50px;height:28px}#myModal .switch_v8xK4z input{opacity:0;width:0;height:0}#myModal .slider_v8xK4z{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#4d4d4d;transition:.4s;border-radius:28px}#myModal .slider_v8xK4z:before{position:absolute;content:"";height:20px;width:20px;left:4px;bottom:4px;background-color:#fff;transition:.4s;border-radius:50%}#myModal input:checked+.slider_v8xK4z{background-color:var(--accent-color-v8xK4z)}#myModal input:focus+.slider_v8xK4z{box-shadow:0 0 1px var(--accent-color-v8xK4z)}#myModal input:checked+.slider_v8xK4z:before{transform:translate(22px)}#myModal .divider_v8xK4z{border:none;height:1px;background-color:var(--border-color-v8xK4z);margin:24px 0}#myModal .option-details_v8xK4z{grid-column:1 / -1;display:flex;gap:15px}#myModal .mapper-setting_v8xK4z{display:inline;margin-left:16px}#myModal .mapper-setting_v8xK4z select{background-color:var(--surface-color-v8xK4z);color:var(--primary-text-v8xK4z);border:1px solid var(--border-color-v8xK4z);border-radius:6px;padding:5px 8px;outline:none}#myModal textarea{grid-column:1 / -1;width:100%;background-color:var(--bg-color-v8xK4z);border:1px solid var(--border-color-v8xK4z);border-radius:6px;color:var(--primary-text-v8xK4z);padding:10px;resize:vertical}#myModal .description_v8xK4z{font-size:13px;line-height:1.5;color:var(--secondary-text-v8xK4z);margin:0 0 10px}#myModal .no-results_v8xK4z{padding:40px;text-align:center;color:var(--secondary-text-v8xK4z);font-size:14px}#myModal .bug-report_v8xK4z a{color:var(--accent-color-v8xK4z);text-decoration:none}#myModal .bug-report_v8xK4z a:hover{text-decoration:underline}#myModal .multi-option_v8xK4z{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:6px;padding:0}#myModal .option-group_v8xK4z{display:flex;justify-content:space-between;align-items:center;padding:8px;border-radius:8px;border:1px solid transparent;transition:background-color .2s,border-color .2s}#myModal .option-group_v8xK4z:hover{background-color:#ffffff1a;border-color:var(--border-color-v8xK4z)}html:not([dark=true]) #myModal .option-group_v8xK4z:hover{background-color:#0000000d}#myModal .subsection-title_v8xK4z{margin-top:25px;margin-bottom:15px;font-size:15px;color:var(--primary-text-v8xK4z);font-weight:600;border-bottom:1px solid var(--border-color-v8xK4z);padding-bottom:8px}#myModal .order-list_v8xK4z{display:flex;flex-direction:row;flex-wrap:wrap;gap:8px}#myModal .draggable-item_v8xK4z{background-color:var(--bg-color-v8xK4z);padding:8px 12px;border-radius:5px;border:1px solid var(--border-color-v8xK4z);cursor:grab;transition:background-color .2s,border-color .2s;font-size:14px;white-space:nowrap}#myModal .draggable-item_v8xK4z:hover{background-color:#ffffff14}#myModal .draggable-item_v8xK4z.dragging_v8xK4z{opacity:.5;background-color:#5dade2;cursor:grabbing}html:not([dark=true]) #myModal .draggable-item_v8xK4z:hover{background-color:#0000000a}.preview-modal-overlay_v8xK4z{display:flex;position:fixed;z-index:10000;left:0;top:0;width:100%;height:100%;overflow:hidden;background-color:#000000d9;align-items:center;justify-content:center}.preview-modal-overlay_v8xK4z .preview-modal-content_v8xK4z{position:relative;width:80%;max-width:800px;border-radius:12px;border:1px solid rgba(255,255,255,.12);overflow:hidden;box-shadow:0 8px 40px #000000b3;background-color:#1a1a1b;display:flex;flex-direction:column}.preview-modal-overlay_v8xK4z .preview-modal-close_v8xK4z{position:absolute;top:10px;right:14px;color:#fff;font-size:30px;font-weight:700;cursor:pointer;background:none;border:none;line-height:1;z-index:10;opacity:.8;transition:opacity .2s}.preview-modal-overlay_v8xK4z .preview-modal-close_v8xK4z:hover{opacity:1}.preview-modal-overlay_v8xK4z .preview-modal-thumbnail_v8xK4z{width:100%;aspect-ratio:16 / 9;background-color:#000;overflow:hidden}.preview-modal-overlay_v8xK4z .preview-modal-thumbnail_v8xK4z img{width:100%;height:100%;object-fit:cover}.preview-modal-overlay_v8xK4z .preview-modal-info_v8xK4z{padding:20px 24px;display:flex;flex-direction:column;gap:8px}.preview-modal-overlay_v8xK4z .preview-modal-nick_v8xK4z{font-size:18px;font-weight:700;color:#f2f3f5}.preview-modal-overlay_v8xK4z .preview-modal-title_v8xK4z{font-size:15px;color:#a9adb6;line-height:1.4}.preview-modal-overlay_v8xK4z .preview-modal-link_v8xK4z{display:inline-block;margin-top:6px;padding:8px 18px;background-color:#4f8fb8;color:#fff;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;align-self:flex-start;transition:background-color .2s}.preview-modal-overlay_v8xK4z .preview-modal-link_v8xK4z:hover{background-color:#3a7ca5} `);

(function () {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  function getDefaultExportFromCjs(x2) {
    return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
  }
  var jsxRuntime = { exports: {} };
  var reactJsxRuntime_production_min = {};
  var react = { exports: {} };
  var react_production_min = {};
  /**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var l$1 = Symbol.for("react.element"), n$1 = Symbol.for("react.portal"), p$2 = Symbol.for("react.fragment"), q$1 = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v$1 = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z$1 = Symbol.iterator;
  function A$1(a) {
    if (null === a || "object" !== typeof a) return null;
    a = z$1 && a[z$1] || a["@@iterator"];
    return "function" === typeof a ? a : null;
  }
  var B$2 = { isMounted: function() {
    return false;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, C$1 = Object.assign, D$1 = {};
  function E$1(a, b, e) {
    this.props = a;
    this.context = b;
    this.refs = D$1;
    this.updater = e || B$2;
  }
  E$1.prototype.isReactComponent = {};
  E$1.prototype.setState = function(a, b) {
    if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, a, b, "setState");
  };
  E$1.prototype.forceUpdate = function(a) {
    this.updater.enqueueForceUpdate(this, a, "forceUpdate");
  };
  function F() {
  }
  F.prototype = E$1.prototype;
  function G$1(a, b, e) {
    this.props = a;
    this.context = b;
    this.refs = D$1;
    this.updater = e || B$2;
  }
  var H$1 = G$1.prototype = new F();
  H$1.constructor = G$1;
  C$1(H$1, E$1.prototype);
  H$1.isPureReactComponent = true;
  var I$1 = Array.isArray, J = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$1 = { key: true, ref: true, __self: true, __source: true };
  function M$1(a, b, e) {
    var d, c = {}, k2 = null, h = null;
    if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k2 = "" + b.key), b) J.call(b, d) && !L$1.hasOwnProperty(d) && (c[d] = b[d]);
    var g = arguments.length - 2;
    if (1 === g) c.children = e;
    else if (1 < g) {
      for (var f2 = Array(g), m2 = 0; m2 < g; m2++) f2[m2] = arguments[m2 + 2];
      c.children = f2;
    }
    if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
    return { $$typeof: l$1, type: a, key: k2, ref: h, props: c, _owner: K$1.current };
  }
  function N$1(a, b) {
    return { $$typeof: l$1, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
  }
  function O$1(a) {
    return "object" === typeof a && null !== a && a.$$typeof === l$1;
  }
  function escape(a) {
    var b = { "=": "=0", ":": "=2" };
    return "$" + a.replace(/[=:]/g, function(a2) {
      return b[a2];
    });
  }
  var P$1 = /\/+/g;
  function Q$1(a, b) {
    return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
  }
  function R$1(a, b, e, d, c) {
    var k2 = typeof a;
    if ("undefined" === k2 || "boolean" === k2) a = null;
    var h = false;
    if (null === a) h = true;
    else switch (k2) {
      case "string":
      case "number":
        h = true;
        break;
      case "object":
        switch (a.$$typeof) {
          case l$1:
          case n$1:
            h = true;
        }
    }
    if (h) return h = a, c = c(h), a = "" === d ? "." + Q$1(h, 0) : d, I$1(c) ? (e = "", null != a && (e = a.replace(P$1, "$&/") + "/"), R$1(c, b, e, "", function(a2) {
      return a2;
    })) : null != c && (O$1(c) && (c = N$1(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P$1, "$&/") + "/") + a)), b.push(c)), 1;
    h = 0;
    d = "" === d ? "." : d + ":";
    if (I$1(a)) for (var g = 0; g < a.length; g++) {
      k2 = a[g];
      var f2 = d + Q$1(k2, g);
      h += R$1(k2, b, e, f2, c);
    }
    else if (f2 = A$1(a), "function" === typeof f2) for (a = f2.call(a), g = 0; !(k2 = a.next()).done; ) k2 = k2.value, f2 = d + Q$1(k2, g++), h += R$1(k2, b, e, f2, c);
    else if ("object" === k2) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
    return h;
  }
  function S$1(a, b, e) {
    if (null == a) return a;
    var d = [], c = 0;
    R$1(a, d, "", "", function(a2) {
      return b.call(e, a2, c++);
    });
    return d;
  }
  function T$1(a) {
    if (-1 === a._status) {
      var b = a._result;
      b = b();
      b.then(function(b2) {
        if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
      }, function(b2) {
        if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
      });
      -1 === a._status && (a._status = 0, a._result = b);
    }
    if (1 === a._status) return a._result.default;
    throw a._result;
  }
  var U$1 = { current: null }, V$1 = { transition: null }, W$1 = { ReactCurrentDispatcher: U$1, ReactCurrentBatchConfig: V$1, ReactCurrentOwner: K$1 };
  function X$1() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  react_production_min.Children = { map: S$1, forEach: function(a, b, e) {
    S$1(a, function() {
      b.apply(this, arguments);
    }, e);
  }, count: function(a) {
    var b = 0;
    S$1(a, function() {
      b++;
    });
    return b;
  }, toArray: function(a) {
    return S$1(a, function(a2) {
      return a2;
    }) || [];
  }, only: function(a) {
    if (!O$1(a)) throw Error("React.Children.only expected to receive a single React element child.");
    return a;
  } };
  react_production_min.Component = E$1;
  react_production_min.Fragment = p$2;
  react_production_min.Profiler = r;
  react_production_min.PureComponent = G$1;
  react_production_min.StrictMode = q$1;
  react_production_min.Suspense = w;
  react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$1;
  react_production_min.act = X$1;
  react_production_min.cloneElement = function(a, b, e) {
    if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
    var d = C$1({}, a.props), c = a.key, k2 = a.ref, h = a._owner;
    if (null != b) {
      void 0 !== b.ref && (k2 = b.ref, h = K$1.current);
      void 0 !== b.key && (c = "" + b.key);
      if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
      for (f2 in b) J.call(b, f2) && !L$1.hasOwnProperty(f2) && (d[f2] = void 0 === b[f2] && void 0 !== g ? g[f2] : b[f2]);
    }
    var f2 = arguments.length - 2;
    if (1 === f2) d.children = e;
    else if (1 < f2) {
      g = Array(f2);
      for (var m2 = 0; m2 < f2; m2++) g[m2] = arguments[m2 + 2];
      d.children = g;
    }
    return { $$typeof: l$1, type: a.type, key: c, ref: k2, props: d, _owner: h };
  };
  react_production_min.createContext = function(a) {
    a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
    a.Provider = { $$typeof: t, _context: a };
    return a.Consumer = a;
  };
  react_production_min.createElement = M$1;
  react_production_min.createFactory = function(a) {
    var b = M$1.bind(null, a);
    b.type = a;
    return b;
  };
  react_production_min.createRef = function() {
    return { current: null };
  };
  react_production_min.forwardRef = function(a) {
    return { $$typeof: v$1, render: a };
  };
  react_production_min.isValidElement = O$1;
  react_production_min.lazy = function(a) {
    return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T$1 };
  };
  react_production_min.memo = function(a, b) {
    return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
  };
  react_production_min.startTransition = function(a) {
    var b = V$1.transition;
    V$1.transition = {};
    try {
      a();
    } finally {
      V$1.transition = b;
    }
  };
  react_production_min.unstable_act = X$1;
  react_production_min.useCallback = function(a, b) {
    return U$1.current.useCallback(a, b);
  };
  react_production_min.useContext = function(a) {
    return U$1.current.useContext(a);
  };
  react_production_min.useDebugValue = function() {
  };
  react_production_min.useDeferredValue = function(a) {
    return U$1.current.useDeferredValue(a);
  };
  react_production_min.useEffect = function(a, b) {
    return U$1.current.useEffect(a, b);
  };
  react_production_min.useId = function() {
    return U$1.current.useId();
  };
  react_production_min.useImperativeHandle = function(a, b, e) {
    return U$1.current.useImperativeHandle(a, b, e);
  };
  react_production_min.useInsertionEffect = function(a, b) {
    return U$1.current.useInsertionEffect(a, b);
  };
  react_production_min.useLayoutEffect = function(a, b) {
    return U$1.current.useLayoutEffect(a, b);
  };
  react_production_min.useMemo = function(a, b) {
    return U$1.current.useMemo(a, b);
  };
  react_production_min.useReducer = function(a, b, e) {
    return U$1.current.useReducer(a, b, e);
  };
  react_production_min.useRef = function(a) {
    return U$1.current.useRef(a);
  };
  react_production_min.useState = function(a) {
    return U$1.current.useState(a);
  };
  react_production_min.useSyncExternalStore = function(a, b, e) {
    return U$1.current.useSyncExternalStore(a, b, e);
  };
  react_production_min.useTransition = function() {
    return U$1.current.useTransition();
  };
  react_production_min.version = "18.3.1";
  {
    react.exports = react_production_min;
  }
  var reactExports = react.exports;
  const React$1 = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
  /**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var f = reactExports, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m$1 = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$1 = { key: true, ref: true, __self: true, __source: true };
  function q(c, a, g) {
    var b, d = {}, e = null, h = null;
    void 0 !== g && (e = "" + g);
    void 0 !== a.key && (e = "" + a.key);
    void 0 !== a.ref && (h = a.ref);
    for (b in a) m$1.call(a, b) && !p$1.hasOwnProperty(b) && (d[b] = a[b]);
    if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
    return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
  }
  reactJsxRuntime_production_min.Fragment = l;
  reactJsxRuntime_production_min.jsx = q;
  reactJsxRuntime_production_min.jsxs = q;
  {
    jsxRuntime.exports = reactJsxRuntime_production_min;
  }
  var jsxRuntimeExports = jsxRuntime.exports;
  var reactDom = { exports: {} };
  var reactDom_production_min = {};
  var scheduler = { exports: {} };
  var scheduler_production_min = {};
  /**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  (function(exports) {
    function f2(a, b) {
      var c = a.length;
      a.push(b);
      a: for (; 0 < c; ) {
        var d = c - 1 >>> 1, e = a[d];
        if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;
        else break a;
      }
    }
    function h(a) {
      return 0 === a.length ? null : a[0];
    }
    function k2(a) {
      if (0 === a.length) return null;
      var b = a[0], c = a.pop();
      if (c !== b) {
        a[0] = c;
        a: for (var d = 0, e = a.length, w2 = e >>> 1; d < w2; ) {
          var m2 = 2 * (d + 1) - 1, C2 = a[m2], n2 = m2 + 1, x2 = a[n2];
          if (0 > g(C2, c)) n2 < e && 0 > g(x2, C2) ? (a[d] = x2, a[n2] = c, d = n2) : (a[d] = C2, a[m2] = c, d = m2);
          else if (n2 < e && 0 > g(x2, c)) a[d] = x2, a[n2] = c, d = n2;
          else break a;
        }
      }
      return b;
    }
    function g(a, b) {
      var c = a.sortIndex - b.sortIndex;
      return 0 !== c ? c : a.id - b.id;
    }
    if ("object" === typeof performance && "function" === typeof performance.now) {
      var l2 = performance;
      exports.unstable_now = function() {
        return l2.now();
      };
    } else {
      var p2 = Date, q2 = p2.now();
      exports.unstable_now = function() {
        return p2.now() - q2;
      };
    }
    var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
    "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function G2(a) {
      for (var b = h(t2); null !== b; ) {
        if (null === b.callback) k2(t2);
        else if (b.startTime <= a) k2(t2), b.sortIndex = b.expirationTime, f2(r2, b);
        else break;
        b = h(t2);
      }
    }
    function H2(a) {
      B2 = false;
      G2(a);
      if (!A2) if (null !== h(r2)) A2 = true, I2(J2);
      else {
        var b = h(t2);
        null !== b && K2(H2, b.startTime - a);
      }
    }
    function J2(a, b) {
      A2 = false;
      B2 && (B2 = false, E2(L2), L2 = -1);
      z2 = true;
      var c = y2;
      try {
        G2(b);
        for (v2 = h(r2); null !== v2 && (!(v2.expirationTime > b) || a && !M2()); ) {
          var d = v2.callback;
          if ("function" === typeof d) {
            v2.callback = null;
            y2 = v2.priorityLevel;
            var e = d(v2.expirationTime <= b);
            b = exports.unstable_now();
            "function" === typeof e ? v2.callback = e : v2 === h(r2) && k2(r2);
            G2(b);
          } else k2(r2);
          v2 = h(r2);
        }
        if (null !== v2) var w2 = true;
        else {
          var m2 = h(t2);
          null !== m2 && K2(H2, m2.startTime - b);
          w2 = false;
        }
        return w2;
      } finally {
        v2 = null, y2 = c, z2 = false;
      }
    }
    var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
    function M2() {
      return exports.unstable_now() - Q2 < P2 ? false : true;
    }
    function R2() {
      if (null !== O2) {
        var a = exports.unstable_now();
        Q2 = a;
        var b = true;
        try {
          b = O2(true, a);
        } finally {
          b ? S2() : (N2 = false, O2 = null);
        }
      } else N2 = false;
    }
    var S2;
    if ("function" === typeof F2) S2 = function() {
      F2(R2);
    };
    else if ("undefined" !== typeof MessageChannel) {
      var T2 = new MessageChannel(), U2 = T2.port2;
      T2.port1.onmessage = R2;
      S2 = function() {
        U2.postMessage(null);
      };
    } else S2 = function() {
      D2(R2, 0);
    };
    function I2(a) {
      O2 = a;
      N2 || (N2 = true, S2());
    }
    function K2(a, b) {
      L2 = D2(function() {
        a(exports.unstable_now());
      }, b);
    }
    exports.unstable_IdlePriority = 5;
    exports.unstable_ImmediatePriority = 1;
    exports.unstable_LowPriority = 4;
    exports.unstable_NormalPriority = 3;
    exports.unstable_Profiling = null;
    exports.unstable_UserBlockingPriority = 2;
    exports.unstable_cancelCallback = function(a) {
      a.callback = null;
    };
    exports.unstable_continueExecution = function() {
      A2 || z2 || (A2 = true, I2(J2));
    };
    exports.unstable_forceFrameRate = function(a) {
      0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a ? Math.floor(1e3 / a) : 5;
    };
    exports.unstable_getCurrentPriorityLevel = function() {
      return y2;
    };
    exports.unstable_getFirstCallbackNode = function() {
      return h(r2);
    };
    exports.unstable_next = function(a) {
      switch (y2) {
        case 1:
        case 2:
        case 3:
          var b = 3;
          break;
        default:
          b = y2;
      }
      var c = y2;
      y2 = b;
      try {
        return a();
      } finally {
        y2 = c;
      }
    };
    exports.unstable_pauseExecution = function() {
    };
    exports.unstable_requestPaint = function() {
    };
    exports.unstable_runWithPriority = function(a, b) {
      switch (a) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          a = 3;
      }
      var c = y2;
      y2 = a;
      try {
        return b();
      } finally {
        y2 = c;
      }
    };
    exports.unstable_scheduleCallback = function(a, b, c) {
      var d = exports.unstable_now();
      "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
      switch (a) {
        case 1:
          var e = -1;
          break;
        case 2:
          e = 250;
          break;
        case 5:
          e = 1073741823;
          break;
        case 4:
          e = 1e4;
          break;
        default:
          e = 5e3;
      }
      e = c + e;
      a = { id: u2++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
      c > d ? (a.sortIndex = c, f2(t2, a), null === h(r2) && a === h(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c - d))) : (a.sortIndex = e, f2(r2, a), A2 || z2 || (A2 = true, I2(J2)));
      return a;
    };
    exports.unstable_shouldYield = M2;
    exports.unstable_wrapCallback = function(a) {
      var b = y2;
      return function() {
        var c = y2;
        y2 = b;
        try {
          return a.apply(this, arguments);
        } finally {
          y2 = c;
        }
      };
    };
  })(scheduler_production_min);
  {
    scheduler.exports = scheduler_production_min;
  }
  var schedulerExports = scheduler.exports;
  /**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var aa = reactExports, ca = schedulerExports;
  function p(a) {
    for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
    return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var da = /* @__PURE__ */ new Set(), ea = {};
  function fa(a, b) {
    ha(a, b);
    ha(a + "Capture", b);
  }
  function ha(a, b) {
    ea[a] = b;
    for (a = 0; a < b.length; a++) da.add(b[a]);
  }
  var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
  function oa(a) {
    if (ja.call(ma, a)) return true;
    if (ja.call(la, a)) return false;
    if (ka.test(a)) return ma[a] = true;
    la[a] = true;
    return false;
  }
  function pa(a, b, c, d) {
    if (null !== c && 0 === c.type) return false;
    switch (typeof b) {
      case "function":
      case "symbol":
        return true;
      case "boolean":
        if (d) return false;
        if (null !== c) return !c.acceptsBooleans;
        a = a.toLowerCase().slice(0, 5);
        return "data-" !== a && "aria-" !== a;
      default:
        return false;
    }
  }
  function qa(a, b, c, d) {
    if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return true;
    if (d) return false;
    if (null !== c) switch (c.type) {
      case 3:
        return !b;
      case 4:
        return false === b;
      case 5:
        return isNaN(b);
      case 6:
        return isNaN(b) || 1 > b;
    }
    return false;
  }
  function v(a, b, c, d, e, f2, g) {
    this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
    this.attributeName = d;
    this.attributeNamespace = e;
    this.mustUseProperty = c;
    this.propertyName = a;
    this.type = b;
    this.sanitizeURL = f2;
    this.removeEmptyString = g;
  }
  var z = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
    z[a] = new v(a, 0, false, a, null, false, false);
  });
  [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
    var b = a[0];
    z[b] = new v(b, 1, false, a[1], null, false, false);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
    z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
  });
  ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
    z[a] = new v(a, 2, false, a, null, false, false);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
    z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
  });
  ["checked", "multiple", "muted", "selected"].forEach(function(a) {
    z[a] = new v(a, 3, true, a, null, false, false);
  });
  ["capture", "download"].forEach(function(a) {
    z[a] = new v(a, 4, false, a, null, false, false);
  });
  ["cols", "rows", "size", "span"].forEach(function(a) {
    z[a] = new v(a, 6, false, a, null, false, false);
  });
  ["rowSpan", "start"].forEach(function(a) {
    z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
  });
  var ra = /[\-:]([a-z])/g;
  function sa(a) {
    return a[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
    var b = a.replace(
      ra,
      sa
    );
    z[b] = new v(b, 1, false, a, null, false, false);
  });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
    var b = a.replace(ra, sa);
    z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
  });
  ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
    var b = a.replace(ra, sa);
    z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
  });
  ["tabIndex", "crossOrigin"].forEach(function(a) {
    z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
  });
  z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
  ["src", "href", "action", "formAction"].forEach(function(a) {
    z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
  });
  function ta(a, b, c, d) {
    var e = z.hasOwnProperty(b) ? z[b] : null;
    if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
  }
  var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
  var Ia = Symbol.for("react.offscreen");
  var Ja = Symbol.iterator;
  function Ka(a) {
    if (null === a || "object" !== typeof a) return null;
    a = Ja && a[Ja] || a["@@iterator"];
    return "function" === typeof a ? a : null;
  }
  var A = Object.assign, La;
  function Ma(a) {
    if (void 0 === La) try {
      throw Error();
    } catch (c) {
      var b = c.stack.trim().match(/\n( *(at )?)/);
      La = b && b[1] || "";
    }
    return "\n" + La + a;
  }
  var Na = false;
  function Oa(a, b) {
    if (!a || Na) return "";
    Na = true;
    var c = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (b) if (b = function() {
        throw Error();
      }, Object.defineProperty(b.prototype, "props", { set: function() {
        throw Error();
      } }), "object" === typeof Reflect && Reflect.construct) {
        try {
          Reflect.construct(b, []);
        } catch (l2) {
          var d = l2;
        }
        Reflect.construct(a, [], b);
      } else {
        try {
          b.call();
        } catch (l2) {
          d = l2;
        }
        a.call(b.prototype);
      }
      else {
        try {
          throw Error();
        } catch (l2) {
          d = l2;
        }
        a();
      }
    } catch (l2) {
      if (l2 && d && "string" === typeof l2.stack) {
        for (var e = l2.stack.split("\n"), f2 = d.stack.split("\n"), g = e.length - 1, h = f2.length - 1; 1 <= g && 0 <= h && e[g] !== f2[h]; ) h--;
        for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f2[h]) {
          if (1 !== g || 1 !== h) {
            do
              if (g--, h--, 0 > h || e[g] !== f2[h]) {
                var k2 = "\n" + e[g].replace(" at new ", " at ");
                a.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a.displayName));
                return k2;
              }
            while (1 <= g && 0 <= h);
          }
          break;
        }
      }
    } finally {
      Na = false, Error.prepareStackTrace = c;
    }
    return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
  }
  function Pa(a) {
    switch (a.tag) {
      case 5:
        return Ma(a.type);
      case 16:
        return Ma("Lazy");
      case 13:
        return Ma("Suspense");
      case 19:
        return Ma("SuspenseList");
      case 0:
      case 2:
      case 15:
        return a = Oa(a.type, false), a;
      case 11:
        return a = Oa(a.type.render, false), a;
      case 1:
        return a = Oa(a.type, true), a;
      default:
        return "";
    }
  }
  function Qa(a) {
    if (null == a) return null;
    if ("function" === typeof a) return a.displayName || a.name || null;
    if ("string" === typeof a) return a;
    switch (a) {
      case ya:
        return "Fragment";
      case wa:
        return "Portal";
      case Aa:
        return "Profiler";
      case za:
        return "StrictMode";
      case Ea:
        return "Suspense";
      case Fa:
        return "SuspenseList";
    }
    if ("object" === typeof a) switch (a.$$typeof) {
      case Ca:
        return (a.displayName || "Context") + ".Consumer";
      case Ba:
        return (a._context.displayName || "Context") + ".Provider";
      case Da:
        var b = a.render;
        a = a.displayName;
        a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
        return a;
      case Ga:
        return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
      case Ha:
        b = a._payload;
        a = a._init;
        try {
          return Qa(a(b));
        } catch (c) {
        }
    }
    return null;
  }
  function Ra(a) {
    var b = a.type;
    switch (a.tag) {
      case 24:
        return "Cache";
      case 9:
        return (b.displayName || "Context") + ".Consumer";
      case 10:
        return (b._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return b;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return Qa(b);
      case 8:
        return b === za ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if ("function" === typeof b) return b.displayName || b.name || null;
        if ("string" === typeof b) return b;
    }
    return null;
  }
  function Sa(a) {
    switch (typeof a) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return a;
      case "object":
        return a;
      default:
        return "";
    }
  }
  function Ta(a) {
    var b = a.type;
    return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
  }
  function Ua(a) {
    var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
    if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
      var e = c.get, f2 = c.set;
      Object.defineProperty(a, b, { configurable: true, get: function() {
        return e.call(this);
      }, set: function(a2) {
        d = "" + a2;
        f2.call(this, a2);
      } });
      Object.defineProperty(a, b, { enumerable: c.enumerable });
      return { getValue: function() {
        return d;
      }, setValue: function(a2) {
        d = "" + a2;
      }, stopTracking: function() {
        a._valueTracker = null;
        delete a[b];
      } };
    }
  }
  function Va(a) {
    a._valueTracker || (a._valueTracker = Ua(a));
  }
  function Wa(a) {
    if (!a) return false;
    var b = a._valueTracker;
    if (!b) return true;
    var c = b.getValue();
    var d = "";
    a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
    a = d;
    return a !== c ? (b.setValue(a), true) : false;
  }
  function Xa(a) {
    a = a || ("undefined" !== typeof document ? document : void 0);
    if ("undefined" === typeof a) return null;
    try {
      return a.activeElement || a.body;
    } catch (b) {
      return a.body;
    }
  }
  function Ya(a, b) {
    var c = b.checked;
    return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
  }
  function Za(a, b) {
    var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
    c = Sa(null != b.value ? b.value : c);
    a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
  }
  function ab(a, b) {
    b = b.checked;
    null != b && ta(a, "checked", b, false);
  }
  function bb(a, b) {
    ab(a, b);
    var c = Sa(b.value), d = b.type;
    if (null != c) if ("number" === d) {
      if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
    } else a.value !== "" + c && (a.value = "" + c);
    else if ("submit" === d || "reset" === d) {
      a.removeAttribute("value");
      return;
    }
    b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
    null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
  }
  function db(a, b, c) {
    if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
      var d = b.type;
      if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
      b = "" + a._wrapperState.initialValue;
      c || b === a.value || (a.value = b);
      a.defaultValue = b;
    }
    c = a.name;
    "" !== c && (a.name = "");
    a.defaultChecked = !!a._wrapperState.initialChecked;
    "" !== c && (a.name = c);
  }
  function cb(a, b, c) {
    if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
  }
  var eb = Array.isArray;
  function fb(a, b, c, d) {
    a = a.options;
    if (b) {
      b = {};
      for (var e = 0; e < c.length; e++) b["$" + c[e]] = true;
      for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
    } else {
      c = "" + Sa(c);
      b = null;
      for (e = 0; e < a.length; e++) {
        if (a[e].value === c) {
          a[e].selected = true;
          d && (a[e].defaultSelected = true);
          return;
        }
        null !== b || a[e].disabled || (b = a[e]);
      }
      null !== b && (b.selected = true);
    }
  }
  function gb(a, b) {
    if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
    return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
  }
  function hb(a, b) {
    var c = b.value;
    if (null == c) {
      c = b.children;
      b = b.defaultValue;
      if (null != c) {
        if (null != b) throw Error(p(92));
        if (eb(c)) {
          if (1 < c.length) throw Error(p(93));
          c = c[0];
        }
        b = c;
      }
      null == b && (b = "");
      c = b;
    }
    a._wrapperState = { initialValue: Sa(c) };
  }
  function ib(a, b) {
    var c = Sa(b.value), d = Sa(b.defaultValue);
    null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
    null != d && (a.defaultValue = "" + d);
  }
  function jb(a) {
    var b = a.textContent;
    b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
  }
  function kb(a) {
    switch (a) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function lb(a, b) {
    return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
  }
  var mb, nb = function(a) {
    return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
      MSApp.execUnsafeLocalFunction(function() {
        return a(b, c, d, e);
      });
    } : a;
  }(function(a, b) {
    if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
    else {
      mb = mb || document.createElement("div");
      mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
      for (b = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
      for (; b.firstChild; ) a.appendChild(b.firstChild);
    }
  });
  function ob(a, b) {
    if (b) {
      var c = a.firstChild;
      if (c && c === a.lastChild && 3 === c.nodeType) {
        c.nodeValue = b;
        return;
      }
    }
    a.textContent = b;
  }
  var pb = {
    animationIterationCount: true,
    aspectRatio: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    columns: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridArea: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowSpan: true,
    gridRowStart: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnSpan: true,
    gridColumnStart: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true
  }, qb = ["Webkit", "ms", "Moz", "O"];
  Object.keys(pb).forEach(function(a) {
    qb.forEach(function(b) {
      b = b + a.charAt(0).toUpperCase() + a.substring(1);
      pb[b] = pb[a];
    });
  });
  function rb(a, b, c) {
    return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
  }
  function sb(a, b) {
    a = a.style;
    for (var c in b) if (b.hasOwnProperty(c)) {
      var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
      "float" === c && (c = "cssFloat");
      d ? a.setProperty(c, e) : a[c] = e;
    }
  }
  var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
  function ub(a, b) {
    if (b) {
      if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
      if (null != b.dangerouslySetInnerHTML) {
        if (null != b.children) throw Error(p(60));
        if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
      }
      if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
    }
  }
  function vb(a, b) {
    if (-1 === a.indexOf("-")) return "string" === typeof b.is;
    switch (a) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;
      default:
        return true;
    }
  }
  var wb = null;
  function xb(a) {
    a = a.target || a.srcElement || window;
    a.correspondingUseElement && (a = a.correspondingUseElement);
    return 3 === a.nodeType ? a.parentNode : a;
  }
  var yb = null, zb = null, Ab = null;
  function Bb(a) {
    if (a = Cb(a)) {
      if ("function" !== typeof yb) throw Error(p(280));
      var b = a.stateNode;
      b && (b = Db(b), yb(a.stateNode, a.type, b));
    }
  }
  function Eb(a) {
    zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
  }
  function Fb() {
    if (zb) {
      var a = zb, b = Ab;
      Ab = zb = null;
      Bb(a);
      if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
    }
  }
  function Gb(a, b) {
    return a(b);
  }
  function Hb() {
  }
  var Ib = false;
  function Jb(a, b, c) {
    if (Ib) return a(b, c);
    Ib = true;
    try {
      return Gb(a, b, c);
    } finally {
      if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
    }
  }
  function Kb(a, b) {
    var c = a.stateNode;
    if (null === c) return null;
    var d = Db(c);
    if (null === d) return null;
    c = d[b];
    a: switch (b) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
        a = !d;
        break a;
      default:
        a = false;
    }
    if (a) return null;
    if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
    return c;
  }
  var Lb = false;
  if (ia) try {
    var Mb = {};
    Object.defineProperty(Mb, "passive", { get: function() {
      Lb = true;
    } });
    window.addEventListener("test", Mb, Mb);
    window.removeEventListener("test", Mb, Mb);
  } catch (a) {
    Lb = false;
  }
  function Nb(a, b, c, d, e, f2, g, h, k2) {
    var l2 = Array.prototype.slice.call(arguments, 3);
    try {
      b.apply(c, l2);
    } catch (m2) {
      this.onError(m2);
    }
  }
  var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a) {
    Ob = true;
    Pb = a;
  } };
  function Tb(a, b, c, d, e, f2, g, h, k2) {
    Ob = false;
    Pb = null;
    Nb.apply(Sb, arguments);
  }
  function Ub(a, b, c, d, e, f2, g, h, k2) {
    Tb.apply(this, arguments);
    if (Ob) {
      if (Ob) {
        var l2 = Pb;
        Ob = false;
        Pb = null;
      } else throw Error(p(198));
      Qb || (Qb = true, Rb = l2);
    }
  }
  function Vb(a) {
    var b = a, c = a;
    if (a.alternate) for (; b.return; ) b = b.return;
    else {
      a = b;
      do
        b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
      while (a);
    }
    return 3 === b.tag ? c : null;
  }
  function Wb(a) {
    if (13 === a.tag) {
      var b = a.memoizedState;
      null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
      if (null !== b) return b.dehydrated;
    }
    return null;
  }
  function Xb(a) {
    if (Vb(a) !== a) throw Error(p(188));
  }
  function Yb(a) {
    var b = a.alternate;
    if (!b) {
      b = Vb(a);
      if (null === b) throw Error(p(188));
      return b !== a ? null : a;
    }
    for (var c = a, d = b; ; ) {
      var e = c.return;
      if (null === e) break;
      var f2 = e.alternate;
      if (null === f2) {
        d = e.return;
        if (null !== d) {
          c = d;
          continue;
        }
        break;
      }
      if (e.child === f2.child) {
        for (f2 = e.child; f2; ) {
          if (f2 === c) return Xb(e), a;
          if (f2 === d) return Xb(e), b;
          f2 = f2.sibling;
        }
        throw Error(p(188));
      }
      if (c.return !== d.return) c = e, d = f2;
      else {
        for (var g = false, h = e.child; h; ) {
          if (h === c) {
            g = true;
            c = e;
            d = f2;
            break;
          }
          if (h === d) {
            g = true;
            d = e;
            c = f2;
            break;
          }
          h = h.sibling;
        }
        if (!g) {
          for (h = f2.child; h; ) {
            if (h === c) {
              g = true;
              c = f2;
              d = e;
              break;
            }
            if (h === d) {
              g = true;
              d = f2;
              c = e;
              break;
            }
            h = h.sibling;
          }
          if (!g) throw Error(p(189));
        }
      }
      if (c.alternate !== d) throw Error(p(190));
    }
    if (3 !== c.tag) throw Error(p(188));
    return c.stateNode.current === c ? a : b;
  }
  function Zb(a) {
    a = Yb(a);
    return null !== a ? $b(a) : null;
  }
  function $b(a) {
    if (5 === a.tag || 6 === a.tag) return a;
    for (a = a.child; null !== a; ) {
      var b = $b(a);
      if (null !== b) return b;
      a = a.sibling;
    }
    return null;
  }
  var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B$1 = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
  function mc(a) {
    if (lc && "function" === typeof lc.onCommitFiberRoot) try {
      lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
    } catch (b) {
    }
  }
  var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
  function nc(a) {
    a >>>= 0;
    return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
  }
  var rc = 64, sc = 4194304;
  function tc(a) {
    switch (a & -a) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return a & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return a & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return a;
    }
  }
  function uc(a, b) {
    var c = a.pendingLanes;
    if (0 === c) return 0;
    var d = 0, e = a.suspendedLanes, f2 = a.pingedLanes, g = c & 268435455;
    if (0 !== g) {
      var h = g & ~e;
      0 !== h ? d = tc(h) : (f2 &= g, 0 !== f2 && (d = tc(f2)));
    } else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f2 && (d = tc(f2));
    if (0 === d) return 0;
    if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f2 = b & -b, e >= f2 || 16 === e && 0 !== (f2 & 4194240))) return b;
    0 !== (d & 4) && (d |= c & 16);
    b = a.entangledLanes;
    if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
    return d;
  }
  function vc(a, b) {
    switch (a) {
      case 1:
      case 2:
      case 4:
        return b + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return b + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function wc(a, b) {
    for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f2 = a.pendingLanes; 0 < f2; ) {
      var g = 31 - oc(f2), h = 1 << g, k2 = e[g];
      if (-1 === k2) {
        if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
      } else k2 <= b && (a.expiredLanes |= h);
      f2 &= ~h;
    }
  }
  function xc(a) {
    a = a.pendingLanes & -1073741825;
    return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
  }
  function yc() {
    var a = rc;
    rc <<= 1;
    0 === (rc & 4194240) && (rc = 64);
    return a;
  }
  function zc(a) {
    for (var b = [], c = 0; 31 > c; c++) b.push(a);
    return b;
  }
  function Ac(a, b, c) {
    a.pendingLanes |= b;
    536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
    a = a.eventTimes;
    b = 31 - oc(b);
    a[b] = c;
  }
  function Bc(a, b) {
    var c = a.pendingLanes & ~b;
    a.pendingLanes = b;
    a.suspendedLanes = 0;
    a.pingedLanes = 0;
    a.expiredLanes &= b;
    a.mutableReadLanes &= b;
    a.entangledLanes &= b;
    b = a.entanglements;
    var d = a.eventTimes;
    for (a = a.expirationTimes; 0 < c; ) {
      var e = 31 - oc(c), f2 = 1 << e;
      b[e] = 0;
      d[e] = -1;
      a[e] = -1;
      c &= ~f2;
    }
  }
  function Cc(a, b) {
    var c = a.entangledLanes |= b;
    for (a = a.entanglements; c; ) {
      var d = 31 - oc(c), e = 1 << d;
      e & b | a[d] & b && (a[d] |= b);
      c &= ~e;
    }
  }
  var C = 0;
  function Dc(a) {
    a &= -a;
    return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
  }
  var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Sc(a, b) {
    switch (a) {
      case "focusin":
      case "focusout":
        Lc = null;
        break;
      case "dragenter":
      case "dragleave":
        Mc = null;
        break;
      case "mouseover":
      case "mouseout":
        Nc = null;
        break;
      case "pointerover":
      case "pointerout":
        Oc.delete(b.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Pc.delete(b.pointerId);
    }
  }
  function Tc(a, b, c, d, e, f2) {
    if (null === a || a.nativeEvent !== f2) return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f2, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
    a.eventSystemFlags |= d;
    b = a.targetContainers;
    null !== e && -1 === b.indexOf(e) && b.push(e);
    return a;
  }
  function Uc(a, b, c, d, e) {
    switch (b) {
      case "focusin":
        return Lc = Tc(Lc, a, b, c, d, e), true;
      case "dragenter":
        return Mc = Tc(Mc, a, b, c, d, e), true;
      case "mouseover":
        return Nc = Tc(Nc, a, b, c, d, e), true;
      case "pointerover":
        var f2 = e.pointerId;
        Oc.set(f2, Tc(Oc.get(f2) || null, a, b, c, d, e));
        return true;
      case "gotpointercapture":
        return f2 = e.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a, b, c, d, e)), true;
    }
    return false;
  }
  function Vc(a) {
    var b = Wc(a.target);
    if (null !== b) {
      var c = Vb(b);
      if (null !== c) {
        if (b = c.tag, 13 === b) {
          if (b = Wb(c), null !== b) {
            a.blockedOn = b;
            Ic(a.priority, function() {
              Gc(c);
            });
            return;
          }
        } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
          a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
          return;
        }
      }
    }
    a.blockedOn = null;
  }
  function Xc(a) {
    if (null !== a.blockedOn) return false;
    for (var b = a.targetContainers; 0 < b.length; ) {
      var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
      if (null === c) {
        c = a.nativeEvent;
        var d = new c.constructor(c.type, c);
        wb = d;
        c.target.dispatchEvent(d);
        wb = null;
      } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
      b.shift();
    }
    return true;
  }
  function Zc(a, b, c) {
    Xc(a) && c.delete(b);
  }
  function $c() {
    Jc = false;
    null !== Lc && Xc(Lc) && (Lc = null);
    null !== Mc && Xc(Mc) && (Mc = null);
    null !== Nc && Xc(Nc) && (Nc = null);
    Oc.forEach(Zc);
    Pc.forEach(Zc);
  }
  function ad(a, b) {
    a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
  }
  function bd(a) {
    function b(b2) {
      return ad(b2, a);
    }
    if (0 < Kc.length) {
      ad(Kc[0], a);
      for (var c = 1; c < Kc.length; c++) {
        var d = Kc[c];
        d.blockedOn === a && (d.blockedOn = null);
      }
    }
    null !== Lc && ad(Lc, a);
    null !== Mc && ad(Mc, a);
    null !== Nc && ad(Nc, a);
    Oc.forEach(b);
    Pc.forEach(b);
    for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
    for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
  }
  var cd = ua.ReactCurrentBatchConfig, dd = true;
  function ed(a, b, c, d) {
    var e = C, f2 = cd.transition;
    cd.transition = null;
    try {
      C = 1, fd(a, b, c, d);
    } finally {
      C = e, cd.transition = f2;
    }
  }
  function gd(a, b, c, d) {
    var e = C, f2 = cd.transition;
    cd.transition = null;
    try {
      C = 4, fd(a, b, c, d);
    } finally {
      C = e, cd.transition = f2;
    }
  }
  function fd(a, b, c, d) {
    if (dd) {
      var e = Yc(a, b, c, d);
      if (null === e) hd(a, b, d, id, c), Sc(a, d);
      else if (Uc(e, a, b, c, d)) d.stopPropagation();
      else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
        for (; null !== e; ) {
          var f2 = Cb(e);
          null !== f2 && Ec(f2);
          f2 = Yc(a, b, c, d);
          null === f2 && hd(a, b, d, id, c);
          if (f2 === e) break;
          e = f2;
        }
        null !== e && d.stopPropagation();
      } else hd(a, b, d, null, c);
    }
  }
  var id = null;
  function Yc(a, b, c, d) {
    id = null;
    a = xb(d);
    a = Wc(a);
    if (null !== a) if (b = Vb(a), null === b) a = null;
    else if (c = b.tag, 13 === c) {
      a = Wb(b);
      if (null !== a) return a;
      a = null;
    } else if (3 === c) {
      if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
      a = null;
    } else b !== a && (a = null);
    id = a;
    return null;
  }
  function jd(a) {
    switch (a) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (ec()) {
          case fc:
            return 1;
          case gc:
            return 4;
          case hc:
          case ic:
            return 16;
          case jc:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var kd = null, ld = null, md = null;
  function nd() {
    if (md) return md;
    var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f2 = e.length;
    for (a = 0; a < c && b[a] === e[a]; a++) ;
    var g = c - a;
    for (d = 1; d <= g && b[c - d] === e[f2 - d]; d++) ;
    return md = e.slice(a, 1 < d ? 1 - d : void 0);
  }
  function od(a) {
    var b = a.keyCode;
    "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
    10 === a && (a = 13);
    return 32 <= a || 13 === a ? a : 0;
  }
  function pd() {
    return true;
  }
  function qd() {
    return false;
  }
  function rd(a) {
    function b(b2, d, e, f2, g) {
      this._reactName = b2;
      this._targetInst = e;
      this.type = d;
      this.nativeEvent = f2;
      this.target = g;
      this.currentTarget = null;
      for (var c in a) a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f2) : f2[c]);
      this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
      this.isPropagationStopped = qd;
      return this;
    }
    A(b.prototype, { preventDefault: function() {
      this.defaultPrevented = true;
      var a2 = this.nativeEvent;
      a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
    }, stopPropagation: function() {
      var a2 = this.nativeEvent;
      a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
    }, persist: function() {
    }, isPersistent: pd });
    return b;
  }
  var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
    return a.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
    return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
  }, movementX: function(a) {
    if ("movementX" in a) return a.movementX;
    a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
    return wd;
  }, movementY: function(a) {
    return "movementY" in a ? a.movementY : xd;
  } }), Bd = rd(Ad), Cd = A({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A({}, sd, { clipboardData: function(a) {
    return "clipboardData" in a ? a.clipboardData : window.clipboardData;
  } }), Jd = rd(Id), Kd = A({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Nd = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Pd(a) {
    var b = this.nativeEvent;
    return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
  }
  function zd() {
    return Pd;
  }
  var Qd = A({}, ud, { key: function(a) {
    if (a.key) {
      var b = Md[a.key] || a.key;
      if ("Unidentified" !== b) return b;
    }
    return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
    return "keypress" === a.type ? od(a) : 0;
  }, keyCode: function(a) {
    return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  }, which: function(a) {
    return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  } }), Rd = rd(Qd), Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A({}, Ad, {
    deltaX: function(a) {
      return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
    },
    deltaY: function(a) {
      return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
  ia && "documentMode" in document && (be = document.documentMode);
  var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
  function ge(a, b) {
    switch (a) {
      case "keyup":
        return -1 !== $d.indexOf(b.keyCode);
      case "keydown":
        return 229 !== b.keyCode;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function he(a) {
    a = a.detail;
    return "object" === typeof a && "data" in a ? a.data : null;
  }
  var ie = false;
  function je(a, b) {
    switch (a) {
      case "compositionend":
        return he(b);
      case "keypress":
        if (32 !== b.which) return null;
        fe = true;
        return ee;
      case "textInput":
        return a = b.data, a === ee && fe ? null : a;
      default:
        return null;
    }
  }
  function ke(a, b) {
    if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
    switch (a) {
      case "paste":
        return null;
      case "keypress":
        if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
          if (b.char && 1 < b.char.length) return b.char;
          if (b.which) return String.fromCharCode(b.which);
        }
        return null;
      case "compositionend":
        return de && "ko" !== b.locale ? null : b.data;
      default:
        return null;
    }
  }
  var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
  function me(a) {
    var b = a && a.nodeName && a.nodeName.toLowerCase();
    return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
  }
  function ne(a, b, c, d) {
    Eb(d);
    b = oe(b, "onChange");
    0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
  }
  var pe = null, qe = null;
  function re(a) {
    se(a, 0);
  }
  function te(a) {
    var b = ue(a);
    if (Wa(b)) return a;
  }
  function ve(a, b) {
    if ("change" === a) return b;
  }
  var we = false;
  if (ia) {
    var xe;
    if (ia) {
      var ye = "oninput" in document;
      if (!ye) {
        var ze = document.createElement("div");
        ze.setAttribute("oninput", "return;");
        ye = "function" === typeof ze.oninput;
      }
      xe = ye;
    } else xe = false;
    we = xe && (!document.documentMode || 9 < document.documentMode);
  }
  function Ae() {
    pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
  }
  function Be(a) {
    if ("value" === a.propertyName && te(qe)) {
      var b = [];
      ne(b, qe, a, xb(a));
      Jb(re, b);
    }
  }
  function Ce(a, b, c) {
    "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
  }
  function De(a) {
    if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
  }
  function Ee(a, b) {
    if ("click" === a) return te(b);
  }
  function Fe(a, b) {
    if ("input" === a || "change" === a) return te(b);
  }
  function Ge(a, b) {
    return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
  }
  var He = "function" === typeof Object.is ? Object.is : Ge;
  function Ie(a, b) {
    if (He(a, b)) return true;
    if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
    var c = Object.keys(a), d = Object.keys(b);
    if (c.length !== d.length) return false;
    for (d = 0; d < c.length; d++) {
      var e = c[d];
      if (!ja.call(b, e) || !He(a[e], b[e])) return false;
    }
    return true;
  }
  function Je(a) {
    for (; a && a.firstChild; ) a = a.firstChild;
    return a;
  }
  function Ke(a, b) {
    var c = Je(a);
    a = 0;
    for (var d; c; ) {
      if (3 === c.nodeType) {
        d = a + c.textContent.length;
        if (a <= b && d >= b) return { node: c, offset: b - a };
        a = d;
      }
      a: {
        for (; c; ) {
          if (c.nextSibling) {
            c = c.nextSibling;
            break a;
          }
          c = c.parentNode;
        }
        c = void 0;
      }
      c = Je(c);
    }
  }
  function Le(a, b) {
    return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
  }
  function Me() {
    for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
      try {
        var c = "string" === typeof b.contentWindow.location.href;
      } catch (d) {
        c = false;
      }
      if (c) a = b.contentWindow;
      else break;
      b = Xa(a.document);
    }
    return b;
  }
  function Ne(a) {
    var b = a && a.nodeName && a.nodeName.toLowerCase();
    return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
  }
  function Oe(a) {
    var b = Me(), c = a.focusedElem, d = a.selectionRange;
    if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
      if (null !== d && Ne(c)) {
        if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
        else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
          a = a.getSelection();
          var e = c.textContent.length, f2 = Math.min(d.start, e);
          d = void 0 === d.end ? f2 : Math.min(d.end, e);
          !a.extend && f2 > d && (e = d, d = f2, f2 = e);
          e = Ke(c, f2);
          var g = Ke(
            c,
            d
          );
          e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f2 > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
        }
      }
      b = [];
      for (a = c; a = a.parentNode; ) 1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
      "function" === typeof c.focus && c.focus();
      for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
    }
  }
  var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
  function Ue(a, b, c) {
    var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
    Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
  }
  function Ve(a, b) {
    var c = {};
    c[a.toLowerCase()] = b.toLowerCase();
    c["Webkit" + a] = "webkit" + b;
    c["Moz" + a] = "moz" + b;
    return c;
  }
  var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
  ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
  function Ze(a) {
    if (Xe[a]) return Xe[a];
    if (!We[a]) return a;
    var b = We[a], c;
    for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
    return a;
  }
  var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function ff(a, b) {
    df.set(a, b);
    fa(b, [a]);
  }
  for (var gf = 0; gf < ef.length; gf++) {
    var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
    ff(jf, "on" + kf);
  }
  ff($e, "onAnimationEnd");
  ff(af, "onAnimationIteration");
  ff(bf, "onAnimationStart");
  ff("dblclick", "onDoubleClick");
  ff("focusin", "onFocus");
  ff("focusout", "onBlur");
  ff(cf, "onTransitionEnd");
  ha("onMouseEnter", ["mouseout", "mouseover"]);
  ha("onMouseLeave", ["mouseout", "mouseover"]);
  ha("onPointerEnter", ["pointerout", "pointerover"]);
  ha("onPointerLeave", ["pointerout", "pointerover"]);
  fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
  fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
  fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
  fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
  fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
  fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
  function nf(a, b, c) {
    var d = a.type || "unknown-event";
    a.currentTarget = c;
    Ub(d, b, void 0, a);
    a.currentTarget = null;
  }
  function se(a, b) {
    b = 0 !== (b & 4);
    for (var c = 0; c < a.length; c++) {
      var d = a[c], e = d.event;
      d = d.listeners;
      a: {
        var f2 = void 0;
        if (b) for (var g = d.length - 1; 0 <= g; g--) {
          var h = d[g], k2 = h.instance, l2 = h.currentTarget;
          h = h.listener;
          if (k2 !== f2 && e.isPropagationStopped()) break a;
          nf(e, h, l2);
          f2 = k2;
        }
        else for (g = 0; g < d.length; g++) {
          h = d[g];
          k2 = h.instance;
          l2 = h.currentTarget;
          h = h.listener;
          if (k2 !== f2 && e.isPropagationStopped()) break a;
          nf(e, h, l2);
          f2 = k2;
        }
      }
    }
    if (Qb) throw a = Rb, Qb = false, Rb = null, a;
  }
  function D(a, b) {
    var c = b[of];
    void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
    var d = a + "__bubble";
    c.has(d) || (pf(b, a, 2, false), c.add(d));
  }
  function qf(a, b, c) {
    var d = 0;
    b && (d |= 4);
    pf(c, a, d, b);
  }
  var rf = "_reactListening" + Math.random().toString(36).slice(2);
  function sf(a) {
    if (!a[rf]) {
      a[rf] = true;
      da.forEach(function(b2) {
        "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
      });
      var b = 9 === a.nodeType ? a : a.ownerDocument;
      null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
    }
  }
  function pf(a, b, c, d) {
    switch (jd(b)) {
      case 1:
        var e = ed;
        break;
      case 4:
        e = gd;
        break;
      default:
        e = fd;
    }
    c = e.bind(null, b, c, a);
    e = void 0;
    !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
    d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
  }
  function hd(a, b, c, d, e) {
    var f2 = d;
    if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
      if (null === d) return;
      var g = d.tag;
      if (3 === g || 4 === g) {
        var h = d.stateNode.containerInfo;
        if (h === e || 8 === h.nodeType && h.parentNode === e) break;
        if (4 === g) for (g = d.return; null !== g; ) {
          var k2 = g.tag;
          if (3 === k2 || 4 === k2) {
            if (k2 = g.stateNode.containerInfo, k2 === e || 8 === k2.nodeType && k2.parentNode === e) return;
          }
          g = g.return;
        }
        for (; null !== h; ) {
          g = Wc(h);
          if (null === g) return;
          k2 = g.tag;
          if (5 === k2 || 6 === k2) {
            d = f2 = g;
            continue a;
          }
          h = h.parentNode;
        }
      }
      d = d.return;
    }
    Jb(function() {
      var d2 = f2, e2 = xb(c), g2 = [];
      a: {
        var h2 = df.get(a);
        if (void 0 !== h2) {
          var k3 = td, n2 = a;
          switch (a) {
            case "keypress":
              if (0 === od(c)) break a;
            case "keydown":
            case "keyup":
              k3 = Rd;
              break;
            case "focusin":
              n2 = "focus";
              k3 = Fd;
              break;
            case "focusout":
              n2 = "blur";
              k3 = Fd;
              break;
            case "beforeblur":
            case "afterblur":
              k3 = Fd;
              break;
            case "click":
              if (2 === c.button) break a;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              k3 = Bd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              k3 = Dd;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              k3 = Vd;
              break;
            case $e:
            case af:
            case bf:
              k3 = Hd;
              break;
            case cf:
              k3 = Xd;
              break;
            case "scroll":
              k3 = vd;
              break;
            case "wheel":
              k3 = Zd;
              break;
            case "copy":
            case "cut":
            case "paste":
              k3 = Jd;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              k3 = Td;
          }
          var t2 = 0 !== (b & 4), J2 = !t2 && "scroll" === a, x2 = t2 ? null !== h2 ? h2 + "Capture" : null : h2;
          t2 = [];
          for (var w2 = d2, u2; null !== w2; ) {
            u2 = w2;
            var F2 = u2.stateNode;
            5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
            if (J2) break;
            w2 = w2.return;
          }
          0 < t2.length && (h2 = new k3(h2, n2, null, c, e2), g2.push({ event: h2, listeners: t2 }));
        }
      }
      if (0 === (b & 7)) {
        a: {
          h2 = "mouseover" === a || "pointerover" === a;
          k3 = "mouseout" === a || "pointerout" === a;
          if (h2 && c !== wb && (n2 = c.relatedTarget || c.fromElement) && (Wc(n2) || n2[uf])) break a;
          if (k3 || h2) {
            h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
            if (k3) {
              if (n2 = c.relatedTarget || c.toElement, k3 = d2, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag)) n2 = null;
            } else k3 = null, n2 = d2;
            if (k3 !== n2) {
              t2 = Bd;
              F2 = "onMouseLeave";
              x2 = "onMouseEnter";
              w2 = "mouse";
              if ("pointerout" === a || "pointerover" === a) t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
              J2 = null == k3 ? h2 : ue(k3);
              u2 = null == n2 ? h2 : ue(n2);
              h2 = new t2(F2, w2 + "leave", k3, c, e2);
              h2.target = J2;
              h2.relatedTarget = u2;
              F2 = null;
              Wc(e2) === d2 && (t2 = new t2(x2, w2 + "enter", n2, c, e2), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
              J2 = F2;
              if (k3 && n2) b: {
                t2 = k3;
                x2 = n2;
                w2 = 0;
                for (u2 = t2; u2; u2 = vf(u2)) w2++;
                u2 = 0;
                for (F2 = x2; F2; F2 = vf(F2)) u2++;
                for (; 0 < w2 - u2; ) t2 = vf(t2), w2--;
                for (; 0 < u2 - w2; ) x2 = vf(x2), u2--;
                for (; w2--; ) {
                  if (t2 === x2 || null !== x2 && t2 === x2.alternate) break b;
                  t2 = vf(t2);
                  x2 = vf(x2);
                }
                t2 = null;
              }
              else t2 = null;
              null !== k3 && wf(g2, h2, k3, t2, false);
              null !== n2 && null !== J2 && wf(g2, J2, n2, t2, true);
            }
          }
        }
        a: {
          h2 = d2 ? ue(d2) : window;
          k3 = h2.nodeName && h2.nodeName.toLowerCase();
          if ("select" === k3 || "input" === k3 && "file" === h2.type) var na = ve;
          else if (me(h2)) if (we) na = Fe;
          else {
            na = De;
            var xa = Ce;
          }
          else (k3 = h2.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
          if (na && (na = na(a, d2))) {
            ne(g2, na, c, e2);
            break a;
          }
          xa && xa(a, h2, d2);
          "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
        }
        xa = d2 ? ue(d2) : window;
        switch (a) {
          case "focusin":
            if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d2, Se = null;
            break;
          case "focusout":
            Se = Re = Qe = null;
            break;
          case "mousedown":
            Te = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Te = false;
            Ue(g2, c, e2);
            break;
          case "selectionchange":
            if (Pe) break;
          case "keydown":
          case "keyup":
            Ue(g2, c, e2);
        }
        var $a;
        if (ae) b: {
          switch (a) {
            case "compositionstart":
              var ba = "onCompositionStart";
              break b;
            case "compositionend":
              ba = "onCompositionEnd";
              break b;
            case "compositionupdate":
              ba = "onCompositionUpdate";
              break b;
          }
          ba = void 0;
        }
        else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
        ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
        if ($a = ce ? je(a, c) : ke(a, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
      }
      se(g2, b);
    });
  }
  function tf(a, b, c) {
    return { instance: a, listener: b, currentTarget: c };
  }
  function oe(a, b) {
    for (var c = b + "Capture", d = []; null !== a; ) {
      var e = a, f2 = e.stateNode;
      5 === e.tag && null !== f2 && (e = f2, f2 = Kb(a, c), null != f2 && d.unshift(tf(a, f2, e)), f2 = Kb(a, b), null != f2 && d.push(tf(a, f2, e)));
      a = a.return;
    }
    return d;
  }
  function vf(a) {
    if (null === a) return null;
    do
      a = a.return;
    while (a && 5 !== a.tag);
    return a ? a : null;
  }
  function wf(a, b, c, d, e) {
    for (var f2 = b._reactName, g = []; null !== c && c !== d; ) {
      var h = c, k2 = h.alternate, l2 = h.stateNode;
      if (null !== k2 && k2 === d) break;
      5 === h.tag && null !== l2 && (h = l2, e ? (k2 = Kb(c, f2), null != k2 && g.unshift(tf(c, k2, h))) : e || (k2 = Kb(c, f2), null != k2 && g.push(tf(c, k2, h))));
      c = c.return;
    }
    0 !== g.length && a.push({ event: b, listeners: g });
  }
  var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
  function zf(a) {
    return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
  }
  function Af(a, b, c) {
    b = zf(b);
    if (zf(a) !== b && c) throw Error(p(425));
  }
  function Bf() {
  }
  var Cf = null, Df = null;
  function Ef(a, b) {
    return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
  }
  var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
    return Hf.resolve(null).then(a).catch(If);
  } : Ff;
  function If(a) {
    setTimeout(function() {
      throw a;
    });
  }
  function Kf(a, b) {
    var c = b, d = 0;
    do {
      var e = c.nextSibling;
      a.removeChild(c);
      if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
        if (0 === d) {
          a.removeChild(e);
          bd(b);
          return;
        }
        d--;
      } else "$" !== c && "$?" !== c && "$!" !== c || d++;
      c = e;
    } while (c);
    bd(b);
  }
  function Lf(a) {
    for (; null != a; a = a.nextSibling) {
      var b = a.nodeType;
      if (1 === b || 3 === b) break;
      if (8 === b) {
        b = a.data;
        if ("$" === b || "$!" === b || "$?" === b) break;
        if ("/$" === b) return null;
      }
    }
    return a;
  }
  function Mf(a) {
    a = a.previousSibling;
    for (var b = 0; a; ) {
      if (8 === a.nodeType) {
        var c = a.data;
        if ("$" === c || "$!" === c || "$?" === c) {
          if (0 === b) return a;
          b--;
        } else "/$" === c && b++;
      }
      a = a.previousSibling;
    }
    return null;
  }
  var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
  function Wc(a) {
    var b = a[Of];
    if (b) return b;
    for (var c = a.parentNode; c; ) {
      if (b = c[uf] || c[Of]) {
        c = b.alternate;
        if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a; ) {
          if (c = a[Of]) return c;
          a = Mf(a);
        }
        return b;
      }
      a = c;
      c = a.parentNode;
    }
    return null;
  }
  function Cb(a) {
    a = a[Of] || a[uf];
    return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
  }
  function ue(a) {
    if (5 === a.tag || 6 === a.tag) return a.stateNode;
    throw Error(p(33));
  }
  function Db(a) {
    return a[Pf] || null;
  }
  var Sf = [], Tf = -1;
  function Uf(a) {
    return { current: a };
  }
  function E(a) {
    0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
  }
  function G(a, b) {
    Tf++;
    Sf[Tf] = a.current;
    a.current = b;
  }
  var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
  function Yf(a, b) {
    var c = a.type.contextTypes;
    if (!c) return Vf;
    var d = a.stateNode;
    if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
    var e = {}, f2;
    for (f2 in c) e[f2] = b[f2];
    d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
    return e;
  }
  function Zf(a) {
    a = a.childContextTypes;
    return null !== a && void 0 !== a;
  }
  function $f() {
    E(Wf);
    E(H);
  }
  function ag(a, b, c) {
    if (H.current !== Vf) throw Error(p(168));
    G(H, b);
    G(Wf, c);
  }
  function bg(a, b, c) {
    var d = a.stateNode;
    b = b.childContextTypes;
    if ("function" !== typeof d.getChildContext) return c;
    d = d.getChildContext();
    for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
    return A({}, c, d);
  }
  function cg(a) {
    a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
    Xf = H.current;
    G(H, a);
    G(Wf, Wf.current);
    return true;
  }
  function dg(a, b, c) {
    var d = a.stateNode;
    if (!d) throw Error(p(169));
    c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
    G(Wf, c);
  }
  var eg = null, fg = false, gg = false;
  function hg(a) {
    null === eg ? eg = [a] : eg.push(a);
  }
  function ig(a) {
    fg = true;
    hg(a);
  }
  function jg() {
    if (!gg && null !== eg) {
      gg = true;
      var a = 0, b = C;
      try {
        var c = eg;
        for (C = 1; a < c.length; a++) {
          var d = c[a];
          do
            d = d(true);
          while (null !== d);
        }
        eg = null;
        fg = false;
      } catch (e) {
        throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
      } finally {
        C = b, gg = false;
      }
    }
    return null;
  }
  var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
  function tg(a, b) {
    kg[lg++] = ng;
    kg[lg++] = mg;
    mg = a;
    ng = b;
  }
  function ug(a, b, c) {
    og[pg++] = rg;
    og[pg++] = sg;
    og[pg++] = qg;
    qg = a;
    var d = rg;
    a = sg;
    var e = 32 - oc(d) - 1;
    d &= ~(1 << e);
    c += 1;
    var f2 = 32 - oc(b) + e;
    if (30 < f2) {
      var g = e - e % 5;
      f2 = (d & (1 << g) - 1).toString(32);
      d >>= g;
      e -= g;
      rg = 1 << 32 - oc(b) + e | c << e | d;
      sg = f2 + a;
    } else rg = 1 << f2 | c << e | d, sg = a;
  }
  function vg(a) {
    null !== a.return && (tg(a, 1), ug(a, 1, 0));
  }
  function wg(a) {
    for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
    for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
  }
  var xg = null, yg = null, I = false, zg = null;
  function Ag(a, b) {
    var c = Bg(5, null, null, 0);
    c.elementType = "DELETED";
    c.stateNode = b;
    c.return = a;
    b = a.deletions;
    null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
  }
  function Cg(a, b) {
    switch (a.tag) {
      case 5:
        var c = a.type;
        b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
        return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
      case 6:
        return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
      case 13:
        return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
      default:
        return false;
    }
  }
  function Dg(a) {
    return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
  }
  function Eg(a) {
    if (I) {
      var b = yg;
      if (b) {
        var c = b;
        if (!Cg(a, b)) {
          if (Dg(a)) throw Error(p(418));
          b = Lf(c.nextSibling);
          var d = xg;
          b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
        }
      } else {
        if (Dg(a)) throw Error(p(418));
        a.flags = a.flags & -4097 | 2;
        I = false;
        xg = a;
      }
    }
  }
  function Fg(a) {
    for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
    xg = a;
  }
  function Gg(a) {
    if (a !== xg) return false;
    if (!I) return Fg(a), I = true, false;
    var b;
    (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
    if (b && (b = yg)) {
      if (Dg(a)) throw Hg(), Error(p(418));
      for (; b; ) Ag(a, b), b = Lf(b.nextSibling);
    }
    Fg(a);
    if (13 === a.tag) {
      a = a.memoizedState;
      a = null !== a ? a.dehydrated : null;
      if (!a) throw Error(p(317));
      a: {
        a = a.nextSibling;
        for (b = 0; a; ) {
          if (8 === a.nodeType) {
            var c = a.data;
            if ("/$" === c) {
              if (0 === b) {
                yg = Lf(a.nextSibling);
                break a;
              }
              b--;
            } else "$" !== c && "$!" !== c && "$?" !== c || b++;
          }
          a = a.nextSibling;
        }
        yg = null;
      }
    } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
    return true;
  }
  function Hg() {
    for (var a = yg; a; ) a = Lf(a.nextSibling);
  }
  function Ig() {
    yg = xg = null;
    I = false;
  }
  function Jg(a) {
    null === zg ? zg = [a] : zg.push(a);
  }
  var Kg = ua.ReactCurrentBatchConfig;
  function Lg(a, b, c) {
    a = c.ref;
    if (null !== a && "function" !== typeof a && "object" !== typeof a) {
      if (c._owner) {
        c = c._owner;
        if (c) {
          if (1 !== c.tag) throw Error(p(309));
          var d = c.stateNode;
        }
        if (!d) throw Error(p(147, a));
        var e = d, f2 = "" + a;
        if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f2) return b.ref;
        b = function(a2) {
          var b2 = e.refs;
          null === a2 ? delete b2[f2] : b2[f2] = a2;
        };
        b._stringRef = f2;
        return b;
      }
      if ("string" !== typeof a) throw Error(p(284));
      if (!c._owner) throw Error(p(290, a));
    }
    return a;
  }
  function Mg(a, b) {
    a = Object.prototype.toString.call(b);
    throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
  }
  function Ng(a) {
    var b = a._init;
    return b(a._payload);
  }
  function Og(a) {
    function b(b2, c2) {
      if (a) {
        var d2 = b2.deletions;
        null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
      }
    }
    function c(c2, d2) {
      if (!a) return null;
      for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
      return null;
    }
    function d(a2, b2) {
      for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
      return a2;
    }
    function e(a2, b2) {
      a2 = Pg(a2, b2);
      a2.index = 0;
      a2.sibling = null;
      return a2;
    }
    function f2(b2, c2, d2) {
      b2.index = d2;
      if (!a) return b2.flags |= 1048576, c2;
      d2 = b2.alternate;
      if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
      b2.flags |= 2;
      return c2;
    }
    function g(b2) {
      a && null === b2.alternate && (b2.flags |= 2);
      return b2;
    }
    function h(a2, b2, c2, d2) {
      if (null === b2 || 6 !== b2.tag) return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
      b2 = e(b2, c2);
      b2.return = a2;
      return b2;
    }
    function k2(a2, b2, c2, d2) {
      var f3 = c2.type;
      if (f3 === ya) return m2(a2, b2, c2.props.children, d2, c2.key);
      if (null !== b2 && (b2.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && Ng(f3) === b2.type)) return d2 = e(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
      d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
      d2.ref = Lg(a2, b2, c2);
      d2.return = a2;
      return d2;
    }
    function l2(a2, b2, c2, d2) {
      if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
      b2 = e(b2, c2.children || []);
      b2.return = a2;
      return b2;
    }
    function m2(a2, b2, c2, d2, f3) {
      if (null === b2 || 7 !== b2.tag) return b2 = Tg(c2, a2.mode, d2, f3), b2.return = a2, b2;
      b2 = e(b2, c2);
      b2.return = a2;
      return b2;
    }
    function q2(a2, b2, c2) {
      if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
      if ("object" === typeof b2 && null !== b2) {
        switch (b2.$$typeof) {
          case va:
            return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
          case wa:
            return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
          case Ha:
            var d2 = b2._init;
            return q2(a2, d2(b2._payload), c2);
        }
        if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
        Mg(a2, b2);
      }
      return null;
    }
    function r2(a2, b2, c2, d2) {
      var e2 = null !== b2 ? b2.key : null;
      if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e2 ? null : h(a2, b2, "" + c2, d2);
      if ("object" === typeof c2 && null !== c2) {
        switch (c2.$$typeof) {
          case va:
            return c2.key === e2 ? k2(a2, b2, c2, d2) : null;
          case wa:
            return c2.key === e2 ? l2(a2, b2, c2, d2) : null;
          case Ha:
            return e2 = c2._init, r2(
              a2,
              b2,
              e2(c2._payload),
              d2
            );
        }
        if (eb(c2) || Ka(c2)) return null !== e2 ? null : m2(a2, b2, c2, d2, null);
        Mg(a2, c2);
      }
      return null;
    }
    function y2(a2, b2, c2, d2, e2) {
      if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
      if ("object" === typeof d2 && null !== d2) {
        switch (d2.$$typeof) {
          case va:
            return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k2(b2, a2, d2, e2);
          case wa:
            return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l2(b2, a2, d2, e2);
          case Ha:
            var f3 = d2._init;
            return y2(a2, b2, c2, f3(d2._payload), e2);
        }
        if (eb(d2) || Ka(d2)) return a2 = a2.get(c2) || null, m2(b2, a2, d2, e2, null);
        Mg(b2, d2);
      }
      return null;
    }
    function n2(e2, g2, h2, k3) {
      for (var l3 = null, m3 = null, u2 = g2, w2 = g2 = 0, x2 = null; null !== u2 && w2 < h2.length; w2++) {
        u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
        var n3 = r2(e2, u2, h2[w2], k3);
        if (null === n3) {
          null === u2 && (u2 = x2);
          break;
        }
        a && u2 && null === n3.alternate && b(e2, u2);
        g2 = f2(n3, g2, w2);
        null === m3 ? l3 = n3 : m3.sibling = n3;
        m3 = n3;
        u2 = x2;
      }
      if (w2 === h2.length) return c(e2, u2), I && tg(e2, w2), l3;
      if (null === u2) {
        for (; w2 < h2.length; w2++) u2 = q2(e2, h2[w2], k3), null !== u2 && (g2 = f2(u2, g2, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
        I && tg(e2, w2);
        return l3;
      }
      for (u2 = d(e2, u2); w2 < h2.length; w2++) x2 = y2(u2, e2, w2, h2[w2], k3), null !== x2 && (a && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g2 = f2(x2, g2, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
      a && u2.forEach(function(a2) {
        return b(e2, a2);
      });
      I && tg(e2, w2);
      return l3;
    }
    function t2(e2, g2, h2, k3) {
      var l3 = Ka(h2);
      if ("function" !== typeof l3) throw Error(p(150));
      h2 = l3.call(h2);
      if (null == h2) throw Error(p(151));
      for (var u2 = l3 = null, m3 = g2, w2 = g2 = 0, x2 = null, n3 = h2.next(); null !== m3 && !n3.done; w2++, n3 = h2.next()) {
        m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
        var t3 = r2(e2, m3, n3.value, k3);
        if (null === t3) {
          null === m3 && (m3 = x2);
          break;
        }
        a && m3 && null === t3.alternate && b(e2, m3);
        g2 = f2(t3, g2, w2);
        null === u2 ? l3 = t3 : u2.sibling = t3;
        u2 = t3;
        m3 = x2;
      }
      if (n3.done) return c(
        e2,
        m3
      ), I && tg(e2, w2), l3;
      if (null === m3) {
        for (; !n3.done; w2++, n3 = h2.next()) n3 = q2(e2, n3.value, k3), null !== n3 && (g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
        I && tg(e2, w2);
        return l3;
      }
      for (m3 = d(e2, m3); !n3.done; w2++, n3 = h2.next()) n3 = y2(m3, e2, w2, n3.value, k3), null !== n3 && (a && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
      a && m3.forEach(function(a2) {
        return b(e2, a2);
      });
      I && tg(e2, w2);
      return l3;
    }
    function J2(a2, d2, f3, h2) {
      "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
      if ("object" === typeof f3 && null !== f3) {
        switch (f3.$$typeof) {
          case va:
            a: {
              for (var k3 = f3.key, l3 = d2; null !== l3; ) {
                if (l3.key === k3) {
                  k3 = f3.type;
                  if (k3 === ya) {
                    if (7 === l3.tag) {
                      c(a2, l3.sibling);
                      d2 = e(l3, f3.props.children);
                      d2.return = a2;
                      a2 = d2;
                      break a;
                    }
                  } else if (l3.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha && Ng(k3) === l3.type) {
                    c(a2, l3.sibling);
                    d2 = e(l3, f3.props);
                    d2.ref = Lg(a2, l3, f3);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  }
                  c(a2, l3);
                  break;
                } else b(a2, l3);
                l3 = l3.sibling;
              }
              f3.type === ya ? (d2 = Tg(f3.props.children, a2.mode, h2, f3.key), d2.return = a2, a2 = d2) : (h2 = Rg(f3.type, f3.key, f3.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f3), h2.return = a2, a2 = h2);
            }
            return g(a2);
          case wa:
            a: {
              for (l3 = f3.key; null !== d2; ) {
                if (d2.key === l3) if (4 === d2.tag && d2.stateNode.containerInfo === f3.containerInfo && d2.stateNode.implementation === f3.implementation) {
                  c(a2, d2.sibling);
                  d2 = e(d2, f3.children || []);
                  d2.return = a2;
                  a2 = d2;
                  break a;
                } else {
                  c(a2, d2);
                  break;
                }
                else b(a2, d2);
                d2 = d2.sibling;
              }
              d2 = Sg(f3, a2.mode, h2);
              d2.return = a2;
              a2 = d2;
            }
            return g(a2);
          case Ha:
            return l3 = f3._init, J2(a2, d2, l3(f3._payload), h2);
        }
        if (eb(f3)) return n2(a2, d2, f3, h2);
        if (Ka(f3)) return t2(a2, d2, f3, h2);
        Mg(a2, f3);
      }
      return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f3), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f3, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
    }
    return J2;
  }
  var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
  function $g() {
    Zg = Yg = Xg = null;
  }
  function ah(a) {
    var b = Wg.current;
    E(Wg);
    a._currentValue = b;
  }
  function bh(a, b, c) {
    for (; null !== a; ) {
      var d = a.alternate;
      (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
      if (a === c) break;
      a = a.return;
    }
  }
  function ch(a, b) {
    Xg = a;
    Zg = Yg = null;
    a = a.dependencies;
    null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
  }
  function eh(a) {
    var b = a._currentValue;
    if (Zg !== a) if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
      if (null === Xg) throw Error(p(308));
      Yg = a;
      Xg.dependencies = { lanes: 0, firstContext: a };
    } else Yg = Yg.next = a;
    return b;
  }
  var fh = null;
  function gh(a) {
    null === fh ? fh = [a] : fh.push(a);
  }
  function hh(a, b, c, d) {
    var e = b.interleaved;
    null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
    b.interleaved = c;
    return ih(a, d);
  }
  function ih(a, b) {
    a.lanes |= b;
    var c = a.alternate;
    null !== c && (c.lanes |= b);
    c = a;
    for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
    return 3 === c.tag ? c.stateNode : null;
  }
  var jh = false;
  function kh(a) {
    a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function lh(a, b) {
    a = a.updateQueue;
    b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
  }
  function mh(a, b) {
    return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
  }
  function nh(a, b, c) {
    var d = a.updateQueue;
    if (null === d) return null;
    d = d.shared;
    if (0 !== (K & 2)) {
      var e = d.pending;
      null === e ? b.next = b : (b.next = e.next, e.next = b);
      d.pending = b;
      return ih(a, c);
    }
    e = d.interleaved;
    null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
    d.interleaved = b;
    return ih(a, c);
  }
  function oh(a, b, c) {
    b = b.updateQueue;
    if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
      var d = b.lanes;
      d &= a.pendingLanes;
      c |= d;
      b.lanes = c;
      Cc(a, c);
    }
  }
  function ph(a, b) {
    var c = a.updateQueue, d = a.alternate;
    if (null !== d && (d = d.updateQueue, c === d)) {
      var e = null, f2 = null;
      c = c.firstBaseUpdate;
      if (null !== c) {
        do {
          var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
          null === f2 ? e = f2 = g : f2 = f2.next = g;
          c = c.next;
        } while (null !== c);
        null === f2 ? e = f2 = b : f2 = f2.next = b;
      } else e = f2 = b;
      c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f2, shared: d.shared, effects: d.effects };
      a.updateQueue = c;
      return;
    }
    a = c.lastBaseUpdate;
    null === a ? c.firstBaseUpdate = b : a.next = b;
    c.lastBaseUpdate = b;
  }
  function qh(a, b, c, d) {
    var e = a.updateQueue;
    jh = false;
    var f2 = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
    if (null !== h) {
      e.shared.pending = null;
      var k2 = h, l2 = k2.next;
      k2.next = null;
      null === g ? f2 = l2 : g.next = l2;
      g = k2;
      var m2 = a.alternate;
      null !== m2 && (m2 = m2.updateQueue, h = m2.lastBaseUpdate, h !== g && (null === h ? m2.firstBaseUpdate = l2 : h.next = l2, m2.lastBaseUpdate = k2));
    }
    if (null !== f2) {
      var q2 = e.baseState;
      g = 0;
      m2 = l2 = k2 = null;
      h = f2;
      do {
        var r2 = h.lane, y2 = h.eventTime;
        if ((d & r2) === r2) {
          null !== m2 && (m2 = m2.next = {
            eventTime: y2,
            lane: 0,
            tag: h.tag,
            payload: h.payload,
            callback: h.callback,
            next: null
          });
          a: {
            var n2 = a, t2 = h;
            r2 = b;
            y2 = c;
            switch (t2.tag) {
              case 1:
                n2 = t2.payload;
                if ("function" === typeof n2) {
                  q2 = n2.call(y2, q2, r2);
                  break a;
                }
                q2 = n2;
                break a;
              case 3:
                n2.flags = n2.flags & -65537 | 128;
              case 0:
                n2 = t2.payload;
                r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
                if (null === r2 || void 0 === r2) break a;
                q2 = A({}, q2, r2);
                break a;
              case 2:
                jh = true;
            }
          }
          null !== h.callback && 0 !== h.lane && (a.flags |= 64, r2 = e.effects, null === r2 ? e.effects = [h] : r2.push(h));
        } else y2 = { eventTime: y2, lane: r2, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m2 ? (l2 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g |= r2;
        h = h.next;
        if (null === h) if (h = e.shared.pending, null === h) break;
        else r2 = h, h = r2.next, r2.next = null, e.lastBaseUpdate = r2, e.shared.pending = null;
      } while (1);
      null === m2 && (k2 = q2);
      e.baseState = k2;
      e.firstBaseUpdate = l2;
      e.lastBaseUpdate = m2;
      b = e.shared.interleaved;
      if (null !== b) {
        e = b;
        do
          g |= e.lane, e = e.next;
        while (e !== b);
      } else null === f2 && (e.shared.lanes = 0);
      rh |= g;
      a.lanes = g;
      a.memoizedState = q2;
    }
  }
  function sh(a, b, c) {
    a = b.effects;
    b.effects = null;
    if (null !== a) for (b = 0; b < a.length; b++) {
      var d = a[b], e = d.callback;
      if (null !== e) {
        d.callback = null;
        d = c;
        if ("function" !== typeof e) throw Error(p(191, e));
        e.call(d);
      }
    }
  }
  var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
  function xh(a) {
    if (a === th) throw Error(p(174));
    return a;
  }
  function yh(a, b) {
    G(wh, b);
    G(vh, a);
    G(uh, th);
    a = b.nodeType;
    switch (a) {
      case 9:
      case 11:
        b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
        break;
      default:
        a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
    }
    E(uh);
    G(uh, b);
  }
  function zh() {
    E(uh);
    E(vh);
    E(wh);
  }
  function Ah(a) {
    xh(wh.current);
    var b = xh(uh.current);
    var c = lb(b, a.type);
    b !== c && (G(vh, a), G(uh, c));
  }
  function Bh(a) {
    vh.current === a && (E(uh), E(vh));
  }
  var L = Uf(0);
  function Ch(a) {
    for (var b = a; null !== b; ) {
      if (13 === b.tag) {
        var c = b.memoizedState;
        if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
      } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
        if (0 !== (b.flags & 128)) return b;
      } else if (null !== b.child) {
        b.child.return = b;
        b = b.child;
        continue;
      }
      if (b === a) break;
      for (; null === b.sibling; ) {
        if (null === b.return || b.return === a) return null;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
    return null;
  }
  var Dh = [];
  function Eh() {
    for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
    Dh.length = 0;
  }
  var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N = null, O = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
  function P() {
    throw Error(p(321));
  }
  function Mh(a, b) {
    if (null === b) return false;
    for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return false;
    return true;
  }
  function Nh(a, b, c, d, e, f2) {
    Hh = f2;
    M = b;
    b.memoizedState = null;
    b.updateQueue = null;
    b.lanes = 0;
    Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
    a = c(d, e);
    if (Jh) {
      f2 = 0;
      do {
        Jh = false;
        Kh = 0;
        if (25 <= f2) throw Error(p(301));
        f2 += 1;
        O = N = null;
        b.updateQueue = null;
        Fh.current = Qh;
        a = c(d, e);
      } while (Jh);
    }
    Fh.current = Rh;
    b = null !== N && null !== N.next;
    Hh = 0;
    O = N = M = null;
    Ih = false;
    if (b) throw Error(p(300));
    return a;
  }
  function Sh() {
    var a = 0 !== Kh;
    Kh = 0;
    return a;
  }
  function Th() {
    var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    null === O ? M.memoizedState = O = a : O = O.next = a;
    return O;
  }
  function Uh() {
    if (null === N) {
      var a = M.alternate;
      a = null !== a ? a.memoizedState : null;
    } else a = N.next;
    var b = null === O ? M.memoizedState : O.next;
    if (null !== b) O = b, N = a;
    else {
      if (null === a) throw Error(p(310));
      N = a;
      a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
      null === O ? M.memoizedState = O = a : O = O.next = a;
    }
    return O;
  }
  function Vh(a, b) {
    return "function" === typeof b ? b(a) : b;
  }
  function Wh(a) {
    var b = Uh(), c = b.queue;
    if (null === c) throw Error(p(311));
    c.lastRenderedReducer = a;
    var d = N, e = d.baseQueue, f2 = c.pending;
    if (null !== f2) {
      if (null !== e) {
        var g = e.next;
        e.next = f2.next;
        f2.next = g;
      }
      d.baseQueue = e = f2;
      c.pending = null;
    }
    if (null !== e) {
      f2 = e.next;
      d = d.baseState;
      var h = g = null, k2 = null, l2 = f2;
      do {
        var m2 = l2.lane;
        if ((Hh & m2) === m2) null !== k2 && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d = l2.hasEagerState ? l2.eagerState : a(d, l2.action);
        else {
          var q2 = {
            lane: m2,
            action: l2.action,
            hasEagerState: l2.hasEagerState,
            eagerState: l2.eagerState,
            next: null
          };
          null === k2 ? (h = k2 = q2, g = d) : k2 = k2.next = q2;
          M.lanes |= m2;
          rh |= m2;
        }
        l2 = l2.next;
      } while (null !== l2 && l2 !== f2);
      null === k2 ? g = d : k2.next = h;
      He(d, b.memoizedState) || (dh = true);
      b.memoizedState = d;
      b.baseState = g;
      b.baseQueue = k2;
      c.lastRenderedState = d;
    }
    a = c.interleaved;
    if (null !== a) {
      e = a;
      do
        f2 = e.lane, M.lanes |= f2, rh |= f2, e = e.next;
      while (e !== a);
    } else null === e && (c.lanes = 0);
    return [b.memoizedState, c.dispatch];
  }
  function Xh(a) {
    var b = Uh(), c = b.queue;
    if (null === c) throw Error(p(311));
    c.lastRenderedReducer = a;
    var d = c.dispatch, e = c.pending, f2 = b.memoizedState;
    if (null !== e) {
      c.pending = null;
      var g = e = e.next;
      do
        f2 = a(f2, g.action), g = g.next;
      while (g !== e);
      He(f2, b.memoizedState) || (dh = true);
      b.memoizedState = f2;
      null === b.baseQueue && (b.baseState = f2);
      c.lastRenderedState = f2;
    }
    return [f2, d];
  }
  function Yh() {
  }
  function Zh(a, b) {
    var c = M, d = Uh(), e = b(), f2 = !He(d.memoizedState, e);
    f2 && (d.memoizedState = e, dh = true);
    d = d.queue;
    $h(ai.bind(null, c, d, a), [a]);
    if (d.getSnapshot !== b || f2 || null !== O && O.memoizedState.tag & 1) {
      c.flags |= 2048;
      bi(9, ci.bind(null, c, d, e, b), void 0, null);
      if (null === Q) throw Error(p(349));
      0 !== (Hh & 30) || di(c, b, e);
    }
    return e;
  }
  function di(a, b, c) {
    a.flags |= 16384;
    a = { getSnapshot: b, value: c };
    b = M.updateQueue;
    null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
  }
  function ci(a, b, c, d) {
    b.value = c;
    b.getSnapshot = d;
    ei(b) && fi(a);
  }
  function ai(a, b, c) {
    return c(function() {
      ei(b) && fi(a);
    });
  }
  function ei(a) {
    var b = a.getSnapshot;
    a = a.value;
    try {
      var c = b();
      return !He(a, c);
    } catch (d) {
      return true;
    }
  }
  function fi(a) {
    var b = ih(a, 1);
    null !== b && gi(b, a, 1, -1);
  }
  function hi(a) {
    var b = Th();
    "function" === typeof a && (a = a());
    b.memoizedState = b.baseState = a;
    a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
    b.queue = a;
    a = a.dispatch = ii.bind(null, M, a);
    return [b.memoizedState, a];
  }
  function bi(a, b, c, d) {
    a = { tag: a, create: b, destroy: c, deps: d, next: null };
    b = M.updateQueue;
    null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
    return a;
  }
  function ji() {
    return Uh().memoizedState;
  }
  function ki(a, b, c, d) {
    var e = Th();
    M.flags |= a;
    e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
  }
  function li(a, b, c, d) {
    var e = Uh();
    d = void 0 === d ? null : d;
    var f2 = void 0;
    if (null !== N) {
      var g = N.memoizedState;
      f2 = g.destroy;
      if (null !== d && Mh(d, g.deps)) {
        e.memoizedState = bi(b, c, f2, d);
        return;
      }
    }
    M.flags |= a;
    e.memoizedState = bi(1 | b, c, f2, d);
  }
  function mi(a, b) {
    return ki(8390656, 8, a, b);
  }
  function $h(a, b) {
    return li(2048, 8, a, b);
  }
  function ni(a, b) {
    return li(4, 2, a, b);
  }
  function oi(a, b) {
    return li(4, 4, a, b);
  }
  function pi(a, b) {
    if ("function" === typeof b) return a = a(), b(a), function() {
      b(null);
    };
    if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
      b.current = null;
    };
  }
  function qi(a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : null;
    return li(4, 4, pi.bind(null, b, a), c);
  }
  function ri() {
  }
  function si(a, b) {
    var c = Uh();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && Mh(b, d[1])) return d[0];
    c.memoizedState = [a, b];
    return a;
  }
  function ti(a, b) {
    var c = Uh();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && Mh(b, d[1])) return d[0];
    a = a();
    c.memoizedState = [a, b];
    return a;
  }
  function ui(a, b, c) {
    if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
    He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
    return b;
  }
  function vi(a, b) {
    var c = C;
    C = 0 !== c && 4 > c ? c : 4;
    a(true);
    var d = Gh.transition;
    Gh.transition = {};
    try {
      a(false), b();
    } finally {
      C = c, Gh.transition = d;
    }
  }
  function wi() {
    return Uh().memoizedState;
  }
  function xi(a, b, c) {
    var d = yi(a);
    c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
    if (zi(a)) Ai(b, c);
    else if (c = hh(a, b, c, d), null !== c) {
      var e = R();
      gi(c, a, d, e);
      Bi(c, b, d);
    }
  }
  function ii(a, b, c) {
    var d = yi(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
    if (zi(a)) Ai(b, e);
    else {
      var f2 = a.alternate;
      if (0 === a.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b.lastRenderedReducer, null !== f2)) try {
        var g = b.lastRenderedState, h = f2(g, c);
        e.hasEagerState = true;
        e.eagerState = h;
        if (He(h, g)) {
          var k2 = b.interleaved;
          null === k2 ? (e.next = e, gh(b)) : (e.next = k2.next, k2.next = e);
          b.interleaved = e;
          return;
        }
      } catch (l2) {
      } finally {
      }
      c = hh(a, b, e, d);
      null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
    }
  }
  function zi(a) {
    var b = a.alternate;
    return a === M || null !== b && b === M;
  }
  function Ai(a, b) {
    Jh = Ih = true;
    var c = a.pending;
    null === c ? b.next = b : (b.next = c.next, c.next = b);
    a.pending = b;
  }
  function Bi(a, b, c) {
    if (0 !== (c & 4194240)) {
      var d = b.lanes;
      d &= a.pendingLanes;
      c |= d;
      b.lanes = c;
      Cc(a, c);
    }
  }
  var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a, b) {
    Th().memoizedState = [a, void 0 === b ? null : b];
    return a;
  }, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : null;
    return ki(
      4194308,
      4,
      pi.bind(null, b, a),
      c
    );
  }, useLayoutEffect: function(a, b) {
    return ki(4194308, 4, a, b);
  }, useInsertionEffect: function(a, b) {
    return ki(4, 2, a, b);
  }, useMemo: function(a, b) {
    var c = Th();
    b = void 0 === b ? null : b;
    a = a();
    c.memoizedState = [a, b];
    return a;
  }, useReducer: function(a, b, c) {
    var d = Th();
    b = void 0 !== c ? c(b) : b;
    d.memoizedState = d.baseState = b;
    a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
    d.queue = a;
    a = a.dispatch = xi.bind(null, M, a);
    return [d.memoizedState, a];
  }, useRef: function(a) {
    var b = Th();
    a = { current: a };
    return b.memoizedState = a;
  }, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
    return Th().memoizedState = a;
  }, useTransition: function() {
    var a = hi(false), b = a[0];
    a = vi.bind(null, a[1]);
    Th().memoizedState = a;
    return [b, a];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(a, b, c) {
    var d = M, e = Th();
    if (I) {
      if (void 0 === c) throw Error(p(407));
      c = c();
    } else {
      c = b();
      if (null === Q) throw Error(p(349));
      0 !== (Hh & 30) || di(d, b, c);
    }
    e.memoizedState = c;
    var f2 = { value: c, getSnapshot: b };
    e.queue = f2;
    mi(ai.bind(
      null,
      d,
      f2,
      a
    ), [a]);
    d.flags |= 2048;
    bi(9, ci.bind(null, d, f2, c, b), void 0, null);
    return c;
  }, useId: function() {
    var a = Th(), b = Q.identifierPrefix;
    if (I) {
      var c = sg;
      var d = rg;
      c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
      b = ":" + b + "R" + c;
      c = Kh++;
      0 < c && (b += "H" + c.toString(32));
      b += ":";
    } else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
    return a.memoizedState = b;
  }, unstable_isNewReconciler: false }, Ph = {
    readContext: eh,
    useCallback: si,
    useContext: eh,
    useEffect: $h,
    useImperativeHandle: qi,
    useInsertionEffect: ni,
    useLayoutEffect: oi,
    useMemo: ti,
    useReducer: Wh,
    useRef: ji,
    useState: function() {
      return Wh(Vh);
    },
    useDebugValue: ri,
    useDeferredValue: function(a) {
      var b = Uh();
      return ui(b, N.memoizedState, a);
    },
    useTransition: function() {
      var a = Wh(Vh)[0], b = Uh().memoizedState;
      return [a, b];
    },
    useMutableSource: Yh,
    useSyncExternalStore: Zh,
    useId: wi,
    unstable_isNewReconciler: false
  }, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
    return Xh(Vh);
  }, useDebugValue: ri, useDeferredValue: function(a) {
    var b = Uh();
    return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
  }, useTransition: function() {
    var a = Xh(Vh)[0], b = Uh().memoizedState;
    return [a, b];
  }, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
  function Ci(a, b) {
    if (a && a.defaultProps) {
      b = A({}, b);
      a = a.defaultProps;
      for (var c in a) void 0 === b[c] && (b[c] = a[c]);
      return b;
    }
    return b;
  }
  function Di(a, b, c, d) {
    b = a.memoizedState;
    c = c(d, b);
    c = null === c || void 0 === c ? b : A({}, b, c);
    a.memoizedState = c;
    0 === a.lanes && (a.updateQueue.baseState = c);
  }
  var Ei = { isMounted: function(a) {
    return (a = a._reactInternals) ? Vb(a) === a : false;
  }, enqueueSetState: function(a, b, c) {
    a = a._reactInternals;
    var d = R(), e = yi(a), f2 = mh(d, e);
    f2.payload = b;
    void 0 !== c && null !== c && (f2.callback = c);
    b = nh(a, f2, e);
    null !== b && (gi(b, a, e, d), oh(b, a, e));
  }, enqueueReplaceState: function(a, b, c) {
    a = a._reactInternals;
    var d = R(), e = yi(a), f2 = mh(d, e);
    f2.tag = 1;
    f2.payload = b;
    void 0 !== c && null !== c && (f2.callback = c);
    b = nh(a, f2, e);
    null !== b && (gi(b, a, e, d), oh(b, a, e));
  }, enqueueForceUpdate: function(a, b) {
    a = a._reactInternals;
    var c = R(), d = yi(a), e = mh(c, d);
    e.tag = 2;
    void 0 !== b && null !== b && (e.callback = b);
    b = nh(a, e, d);
    null !== b && (gi(b, a, d, c), oh(b, a, d));
  } };
  function Fi(a, b, c, d, e, f2, g) {
    a = a.stateNode;
    return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f2, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f2) : true;
  }
  function Gi(a, b, c) {
    var d = false, e = Vf;
    var f2 = b.contextType;
    "object" === typeof f2 && null !== f2 ? f2 = eh(f2) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f2 = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
    b = new b(c, f2);
    a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
    b.updater = Ei;
    a.stateNode = b;
    b._reactInternals = a;
    d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f2);
    return b;
  }
  function Hi(a, b, c, d) {
    a = b.state;
    "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
    "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
    b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
  }
  function Ii(a, b, c, d) {
    var e = a.stateNode;
    e.props = c;
    e.state = a.memoizedState;
    e.refs = {};
    kh(a);
    var f2 = b.contextType;
    "object" === typeof f2 && null !== f2 ? e.context = eh(f2) : (f2 = Zf(b) ? Xf : H.current, e.context = Yf(a, f2));
    e.state = a.memoizedState;
    f2 = b.getDerivedStateFromProps;
    "function" === typeof f2 && (Di(a, b, f2, c), e.state = a.memoizedState);
    "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
    "function" === typeof e.componentDidMount && (a.flags |= 4194308);
  }
  function Ji(a, b) {
    try {
      var c = "", d = b;
      do
        c += Pa(d), d = d.return;
      while (d);
      var e = c;
    } catch (f2) {
      e = "\nError generating stack: " + f2.message + "\n" + f2.stack;
    }
    return { value: a, source: b, stack: e, digest: null };
  }
  function Ki(a, b, c) {
    return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
  }
  function Li(a, b) {
    try {
      console.error(b.value);
    } catch (c) {
      setTimeout(function() {
        throw c;
      });
    }
  }
  var Mi = "function" === typeof WeakMap ? WeakMap : Map;
  function Ni(a, b, c) {
    c = mh(-1, c);
    c.tag = 3;
    c.payload = { element: null };
    var d = b.value;
    c.callback = function() {
      Oi || (Oi = true, Pi = d);
      Li(a, b);
    };
    return c;
  }
  function Qi(a, b, c) {
    c = mh(-1, c);
    c.tag = 3;
    var d = a.type.getDerivedStateFromError;
    if ("function" === typeof d) {
      var e = b.value;
      c.payload = function() {
        return d(e);
      };
      c.callback = function() {
        Li(a, b);
      };
    }
    var f2 = a.stateNode;
    null !== f2 && "function" === typeof f2.componentDidCatch && (c.callback = function() {
      Li(a, b);
      "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
      var c2 = b.stack;
      this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
    });
    return c;
  }
  function Si(a, b, c) {
    var d = a.pingCache;
    if (null === d) {
      d = a.pingCache = new Mi();
      var e = /* @__PURE__ */ new Set();
      d.set(b, e);
    } else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
    e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
  }
  function Ui(a) {
    do {
      var b;
      if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
      if (b) return a;
      a = a.return;
    } while (null !== a);
    return null;
  }
  function Vi(a, b, c, d, e) {
    if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
    a.flags |= 65536;
    a.lanes = e;
    return a;
  }
  var Wi = ua.ReactCurrentOwner, dh = false;
  function Xi(a, b, c, d) {
    b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
  }
  function Yi(a, b, c, d, e) {
    c = c.render;
    var f2 = b.ref;
    ch(b, e);
    d = Nh(a, b, c, d, f2, e);
    c = Sh();
    if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
    I && c && vg(b);
    b.flags |= 1;
    Xi(a, b, d, e);
    return b.child;
  }
  function $i(a, b, c, d, e) {
    if (null === a) {
      var f2 = c.type;
      if ("function" === typeof f2 && !aj(f2) && void 0 === f2.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f2, bj(a, b, f2, d, e);
      a = Rg(c.type, null, d, b, b.mode, e);
      a.ref = b.ref;
      a.return = b;
      return b.child = a;
    }
    f2 = a.child;
    if (0 === (a.lanes & e)) {
      var g = f2.memoizedProps;
      c = c.compare;
      c = null !== c ? c : Ie;
      if (c(g, d) && a.ref === b.ref) return Zi(a, b, e);
    }
    b.flags |= 1;
    a = Pg(f2, d);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }
  function bj(a, b, c, d, e) {
    if (null !== a) {
      var f2 = a.memoizedProps;
      if (Ie(f2, d) && a.ref === b.ref) if (dh = false, b.pendingProps = d = f2, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (dh = true);
      else return b.lanes = a.lanes, Zi(a, b, e);
    }
    return cj(a, b, c, d, e);
  }
  function dj(a, b, c) {
    var d = b.pendingProps, e = d.children, f2 = null !== a ? a.memoizedState : null;
    if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
    else {
      if (0 === (c & 1073741824)) return a = null !== f2 ? f2.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
      b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
      d = null !== f2 ? f2.baseLanes : c;
      G(ej, fj);
      fj |= d;
    }
    else null !== f2 ? (d = f2.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
    Xi(a, b, e, c);
    return b.child;
  }
  function gj(a, b) {
    var c = b.ref;
    if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
  }
  function cj(a, b, c, d, e) {
    var f2 = Zf(c) ? Xf : H.current;
    f2 = Yf(b, f2);
    ch(b, e);
    c = Nh(a, b, c, d, f2, e);
    d = Sh();
    if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
    I && d && vg(b);
    b.flags |= 1;
    Xi(a, b, c, e);
    return b.child;
  }
  function hj(a, b, c, d, e) {
    if (Zf(c)) {
      var f2 = true;
      cg(b);
    } else f2 = false;
    ch(b, e);
    if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = true;
    else if (null === a) {
      var g = b.stateNode, h = b.memoizedProps;
      g.props = h;
      var k2 = g.context, l2 = c.contextType;
      "object" === typeof l2 && null !== l2 ? l2 = eh(l2) : (l2 = Zf(c) ? Xf : H.current, l2 = Yf(b, l2));
      var m2 = c.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g.getSnapshotBeforeUpdate;
      q2 || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k2 !== l2) && Hi(b, g, d, l2);
      jh = false;
      var r2 = b.memoizedState;
      g.state = r2;
      qh(b, d, g, e);
      k2 = b.memoizedState;
      h !== d || r2 !== k2 || Wf.current || jh ? ("function" === typeof m2 && (Di(b, c, m2, d), k2 = b.memoizedState), (h = jh || Fi(b, c, h, d, r2, k2, l2)) ? (q2 || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k2), g.props = d, g.state = k2, g.context = l2, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
    } else {
      g = b.stateNode;
      lh(a, b);
      h = b.memoizedProps;
      l2 = b.type === b.elementType ? h : Ci(b.type, h);
      g.props = l2;
      q2 = b.pendingProps;
      r2 = g.context;
      k2 = c.contextType;
      "object" === typeof k2 && null !== k2 ? k2 = eh(k2) : (k2 = Zf(c) ? Xf : H.current, k2 = Yf(b, k2));
      var y2 = c.getDerivedStateFromProps;
      (m2 = "function" === typeof y2 || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q2 || r2 !== k2) && Hi(b, g, d, k2);
      jh = false;
      r2 = b.memoizedState;
      g.state = r2;
      qh(b, d, g, e);
      var n2 = b.memoizedState;
      h !== q2 || r2 !== n2 || Wf.current || jh ? ("function" === typeof y2 && (Di(b, c, y2, d), n2 = b.memoizedState), (l2 = jh || Fi(b, c, l2, d, r2, n2, k2) || false) ? (m2 || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n2, k2), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n2, k2)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n2), g.props = d, g.state = n2, g.context = k2, d = l2) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), d = false);
    }
    return jj(a, b, c, d, f2, e);
  }
  function jj(a, b, c, d, e, f2) {
    gj(a, b);
    var g = 0 !== (b.flags & 128);
    if (!d && !g) return e && dg(b, c, false), Zi(a, b, f2);
    d = b.stateNode;
    Wi.current = b;
    var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
    b.flags |= 1;
    null !== a && g ? (b.child = Ug(b, a.child, null, f2), b.child = Ug(b, null, h, f2)) : Xi(a, b, h, f2);
    b.memoizedState = d.state;
    e && dg(b, c, true);
    return b.child;
  }
  function kj(a) {
    var b = a.stateNode;
    b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
    yh(a, b.containerInfo);
  }
  function lj(a, b, c, d, e) {
    Ig();
    Jg(e);
    b.flags |= 256;
    Xi(a, b, c, d);
    return b.child;
  }
  var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
  function nj(a) {
    return { baseLanes: a, cachePool: null, transitions: null };
  }
  function oj(a, b, c) {
    var d = b.pendingProps, e = L.current, f2 = false, g = 0 !== (b.flags & 128), h;
    (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
    if (h) f2 = true, b.flags &= -129;
    else if (null === a || null !== a.memoizedState) e |= 1;
    G(L, e & 1);
    if (null === a) {
      Eg(b);
      a = b.memoizedState;
      if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
      g = d.children;
      a = d.fallback;
      return f2 ? (d = b.mode, f2 = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g) : f2 = pj(g, d, 0, null), a = Tg(a, d, c, null), f2.return = b, a.return = b, f2.sibling = a, b.child = f2, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
    }
    e = a.memoizedState;
    if (null !== e && (h = e.dehydrated, null !== h)) return rj(a, b, g, d, h, e, c);
    if (f2) {
      f2 = d.fallback;
      g = b.mode;
      e = a.child;
      h = e.sibling;
      var k2 = { mode: "hidden", children: d.children };
      0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k2, b.deletions = null) : (d = Pg(e, k2), d.subtreeFlags = e.subtreeFlags & 14680064);
      null !== h ? f2 = Pg(h, f2) : (f2 = Tg(f2, g, c, null), f2.flags |= 2);
      f2.return = b;
      d.return = b;
      d.sibling = f2;
      b.child = d;
      d = f2;
      f2 = b.child;
      g = a.child.memoizedState;
      g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
      f2.memoizedState = g;
      f2.childLanes = a.childLanes & ~c;
      b.memoizedState = mj;
      return d;
    }
    f2 = a.child;
    a = f2.sibling;
    d = Pg(f2, { mode: "visible", children: d.children });
    0 === (b.mode & 1) && (d.lanes = c);
    d.return = b;
    d.sibling = null;
    null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
    b.child = d;
    b.memoizedState = null;
    return d;
  }
  function qj(a, b) {
    b = pj({ mode: "visible", children: b }, a.mode, 0, null);
    b.return = a;
    return a.child = b;
  }
  function sj(a, b, c, d) {
    null !== d && Jg(d);
    Ug(b, a.child, null, c);
    a = qj(b, b.pendingProps.children);
    a.flags |= 2;
    b.memoizedState = null;
    return a;
  }
  function rj(a, b, c, d, e, f2, g) {
    if (c) {
      if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
      if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
      f2 = d.fallback;
      e = b.mode;
      d = pj({ mode: "visible", children: d.children }, e, 0, null);
      f2 = Tg(f2, e, g, null);
      f2.flags |= 2;
      d.return = b;
      f2.return = b;
      d.sibling = f2;
      b.child = d;
      0 !== (b.mode & 1) && Ug(b, a.child, null, g);
      b.child.memoizedState = nj(g);
      b.memoizedState = mj;
      return f2;
    }
    if (0 === (b.mode & 1)) return sj(a, b, g, null);
    if ("$!" === e.data) {
      d = e.nextSibling && e.nextSibling.dataset;
      if (d) var h = d.dgst;
      d = h;
      f2 = Error(p(419));
      d = Ki(f2, d, void 0);
      return sj(a, b, g, d);
    }
    h = 0 !== (g & a.childLanes);
    if (dh || h) {
      d = Q;
      if (null !== d) {
        switch (g & -g) {
          case 4:
            e = 2;
            break;
          case 16:
            e = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            e = 32;
            break;
          case 536870912:
            e = 268435456;
            break;
          default:
            e = 0;
        }
        e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
        0 !== e && e !== f2.retryLane && (f2.retryLane = e, ih(a, e), gi(d, a, e, -1));
      }
      tj();
      d = Ki(Error(p(421)));
      return sj(a, b, g, d);
    }
    if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
    a = f2.treeContext;
    yg = Lf(e.nextSibling);
    xg = b;
    I = true;
    zg = null;
    null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
    b = qj(b, d.children);
    b.flags |= 4096;
    return b;
  }
  function vj(a, b, c) {
    a.lanes |= b;
    var d = a.alternate;
    null !== d && (d.lanes |= b);
    bh(a.return, b, c);
  }
  function wj(a, b, c, d, e) {
    var f2 = a.memoizedState;
    null === f2 ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f2.isBackwards = b, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d, f2.tail = c, f2.tailMode = e);
  }
  function xj(a, b, c) {
    var d = b.pendingProps, e = d.revealOrder, f2 = d.tail;
    Xi(a, b, d.children, c);
    d = L.current;
    if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
    else {
      if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a; ) {
        if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
        else if (19 === a.tag) vj(a, c, b);
        else if (null !== a.child) {
          a.child.return = a;
          a = a.child;
          continue;
        }
        if (a === b) break a;
        for (; null === a.sibling; ) {
          if (null === a.return || a.return === b) break a;
          a = a.return;
        }
        a.sibling.return = a.return;
        a = a.sibling;
      }
      d &= 1;
    }
    G(L, d);
    if (0 === (b.mode & 1)) b.memoizedState = null;
    else switch (e) {
      case "forwards":
        c = b.child;
        for (e = null; null !== c; ) a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
        c = e;
        null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
        wj(b, false, e, c, f2);
        break;
      case "backwards":
        c = null;
        e = b.child;
        for (b.child = null; null !== e; ) {
          a = e.alternate;
          if (null !== a && null === Ch(a)) {
            b.child = e;
            break;
          }
          a = e.sibling;
          e.sibling = c;
          c = e;
          e = a;
        }
        wj(b, true, c, null, f2);
        break;
      case "together":
        wj(b, false, null, null, void 0);
        break;
      default:
        b.memoizedState = null;
    }
    return b.child;
  }
  function ij(a, b) {
    0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
  }
  function Zi(a, b, c) {
    null !== a && (b.dependencies = a.dependencies);
    rh |= b.lanes;
    if (0 === (c & b.childLanes)) return null;
    if (null !== a && b.child !== a.child) throw Error(p(153));
    if (null !== b.child) {
      a = b.child;
      c = Pg(a, a.pendingProps);
      b.child = c;
      for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
      c.sibling = null;
    }
    return b.child;
  }
  function yj(a, b, c) {
    switch (b.tag) {
      case 3:
        kj(b);
        Ig();
        break;
      case 5:
        Ah(b);
        break;
      case 1:
        Zf(b.type) && cg(b);
        break;
      case 4:
        yh(b, b.stateNode.containerInfo);
        break;
      case 10:
        var d = b.type._context, e = b.memoizedProps.value;
        G(Wg, d._currentValue);
        d._currentValue = e;
        break;
      case 13:
        d = b.memoizedState;
        if (null !== d) {
          if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
          if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
          G(L, L.current & 1);
          a = Zi(a, b, c);
          return null !== a ? a.sibling : null;
        }
        G(L, L.current & 1);
        break;
      case 19:
        d = 0 !== (c & b.childLanes);
        if (0 !== (a.flags & 128)) {
          if (d) return xj(a, b, c);
          b.flags |= 128;
        }
        e = b.memoizedState;
        null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
        G(L, L.current);
        if (d) break;
        else return null;
      case 22:
      case 23:
        return b.lanes = 0, dj(a, b, c);
    }
    return Zi(a, b, c);
  }
  var zj, Aj, Bj, Cj;
  zj = function(a, b) {
    for (var c = b.child; null !== c; ) {
      if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
      else if (4 !== c.tag && null !== c.child) {
        c.child.return = c;
        c = c.child;
        continue;
      }
      if (c === b) break;
      for (; null === c.sibling; ) {
        if (null === c.return || c.return === b) return;
        c = c.return;
      }
      c.sibling.return = c.return;
      c = c.sibling;
    }
  };
  Aj = function() {
  };
  Bj = function(a, b, c, d) {
    var e = a.memoizedProps;
    if (e !== d) {
      a = b.stateNode;
      xh(uh.current);
      var f2 = null;
      switch (c) {
        case "input":
          e = Ya(a, e);
          d = Ya(a, d);
          f2 = [];
          break;
        case "select":
          e = A({}, e, { value: void 0 });
          d = A({}, d, { value: void 0 });
          f2 = [];
          break;
        case "textarea":
          e = gb(a, e);
          d = gb(a, d);
          f2 = [];
          break;
        default:
          "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
      }
      ub(c, d);
      var g;
      c = null;
      for (l2 in e) if (!d.hasOwnProperty(l2) && e.hasOwnProperty(l2) && null != e[l2]) if ("style" === l2) {
        var h = e[l2];
        for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
      } else "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
      for (l2 in d) {
        var k2 = d[l2];
        h = null != e ? e[l2] : void 0;
        if (d.hasOwnProperty(l2) && k2 !== h && (null != k2 || null != h)) if ("style" === l2) if (h) {
          for (g in h) !h.hasOwnProperty(g) || k2 && k2.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
          for (g in k2) k2.hasOwnProperty(g) && h[g] !== k2[g] && (c || (c = {}), c[g] = k2[g]);
        } else c || (f2 || (f2 = []), f2.push(
          l2,
          c
        )), c = k2;
        else "dangerouslySetInnerHTML" === l2 ? (k2 = k2 ? k2.__html : void 0, h = h ? h.__html : void 0, null != k2 && h !== k2 && (f2 = f2 || []).push(l2, k2)) : "children" === l2 ? "string" !== typeof k2 && "number" !== typeof k2 || (f2 = f2 || []).push(l2, "" + k2) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea.hasOwnProperty(l2) ? (null != k2 && "onScroll" === l2 && D("scroll", a), f2 || h === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
      }
      c && (f2 = f2 || []).push("style", c);
      var l2 = f2;
      if (b.updateQueue = l2) b.flags |= 4;
    }
  };
  Cj = function(a, b, c, d) {
    c !== d && (b.flags |= 4);
  };
  function Dj(a, b) {
    if (!I) switch (a.tailMode) {
      case "hidden":
        b = a.tail;
        for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
        null === c ? a.tail = null : c.sibling = null;
        break;
      case "collapsed":
        c = a.tail;
        for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
        null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
    }
  }
  function S(a) {
    var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
    if (b) for (var e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
    else for (e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
    a.subtreeFlags |= d;
    a.childLanes = c;
    return b;
  }
  function Ej(a, b, c) {
    var d = b.pendingProps;
    wg(b);
    switch (b.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return S(b), null;
      case 1:
        return Zf(b.type) && $f(), S(b), null;
      case 3:
        d = b.stateNode;
        zh();
        E(Wf);
        E(H);
        Eh();
        d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
        if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
        Aj(a, b);
        S(b);
        return null;
      case 5:
        Bh(b);
        var e = xh(wh.current);
        c = b.type;
        if (null !== a && null != b.stateNode) Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
        else {
          if (!d) {
            if (null === b.stateNode) throw Error(p(166));
            S(b);
            return null;
          }
          a = xh(uh.current);
          if (Gg(b)) {
            d = b.stateNode;
            c = b.type;
            var f2 = b.memoizedProps;
            d[Of] = b;
            d[Pf] = f2;
            a = 0 !== (b.mode & 1);
            switch (c) {
              case "dialog":
                D("cancel", d);
                D("close", d);
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", d);
                break;
              case "video":
              case "audio":
                for (e = 0; e < lf.length; e++) D(lf[e], d);
                break;
              case "source":
                D("error", d);
                break;
              case "img":
              case "image":
              case "link":
                D(
                  "error",
                  d
                );
                D("load", d);
                break;
              case "details":
                D("toggle", d);
                break;
              case "input":
                Za(d, f2);
                D("invalid", d);
                break;
              case "select":
                d._wrapperState = { wasMultiple: !!f2.multiple };
                D("invalid", d);
                break;
              case "textarea":
                hb(d, f2), D("invalid", d);
            }
            ub(c, f2);
            e = null;
            for (var g in f2) if (f2.hasOwnProperty(g)) {
              var h = f2[g];
              "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f2.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f2.suppressHydrationWarning && Af(
                d.textContent,
                h,
                a
              ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
            }
            switch (c) {
              case "input":
                Va(d);
                db(d, f2, true);
                break;
              case "textarea":
                Va(d);
                jb(d);
                break;
              case "select":
              case "option":
                break;
              default:
                "function" === typeof f2.onClick && (d.onclick = Bf);
            }
            d = e;
            b.updateQueue = d;
            null !== d && (b.flags |= 4);
          } else {
            g = 9 === e.nodeType ? e : e.ownerDocument;
            "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
            "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
            a[Of] = b;
            a[Pf] = d;
            zj(a, b, false, false);
            b.stateNode = a;
            a: {
              g = vb(c, d);
              switch (c) {
                case "dialog":
                  D("cancel", a);
                  D("close", a);
                  e = d;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  D("load", a);
                  e = d;
                  break;
                case "video":
                case "audio":
                  for (e = 0; e < lf.length; e++) D(lf[e], a);
                  e = d;
                  break;
                case "source":
                  D("error", a);
                  e = d;
                  break;
                case "img":
                case "image":
                case "link":
                  D(
                    "error",
                    a
                  );
                  D("load", a);
                  e = d;
                  break;
                case "details":
                  D("toggle", a);
                  e = d;
                  break;
                case "input":
                  Za(a, d);
                  e = Ya(a, d);
                  D("invalid", a);
                  break;
                case "option":
                  e = d;
                  break;
                case "select":
                  a._wrapperState = { wasMultiple: !!d.multiple };
                  e = A({}, d, { value: void 0 });
                  D("invalid", a);
                  break;
                case "textarea":
                  hb(a, d);
                  e = gb(a, d);
                  D("invalid", a);
                  break;
                default:
                  e = d;
              }
              ub(c, e);
              h = e;
              for (f2 in h) if (h.hasOwnProperty(f2)) {
                var k2 = h[f2];
                "style" === f2 ? sb(a, k2) : "dangerouslySetInnerHTML" === f2 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb(a, k2)) : "children" === f2 ? "string" === typeof k2 ? ("textarea" !== c || "" !== k2) && ob(a, k2) : "number" === typeof k2 && ob(a, "" + k2) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k2 && "onScroll" === f2 && D("scroll", a) : null != k2 && ta(a, f2, k2, g));
              }
              switch (c) {
                case "input":
                  Va(a);
                  db(a, d, false);
                  break;
                case "textarea":
                  Va(a);
                  jb(a);
                  break;
                case "option":
                  null != d.value && a.setAttribute("value", "" + Sa(d.value));
                  break;
                case "select":
                  a.multiple = !!d.multiple;
                  f2 = d.value;
                  null != f2 ? fb(a, !!d.multiple, f2, false) : null != d.defaultValue && fb(
                    a,
                    !!d.multiple,
                    d.defaultValue,
                    true
                  );
                  break;
                default:
                  "function" === typeof e.onClick && (a.onclick = Bf);
              }
              switch (c) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  d = !!d.autoFocus;
                  break a;
                case "img":
                  d = true;
                  break a;
                default:
                  d = false;
              }
            }
            d && (b.flags |= 4);
          }
          null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
        }
        S(b);
        return null;
      case 6:
        if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
        else {
          if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
          c = xh(wh.current);
          xh(uh.current);
          if (Gg(b)) {
            d = b.stateNode;
            c = b.memoizedProps;
            d[Of] = b;
            if (f2 = d.nodeValue !== c) {
              if (a = xg, null !== a) switch (a.tag) {
                case 3:
                  Af(d.nodeValue, c, 0 !== (a.mode & 1));
                  break;
                case 5:
                  true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
              }
            }
            f2 && (b.flags |= 4);
          } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
        }
        S(b);
        return null;
      case 13:
        E(L);
        d = b.memoizedState;
        if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
          if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f2 = false;
          else if (f2 = Gg(b), null !== d && null !== d.dehydrated) {
            if (null === a) {
              if (!f2) throw Error(p(318));
              f2 = b.memoizedState;
              f2 = null !== f2 ? f2.dehydrated : null;
              if (!f2) throw Error(p(317));
              f2[Of] = b;
            } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
            S(b);
            f2 = false;
          } else null !== zg && (Fj(zg), zg = null), f2 = true;
          if (!f2) return b.flags & 65536 ? b : null;
        }
        if (0 !== (b.flags & 128)) return b.lanes = c, b;
        d = null !== d;
        d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
        null !== b.updateQueue && (b.flags |= 4);
        S(b);
        return null;
      case 4:
        return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
      case 10:
        return ah(b.type._context), S(b), null;
      case 17:
        return Zf(b.type) && $f(), S(b), null;
      case 19:
        E(L);
        f2 = b.memoizedState;
        if (null === f2) return S(b), null;
        d = 0 !== (b.flags & 128);
        g = f2.rendering;
        if (null === g) if (d) Dj(f2, false);
        else {
          if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a; ) {
            g = Ch(a);
            if (null !== g) {
              b.flags |= 128;
              Dj(f2, false);
              d = g.updateQueue;
              null !== d && (b.updateQueue = d, b.flags |= 4);
              b.subtreeFlags = 0;
              d = c;
              for (c = b.child; null !== c; ) f2 = c, a = d, f2.flags &= 14680066, g = f2.alternate, null === g ? (f2.childLanes = 0, f2.lanes = a, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g.childLanes, f2.lanes = g.lanes, f2.child = g.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g.memoizedProps, f2.memoizedState = g.memoizedState, f2.updateQueue = g.updateQueue, f2.type = g.type, a = g.dependencies, f2.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
              G(L, L.current & 1 | 2);
              return b.child;
            }
            a = a.sibling;
          }
          null !== f2.tail && B$1() > Gj && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
        }
        else {
          if (!d) if (a = Ch(g), null !== a) {
            if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g.alternate && !I) return S(b), null;
          } else 2 * B$1() - f2.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
          f2.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f2.last, null !== c ? c.sibling = g : b.child = g, f2.last = g);
        }
        if (null !== f2.tail) return b = f2.tail, f2.rendering = b, f2.tail = b.sibling, f2.renderingStartTime = B$1(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
        S(b);
        return null;
      case 22:
      case 23:
        return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(p(156, b.tag));
  }
  function Ij(a, b) {
    wg(b);
    switch (b.tag) {
      case 1:
        return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
      case 3:
        return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
      case 5:
        return Bh(b), null;
      case 13:
        E(L);
        a = b.memoizedState;
        if (null !== a && null !== a.dehydrated) {
          if (null === b.alternate) throw Error(p(340));
          Ig();
        }
        a = b.flags;
        return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
      case 19:
        return E(L), null;
      case 4:
        return zh(), null;
      case 10:
        return ah(b.type._context), null;
      case 22:
      case 23:
        return Hj(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Jj = false, U = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
  function Lj(a, b) {
    var c = a.ref;
    if (null !== c) if ("function" === typeof c) try {
      c(null);
    } catch (d) {
      W(a, b, d);
    }
    else c.current = null;
  }
  function Mj(a, b, c) {
    try {
      c();
    } catch (d) {
      W(a, b, d);
    }
  }
  var Nj = false;
  function Oj(a, b) {
    Cf = dd;
    a = Me();
    if (Ne(a)) {
      if ("selectionStart" in a) var c = { start: a.selectionStart, end: a.selectionEnd };
      else a: {
        c = (c = a.ownerDocument) && c.defaultView || window;
        var d = c.getSelection && c.getSelection();
        if (d && 0 !== d.rangeCount) {
          c = d.anchorNode;
          var e = d.anchorOffset, f2 = d.focusNode;
          d = d.focusOffset;
          try {
            c.nodeType, f2.nodeType;
          } catch (F2) {
            c = null;
            break a;
          }
          var g = 0, h = -1, k2 = -1, l2 = 0, m2 = 0, q2 = a, r2 = null;
          b: for (; ; ) {
            for (var y2; ; ) {
              q2 !== c || 0 !== e && 3 !== q2.nodeType || (h = g + e);
              q2 !== f2 || 0 !== d && 3 !== q2.nodeType || (k2 = g + d);
              3 === q2.nodeType && (g += q2.nodeValue.length);
              if (null === (y2 = q2.firstChild)) break;
              r2 = q2;
              q2 = y2;
            }
            for (; ; ) {
              if (q2 === a) break b;
              r2 === c && ++l2 === e && (h = g);
              r2 === f2 && ++m2 === d && (k2 = g);
              if (null !== (y2 = q2.nextSibling)) break;
              q2 = r2;
              r2 = q2.parentNode;
            }
            q2 = y2;
          }
          c = -1 === h || -1 === k2 ? null : { start: h, end: k2 };
        } else c = null;
      }
      c = c || { start: 0, end: 0 };
    } else c = null;
    Df = { focusedElem: a, selectionRange: c };
    dd = false;
    for (V = b; null !== V; ) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;
    else for (; null !== V; ) {
      b = V;
      try {
        var n2 = b.alternate;
        if (0 !== (b.flags & 1024)) switch (b.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (null !== n2) {
              var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b.stateNode, w2 = x2.getSnapshotBeforeUpdate(b.elementType === b.type ? t2 : Ci(b.type, t2), J2);
              x2.__reactInternalSnapshotBeforeUpdate = w2;
            }
            break;
          case 3:
            var u2 = b.stateNode.containerInfo;
            1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(p(163));
        }
      } catch (F2) {
        W(b, b.return, F2);
      }
      a = b.sibling;
      if (null !== a) {
        a.return = b.return;
        V = a;
        break;
      }
      V = b.return;
    }
    n2 = Nj;
    Nj = false;
    return n2;
  }
  function Pj(a, b, c) {
    var d = b.updateQueue;
    d = null !== d ? d.lastEffect : null;
    if (null !== d) {
      var e = d = d.next;
      do {
        if ((e.tag & a) === a) {
          var f2 = e.destroy;
          e.destroy = void 0;
          void 0 !== f2 && Mj(b, c, f2);
        }
        e = e.next;
      } while (e !== d);
    }
  }
  function Qj(a, b) {
    b = b.updateQueue;
    b = null !== b ? b.lastEffect : null;
    if (null !== b) {
      var c = b = b.next;
      do {
        if ((c.tag & a) === a) {
          var d = c.create;
          c.destroy = d();
        }
        c = c.next;
      } while (c !== b);
    }
  }
  function Rj(a) {
    var b = a.ref;
    if (null !== b) {
      var c = a.stateNode;
      switch (a.tag) {
        case 5:
          a = c;
          break;
        default:
          a = c;
      }
      "function" === typeof b ? b(a) : b.current = a;
    }
  }
  function Sj(a) {
    var b = a.alternate;
    null !== b && (a.alternate = null, Sj(b));
    a.child = null;
    a.deletions = null;
    a.sibling = null;
    5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
    a.stateNode = null;
    a.return = null;
    a.dependencies = null;
    a.memoizedProps = null;
    a.memoizedState = null;
    a.pendingProps = null;
    a.stateNode = null;
    a.updateQueue = null;
  }
  function Tj(a) {
    return 5 === a.tag || 3 === a.tag || 4 === a.tag;
  }
  function Uj(a) {
    a: for (; ; ) {
      for (; null === a.sibling; ) {
        if (null === a.return || Tj(a.return)) return null;
        a = a.return;
      }
      a.sibling.return = a.return;
      for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
        if (a.flags & 2) continue a;
        if (null === a.child || 4 === a.tag) continue a;
        else a.child.return = a, a = a.child;
      }
      if (!(a.flags & 2)) return a.stateNode;
    }
  }
  function Vj(a, b, c) {
    var d = a.tag;
    if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
    else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c), a = a.sibling; null !== a; ) Vj(a, b, c), a = a.sibling;
  }
  function Wj(a, b, c) {
    var d = a.tag;
    if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
    else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a; ) Wj(a, b, c), a = a.sibling;
  }
  var X = null, Xj = false;
  function Yj(a, b, c) {
    for (c = c.child; null !== c; ) Zj(a, b, c), c = c.sibling;
  }
  function Zj(a, b, c) {
    if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
      lc.onCommitFiberUnmount(kc, c);
    } catch (h) {
    }
    switch (c.tag) {
      case 5:
        U || Lj(c, b);
      case 6:
        var d = X, e = Xj;
        X = null;
        Yj(a, b, c);
        X = d;
        Xj = e;
        null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
        break;
      case 18:
        null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
        break;
      case 4:
        d = X;
        e = Xj;
        X = c.stateNode.containerInfo;
        Xj = true;
        Yj(a, b, c);
        X = d;
        Xj = e;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
          e = d = d.next;
          do {
            var f2 = e, g = f2.destroy;
            f2 = f2.tag;
            void 0 !== g && (0 !== (f2 & 2) ? Mj(c, b, g) : 0 !== (f2 & 4) && Mj(c, b, g));
            e = e.next;
          } while (e !== d);
        }
        Yj(a, b, c);
        break;
      case 1:
        if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
          d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
        } catch (h) {
          W(c, b, h);
        }
        Yj(a, b, c);
        break;
      case 21:
        Yj(a, b, c);
        break;
      case 22:
        c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
        break;
      default:
        Yj(a, b, c);
    }
  }
  function ak(a) {
    var b = a.updateQueue;
    if (null !== b) {
      a.updateQueue = null;
      var c = a.stateNode;
      null === c && (c = a.stateNode = new Kj());
      b.forEach(function(b2) {
        var d = bk.bind(null, a, b2);
        c.has(b2) || (c.add(b2), b2.then(d, d));
      });
    }
  }
  function ck(a, b) {
    var c = b.deletions;
    if (null !== c) for (var d = 0; d < c.length; d++) {
      var e = c[d];
      try {
        var f2 = a, g = b, h = g;
        a: for (; null !== h; ) {
          switch (h.tag) {
            case 5:
              X = h.stateNode;
              Xj = false;
              break a;
            case 3:
              X = h.stateNode.containerInfo;
              Xj = true;
              break a;
            case 4:
              X = h.stateNode.containerInfo;
              Xj = true;
              break a;
          }
          h = h.return;
        }
        if (null === X) throw Error(p(160));
        Zj(f2, g, e);
        X = null;
        Xj = false;
        var k2 = e.alternate;
        null !== k2 && (k2.return = null);
        e.return = null;
      } catch (l2) {
        W(e, b, l2);
      }
    }
    if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a), b = b.sibling;
  }
  function dk(a, b) {
    var c = a.alternate, d = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ck(b, a);
        ek(a);
        if (d & 4) {
          try {
            Pj(3, a, a.return), Qj(3, a);
          } catch (t2) {
            W(a, a.return, t2);
          }
          try {
            Pj(5, a, a.return);
          } catch (t2) {
            W(a, a.return, t2);
          }
        }
        break;
      case 1:
        ck(b, a);
        ek(a);
        d & 512 && null !== c && Lj(c, c.return);
        break;
      case 5:
        ck(b, a);
        ek(a);
        d & 512 && null !== c && Lj(c, c.return);
        if (a.flags & 32) {
          var e = a.stateNode;
          try {
            ob(e, "");
          } catch (t2) {
            W(a, a.return, t2);
          }
        }
        if (d & 4 && (e = a.stateNode, null != e)) {
          var f2 = a.memoizedProps, g = null !== c ? c.memoizedProps : f2, h = a.type, k2 = a.updateQueue;
          a.updateQueue = null;
          if (null !== k2) try {
            "input" === h && "radio" === f2.type && null != f2.name && ab(e, f2);
            vb(h, g);
            var l2 = vb(h, f2);
            for (g = 0; g < k2.length; g += 2) {
              var m2 = k2[g], q2 = k2[g + 1];
              "style" === m2 ? sb(e, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e, q2) : "children" === m2 ? ob(e, q2) : ta(e, m2, q2, l2);
            }
            switch (h) {
              case "input":
                bb(e, f2);
                break;
              case "textarea":
                ib(e, f2);
                break;
              case "select":
                var r2 = e._wrapperState.wasMultiple;
                e._wrapperState.wasMultiple = !!f2.multiple;
                var y2 = f2.value;
                null != y2 ? fb(e, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (null != f2.defaultValue ? fb(
                  e,
                  !!f2.multiple,
                  f2.defaultValue,
                  true
                ) : fb(e, !!f2.multiple, f2.multiple ? [] : "", false));
            }
            e[Pf] = f2;
          } catch (t2) {
            W(a, a.return, t2);
          }
        }
        break;
      case 6:
        ck(b, a);
        ek(a);
        if (d & 4) {
          if (null === a.stateNode) throw Error(p(162));
          e = a.stateNode;
          f2 = a.memoizedProps;
          try {
            e.nodeValue = f2;
          } catch (t2) {
            W(a, a.return, t2);
          }
        }
        break;
      case 3:
        ck(b, a);
        ek(a);
        if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
          bd(b.containerInfo);
        } catch (t2) {
          W(a, a.return, t2);
        }
        break;
      case 4:
        ck(b, a);
        ek(a);
        break;
      case 13:
        ck(b, a);
        ek(a);
        e = a.child;
        e.flags & 8192 && (f2 = null !== e.memoizedState, e.stateNode.isHidden = f2, !f2 || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B$1()));
        d & 4 && ak(a);
        break;
      case 22:
        m2 = null !== c && null !== c.memoizedState;
        a.mode & 1 ? (U = (l2 = U) || m2, ck(b, a), U = l2) : ck(b, a);
        ek(a);
        if (d & 8192) {
          l2 = null !== a.memoizedState;
          if ((a.stateNode.isHidden = l2) && !m2 && 0 !== (a.mode & 1)) for (V = a, m2 = a.child; null !== m2; ) {
            for (q2 = V = m2; null !== V; ) {
              r2 = V;
              y2 = r2.child;
              switch (r2.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Pj(4, r2, r2.return);
                  break;
                case 1:
                  Lj(r2, r2.return);
                  var n2 = r2.stateNode;
                  if ("function" === typeof n2.componentWillUnmount) {
                    d = r2;
                    c = r2.return;
                    try {
                      b = d, n2.props = b.memoizedProps, n2.state = b.memoizedState, n2.componentWillUnmount();
                    } catch (t2) {
                      W(d, c, t2);
                    }
                  }
                  break;
                case 5:
                  Lj(r2, r2.return);
                  break;
                case 22:
                  if (null !== r2.memoizedState) {
                    gk(q2);
                    continue;
                  }
              }
              null !== y2 ? (y2.return = r2, V = y2) : gk(q2);
            }
            m2 = m2.sibling;
          }
          a: for (m2 = null, q2 = a; ; ) {
            if (5 === q2.tag) {
              if (null === m2) {
                m2 = q2;
                try {
                  e = q2.stateNode, l2 ? (f2 = e.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h = q2.stateNode, k2 = q2.memoizedProps.style, g = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h.style.display = rb("display", g));
                } catch (t2) {
                  W(a, a.return, t2);
                }
              }
            } else if (6 === q2.tag) {
              if (null === m2) try {
                q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
              } catch (t2) {
                W(a, a.return, t2);
              }
            } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a) && null !== q2.child) {
              q2.child.return = q2;
              q2 = q2.child;
              continue;
            }
            if (q2 === a) break a;
            for (; null === q2.sibling; ) {
              if (null === q2.return || q2.return === a) break a;
              m2 === q2 && (m2 = null);
              q2 = q2.return;
            }
            m2 === q2 && (m2 = null);
            q2.sibling.return = q2.return;
            q2 = q2.sibling;
          }
        }
        break;
      case 19:
        ck(b, a);
        ek(a);
        d & 4 && ak(a);
        break;
      case 21:
        break;
      default:
        ck(
          b,
          a
        ), ek(a);
    }
  }
  function ek(a) {
    var b = a.flags;
    if (b & 2) {
      try {
        a: {
          for (var c = a.return; null !== c; ) {
            if (Tj(c)) {
              var d = c;
              break a;
            }
            c = c.return;
          }
          throw Error(p(160));
        }
        switch (d.tag) {
          case 5:
            var e = d.stateNode;
            d.flags & 32 && (ob(e, ""), d.flags &= -33);
            var f2 = Uj(a);
            Wj(a, f2, e);
            break;
          case 3:
          case 4:
            var g = d.stateNode.containerInfo, h = Uj(a);
            Vj(a, h, g);
            break;
          default:
            throw Error(p(161));
        }
      } catch (k2) {
        W(a, a.return, k2);
      }
      a.flags &= -3;
    }
    b & 4096 && (a.flags &= -4097);
  }
  function hk(a, b, c) {
    V = a;
    ik(a);
  }
  function ik(a, b, c) {
    for (var d = 0 !== (a.mode & 1); null !== V; ) {
      var e = V, f2 = e.child;
      if (22 === e.tag && d) {
        var g = null !== e.memoizedState || Jj;
        if (!g) {
          var h = e.alternate, k2 = null !== h && null !== h.memoizedState || U;
          h = Jj;
          var l2 = U;
          Jj = g;
          if ((U = k2) && !l2) for (V = e; null !== V; ) g = V, k2 = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k2 ? (k2.return = g, V = k2) : jk(e);
          for (; null !== f2; ) V = f2, ik(f2), f2 = f2.sibling;
          V = e;
          Jj = h;
          U = l2;
        }
        kk(a);
      } else 0 !== (e.subtreeFlags & 8772) && null !== f2 ? (f2.return = e, V = f2) : kk(a);
    }
  }
  function kk(a) {
    for (; null !== V; ) {
      var b = V;
      if (0 !== (b.flags & 8772)) {
        var c = b.alternate;
        try {
          if (0 !== (b.flags & 8772)) switch (b.tag) {
            case 0:
            case 11:
            case 15:
              U || Qj(5, b);
              break;
            case 1:
              var d = b.stateNode;
              if (b.flags & 4 && !U) if (null === c) d.componentDidMount();
              else {
                var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
                d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
              }
              var f2 = b.updateQueue;
              null !== f2 && sh(b, f2, d);
              break;
            case 3:
              var g = b.updateQueue;
              if (null !== g) {
                c = null;
                if (null !== b.child) switch (b.child.tag) {
                  case 5:
                    c = b.child.stateNode;
                    break;
                  case 1:
                    c = b.child.stateNode;
                }
                sh(b, g, c);
              }
              break;
            case 5:
              var h = b.stateNode;
              if (null === c && b.flags & 4) {
                c = h;
                var k2 = b.memoizedProps;
                switch (b.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    k2.autoFocus && c.focus();
                    break;
                  case "img":
                    k2.src && (c.src = k2.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (null === b.memoizedState) {
                var l2 = b.alternate;
                if (null !== l2) {
                  var m2 = l2.memoizedState;
                  if (null !== m2) {
                    var q2 = m2.dehydrated;
                    null !== q2 && bd(q2);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(p(163));
          }
          U || b.flags & 512 && Rj(b);
        } catch (r2) {
          W(b, b.return, r2);
        }
      }
      if (b === a) {
        V = null;
        break;
      }
      c = b.sibling;
      if (null !== c) {
        c.return = b.return;
        V = c;
        break;
      }
      V = b.return;
    }
  }
  function gk(a) {
    for (; null !== V; ) {
      var b = V;
      if (b === a) {
        V = null;
        break;
      }
      var c = b.sibling;
      if (null !== c) {
        c.return = b.return;
        V = c;
        break;
      }
      V = b.return;
    }
  }
  function jk(a) {
    for (; null !== V; ) {
      var b = V;
      try {
        switch (b.tag) {
          case 0:
          case 11:
          case 15:
            var c = b.return;
            try {
              Qj(4, b);
            } catch (k2) {
              W(b, c, k2);
            }
            break;
          case 1:
            var d = b.stateNode;
            if ("function" === typeof d.componentDidMount) {
              var e = b.return;
              try {
                d.componentDidMount();
              } catch (k2) {
                W(b, e, k2);
              }
            }
            var f2 = b.return;
            try {
              Rj(b);
            } catch (k2) {
              W(b, f2, k2);
            }
            break;
          case 5:
            var g = b.return;
            try {
              Rj(b);
            } catch (k2) {
              W(b, g, k2);
            }
        }
      } catch (k2) {
        W(b, b.return, k2);
      }
      if (b === a) {
        V = null;
        break;
      }
      var h = b.sibling;
      if (null !== h) {
        h.return = b.return;
        V = h;
        break;
      }
      V = b.return;
    }
  }
  var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q = null, Y = null, Z = 0, fj = 0, ej = Uf(0), T = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
  function R() {
    return 0 !== (K & 6) ? B$1() : -1 !== Ak ? Ak : Ak = B$1();
  }
  function yi(a) {
    if (0 === (a.mode & 1)) return 1;
    if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
    if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
    a = C;
    if (0 !== a) return a;
    a = window.event;
    a = void 0 === a ? 16 : jd(a.type);
    return a;
  }
  function gi(a, b, c, d) {
    if (50 < yk) throw yk = 0, zk = null, Error(p(185));
    Ac(a, c, d);
    if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B$1() + 500, fg && jg());
  }
  function Dk(a, b) {
    var c = a.callbackNode;
    wc(a, b);
    var d = uc(a, a === Q ? Z : 0);
    if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
    else if (b = d & -d, a.callbackPriority !== b) {
      null != c && bc(c);
      if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
        0 === (K & 6) && jg();
      }), c = null;
      else {
        switch (Dc(d)) {
          case 1:
            c = fc;
            break;
          case 4:
            c = gc;
            break;
          case 16:
            c = hc;
            break;
          case 536870912:
            c = jc;
            break;
          default:
            c = hc;
        }
        c = Fk(c, Gk.bind(null, a));
      }
      a.callbackPriority = b;
      a.callbackNode = c;
    }
  }
  function Gk(a, b) {
    Ak = -1;
    Bk = 0;
    if (0 !== (K & 6)) throw Error(p(327));
    var c = a.callbackNode;
    if (Hk() && a.callbackNode !== c) return null;
    var d = uc(a, a === Q ? Z : 0);
    if (0 === d) return null;
    if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
    else {
      b = d;
      var e = K;
      K |= 2;
      var f2 = Jk();
      if (Q !== a || Z !== b) uk = null, Gj = B$1() + 500, Kk(a, b);
      do
        try {
          Lk();
          break;
        } catch (h) {
          Mk(a, h);
        }
      while (1);
      $g();
      mk.current = f2;
      K = e;
      null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
    }
    if (0 !== b) {
      2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
      if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B$1()), c;
      if (6 === b) Ck(a, d);
      else {
        e = a.current.alternate;
        if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f2 = xc(a), 0 !== f2 && (d = f2, b = Nk(a, f2))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B$1()), c;
        a.finishedWork = e;
        a.finishedLanes = d;
        switch (b) {
          case 0:
          case 1:
            throw Error(p(345));
          case 2:
            Pk(a, tk, uk);
            break;
          case 3:
            Ck(a, d);
            if ((d & 130023424) === d && (b = fk + 500 - B$1(), 10 < b)) {
              if (0 !== uc(a, 0)) break;
              e = a.suspendedLanes;
              if ((e & d) !== d) {
                R();
                a.pingedLanes |= a.suspendedLanes & e;
                break;
              }
              a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
              break;
            }
            Pk(a, tk, uk);
            break;
          case 4:
            Ck(a, d);
            if ((d & 4194240) === d) break;
            b = a.eventTimes;
            for (e = -1; 0 < d; ) {
              var g = 31 - oc(d);
              f2 = 1 << g;
              g = b[g];
              g > e && (e = g);
              d &= ~f2;
            }
            d = e;
            d = B$1() - d;
            d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
            if (10 < d) {
              a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
              break;
            }
            Pk(a, tk, uk);
            break;
          case 5:
            Pk(a, tk, uk);
            break;
          default:
            throw Error(p(329));
        }
      }
    }
    Dk(a, B$1());
    return a.callbackNode === c ? Gk.bind(null, a) : null;
  }
  function Nk(a, b) {
    var c = sk;
    a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
    a = Ik(a, b);
    2 !== a && (b = tk, tk = c, null !== b && Fj(b));
    return a;
  }
  function Fj(a) {
    null === tk ? tk = a : tk.push.apply(tk, a);
  }
  function Ok(a) {
    for (var b = a; ; ) {
      if (b.flags & 16384) {
        var c = b.updateQueue;
        if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
          var e = c[d], f2 = e.getSnapshot;
          e = e.value;
          try {
            if (!He(f2(), e)) return false;
          } catch (g) {
            return false;
          }
        }
      }
      c = b.child;
      if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
      else {
        if (b === a) break;
        for (; null === b.sibling; ) {
          if (null === b.return || b.return === a) return true;
          b = b.return;
        }
        b.sibling.return = b.return;
        b = b.sibling;
      }
    }
    return true;
  }
  function Ck(a, b) {
    b &= ~rk;
    b &= ~qk;
    a.suspendedLanes |= b;
    a.pingedLanes &= ~b;
    for (a = a.expirationTimes; 0 < b; ) {
      var c = 31 - oc(b), d = 1 << c;
      a[c] = -1;
      b &= ~d;
    }
  }
  function Ek(a) {
    if (0 !== (K & 6)) throw Error(p(327));
    Hk();
    var b = uc(a, 0);
    if (0 === (b & 1)) return Dk(a, B$1()), null;
    var c = Ik(a, b);
    if (0 !== a.tag && 2 === c) {
      var d = xc(a);
      0 !== d && (b = d, c = Nk(a, d));
    }
    if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B$1()), c;
    if (6 === c) throw Error(p(345));
    a.finishedWork = a.current.alternate;
    a.finishedLanes = b;
    Pk(a, tk, uk);
    Dk(a, B$1());
    return null;
  }
  function Qk(a, b) {
    var c = K;
    K |= 1;
    try {
      return a(b);
    } finally {
      K = c, 0 === K && (Gj = B$1() + 500, fg && jg());
    }
  }
  function Rk(a) {
    null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
    var b = K;
    K |= 1;
    var c = ok.transition, d = C;
    try {
      if (ok.transition = null, C = 1, a) return a();
    } finally {
      C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
    }
  }
  function Hj() {
    fj = ej.current;
    E(ej);
  }
  function Kk(a, b) {
    a.finishedWork = null;
    a.finishedLanes = 0;
    var c = a.timeoutHandle;
    -1 !== c && (a.timeoutHandle = -1, Gf(c));
    if (null !== Y) for (c = Y.return; null !== c; ) {
      var d = c;
      wg(d);
      switch (d.tag) {
        case 1:
          d = d.type.childContextTypes;
          null !== d && void 0 !== d && $f();
          break;
        case 3:
          zh();
          E(Wf);
          E(H);
          Eh();
          break;
        case 5:
          Bh(d);
          break;
        case 4:
          zh();
          break;
        case 13:
          E(L);
          break;
        case 19:
          E(L);
          break;
        case 10:
          ah(d.type._context);
          break;
        case 22:
        case 23:
          Hj();
      }
      c = c.return;
    }
    Q = a;
    Y = a = Pg(a.current, null);
    Z = fj = b;
    T = 0;
    pk = null;
    rk = qk = rh = 0;
    tk = sk = null;
    if (null !== fh) {
      for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
        c.interleaved = null;
        var e = d.next, f2 = c.pending;
        if (null !== f2) {
          var g = f2.next;
          f2.next = e;
          d.next = g;
        }
        c.pending = d;
      }
      fh = null;
    }
    return a;
  }
  function Mk(a, b) {
    do {
      var c = Y;
      try {
        $g();
        Fh.current = Rh;
        if (Ih) {
          for (var d = M.memoizedState; null !== d; ) {
            var e = d.queue;
            null !== e && (e.pending = null);
            d = d.next;
          }
          Ih = false;
        }
        Hh = 0;
        O = N = M = null;
        Jh = false;
        Kh = 0;
        nk.current = null;
        if (null === c || null === c.return) {
          T = 1;
          pk = b;
          Y = null;
          break;
        }
        a: {
          var f2 = a, g = c.return, h = c, k2 = b;
          b = Z;
          h.flags |= 32768;
          if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
            var l2 = k2, m2 = h, q2 = m2.tag;
            if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
              var r2 = m2.alternate;
              r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
            }
            var y2 = Ui(g);
            if (null !== y2) {
              y2.flags &= -257;
              Vi(y2, g, h, f2, b);
              y2.mode & 1 && Si(f2, l2, b);
              b = y2;
              k2 = l2;
              var n2 = b.updateQueue;
              if (null === n2) {
                var t2 = /* @__PURE__ */ new Set();
                t2.add(k2);
                b.updateQueue = t2;
              } else n2.add(k2);
              break a;
            } else {
              if (0 === (b & 1)) {
                Si(f2, l2, b);
                tj();
                break a;
              }
              k2 = Error(p(426));
            }
          } else if (I && h.mode & 1) {
            var J2 = Ui(g);
            if (null !== J2) {
              0 === (J2.flags & 65536) && (J2.flags |= 256);
              Vi(J2, g, h, f2, b);
              Jg(Ji(k2, h));
              break a;
            }
          }
          f2 = k2 = Ji(k2, h);
          4 !== T && (T = 2);
          null === sk ? sk = [f2] : sk.push(f2);
          f2 = g;
          do {
            switch (f2.tag) {
              case 3:
                f2.flags |= 65536;
                b &= -b;
                f2.lanes |= b;
                var x2 = Ni(f2, k2, b);
                ph(f2, x2);
                break a;
              case 1:
                h = k2;
                var w2 = f2.type, u2 = f2.stateNode;
                if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri || !Ri.has(u2)))) {
                  f2.flags |= 65536;
                  b &= -b;
                  f2.lanes |= b;
                  var F2 = Qi(f2, h, b);
                  ph(f2, F2);
                  break a;
                }
            }
            f2 = f2.return;
          } while (null !== f2);
        }
        Sk(c);
      } catch (na) {
        b = na;
        Y === c && null !== c && (Y = c = c.return);
        continue;
      }
      break;
    } while (1);
  }
  function Jk() {
    var a = mk.current;
    mk.current = Rh;
    return null === a ? Rh : a;
  }
  function tj() {
    if (0 === T || 3 === T || 2 === T) T = 4;
    null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
  }
  function Ik(a, b) {
    var c = K;
    K |= 2;
    var d = Jk();
    if (Q !== a || Z !== b) uk = null, Kk(a, b);
    do
      try {
        Tk();
        break;
      } catch (e) {
        Mk(a, e);
      }
    while (1);
    $g();
    K = c;
    mk.current = d;
    if (null !== Y) throw Error(p(261));
    Q = null;
    Z = 0;
    return T;
  }
  function Tk() {
    for (; null !== Y; ) Uk(Y);
  }
  function Lk() {
    for (; null !== Y && !cc(); ) Uk(Y);
  }
  function Uk(a) {
    var b = Vk(a.alternate, a, fj);
    a.memoizedProps = a.pendingProps;
    null === b ? Sk(a) : Y = b;
    nk.current = null;
  }
  function Sk(a) {
    var b = a;
    do {
      var c = b.alternate;
      a = b.return;
      if (0 === (b.flags & 32768)) {
        if (c = Ej(c, b, fj), null !== c) {
          Y = c;
          return;
        }
      } else {
        c = Ij(c, b);
        if (null !== c) {
          c.flags &= 32767;
          Y = c;
          return;
        }
        if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
        else {
          T = 6;
          Y = null;
          return;
        }
      }
      b = b.sibling;
      if (null !== b) {
        Y = b;
        return;
      }
      Y = b = a;
    } while (null !== b);
    0 === T && (T = 5);
  }
  function Pk(a, b, c) {
    var d = C, e = ok.transition;
    try {
      ok.transition = null, C = 1, Wk(a, b, c, d);
    } finally {
      ok.transition = e, C = d;
    }
    return null;
  }
  function Wk(a, b, c, d) {
    do
      Hk();
    while (null !== wk);
    if (0 !== (K & 6)) throw Error(p(327));
    c = a.finishedWork;
    var e = a.finishedLanes;
    if (null === c) return null;
    a.finishedWork = null;
    a.finishedLanes = 0;
    if (c === a.current) throw Error(p(177));
    a.callbackNode = null;
    a.callbackPriority = 0;
    var f2 = c.lanes | c.childLanes;
    Bc(a, f2);
    a === Q && (Y = Q = null, Z = 0);
    0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
      Hk();
      return null;
    }));
    f2 = 0 !== (c.flags & 15990);
    if (0 !== (c.subtreeFlags & 15990) || f2) {
      f2 = ok.transition;
      ok.transition = null;
      var g = C;
      C = 1;
      var h = K;
      K |= 4;
      nk.current = null;
      Oj(a, c);
      dk(c, a);
      Oe(Df);
      dd = !!Cf;
      Df = Cf = null;
      a.current = c;
      hk(c);
      dc();
      K = h;
      C = g;
      ok.transition = f2;
    } else a.current = c;
    vk && (vk = false, wk = a, xk = e);
    f2 = a.pendingLanes;
    0 === f2 && (Ri = null);
    mc(c.stateNode);
    Dk(a, B$1());
    if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
    if (Oi) throw Oi = false, a = Pi, Pi = null, a;
    0 !== (xk & 1) && 0 !== a.tag && Hk();
    f2 = a.pendingLanes;
    0 !== (f2 & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
    jg();
    return null;
  }
  function Hk() {
    if (null !== wk) {
      var a = Dc(xk), b = ok.transition, c = C;
      try {
        ok.transition = null;
        C = 16 > a ? 16 : a;
        if (null === wk) var d = false;
        else {
          a = wk;
          wk = null;
          xk = 0;
          if (0 !== (K & 6)) throw Error(p(331));
          var e = K;
          K |= 4;
          for (V = a.current; null !== V; ) {
            var f2 = V, g = f2.child;
            if (0 !== (V.flags & 16)) {
              var h = f2.deletions;
              if (null !== h) {
                for (var k2 = 0; k2 < h.length; k2++) {
                  var l2 = h[k2];
                  for (V = l2; null !== V; ) {
                    var m2 = V;
                    switch (m2.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Pj(8, m2, f2);
                    }
                    var q2 = m2.child;
                    if (null !== q2) q2.return = m2, V = q2;
                    else for (; null !== V; ) {
                      m2 = V;
                      var r2 = m2.sibling, y2 = m2.return;
                      Sj(m2);
                      if (m2 === l2) {
                        V = null;
                        break;
                      }
                      if (null !== r2) {
                        r2.return = y2;
                        V = r2;
                        break;
                      }
                      V = y2;
                    }
                  }
                }
                var n2 = f2.alternate;
                if (null !== n2) {
                  var t2 = n2.child;
                  if (null !== t2) {
                    n2.child = null;
                    do {
                      var J2 = t2.sibling;
                      t2.sibling = null;
                      t2 = J2;
                    } while (null !== t2);
                  }
                }
                V = f2;
              }
            }
            if (0 !== (f2.subtreeFlags & 2064) && null !== g) g.return = f2, V = g;
            else b: for (; null !== V; ) {
              f2 = V;
              if (0 !== (f2.flags & 2048)) switch (f2.tag) {
                case 0:
                case 11:
                case 15:
                  Pj(9, f2, f2.return);
              }
              var x2 = f2.sibling;
              if (null !== x2) {
                x2.return = f2.return;
                V = x2;
                break b;
              }
              V = f2.return;
            }
          }
          var w2 = a.current;
          for (V = w2; null !== V; ) {
            g = V;
            var u2 = g.child;
            if (0 !== (g.subtreeFlags & 2064) && null !== u2) u2.return = g, V = u2;
            else b: for (g = w2; null !== V; ) {
              h = V;
              if (0 !== (h.flags & 2048)) try {
                switch (h.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Qj(9, h);
                }
              } catch (na) {
                W(h, h.return, na);
              }
              if (h === g) {
                V = null;
                break b;
              }
              var F2 = h.sibling;
              if (null !== F2) {
                F2.return = h.return;
                V = F2;
                break b;
              }
              V = h.return;
            }
          }
          K = e;
          jg();
          if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
            lc.onPostCommitFiberRoot(kc, a);
          } catch (na) {
          }
          d = true;
        }
        return d;
      } finally {
        C = c, ok.transition = b;
      }
    }
    return false;
  }
  function Xk(a, b, c) {
    b = Ji(c, b);
    b = Ni(a, b, 1);
    a = nh(a, b, 1);
    b = R();
    null !== a && (Ac(a, 1, b), Dk(a, b));
  }
  function W(a, b, c) {
    if (3 === a.tag) Xk(a, a, c);
    else for (; null !== b; ) {
      if (3 === b.tag) {
        Xk(b, a, c);
        break;
      } else if (1 === b.tag) {
        var d = b.stateNode;
        if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
          a = Ji(c, a);
          a = Qi(b, a, 1);
          b = nh(b, a, 1);
          a = R();
          null !== b && (Ac(b, 1, a), Dk(b, a));
          break;
        }
      }
      b = b.return;
    }
  }
  function Ti(a, b, c) {
    var d = a.pingCache;
    null !== d && d.delete(b);
    b = R();
    a.pingedLanes |= a.suspendedLanes & c;
    Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B$1() - fk ? Kk(a, 0) : rk |= c);
    Dk(a, b);
  }
  function Yk(a, b) {
    0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
    var c = R();
    a = ih(a, b);
    null !== a && (Ac(a, b, c), Dk(a, c));
  }
  function uj(a) {
    var b = a.memoizedState, c = 0;
    null !== b && (c = b.retryLane);
    Yk(a, c);
  }
  function bk(a, b) {
    var c = 0;
    switch (a.tag) {
      case 13:
        var d = a.stateNode;
        var e = a.memoizedState;
        null !== e && (c = e.retryLane);
        break;
      case 19:
        d = a.stateNode;
        break;
      default:
        throw Error(p(314));
    }
    null !== d && d.delete(b);
    Yk(a, c);
  }
  var Vk;
  Vk = function(a, b, c) {
    if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = true;
    else {
      if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return dh = false, yj(a, b, c);
      dh = 0 !== (a.flags & 131072) ? true : false;
    }
    else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
    b.lanes = 0;
    switch (b.tag) {
      case 2:
        var d = b.type;
        ij(a, b);
        a = b.pendingProps;
        var e = Yf(b, H.current);
        ch(b, c);
        e = Nh(null, b, d, a, e, c);
        var f2 = Sh();
        b.flags |= 1;
        "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f2 = true, cg(b)) : f2 = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f2, c)) : (b.tag = 0, I && f2 && vg(b), Xi(null, b, e, c), b = b.child);
        return b;
      case 16:
        d = b.elementType;
        a: {
          ij(a, b);
          a = b.pendingProps;
          e = d._init;
          d = e(d._payload);
          b.type = d;
          e = b.tag = Zk(d);
          a = Ci(d, a);
          switch (e) {
            case 0:
              b = cj(null, b, d, a, c);
              break a;
            case 1:
              b = hj(null, b, d, a, c);
              break a;
            case 11:
              b = Yi(null, b, d, a, c);
              break a;
            case 14:
              b = $i(null, b, d, Ci(d.type, a), c);
              break a;
          }
          throw Error(p(
            306,
            d,
            ""
          ));
        }
        return b;
      case 0:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
      case 1:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
      case 3:
        a: {
          kj(b);
          if (null === a) throw Error(p(387));
          d = b.pendingProps;
          f2 = b.memoizedState;
          e = f2.element;
          lh(a, b);
          qh(b, d, null, c);
          var g = b.memoizedState;
          d = g.element;
          if (f2.isDehydrated) if (f2 = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f2, b.memoizedState = f2, b.flags & 256) {
            e = Ji(Error(p(423)), b);
            b = lj(a, b, d, c, e);
            break a;
          } else if (d !== e) {
            e = Ji(Error(p(424)), b);
            b = lj(a, b, d, c, e);
            break a;
          } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling;
          else {
            Ig();
            if (d === e) {
              b = Zi(a, b, c);
              break a;
            }
            Xi(a, b, d, c);
          }
          b = b.child;
        }
        return b;
      case 5:
        return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f2 = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f2 && Ef(d, f2) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
      case 6:
        return null === a && Eg(b), null;
      case 13:
        return oj(a, b, c);
      case 4:
        return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
      case 11:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
      case 7:
        return Xi(a, b, b.pendingProps, c), b.child;
      case 8:
        return Xi(a, b, b.pendingProps.children, c), b.child;
      case 12:
        return Xi(a, b, b.pendingProps.children, c), b.child;
      case 10:
        a: {
          d = b.type._context;
          e = b.pendingProps;
          f2 = b.memoizedProps;
          g = e.value;
          G(Wg, d._currentValue);
          d._currentValue = g;
          if (null !== f2) if (He(f2.value, g)) {
            if (f2.children === e.children && !Wf.current) {
              b = Zi(a, b, c);
              break a;
            }
          } else for (f2 = b.child, null !== f2 && (f2.return = b); null !== f2; ) {
            var h = f2.dependencies;
            if (null !== h) {
              g = f2.child;
              for (var k2 = h.firstContext; null !== k2; ) {
                if (k2.context === d) {
                  if (1 === f2.tag) {
                    k2 = mh(-1, c & -c);
                    k2.tag = 2;
                    var l2 = f2.updateQueue;
                    if (null !== l2) {
                      l2 = l2.shared;
                      var m2 = l2.pending;
                      null === m2 ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                      l2.pending = k2;
                    }
                  }
                  f2.lanes |= c;
                  k2 = f2.alternate;
                  null !== k2 && (k2.lanes |= c);
                  bh(
                    f2.return,
                    c,
                    b
                  );
                  h.lanes |= c;
                  break;
                }
                k2 = k2.next;
              }
            } else if (10 === f2.tag) g = f2.type === b.type ? null : f2.child;
            else if (18 === f2.tag) {
              g = f2.return;
              if (null === g) throw Error(p(341));
              g.lanes |= c;
              h = g.alternate;
              null !== h && (h.lanes |= c);
              bh(g, c, b);
              g = f2.sibling;
            } else g = f2.child;
            if (null !== g) g.return = f2;
            else for (g = f2; null !== g; ) {
              if (g === b) {
                g = null;
                break;
              }
              f2 = g.sibling;
              if (null !== f2) {
                f2.return = g.return;
                g = f2;
                break;
              }
              g = g.return;
            }
            f2 = g;
          }
          Xi(a, b, e.children, c);
          b = b.child;
        }
        return b;
      case 9:
        return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
      case 14:
        return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
      case 15:
        return bj(a, b, b.type, b.pendingProps, c);
      case 17:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, true, a, c);
      case 19:
        return xj(a, b, c);
      case 22:
        return dj(a, b, c);
    }
    throw Error(p(156, b.tag));
  };
  function Fk(a, b) {
    return ac(a, b);
  }
  function $k(a, b, c, d) {
    this.tag = a;
    this.key = c;
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
    this.index = 0;
    this.ref = null;
    this.pendingProps = b;
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
    this.mode = d;
    this.subtreeFlags = this.flags = 0;
    this.deletions = null;
    this.childLanes = this.lanes = 0;
    this.alternate = null;
  }
  function Bg(a, b, c, d) {
    return new $k(a, b, c, d);
  }
  function aj(a) {
    a = a.prototype;
    return !(!a || !a.isReactComponent);
  }
  function Zk(a) {
    if ("function" === typeof a) return aj(a) ? 1 : 0;
    if (void 0 !== a && null !== a) {
      a = a.$$typeof;
      if (a === Da) return 11;
      if (a === Ga) return 14;
    }
    return 2;
  }
  function Pg(a, b) {
    var c = a.alternate;
    null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
    c.flags = a.flags & 14680064;
    c.childLanes = a.childLanes;
    c.lanes = a.lanes;
    c.child = a.child;
    c.memoizedProps = a.memoizedProps;
    c.memoizedState = a.memoizedState;
    c.updateQueue = a.updateQueue;
    b = a.dependencies;
    c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
    c.sibling = a.sibling;
    c.index = a.index;
    c.ref = a.ref;
    return c;
  }
  function Rg(a, b, c, d, e, f2) {
    var g = 2;
    d = a;
    if ("function" === typeof a) aj(a) && (g = 1);
    else if ("string" === typeof a) g = 5;
    else a: switch (a) {
      case ya:
        return Tg(c.children, e, f2, b);
      case za:
        g = 8;
        e |= 8;
        break;
      case Aa:
        return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f2, a;
      case Ea:
        return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f2, a;
      case Fa:
        return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f2, a;
      case Ia:
        return pj(c, e, f2, b);
      default:
        if ("object" === typeof a && null !== a) switch (a.$$typeof) {
          case Ba:
            g = 10;
            break a;
          case Ca:
            g = 9;
            break a;
          case Da:
            g = 11;
            break a;
          case Ga:
            g = 14;
            break a;
          case Ha:
            g = 16;
            d = null;
            break a;
        }
        throw Error(p(130, null == a ? a : typeof a, ""));
    }
    b = Bg(g, c, b, e);
    b.elementType = a;
    b.type = d;
    b.lanes = f2;
    return b;
  }
  function Tg(a, b, c, d) {
    a = Bg(7, a, d, b);
    a.lanes = c;
    return a;
  }
  function pj(a, b, c, d) {
    a = Bg(22, a, d, b);
    a.elementType = Ia;
    a.lanes = c;
    a.stateNode = { isHidden: false };
    return a;
  }
  function Qg(a, b, c) {
    a = Bg(6, a, null, b);
    a.lanes = c;
    return a;
  }
  function Sg(a, b, c) {
    b = Bg(4, null !== a.children ? a.children : [], a.key, b);
    b.lanes = c;
    b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
    return b;
  }
  function al(a, b, c, d, e) {
    this.tag = b;
    this.containerInfo = a;
    this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
    this.timeoutHandle = -1;
    this.callbackNode = this.pendingContext = this.context = null;
    this.callbackPriority = 0;
    this.eventTimes = zc(0);
    this.expirationTimes = zc(-1);
    this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
    this.entanglements = zc(0);
    this.identifierPrefix = d;
    this.onRecoverableError = e;
    this.mutableSourceEagerHydrationData = null;
  }
  function bl(a, b, c, d, e, f2, g, h, k2) {
    a = new al(a, b, c, h, k2);
    1 === b ? (b = 1, true === f2 && (b |= 8)) : b = 0;
    f2 = Bg(3, null, null, b);
    a.current = f2;
    f2.stateNode = a;
    f2.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
    kh(f2);
    return a;
  }
  function cl(a, b, c) {
    var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
    return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
  }
  function dl(a) {
    if (!a) return Vf;
    a = a._reactInternals;
    a: {
      if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
      var b = a;
      do {
        switch (b.tag) {
          case 3:
            b = b.stateNode.context;
            break a;
          case 1:
            if (Zf(b.type)) {
              b = b.stateNode.__reactInternalMemoizedMergedChildContext;
              break a;
            }
        }
        b = b.return;
      } while (null !== b);
      throw Error(p(171));
    }
    if (1 === a.tag) {
      var c = a.type;
      if (Zf(c)) return bg(a, c, b);
    }
    return b;
  }
  function el(a, b, c, d, e, f2, g, h, k2) {
    a = bl(c, d, true, a, e, f2, g, h, k2);
    a.context = dl(null);
    c = a.current;
    d = R();
    e = yi(c);
    f2 = mh(d, e);
    f2.callback = void 0 !== b && null !== b ? b : null;
    nh(c, f2, e);
    a.current.lanes = e;
    Ac(a, e, d);
    Dk(a, d);
    return a;
  }
  function fl(a, b, c, d) {
    var e = b.current, f2 = R(), g = yi(e);
    c = dl(c);
    null === b.context ? b.context = c : b.pendingContext = c;
    b = mh(f2, g);
    b.payload = { element: a };
    d = void 0 === d ? null : d;
    null !== d && (b.callback = d);
    a = nh(e, b, g);
    null !== a && (gi(a, e, g, f2), oh(a, e, g));
    return g;
  }
  function gl(a) {
    a = a.current;
    if (!a.child) return null;
    switch (a.child.tag) {
      case 5:
        return a.child.stateNode;
      default:
        return a.child.stateNode;
    }
  }
  function hl(a, b) {
    a = a.memoizedState;
    if (null !== a && null !== a.dehydrated) {
      var c = a.retryLane;
      a.retryLane = 0 !== c && c < b ? c : b;
    }
  }
  function il(a, b) {
    hl(a, b);
    (a = a.alternate) && hl(a, b);
  }
  function jl() {
    return null;
  }
  var kl = "function" === typeof reportError ? reportError : function(a) {
    console.error(a);
  };
  function ll(a) {
    this._internalRoot = a;
  }
  ml.prototype.render = ll.prototype.render = function(a) {
    var b = this._internalRoot;
    if (null === b) throw Error(p(409));
    fl(a, b, null, null);
  };
  ml.prototype.unmount = ll.prototype.unmount = function() {
    var a = this._internalRoot;
    if (null !== a) {
      this._internalRoot = null;
      var b = a.containerInfo;
      Rk(function() {
        fl(null, a, null, null);
      });
      b[uf] = null;
    }
  };
  function ml(a) {
    this._internalRoot = a;
  }
  ml.prototype.unstable_scheduleHydration = function(a) {
    if (a) {
      var b = Hc();
      a = { blockedOn: null, target: a, priority: b };
      for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) ;
      Qc.splice(c, 0, a);
      0 === c && Vc(a);
    }
  };
  function nl(a) {
    return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
  }
  function ol(a) {
    return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
  }
  function pl() {
  }
  function ql(a, b, c, d, e) {
    if (e) {
      if ("function" === typeof d) {
        var f2 = d;
        d = function() {
          var a2 = gl(g);
          f2.call(a2);
        };
      }
      var g = el(b, d, a, 0, null, false, false, "", pl);
      a._reactRootContainer = g;
      a[uf] = g.current;
      sf(8 === a.nodeType ? a.parentNode : a);
      Rk();
      return g;
    }
    for (; e = a.lastChild; ) a.removeChild(e);
    if ("function" === typeof d) {
      var h = d;
      d = function() {
        var a2 = gl(k2);
        h.call(a2);
      };
    }
    var k2 = bl(a, 0, false, null, null, false, false, "", pl);
    a._reactRootContainer = k2;
    a[uf] = k2.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    Rk(function() {
      fl(b, k2, c, d);
    });
    return k2;
  }
  function rl(a, b, c, d, e) {
    var f2 = c._reactRootContainer;
    if (f2) {
      var g = f2;
      if ("function" === typeof e) {
        var h = e;
        e = function() {
          var a2 = gl(g);
          h.call(a2);
        };
      }
      fl(b, g, a, e);
    } else g = ql(c, b, a, e, d);
    return gl(g);
  }
  Ec = function(a) {
    switch (a.tag) {
      case 3:
        var b = a.stateNode;
        if (b.current.memoizedState.isDehydrated) {
          var c = tc(b.pendingLanes);
          0 !== c && (Cc(b, c | 1), Dk(b, B$1()), 0 === (K & 6) && (Gj = B$1() + 500, jg()));
        }
        break;
      case 13:
        Rk(function() {
          var b2 = ih(a, 1);
          if (null !== b2) {
            var c2 = R();
            gi(b2, a, 1, c2);
          }
        }), il(a, 1);
    }
  };
  Fc = function(a) {
    if (13 === a.tag) {
      var b = ih(a, 134217728);
      if (null !== b) {
        var c = R();
        gi(b, a, 134217728, c);
      }
      il(a, 134217728);
    }
  };
  Gc = function(a) {
    if (13 === a.tag) {
      var b = yi(a), c = ih(a, b);
      if (null !== c) {
        var d = R();
        gi(c, a, b, d);
      }
      il(a, b);
    }
  };
  Hc = function() {
    return C;
  };
  Ic = function(a, b) {
    var c = C;
    try {
      return C = a, b();
    } finally {
      C = c;
    }
  };
  yb = function(a, b, c) {
    switch (b) {
      case "input":
        bb(a, c);
        b = c.name;
        if ("radio" === c.type && null != b) {
          for (c = a; c.parentNode; ) c = c.parentNode;
          c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
          for (b = 0; b < c.length; b++) {
            var d = c[b];
            if (d !== a && d.form === a.form) {
              var e = Db(d);
              if (!e) throw Error(p(90));
              Wa(d);
              bb(d, e);
            }
          }
        }
        break;
      case "textarea":
        ib(a, c);
        break;
      case "select":
        b = c.value, null != b && fb(a, !!c.multiple, b, false);
    }
  };
  Gb = Qk;
  Hb = Rk;
  var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
  var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
    a = Zb(a);
    return null === a ? null : a.stateNode;
  }, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
    var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!vl.isDisabled && vl.supportsFiber) try {
      kc = vl.inject(ul), lc = vl;
    } catch (a) {
    }
  }
  reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
  reactDom_production_min.createPortal = function(a, b) {
    var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
    if (!nl(b)) throw Error(p(200));
    return cl(a, b, null, c);
  };
  reactDom_production_min.createRoot = function(a, b) {
    if (!nl(a)) throw Error(p(299));
    var c = false, d = "", e = kl;
    null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
    b = bl(a, 1, false, null, null, c, false, d, e);
    a[uf] = b.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    return new ll(b);
  };
  reactDom_production_min.findDOMNode = function(a) {
    if (null == a) return null;
    if (1 === a.nodeType) return a;
    var b = a._reactInternals;
    if (void 0 === b) {
      if ("function" === typeof a.render) throw Error(p(188));
      a = Object.keys(a).join(",");
      throw Error(p(268, a));
    }
    a = Zb(b);
    a = null === a ? null : a.stateNode;
    return a;
  };
  reactDom_production_min.flushSync = function(a) {
    return Rk(a);
  };
  reactDom_production_min.hydrate = function(a, b, c) {
    if (!ol(b)) throw Error(p(200));
    return rl(null, a, b, true, c);
  };
  reactDom_production_min.hydrateRoot = function(a, b, c) {
    if (!nl(a)) throw Error(p(405));
    var d = null != c && c.hydratedSources || null, e = false, f2 = "", g = kl;
    null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f2 = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
    b = el(b, null, a, 1, null != c ? c : null, e, false, f2, g);
    a[uf] = b.current;
    sf(a);
    if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
      c,
      e
    );
    return new ml(b);
  };
  reactDom_production_min.render = function(a, b, c) {
    if (!ol(b)) throw Error(p(200));
    return rl(null, a, b, false, c);
  };
  reactDom_production_min.unmountComponentAtNode = function(a) {
    if (!ol(a)) throw Error(p(40));
    return a._reactRootContainer ? (Rk(function() {
      rl(null, null, a, false, function() {
        a._reactRootContainer = null;
        a[uf] = null;
      });
    }), true) : false;
  };
  reactDom_production_min.unstable_batchedUpdates = Qk;
  reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
    if (!ol(c)) throw Error(p(200));
    if (null == a || void 0 === a._reactInternals) throw Error(p(38));
    return rl(a, b, c, false, d);
  };
  reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
  function checkDCE() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
      return;
    }
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
    } catch (err) {
      console.error(err);
    }
  }
  {
    checkDCE();
    reactDom.exports = reactDom_production_min;
  }
  var reactDomExports = reactDom.exports;
  const ReactDOM = /* @__PURE__ */ getDefaultExportFromCjs(reactDomExports);
  var createRoot;
  var m = reactDomExports;
  {
    createRoot = m.createRoot;
    m.hydrateRoot;
  }
  function die(error) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    throw new Error(typeof error === "number" ? "[MobX] minified error nr: " + error + (args.length ? " " + args.map(String).join(",") : "") + ". Find the full error at: https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/errors.ts" : "[MobX] " + error);
  }
  var mockGlobal = {};
  function getGlobal() {
    if (typeof globalThis !== "undefined") {
      return globalThis;
    }
    if (typeof window !== "undefined") {
      return window;
    }
    if (typeof global !== "undefined") {
      return global;
    }
    if (typeof self !== "undefined") {
      return self;
    }
    return mockGlobal;
  }
  var assign = Object.assign;
  var getDescriptor = Object.getOwnPropertyDescriptor;
  var defineProperty = Object.defineProperty;
  var objectPrototype = Object.prototype;
  var EMPTY_ARRAY = [];
  Object.freeze(EMPTY_ARRAY);
  var EMPTY_OBJECT = {};
  Object.freeze(EMPTY_OBJECT);
  var hasProxy = typeof Proxy !== "undefined";
  var plainObjectString = /* @__PURE__ */ Object.toString();
  function assertProxies() {
    if (!hasProxy) {
      die("Proxy not available");
    }
  }
  function once(func) {
    var invoked = false;
    return function() {
      if (invoked) {
        return;
      }
      invoked = true;
      return func.apply(this, arguments);
    };
  }
  var noop = function noop2() {
  };
  function isFunction(fn) {
    return typeof fn === "function";
  }
  function isStringish(value) {
    var t2 = typeof value;
    switch (t2) {
      case "string":
      case "symbol":
      case "number":
        return true;
    }
    return false;
  }
  function isObject(value) {
    return value !== null && typeof value === "object";
  }
  function isPlainObject(value) {
    if (!isObject(value)) {
      return false;
    }
    var proto = Object.getPrototypeOf(value);
    if (proto == null) {
      return true;
    }
    var protoConstructor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
    return typeof protoConstructor === "function" && protoConstructor.toString() === plainObjectString;
  }
  function isGenerator(obj) {
    var constructor = obj == null ? void 0 : obj.constructor;
    if (!constructor) {
      return false;
    }
    if ("GeneratorFunction" === constructor.name || "GeneratorFunction" === constructor.displayName) {
      return true;
    }
    return false;
  }
  function addHiddenProp(object2, propName, value) {
    defineProperty(object2, propName, {
      enumerable: false,
      writable: true,
      configurable: true,
      value
    });
  }
  function addHiddenFinalProp(object2, propName, value) {
    defineProperty(object2, propName, {
      enumerable: false,
      writable: false,
      configurable: true,
      value
    });
  }
  function createInstanceofPredicate(name, theClass) {
    var propName = "isMobX" + name;
    theClass.prototype[propName] = true;
    return function(x2) {
      return isObject(x2) && x2[propName] === true;
    };
  }
  function isES6Map(thing) {
    return thing != null && Object.prototype.toString.call(thing) === "[object Map]";
  }
  function isPlainES6Map(thing) {
    var mapProto = Object.getPrototypeOf(thing);
    var objectProto = Object.getPrototypeOf(mapProto);
    var nullProto = Object.getPrototypeOf(objectProto);
    return nullProto === null;
  }
  function isES6Set(thing) {
    return thing != null && Object.prototype.toString.call(thing) === "[object Set]";
  }
  var hasGetOwnPropertySymbols = typeof Object.getOwnPropertySymbols !== "undefined";
  function getPlainObjectKeys(object2) {
    var keys2 = Object.keys(object2);
    if (!hasGetOwnPropertySymbols) {
      return keys2;
    }
    var symbols = Object.getOwnPropertySymbols(object2);
    if (!symbols.length) {
      return keys2;
    }
    return [].concat(keys2, symbols.filter(function(s) {
      return objectPrototype.propertyIsEnumerable.call(object2, s);
    }));
  }
  var ownKeys = typeof Reflect !== "undefined" && Reflect.ownKeys ? Reflect.ownKeys : hasGetOwnPropertySymbols ? function(obj) {
    return Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj));
  } : (
    /* istanbul ignore next */
    Object.getOwnPropertyNames
  );
  function toPrimitive(value) {
    return value === null ? null : typeof value === "object" ? "" + value : value;
  }
  function hasProp(target, prop) {
    return objectPrototype.hasOwnProperty.call(target, prop);
  }
  var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors2(target) {
    var res = {};
    ownKeys(target).forEach(function(key) {
      res[key] = getDescriptor(target, key);
    });
    return res;
  };
  function getFlag(flags, mask) {
    return !!(flags & mask);
  }
  function setFlag(flags, mask, newValue) {
    if (newValue) {
      flags |= mask;
    } else {
      flags &= ~mask;
    }
    return flags;
  }
  function _arrayLikeToArray(r2, a) {
    (null == a || a > r2.length) && (a = r2.length);
    for (var e = 0, n2 = Array(a); e < a; e++) n2[e] = r2[e];
    return n2;
  }
  function _construct(t2, e, r2) {
    if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
    var o = [null];
    o.push.apply(o, e);
    var p2 = new (t2.bind.apply(t2, o))();
    return r2 && _setPrototypeOf(p2, r2.prototype), p2;
  }
  function _defineProperties(e, r2) {
    for (var t2 = 0; t2 < r2.length; t2++) {
      var o = r2[t2];
      o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r2, t2) {
    return r2 && _defineProperties(e.prototype, r2), Object.defineProperty(e, "prototype", {
      writable: false
    }), e;
  }
  function _createForOfIteratorHelperLoose(r2, e) {
    var t2 = "undefined" != typeof Symbol && r2[Symbol.iterator] || r2["@@iterator"];
    if (t2) return (t2 = t2.call(r2)).next.bind(t2);
    if (Array.isArray(r2) || (t2 = _unsupportedIterableToArray(r2)) || e) {
      t2 && (r2 = t2);
      var o = 0;
      return function() {
        return o >= r2.length ? {
          done: true
        } : {
          done: false,
          value: r2[o++]
        };
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _extends() {
    return _extends = Object.assign ? Object.assign.bind() : function(n2) {
      for (var e = 1; e < arguments.length; e++) {
        var t2 = arguments[e];
        for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
      }
      return n2;
    }, _extends.apply(null, arguments);
  }
  function _getPrototypeOf(t2) {
    return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t22) {
      return t22.__proto__ || Object.getPrototypeOf(t22);
    }, _getPrototypeOf(t2);
  }
  function _inheritsLoose(t2, o) {
    t2.prototype = Object.create(o.prototype), t2.prototype.constructor = t2, _setPrototypeOf(t2, o);
  }
  function _isNativeFunction(t2) {
    try {
      return -1 !== Function.toString.call(t2).indexOf("[native code]");
    } catch (n2) {
      return "function" == typeof t2;
    }
  }
  function _isNativeReflectConstruct() {
    try {
      var t2 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
    } catch (t22) {
    }
    return (_isNativeReflectConstruct = function() {
      return !!t2;
    })();
  }
  function _setPrototypeOf(t2, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t22, e2) {
      return t22.__proto__ = e2, t22;
    }, _setPrototypeOf(t2, e);
  }
  function _toPrimitive(t2, r2) {
    if ("object" != typeof t2 || !t2) return t2;
    var e = t2[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t2, r2);
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return String(t2);
  }
  function _toPropertyKey(t2) {
    var i = _toPrimitive(t2, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _unsupportedIterableToArray(r2, a) {
    if (r2) {
      if ("string" == typeof r2) return _arrayLikeToArray(r2, a);
      var t2 = {}.toString.call(r2).slice(8, -1);
      return "Object" === t2 && r2.constructor && (t2 = r2.constructor.name), "Map" === t2 || "Set" === t2 ? Array.from(r2) : "Arguments" === t2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t2) ? _arrayLikeToArray(r2, a) : void 0;
    }
  }
  function _wrapNativeSuper(t2) {
    var r2 = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
    return _wrapNativeSuper = function(t22) {
      if (null === t22 || !_isNativeFunction(t22)) return t22;
      if ("function" != typeof t22) throw new TypeError("Super expression must either be null or a function");
      if (void 0 !== r2) {
        if (r2.has(t22)) return r2.get(t22);
        r2.set(t22, Wrapper);
      }
      function Wrapper() {
        return _construct(t22, arguments, _getPrototypeOf(this).constructor);
      }
      return Wrapper.prototype = Object.create(t22.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      }), _setPrototypeOf(Wrapper, t22);
    }, _wrapNativeSuper(t2);
  }
  var storedAnnotationsSymbol = /* @__PURE__ */ Symbol("mobx-stored-annotations");
  function createDecoratorAnnotation(annotation) {
    function decorator(target, property) {
      if (is20223Decorator(property)) {
        return annotation.decorate_20223_(target, property);
      } else {
        storeAnnotation(target, property, annotation);
      }
    }
    return Object.assign(decorator, annotation);
  }
  function storeAnnotation(prototype, key, annotation) {
    if (!hasProp(prototype, storedAnnotationsSymbol)) {
      addHiddenProp(prototype, storedAnnotationsSymbol, _extends({}, prototype[storedAnnotationsSymbol]));
    }
    if (!isOverride(annotation)) {
      prototype[storedAnnotationsSymbol][key] = annotation;
    }
  }
  function collectStoredAnnotations(target) {
    if (!hasProp(target, storedAnnotationsSymbol)) {
      addHiddenProp(target, storedAnnotationsSymbol, _extends({}, target[storedAnnotationsSymbol]));
    }
    return target[storedAnnotationsSymbol];
  }
  function is20223Decorator(context) {
    return typeof context == "object" && typeof context["kind"] == "string";
  }
  var $mobx = /* @__PURE__ */ Symbol("mobx administration");
  var Atom = /* @__PURE__ */ function() {
    function Atom2(name_) {
      if (name_ === void 0) {
        name_ = "Atom";
      }
      this.name_ = void 0;
      this.flags_ = 0;
      this.observers_ = /* @__PURE__ */ new Set();
      this.lastAccessedBy_ = 0;
      this.lowestObserverState_ = IDerivationState_.NOT_TRACKING_;
      this.onBOL = void 0;
      this.onBUOL = void 0;
      this.name_ = name_;
    }
    var _proto = Atom2.prototype;
    _proto.onBO = function onBO() {
      if (this.onBOL) {
        this.onBOL.forEach(function(listener) {
          return listener();
        });
      }
    };
    _proto.onBUO = function onBUO() {
      if (this.onBUOL) {
        this.onBUOL.forEach(function(listener) {
          return listener();
        });
      }
    };
    _proto.reportObserved = function reportObserved$1() {
      return reportObserved(this);
    };
    _proto.reportChanged = function reportChanged() {
      startBatch();
      propagateChanged(this);
      endBatch();
    };
    _proto.toString = function toString2() {
      return this.name_;
    };
    return _createClass(Atom2, [{
      key: "isBeingObserved",
      get: function get4() {
        return getFlag(this.flags_, Atom2.isBeingObservedMask_);
      },
      set: function set5(newValue) {
        this.flags_ = setFlag(this.flags_, Atom2.isBeingObservedMask_, newValue);
      }
    }, {
      key: "isPendingUnobservation",
      get: function get4() {
        return getFlag(this.flags_, Atom2.isPendingUnobservationMask_);
      },
      set: function set5(newValue) {
        this.flags_ = setFlag(this.flags_, Atom2.isPendingUnobservationMask_, newValue);
      }
    }, {
      key: "diffValue",
      get: function get4() {
        return getFlag(this.flags_, Atom2.diffValueMask_) ? 1 : 0;
      },
      set: function set5(newValue) {
        this.flags_ = setFlag(this.flags_, Atom2.diffValueMask_, newValue === 1 ? true : false);
      }
    }]);
  }();
  Atom.isBeingObservedMask_ = 1;
  Atom.isPendingUnobservationMask_ = 2;
  Atom.diffValueMask_ = 4;
  var isAtom = /* @__PURE__ */ createInstanceofPredicate("Atom", Atom);
  function createAtom(name, onBecomeObservedHandler, onBecomeUnobservedHandler) {
    if (onBecomeObservedHandler === void 0) {
      onBecomeObservedHandler = noop;
    }
    if (onBecomeUnobservedHandler === void 0) {
      onBecomeUnobservedHandler = noop;
    }
    var atom = new Atom(name);
    if (onBecomeObservedHandler !== noop) {
      onBecomeObserved(atom, onBecomeObservedHandler);
    }
    if (onBecomeUnobservedHandler !== noop) {
      onBecomeUnobserved(atom, onBecomeUnobservedHandler);
    }
    return atom;
  }
  function structuralComparer(a, b) {
    return deepEqual(a, b);
  }
  function defaultComparer(a, b) {
    if (Object.is) {
      return Object.is(a, b);
    }
    return a === b ? a !== 0 || 1 / a === 1 / b : a !== a && b !== b;
  }
  var comparer = {
    structural: structuralComparer,
    "default": defaultComparer
  };
  function deepEnhancer(v2, _14, name) {
    if (isObservable(v2)) {
      return v2;
    }
    if (Array.isArray(v2)) {
      return observable.array(v2, {
        name
      });
    }
    if (isPlainObject(v2)) {
      return observable.object(v2, void 0, {
        name
      });
    }
    if (isES6Map(v2)) {
      return observable.map(v2, {
        name
      });
    }
    if (isES6Set(v2)) {
      return observable.set(v2, {
        name
      });
    }
    if (typeof v2 === "function" && !isAction(v2) && !isFlow(v2)) {
      if (isGenerator(v2)) {
        return flow(v2);
      } else {
        return autoAction(name, v2);
      }
    }
    return v2;
  }
  function shallowEnhancer(v2, _14, name) {
    if (v2 === void 0 || v2 === null) {
      return v2;
    }
    if (isObservableObject(v2) || isObservableArray(v2) || isObservableMap(v2) || isObservableSet(v2)) {
      return v2;
    }
    if (Array.isArray(v2)) {
      return observable.array(v2, {
        name,
        deep: false
      });
    }
    if (isPlainObject(v2)) {
      return observable.object(v2, void 0, {
        name,
        deep: false
      });
    }
    if (isES6Map(v2)) {
      return observable.map(v2, {
        name,
        deep: false
      });
    }
    if (isES6Set(v2)) {
      return observable.set(v2, {
        name,
        deep: false
      });
    }
  }
  function referenceEnhancer(newValue) {
    return newValue;
  }
  function refStructEnhancer(v2, oldValue) {
    if (deepEqual(v2, oldValue)) {
      return oldValue;
    }
    return v2;
  }
  var OVERRIDE = "override";
  function isOverride(annotation) {
    return annotation.annotationType_ === OVERRIDE;
  }
  function createActionAnnotation(name, options) {
    return {
      annotationType_: name,
      options_: options,
      make_: make_$1,
      extend_: extend_$1,
      decorate_20223_: decorate_20223_$1
    };
  }
  function make_$1(adm, key, descriptor, source) {
    var _this$options_;
    if ((_this$options_ = this.options_) != null && _this$options_.bound) {
      return this.extend_(adm, key, descriptor, false) === null ? 0 : 1;
    }
    if (source === adm.target_) {
      return this.extend_(adm, key, descriptor, false) === null ? 0 : 2;
    }
    if (isAction(descriptor.value)) {
      return 1;
    }
    var actionDescriptor = createActionDescriptor(adm, this, key, descriptor, false);
    defineProperty(source, key, actionDescriptor);
    return 2;
  }
  function extend_$1(adm, key, descriptor, proxyTrap) {
    var actionDescriptor = createActionDescriptor(adm, this, key, descriptor);
    return adm.defineProperty_(key, actionDescriptor, proxyTrap);
  }
  function decorate_20223_$1(mthd, context) {
    var kind = context.kind, name = context.name, addInitializer = context.addInitializer;
    var ann = this;
    var _createAction = function _createAction2(m2) {
      var _ann$options_$name, _ann$options_, _ann$options_$autoAct, _ann$options_2;
      return createAction((_ann$options_$name = (_ann$options_ = ann.options_) == null ? void 0 : _ann$options_.name) != null ? _ann$options_$name : name.toString(), m2, (_ann$options_$autoAct = (_ann$options_2 = ann.options_) == null ? void 0 : _ann$options_2.autoAction) != null ? _ann$options_$autoAct : false);
    };
    if (kind == "field") {
      return function(initMthd) {
        var _ann$options_3;
        var mthd2 = initMthd;
        if (!isAction(mthd2)) {
          mthd2 = _createAction(mthd2);
        }
        if ((_ann$options_3 = ann.options_) != null && _ann$options_3.bound) {
          mthd2 = mthd2.bind(this);
          mthd2.isMobxAction = true;
        }
        return mthd2;
      };
    }
    if (kind == "method") {
      var _this$options_2;
      if (!isAction(mthd)) {
        mthd = _createAction(mthd);
      }
      if ((_this$options_2 = this.options_) != null && _this$options_2.bound) {
        addInitializer(function() {
          var self2 = this;
          var bound = self2[name].bind(self2);
          bound.isMobxAction = true;
          self2[name] = bound;
        });
      }
      return mthd;
    }
    die("Cannot apply '" + ann.annotationType_ + "' to '" + String(name) + "' (kind: " + kind + "):" + ("\n'" + ann.annotationType_ + "' can only be used on properties with a function value."));
  }
  function assertActionDescriptor(adm, _ref, key, _ref2) {
    _ref.annotationType_;
    _ref2.value;
  }
  function createActionDescriptor(adm, annotation, key, descriptor, safeDescriptors) {
    var _annotation$options_, _annotation$options_$, _annotation$options_2, _annotation$options_$2, _annotation$options_3, _annotation$options_4, _adm$proxy_2;
    if (safeDescriptors === void 0) {
      safeDescriptors = globalState.safeDescriptors;
    }
    assertActionDescriptor(adm, annotation, key, descriptor);
    var value = descriptor.value;
    if ((_annotation$options_ = annotation.options_) != null && _annotation$options_.bound) {
      var _adm$proxy_;
      value = value.bind((_adm$proxy_ = adm.proxy_) != null ? _adm$proxy_ : adm.target_);
    }
    return {
      value: createAction(
        (_annotation$options_$ = (_annotation$options_2 = annotation.options_) == null ? void 0 : _annotation$options_2.name) != null ? _annotation$options_$ : key.toString(),
        value,
        (_annotation$options_$2 = (_annotation$options_3 = annotation.options_) == null ? void 0 : _annotation$options_3.autoAction) != null ? _annotation$options_$2 : false,
        // https://github.com/mobxjs/mobx/discussions/3140
        (_annotation$options_4 = annotation.options_) != null && _annotation$options_4.bound ? (_adm$proxy_2 = adm.proxy_) != null ? _adm$proxy_2 : adm.target_ : void 0
      ),
      // Non-configurable for classes
      // prevents accidental field redefinition in subclass
      configurable: safeDescriptors ? adm.isPlainObject_ : true,
      // https://github.com/mobxjs/mobx/pull/2641#issuecomment-737292058
      enumerable: false,
      // Non-obsevable, therefore non-writable
      // Also prevents rewriting in subclass constructor
      writable: safeDescriptors ? false : true
    };
  }
  function createFlowAnnotation(name, options) {
    return {
      annotationType_: name,
      options_: options,
      make_: make_$2,
      extend_: extend_$2,
      decorate_20223_: decorate_20223_$2
    };
  }
  function make_$2(adm, key, descriptor, source) {
    var _this$options_;
    if (source === adm.target_) {
      return this.extend_(adm, key, descriptor, false) === null ? 0 : 2;
    }
    if ((_this$options_ = this.options_) != null && _this$options_.bound && (!hasProp(adm.target_, key) || !isFlow(adm.target_[key]))) {
      if (this.extend_(adm, key, descriptor, false) === null) {
        return 0;
      }
    }
    if (isFlow(descriptor.value)) {
      return 1;
    }
    var flowDescriptor = createFlowDescriptor(adm, this, key, descriptor, false, false);
    defineProperty(source, key, flowDescriptor);
    return 2;
  }
  function extend_$2(adm, key, descriptor, proxyTrap) {
    var _this$options_2;
    var flowDescriptor = createFlowDescriptor(adm, this, key, descriptor, (_this$options_2 = this.options_) == null ? void 0 : _this$options_2.bound);
    return adm.defineProperty_(key, flowDescriptor, proxyTrap);
  }
  function decorate_20223_$2(mthd, context) {
    var _this$options_3;
    var name = context.name, addInitializer = context.addInitializer;
    if (!isFlow(mthd)) {
      mthd = flow(mthd);
    }
    if ((_this$options_3 = this.options_) != null && _this$options_3.bound) {
      addInitializer(function() {
        var self2 = this;
        var bound = self2[name].bind(self2);
        bound.isMobXFlow = true;
        self2[name] = bound;
      });
    }
    return mthd;
  }
  function assertFlowDescriptor(adm, _ref, key, _ref2) {
    _ref.annotationType_;
    _ref2.value;
  }
  function createFlowDescriptor(adm, annotation, key, descriptor, bound, safeDescriptors) {
    if (safeDescriptors === void 0) {
      safeDescriptors = globalState.safeDescriptors;
    }
    assertFlowDescriptor(adm, annotation, key, descriptor);
    var value = descriptor.value;
    if (!isFlow(value)) {
      value = flow(value);
    }
    if (bound) {
      var _adm$proxy_;
      value = value.bind((_adm$proxy_ = adm.proxy_) != null ? _adm$proxy_ : adm.target_);
      value.isMobXFlow = true;
    }
    return {
      value,
      // Non-configurable for classes
      // prevents accidental field redefinition in subclass
      configurable: safeDescriptors ? adm.isPlainObject_ : true,
      // https://github.com/mobxjs/mobx/pull/2641#issuecomment-737292058
      enumerable: false,
      // Non-obsevable, therefore non-writable
      // Also prevents rewriting in subclass constructor
      writable: safeDescriptors ? false : true
    };
  }
  function createComputedAnnotation(name, options) {
    return {
      annotationType_: name,
      options_: options,
      make_: make_$3,
      extend_: extend_$3,
      decorate_20223_: decorate_20223_$3
    };
  }
  function make_$3(adm, key, descriptor) {
    return this.extend_(adm, key, descriptor, false) === null ? 0 : 1;
  }
  function extend_$3(adm, key, descriptor, proxyTrap) {
    assertComputedDescriptor(adm, this, key, descriptor);
    return adm.defineComputedProperty_(key, _extends({}, this.options_, {
      get: descriptor.get,
      set: descriptor.set
    }), proxyTrap);
  }
  function decorate_20223_$3(get4, context) {
    var ann = this;
    var key = context.name, addInitializer = context.addInitializer;
    addInitializer(function() {
      var adm = asObservableObject(this)[$mobx];
      var options = _extends({}, ann.options_, {
        get: get4,
        context: this
      });
      options.name || (options.name = "ObservableObject." + key.toString());
      adm.values_.set(key, new ComputedValue(options));
    });
    return function() {
      return this[$mobx].getObservablePropValue_(key);
    };
  }
  function assertComputedDescriptor(adm, _ref, key, _ref2) {
    _ref.annotationType_;
    _ref2.get;
  }
  function createObservableAnnotation(name, options) {
    return {
      annotationType_: name,
      options_: options,
      make_: make_$4,
      extend_: extend_$4,
      decorate_20223_: decorate_20223_$4
    };
  }
  function make_$4(adm, key, descriptor) {
    return this.extend_(adm, key, descriptor, false) === null ? 0 : 1;
  }
  function extend_$4(adm, key, descriptor, proxyTrap) {
    var _this$options_$enhanc, _this$options_;
    assertObservableDescriptor(adm, this);
    return adm.defineObservableProperty_(key, descriptor.value, (_this$options_$enhanc = (_this$options_ = this.options_) == null ? void 0 : _this$options_.enhancer) != null ? _this$options_$enhanc : deepEnhancer, proxyTrap);
  }
  function decorate_20223_$4(desc, context) {
    var ann = this;
    var kind = context.kind, name = context.name;
    var initializedObjects = /* @__PURE__ */ new WeakSet();
    function initializeObservable(target, value) {
      var _ann$options_$enhance, _ann$options_;
      var adm = asObservableObject(target)[$mobx];
      var observable2 = new ObservableValue(value, (_ann$options_$enhance = (_ann$options_ = ann.options_) == null ? void 0 : _ann$options_.enhancer) != null ? _ann$options_$enhance : deepEnhancer, "ObservableObject." + name.toString(), false);
      adm.values_.set(name, observable2);
      initializedObjects.add(target);
    }
    if (kind == "accessor") {
      return {
        get: function get4() {
          if (!initializedObjects.has(this)) {
            initializeObservable(this, desc.get.call(this));
          }
          return this[$mobx].getObservablePropValue_(name);
        },
        set: function set5(value) {
          if (!initializedObjects.has(this)) {
            initializeObservable(this, value);
          }
          return this[$mobx].setObservablePropValue_(name, value);
        },
        init: function init(value) {
          if (!initializedObjects.has(this)) {
            initializeObservable(this, value);
          }
          return value;
        }
      };
    }
    return;
  }
  function assertObservableDescriptor(adm, _ref, key, descriptor) {
    _ref.annotationType_;
  }
  var AUTO = "true";
  var autoAnnotation = /* @__PURE__ */ createAutoAnnotation();
  function createAutoAnnotation(options) {
    return {
      annotationType_: AUTO,
      options_: options,
      make_: make_$5,
      extend_: extend_$5,
      decorate_20223_: decorate_20223_$5
    };
  }
  function make_$5(adm, key, descriptor, source) {
    var _this$options_3, _this$options_4;
    if (descriptor.get) {
      return computed.make_(adm, key, descriptor, source);
    }
    if (descriptor.set) {
      var set5 = isAction(descriptor.set) ? descriptor.set : createAction(key.toString(), descriptor.set);
      if (source === adm.target_) {
        return adm.defineProperty_(key, {
          configurable: globalState.safeDescriptors ? adm.isPlainObject_ : true,
          set: set5
        }) === null ? 0 : 2;
      }
      defineProperty(source, key, {
        configurable: true,
        set: set5
      });
      return 2;
    }
    if (source !== adm.target_ && typeof descriptor.value === "function") {
      var _this$options_2;
      if (isGenerator(descriptor.value)) {
        var _this$options_;
        var flowAnnotation2 = (_this$options_ = this.options_) != null && _this$options_.autoBind ? flow.bound : flow;
        return flowAnnotation2.make_(adm, key, descriptor, source);
      }
      var actionAnnotation2 = (_this$options_2 = this.options_) != null && _this$options_2.autoBind ? autoAction.bound : autoAction;
      return actionAnnotation2.make_(adm, key, descriptor, source);
    }
    var observableAnnotation2 = ((_this$options_3 = this.options_) == null ? void 0 : _this$options_3.deep) === false ? observable.ref : observable;
    if (typeof descriptor.value === "function" && (_this$options_4 = this.options_) != null && _this$options_4.autoBind) {
      var _adm$proxy_;
      descriptor.value = descriptor.value.bind((_adm$proxy_ = adm.proxy_) != null ? _adm$proxy_ : adm.target_);
    }
    return observableAnnotation2.make_(adm, key, descriptor, source);
  }
  function extend_$5(adm, key, descriptor, proxyTrap) {
    var _this$options_5, _this$options_6;
    if (descriptor.get) {
      return computed.extend_(adm, key, descriptor, proxyTrap);
    }
    if (descriptor.set) {
      return adm.defineProperty_(key, {
        configurable: globalState.safeDescriptors ? adm.isPlainObject_ : true,
        set: createAction(key.toString(), descriptor.set)
      }, proxyTrap);
    }
    if (typeof descriptor.value === "function" && (_this$options_5 = this.options_) != null && _this$options_5.autoBind) {
      var _adm$proxy_2;
      descriptor.value = descriptor.value.bind((_adm$proxy_2 = adm.proxy_) != null ? _adm$proxy_2 : adm.target_);
    }
    var observableAnnotation2 = ((_this$options_6 = this.options_) == null ? void 0 : _this$options_6.deep) === false ? observable.ref : observable;
    return observableAnnotation2.extend_(adm, key, descriptor, proxyTrap);
  }
  function decorate_20223_$5(desc, context) {
    die("'" + this.annotationType_ + "' cannot be used as a decorator");
  }
  var OBSERVABLE = "observable";
  var OBSERVABLE_REF = "observable.ref";
  var OBSERVABLE_SHALLOW = "observable.shallow";
  var OBSERVABLE_STRUCT = "observable.struct";
  var defaultCreateObservableOptions = {
    deep: true,
    name: void 0,
    defaultDecorator: void 0,
    proxy: true
  };
  Object.freeze(defaultCreateObservableOptions);
  function asCreateObservableOptions(thing) {
    return thing || defaultCreateObservableOptions;
  }
  var observableAnnotation = /* @__PURE__ */ createObservableAnnotation(OBSERVABLE);
  var observableRefAnnotation = /* @__PURE__ */ createObservableAnnotation(OBSERVABLE_REF, {
    enhancer: referenceEnhancer
  });
  var observableShallowAnnotation = /* @__PURE__ */ createObservableAnnotation(OBSERVABLE_SHALLOW, {
    enhancer: shallowEnhancer
  });
  var observableStructAnnotation = /* @__PURE__ */ createObservableAnnotation(OBSERVABLE_STRUCT, {
    enhancer: refStructEnhancer
  });
  var observableDecoratorAnnotation = /* @__PURE__ */ createDecoratorAnnotation(observableAnnotation);
  function getEnhancerFromOptions(options) {
    return options.deep === true ? deepEnhancer : options.deep === false ? referenceEnhancer : getEnhancerFromAnnotation(options.defaultDecorator);
  }
  function getAnnotationFromOptions(options) {
    var _options$defaultDecor;
    return options ? (_options$defaultDecor = options.defaultDecorator) != null ? _options$defaultDecor : createAutoAnnotation(options) : void 0;
  }
  function getEnhancerFromAnnotation(annotation) {
    var _annotation$options_$, _annotation$options_;
    return !annotation ? deepEnhancer : (_annotation$options_$ = (_annotation$options_ = annotation.options_) == null ? void 0 : _annotation$options_.enhancer) != null ? _annotation$options_$ : deepEnhancer;
  }
  function createObservable(v2, arg2, arg3) {
    if (is20223Decorator(arg2)) {
      return observableAnnotation.decorate_20223_(v2, arg2);
    }
    if (isStringish(arg2)) {
      storeAnnotation(v2, arg2, observableAnnotation);
      return;
    }
    if (isObservable(v2)) {
      return v2;
    }
    if (isPlainObject(v2)) {
      return observable.object(v2, arg2, arg3);
    }
    if (Array.isArray(v2)) {
      return observable.array(v2, arg2);
    }
    if (isES6Map(v2)) {
      return observable.map(v2, arg2);
    }
    if (isES6Set(v2)) {
      return observable.set(v2, arg2);
    }
    if (typeof v2 === "object" && v2 !== null) {
      return v2;
    }
    return observable.box(v2, arg2);
  }
  assign(createObservable, observableDecoratorAnnotation);
  var observableFactories = {
    box: function box(value, options) {
      var o = asCreateObservableOptions(options);
      return new ObservableValue(value, getEnhancerFromOptions(o), o.name, true, o.equals);
    },
    array: function array(initialValues, options) {
      var o = asCreateObservableOptions(options);
      return (globalState.useProxies === false || o.proxy === false ? createLegacyArray : createObservableArray)(initialValues, getEnhancerFromOptions(o), o.name);
    },
    map: function map(initialValues, options) {
      var o = asCreateObservableOptions(options);
      return new ObservableMap(initialValues, getEnhancerFromOptions(o), o.name);
    },
    set: function set(initialValues, options) {
      var o = asCreateObservableOptions(options);
      return new ObservableSet(initialValues, getEnhancerFromOptions(o), o.name);
    },
    object: function object(props, decorators, options) {
      return initObservable(function() {
        return extendObservable(globalState.useProxies === false || (options == null ? void 0 : options.proxy) === false ? asObservableObject({}, options) : asDynamicObservableObject({}, options), props, decorators);
      });
    },
    ref: /* @__PURE__ */ createDecoratorAnnotation(observableRefAnnotation),
    shallow: /* @__PURE__ */ createDecoratorAnnotation(observableShallowAnnotation),
    deep: observableDecoratorAnnotation,
    struct: /* @__PURE__ */ createDecoratorAnnotation(observableStructAnnotation)
  };
  var observable = /* @__PURE__ */ assign(createObservable, observableFactories);
  var COMPUTED = "computed";
  var COMPUTED_STRUCT = "computed.struct";
  var computedAnnotation = /* @__PURE__ */ createComputedAnnotation(COMPUTED);
  var computedStructAnnotation = /* @__PURE__ */ createComputedAnnotation(COMPUTED_STRUCT, {
    equals: comparer.structural
  });
  var computed = function computed2(arg1, arg2) {
    if (is20223Decorator(arg2)) {
      return computedAnnotation.decorate_20223_(arg1, arg2);
    }
    if (isStringish(arg2)) {
      return storeAnnotation(arg1, arg2, computedAnnotation);
    }
    if (isPlainObject(arg1)) {
      return createDecoratorAnnotation(createComputedAnnotation(COMPUTED, arg1));
    }
    var opts = isPlainObject(arg2) ? arg2 : {};
    opts.get = arg1;
    opts.name || (opts.name = arg1.name || "");
    return new ComputedValue(opts);
  };
  Object.assign(computed, computedAnnotation);
  computed.struct = /* @__PURE__ */ createDecoratorAnnotation(computedStructAnnotation);
  var _getDescriptor$config, _getDescriptor;
  var currentActionId = 0;
  var nextActionId = 1;
  var isFunctionNameConfigurable$1 = (_getDescriptor$config = (_getDescriptor = /* @__PURE__ */ getDescriptor(function() {
  }, "name")) == null ? void 0 : _getDescriptor.configurable) != null ? _getDescriptor$config : false;
  var tmpNameDescriptor = {
    value: "action",
    configurable: true,
    writable: false,
    enumerable: false
  };
  function createAction(actionName, fn, autoAction2, ref) {
    if (autoAction2 === void 0) {
      autoAction2 = false;
    }
    function res() {
      return executeAction(actionName, autoAction2, fn, ref || this, arguments);
    }
    res.isMobxAction = true;
    res.toString = function() {
      return fn.toString();
    };
    if (isFunctionNameConfigurable$1) {
      tmpNameDescriptor.value = actionName;
      defineProperty(res, "name", tmpNameDescriptor);
    }
    return res;
  }
  function executeAction(actionName, canRunAsDerivation, fn, scope, args) {
    var runInfo = _startAction(actionName, canRunAsDerivation);
    try {
      return fn.apply(scope, args);
    } catch (err) {
      runInfo.error_ = err;
      throw err;
    } finally {
      _endAction(runInfo);
    }
  }
  function _startAction(actionName, canRunAsDerivation, scope, args) {
    var notifySpy_ = false;
    var startTime_ = 0;
    var prevDerivation_ = globalState.trackingDerivation;
    var runAsAction = !canRunAsDerivation || !prevDerivation_;
    startBatch();
    var prevAllowStateChanges_ = globalState.allowStateChanges;
    if (runAsAction) {
      untrackedStart();
      prevAllowStateChanges_ = allowStateChangesStart(true);
    }
    var prevAllowStateReads_ = allowStateReadsStart(true);
    var runInfo = {
      runAsAction_: runAsAction,
      prevDerivation_,
      prevAllowStateChanges_,
      prevAllowStateReads_,
      notifySpy_,
      startTime_,
      actionId_: nextActionId++,
      parentActionId_: currentActionId
    };
    currentActionId = runInfo.actionId_;
    return runInfo;
  }
  function _endAction(runInfo) {
    if (currentActionId !== runInfo.actionId_) {
      die(30);
    }
    currentActionId = runInfo.parentActionId_;
    if (runInfo.error_ !== void 0) {
      globalState.suppressReactionErrors = true;
    }
    allowStateChangesEnd(runInfo.prevAllowStateChanges_);
    allowStateReadsEnd(runInfo.prevAllowStateReads_);
    endBatch();
    if (runInfo.runAsAction_) {
      untrackedEnd(runInfo.prevDerivation_);
    }
    globalState.suppressReactionErrors = false;
  }
  function allowStateChangesStart(allowStateChanges2) {
    var prev = globalState.allowStateChanges;
    globalState.allowStateChanges = allowStateChanges2;
    return prev;
  }
  function allowStateChangesEnd(prev) {
    globalState.allowStateChanges = prev;
  }
  var ObservableValue = /* @__PURE__ */ function(_Atom) {
    function ObservableValue2(value, enhancer, name_, notifySpy, equals) {
      var _this;
      if (name_ === void 0) {
        name_ = "ObservableValue";
      }
      if (equals === void 0) {
        equals = comparer["default"];
      }
      _this = _Atom.call(this, name_) || this;
      _this.enhancer = void 0;
      _this.name_ = void 0;
      _this.equals = void 0;
      _this.hasUnreportedChange_ = false;
      _this.interceptors_ = void 0;
      _this.changeListeners_ = void 0;
      _this.value_ = void 0;
      _this.dehancer = void 0;
      _this.enhancer = enhancer;
      _this.name_ = name_;
      _this.equals = equals;
      _this.value_ = enhancer(value, void 0, name_);
      return _this;
    }
    _inheritsLoose(ObservableValue2, _Atom);
    var _proto = ObservableValue2.prototype;
    _proto.dehanceValue = function dehanceValue(value) {
      if (this.dehancer !== void 0) {
        return this.dehancer(value);
      }
      return value;
    };
    _proto.set = function set5(newValue) {
      this.value_;
      newValue = this.prepareNewValue_(newValue);
      if (newValue !== globalState.UNCHANGED) {
        this.setNewValue_(newValue);
      }
    };
    _proto.prepareNewValue_ = function prepareNewValue_(newValue) {
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          object: this,
          type: UPDATE,
          newValue
        });
        if (!change) {
          return globalState.UNCHANGED;
        }
        newValue = change.newValue;
      }
      newValue = this.enhancer(newValue, this.value_, this.name_);
      return this.equals(this.value_, newValue) ? globalState.UNCHANGED : newValue;
    };
    _proto.setNewValue_ = function setNewValue_(newValue) {
      var oldValue = this.value_;
      this.value_ = newValue;
      this.reportChanged();
      if (hasListeners(this)) {
        notifyListeners(this, {
          type: UPDATE,
          object: this,
          newValue,
          oldValue
        });
      }
    };
    _proto.get = function get4() {
      this.reportObserved();
      return this.dehanceValue(this.value_);
    };
    _proto.intercept_ = function intercept_(handler) {
      return registerInterceptor(this, handler);
    };
    _proto.observe_ = function observe_(listener, fireImmediately) {
      if (fireImmediately) {
        listener({
          observableKind: "value",
          debugObjectName: this.name_,
          object: this,
          type: UPDATE,
          newValue: this.value_,
          oldValue: void 0
        });
      }
      return registerListener(this, listener);
    };
    _proto.raw = function raw() {
      return this.value_;
    };
    _proto.toJSON = function toJSON2() {
      return this.get();
    };
    _proto.toString = function toString2() {
      return this.name_ + "[" + this.value_ + "]";
    };
    _proto.valueOf = function valueOf() {
      return toPrimitive(this.get());
    };
    _proto[Symbol.toPrimitive] = function() {
      return this.valueOf();
    };
    return ObservableValue2;
  }(Atom);
  var ComputedValue = /* @__PURE__ */ function() {
    function ComputedValue2(options) {
      this.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
      this.observing_ = [];
      this.newObserving_ = null;
      this.observers_ = /* @__PURE__ */ new Set();
      this.runId_ = 0;
      this.lastAccessedBy_ = 0;
      this.lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
      this.unboundDepsCount_ = 0;
      this.value_ = new CaughtException(null);
      this.name_ = void 0;
      this.triggeredBy_ = void 0;
      this.flags_ = 0;
      this.derivation = void 0;
      this.setter_ = void 0;
      this.isTracing_ = TraceMode.NONE;
      this.scope_ = void 0;
      this.equals_ = void 0;
      this.requiresReaction_ = void 0;
      this.keepAlive_ = void 0;
      this.onBOL = void 0;
      this.onBUOL = void 0;
      if (!options.get) {
        die(31);
      }
      this.derivation = options.get;
      this.name_ = options.name || "ComputedValue";
      if (options.set) {
        this.setter_ = createAction("ComputedValue-setter", options.set);
      }
      this.equals_ = options.equals || (options.compareStructural || options.struct ? comparer.structural : comparer["default"]);
      this.scope_ = options.context;
      this.requiresReaction_ = options.requiresReaction;
      this.keepAlive_ = !!options.keepAlive;
    }
    var _proto = ComputedValue2.prototype;
    _proto.onBecomeStale_ = function onBecomeStale_() {
      propagateMaybeChanged(this);
    };
    _proto.onBO = function onBO() {
      if (this.onBOL) {
        this.onBOL.forEach(function(listener) {
          return listener();
        });
      }
    };
    _proto.onBUO = function onBUO() {
      if (this.onBUOL) {
        this.onBUOL.forEach(function(listener) {
          return listener();
        });
      }
    };
    _proto.get = function get4() {
      if (this.isComputing) {
        die(32, this.name_, this.derivation);
      }
      if (globalState.inBatch === 0 && // !globalState.trackingDerivatpion &&
      this.observers_.size === 0 && !this.keepAlive_) {
        if (shouldCompute(this)) {
          this.warnAboutUntrackedRead_();
          startBatch();
          this.value_ = this.computeValue_(false);
          endBatch();
        }
      } else {
        reportObserved(this);
        if (shouldCompute(this)) {
          var prevTrackingContext = globalState.trackingContext;
          if (this.keepAlive_ && !prevTrackingContext) {
            globalState.trackingContext = this;
          }
          if (this.trackAndCompute()) {
            propagateChangeConfirmed(this);
          }
          globalState.trackingContext = prevTrackingContext;
        }
      }
      var result = this.value_;
      if (isCaughtException(result)) {
        throw result.cause;
      }
      return result;
    };
    _proto.set = function set5(value) {
      if (this.setter_) {
        if (this.isRunningSetter) {
          die(33, this.name_);
        }
        this.isRunningSetter = true;
        try {
          this.setter_.call(this.scope_, value);
        } finally {
          this.isRunningSetter = false;
        }
      } else {
        die(34, this.name_);
      }
    };
    _proto.trackAndCompute = function trackAndCompute() {
      var oldValue = this.value_;
      var wasSuspended = (
        /* see #1208 */
        this.dependenciesState_ === IDerivationState_.NOT_TRACKING_
      );
      var newValue = this.computeValue_(true);
      var changed = wasSuspended || isCaughtException(oldValue) || isCaughtException(newValue) || !this.equals_(oldValue, newValue);
      if (changed) {
        this.value_ = newValue;
      }
      return changed;
    };
    _proto.computeValue_ = function computeValue_(track) {
      this.isComputing = true;
      var prev = allowStateChangesStart(false);
      var res;
      if (track) {
        res = trackDerivedFunction(this, this.derivation, this.scope_);
      } else {
        if (globalState.disableErrorBoundaries === true) {
          res = this.derivation.call(this.scope_);
        } else {
          try {
            res = this.derivation.call(this.scope_);
          } catch (e) {
            res = new CaughtException(e);
          }
        }
      }
      allowStateChangesEnd(prev);
      this.isComputing = false;
      return res;
    };
    _proto.suspend_ = function suspend_() {
      if (!this.keepAlive_) {
        clearObserving(this);
        this.value_ = void 0;
      }
    };
    _proto.observe_ = function observe_(listener, fireImmediately) {
      var _this = this;
      var firstTime = true;
      var prevValue = void 0;
      return autorun(function() {
        var newValue = _this.get();
        if (!firstTime || fireImmediately) {
          var prevU = untrackedStart();
          listener({
            observableKind: "computed",
            debugObjectName: _this.name_,
            type: UPDATE,
            object: _this,
            newValue,
            oldValue: prevValue
          });
          untrackedEnd(prevU);
        }
        firstTime = false;
        prevValue = newValue;
      });
    };
    _proto.warnAboutUntrackedRead_ = function warnAboutUntrackedRead_() {
      {
        return;
      }
    };
    _proto.toString = function toString2() {
      return this.name_ + "[" + this.derivation.toString() + "]";
    };
    _proto.valueOf = function valueOf() {
      return toPrimitive(this.get());
    };
    _proto[Symbol.toPrimitive] = function() {
      return this.valueOf();
    };
    return _createClass(ComputedValue2, [{
      key: "isComputing",
      get: function get4() {
        return getFlag(this.flags_, ComputedValue2.isComputingMask_);
      },
      set: function set5(newValue) {
        this.flags_ = setFlag(this.flags_, ComputedValue2.isComputingMask_, newValue);
      }
    }, {
      key: "isRunningSetter",
      get: function get4() {
        return getFlag(this.flags_, ComputedValue2.isRunningSetterMask_);
      },
      set: function set5(newValue) {
        this.flags_ = setFlag(this.flags_, ComputedValue2.isRunningSetterMask_, newValue);
      }
    }, {
      key: "isBeingObserved",
      get: function get4() {
        return getFlag(this.flags_, ComputedValue2.isBeingObservedMask_);
      },
      set: function set5(newValue) {
        this.flags_ = setFlag(this.flags_, ComputedValue2.isBeingObservedMask_, newValue);
      }
    }, {
      key: "isPendingUnobservation",
      get: function get4() {
        return getFlag(this.flags_, ComputedValue2.isPendingUnobservationMask_);
      },
      set: function set5(newValue) {
        this.flags_ = setFlag(this.flags_, ComputedValue2.isPendingUnobservationMask_, newValue);
      }
    }, {
      key: "diffValue",
      get: function get4() {
        return getFlag(this.flags_, ComputedValue2.diffValueMask_) ? 1 : 0;
      },
      set: function set5(newValue) {
        this.flags_ = setFlag(this.flags_, ComputedValue2.diffValueMask_, newValue === 1 ? true : false);
      }
    }]);
  }();
  ComputedValue.isComputingMask_ = 1;
  ComputedValue.isRunningSetterMask_ = 2;
  ComputedValue.isBeingObservedMask_ = 4;
  ComputedValue.isPendingUnobservationMask_ = 8;
  ComputedValue.diffValueMask_ = 16;
  var isComputedValue = /* @__PURE__ */ createInstanceofPredicate("ComputedValue", ComputedValue);
  var IDerivationState_;
  (function(IDerivationState_2) {
    IDerivationState_2[IDerivationState_2["NOT_TRACKING_"] = -1] = "NOT_TRACKING_";
    IDerivationState_2[IDerivationState_2["UP_TO_DATE_"] = 0] = "UP_TO_DATE_";
    IDerivationState_2[IDerivationState_2["POSSIBLY_STALE_"] = 1] = "POSSIBLY_STALE_";
    IDerivationState_2[IDerivationState_2["STALE_"] = 2] = "STALE_";
  })(IDerivationState_ || (IDerivationState_ = {}));
  var TraceMode;
  (function(TraceMode2) {
    TraceMode2[TraceMode2["NONE"] = 0] = "NONE";
    TraceMode2[TraceMode2["LOG"] = 1] = "LOG";
    TraceMode2[TraceMode2["BREAK"] = 2] = "BREAK";
  })(TraceMode || (TraceMode = {}));
  var CaughtException = function CaughtException2(cause) {
    this.cause = void 0;
    this.cause = cause;
  };
  function isCaughtException(e) {
    return e instanceof CaughtException;
  }
  function shouldCompute(derivation) {
    switch (derivation.dependenciesState_) {
      case IDerivationState_.UP_TO_DATE_:
        return false;
      case IDerivationState_.NOT_TRACKING_:
      case IDerivationState_.STALE_:
        return true;
      case IDerivationState_.POSSIBLY_STALE_: {
        var prevAllowStateReads = allowStateReadsStart(true);
        var prevUntracked = untrackedStart();
        var obs = derivation.observing_, l2 = obs.length;
        for (var i = 0; i < l2; i++) {
          var obj = obs[i];
          if (isComputedValue(obj)) {
            if (globalState.disableErrorBoundaries) {
              obj.get();
            } else {
              try {
                obj.get();
              } catch (e) {
                untrackedEnd(prevUntracked);
                allowStateReadsEnd(prevAllowStateReads);
                return true;
              }
            }
            if (derivation.dependenciesState_ === IDerivationState_.STALE_) {
              untrackedEnd(prevUntracked);
              allowStateReadsEnd(prevAllowStateReads);
              return true;
            }
          }
        }
        changeDependenciesStateTo0(derivation);
        untrackedEnd(prevUntracked);
        allowStateReadsEnd(prevAllowStateReads);
        return false;
      }
    }
  }
  function checkIfStateModificationsAreAllowed(atom) {
    {
      return;
    }
  }
  function trackDerivedFunction(derivation, f2, context) {
    var prevAllowStateReads = allowStateReadsStart(true);
    changeDependenciesStateTo0(derivation);
    derivation.newObserving_ = new Array(
      // Reserve constant space for initial dependencies, dynamic space otherwise.
      // See https://github.com/mobxjs/mobx/pull/3833
      derivation.runId_ === 0 ? 100 : derivation.observing_.length
    );
    derivation.unboundDepsCount_ = 0;
    derivation.runId_ = ++globalState.runId;
    var prevTracking = globalState.trackingDerivation;
    globalState.trackingDerivation = derivation;
    globalState.inBatch++;
    var result;
    if (globalState.disableErrorBoundaries === true) {
      result = f2.call(context);
    } else {
      try {
        result = f2.call(context);
      } catch (e) {
        result = new CaughtException(e);
      }
    }
    globalState.inBatch--;
    globalState.trackingDerivation = prevTracking;
    bindDependencies(derivation);
    allowStateReadsEnd(prevAllowStateReads);
    return result;
  }
  function bindDependencies(derivation) {
    var prevObserving = derivation.observing_;
    var observing = derivation.observing_ = derivation.newObserving_;
    var lowestNewObservingDerivationState = IDerivationState_.UP_TO_DATE_;
    var i0 = 0, l2 = derivation.unboundDepsCount_;
    for (var i = 0; i < l2; i++) {
      var dep = observing[i];
      if (dep.diffValue === 0) {
        dep.diffValue = 1;
        if (i0 !== i) {
          observing[i0] = dep;
        }
        i0++;
      }
      if (dep.dependenciesState_ > lowestNewObservingDerivationState) {
        lowestNewObservingDerivationState = dep.dependenciesState_;
      }
    }
    observing.length = i0;
    derivation.newObserving_ = null;
    l2 = prevObserving.length;
    while (l2--) {
      var _dep = prevObserving[l2];
      if (_dep.diffValue === 0) {
        removeObserver(_dep, derivation);
      }
      _dep.diffValue = 0;
    }
    while (i0--) {
      var _dep2 = observing[i0];
      if (_dep2.diffValue === 1) {
        _dep2.diffValue = 0;
        addObserver(_dep2, derivation);
      }
    }
    if (lowestNewObservingDerivationState !== IDerivationState_.UP_TO_DATE_) {
      derivation.dependenciesState_ = lowestNewObservingDerivationState;
      derivation.onBecomeStale_();
    }
  }
  function clearObserving(derivation) {
    var obs = derivation.observing_;
    derivation.observing_ = [];
    var i = obs.length;
    while (i--) {
      removeObserver(obs[i], derivation);
    }
    derivation.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
  }
  function untracked(action2) {
    var prev = untrackedStart();
    try {
      return action2();
    } finally {
      untrackedEnd(prev);
    }
  }
  function untrackedStart() {
    var prev = globalState.trackingDerivation;
    globalState.trackingDerivation = null;
    return prev;
  }
  function untrackedEnd(prev) {
    globalState.trackingDerivation = prev;
  }
  function allowStateReadsStart(allowStateReads) {
    var prev = globalState.allowStateReads;
    globalState.allowStateReads = allowStateReads;
    return prev;
  }
  function allowStateReadsEnd(prev) {
    globalState.allowStateReads = prev;
  }
  function changeDependenciesStateTo0(derivation) {
    if (derivation.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
      return;
    }
    derivation.dependenciesState_ = IDerivationState_.UP_TO_DATE_;
    var obs = derivation.observing_;
    var i = obs.length;
    while (i--) {
      obs[i].lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
    }
  }
  var MobXGlobals = function MobXGlobals2() {
    this.version = 6;
    this.UNCHANGED = {};
    this.trackingDerivation = null;
    this.trackingContext = null;
    this.runId = 0;
    this.mobxGuid = 0;
    this.inBatch = 0;
    this.pendingUnobservations = [];
    this.pendingReactions = [];
    this.isRunningReactions = false;
    this.allowStateChanges = false;
    this.allowStateReads = true;
    this.enforceActions = true;
    this.spyListeners = [];
    this.globalReactionErrorHandlers = [];
    this.computedRequiresReaction = false;
    this.reactionRequiresObservable = false;
    this.observableRequiresReaction = false;
    this.disableErrorBoundaries = false;
    this.suppressReactionErrors = false;
    this.useProxies = true;
    this.verifyProxies = false;
    this.safeDescriptors = true;
  };
  var canMergeGlobalState = true;
  var isolateCalled = false;
  var globalState = /* @__PURE__ */ function() {
    var global2 = /* @__PURE__ */ getGlobal();
    if (global2.__mobxInstanceCount > 0 && !global2.__mobxGlobals) {
      canMergeGlobalState = false;
    }
    if (global2.__mobxGlobals && global2.__mobxGlobals.version !== new MobXGlobals().version) {
      canMergeGlobalState = false;
    }
    if (!canMergeGlobalState) {
      setTimeout(function() {
        if (!isolateCalled) {
          die(35);
        }
      }, 1);
      return new MobXGlobals();
    } else if (global2.__mobxGlobals) {
      global2.__mobxInstanceCount += 1;
      if (!global2.__mobxGlobals.UNCHANGED) {
        global2.__mobxGlobals.UNCHANGED = {};
      }
      return global2.__mobxGlobals;
    } else {
      global2.__mobxInstanceCount = 1;
      return global2.__mobxGlobals = /* @__PURE__ */ new MobXGlobals();
    }
  }();
  function isolateGlobalState() {
    if (globalState.pendingReactions.length || globalState.inBatch || globalState.isRunningReactions) {
      die(36);
    }
    isolateCalled = true;
    if (canMergeGlobalState) {
      var global2 = getGlobal();
      if (--global2.__mobxInstanceCount === 0) {
        global2.__mobxGlobals = void 0;
      }
      globalState = new MobXGlobals();
    }
  }
  function addObserver(observable2, node) {
    observable2.observers_.add(node);
    if (observable2.lowestObserverState_ > node.dependenciesState_) {
      observable2.lowestObserverState_ = node.dependenciesState_;
    }
  }
  function removeObserver(observable2, node) {
    observable2.observers_["delete"](node);
    if (observable2.observers_.size === 0) {
      queueForUnobservation(observable2);
    }
  }
  function queueForUnobservation(observable2) {
    if (observable2.isPendingUnobservation === false) {
      observable2.isPendingUnobservation = true;
      globalState.pendingUnobservations.push(observable2);
    }
  }
  function startBatch() {
    globalState.inBatch++;
  }
  function endBatch() {
    if (--globalState.inBatch === 0) {
      runReactions();
      var list = globalState.pendingUnobservations;
      for (var i = 0; i < list.length; i++) {
        var observable2 = list[i];
        observable2.isPendingUnobservation = false;
        if (observable2.observers_.size === 0) {
          if (observable2.isBeingObserved) {
            observable2.isBeingObserved = false;
            observable2.onBUO();
          }
          if (observable2 instanceof ComputedValue) {
            observable2.suspend_();
          }
        }
      }
      globalState.pendingUnobservations = [];
    }
  }
  function reportObserved(observable2) {
    var derivation = globalState.trackingDerivation;
    if (derivation !== null) {
      if (derivation.runId_ !== observable2.lastAccessedBy_) {
        observable2.lastAccessedBy_ = derivation.runId_;
        derivation.newObserving_[derivation.unboundDepsCount_++] = observable2;
        if (!observable2.isBeingObserved && globalState.trackingContext) {
          observable2.isBeingObserved = true;
          observable2.onBO();
        }
      }
      return observable2.isBeingObserved;
    } else if (observable2.observers_.size === 0 && globalState.inBatch > 0) {
      queueForUnobservation(observable2);
    }
    return false;
  }
  function propagateChanged(observable2) {
    if (observable2.lowestObserverState_ === IDerivationState_.STALE_) {
      return;
    }
    observable2.lowestObserverState_ = IDerivationState_.STALE_;
    observable2.observers_.forEach(function(d) {
      if (d.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
        d.onBecomeStale_();
      }
      d.dependenciesState_ = IDerivationState_.STALE_;
    });
  }
  function propagateChangeConfirmed(observable2) {
    if (observable2.lowestObserverState_ === IDerivationState_.STALE_) {
      return;
    }
    observable2.lowestObserverState_ = IDerivationState_.STALE_;
    observable2.observers_.forEach(function(d) {
      if (d.dependenciesState_ === IDerivationState_.POSSIBLY_STALE_) {
        d.dependenciesState_ = IDerivationState_.STALE_;
      } else if (d.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
        observable2.lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
      }
    });
  }
  function propagateMaybeChanged(observable2) {
    if (observable2.lowestObserverState_ !== IDerivationState_.UP_TO_DATE_) {
      return;
    }
    observable2.lowestObserverState_ = IDerivationState_.POSSIBLY_STALE_;
    observable2.observers_.forEach(function(d) {
      if (d.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
        d.dependenciesState_ = IDerivationState_.POSSIBLY_STALE_;
        d.onBecomeStale_();
      }
    });
  }
  var Reaction = /* @__PURE__ */ function() {
    function Reaction2(name_, onInvalidate_, errorHandler_, requiresObservable_) {
      if (name_ === void 0) {
        name_ = "Reaction";
      }
      this.name_ = void 0;
      this.onInvalidate_ = void 0;
      this.errorHandler_ = void 0;
      this.requiresObservable_ = void 0;
      this.observing_ = [];
      this.newObserving_ = [];
      this.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
      this.runId_ = 0;
      this.unboundDepsCount_ = 0;
      this.flags_ = 0;
      this.isTracing_ = TraceMode.NONE;
      this.name_ = name_;
      this.onInvalidate_ = onInvalidate_;
      this.errorHandler_ = errorHandler_;
      this.requiresObservable_ = requiresObservable_;
    }
    var _proto = Reaction2.prototype;
    _proto.onBecomeStale_ = function onBecomeStale_() {
      this.schedule_();
    };
    _proto.schedule_ = function schedule_() {
      if (!this.isScheduled) {
        this.isScheduled = true;
        globalState.pendingReactions.push(this);
        runReactions();
      }
    };
    _proto.runReaction_ = function runReaction_() {
      if (!this.isDisposed) {
        startBatch();
        this.isScheduled = false;
        var prev = globalState.trackingContext;
        globalState.trackingContext = this;
        if (shouldCompute(this)) {
          this.isTrackPending = true;
          try {
            this.onInvalidate_();
            if (false) ;
          } catch (e) {
            this.reportExceptionInDerivation_(e);
          }
        }
        globalState.trackingContext = prev;
        endBatch();
      }
    };
    _proto.track = function track(fn) {
      if (this.isDisposed) {
        return;
      }
      startBatch();
      this.isRunning = true;
      var prevReaction = globalState.trackingContext;
      globalState.trackingContext = this;
      var result = trackDerivedFunction(this, fn, void 0);
      globalState.trackingContext = prevReaction;
      this.isRunning = false;
      this.isTrackPending = false;
      if (this.isDisposed) {
        clearObserving(this);
      }
      if (isCaughtException(result)) {
        this.reportExceptionInDerivation_(result.cause);
      }
      endBatch();
    };
    _proto.reportExceptionInDerivation_ = function reportExceptionInDerivation_(error) {
      var _this = this;
      if (this.errorHandler_) {
        this.errorHandler_(error, this);
        return;
      }
      if (globalState.disableErrorBoundaries) {
        throw error;
      }
      var message = "[mobx] uncaught error in '" + this + "'";
      if (!globalState.suppressReactionErrors) {
        console.error(message, error);
      }
      globalState.globalReactionErrorHandlers.forEach(function(f2) {
        return f2(error, _this);
      });
    };
    _proto.dispose = function dispose() {
      if (!this.isDisposed) {
        this.isDisposed = true;
        if (!this.isRunning) {
          startBatch();
          clearObserving(this);
          endBatch();
        }
      }
    };
    _proto.getDisposer_ = function getDisposer_(abortSignal) {
      var _this2 = this;
      var dispose = function dispose2() {
        _this2.dispose();
        abortSignal == null || abortSignal.removeEventListener == null || abortSignal.removeEventListener("abort", dispose2);
      };
      abortSignal == null || abortSignal.addEventListener == null || abortSignal.addEventListener("abort", dispose);
      dispose[$mobx] = this;
      if ("dispose" in Symbol && typeof Symbol.dispose === "symbol") {
        dispose[Symbol.dispose] = dispose;
      }
      return dispose;
    };
    _proto.toString = function toString2() {
      return "Reaction[" + this.name_ + "]";
    };
    _proto.trace = function trace$1(enterBreakPoint) {
    };
    return _createClass(Reaction2, [{
      key: "isDisposed",
      get: function get4() {
        return getFlag(this.flags_, Reaction2.isDisposedMask_);
      },
      set: function set5(newValue) {
        this.flags_ = setFlag(this.flags_, Reaction2.isDisposedMask_, newValue);
      }
    }, {
      key: "isScheduled",
      get: function get4() {
        return getFlag(this.flags_, Reaction2.isScheduledMask_);
      },
      set: function set5(newValue) {
        this.flags_ = setFlag(this.flags_, Reaction2.isScheduledMask_, newValue);
      }
    }, {
      key: "isTrackPending",
      get: function get4() {
        return getFlag(this.flags_, Reaction2.isTrackPendingMask_);
      },
      set: function set5(newValue) {
        this.flags_ = setFlag(this.flags_, Reaction2.isTrackPendingMask_, newValue);
      }
    }, {
      key: "isRunning",
      get: function get4() {
        return getFlag(this.flags_, Reaction2.isRunningMask_);
      },
      set: function set5(newValue) {
        this.flags_ = setFlag(this.flags_, Reaction2.isRunningMask_, newValue);
      }
    }, {
      key: "diffValue",
      get: function get4() {
        return getFlag(this.flags_, Reaction2.diffValueMask_) ? 1 : 0;
      },
      set: function set5(newValue) {
        this.flags_ = setFlag(this.flags_, Reaction2.diffValueMask_, newValue === 1 ? true : false);
      }
    }]);
  }();
  Reaction.isDisposedMask_ = 1;
  Reaction.isScheduledMask_ = 2;
  Reaction.isTrackPendingMask_ = 4;
  Reaction.isRunningMask_ = 8;
  Reaction.diffValueMask_ = 16;
  var MAX_REACTION_ITERATIONS = 100;
  var reactionScheduler = function reactionScheduler2(f2) {
    return f2();
  };
  function runReactions() {
    if (globalState.inBatch > 0 || globalState.isRunningReactions) {
      return;
    }
    reactionScheduler(runReactionsHelper);
  }
  function runReactionsHelper() {
    globalState.isRunningReactions = true;
    var allReactions = globalState.pendingReactions;
    var iterations = 0;
    while (allReactions.length > 0) {
      if (++iterations === MAX_REACTION_ITERATIONS) {
        console.error("[mobx] cycle in reaction: " + allReactions[0]);
        allReactions.splice(0);
      }
      var remainingReactions = allReactions.splice(0);
      for (var i = 0, l2 = remainingReactions.length; i < l2; i++) {
        remainingReactions[i].runReaction_();
      }
    }
    globalState.isRunningReactions = false;
  }
  var isReaction = /* @__PURE__ */ createInstanceofPredicate("Reaction", Reaction);
  function setReactionScheduler(fn) {
    var baseScheduler = reactionScheduler;
    reactionScheduler = function reactionScheduler3(f2) {
      return fn(function() {
        return baseScheduler(f2);
      });
    };
  }
  function isSpyEnabled() {
    return false;
  }
  function spy(listener) {
    {
      console.warn("[mobx.spy] Is a no-op in production builds");
      return function() {
      };
    }
  }
  var ACTION = "action";
  var ACTION_BOUND = "action.bound";
  var AUTOACTION = "autoAction";
  var AUTOACTION_BOUND = "autoAction.bound";
  var DEFAULT_ACTION_NAME = "<unnamed action>";
  var actionAnnotation = /* @__PURE__ */ createActionAnnotation(ACTION);
  var actionBoundAnnotation = /* @__PURE__ */ createActionAnnotation(ACTION_BOUND, {
    bound: true
  });
  var autoActionAnnotation = /* @__PURE__ */ createActionAnnotation(AUTOACTION, {
    autoAction: true
  });
  var autoActionBoundAnnotation = /* @__PURE__ */ createActionAnnotation(AUTOACTION_BOUND, {
    autoAction: true,
    bound: true
  });
  function createActionFactory(autoAction2) {
    var res = function action2(arg1, arg2) {
      if (isFunction(arg1)) {
        return createAction(arg1.name || DEFAULT_ACTION_NAME, arg1, autoAction2);
      }
      if (isFunction(arg2)) {
        return createAction(arg1, arg2, autoAction2);
      }
      if (is20223Decorator(arg2)) {
        return (autoAction2 ? autoActionAnnotation : actionAnnotation).decorate_20223_(arg1, arg2);
      }
      if (isStringish(arg2)) {
        return storeAnnotation(arg1, arg2, autoAction2 ? autoActionAnnotation : actionAnnotation);
      }
      if (isStringish(arg1)) {
        return createDecoratorAnnotation(createActionAnnotation(autoAction2 ? AUTOACTION : ACTION, {
          name: arg1,
          autoAction: autoAction2
        }));
      }
    };
    return res;
  }
  var action = /* @__PURE__ */ createActionFactory(false);
  Object.assign(action, actionAnnotation);
  var autoAction = /* @__PURE__ */ createActionFactory(true);
  Object.assign(autoAction, autoActionAnnotation);
  action.bound = /* @__PURE__ */ createDecoratorAnnotation(actionBoundAnnotation);
  autoAction.bound = /* @__PURE__ */ createDecoratorAnnotation(autoActionBoundAnnotation);
  function runInAction(fn) {
    return executeAction(fn.name || DEFAULT_ACTION_NAME, false, fn, this, void 0);
  }
  function isAction(thing) {
    return isFunction(thing) && thing.isMobxAction === true;
  }
  function autorun(view, opts) {
    var _opts$name, _opts, _opts2, _opts3;
    if (opts === void 0) {
      opts = EMPTY_OBJECT;
    }
    var name = (_opts$name = (_opts = opts) == null ? void 0 : _opts.name) != null ? _opts$name : "Autorun";
    var runSync = !opts.scheduler && !opts.delay;
    var reaction2;
    if (runSync) {
      reaction2 = new Reaction(name, function() {
        this.track(reactionRunner);
      }, opts.onError, opts.requiresObservable);
    } else {
      var scheduler2 = createSchedulerFromOptions(opts);
      var isScheduled = false;
      reaction2 = new Reaction(name, function() {
        if (!isScheduled) {
          isScheduled = true;
          scheduler2(function() {
            isScheduled = false;
            if (!reaction2.isDisposed) {
              reaction2.track(reactionRunner);
            }
          });
        }
      }, opts.onError, opts.requiresObservable);
    }
    function reactionRunner() {
      view(reaction2);
    }
    if (!((_opts2 = opts) != null && (_opts2 = _opts2.signal) != null && _opts2.aborted)) {
      reaction2.schedule_();
    }
    return reaction2.getDisposer_((_opts3 = opts) == null ? void 0 : _opts3.signal);
  }
  var run = function run2(f2) {
    return f2();
  };
  function createSchedulerFromOptions(opts) {
    return opts.scheduler ? opts.scheduler : opts.delay ? function(f2) {
      return setTimeout(f2, opts.delay);
    } : run;
  }
  var ON_BECOME_OBSERVED = "onBO";
  var ON_BECOME_UNOBSERVED = "onBUO";
  function onBecomeObserved(thing, arg2, arg3) {
    return interceptHook(ON_BECOME_OBSERVED, thing, arg2, arg3);
  }
  function onBecomeUnobserved(thing, arg2, arg3) {
    return interceptHook(ON_BECOME_UNOBSERVED, thing, arg2, arg3);
  }
  function interceptHook(hook, thing, arg2, arg3) {
    var atom = getAtom(thing);
    var cb2 = isFunction(arg3) ? arg3 : arg2;
    var listenersKey = hook + "L";
    if (atom[listenersKey]) {
      atom[listenersKey].add(cb2);
    } else {
      atom[listenersKey] = /* @__PURE__ */ new Set([cb2]);
    }
    return function() {
      var hookListeners = atom[listenersKey];
      if (hookListeners) {
        hookListeners["delete"](cb2);
        if (hookListeners.size === 0) {
          delete atom[listenersKey];
        }
      }
    };
  }
  var NEVER = "never";
  var ALWAYS = "always";
  var OBSERVED = "observed";
  function configure(options) {
    if (options.isolateGlobalState === true) {
      isolateGlobalState();
    }
    var useProxies = options.useProxies, enforceActions = options.enforceActions;
    if (useProxies !== void 0) {
      globalState.useProxies = useProxies === ALWAYS ? true : useProxies === NEVER ? false : typeof Proxy !== "undefined";
    }
    if (useProxies === "ifavailable") {
      globalState.verifyProxies = true;
    }
    if (enforceActions !== void 0) {
      var ea2 = enforceActions === ALWAYS ? ALWAYS : enforceActions === OBSERVED;
      globalState.enforceActions = ea2;
      globalState.allowStateChanges = ea2 === true || ea2 === ALWAYS ? false : true;
    }
    ["computedRequiresReaction", "reactionRequiresObservable", "observableRequiresReaction", "disableErrorBoundaries", "safeDescriptors"].forEach(function(key) {
      if (key in options) {
        globalState[key] = !!options[key];
      }
    });
    globalState.allowStateReads = !globalState.observableRequiresReaction;
    if (options.reactionScheduler) {
      setReactionScheduler(options.reactionScheduler);
    }
  }
  function extendObservable(target, properties, annotations, options) {
    var descriptors = getOwnPropertyDescriptors(properties);
    initObservable(function() {
      var adm = asObservableObject(target, options)[$mobx];
      ownKeys(descriptors).forEach(function(key) {
        adm.extend_(
          key,
          descriptors[key],
          // must pass "undefined" for { key: undefined }
          !annotations ? true : key in annotations ? annotations[key] : true
        );
      });
    });
    return target;
  }
  function getDependencyTree(thing, property) {
    return nodeToDependencyTree(getAtom(thing, property));
  }
  function nodeToDependencyTree(node) {
    var result = {
      name: node.name_
    };
    if (node.observing_ && node.observing_.length > 0) {
      result.dependencies = unique(node.observing_).map(nodeToDependencyTree);
    }
    return result;
  }
  function unique(list) {
    return Array.from(new Set(list));
  }
  var generatorId = 0;
  var FlowCancellationError = /* @__PURE__ */ function(_Error) {
    function FlowCancellationError2() {
      var _this;
      _this = _Error.call(this, "FLOW_CANCELLED") || this;
      Object.setPrototypeOf(_this, (this instanceof FlowCancellationError2 ? this.constructor : void 0).prototype);
      _this.name = "FlowCancellationError";
      return _this;
    }
    _inheritsLoose(FlowCancellationError2, _Error);
    var _proto = FlowCancellationError2.prototype;
    _proto.toString = function toString2() {
      return "Error: " + this.message;
    };
    return FlowCancellationError2;
  }(/* @__PURE__ */ _wrapNativeSuper(Error));
  var flowAnnotation = /* @__PURE__ */ createFlowAnnotation("flow");
  var flowBoundAnnotation = /* @__PURE__ */ createFlowAnnotation("flow.bound", {
    bound: true
  });
  var flow = /* @__PURE__ */ Object.assign(function flow2(arg1, arg2) {
    if (is20223Decorator(arg2)) {
      return flowAnnotation.decorate_20223_(arg1, arg2);
    }
    if (isStringish(arg2)) {
      return storeAnnotation(arg1, arg2, flowAnnotation);
    }
    var generator = arg1;
    var name = generator.name || "<unnamed flow>";
    var res = function res2() {
      var ctx = this;
      var args = arguments;
      var runId = ++generatorId;
      var gen = action(name + " - runid: " + runId + " - init", generator).apply(ctx, args);
      var rejector;
      var pendingPromise = void 0;
      var promise = new Promise(function(resolve, reject) {
        var stepId = 0;
        rejector = reject;
        function onFulfilled(res3) {
          pendingPromise = void 0;
          var ret;
          try {
            ret = action(name + " - runid: " + runId + " - yield " + stepId++, gen.next).call(gen, res3);
          } catch (e) {
            return reject(e);
          }
          next(ret);
        }
        function onRejected(err) {
          pendingPromise = void 0;
          var ret;
          try {
            ret = action(name + " - runid: " + runId + " - yield " + stepId++, gen["throw"]).call(gen, err);
          } catch (e) {
            return reject(e);
          }
          next(ret);
        }
        function next(ret) {
          if (isFunction(ret == null ? void 0 : ret.then)) {
            ret.then(next, reject);
            return;
          }
          if (ret.done) {
            return resolve(ret.value);
          }
          pendingPromise = Promise.resolve(ret.value);
          return pendingPromise.then(onFulfilled, onRejected);
        }
        onFulfilled(void 0);
      });
      promise.cancel = action(name + " - runid: " + runId + " - cancel", function() {
        try {
          if (pendingPromise) {
            cancelPromise(pendingPromise);
          }
          var _res = gen["return"](void 0);
          var yieldedPromise = Promise.resolve(_res.value);
          yieldedPromise.then(noop, noop);
          cancelPromise(yieldedPromise);
          rejector(new FlowCancellationError());
        } catch (e) {
          rejector(e);
        }
      });
      return promise;
    };
    res.isMobXFlow = true;
    return res;
  }, flowAnnotation);
  flow.bound = /* @__PURE__ */ createDecoratorAnnotation(flowBoundAnnotation);
  function cancelPromise(promise) {
    if (isFunction(promise.cancel)) {
      promise.cancel();
    }
  }
  function isFlow(fn) {
    return (fn == null ? void 0 : fn.isMobXFlow) === true;
  }
  function _isObservable(value, property) {
    if (!value) {
      return false;
    }
    return isObservableObject(value) || !!value[$mobx] || isAtom(value) || isReaction(value) || isComputedValue(value);
  }
  function isObservable(value) {
    return _isObservable(value);
  }
  function transaction(action2, thisArg) {
    if (thisArg === void 0) {
      thisArg = void 0;
    }
    startBatch();
    try {
      return action2.apply(thisArg);
    } finally {
      endBatch();
    }
  }
  function getAdm(target) {
    return target[$mobx];
  }
  var objectProxyTraps = {
    has: function has2(target, name) {
      return getAdm(target).has_(name);
    },
    get: function get2(target, name) {
      return getAdm(target).get_(name);
    },
    set: function set3(target, name, value) {
      var _getAdm$set_;
      if (!isStringish(name)) {
        return false;
      }
      return (_getAdm$set_ = getAdm(target).set_(name, value, true)) != null ? _getAdm$set_ : true;
    },
    deleteProperty: function deleteProperty(target, name) {
      var _getAdm$delete_;
      if (!isStringish(name)) {
        return false;
      }
      return (_getAdm$delete_ = getAdm(target).delete_(name, true)) != null ? _getAdm$delete_ : true;
    },
    defineProperty: function defineProperty2(target, name, descriptor) {
      var _getAdm$definePropert;
      return (_getAdm$definePropert = getAdm(target).defineProperty_(name, descriptor)) != null ? _getAdm$definePropert : true;
    },
    ownKeys: function ownKeys2(target) {
      return getAdm(target).ownKeys_();
    },
    preventExtensions: function preventExtensions(target) {
      die(13);
    }
  };
  function asDynamicObservableObject(target, options) {
    var _target$$mobx, _target$$mobx$proxy_;
    assertProxies();
    target = asObservableObject(target, options);
    return (_target$$mobx$proxy_ = (_target$$mobx = target[$mobx]).proxy_) != null ? _target$$mobx$proxy_ : _target$$mobx.proxy_ = new Proxy(target, objectProxyTraps);
  }
  function hasInterceptors(interceptable) {
    return interceptable.interceptors_ !== void 0 && interceptable.interceptors_.length > 0;
  }
  function registerInterceptor(interceptable, handler) {
    var interceptors = interceptable.interceptors_ || (interceptable.interceptors_ = []);
    interceptors.push(handler);
    return once(function() {
      var idx = interceptors.indexOf(handler);
      if (idx !== -1) {
        interceptors.splice(idx, 1);
      }
    });
  }
  function interceptChange(interceptable, change) {
    var prevU = untrackedStart();
    try {
      var interceptors = [].concat(interceptable.interceptors_ || []);
      for (var i = 0, l2 = interceptors.length; i < l2; i++) {
        change = interceptors[i](change);
        if (change && !change.type) {
          die(14);
        }
        if (!change) {
          break;
        }
      }
      return change;
    } finally {
      untrackedEnd(prevU);
    }
  }
  function hasListeners(listenable) {
    return listenable.changeListeners_ !== void 0 && listenable.changeListeners_.length > 0;
  }
  function registerListener(listenable, handler) {
    var listeners = listenable.changeListeners_ || (listenable.changeListeners_ = []);
    listeners.push(handler);
    return once(function() {
      var idx = listeners.indexOf(handler);
      if (idx !== -1) {
        listeners.splice(idx, 1);
      }
    });
  }
  function notifyListeners(listenable, change) {
    var prevU = untrackedStart();
    var listeners = listenable.changeListeners_;
    if (!listeners) {
      return;
    }
    listeners = listeners.slice();
    for (var i = 0, l2 = listeners.length; i < l2; i++) {
      listeners[i](change);
    }
    untrackedEnd(prevU);
  }
  function makeObservable(target, annotations, options) {
    initObservable(function() {
      var _annotations;
      var adm = asObservableObject(target, options)[$mobx];
      if (false) ;
      (_annotations = annotations) != null ? _annotations : annotations = collectStoredAnnotations(target);
      ownKeys(annotations).forEach(function(key) {
        return adm.make_(key, annotations[key]);
      });
    });
    return target;
  }
  var SPLICE = "splice";
  var UPDATE = "update";
  var MAX_SPLICE_SIZE = 1e4;
  var arrayTraps = {
    get: function get3(target, name) {
      var adm = target[$mobx];
      if (name === $mobx) {
        return adm;
      }
      if (name === "length") {
        return adm.getArrayLength_();
      }
      if (typeof name === "string" && !isNaN(name)) {
        return adm.get_(parseInt(name));
      }
      if (hasProp(arrayExtensions, name)) {
        return arrayExtensions[name];
      }
      return target[name];
    },
    set: function set4(target, name, value) {
      var adm = target[$mobx];
      if (name === "length") {
        adm.setArrayLength_(value);
      }
      if (typeof name === "symbol" || isNaN(name)) {
        target[name] = value;
      } else {
        adm.set_(parseInt(name), value);
      }
      return true;
    },
    preventExtensions: function preventExtensions2() {
      die(15);
    }
  };
  var ObservableArrayAdministration = /* @__PURE__ */ function() {
    function ObservableArrayAdministration2(name, enhancer, owned_, legacyMode_) {
      if (name === void 0) {
        name = "ObservableArray";
      }
      this.owned_ = void 0;
      this.legacyMode_ = void 0;
      this.atom_ = void 0;
      this.values_ = [];
      this.interceptors_ = void 0;
      this.changeListeners_ = void 0;
      this.enhancer_ = void 0;
      this.dehancer = void 0;
      this.proxy_ = void 0;
      this.lastKnownLength_ = 0;
      this.owned_ = owned_;
      this.legacyMode_ = legacyMode_;
      this.atom_ = new Atom(name);
      this.enhancer_ = function(newV, oldV) {
        return enhancer(newV, oldV, "ObservableArray[..]");
      };
    }
    var _proto = ObservableArrayAdministration2.prototype;
    _proto.dehanceValue_ = function dehanceValue_(value) {
      if (this.dehancer !== void 0) {
        return this.dehancer(value);
      }
      return value;
    };
    _proto.dehanceValues_ = function dehanceValues_(values2) {
      if (this.dehancer !== void 0 && values2.length > 0) {
        return values2.map(this.dehancer);
      }
      return values2;
    };
    _proto.intercept_ = function intercept_(handler) {
      return registerInterceptor(this, handler);
    };
    _proto.observe_ = function observe_(listener, fireImmediately) {
      if (fireImmediately === void 0) {
        fireImmediately = false;
      }
      if (fireImmediately) {
        listener({
          observableKind: "array",
          object: this.proxy_,
          debugObjectName: this.atom_.name_,
          type: "splice",
          index: 0,
          added: this.values_.slice(),
          addedCount: this.values_.length,
          removed: [],
          removedCount: 0
        });
      }
      return registerListener(this, listener);
    };
    _proto.getArrayLength_ = function getArrayLength_() {
      this.atom_.reportObserved();
      return this.values_.length;
    };
    _proto.setArrayLength_ = function setArrayLength_(newLength) {
      if (typeof newLength !== "number" || isNaN(newLength) || newLength < 0) {
        die("Out of range: " + newLength);
      }
      var currentLength = this.values_.length;
      if (newLength === currentLength) {
        return;
      } else if (newLength > currentLength) {
        var newItems = new Array(newLength - currentLength);
        for (var i = 0; i < newLength - currentLength; i++) {
          newItems[i] = void 0;
        }
        this.spliceWithArray_(currentLength, 0, newItems);
      } else {
        this.spliceWithArray_(newLength, currentLength - newLength);
      }
    };
    _proto.updateArrayLength_ = function updateArrayLength_(oldLength, delta) {
      if (oldLength !== this.lastKnownLength_) {
        die(16);
      }
      this.lastKnownLength_ += delta;
      if (this.legacyMode_ && delta > 0) {
        reserveArrayBuffer(oldLength + delta + 1);
      }
    };
    _proto.spliceWithArray_ = function spliceWithArray_(index, deleteCount, newItems) {
      var _this = this;
      checkIfStateModificationsAreAllowed(this.atom_);
      var length = this.values_.length;
      if (index === void 0) {
        index = 0;
      } else if (index > length) {
        index = length;
      } else if (index < 0) {
        index = Math.max(0, length + index);
      }
      if (arguments.length === 1) {
        deleteCount = length - index;
      } else if (deleteCount === void 0 || deleteCount === null) {
        deleteCount = 0;
      } else {
        deleteCount = Math.max(0, Math.min(deleteCount, length - index));
      }
      if (newItems === void 0) {
        newItems = EMPTY_ARRAY;
      }
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          object: this.proxy_,
          type: SPLICE,
          index,
          removedCount: deleteCount,
          added: newItems
        });
        if (!change) {
          return EMPTY_ARRAY;
        }
        deleteCount = change.removedCount;
        newItems = change.added;
      }
      newItems = newItems.length === 0 ? newItems : newItems.map(function(v2) {
        return _this.enhancer_(v2, void 0);
      });
      if (this.legacyMode_ || false) {
        var lengthDelta = newItems.length - deleteCount;
        this.updateArrayLength_(length, lengthDelta);
      }
      var res = this.spliceItemsIntoValues_(index, deleteCount, newItems);
      if (deleteCount !== 0 || newItems.length !== 0) {
        this.notifyArraySplice_(index, newItems, res);
      }
      return this.dehanceValues_(res);
    };
    _proto.spliceItemsIntoValues_ = function spliceItemsIntoValues_(index, deleteCount, newItems) {
      if (newItems.length < MAX_SPLICE_SIZE) {
        var _this$values_;
        return (_this$values_ = this.values_).splice.apply(_this$values_, [index, deleteCount].concat(newItems));
      } else {
        var res = this.values_.slice(index, index + deleteCount);
        var oldItems = this.values_.slice(index + deleteCount);
        this.values_.length += newItems.length - deleteCount;
        for (var i = 0; i < newItems.length; i++) {
          this.values_[index + i] = newItems[i];
        }
        for (var _i = 0; _i < oldItems.length; _i++) {
          this.values_[index + newItems.length + _i] = oldItems[_i];
        }
        return res;
      }
    };
    _proto.notifyArrayChildUpdate_ = function notifyArrayChildUpdate_(index, newValue, oldValue) {
      var notifySpy = !this.owned_ && isSpyEnabled();
      var notify = hasListeners(this);
      var change = notify || notifySpy ? {
        observableKind: "array",
        object: this.proxy_,
        type: UPDATE,
        debugObjectName: this.atom_.name_,
        index,
        newValue,
        oldValue
      } : null;
      this.atom_.reportChanged();
      if (notify) {
        notifyListeners(this, change);
      }
    };
    _proto.notifyArraySplice_ = function notifyArraySplice_(index, added, removed) {
      var notifySpy = !this.owned_ && isSpyEnabled();
      var notify = hasListeners(this);
      var change = notify || notifySpy ? {
        observableKind: "array",
        object: this.proxy_,
        debugObjectName: this.atom_.name_,
        type: SPLICE,
        index,
        removed,
        added,
        removedCount: removed.length,
        addedCount: added.length
      } : null;
      this.atom_.reportChanged();
      if (notify) {
        notifyListeners(this, change);
      }
    };
    _proto.get_ = function get_(index) {
      if (this.legacyMode_ && index >= this.values_.length) {
        console.warn("[mobx] Out of bounds read: " + index);
        return void 0;
      }
      this.atom_.reportObserved();
      return this.dehanceValue_(this.values_[index]);
    };
    _proto.set_ = function set_(index, newValue) {
      var values2 = this.values_;
      if (this.legacyMode_ && index > values2.length) {
        die(17, index, values2.length);
      }
      if (index < values2.length) {
        checkIfStateModificationsAreAllowed(this.atom_);
        var oldValue = values2[index];
        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            type: UPDATE,
            object: this.proxy_,
            // since "this" is the real array we need to pass its proxy
            index,
            newValue
          });
          if (!change) {
            return;
          }
          newValue = change.newValue;
        }
        newValue = this.enhancer_(newValue, oldValue);
        var changed = newValue !== oldValue;
        if (changed) {
          values2[index] = newValue;
          this.notifyArrayChildUpdate_(index, newValue, oldValue);
        }
      } else {
        var newItems = new Array(index + 1 - values2.length);
        for (var i = 0; i < newItems.length - 1; i++) {
          newItems[i] = void 0;
        }
        newItems[newItems.length - 1] = newValue;
        this.spliceWithArray_(values2.length, 0, newItems);
      }
    };
    return ObservableArrayAdministration2;
  }();
  function createObservableArray(initialValues, enhancer, name, owned) {
    if (name === void 0) {
      name = "ObservableArray";
    }
    if (owned === void 0) {
      owned = false;
    }
    assertProxies();
    return initObservable(function() {
      var adm = new ObservableArrayAdministration(name, enhancer, owned, false);
      addHiddenFinalProp(adm.values_, $mobx, adm);
      var proxy = new Proxy(adm.values_, arrayTraps);
      adm.proxy_ = proxy;
      if (initialValues && initialValues.length) {
        adm.spliceWithArray_(0, 0, initialValues);
      }
      return proxy;
    });
  }
  var arrayExtensions = {
    clear: function clear() {
      return this.splice(0);
    },
    replace: function replace(newItems) {
      var adm = this[$mobx];
      return adm.spliceWithArray_(0, adm.values_.length, newItems);
    },
    // Used by JSON.stringify
    toJSON: function toJSON() {
      return this.slice();
    },
    /*
     * functions that do alter the internal structure of the array, (based on lib.es6.d.ts)
     * since these functions alter the inner structure of the array, the have side effects.
     * Because the have side effects, they should not be used in computed function,
     * and for that reason the do not call dependencyState.notifyObserved
     */
    splice: function splice(index, deleteCount) {
      for (var _len = arguments.length, newItems = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        newItems[_key - 2] = arguments[_key];
      }
      var adm = this[$mobx];
      switch (arguments.length) {
        case 0:
          return [];
        case 1:
          return adm.spliceWithArray_(index);
        case 2:
          return adm.spliceWithArray_(index, deleteCount);
      }
      return adm.spliceWithArray_(index, deleteCount, newItems);
    },
    spliceWithArray: function spliceWithArray(index, deleteCount, newItems) {
      return this[$mobx].spliceWithArray_(index, deleteCount, newItems);
    },
    push: function push() {
      var adm = this[$mobx];
      for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        items[_key2] = arguments[_key2];
      }
      adm.spliceWithArray_(adm.values_.length, 0, items);
      return adm.values_.length;
    },
    pop: function pop() {
      return this.splice(Math.max(this[$mobx].values_.length - 1, 0), 1)[0];
    },
    shift: function shift() {
      return this.splice(0, 1)[0];
    },
    unshift: function unshift() {
      var adm = this[$mobx];
      for (var _len3 = arguments.length, items = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        items[_key3] = arguments[_key3];
      }
      adm.spliceWithArray_(0, 0, items);
      return adm.values_.length;
    },
    reverse: function reverse() {
      if (globalState.trackingDerivation) {
        die(37, "reverse");
      }
      this.replace(this.slice().reverse());
      return this;
    },
    sort: function sort() {
      if (globalState.trackingDerivation) {
        die(37, "sort");
      }
      var copy = this.slice();
      copy.sort.apply(copy, arguments);
      this.replace(copy);
      return this;
    },
    remove: function remove2(value) {
      var adm = this[$mobx];
      var idx = adm.dehanceValues_(adm.values_).indexOf(value);
      if (idx > -1) {
        this.splice(idx, 1);
        return true;
      }
      return false;
    }
  };
  addArrayExtension("at", simpleFunc);
  addArrayExtension("concat", simpleFunc);
  addArrayExtension("flat", simpleFunc);
  addArrayExtension("includes", simpleFunc);
  addArrayExtension("indexOf", simpleFunc);
  addArrayExtension("join", simpleFunc);
  addArrayExtension("lastIndexOf", simpleFunc);
  addArrayExtension("slice", simpleFunc);
  addArrayExtension("toString", simpleFunc);
  addArrayExtension("toLocaleString", simpleFunc);
  addArrayExtension("toSorted", simpleFunc);
  addArrayExtension("toSpliced", simpleFunc);
  addArrayExtension("with", simpleFunc);
  addArrayExtension("every", mapLikeFunc);
  addArrayExtension("filter", mapLikeFunc);
  addArrayExtension("find", mapLikeFunc);
  addArrayExtension("findIndex", mapLikeFunc);
  addArrayExtension("findLast", mapLikeFunc);
  addArrayExtension("findLastIndex", mapLikeFunc);
  addArrayExtension("flatMap", mapLikeFunc);
  addArrayExtension("forEach", mapLikeFunc);
  addArrayExtension("map", mapLikeFunc);
  addArrayExtension("some", mapLikeFunc);
  addArrayExtension("toReversed", mapLikeFunc);
  addArrayExtension("reduce", reduceLikeFunc);
  addArrayExtension("reduceRight", reduceLikeFunc);
  function addArrayExtension(funcName, funcFactory) {
    if (typeof Array.prototype[funcName] === "function") {
      arrayExtensions[funcName] = funcFactory(funcName);
    }
  }
  function simpleFunc(funcName) {
    return function() {
      var adm = this[$mobx];
      adm.atom_.reportObserved();
      var dehancedValues = adm.dehanceValues_(adm.values_);
      return dehancedValues[funcName].apply(dehancedValues, arguments);
    };
  }
  function mapLikeFunc(funcName) {
    return function(callback, thisArg) {
      var _this2 = this;
      var adm = this[$mobx];
      adm.atom_.reportObserved();
      var dehancedValues = adm.dehanceValues_(adm.values_);
      return dehancedValues[funcName](function(element, index) {
        return callback.call(thisArg, element, index, _this2);
      });
    };
  }
  function reduceLikeFunc(funcName) {
    return function() {
      var _this3 = this;
      var adm = this[$mobx];
      adm.atom_.reportObserved();
      var dehancedValues = adm.dehanceValues_(adm.values_);
      var callback = arguments[0];
      arguments[0] = function(accumulator, currentValue, index) {
        return callback(accumulator, currentValue, index, _this3);
      };
      return dehancedValues[funcName].apply(dehancedValues, arguments);
    };
  }
  var isObservableArrayAdministration = /* @__PURE__ */ createInstanceofPredicate("ObservableArrayAdministration", ObservableArrayAdministration);
  function isObservableArray(thing) {
    return isObject(thing) && isObservableArrayAdministration(thing[$mobx]);
  }
  var ObservableMapMarker = {};
  var ADD = "add";
  var DELETE = "delete";
  var ObservableMap = /* @__PURE__ */ function() {
    function ObservableMap2(initialData, enhancer_, name_) {
      var _this = this;
      if (enhancer_ === void 0) {
        enhancer_ = deepEnhancer;
      }
      if (name_ === void 0) {
        name_ = "ObservableMap";
      }
      this.enhancer_ = void 0;
      this.name_ = void 0;
      this[$mobx] = ObservableMapMarker;
      this.data_ = void 0;
      this.hasMap_ = void 0;
      this.keysAtom_ = void 0;
      this.interceptors_ = void 0;
      this.changeListeners_ = void 0;
      this.dehancer = void 0;
      this.enhancer_ = enhancer_;
      this.name_ = name_;
      if (!isFunction(Map)) {
        die(18);
      }
      initObservable(function() {
        _this.keysAtom_ = createAtom(false ? _this.name_ + ".keys()" : "ObservableMap.keys()");
        _this.data_ = /* @__PURE__ */ new Map();
        _this.hasMap_ = /* @__PURE__ */ new Map();
        if (initialData) {
          _this.merge(initialData);
        }
      });
    }
    var _proto = ObservableMap2.prototype;
    _proto.has_ = function has_(key) {
      return this.data_.has(key);
    };
    _proto.has = function has3(key) {
      var _this2 = this;
      if (!globalState.trackingDerivation) {
        return this.has_(key);
      }
      var entry = this.hasMap_.get(key);
      if (!entry) {
        var newEntry = entry = new ObservableValue(this.has_(key), referenceEnhancer, "ObservableMap.key?", false);
        this.hasMap_.set(key, newEntry);
        onBecomeUnobserved(newEntry, function() {
          return _this2.hasMap_["delete"](key);
        });
      }
      return entry.get();
    };
    _proto.set = function set5(key, value) {
      var hasKey = this.has_(key);
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          type: hasKey ? UPDATE : ADD,
          object: this,
          newValue: value,
          name: key
        });
        if (!change) {
          return this;
        }
        value = change.newValue;
      }
      if (hasKey) {
        this.updateValue_(key, value);
      } else {
        this.addValue_(key, value);
      }
      return this;
    };
    _proto["delete"] = function _delete(key) {
      var _this3 = this;
      checkIfStateModificationsAreAllowed(this.keysAtom_);
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          type: DELETE,
          object: this,
          name: key
        });
        if (!change) {
          return false;
        }
      }
      if (this.has_(key)) {
        var notifySpy = isSpyEnabled();
        var notify = hasListeners(this);
        var _change = notify || notifySpy ? {
          observableKind: "map",
          debugObjectName: this.name_,
          type: DELETE,
          object: this,
          oldValue: this.data_.get(key).value_,
          name: key
        } : null;
        transaction(function() {
          var _this3$hasMap_$get;
          _this3.keysAtom_.reportChanged();
          (_this3$hasMap_$get = _this3.hasMap_.get(key)) == null || _this3$hasMap_$get.setNewValue_(false);
          var observable2 = _this3.data_.get(key);
          observable2.setNewValue_(void 0);
          _this3.data_["delete"](key);
        });
        if (notify) {
          notifyListeners(this, _change);
        }
        return true;
      }
      return false;
    };
    _proto.updateValue_ = function updateValue_(key, newValue) {
      var observable2 = this.data_.get(key);
      newValue = observable2.prepareNewValue_(newValue);
      if (newValue !== globalState.UNCHANGED) {
        var notifySpy = isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
          observableKind: "map",
          debugObjectName: this.name_,
          type: UPDATE,
          object: this,
          oldValue: observable2.value_,
          name: key,
          newValue
        } : null;
        observable2.setNewValue_(newValue);
        if (notify) {
          notifyListeners(this, change);
        }
      }
    };
    _proto.addValue_ = function addValue_(key, newValue) {
      var _this4 = this;
      checkIfStateModificationsAreAllowed(this.keysAtom_);
      transaction(function() {
        var _this4$hasMap_$get;
        var observable2 = new ObservableValue(newValue, _this4.enhancer_, "ObservableMap.key", false);
        _this4.data_.set(key, observable2);
        newValue = observable2.value_;
        (_this4$hasMap_$get = _this4.hasMap_.get(key)) == null || _this4$hasMap_$get.setNewValue_(true);
        _this4.keysAtom_.reportChanged();
      });
      var notifySpy = isSpyEnabled();
      var notify = hasListeners(this);
      var change = notify || notifySpy ? {
        observableKind: "map",
        debugObjectName: this.name_,
        type: ADD,
        object: this,
        name: key,
        newValue
      } : null;
      if (notify) {
        notifyListeners(this, change);
      }
    };
    _proto.get = function get4(key) {
      if (this.has(key)) {
        return this.dehanceValue_(this.data_.get(key).get());
      }
      return this.dehanceValue_(void 0);
    };
    _proto.dehanceValue_ = function dehanceValue_(value) {
      if (this.dehancer !== void 0) {
        return this.dehancer(value);
      }
      return value;
    };
    _proto.keys = function keys2() {
      this.keysAtom_.reportObserved();
      return this.data_.keys();
    };
    _proto.values = function values2() {
      var self2 = this;
      var keys2 = this.keys();
      return makeIterableForMap({
        next: function next() {
          var _keys$next = keys2.next(), done = _keys$next.done, value = _keys$next.value;
          return {
            done,
            value: done ? void 0 : self2.get(value)
          };
        }
      });
    };
    _proto.entries = function entries2() {
      var self2 = this;
      var keys2 = this.keys();
      return makeIterableForMap({
        next: function next() {
          var _keys$next2 = keys2.next(), done = _keys$next2.done, value = _keys$next2.value;
          return {
            done,
            value: done ? void 0 : [value, self2.get(value)]
          };
        }
      });
    };
    _proto[Symbol.iterator] = function() {
      return this.entries();
    };
    _proto.forEach = function forEach(callback, thisArg) {
      for (var _iterator = _createForOfIteratorHelperLoose(this), _step; !(_step = _iterator()).done; ) {
        var _step$value = _step.value, key = _step$value[0], value = _step$value[1];
        callback.call(thisArg, value, key, this);
      }
    };
    _proto.merge = function merge(other) {
      var _this5 = this;
      if (isObservableMap(other)) {
        other = new Map(other);
      }
      transaction(function() {
        if (isPlainObject(other)) {
          getPlainObjectKeys(other).forEach(function(key) {
            return _this5.set(key, other[key]);
          });
        } else if (Array.isArray(other)) {
          other.forEach(function(_ref) {
            var key = _ref[0], value = _ref[1];
            return _this5.set(key, value);
          });
        } else if (isES6Map(other)) {
          if (!isPlainES6Map(other)) {
            die(19, other);
          }
          other.forEach(function(value, key) {
            return _this5.set(key, value);
          });
        } else if (other !== null && other !== void 0) {
          die(20, other);
        }
      });
      return this;
    };
    _proto.clear = function clear2() {
      var _this6 = this;
      transaction(function() {
        untracked(function() {
          for (var _iterator2 = _createForOfIteratorHelperLoose(_this6.keys()), _step2; !(_step2 = _iterator2()).done; ) {
            var key = _step2.value;
            _this6["delete"](key);
          }
        });
      });
    };
    _proto.replace = function replace2(values2) {
      var _this7 = this;
      transaction(function() {
        var replacementMap = convertToMap(values2);
        var orderedData = /* @__PURE__ */ new Map();
        var keysReportChangedCalled = false;
        for (var _iterator3 = _createForOfIteratorHelperLoose(_this7.data_.keys()), _step3; !(_step3 = _iterator3()).done; ) {
          var key = _step3.value;
          if (!replacementMap.has(key)) {
            var deleted = _this7["delete"](key);
            if (deleted) {
              keysReportChangedCalled = true;
            } else {
              var value = _this7.data_.get(key);
              orderedData.set(key, value);
            }
          }
        }
        for (var _iterator4 = _createForOfIteratorHelperLoose(replacementMap.entries()), _step4; !(_step4 = _iterator4()).done; ) {
          var _step4$value = _step4.value, _key = _step4$value[0], _value = _step4$value[1];
          var keyExisted = _this7.data_.has(_key);
          _this7.set(_key, _value);
          if (_this7.data_.has(_key)) {
            var _value2 = _this7.data_.get(_key);
            orderedData.set(_key, _value2);
            if (!keyExisted) {
              keysReportChangedCalled = true;
            }
          }
        }
        if (!keysReportChangedCalled) {
          if (_this7.data_.size !== orderedData.size) {
            _this7.keysAtom_.reportChanged();
          } else {
            var iter1 = _this7.data_.keys();
            var iter2 = orderedData.keys();
            var next1 = iter1.next();
            var next2 = iter2.next();
            while (!next1.done) {
              if (next1.value !== next2.value) {
                _this7.keysAtom_.reportChanged();
                break;
              }
              next1 = iter1.next();
              next2 = iter2.next();
            }
          }
        }
        _this7.data_ = orderedData;
      });
      return this;
    };
    _proto.toString = function toString2() {
      return "[object ObservableMap]";
    };
    _proto.toJSON = function toJSON2() {
      return Array.from(this);
    };
    _proto.observe_ = function observe_(listener, fireImmediately) {
      return registerListener(this, listener);
    };
    _proto.intercept_ = function intercept_(handler) {
      return registerInterceptor(this, handler);
    };
    return _createClass(ObservableMap2, [{
      key: "size",
      get: function get4() {
        this.keysAtom_.reportObserved();
        return this.data_.size;
      }
    }, {
      key: Symbol.toStringTag,
      get: function get4() {
        return "Map";
      }
    }]);
  }();
  var isObservableMap = /* @__PURE__ */ createInstanceofPredicate("ObservableMap", ObservableMap);
  function makeIterableForMap(iterator) {
    iterator[Symbol.toStringTag] = "MapIterator";
    return makeIterable(iterator);
  }
  function convertToMap(dataStructure) {
    if (isES6Map(dataStructure) || isObservableMap(dataStructure)) {
      return dataStructure;
    } else if (Array.isArray(dataStructure)) {
      return new Map(dataStructure);
    } else if (isPlainObject(dataStructure)) {
      var map2 = /* @__PURE__ */ new Map();
      for (var key in dataStructure) {
        map2.set(key, dataStructure[key]);
      }
      return map2;
    } else {
      return die(21, dataStructure);
    }
  }
  var ObservableSetMarker = {};
  var ObservableSet = /* @__PURE__ */ function() {
    function ObservableSet2(initialData, enhancer, name_) {
      var _this = this;
      if (enhancer === void 0) {
        enhancer = deepEnhancer;
      }
      if (name_ === void 0) {
        name_ = "ObservableSet";
      }
      this.name_ = void 0;
      this[$mobx] = ObservableSetMarker;
      this.data_ = /* @__PURE__ */ new Set();
      this.atom_ = void 0;
      this.changeListeners_ = void 0;
      this.interceptors_ = void 0;
      this.dehancer = void 0;
      this.enhancer_ = void 0;
      this.name_ = name_;
      if (!isFunction(Set)) {
        die(22);
      }
      this.enhancer_ = function(newV, oldV) {
        return enhancer(newV, oldV, name_);
      };
      initObservable(function() {
        _this.atom_ = createAtom(_this.name_);
        if (initialData) {
          _this.replace(initialData);
        }
      });
    }
    var _proto = ObservableSet2.prototype;
    _proto.dehanceValue_ = function dehanceValue_(value) {
      if (this.dehancer !== void 0) {
        return this.dehancer(value);
      }
      return value;
    };
    _proto.clear = function clear2() {
      var _this2 = this;
      transaction(function() {
        untracked(function() {
          for (var _iterator = _createForOfIteratorHelperLoose(_this2.data_.values()), _step; !(_step = _iterator()).done; ) {
            var value = _step.value;
            _this2["delete"](value);
          }
        });
      });
    };
    _proto.forEach = function forEach(callbackFn, thisArg) {
      for (var _iterator2 = _createForOfIteratorHelperLoose(this), _step2; !(_step2 = _iterator2()).done; ) {
        var value = _step2.value;
        callbackFn.call(thisArg, value, value, this);
      }
    };
    _proto.add = function add(value) {
      var _this3 = this;
      checkIfStateModificationsAreAllowed(this.atom_);
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          type: ADD,
          object: this,
          newValue: value
        });
        if (!change) {
          return this;
        }
        value = change.newValue;
      }
      if (!this.has(value)) {
        transaction(function() {
          _this3.data_.add(_this3.enhancer_(value, void 0));
          _this3.atom_.reportChanged();
        });
        var notifySpy = false;
        var notify = hasListeners(this);
        var _change = notify || notifySpy ? {
          observableKind: "set",
          debugObjectName: this.name_,
          type: ADD,
          object: this,
          newValue: value
        } : null;
        if (notify) {
          notifyListeners(this, _change);
        }
      }
      return this;
    };
    _proto["delete"] = function _delete(value) {
      var _this4 = this;
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          type: DELETE,
          object: this,
          oldValue: value
        });
        if (!change) {
          return false;
        }
      }
      if (this.has(value)) {
        var notifySpy = false;
        var notify = hasListeners(this);
        var _change2 = notify || notifySpy ? {
          observableKind: "set",
          debugObjectName: this.name_,
          type: DELETE,
          object: this,
          oldValue: value
        } : null;
        transaction(function() {
          _this4.atom_.reportChanged();
          _this4.data_["delete"](value);
        });
        if (notify) {
          notifyListeners(this, _change2);
        }
        return true;
      }
      return false;
    };
    _proto.has = function has3(value) {
      this.atom_.reportObserved();
      return this.data_.has(this.dehanceValue_(value));
    };
    _proto.entries = function entries2() {
      var values2 = this.values();
      return makeIterableForSet({
        next: function next() {
          var _values$next = values2.next(), value = _values$next.value, done = _values$next.done;
          return !done ? {
            value: [value, value],
            done
          } : {
            value: void 0,
            done
          };
        }
      });
    };
    _proto.keys = function keys2() {
      return this.values();
    };
    _proto.values = function values2() {
      this.atom_.reportObserved();
      var self2 = this;
      var values3 = this.data_.values();
      return makeIterableForSet({
        next: function next() {
          var _values$next2 = values3.next(), value = _values$next2.value, done = _values$next2.done;
          return !done ? {
            value: self2.dehanceValue_(value),
            done
          } : {
            value: void 0,
            done
          };
        }
      });
    };
    _proto.intersection = function intersection(otherSet) {
      if (isES6Set(otherSet) && !isObservableSet(otherSet)) {
        return otherSet.intersection(this);
      } else {
        var dehancedSet = new Set(this);
        return dehancedSet.intersection(otherSet);
      }
    };
    _proto.union = function union(otherSet) {
      if (isES6Set(otherSet) && !isObservableSet(otherSet)) {
        return otherSet.union(this);
      } else {
        var dehancedSet = new Set(this);
        return dehancedSet.union(otherSet);
      }
    };
    _proto.difference = function difference(otherSet) {
      return new Set(this).difference(otherSet);
    };
    _proto.symmetricDifference = function symmetricDifference(otherSet) {
      if (isES6Set(otherSet) && !isObservableSet(otherSet)) {
        return otherSet.symmetricDifference(this);
      } else {
        var dehancedSet = new Set(this);
        return dehancedSet.symmetricDifference(otherSet);
      }
    };
    _proto.isSubsetOf = function isSubsetOf(otherSet) {
      return new Set(this).isSubsetOf(otherSet);
    };
    _proto.isSupersetOf = function isSupersetOf(otherSet) {
      return new Set(this).isSupersetOf(otherSet);
    };
    _proto.isDisjointFrom = function isDisjointFrom(otherSet) {
      if (isES6Set(otherSet) && !isObservableSet(otherSet)) {
        return otherSet.isDisjointFrom(this);
      } else {
        var dehancedSet = new Set(this);
        return dehancedSet.isDisjointFrom(otherSet);
      }
    };
    _proto.replace = function replace2(other) {
      var _this5 = this;
      if (isObservableSet(other)) {
        other = new Set(other);
      }
      transaction(function() {
        if (Array.isArray(other)) {
          _this5.clear();
          other.forEach(function(value) {
            return _this5.add(value);
          });
        } else if (isES6Set(other)) {
          _this5.clear();
          other.forEach(function(value) {
            return _this5.add(value);
          });
        } else if (other !== null && other !== void 0) {
          die("Cannot initialize set from " + other);
        }
      });
      return this;
    };
    _proto.observe_ = function observe_(listener, fireImmediately) {
      return registerListener(this, listener);
    };
    _proto.intercept_ = function intercept_(handler) {
      return registerInterceptor(this, handler);
    };
    _proto.toJSON = function toJSON2() {
      return Array.from(this);
    };
    _proto.toString = function toString2() {
      return "[object ObservableSet]";
    };
    _proto[Symbol.iterator] = function() {
      return this.values();
    };
    return _createClass(ObservableSet2, [{
      key: "size",
      get: function get4() {
        this.atom_.reportObserved();
        return this.data_.size;
      }
    }, {
      key: Symbol.toStringTag,
      get: function get4() {
        return "Set";
      }
    }]);
  }();
  var isObservableSet = /* @__PURE__ */ createInstanceofPredicate("ObservableSet", ObservableSet);
  function makeIterableForSet(iterator) {
    iterator[Symbol.toStringTag] = "SetIterator";
    return makeIterable(iterator);
  }
  var descriptorCache = /* @__PURE__ */ Object.create(null);
  var REMOVE = "remove";
  var ObservableObjectAdministration = /* @__PURE__ */ function() {
    function ObservableObjectAdministration2(target_, values_, name_, defaultAnnotation_) {
      if (values_ === void 0) {
        values_ = /* @__PURE__ */ new Map();
      }
      if (defaultAnnotation_ === void 0) {
        defaultAnnotation_ = autoAnnotation;
      }
      this.target_ = void 0;
      this.values_ = void 0;
      this.name_ = void 0;
      this.defaultAnnotation_ = void 0;
      this.keysAtom_ = void 0;
      this.changeListeners_ = void 0;
      this.interceptors_ = void 0;
      this.proxy_ = void 0;
      this.isPlainObject_ = void 0;
      this.appliedAnnotations_ = void 0;
      this.pendingKeys_ = void 0;
      this.target_ = target_;
      this.values_ = values_;
      this.name_ = name_;
      this.defaultAnnotation_ = defaultAnnotation_;
      this.keysAtom_ = new Atom("ObservableObject.keys");
      this.isPlainObject_ = isPlainObject(this.target_);
    }
    var _proto = ObservableObjectAdministration2.prototype;
    _proto.getObservablePropValue_ = function getObservablePropValue_(key) {
      return this.values_.get(key).get();
    };
    _proto.setObservablePropValue_ = function setObservablePropValue_(key, newValue) {
      var observable2 = this.values_.get(key);
      if (observable2 instanceof ComputedValue) {
        observable2.set(newValue);
        return true;
      }
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          type: UPDATE,
          object: this.proxy_ || this.target_,
          name: key,
          newValue
        });
        if (!change) {
          return null;
        }
        newValue = change.newValue;
      }
      newValue = observable2.prepareNewValue_(newValue);
      if (newValue !== globalState.UNCHANGED) {
        var notify = hasListeners(this);
        var notifySpy = false;
        var _change = notify || notifySpy ? {
          type: UPDATE,
          observableKind: "object",
          debugObjectName: this.name_,
          object: this.proxy_ || this.target_,
          oldValue: observable2.value_,
          name: key,
          newValue
        } : null;
        observable2.setNewValue_(newValue);
        if (notify) {
          notifyListeners(this, _change);
        }
      }
      return true;
    };
    _proto.get_ = function get_(key) {
      if (globalState.trackingDerivation && !hasProp(this.target_, key)) {
        this.has_(key);
      }
      return this.target_[key];
    };
    _proto.set_ = function set_(key, value, proxyTrap) {
      if (proxyTrap === void 0) {
        proxyTrap = false;
      }
      if (hasProp(this.target_, key)) {
        if (this.values_.has(key)) {
          return this.setObservablePropValue_(key, value);
        } else if (proxyTrap) {
          return Reflect.set(this.target_, key, value);
        } else {
          this.target_[key] = value;
          return true;
        }
      } else {
        return this.extend_(key, {
          value,
          enumerable: true,
          writable: true,
          configurable: true
        }, this.defaultAnnotation_, proxyTrap);
      }
    };
    _proto.has_ = function has_(key) {
      if (!globalState.trackingDerivation) {
        return key in this.target_;
      }
      this.pendingKeys_ || (this.pendingKeys_ = /* @__PURE__ */ new Map());
      var entry = this.pendingKeys_.get(key);
      if (!entry) {
        entry = new ObservableValue(key in this.target_, referenceEnhancer, "ObservableObject.key?", false);
        this.pendingKeys_.set(key, entry);
      }
      return entry.get();
    };
    _proto.make_ = function make_2(key, annotation) {
      if (annotation === true) {
        annotation = this.defaultAnnotation_;
      }
      if (annotation === false) {
        return;
      }
      if (!(key in this.target_)) {
        var _this$target_$storedA;
        if ((_this$target_$storedA = this.target_[storedAnnotationsSymbol]) != null && _this$target_$storedA[key]) {
          return;
        } else {
          die(1, annotation.annotationType_, this.name_ + "." + key.toString());
        }
      }
      var source = this.target_;
      while (source && source !== objectPrototype) {
        var descriptor = getDescriptor(source, key);
        if (descriptor) {
          var outcome = annotation.make_(this, key, descriptor, source);
          if (outcome === 0) {
            return;
          }
          if (outcome === 1) {
            break;
          }
        }
        source = Object.getPrototypeOf(source);
      }
      recordAnnotationApplied(this, annotation, key);
    };
    _proto.extend_ = function extend_2(key, descriptor, annotation, proxyTrap) {
      if (proxyTrap === void 0) {
        proxyTrap = false;
      }
      if (annotation === true) {
        annotation = this.defaultAnnotation_;
      }
      if (annotation === false) {
        return this.defineProperty_(key, descriptor, proxyTrap);
      }
      var outcome = annotation.extend_(this, key, descriptor, proxyTrap);
      if (outcome) {
        recordAnnotationApplied(this, annotation, key);
      }
      return outcome;
    };
    _proto.defineProperty_ = function defineProperty_(key, descriptor, proxyTrap) {
      if (proxyTrap === void 0) {
        proxyTrap = false;
      }
      checkIfStateModificationsAreAllowed(this.keysAtom_);
      try {
        startBatch();
        var deleteOutcome = this.delete_(key);
        if (!deleteOutcome) {
          return deleteOutcome;
        }
        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            object: this.proxy_ || this.target_,
            name: key,
            type: ADD,
            newValue: descriptor.value
          });
          if (!change) {
            return null;
          }
          var newValue = change.newValue;
          if (descriptor.value !== newValue) {
            descriptor = _extends({}, descriptor, {
              value: newValue
            });
          }
        }
        if (proxyTrap) {
          if (!Reflect.defineProperty(this.target_, key, descriptor)) {
            return false;
          }
        } else {
          defineProperty(this.target_, key, descriptor);
        }
        this.notifyPropertyAddition_(key, descriptor.value);
      } finally {
        endBatch();
      }
      return true;
    };
    _proto.defineObservableProperty_ = function defineObservableProperty_(key, value, enhancer, proxyTrap) {
      if (proxyTrap === void 0) {
        proxyTrap = false;
      }
      checkIfStateModificationsAreAllowed(this.keysAtom_);
      try {
        startBatch();
        var deleteOutcome = this.delete_(key);
        if (!deleteOutcome) {
          return deleteOutcome;
        }
        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            object: this.proxy_ || this.target_,
            name: key,
            type: ADD,
            newValue: value
          });
          if (!change) {
            return null;
          }
          value = change.newValue;
        }
        var cachedDescriptor = getCachedObservablePropDescriptor(key);
        var descriptor = {
          configurable: globalState.safeDescriptors ? this.isPlainObject_ : true,
          enumerable: true,
          get: cachedDescriptor.get,
          set: cachedDescriptor.set
        };
        if (proxyTrap) {
          if (!Reflect.defineProperty(this.target_, key, descriptor)) {
            return false;
          }
        } else {
          defineProperty(this.target_, key, descriptor);
        }
        var observable2 = new ObservableValue(value, enhancer, false ? this.name_ + "." + key.toString() : "ObservableObject.key", false);
        this.values_.set(key, observable2);
        this.notifyPropertyAddition_(key, observable2.value_);
      } finally {
        endBatch();
      }
      return true;
    };
    _proto.defineComputedProperty_ = function defineComputedProperty_(key, options, proxyTrap) {
      if (proxyTrap === void 0) {
        proxyTrap = false;
      }
      checkIfStateModificationsAreAllowed(this.keysAtom_);
      try {
        startBatch();
        var deleteOutcome = this.delete_(key);
        if (!deleteOutcome) {
          return deleteOutcome;
        }
        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            object: this.proxy_ || this.target_,
            name: key,
            type: ADD,
            newValue: void 0
          });
          if (!change) {
            return null;
          }
        }
        options.name || (options.name = false ? this.name_ + "." + key.toString() : "ObservableObject.key");
        options.context = this.proxy_ || this.target_;
        var cachedDescriptor = getCachedObservablePropDescriptor(key);
        var descriptor = {
          configurable: globalState.safeDescriptors ? this.isPlainObject_ : true,
          enumerable: false,
          get: cachedDescriptor.get,
          set: cachedDescriptor.set
        };
        if (proxyTrap) {
          if (!Reflect.defineProperty(this.target_, key, descriptor)) {
            return false;
          }
        } else {
          defineProperty(this.target_, key, descriptor);
        }
        this.values_.set(key, new ComputedValue(options));
        this.notifyPropertyAddition_(key, void 0);
      } finally {
        endBatch();
      }
      return true;
    };
    _proto.delete_ = function delete_(key, proxyTrap) {
      if (proxyTrap === void 0) {
        proxyTrap = false;
      }
      checkIfStateModificationsAreAllowed(this.keysAtom_);
      if (!hasProp(this.target_, key)) {
        return true;
      }
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          object: this.proxy_ || this.target_,
          name: key,
          type: REMOVE
        });
        if (!change) {
          return null;
        }
      }
      try {
        var _this$pendingKeys_;
        startBatch();
        var notify = hasListeners(this);
        var notifySpy = false;
        var observable2 = this.values_.get(key);
        var value = void 0;
        if (!observable2 && (notify || notifySpy)) {
          var _getDescriptor2;
          value = (_getDescriptor2 = getDescriptor(this.target_, key)) == null ? void 0 : _getDescriptor2.value;
        }
        if (proxyTrap) {
          if (!Reflect.deleteProperty(this.target_, key)) {
            return false;
          }
        } else {
          delete this.target_[key];
        }
        if (false) ;
        if (observable2) {
          this.values_["delete"](key);
          if (observable2 instanceof ObservableValue) {
            value = observable2.value_;
          }
          propagateChanged(observable2);
        }
        this.keysAtom_.reportChanged();
        (_this$pendingKeys_ = this.pendingKeys_) == null || (_this$pendingKeys_ = _this$pendingKeys_.get(key)) == null || _this$pendingKeys_.set(key in this.target_);
        if (notify || notifySpy) {
          var _change2 = {
            type: REMOVE,
            observableKind: "object",
            object: this.proxy_ || this.target_,
            debugObjectName: this.name_,
            oldValue: value,
            name: key
          };
          if (false) ;
          if (notify) {
            notifyListeners(this, _change2);
          }
          if (false) ;
        }
      } finally {
        endBatch();
      }
      return true;
    };
    _proto.observe_ = function observe_(callback, fireImmediately) {
      return registerListener(this, callback);
    };
    _proto.intercept_ = function intercept_(handler) {
      return registerInterceptor(this, handler);
    };
    _proto.notifyPropertyAddition_ = function notifyPropertyAddition_(key, value) {
      var _this$pendingKeys_2;
      var notify = hasListeners(this);
      var notifySpy = false;
      if (notify || notifySpy) {
        var change = notify || notifySpy ? {
          type: ADD,
          observableKind: "object",
          debugObjectName: this.name_,
          object: this.proxy_ || this.target_,
          name: key,
          newValue: value
        } : null;
        if (notify) {
          notifyListeners(this, change);
        }
      }
      (_this$pendingKeys_2 = this.pendingKeys_) == null || (_this$pendingKeys_2 = _this$pendingKeys_2.get(key)) == null || _this$pendingKeys_2.set(true);
      this.keysAtom_.reportChanged();
    };
    _proto.ownKeys_ = function ownKeys_() {
      this.keysAtom_.reportObserved();
      return ownKeys(this.target_);
    };
    _proto.keys_ = function keys_() {
      this.keysAtom_.reportObserved();
      return Object.keys(this.target_);
    };
    return ObservableObjectAdministration2;
  }();
  function asObservableObject(target, options) {
    var _options$name;
    if (hasProp(target, $mobx)) {
      return target;
    }
    var name = (_options$name = options == null ? void 0 : options.name) != null ? _options$name : "ObservableObject";
    var adm = new ObservableObjectAdministration(target, /* @__PURE__ */ new Map(), String(name), getAnnotationFromOptions(options));
    addHiddenProp(target, $mobx, adm);
    return target;
  }
  var isObservableObjectAdministration = /* @__PURE__ */ createInstanceofPredicate("ObservableObjectAdministration", ObservableObjectAdministration);
  function getCachedObservablePropDescriptor(key) {
    return descriptorCache[key] || (descriptorCache[key] = {
      get: function get4() {
        return this[$mobx].getObservablePropValue_(key);
      },
      set: function set5(value) {
        return this[$mobx].setObservablePropValue_(key, value);
      }
    });
  }
  function isObservableObject(thing) {
    if (isObject(thing)) {
      return isObservableObjectAdministration(thing[$mobx]);
    }
    return false;
  }
  function recordAnnotationApplied(adm, annotation, key) {
    var _adm$target_$storedAn;
    (_adm$target_$storedAn = adm.target_[storedAnnotationsSymbol]) == null || delete _adm$target_$storedAn[key];
  }
  var ENTRY_0 = /* @__PURE__ */ createArrayEntryDescriptor(0);
  var safariPrototypeSetterInheritanceBug = /* @__PURE__ */ function() {
    var v2 = false;
    var p2 = {};
    Object.defineProperty(p2, "0", {
      set: function set5() {
        v2 = true;
      }
    });
    Object.create(p2)["0"] = 1;
    return v2 === false;
  }();
  var OBSERVABLE_ARRAY_BUFFER_SIZE = 0;
  var StubArray = function StubArray2() {
  };
  function inherit(ctor, proto) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(ctor.prototype, proto);
    } else if (ctor.prototype.__proto__ !== void 0) {
      ctor.prototype.__proto__ = proto;
    } else {
      ctor.prototype = proto;
    }
  }
  inherit(StubArray, Array.prototype);
  var LegacyObservableArray = /* @__PURE__ */ function(_StubArray) {
    function LegacyObservableArray2(initialValues, enhancer, name, owned) {
      var _this;
      if (name === void 0) {
        name = "ObservableArray";
      }
      if (owned === void 0) {
        owned = false;
      }
      _this = _StubArray.call(this) || this;
      initObservable(function() {
        var adm = new ObservableArrayAdministration(name, enhancer, owned, true);
        adm.proxy_ = _this;
        addHiddenFinalProp(_this, $mobx, adm);
        if (initialValues && initialValues.length) {
          _this.spliceWithArray(0, 0, initialValues);
        }
        if (safariPrototypeSetterInheritanceBug) {
          Object.defineProperty(_this, "0", ENTRY_0);
        }
      });
      return _this;
    }
    _inheritsLoose(LegacyObservableArray2, _StubArray);
    var _proto = LegacyObservableArray2.prototype;
    _proto.concat = function concat() {
      this[$mobx].atom_.reportObserved();
      for (var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++) {
        arrays[_key] = arguments[_key];
      }
      return Array.prototype.concat.apply(
        this.slice(),
        //@ts-ignore
        arrays.map(function(a) {
          return isObservableArray(a) ? a.slice() : a;
        })
      );
    };
    _proto[Symbol.iterator] = function() {
      var self2 = this;
      var nextIndex = 0;
      return makeIterable({
        next: function next() {
          return nextIndex < self2.length ? {
            value: self2[nextIndex++],
            done: false
          } : {
            done: true,
            value: void 0
          };
        }
      });
    };
    return _createClass(LegacyObservableArray2, [{
      key: "length",
      get: function get4() {
        return this[$mobx].getArrayLength_();
      },
      set: function set5(newLength) {
        this[$mobx].setArrayLength_(newLength);
      }
    }, {
      key: Symbol.toStringTag,
      get: function get4() {
        return "Array";
      }
    }]);
  }(StubArray);
  Object.entries(arrayExtensions).forEach(function(_ref) {
    var prop = _ref[0], fn = _ref[1];
    if (prop !== "concat") {
      addHiddenProp(LegacyObservableArray.prototype, prop, fn);
    }
  });
  function createArrayEntryDescriptor(index) {
    return {
      enumerable: false,
      configurable: true,
      get: function get4() {
        return this[$mobx].get_(index);
      },
      set: function set5(value) {
        this[$mobx].set_(index, value);
      }
    };
  }
  function createArrayBufferItem(index) {
    defineProperty(LegacyObservableArray.prototype, "" + index, createArrayEntryDescriptor(index));
  }
  function reserveArrayBuffer(max) {
    if (max > OBSERVABLE_ARRAY_BUFFER_SIZE) {
      for (var index = OBSERVABLE_ARRAY_BUFFER_SIZE; index < max + 100; index++) {
        createArrayBufferItem(index);
      }
      OBSERVABLE_ARRAY_BUFFER_SIZE = max;
    }
  }
  reserveArrayBuffer(1e3);
  function createLegacyArray(initialValues, enhancer, name) {
    return new LegacyObservableArray(initialValues, enhancer, name);
  }
  function getAtom(thing, property) {
    if (typeof thing === "object" && thing !== null) {
      if (isObservableArray(thing)) {
        if (property !== void 0) {
          die(23);
        }
        return thing[$mobx].atom_;
      }
      if (isObservableSet(thing)) {
        return thing.atom_;
      }
      if (isObservableMap(thing)) {
        if (property === void 0) {
          return thing.keysAtom_;
        }
        var observable2 = thing.data_.get(property) || thing.hasMap_.get(property);
        if (!observable2) {
          die(25, property, getDebugName(thing));
        }
        return observable2;
      }
      if (isObservableObject(thing)) {
        if (!property) {
          return die(26);
        }
        var _observable = thing[$mobx].values_.get(property);
        if (!_observable) {
          die(27, property, getDebugName(thing));
        }
        return _observable;
      }
      if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
        return thing;
      }
    } else if (isFunction(thing)) {
      if (isReaction(thing[$mobx])) {
        return thing[$mobx];
      }
    }
    die(28);
  }
  function getAdministration(thing, property) {
    if (!thing) {
      die(29);
    }
    if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
      return thing;
    }
    if (isObservableMap(thing) || isObservableSet(thing)) {
      return thing;
    }
    if (thing[$mobx]) {
      return thing[$mobx];
    }
    die(24, thing);
  }
  function getDebugName(thing, property) {
    var named;
    if (property !== void 0) {
      named = getAtom(thing, property);
    } else if (isAction(thing)) {
      return thing.name;
    } else if (isObservableObject(thing) || isObservableMap(thing) || isObservableSet(thing)) {
      named = getAdministration(thing);
    } else {
      named = getAtom(thing);
    }
    return named.name_;
  }
  function initObservable(cb2) {
    var derivation = untrackedStart();
    var allowStateChanges2 = allowStateChangesStart(true);
    startBatch();
    try {
      return cb2();
    } finally {
      endBatch();
      allowStateChangesEnd(allowStateChanges2);
      untrackedEnd(derivation);
    }
  }
  var toString = objectPrototype.toString;
  function deepEqual(a, b, depth) {
    if (depth === void 0) {
      depth = -1;
    }
    return eq(a, b, depth);
  }
  function eq(a, b, depth, aStack, bStack) {
    if (a === b) {
      return a !== 0 || 1 / a === 1 / b;
    }
    if (a == null || b == null) {
      return false;
    }
    if (a !== a) {
      return b !== b;
    }
    var type = typeof a;
    if (type !== "function" && type !== "object" && typeof b != "object") {
      return false;
    }
    var className = toString.call(a);
    if (className !== toString.call(b)) {
      return false;
    }
    switch (className) {
      case "[object RegExp]":
      case "[object String]":
        return "" + a === "" + b;
      case "[object Number]":
        if (+a !== +a) {
          return +b !== +b;
        }
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case "[object Date]":
      case "[object Boolean]":
        return +a === +b;
      case "[object Symbol]":
        return typeof Symbol !== "undefined" && Symbol.valueOf.call(a) === Symbol.valueOf.call(b);
      case "[object Map]":
      case "[object Set]":
        if (depth >= 0) {
          depth++;
        }
        break;
    }
    a = unwrap(a);
    b = unwrap(b);
    var areArrays = className === "[object Array]";
    if (!areArrays) {
      if (typeof a != "object" || typeof b != "object") {
        return false;
      }
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && "constructor" in a && "constructor" in b) {
        return false;
      }
    }
    if (depth === 0) {
      return false;
    } else if (depth < 0) {
      depth = -1;
    }
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      if (aStack[length] === a) {
        return bStack[length] === b;
      }
    }
    aStack.push(a);
    bStack.push(b);
    if (areArrays) {
      length = a.length;
      if (length !== b.length) {
        return false;
      }
      while (length--) {
        if (!eq(a[length], b[length], depth - 1, aStack, bStack)) {
          return false;
        }
      }
    } else {
      var keys2 = Object.keys(a);
      var _length = keys2.length;
      if (Object.keys(b).length !== _length) {
        return false;
      }
      for (var i = 0; i < _length; i++) {
        var key = keys2[i];
        if (!(hasProp(b, key) && eq(a[key], b[key], depth - 1, aStack, bStack))) {
          return false;
        }
      }
    }
    aStack.pop();
    bStack.pop();
    return true;
  }
  function unwrap(a) {
    if (isObservableArray(a)) {
      return a.slice();
    }
    if (isES6Map(a) || isObservableMap(a)) {
      return Array.from(a.entries());
    }
    if (isES6Set(a) || isObservableSet(a)) {
      return Array.from(a.entries());
    }
    return a;
  }
  var _getGlobal$Iterator;
  var maybeIteratorPrototype = ((_getGlobal$Iterator = getGlobal().Iterator) == null ? void 0 : _getGlobal$Iterator.prototype) || {};
  function makeIterable(iterator) {
    iterator[Symbol.iterator] = getSelf;
    return Object.assign(Object.create(maybeIteratorPrototype), iterator);
  }
  function getSelf() {
    return this;
  }
  ["Symbol", "Map", "Set"].forEach(function(m2) {
    var g = getGlobal();
    if (typeof g[m2] === "undefined") {
      die("MobX requires global '" + m2 + "' to be available or polyfilled");
    }
  });
  if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "object") {
    __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
      spy,
      extras: {
        getDebugName
      },
      $mobx
    });
  }
  if (!reactExports.useState) {
    throw new Error("mobx-react-lite requires React with Hooks support");
  }
  if (!makeObservable) {
    throw new Error("mobx-react-lite@3 requires mobx at least version 6 to be available");
  }
  function defaultNoopBatch(callback) {
    callback();
  }
  function observerBatching(reactionScheduler3) {
    if (!reactionScheduler3) {
      reactionScheduler3 = defaultNoopBatch;
    }
    configure({ reactionScheduler: reactionScheduler3 });
  }
  function printDebugValue(v2) {
    return getDependencyTree(v2);
  }
  var REGISTRY_FINALIZE_AFTER = 1e4;
  var REGISTRY_SWEEP_INTERVAL = 1e4;
  var TimerBasedFinalizationRegistry = (
    /** @class */
    function() {
      function TimerBasedFinalizationRegistry2(finalize) {
        var _this = this;
        Object.defineProperty(this, "finalize", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: finalize
        });
        Object.defineProperty(this, "registrations", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: /* @__PURE__ */ new Map()
        });
        Object.defineProperty(this, "sweepTimeout", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "sweep", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: function(maxAge) {
            if (maxAge === void 0) {
              maxAge = REGISTRY_FINALIZE_AFTER;
            }
            clearTimeout(_this.sweepTimeout);
            _this.sweepTimeout = void 0;
            var now = Date.now();
            _this.registrations.forEach(function(registration, token) {
              if (now - registration.registeredAt >= maxAge) {
                _this.finalize(registration.value);
                _this.registrations.delete(token);
              }
            });
            if (_this.registrations.size > 0) {
              _this.scheduleSweep();
            }
          }
        });
        Object.defineProperty(this, "finalizeAllImmediately", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: function() {
            _this.sweep(0);
          }
        });
      }
      Object.defineProperty(TimerBasedFinalizationRegistry2.prototype, "register", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(target, value, token) {
          this.registrations.set(token, {
            value,
            registeredAt: Date.now()
          });
          this.scheduleSweep();
        }
      });
      Object.defineProperty(TimerBasedFinalizationRegistry2.prototype, "unregister", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(token) {
          this.registrations.delete(token);
        }
      });
      Object.defineProperty(TimerBasedFinalizationRegistry2.prototype, "scheduleSweep", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function() {
          if (this.sweepTimeout === void 0) {
            this.sweepTimeout = setTimeout(this.sweep, REGISTRY_SWEEP_INTERVAL);
          }
        }
      });
      return TimerBasedFinalizationRegistry2;
    }()
  );
  var UniversalFinalizationRegistry = typeof FinalizationRegistry !== "undefined" ? FinalizationRegistry : TimerBasedFinalizationRegistry;
  var observerFinalizationRegistry = new UniversalFinalizationRegistry(function(adm) {
    var _a2;
    (_a2 = adm.reaction) === null || _a2 === void 0 ? void 0 : _a2.dispose();
    adm.reaction = null;
  });
  var shim$1 = { exports: {} };
  var useSyncExternalStoreShim_production = {};
  /**
   * @license React
   * use-sync-external-store-shim.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var React = reactExports;
  function is(x2, y2) {
    return x2 === y2 && (0 !== x2 || 1 / x2 === 1 / y2) || x2 !== x2 && y2 !== y2;
  }
  var objectIs = "function" === typeof Object.is ? Object.is : is, useState = React.useState, useEffect = React.useEffect, useLayoutEffect = React.useLayoutEffect, useDebugValue = React.useDebugValue;
  function useSyncExternalStore$2(subscribe, getSnapshot) {
    var value = getSnapshot(), _useState = useState({ inst: { value, getSnapshot } }), inst = _useState[0].inst, forceUpdate = _useState[1];
    useLayoutEffect(
      function() {
        inst.value = value;
        inst.getSnapshot = getSnapshot;
        checkIfSnapshotChanged(inst) && forceUpdate({ inst });
      },
      [subscribe, value, getSnapshot]
    );
    useEffect(
      function() {
        checkIfSnapshotChanged(inst) && forceUpdate({ inst });
        return subscribe(function() {
          checkIfSnapshotChanged(inst) && forceUpdate({ inst });
        });
      },
      [subscribe]
    );
    useDebugValue(value);
    return value;
  }
  function checkIfSnapshotChanged(inst) {
    var latestGetSnapshot = inst.getSnapshot;
    inst = inst.value;
    try {
      var nextValue = latestGetSnapshot();
      return !objectIs(inst, nextValue);
    } catch (error) {
      return true;
    }
  }
  function useSyncExternalStore$1(subscribe, getSnapshot) {
    return getSnapshot();
  }
  var shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
  useSyncExternalStoreShim_production.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
  {
    shim$1.exports = useSyncExternalStoreShim_production;
  }
  var shimExports = shim$1.exports;
  function createReaction(adm) {
    adm.reaction = new Reaction("observer".concat(adm.name), function() {
      var _a2;
      adm.stateVersion = Symbol();
      (_a2 = adm.onStoreChange) === null || _a2 === void 0 ? void 0 : _a2.call(adm);
    });
  }
  function useObserver(render, baseComponentName) {
    if (baseComponentName === void 0) {
      baseComponentName = "observed";
    }
    var admRef = React$1.useRef(null);
    if (!admRef.current) {
      var adm_1 = {
        reaction: null,
        onStoreChange: null,
        stateVersion: Symbol(),
        name: baseComponentName,
        subscribe: function(onStoreChange) {
          observerFinalizationRegistry.unregister(adm_1);
          adm_1.onStoreChange = onStoreChange;
          if (!adm_1.reaction) {
            createReaction(adm_1);
            adm_1.stateVersion = Symbol();
          }
          return function() {
            var _a2;
            adm_1.onStoreChange = null;
            (_a2 = adm_1.reaction) === null || _a2 === void 0 ? void 0 : _a2.dispose();
            adm_1.reaction = null;
          };
        },
        getSnapshot: function() {
          return adm_1.stateVersion;
        }
      };
      admRef.current = adm_1;
    }
    var adm = admRef.current;
    if (!adm.reaction) {
      createReaction(adm);
      observerFinalizationRegistry.register(admRef, adm, adm);
    }
    React$1.useDebugValue(adm.reaction, printDebugValue);
    shimExports.useSyncExternalStore(
      // Both of these must be stable, otherwise it would keep resubscribing every render.
      adm.subscribe,
      adm.getSnapshot,
      adm.getSnapshot
    );
    var renderResult;
    var exception;
    adm.reaction.track(function() {
      try {
        renderResult = render();
      } catch (e) {
        exception = e;
      }
    });
    if (exception) {
      throw exception;
    }
    return renderResult;
  }
  var _a$1, _b;
  var hasSymbol = typeof Symbol === "function" && Symbol.for;
  var isFunctionNameConfigurable = (_b = (_a$1 = Object.getOwnPropertyDescriptor(function() {
  }, "name")) === null || _a$1 === void 0 ? void 0 : _a$1.configurable) !== null && _b !== void 0 ? _b : false;
  var ReactForwardRefSymbol = hasSymbol ? Symbol.for("react.forward_ref") : typeof reactExports.forwardRef === "function" && reactExports.forwardRef(function(props) {
    return null;
  })["$$typeof"];
  var ReactMemoSymbol = hasSymbol ? Symbol.for("react.memo") : typeof reactExports.memo === "function" && reactExports.memo(function(props) {
    return null;
  })["$$typeof"];
  function observer(baseComponent, options) {
    var _a2;
    if (ReactMemoSymbol && baseComponent["$$typeof"] === ReactMemoSymbol) {
      throw new Error("[mobx-react-lite] You are trying to use `observer` on a function component wrapped in either another `observer` or `React.memo`. The observer already applies 'React.memo' for you.");
    }
    var useForwardRef = (_a2 = void 0) !== null && _a2 !== void 0 ? _a2 : false;
    var render = baseComponent;
    var baseComponentName = baseComponent.displayName || baseComponent.name;
    if (ReactForwardRefSymbol && baseComponent["$$typeof"] === ReactForwardRefSymbol) {
      useForwardRef = true;
      render = baseComponent["render"];
      if (typeof render !== "function") {
        throw new Error("[mobx-react-lite] `render` property of ForwardRef was not a function");
      }
    }
    var observerComponent = function(props, ref) {
      return useObserver(function() {
        return render(props, ref);
      }, baseComponentName);
    };
    observerComponent.displayName = baseComponent.displayName;
    if (isFunctionNameConfigurable) {
      Object.defineProperty(observerComponent, "name", {
        value: baseComponent.name,
        writable: true,
        configurable: true
      });
    }
    if (baseComponent.contextTypes) {
      observerComponent.contextTypes = baseComponent.contextTypes;
    }
    if (useForwardRef) {
      observerComponent = reactExports.forwardRef(observerComponent);
    }
    observerComponent = reactExports.memo(observerComponent);
    copyStaticProperties(baseComponent, observerComponent);
    return observerComponent;
  }
  var hoistBlackList = {
    $$typeof: true,
    render: true,
    compare: true,
    type: true,
    // Don't redefine `displayName`,
    // it's defined as getter-setter pair on `memo` (see #3192).
    displayName: true
  };
  function copyStaticProperties(base, target) {
    Object.keys(base).forEach(function(key) {
      if (!hoistBlackList[key]) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(base, key));
      }
    });
  }
  var _a;
  observerBatching(reactDomExports.unstable_batchedUpdates);
  (_a = observerFinalizationRegistry["finalizeAllImmediately"]) !== null && _a !== void 0 ? _a : function() {
  };
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
  const _SettingsStore = class _SettingsStore {
    constructor() {
      // 사이드바 전반
      __publicField(this, "isCustomSidebarEnabled");
      __publicField(this, "isRandomSortEnabled");
      __publicField(this, "isFavoriteGroupEnabled");
      __publicField(this, "isShortenFavoriteGroupNameEnabled");
      __publicField(this, "isCategoryGroupEnabled");
      __publicField(this, "isShortenCategoryNameEnabled");
      __publicField(this, "isChannelFeedEnabled");
      __publicField(this, "isBlockedCategorySortingEnabled");
      __publicField(this, "isPinnedStreamWithNotificationEnabled");
      __publicField(this, "isPinnedStreamWithPinEnabled");
      __publicField(this, "isPinnedOnlineOnlyEnabled");
      __publicField(this, "isSmallUserLayoutEnabled");
      __publicField(this, "isSendLoadBroadEnabled");
      __publicField(this, "isDuplicateRemovalEnabled");
      __publicField(this, "isTopDuplicateRemovalEnabled");
      __publicField(this, "myplusOrder");
      __publicField(this, "isChzzkFollowChannelsEnabled");
      __publicField(this, "isChzzkTopChannelsEnabled");
      __publicField(this, "displayFollow");
      __publicField(this, "displayMyplus");
      __publicField(this, "displayMyplusvod");
      __publicField(this, "displayTop");
      __publicField(this, "pollIntervalSeconds");
      // 사이드바 UI
      __publicField(this, "nicknameWidth");
      __publicField(this, "isAlignNicknameRightEnabled");
      __publicField(this, "isSidebarMinimized");
      __publicField(this, "sidebarSectionOrder");
      __publicField(this, "selectedFavoriteGroupIdx");
      __publicField(this, "selectedPinnedCategoryIdx");
      // 테마 / 메인 페이지
      __publicField(this, "isThemeLockEnabled");
      __publicField(this, "isRemoveRedistributionTagEnabled");
      __publicField(this, "isRemoveWatchLaterButtonEnabled");
      __publicField(this, "isRemoveBroadStartTimeTagEnabled");
      __publicField(this, "isReplaceEmptyThumbnailEnabled");
      __publicField(this, "isThumbnailTooltipEnabled");
      __publicField(this, "isRemoveCarouselEnabled");
      __publicField(this, "isBroadTitleTextEllipsisEnabled");
      // LIVE 플레이어
      __publicField(this, "isNoAutoVODEnabled");
      __publicField(this, "isAutoReloadAfterBroadcastEndEnabled");
      __publicField(this, "isHideEsportsInfoEnabled");
      __publicField(this, "isShowPauseButtonEnabled");
      __publicField(this, "isCaptureButtonEnabled");
      __publicField(this, "preferredQuality");
      __publicField(this, "isClickPlayerEventMapperEnabled");
      __publicField(this, "selectLeftClick");
      __publicField(this, "selectRightClick");
      __publicField(this, "isShowBufferTimeTitleEnabled");
      __publicField(this, "isShowBufferTimeChatEnabled");
      __publicField(this, "isSharpmodeShortcutEnabled");
      __publicField(this, "isLLShortcutEnabled");
      __publicField(this, "isQualityChangeShortcutEnabled");
      __publicField(this, "isMutedInactiveTabsEnabled");
      __publicField(this, "isAutoChangeQualityEnabled");
      __publicField(this, "isDocumentTitleUpdateEnabled");
      __publicField(this, "isShowSidebarOnScreenModeAlwaysEnabled");
      __publicField(this, "isMouseOverSideBarEnabled");
      __publicField(this, "isChatPositionEnabled");
      __publicField(this, "isAutoScreenModeEnabled");
      __publicField(this, "isClickToMuteEnabled");
      // VOD 플레이어
      __publicField(this, "isSelectBestQualityEnabled");
      __publicField(this, "isVODHighlightEnabled");
      // 채팅창
      __publicField(this, "isHideSupporterBadgeEnabled");
      __publicField(this, "isHideFanBadgeEnabled");
      __publicField(this, "isHideSubBadgeEnabled");
      __publicField(this, "isHideVIPBadgeEnabled");
      __publicField(this, "isHideMngrBadgeEnabled");
      __publicField(this, "isHideStreamerBadgeEnabled");
      __publicField(this, "isUnlockCopyPasteEnabled");
      __publicField(this, "isHideButtonsAboveChatInputEnabled");
      __publicField(this, "isHideChatItemsEnabled");
      // 카테고리 데이터
      __publicField(this, "savedCategory");
      // 다크 모드
      __publicField(this, "isDarkMode");
      this.isCustomSidebarEnabled = _GM_getValue("isCustomSidebarEnabled", true);
      this.isRandomSortEnabled = _GM_getValue("isRandomSortEnabled", false);
      this.isFavoriteGroupEnabled = _GM_getValue("isFavoriteGroupEnabled", true);
      this.isShortenFavoriteGroupNameEnabled = _GM_getValue("isShortenFavoriteGroupNameEnabled", false);
      this.isCategoryGroupEnabled = _GM_getValue("isCategoryGroupEnabled", true);
      this.isShortenCategoryNameEnabled = _GM_getValue("isShortenCategoryNameEnabled", false);
      this.isChannelFeedEnabled = _GM_getValue("isChannelFeedEnabled", false);
      this.isBlockedCategorySortingEnabled = _GM_getValue("isBlockedCategorySortingEnabled", true);
      this.isPinnedStreamWithNotificationEnabled = _GM_getValue("isPinnedStreamWithNotificationEnabled", true);
      this.isPinnedStreamWithPinEnabled = _GM_getValue("isPinnedStreamWithPinEnabled", false);
      this.isPinnedOnlineOnlyEnabled = _GM_getValue("isPinnedOnlineOnlyEnabled", false);
      this.isSmallUserLayoutEnabled = _GM_getValue("isSmallUserLayoutEnabled", false);
      this.isSendLoadBroadEnabled = _GM_getValue("isSendLoadBroadEnabled", true);
      this.isDuplicateRemovalEnabled = _GM_getValue("isDuplicateRemovalEnabled", true);
      this.isTopDuplicateRemovalEnabled = _GM_getValue("isTopDuplicateRemovalEnabled", true);
      const storedMyplusOrder = _GM_getValue("myplusOrder", 1);
      this.myplusOrder = typeof storedMyplusOrder === "number" ? storedMyplusOrder : storedMyplusOrder === "viewerCount" ? 0 : 1;
      this.isChzzkFollowChannelsEnabled = _GM_getValue("isChzzkFollowChannelsEnabled", false);
      this.isChzzkTopChannelsEnabled = _GM_getValue("isChzzkTopChannelsEnabled", false);
      this.displayFollow = _GM_getValue("displayFollow", 6);
      this.displayMyplus = _GM_getValue("displayMyplus", 6);
      this.displayMyplusvod = _GM_getValue("displayMyplusvod", 4);
      this.displayTop = _GM_getValue("displayTop", 6);
      this.pollIntervalSeconds = _GM_getValue("pollIntervalSeconds", 30);
      this.nicknameWidth = _GM_getValue("nicknameWidth", 60);
      this.isAlignNicknameRightEnabled = _GM_getValue("isAlignNicknameRightEnabled", false);
      this.isSidebarMinimized = _GM_getValue("isSidebarMinimized", false);
      this.sidebarSectionOrder = _GM_getValue("sidebarSectionOrder", "");
      this.selectedFavoriteGroupIdx = _GM_getValue("selectedFavoriteGroupIdx", 0);
      this.selectedPinnedCategoryIdx = _GM_getValue("selectedPinnedCategoryIdx", 0);
      this.isThemeLockEnabled = _GM_getValue("isThemeLockEnabled", false);
      this.isRemoveRedistributionTagEnabled = _GM_getValue("isRemoveRedistributionTagEnabled", true);
      this.isRemoveWatchLaterButtonEnabled = _GM_getValue("isRemoveWatchLaterButtonEnabled", false);
      this.isRemoveBroadStartTimeTagEnabled = _GM_getValue("isRemoveBroadStartTimeTagEnabled", false);
      this.isReplaceEmptyThumbnailEnabled = _GM_getValue("isReplaceEmptyThumbnailEnabled", true);
      this.isThumbnailTooltipEnabled = _GM_getValue("isThumbnailTooltipEnabled", true);
      this.isRemoveCarouselEnabled = _GM_getValue("isRemoveCarouselEnabled", true);
      this.isBroadTitleTextEllipsisEnabled = _GM_getValue("isBroadTitleTextEllipsisEnabled", false);
      this.isNoAutoVODEnabled = _GM_getValue("isNoAutoVODEnabled", true);
      this.isAutoReloadAfterBroadcastEndEnabled = _GM_getValue("isAutoReloadAfterBroadcastEndEnabled", true);
      this.isHideEsportsInfoEnabled = _GM_getValue("isHideEsportsInfoEnabled", false);
      this.isShowPauseButtonEnabled = _GM_getValue("isMakePauseButtonEnabled", true);
      this.isCaptureButtonEnabled = _GM_getValue("isCaptureButtonEnabled", false);
      this.preferredQuality = _GM_getValue("preferredQualitySetting", "off");
      this.isClickPlayerEventMapperEnabled = _GM_getValue("isClickPlayerEventMapperEnabled", false);
      this.selectLeftClick = _GM_getValue("livePlayerLeftClickFunction", "toggleMute");
      this.selectRightClick = _GM_getValue("livePlayerRightClickFunction", "toggleScreenMode");
      this.isShowBufferTimeTitleEnabled = _GM_getValue("isShowBufferTimeTitleEnabled", false);
      this.isShowBufferTimeChatEnabled = _GM_getValue("isShowBufferTimeChatEnabled", false);
      this.isSharpmodeShortcutEnabled = _GM_getValue("isMakeSharpModeShortcutEnabled", true);
      this.isLLShortcutEnabled = _GM_getValue("isMakeLowLatencyShortcutEnabled", true);
      this.isQualityChangeShortcutEnabled = _GM_getValue("isMakeQualityChangeShortcutEnabled", false);
      this.isMutedInactiveTabsEnabled = _GM_getValue("isAutoChangeMuteEnabled", false);
      this.isAutoChangeQualityEnabled = _GM_getValue("isAutoChangeQualityEnabled", false);
      this.isDocumentTitleUpdateEnabled = _GM_getValue("isDocumentTitleUpdateEnabled", true);
      this.isShowSidebarOnScreenModeAlwaysEnabled = _GM_getValue("showSidebarOnScreenModeAlways", false);
      this.isMouseOverSideBarEnabled = _GM_getValue("showSidebarOnScreenMode", true);
      this.isChatPositionEnabled = _GM_getValue("isBottomChatEnabled", false);
      this.isAutoScreenModeEnabled = _GM_getValue("isAutoScreenModeEnabled", false);
      this.isClickToMuteEnabled = _GM_getValue("isClickToMuteEnabled", false);
      this.isSelectBestQualityEnabled = _GM_getValue("isSelectBestQualityEnabled", false);
      this.isVODHighlightEnabled = _GM_getValue("isVODHighlightEnabled", true);
      this.isHideSupporterBadgeEnabled = _GM_getValue("isHideSupporterBadgeEnabled", false);
      this.isHideFanBadgeEnabled = _GM_getValue("isHideFanBadgeEnabled", false);
      this.isHideSubBadgeEnabled = _GM_getValue("isHideSubBadgeEnabled", false);
      this.isHideVIPBadgeEnabled = _GM_getValue("isHideVIPBadgeEnabled", false);
      this.isHideMngrBadgeEnabled = _GM_getValue("isHideManagerBadgeEnabled", false);
      this.isHideStreamerBadgeEnabled = _GM_getValue("isHideStreamerBadgeEnabled", false);
      this.isUnlockCopyPasteEnabled = _GM_getValue("isUnlockCopyPasteEnabled", false);
      this.isHideButtonsAboveChatInputEnabled = _GM_getValue("ishideButtonsAboveChatInputEnabled", false);
      this.isHideChatItemsEnabled = _GM_getValue("isHideChatItemsEnabled", false);
      this.savedCategory = _GM_getValue("szBroadCategory", null);
      this.isDarkMode = document.documentElement.getAttribute("dark") === "true" || document.documentElement.classList.contains("dark");
      makeObservable(this, {
        isCustomSidebarEnabled: observable,
        isRandomSortEnabled: observable,
        isFavoriteGroupEnabled: observable,
        isShortenFavoriteGroupNameEnabled: observable,
        isCategoryGroupEnabled: observable,
        isShortenCategoryNameEnabled: observable,
        isChannelFeedEnabled: observable,
        isBlockedCategorySortingEnabled: observable,
        isPinnedStreamWithNotificationEnabled: observable,
        isPinnedStreamWithPinEnabled: observable,
        isPinnedOnlineOnlyEnabled: observable,
        isSmallUserLayoutEnabled: observable,
        isSendLoadBroadEnabled: observable,
        isDuplicateRemovalEnabled: observable,
        isTopDuplicateRemovalEnabled: observable,
        myplusOrder: observable,
        isChzzkFollowChannelsEnabled: observable,
        isChzzkTopChannelsEnabled: observable,
        displayFollow: observable,
        displayMyplus: observable,
        displayMyplusvod: observable,
        displayTop: observable,
        pollIntervalSeconds: observable,
        nicknameWidth: observable,
        isAlignNicknameRightEnabled: observable,
        isSidebarMinimized: observable,
        sidebarSectionOrder: observable,
        selectedFavoriteGroupIdx: observable,
        selectedPinnedCategoryIdx: observable,
        isThemeLockEnabled: observable,
        isRemoveRedistributionTagEnabled: observable,
        isRemoveWatchLaterButtonEnabled: observable,
        isRemoveBroadStartTimeTagEnabled: observable,
        isReplaceEmptyThumbnailEnabled: observable,
        isThumbnailTooltipEnabled: observable,
        isRemoveCarouselEnabled: observable,
        isBroadTitleTextEllipsisEnabled: observable,
        isNoAutoVODEnabled: observable,
        isAutoReloadAfterBroadcastEndEnabled: observable,
        isHideEsportsInfoEnabled: observable,
        isShowPauseButtonEnabled: observable,
        isCaptureButtonEnabled: observable,
        preferredQuality: observable,
        isClickPlayerEventMapperEnabled: observable,
        selectLeftClick: observable,
        selectRightClick: observable,
        isShowBufferTimeTitleEnabled: observable,
        isShowBufferTimeChatEnabled: observable,
        isSharpmodeShortcutEnabled: observable,
        isLLShortcutEnabled: observable,
        isQualityChangeShortcutEnabled: observable,
        isMutedInactiveTabsEnabled: observable,
        isAutoChangeQualityEnabled: observable,
        isDocumentTitleUpdateEnabled: observable,
        isShowSidebarOnScreenModeAlwaysEnabled: observable,
        isMouseOverSideBarEnabled: observable,
        isChatPositionEnabled: observable,
        isAutoScreenModeEnabled: observable,
        isClickToMuteEnabled: observable,
        isSelectBestQualityEnabled: observable,
        isVODHighlightEnabled: observable,
        isHideSupporterBadgeEnabled: observable,
        isHideFanBadgeEnabled: observable,
        isHideSubBadgeEnabled: observable,
        isHideVIPBadgeEnabled: observable,
        isHideMngrBadgeEnabled: observable,
        isHideStreamerBadgeEnabled: observable,
        isUnlockCopyPasteEnabled: observable,
        isHideButtonsAboveChatInputEnabled: observable,
        isHideChatItemsEnabled: observable,
        savedCategory: observable,
        isDarkMode: observable,
        setSetting: action,
        setDarkMode: action
      });
    }
    setSetting(key, value) {
      this[key] = value;
      const storageKey = _SettingsStore.STORAGE_KEY_MAP[key] ?? key;
      _GM_setValue(storageKey, value);
      if (key === "nicknameWidth") {
        document.documentElement.style.setProperty("--nickname-width", `${value}px`);
      }
    }
    setDarkMode(val) {
      this.isDarkMode = val;
    }
  };
  // React 프로퍼티명 → sample.js GM 스토리지 키 매핑
  __publicField(_SettingsStore, "STORAGE_KEY_MAP", {
    isShowPauseButtonEnabled: "isMakePauseButtonEnabled",
    preferredQuality: "preferredQualitySetting",
    selectLeftClick: "livePlayerLeftClickFunction",
    selectRightClick: "livePlayerRightClickFunction",
    isSharpmodeShortcutEnabled: "isMakeSharpModeShortcutEnabled",
    isLLShortcutEnabled: "isMakeLowLatencyShortcutEnabled",
    isQualityChangeShortcutEnabled: "isMakeQualityChangeShortcutEnabled",
    isMutedInactiveTabsEnabled: "isAutoChangeMuteEnabled",
    isShowSidebarOnScreenModeAlwaysEnabled: "showSidebarOnScreenModeAlways",
    isMouseOverSideBarEnabled: "showSidebarOnScreenMode",
    isChatPositionEnabled: "isBottomChatEnabled",
    isHideSupporterBadgeEnabled: "isHideSupporterBadgeEnabled",
    isHideFanBadgeEnabled: "isHideFanBadgeEnabled",
    isHideSubBadgeEnabled: "isHideSubBadgeEnabled",
    isHideVIPBadgeEnabled: "isHideVIPBadgeEnabled",
    isHideMngrBadgeEnabled: "isHideManagerBadgeEnabled",
    isHideStreamerBadgeEnabled: "isHideStreamerBadgeEnabled",
    isHideButtonsAboveChatInputEnabled: "ishideButtonsAboveChatInputEnabled"
  });
  let SettingsStore = _SettingsStore;
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const customLog = {
    log: (...args) => console.log("[SOOP-EXT]", ...args),
    warn: (...args) => console.warn("[SOOP-EXT]", ...args),
    error: (...args) => console.error("[SOOP-EXT]", ...args)
  };
  const waitForElementAsync = (selector, timeout = 1e4) => {
    return new Promise((resolve) => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
        return;
      }
      let observer2 = null;
      const timeoutId = setTimeout(() => {
        if (observer2) {
          observer2.disconnect();
          resolve(null);
        }
      }, timeout);
      observer2 = new MutationObserver(() => {
        const targetElement = document.querySelector(selector);
        if (targetElement) {
          observer2.disconnect();
          clearTimeout(timeoutId);
          resolve(targetElement);
        }
      });
      observer2.observe(document.body, { childList: true, subtree: true });
    });
  };
  const isUserTyping = () => {
    var _a2;
    const active = document.activeElement;
    const tag = (_a2 = active == null ? void 0 : active.tagName) == null ? void 0 : _a2.toUpperCase();
    return tag === "INPUT" || tag === "TEXTAREA" || (active == null ? void 0 : active.isContentEditable) || (active == null ? void 0 : active.id) === "write_area";
  };
  const observeUrlChanges = (() => {
    let lastUrl = window.location.pathname;
    const callbacks = /* @__PURE__ */ new Set();
    let isObserving = false;
    const triggerCallbacks = (newUrl) => {
      if (newUrl !== lastUrl) {
        lastUrl = newUrl;
        callbacks.forEach((cb2) => cb2(newUrl));
      }
    };
    const startObserving = () => {
      if (isObserving) return;
      isObserving = true;
      window.addEventListener("popstate", () => {
        triggerCallbacks(window.location.pathname);
      });
      const originalPushState = history.pushState;
      const originalReplaceState = history.replaceState;
      history.pushState = function(...args) {
        var _a2;
        originalPushState.apply(this, args);
        triggerCallbacks(
          ((_a2 = args[2]) == null ? void 0 : _a2.toString()) || window.location.pathname
        );
      };
      history.replaceState = function(...args) {
        var _a2;
        originalReplaceState.apply(this, args);
        triggerCallbacks(
          ((_a2 = args[2]) == null ? void 0 : _a2.toString()) || window.location.pathname
        );
      };
    };
    return function registerCallback(callback) {
      startObserving();
      callbacks.add(callback);
      return function disconnect() {
        callbacks.delete(callback);
      };
    };
  })();
  const _fetchInFlight = /* @__PURE__ */ new Map();
  const _isPerChannelUrl = (url) => /\/channels\/[0-9a-f]{32}\//i.test(url);
  const _parseAndValidateCache = (cachedDataString, expiryMs) => {
    if (!cachedDataString) return null;
    try {
      const { timestamp, data } = JSON.parse(cachedDataString);
      if (Date.now() - timestamp < expiryMs) return data;
    } catch (e) {
      customLog.warn("Cache parse error, ignoring.", e);
    }
    return null;
  };
  const fetchBroadList = async (url, expiry_seconds = 50, timeout = 0) => {
    const CACHE_EXPIRY_MS = expiry_seconds * 1e3;
    const cacheKey = `fetchCache_${encodeURIComponent(url)}`;
    const skipGM = _isPerChannelUrl(url);
    const localData = _parseAndValidateCache(localStorage.getItem(cacheKey), CACHE_EXPIRY_MS);
    if (localData) {
      return localData;
    }
    if (!skipGM) {
      const gmDataString = await _GM_getValue(cacheKey, null);
      const gmData = _parseAndValidateCache(gmDataString, CACHE_EXPIRY_MS);
      if (gmData) {
        if (gmDataString) localStorage.setItem(cacheKey, gmDataString);
        return gmData;
      }
    }
    if (_fetchInFlight.has(cacheKey)) {
      return _fetchInFlight.get(cacheKey);
    }
    const fetchPromise = new Promise((resolve) => {
      let timeoutId;
      if (timeout) {
        timeoutId = setTimeout(() => {
          customLog.error(url, `Request timed out after ${timeout} ms`);
          console.error(`[SOOP API] 타임아웃 (${timeout}ms):`, url);
          resolve([]);
        }, timeout);
      }
      _GM_xmlhttpRequest({
        method: "GET",
        url,
        headers: { "Content-Type": "application/json" },
        onload: async (response) => {
          if (timeoutId) clearTimeout(timeoutId);
          _fetchInFlight.delete(cacheKey);
          try {
            if (response.status >= 200 && response.status < 300) {
              const jsonResponse = JSON.parse(response.responseText);
              if ((jsonResponse == null ? void 0 : jsonResponse.RESULT) === -1 || (jsonResponse == null ? void 0 : jsonResponse.code) && jsonResponse.code < 0) {
                customLog.error(url, `API Error: ${jsonResponse.MSG || jsonResponse.message}`);
                console.error(
                  `[SOOP API] API 오류 (RESULT=${(jsonResponse == null ? void 0 : jsonResponse.RESULT) ?? (jsonResponse == null ? void 0 : jsonResponse.code)}):`,
                  url,
                  jsonResponse
                );
                localStorage.removeItem(cacheKey);
                if (!skipGM) await _GM_setValue(cacheKey, void 0);
                resolve([]);
              } else {
                const cacheData = JSON.stringify({
                  timestamp: Date.now(),
                  data: jsonResponse
                });
                localStorage.setItem(cacheKey, cacheData);
                if (!skipGM) await _GM_setValue(cacheKey, cacheData);
                resolve(jsonResponse);
              }
            } else if (response.status === 401) {
              customLog.error(url, "Unauthorized: 401 error");
              resolve([]);
            } else {
              customLog.error(url, `Error: ${response.status}`);
              resolve([]);
            }
          } catch (error) {
            customLog.error(url, "Parsing error: ", error);
            resolve([]);
          }
        },
        onerror: (error) => {
          if (timeoutId) clearTimeout(timeoutId);
          _fetchInFlight.delete(cacheKey);
          customLog.error(url, "Request error: " + error);
          resolve([]);
        }
      });
    });
    _fetchInFlight.set(cacheKey, fetchPromise);
    return fetchPromise;
  };
  const fetchFavoriteGroups = async () => {
    const response = await fetchBroadList("https://myapi.sooplive.com/api/favorite/group/list", 50);
    return (response == null ? void 0 : response.data) ?? [];
  };
  const getHiddenbjList = async () => {
    const url = "https://live.sooplive.com/api/hiddenbj/hiddenbjController.php";
    const response = await fetchBroadList(url, 25);
    if ((response == null ? void 0 : response.RESULT) === 1) {
      return response.DATA ?? [];
    }
    return [];
  };
  const getStationFeed = async (isChannelFeedEnabled) => {
    if (!isChannelFeedEnabled) return [];
    const feedUrl = "https://myapi.sooplive.com/api/feed?index_reg_date=0&user_id=&is_bj_write=1&feed_type=&page=1";
    const response = await fetchBroadList(feedUrl, 150);
    return (response == null ? void 0 : response.data) ?? [];
  };
  const loadCategoryData = () => {
    const currentTime = (/* @__PURE__ */ new Date()).getTime();
    const lastExecutionTime = _GM_getValue("lastExecutionTime", 0);
    if (currentTime - lastExecutionTime >= 9e5) {
      const url = `https://live.sooplive.com/script/locale/ko_KR/broad_category.js?${currentTime}`;
      _GM_xmlhttpRequest({
        method: "GET",
        url,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
        onload: function(response) {
          if (response.status === 200) {
            let szBroadCategory = response.responseText;
            szBroadCategory = JSON.parse(szBroadCategory.split("var szBroadCategory = ")[1].slice(0, -1));
            if (szBroadCategory.CHANNEL.RESULT === "1") {
              const stripCategoryKeys = (categories) => categories.map(({ cate_no, cate_name, child }) => ({
                cate_no,
                cate_name,
                ...(child == null ? void 0 : child.length) ? { child: stripCategoryKeys(child) } : {}
              }));
              const cleanData = {
                CHANNEL: {
                  RESULT: szBroadCategory.CHANNEL.RESULT,
                  BROAD_CATEGORY: stripCategoryKeys(szBroadCategory.CHANNEL.BROAD_CATEGORY)
                }
              };
              _GM_setValue("szBroadCategory", cleanData);
              _GM_setValue("lastExecutionTime", currentTime);
            }
          } else {
            customLog.error("Failed to load category data:", response.statusText);
          }
        },
        onerror: function(error) {
          customLog.error("Error loading category data:", error);
        }
      });
    }
  };
  const getCategoryName = (cateNo) => {
    var _a2;
    if (!cateNo) return "";
    const saved = _GM_getValue("szBroadCategory", null);
    if (!((_a2 = saved == null ? void 0 : saved.CHANNEL) == null ? void 0 : _a2.BROAD_CATEGORY)) return "";
    const search = (categories) => {
      var _a3;
      for (const cat of categories) {
        if (String(cat.cate_no) === String(cateNo)) return cat.cate_name;
        if ((_a3 = cat.child) == null ? void 0 : _a3.length) {
          const found = search(cat.child);
          if (found) return found;
        }
      }
      return "";
    };
    return search(saved.CHANNEL.BROAD_CATEGORY);
  };
  const blockUser = (userId, userName, currentList, onUpdate) => {
    if (currentList.some((u2) => u2.userId === userId)) return;
    const newList = [...currentList, { userId, userName }];
    _GM_setValue("blockedUsers", JSON.stringify(newList));
    onUpdate(newList);
  };
  const isUserBlocked = (userId, blockedUsers) => blockedUsers.some((u2) => u2.userId === userId);
  const isCategoryBlocked = (categoryId, blockedCategories) => blockedCategories.some((c) => c.categoryId === categoryId);
  function getViewerCount(c) {
    var _a2, _b2, _c, _d;
    if (c.type === "chzzk") {
      return ((_b2 = (_a2 = c.channel) == null ? void 0 : _a2.liveInfo) == null ? void 0 : _b2.concurrentUserCount) ?? ((_c = c.channel) == null ? void 0 : _c.concurrentUserCount) ?? 0;
    }
    return ((_d = c.channel) == null ? void 0 : _d.total_view_cnt) ?? 0;
  }
  class SidebarStore {
    constructor(settings) {
      // 데이터 맵 (섹션 ID → 채널 배열)
      __publicField(this, "followChannels", []);
      __publicField(this, "myplusChannels", []);
      __publicField(this, "myplusVodChannels", []);
      __publicField(this, "topChannels", []);
      // 탭 관련
      __publicField(this, "favoriteGroups", []);
      __publicField(this, "selectedFavoriteGroupIdx", 0);
      __publicField(this, "selectedPinnedCategoryIdx", 0);
      // 차단/고정 목록
      __publicField(this, "blockedUsers", []);
      __publicField(this, "blockedCategories", []);
      __publicField(this, "pinnedCategories", []);
      __publicField(this, "pinnedChzzkUsers", []);
      // 팔로우 유저 ID 목록 (중복 제거용)
      __publicField(this, "allFollowUserIds", []);
      // 숨김 BJ 목록
      __publicField(this, "hiddenBjList", []);
      // 로딩 상태
      __publicField(this, "isFollowLoading", false);
      __publicField(this, "isMyplusLoading", false);
      __publicField(this, "isTopLoading", false);
      // 마지막 fetch 시각 (프로그래스바용)
      __publicField(this, "lastFetchTime", 0);
      // 폴링 타이머
      __publicField(this, "_pollTimer", null);
      __publicField(this, "_settings");
      // 원본 API 데이터 캐시 (설정 변경 시 재처리용)
      __publicField(this, "_rawFollow", null);
      __publicField(this, "_rawMyplus", null);
      __publicField(this, "_rawTop", null);
      this._settings = settings;
      try {
        this.blockedUsers = JSON.parse(GM_getValue("blockedUsers", "[]"));
      } catch {
        this.blockedUsers = [];
      }
      try {
        this.blockedCategories = JSON.parse(GM_getValue("blockedCategories", "[]"));
      } catch {
        this.blockedCategories = [];
      }
      try {
        this.pinnedCategories = JSON.parse(GM_getValue("pinnedCategories", "[]"));
      } catch {
        this.pinnedCategories = [];
      }
      try {
        this.pinnedChzzkUsers = JSON.parse(GM_getValue("pinnedChzzkUsers", "[]"));
      } catch {
        this.pinnedChzzkUsers = [];
      }
      try {
        this.allFollowUserIds = GM_getValue("allFollowUserIds", []);
      } catch {
        this.allFollowUserIds = [];
      }
      this.selectedFavoriteGroupIdx = settings.selectedFavoriteGroupIdx;
      this.selectedPinnedCategoryIdx = settings.selectedPinnedCategoryIdx;
      this._initFromLocalStorageCache();
      makeObservable(this, {
        followChannels: observable,
        myplusChannels: observable,
        myplusVodChannels: observable,
        topChannels: observable,
        favoriteGroups: observable,
        selectedFavoriteGroupIdx: observable,
        selectedPinnedCategoryIdx: observable,
        blockedUsers: observable,
        blockedCategories: observable,
        pinnedCategories: observable,
        pinnedChzzkUsers: observable,
        allFollowUserIds: observable,
        hiddenBjList: observable,
        isFollowLoading: observable,
        isMyplusLoading: observable,
        isTopLoading: observable,
        lastFetchTime: observable,
        setFollowChannels: action,
        setMyplusChannels: action,
        setTopChannels: action,
        setFavoriteGroups: action,
        setSelectedFavoriteGroupIdx: action,
        setSelectedPinnedCategoryIdx: action,
        setBlockedUsers: action,
        setBlockedCategories: action,
        setPinnedCategories: action,
        setPinnedChzzkUsers: action,
        setAllFollowUserIds: action,
        reprocessFollow: action,
        reprocessMyplus: action,
        reprocessTop: action
      });
    }
    // ===========================
    // Action setters
    // ===========================
    setFollowChannels(channels) {
      this.followChannels = channels;
    }
    setMyplusChannels(channels) {
      this.myplusChannels = channels;
    }
    setTopChannels(channels) {
      this.topChannels = channels;
    }
    setFavoriteGroups(groups) {
      this.favoriteGroups = groups;
    }
    setSelectedFavoriteGroupIdx(idx) {
      this.selectedFavoriteGroupIdx = idx;
      this._settings.setSetting("selectedFavoriteGroupIdx", idx);
    }
    setSelectedPinnedCategoryIdx(idx) {
      this.selectedPinnedCategoryIdx = idx;
      this._settings.setSetting("selectedPinnedCategoryIdx", idx);
    }
    setBlockedUsers(users) {
      this.blockedUsers = users;
      GM_setValue("blockedUsers", JSON.stringify(users));
    }
    setBlockedCategories(cats) {
      this.blockedCategories = cats;
      GM_setValue("blockedCategories", JSON.stringify(cats));
    }
    setPinnedCategories(cats) {
      this.pinnedCategories = cats;
      GM_setValue("pinnedCategories", JSON.stringify(cats));
    }
    setPinnedChzzkUsers(users) {
      this.pinnedChzzkUsers = users;
      GM_setValue("pinnedChzzkUsers", JSON.stringify(users));
      this.reprocessFollow();
    }
    setAllFollowUserIds(ids) {
      this.allFollowUserIds = ids;
    }
    // 설정 변경 시 저장된 원본 데이터로 즉시 재처리
    reprocessFollow() {
      if (!this._rawFollow) return;
      const { soopData, chzzkRes, hiddenBjList, feedItems } = this._rawFollow;
      const processed = this._processFollowData(soopData, chzzkRes, hiddenBjList, feedItems);
      this._diffApply(this.followChannels, processed);
    }
    reprocessMyplus() {
      if (!this._rawMyplus) return;
      const { liveList } = this._rawMyplus;
      let liveChannels = liveList.filter((item) => !isUserBlocked(item.user_id, this.blockedUsers)).filter((item) => !isCategoryBlocked(item.broad_cate_no, this.blockedCategories)).map((item) => ({ channel: item, type: "soop_live", args: [] }));
      if (!this._settings.myplusOrder) {
        liveChannels = liveChannels.sort(
          (a, b) => (b.channel.total_view_cnt ?? 0) - (a.channel.total_view_cnt ?? 0)
        );
      }
      this._diffApply(this.myplusChannels, liveChannels);
    }
    reprocessTop() {
      var _a2, _b2;
      if (!this._rawTop) return;
      const { soopData, chzzkRes } = this._rawTop;
      const result = [];
      for (const item of soopData) {
        if (this.hiddenBjList.includes(item.user_id)) continue;
        if (isUserBlocked(item.user_id, this.blockedUsers)) continue;
        if (isCategoryBlocked(item.broad_cate_no, this.blockedCategories)) continue;
        if (this._settings.isTopDuplicateRemovalEnabled && this.allFollowUserIds.includes(item.user_id)) continue;
        result.push({ channel: item, type: "soop_live", args: [] });
      }
      if (this.selectedPinnedCategoryIdx === 0 && ((_a2 = chzzkRes == null ? void 0 : chzzkRes.content) == null ? void 0 : _a2.data)) {
        const chzzkFollowSet = new Set(
          this._settings.isTopDuplicateRemovalEnabled ? this.followChannels.filter((c) => c.type === "chzzk").map((c) => {
            var _a3, _b3;
            return (_b3 = (_a3 = c.channel) == null ? void 0 : _a3.channel) == null ? void 0 : _b3.channelId;
          }).filter(Boolean) : []
        );
        for (const item of chzzkRes.content.data) {
          if (chzzkFollowSet.has((_b2 = item.channel) == null ? void 0 : _b2.channelId)) continue;
          result.push({ channel: item, type: "chzzk", args: [] });
        }
      }
      result.sort((a, b) => getViewerCount(b) - getViewerCount(a));
      this._diffApply(this.topChannels, result);
    }
    // ===========================
    // 데이터 fetch
    // ===========================
    async fetchFollowData() {
      if (!this._settings.displayFollow) return;
      if (this.followChannels.length === 0) {
        runInAction(() => {
          this.isFollowLoading = true;
        });
      }
      try {
        const groupIdx = this.selectedFavoriteGroupIdx;
        const soopUrl = groupIdx > 0 ? `https://myapi.sooplive.com/api/favorite/${groupIdx}` : "https://myapi.sooplive.com/api/favorite";
        const [soopRes, chzzkRes, hiddenBjList, feedItems] = await Promise.all([
          fetchBroadList(soopUrl, 50),
          groupIdx === 0 && this._settings.isChzzkFollowChannelsEnabled ? fetchBroadList("https://api.chzzk.naver.com/service/v1/channels/followings/live", 50) : Promise.resolve(null),
          getHiddenbjList(),
          getStationFeed(this._settings.isChannelFeedEnabled)
        ]);
        const hasSoopError = Array.isArray(soopRes);
        const soopData = hasSoopError ? [] : (soopRes == null ? void 0 : soopRes.data) ?? [];
        if (hasSoopError && this.followChannels.length > 0) {
          runInAction(() => {
            this.hiddenBjList = hiddenBjList;
            this.isFollowLoading = false;
          });
          return;
        }
        if (groupIdx === 0 && (soopRes == null ? void 0 : soopRes.data)) {
          runInAction(() => {
            this.allFollowUserIds = soopData.map((item) => item.user_id).filter(Boolean);
          });
        }
        const processed = this._processFollowData(soopData, chzzkRes, hiddenBjList, feedItems);
        runInAction(() => {
          this._rawFollow = { soopData, chzzkRes, hiddenBjList, feedItems };
          this.hiddenBjList = hiddenBjList;
          this.isFollowLoading = false;
          this._diffApply(this.followChannels, processed);
        });
      } catch (e) {
        console.error("[SOOP Sidebar] fetchFollowData 에러:", e);
        runInAction(() => {
          this.isFollowLoading = false;
        });
      }
    }
    _processFollowData(soopData, chzzkRes, hiddenBjList, feedItems) {
      var _a2, _b2, _c, _d, _e, _f;
      const s = this._settings;
      const result = [];
      for (const item of soopData) {
        const userId = item.user_id;
        if (hiddenBjList.includes(userId)) continue;
        if (isUserBlocked(userId, this.blockedUsers)) continue;
        if ((_a2 = item.broad_info) == null ? void 0 : _a2.length) {
          for (const broad of item.broad_info) {
            const catBlocked = isCategoryBlocked(broad.broad_cate_no, this.blockedCategories);
            if (catBlocked && !s.isBlockedCategorySortingEnabled) continue;
            const isPinned = !catBlocked && (s.isPinnedStreamWithNotificationEnabled && item.is_mobile_push === "Y" || s.isPinnedStreamWithPinEnabled && item.is_pin);
            const chzzkChannelId = this.pinnedChzzkUsers.find((c) => c === userId);
            result.push({
              channel: {
                ...broad,
                user_nick: item.user_nick || broad.user_nick || userId,
                profile_image: item.profile_image,
                is_mobile_push: item.is_mobile_push,
                is_pin: item.is_pin,
                isPinned,
                _isCategoryBlocked: catBlocked,
                chzzkChannelId
              },
              type: "soop_live",
              args: []
            });
          }
        } else if (s.isChannelFeedEnabled) {
          const isPinned = !s.isPinnedOnlineOnlyEnabled && (s.isPinnedStreamWithNotificationEnabled && item.is_mobile_push === "Y" || s.isPinnedStreamWithPinEnabled && item.is_pin);
          const feed = feedItems.find((f2) => f2.station_user_id === userId);
          if (feed) {
            result.push({
              channel: {
                ...feed,
                user_nick: item.user_nick || userId,
                profile_image: item.profile_image,
                isPinned
              },
              type: "soop_feed",
              args: []
            });
          } else {
            result.push({
              channel: {
                user_id: userId,
                user_nick: item.user_nick || userId,
                profile_image: item.profile_image,
                isPinned
              },
              type: "soop_offline",
              args: []
            });
          }
        }
      }
      if ((chzzkRes == null ? void 0 : chzzkRes.code) === 200) {
        const followingList = ((_b2 = chzzkRes.content) == null ? void 0 : _b2.followingList) ?? [];
        for (const item of followingList) {
          const channelId = ((_c = item == null ? void 0 : item.channel) == null ? void 0 : _c.channelId) ?? (item == null ? void 0 : item.channelId);
          const isMobilePush = s.isPinnedStreamWithNotificationEnabled && ((_f = (_e = (_d = item == null ? void 0 : item.channel) == null ? void 0 : _d.personalData) == null ? void 0 : _e.following) == null ? void 0 : _f.notification) ? "Y" : "N";
          const isPinned = channelId ? this.pinnedChzzkUsers.includes(channelId) : false;
          result.push({
            channel: { ...item, isPinned },
            type: "chzzk",
            args: [isMobilePush]
          });
        }
      }
      if (s.isRandomSortEnabled) {
        result.sort(() => Math.random() - 0.5);
      }
      const blockedCat = result.filter((c) => c.channel._isCategoryBlocked);
      const main = result.filter((c) => !c.channel._isCategoryBlocked);
      const pinned = main.filter((c) => c.channel.isPinned);
      const rest = main.filter((c) => !c.channel.isPinned);
      if (!s.isRandomSortEnabled) {
        rest.sort((a, b) => getViewerCount(b) - getViewerCount(a));
      }
      return [...pinned, ...rest, ...blockedCat];
    }
    async fetchMyplusData() {
      var _a2, _b2;
      if (!this._settings.displayMyplus) return;
      if (this.myplusChannels.length === 0) {
        runInAction(() => {
          this.isMyplusLoading = true;
        });
      }
      try {
        const url = "https://live.sooplive.com/api/myplus/preferbjLiveVodController.php?nInitCnt=6&szRelationType=C";
        const res = await fetchBroadList(url, 50);
        const liveList = ((_a2 = res == null ? void 0 : res.DATA) == null ? void 0 : _a2.live_list) ?? [];
        const vodList = ((_b2 = res == null ? void 0 : res.DATA) == null ? void 0 : _b2.vod_list) ?? [];
        runInAction(() => {
          this._rawMyplus = { liveList, vodList };
          this.isMyplusLoading = false;
          let liveChannels = liveList.filter((item) => !isUserBlocked(item.user_id, this.blockedUsers)).filter((item) => !isCategoryBlocked(item.broad_cate_no, this.blockedCategories)).map(
            (item) => ({
              channel: item,
              type: "soop_live",
              args: []
            })
          );
          if (!this._settings.myplusOrder) {
            liveChannels = liveChannels.sort(
              (a, b) => (b.channel.total_view_cnt ?? 0) - (a.channel.total_view_cnt ?? 0)
            );
          }
          this._diffApply(this.myplusChannels, liveChannels);
          this.myplusVodChannels = vodList.filter((item) => !isUserBlocked(item.user_id, this.blockedUsers)).map(
            (item) => ({
              channel: item,
              type: "soop_live",
              args: []
            })
          );
        });
      } catch (e) {
        runInAction(() => {
          this.isMyplusLoading = false;
        });
      }
    }
    async fetchTopData() {
      var _a2, _b2;
      if (!this._settings.displayTop) return;
      if (this.topChannels.length === 0) {
        runInAction(() => {
          this.isTopLoading = true;
        });
      }
      try {
        const catIdx = this.selectedPinnedCategoryIdx;
        const soopUrl = catIdx === 0 ? "https://live.sooplive.com/api/main_broad_list_api.php?selectType=action&orderType=view_cnt&pageNo=1&lang=ko_KR" : `https://live.sooplive.com/api/main_broad_list_api.php?selectType=cate&selectValue=${catIdx}&orderType=view_cnt&pageNo=1&lang=ko_KR`;
        const [soopRes, chzzkRes] = await Promise.all([
          fetchBroadList(soopUrl, 100),
          this._settings.isChzzkTopChannelsEnabled ? fetchBroadList("https://api.chzzk.naver.com/service/v1/lives?size=50&sortType=POPULAR", 100) : Promise.resolve(null)
        ]);
        const soopData = (soopRes == null ? void 0 : soopRes.broad) ?? [];
        const result = [];
        this._rawTop = { soopData, chzzkRes };
        for (const item of soopData) {
          if (this.hiddenBjList.includes(item.user_id)) continue;
          if (isUserBlocked(item.user_id, this.blockedUsers)) continue;
          if (isCategoryBlocked(item.broad_cate_no, this.blockedCategories)) continue;
          if (this._settings.isTopDuplicateRemovalEnabled && this.allFollowUserIds.includes(item.user_id))
            continue;
          result.push({ channel: item, type: "soop_live", args: [] });
        }
        if (catIdx === 0 && ((_a2 = chzzkRes == null ? void 0 : chzzkRes.content) == null ? void 0 : _a2.data)) {
          const chzzkFollowSet = new Set(
            this._settings.isTopDuplicateRemovalEnabled ? this.followChannels.filter((c) => c.type === "chzzk").map((c) => {
              var _a3, _b3;
              return (_b3 = (_a3 = c.channel) == null ? void 0 : _a3.channel) == null ? void 0 : _b3.channelId;
            }).filter(Boolean) : []
          );
          for (const item of chzzkRes.content.data) {
            if (chzzkFollowSet.has((_b2 = item.channel) == null ? void 0 : _b2.channelId)) continue;
            result.push({ channel: item, type: "chzzk", args: [] });
          }
        }
        result.sort((a, b) => getViewerCount(b) - getViewerCount(a));
        runInAction(() => {
          this.isTopLoading = false;
          this._diffApply(this.topChannels, result);
        });
      } catch (e) {
        runInAction(() => {
          this.isTopLoading = false;
        });
      }
    }
    async fetchAllData() {
      runInAction(() => {
        this.lastFetchTime = Date.now();
      });
      await Promise.all([this.fetchFollowData(), this.fetchMyplusData(), this.fetchTopData()]);
    }
    startPolling(intervalSeconds = 30) {
      this.stopPolling();
      this.fetchAllData();
      this._pollTimer = setTimeout(() => {
        this.fetchAllData();
        this._pollTimer = setInterval(() => {
          this.fetchAllData();
        }, intervalSeconds * 1e3);
      }, 10 * 1e3);
    }
    stopPolling() {
      if (this._pollTimer) {
        clearTimeout(this._pollTimer);
        this._pollTimer = null;
      }
    }
    // ===========================
    // 주요 업데이트
    // ===========================
    /** localStorage 캐시에서 이전 데이터 동기 로드 — 첫 렌더링 종료 전에 채널 표시 */
    _initFromLocalStorageCache() {
      var _a2, _b2, _c, _d, _e;
      const readCache = (url, expiryMs) => {
        try {
          const raw = localStorage.getItem(`fetchCache_${encodeURIComponent(url)}`);
          if (!raw) return null;
          const { timestamp, data } = JSON.parse(raw);
          return Date.now() - timestamp < expiryMs ? data : null;
        } catch {
          return null;
        }
      };
      const followData = readCache("https://myapi.sooplive.com/api/favorite", 5e4);
      if ((_a2 = followData == null ? void 0 : followData.data) == null ? void 0 : _a2.length) {
        const channels = [];
        for (const item of followData.data) {
          if ((_b2 = item.broad_info) == null ? void 0 : _b2.length) {
            for (const broad of item.broad_info) {
              channels.push({
                channel: {
                  ...broad,
                  user_nick: item.user_nick || broad.user_nick || item.user_id,
                  profile_image: item.profile_image,
                  is_mobile_push: item.is_mobile_push
                },
                type: "soop_live",
                args: []
              });
            }
          }
        }
        if (channels.length > 0) {
          this.followChannels = channels;
        }
      }
      const myplusData = readCache(
        "https://live.sooplive.com/api/myplus/preferbjLiveVodController.php?nInitCnt=6&szRelationType=C",
        5e4
      );
      if ((_d = (_c = myplusData == null ? void 0 : myplusData.DATA) == null ? void 0 : _c.live_list) == null ? void 0 : _d.length) {
        this.myplusChannels = myplusData.DATA.live_list.map(
          (item) => ({
            channel: item,
            type: "soop_live",
            args: []
          })
        );
      }
      const topData = readCache(
        "https://live.sooplive.com/api/main_broad_list_api.php?selectType=action&orderType=view_cnt&pageNo=1&lang=ko_KR",
        1e5
      );
      if ((_e = topData == null ? void 0 : topData.broad) == null ? void 0 : _e.length) {
        this.topChannels = topData.broad.map(
          (item) => ({
            channel: item,
            type: "soop_live",
            args: []
          })
        );
      }
    }
    // ===========================
    // 채널 목록 diff 업데이트
    // ===========================
    _getChannelKey(c) {
      var _a2, _b2, _c, _d, _e, _f, _g, _h, _i;
      if (c.type === "chzzk") {
        return `chzzk_${((_b2 = (_a2 = c.channel) == null ? void 0 : _a2.channel) == null ? void 0 : _b2.channelId) ?? ((_c = c.channel) == null ? void 0 : _c.channelId) ?? ""}`;
      }
      if (c.type === "soop_feed") return `feed_${((_d = c.channel) == null ? void 0 : _d.user_id) ?? ""}`;
      if (c.type === "soop_offline") return `offline_${((_e = c.channel) == null ? void 0 : _e.user_id) ?? ""}`;
      if (c.type === "soop_vod") return `vod_${((_f = c.channel) == null ? void 0 : _f.user_id) ?? ""}_${((_g = c.channel) == null ? void 0 : _g.title_no) ?? ""}`;
      return `soop_${((_h = c.channel) == null ? void 0 : _h.user_id) ?? ""}_${((_i = c.channel) == null ? void 0 : _i.broad_no) ?? ""}`;
    }
    _updateMutableFields(existing, next) {
      const e = existing.channel;
      const n2 = next.channel;
      if (existing.type === "soop_live") {
        e.total_view_cnt = n2.total_view_cnt;
        e.broad_title = n2.broad_title;
        e.category_name = n2.category_name;
        e.broad_cate_no = n2.broad_cate_no;
        e.is_mobile_push = n2.is_mobile_push;
        e.isPinned = n2.isPinned;
      } else if (existing.type === "chzzk") {
        if (n2.liveInfo) e.liveInfo = n2.liveInfo;
        if (n2.concurrentUserCount != null) e.concurrentUserCount = n2.concurrentUserCount;
        if (n2.liveTitle != null) e.liveTitle = n2.liveTitle;
        if (n2.liveCategoryValue != null) e.liveCategoryValue = n2.liveCategoryValue;
      }
    }
    /** 기존 배열을 in-place로 diff 업데이트. 없어진 채널 제거, 기존 채널 필드 업데이트, 새 채널 삽입, 순서 재정렬 */
    _diffApply(current, next) {
      const nextMap = new Map(next.map((c) => [this._getChannelKey(c), c]));
      const currentMap = new Map(current.map((c) => [this._getChannelKey(c), c]));
      for (let i = current.length - 1; i >= 0; i--) {
        if (!nextMap.has(this._getChannelKey(current[i]))) {
          current.splice(i, 1);
        }
      }
      for (const [key, existing] of currentMap) {
        const newItem = nextMap.get(key);
        if (newItem) this._updateMutableFields(existing, newItem);
      }
      for (let targetIdx = 0; targetIdx < next.length; targetIdx++) {
        const key = this._getChannelKey(next[targetIdx]);
        const curIdx = current.findIndex((c) => this._getChannelKey(c) === key);
        if (curIdx < 0) {
          current.splice(targetIdx, 0, next[targetIdx]);
        } else if (curIdx !== targetIdx) {
          const [item] = current.splice(curIdx, 1);
          current.splice(targetIdx, 0, item);
        }
      }
    }
  }
  class RootStore {
    constructor() {
      __publicField(this, "settingsStore");
      __publicField(this, "sidebarStore");
      this.settingsStore = new SettingsStore();
      this.sidebarStore = new SidebarStore(this.settingsStore);
    }
  }
  const StoreContext = reactExports.createContext(null);
  const useSettingsStore = () => reactExports.useContext(StoreContext).settingsStore;
  const useSidebarStore = () => reactExports.useContext(StoreContext).sidebarStore;
  const StoreProvider = ({ children }) => {
    const [store] = React$1.useState(() => new RootStore());
    return /* @__PURE__ */ jsxRuntimeExports.jsx(StoreContext.Provider, { value: store, children });
  };
  const addNumberSeparator = (number) => {
    const n2 = Number(number);
    if (n2 >= 1e4) {
      const displayNumber = (n2 / 1e4).toFixed(1);
      return displayNumber.endsWith(".0") ? displayNumber.slice(0, -2) + "만" : displayNumber + "만";
    }
    return n2.toLocaleString();
  };
  const extractDateTime = (text) => {
    const [dateStr, timeStr] = text.split(" ");
    const dateTimeStr = `${dateStr}T${timeStr}Z`;
    return new Date(dateTimeStr);
  };
  const getElapsedTime = (broadcastStartTimeText, type) => {
    const broadcastStartTime = extractDateTime(broadcastStartTimeText);
    broadcastStartTime.setHours(broadcastStartTime.getHours() - 9);
    const currentTime = /* @__PURE__ */ new Date();
    const timeDiff = currentTime.getTime() - broadcastStartTime.getTime();
    const secondsElapsed = Math.floor(timeDiff / 1e3);
    const hoursElapsed = Math.floor(secondsElapsed / 3600);
    const minutesElapsed = Math.floor(secondsElapsed % 3600 / 60);
    let formattedTime = "";
    {
      if (hoursElapsed > 0) {
        formattedTime = `${String(hoursElapsed)}시간 `;
      }
      formattedTime += `${String(minutesElapsed)}분`;
    }
    return formattedTime;
  };
  const timeSince = (serverTimeStr) => {
    const toKSTDate = (str) => {
      const iso = str.replace(" ", "T") + "+09:00";
      return new Date(iso);
    };
    const postTime = toKSTDate(serverTimeStr).getTime();
    const now = Date.now();
    const seconds = Math.floor((now - postTime) / 1e3);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 365) return `${Math.floor(days / 365)}년 전`;
    if (days > 30) return `${Math.floor(days / 30)}개월 전`;
    if (days > 0) return `${days}일 전`;
    if (hours > 0) return `${hours}시간 전`;
    if (minutes > 0) return `${minutes}분 전`;
    return `${seconds}초 전`;
  };
  const ChannelItem = observer(({ data }) => {
    const settings = useSettingsStore();
    const sidebarStore = useSidebarStore();
    const { channel } = data;
    const liveUrl = `https://play.sooplive.com/${channel.user_id}/${channel.broad_no}`;
    const isOnPlayerPage = window.location.href.includes("play.sooplive.com");
    const handleClick = async (e) => {
      if (settings.isSendLoadBroadEnabled && isOnPlayerPage && !e.ctrlKey) {
        e.preventDefault();
        e.stopPropagation();
        const liveView = unsafeWindow.liveView ?? window.liveView;
        const loadingEl = document.querySelector("div.loading");
        const isLoading = loadingEl ? window.getComputedStyle(loadingEl).display !== "none" : false;
        if (!isLoading && liveView) {
          try {
            const stopBtn = document.querySelector("#play.stop");
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
    const handleProfileClick = (e) => {
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
      const liveView = unsafeWindow.liveView ?? window.liveView;
      if (settings.isSendLoadBroadEnabled && liveView) {
        liveView.playerController.sendLoadBroad(channel.user_id, channel.broad_no);
      } else {
        window.location.href = liveUrl;
      }
    };
    const handleContextMenu = (e) => {
      e.preventDefault();
      if (confirm(`"${channel.user_nick}" (${channel.user_id}) 를 차단하시겠습니까?`)) {
        blockUser(
          channel.user_id,
          channel.user_nick,
          sidebarStore.blockedUsers,
          (newList) => sidebarStore.setBlockedUsers(newList)
        );
      }
    };
    const profileUrl = channel.profile_image || `https://stimg.sooplive.com/LOGO/${channel.user_id.slice(0, 2)}/${channel.user_id}/m/${channel.user_id}.webp`;
    const isPinned = channel.isPinned;
    const isNotified = channel.is_mobile_push === "Y";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        className: `user${settings.isSmallUserLayoutEnabled ? " small-user-layout" : ""}`,
        href: liveUrl,
        target: "_self",
        rel: "noreferrer",
        onClick: handleClick,
        onContextMenu: handleContextMenu,
        "data-broadcast-no": channel.broad_no,
        "data-user-id": channel.user_id,
        "data-user-nick": channel.user_nick,
        "data-broad-title": channel.broad_title,
        "data-broad-start": channel.broad_start,
        "data-total-view-cnt": channel.total_view_cnt,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "profile-picture-container", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                className: "profile-picture",
                src: profileUrl,
                alt: channel.user_nick,
                loading: "lazy",
                onClick: isOnPlayerPage ? handleProfileClick : void 0,
                onError: (e) => {
                  const img = e.target;
                  const uid = channel.user_id;
                  img.src = `https://profile.img.sooplive.com/LOGO/${uid.slice(0, 2)}/${uid}/m/${uid}.jpg`;
                  img.onerror = () => {
                    img.src = "https://profile.img.sooplive.com/LOGO/no_profile.png";
                  };
                }
              }
            ),
            isPinned && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pin-badge", children: "🖈" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "username", children: [
            isNotified && /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fa fa-bell", style: { marginRight: 3, fontSize: 11 } }),
            channel.user_nick
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "description", children: channel.category_name || getCategoryName(channel.broad_cate_no) || "" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "watchers", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "dot", children: "●" }),
            addNumberSeparator(channel.total_view_cnt)
          ] })
        ]
      }
    );
  });
  const ChannelItemChzzk = observer(({ data }) => {
    var _a2, _b2, _c, _d, _e, _f, _g, _h;
    const settings = useSettingsStore();
    const sidebarStore = useSidebarStore();
    const { channel } = data;
    const channelId = ((_a2 = channel.channel) == null ? void 0 : _a2.channelId) ?? channel.channelId;
    const channelName = ((_b2 = channel.channel) == null ? void 0 : _b2.channelName) ?? channel.channelName ?? channelId;
    const liveTitle = ((_c = channel.liveInfo) == null ? void 0 : _c.liveTitle) ?? channel.liveTitle ?? "";
    const category = ((_d = channel.liveInfo) == null ? void 0 : _d.liveCategoryValue) ?? channel.liveCategoryValue ?? "";
    const viewers = ((_e = channel.liveInfo) == null ? void 0 : _e.concurrentUserCount) ?? channel.concurrentUserCount ?? 0;
    const profileUrl = ((_f = channel.channel) == null ? void 0 : _f.channelImageUrl) ?? channel.channelImageUrl;
    const liveImageUrl = (((_g = channel.liveInfo) == null ? void 0 : _g.liveImageUrl) ?? channel.liveImageUrl ?? "").replace("{type}", "360");
    const openDate = ((_h = channel.liveInfo) == null ? void 0 : _h.openDate) ?? channel.openDate ?? "";
    const isPinned = sidebarStore.pinnedChzzkUsers.includes(channelId);
    const handlePinClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isPinned) {
        sidebarStore.setPinnedChzzkUsers(sidebarStore.pinnedChzzkUsers.filter((id2) => id2 !== channelId));
      } else {
        sidebarStore.setPinnedChzzkUsers([...sidebarStore.pinnedChzzkUsers, channelId]);
      }
    };
    const handleContextMenu = (e) => {
      e.preventDefault();
      if (confirm(`"${channelName}" (${channelId}) 를 차단하시겠습니까?`)) {
        blockUser(
          channelId,
          channelName,
          sidebarStore.blockedUsers,
          (newList) => sidebarStore.setBlockedUsers(newList)
        );
      }
    };
    const liveUrl = `https://chzzk.naver.com/live/${channelId}`;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        className: `user${settings.isSmallUserLayoutEnabled ? " small-user-layout" : ""}`,
        href: liveUrl,
        target: settings.isSendLoadBroadEnabled ? "_self" : "_blank",
        rel: "noreferrer",
        onContextMenu: handleContextMenu,
        "data-chzzk-channel-id": channelId,
        "data-channel-name": channelName,
        "data-live-title": liveTitle,
        "data-concurrent-user-count": viewers,
        "data-live-image-url": liveImageUrl,
        "data-open-date": openDate,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "profile-picture-container", children: [
            profileUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                className: "profile-picture",
                src: profileUrl,
                alt: channelName,
                loading: "lazy",
                onError: (e) => {
                  e.target.src = "https://profile.img.sooplive.com/LOGO/no_profile.png";
                }
              }
            ),
            isPinned && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pin-badge", children: "🖈" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "username", children: channelName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "description", children: category }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "watchers", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "dot greendot", children: "●" }),
            addNumberSeparator(viewers)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: `chzzk-pin-btn${isPinned ? " pinned" : ""}`,
              onClick: handlePinClick,
              title: isPinned ? "고정 해제" : "상단 고정",
              children: "🖈"
            }
          )
        ]
      }
    );
  });
  const ChannelItemOffline = observer(({ data }) => {
    var _a2;
    const settings = useSettingsStore();
    const { channel } = data;
    const userId = channel.user_id ?? channel.station_user_id;
    const userNick = channel.user_nick ?? userId;
    const profileUrl = channel.profile_image || `https://stimg.sooplive.com/LOGO/${userId.slice(0, 2)}/${userId}/m/${userId}.webp`;
    const isFeed = data.type === "soop_feed";
    const stationUrl = `https://www.sooplive.com/${userId}`;
    if (isFeed) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          className: `user user-offline${settings.isSmallUserLayoutEnabled ? " small-user-layout" : ""}`,
          href: stationUrl,
          target: "_self",
          rel: "noreferrer",
          title: `${userNick} - 피드`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                className: "profile-picture profile-grayscale",
                src: profileUrl,
                alt: userNick,
                loading: "lazy",
                onError: (e) => {
                  const img = e.target;
                  img.src = `https://profile.img.sooplive.com/LOGO/${userId.slice(0, 2)}/${userId}/m/${userId}.jpg`;
                  img.onerror = () => {
                    img.src = "https://profile.img.sooplive.com/LOGO/no_profile.png";
                  };
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "username", children: userNick }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "description", children: channel.title ?? ((_a2 = channel.content) == null ? void 0 : _a2.slice(0, 30)) ?? "피드" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "watchers", children: channel.reg_timestamp ? timeSince(new Date(channel.reg_timestamp * 1e3).toISOString()) : "" })
          ]
        }
      );
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        className: `user user-offline${settings.isSmallUserLayoutEnabled ? " small-user-layout" : ""}`,
        href: stationUrl,
        target: "_self",
        rel: "noreferrer",
        title: userNick,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              className: "profile-picture profile-grayscale",
              src: profileUrl,
              alt: userNick,
              loading: "lazy",
              onError: (e) => {
                const img = e.target;
                img.src = `https://profile.img.sooplive.com/LOGO/${userId.slice(0, 2)}/${userId}/m/${userId}.jpg`;
                img.onerror = () => {
                  img.src = "https://profile.img.sooplive.com/LOGO/no_profile.png";
                };
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "username", children: userNick }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "description", children: "오프라인" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "watchers", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "dot profile-grayscale", role: "img", children: "●" }),
            "오프라인"
          ] })
        ]
      }
    );
  });
  const DEFAULT_SHOW_COUNT = 30;
  const SECTION_FA_ICONS = {
    follow: "fa-star",
    myplus: "fa-thumbs-up",
    top: "fa-fire"
  };
  const SidebarSection = observer(
    ({ id: id2, title, href, channels, isLoading = false, maxCount, children }) => {
      useSettingsStore();
      const [showAll, setShowAll] = reactExports.useState(false);
      const limit = maxCount && maxCount > 0 ? maxCount : DEFAULT_SHOW_COUNT;
      reactExports.useEffect(() => {
        setShowAll(false);
      }, [limit]);
      const visibleChannels = showAll ? channels : channels.slice(0, limit);
      const renderChannel = (data, idx) => {
        var _a2;
        switch (data.type) {
          case "chzzk":
            return /* @__PURE__ */ jsxRuntimeExports.jsx(ChannelItemChzzk, { data }, `chzzk_${((_a2 = data.channel.channel) == null ? void 0 : _a2.channelId) ?? idx}`);
          case "soop_offline":
          case "soop_feed":
            return /* @__PURE__ */ jsxRuntimeExports.jsx(ChannelItemOffline, { data }, `${data.type}_${data.channel.user_id ?? idx}`);
          default:
            return /* @__PURE__ */ jsxRuntimeExports.jsx(ChannelItem, { data }, `soop_${data.channel.user_id}_${data.channel.broad_no}`);
        }
      };
      if (channels.length === 0 && !isLoading) {
        return null;
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `section-wrapper ${id2}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `top-section ${id2}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href, target: "_blank", rel: "noreferrer", children: title }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href, target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: `fa ${SECTION_FA_ICONS[id2] ?? "fa-list"} section-icon` }) }) })
        ] }),
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `users-section ${id2}`, children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "8px 10px", fontSize: 13, color: "#888" }, children: "로딩 중..." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          visibleChannels.map((data, idx) => renderChannel(data, idx)),
          !showAll && channels.length > limit && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "user show-more", onClick: () => setShowAll(true), children: [
            "+ ",
            channels.length - limit,
            "개 더보기"
          ] })
        ] }) })
      ] });
    }
  );
  const FavoriteGroupTabs = observer(() => {
    const settings = useSettingsStore();
    const sidebarStore = useSidebarStore();
    const tabsRef = reactExports.useRef(null);
    const [showLeft, setShowLeft] = reactExports.useState(false);
    const [showRight, setShowRight] = reactExports.useState(false);
    const updateScrollBtns = () => {
      const el2 = tabsRef.current;
      if (!el2) return;
      setShowLeft(el2.scrollLeft > 0);
      setShowRight(el2.scrollLeft + el2.clientWidth < el2.scrollWidth - 1);
    };
    reactExports.useEffect(() => {
      const el2 = tabsRef.current;
      if (!el2) return;
      el2.addEventListener("scroll", updateScrollBtns);
      updateScrollBtns();
      return () => el2.removeEventListener("scroll", updateScrollBtns);
    }, [sidebarStore.favoriteGroups]);
    const scroll = (dir) => {
      const el2 = tabsRef.current;
      if (!el2) return;
      el2.scrollBy({ left: dir === "left" ? -100 : 100, behavior: "smooth" });
    };
    const allTab = { idx: 0, title: "전체" };
    const tabs = [allTab, ...sidebarStore.favoriteGroups];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "favorite-group-wrapper", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `fav-group-scroll-btn scroll-btn-left${showLeft ? " visible" : ""}`,
          onClick: () => scroll("left"),
          children: "‹"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "favorite-group-tabs", ref: tabsRef, children: tabs.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `fav-group-tab${sidebarStore.selectedFavoriteGroupIdx === Number(group.idx) ? " active" : ""}`,
          onClick: () => {
            sidebarStore.setSelectedFavoriteGroupIdx(Number(group.idx));
            sidebarStore.fetchFollowData();
          },
          children: settings.isShortenFavoriteGroupNameEnabled ? String(group.title).slice(0, 4) : group.title
        },
        group.idx
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `fav-group-scroll-btn scroll-btn-right${showRight ? " visible" : ""}`,
          onClick: () => scroll("right"),
          children: "›"
        }
      )
    ] });
  });
  const CategoryGroupTabs = observer(() => {
    const sidebarStore = useSidebarStore();
    const tabsRef = reactExports.useRef(null);
    const [showLeft, setShowLeft] = reactExports.useState(false);
    const [showRight, setShowRight] = reactExports.useState(false);
    const updateScrollBtns = () => {
      const el2 = tabsRef.current;
      if (!el2) return;
      setShowLeft(el2.scrollLeft > 0);
      setShowRight(el2.scrollLeft + el2.clientWidth < el2.scrollWidth - 1);
    };
    reactExports.useEffect(() => {
      const el2 = tabsRef.current;
      if (!el2) return;
      el2.addEventListener("scroll", updateScrollBtns);
      updateScrollBtns();
      return () => el2.removeEventListener("scroll", updateScrollBtns);
    }, [sidebarStore.pinnedCategories]);
    const scroll = (dir) => {
      const el2 = tabsRef.current;
      if (!el2) return;
      el2.scrollBy({ left: dir === "left" ? -100 : 100, behavior: "smooth" });
    };
    const allTab = { categoryId: "0", categoryName: "전체" };
    const tabs = [allTab, ...sidebarStore.pinnedCategories];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "category-group-wrapper", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `fav-group-scroll-btn scroll-btn-left${showLeft ? " visible" : ""}`,
          onClick: () => scroll("left"),
          children: "‹"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "category-group-tabs", ref: tabsRef, children: tabs.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `fav-group-tab${sidebarStore.selectedPinnedCategoryIdx === Number(cat.categoryId) ? " active" : ""}`,
          onClick: () => {
            sidebarStore.setSelectedPinnedCategoryIdx(Number(cat.categoryId));
          },
          children: cat.categoryName
        },
        cat.categoryId
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `fav-group-scroll-btn scroll-btn-right${showRight ? " visible" : ""}`,
          onClick: () => scroll("right"),
          children: "›"
        }
      )
    ] });
  });
  const _uwTooltip = (() => {
    try {
      return unsafeWindow;
    } catch {
      return window;
    }
  })();
  function ensureHlsJs() {
    if (_uwTooltip.Hls) return Promise.resolve();
    return new Promise((resolve) => {
      if (document.querySelector("script[data-hls-loader]")) {
        const check = setInterval(() => {
          if (_uwTooltip.Hls) {
            clearInterval(check);
            resolve();
          }
        }, 100);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/hls.js@latest";
      script.dataset.hlsLoader = "1";
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }
  async function getBroadM3u8Domain(broadNo) {
    const params = new URLSearchParams({
      return_type: "gs_cdn_pc_web",
      use_cors: "true",
      cors_origin_url: "play.sooplive.com",
      broad_key: `${broadNo}-common-master-hls`,
      player_mode: "landing",
      time: "0"
    });
    try {
      const res = await fetch(`https://livestream-manager.sooplive.com/broad_stream_assign.html?${params}`, {
        credentials: "include",
        cache: "no-store"
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.result === "1" && data.view_url ? data.view_url : null;
    } catch {
      return null;
    }
  }
  async function getBroadAid(userId, broadNo) {
    var _a2;
    const payload = new URLSearchParams({
      bid: userId,
      bno: broadNo,
      from_api: "0",
      mode: "landing",
      player_type: "html5",
      stream_type: "common",
      quality: "sd",
      type: "aid",
      pwd: ""
    });
    try {
      const res = await fetch("https://live.sooplive.com/afreeca/player_live_api.php", {
        method: "POST",
        body: payload,
        credentials: "include",
        cache: "no-store"
      });
      const data = await res.json();
      return ((_a2 = data == null ? void 0 : data.CHANNEL) == null ? void 0 : _a2.AID) ?? null;
    } catch {
      return null;
    }
  }
  function captureVideoFrame(video) {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      canvas.width = 480;
      canvas.height = 270;
      const ctx = canvas.getContext("2d");
      const vr = video.videoWidth / video.videoHeight;
      const cr = 480 / 270;
      let dw = 480, dh2 = 270, ox = 0, oy = 0;
      if (vr > cr) {
        dh2 = 480 / vr;
        oy = (270 - dh2) / 2;
      } else {
        dw = 270 * vr;
        ox = (480 - dw) / 2;
      }
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, 480, 270);
      ctx.drawImage(video, ox, oy, dw, dh2);
      resolve(canvas.toDataURL("image/webp"));
    });
  }
  async function loadAdultFrame(userId, broadNo) {
    await ensureHlsJs();
    const Hls = _uwTooltip.Hls;
    if (!(Hls == null ? void 0 : Hls.isSupported())) return null;
    const [aid, baseUrl] = await Promise.all([getBroadAid(userId, broadNo), getBroadM3u8Domain(broadNo)]);
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
          const frame = await captureVideoFrame(video);
          video.pause();
          video.src = "";
          hls.destroy();
          resolve(frame);
        },
        { once: true }
      );
      setTimeout(() => {
        hls.destroy();
        resolve(null);
      }, 15e3);
    });
  }
  const adultFrameCache = /* @__PURE__ */ new Map();
  const adultFrameTimestamps = /* @__PURE__ */ new Map();
  let globalShowFn = null;
  let globalHideFn = null;
  const showTooltip = (data, x2, y2) => {
    globalShowFn == null ? void 0 : globalShowFn(data, x2, y2);
  };
  const hideTooltip = () => {
    globalHideFn == null ? void 0 : globalHideFn();
  };
  const TooltipPreview = observer(() => {
    const settings = useSettingsStore();
    const [visible, setVisible] = reactExports.useState(false);
    const [pos, setPos] = reactExports.useState({ x: 0, y: 0 });
    const [data, setData] = reactExports.useState(null);
    const [resolvedThumbnail, setResolvedThumbnail] = reactExports.useState(null);
    const [capturedFrame, setCapturedFrame] = reactExports.useState(null);
    const ref = reactExports.useRef(null);
    reactExports.useEffect(() => {
      if (!settings.isReplaceEmptyThumbnailEnabled) return;
      if (!(data == null ? void 0 : data.userId) || !(data == null ? void 0 : data.broadNo) || data.type !== "live" || data.platform === "chzzk") return;
      const broadNoStr = String(data.broadNo);
      const userId = data.userId;
      let cancelled = false;
      const cached = adultFrameCache.get(broadNoStr);
      if (cached) {
        setCapturedFrame(cached);
        return;
      }
      const lastTime = adultFrameTimestamps.get(broadNoStr) ?? 0;
      if (Date.now() - lastTime < 3e4) return;
      adultFrameTimestamps.set(broadNoStr, Date.now());
      (async () => {
        const frame = await loadAdultFrame(userId, broadNoStr);
        if (cancelled || !frame) return;
        adultFrameCache.set(broadNoStr, frame);
        setCapturedFrame(frame);
      })();
      return () => {
        cancelled = true;
      };
    }, [data, settings.isReplaceEmptyThumbnailEnabled]);
    reactExports.useEffect(() => {
      setCapturedFrame(null);
      if (!data) {
        setResolvedThumbnail(null);
        return;
      }
      const direct = data.thumbnailUrl || (data.broadNo ? `https://liveimg.sooplive.com/m/${data.broadNo}.jpg` : null);
      if (direct) {
        setResolvedThumbnail(direct);
        return;
      }
      if (data.platform === "chzzk" && data.userId) {
        setResolvedThumbnail(null);
        fetchBroadList(
          `https://api.chzzk.naver.com/service/v1/channels/${data.userId}/data?fields=topExposedVideos`,
          100
        ).then((res) => {
          var _a2, _b2, _c;
          const liveImageUrl = (_c = (_b2 = (_a2 = res == null ? void 0 : res.content) == null ? void 0 : _a2.topExposedVideos) == null ? void 0 : _b2.openLive) == null ? void 0 : _c.liveImageUrl;
          if (liveImageUrl) {
            setResolvedThumbnail(liveImageUrl.replace("{type}", "360"));
          }
        }).catch(() => {
        });
      } else {
        setResolvedThumbnail(null);
      }
    }, [data]);
    reactExports.useEffect(() => {
      globalShowFn = (tooltipData, x2, y2) => {
        if (!settings.isThumbnailTooltipEnabled) return;
        setData(tooltipData);
        setPos({ x: x2, y: y2 });
        setVisible(true);
      };
      globalHideFn = () => setVisible(false);
      return () => {
        globalShowFn = null;
        globalHideFn = null;
      };
    }, [settings.isThumbnailTooltipEnabled]);
    reactExports.useEffect(() => {
      if (!visible || !ref.current) return;
      const el2 = ref.current;
      const rect = el2.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh2 = window.innerHeight;
      let x2 = pos.x + 15;
      let y2 = pos.y + 15;
      if (x2 + rect.width > vw) x2 = pos.x - rect.width - 10;
      if (y2 + rect.height > vh2) y2 = vh2 - rect.height - 10;
      el2.style.left = `${x2}px`;
      el2.style.top = `${y2}px`;
    }, [visible, pos]);
    if (!settings.isThumbnailTooltipEnabled || !visible || !data) return null;
    const cacheBuster = `?${Math.floor(Date.now() / 1e4)}`;
    const thumbnailSrc = capturedFrame ? capturedFrame : resolvedThumbnail ? resolvedThumbnail + (resolvedThumbnail.startsWith("http") && !resolvedThumbnail.startsWith("https://stimg.") ? cacheBuster : "") : null;
    const elapsed = data.broadStart && data.type === "live" ? getElapsedTime(data.broadStart) : null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref, className: `tooltip-container${visible ? " visible" : ""}`, style: { position: "fixed" }, children: [
      thumbnailSrc && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "thumbs-box", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: thumbnailSrc, alt: data.broadTitle }),
        data.totalViewCnt !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "thumb-overlay-bottom", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "views", children: [
            addNumberSeparator(data.totalViewCnt),
            "명"
          ] }),
          elapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "duration-overlay", children: elapsed })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tooltiptext", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tooltip-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tooltip-username", children: data.userNick }),
          elapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tooltip-time", children: elapsed })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tooltip-description", children: data.broadTitle })
      ] })
    ] });
  });
  const SidebarView = observer(() => {
    const settings = useSettingsStore();
    const sidebarStore = useSidebarStore();
    reactExports.useEffect(() => {
      loadCategoryData();
      if (settings.isFavoriteGroupEnabled) {
        fetchFavoriteGroups().then((groups) => sidebarStore.setFavoriteGroups(groups));
      }
      sidebarStore.startPolling(settings.pollIntervalSeconds);
      return () => {
        sidebarStore.stopPolling();
      };
    }, []);
    reactExports.useEffect(() => {
      sidebarStore.stopPolling();
      sidebarStore.startPolling(settings.pollIntervalSeconds);
    }, [settings.pollIntervalSeconds]);
    reactExports.useEffect(() => {
      sidebarStore.reprocessFollow();
    }, [
      settings.isPinnedStreamWithNotificationEnabled,
      settings.isPinnedStreamWithPinEnabled,
      settings.isPinnedOnlineOnlyEnabled,
      settings.isRandomSortEnabled,
      settings.isBlockedCategorySortingEnabled,
      settings.isChannelFeedEnabled
    ]);
    reactExports.useEffect(() => {
      sidebarStore.reprocessMyplus();
    }, [settings.myplusOrder]);
    reactExports.useEffect(() => {
      if (!settings.isThumbnailTooltipEnabled) return;
      const handleMouseOver = (e) => {
        const target = e.target;
        const soopItem = target.closest("[data-broadcast-no]");
        if (soopItem) {
          const broadNo = soopItem.dataset.broadcastNo;
          const userId = soopItem.dataset.userId ?? "";
          const userNick = soopItem.dataset.userNick ?? "";
          const broadTitle = soopItem.dataset.broadTitle ?? "";
          if (!broadNo) return;
          const broadStart = soopItem.dataset.broadStart;
          const totalViewCntRaw = soopItem.dataset.totalViewCnt;
          const totalViewCnt = totalViewCntRaw !== void 0 ? parseInt(totalViewCntRaw, 10) : void 0;
          showTooltip(
            { userId, userNick, broadTitle, broadNo, broadStart, totalViewCnt, type: "live" },
            e.clientX,
            e.clientY
          );
          return;
        }
        const chzzkItem = target.closest("[data-chzzk-channel-id]");
        if (chzzkItem) {
          const userId = chzzkItem.dataset.chzzkChannelId ?? "";
          const userNick = chzzkItem.dataset.channelName ?? "";
          const broadTitle = chzzkItem.dataset.liveTitle ?? "";
          const thumbnailUrl = chzzkItem.dataset.liveImageUrl || void 0;
          const broadStart = chzzkItem.dataset.openDate || void 0;
          const viewsRaw = chzzkItem.dataset.concurrentUserCount;
          const totalViewCnt = viewsRaw !== void 0 ? parseInt(viewsRaw, 10) : void 0;
          showTooltip(
            {
              userId,
              userNick,
              broadTitle,
              thumbnailUrl,
              broadStart,
              totalViewCnt,
              type: "live",
              platform: "chzzk"
            },
            e.clientX,
            e.clientY
          );
        }
      };
      const handleMouseOut = () => hideTooltip();
      document.addEventListener("mouseover", handleMouseOver);
      document.addEventListener("mouseout", handleMouseOut);
      return () => {
        document.removeEventListener("mouseover", handleMouseOver);
        document.removeEventListener("mouseout", handleMouseOut);
      };
    }, [settings.isThumbnailTooltipEnabled]);
    reactExports.useEffect(() => {
      sidebarStore.reprocessTop();
    }, [settings.isTopDuplicateRemovalEnabled]);
    const [refreshProgress, setRefreshProgress] = reactExports.useState(0);
    reactExports.useEffect(() => {
      const INTERVAL = settings.pollIntervalSeconds * 1e3;
      const tick = () => {
        const elapsed = sidebarStore.lastFetchTime ? Date.now() - sidebarStore.lastFetchTime : 0;
        setRefreshProgress(Math.min(100, elapsed / INTERVAL * 100));
      };
      tick();
      const timer = setInterval(tick, 500);
      return () => clearInterval(timer);
    }, [sidebarStore.lastFetchTime, settings.pollIntervalSeconds]);
    const sidebarClass = `${settings.isSidebarMinimized ? "min" : "max"}`;
    const handleToggle = () => settings.setSetting("isSidebarMinimized", !settings.isSidebarMinimized);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "sidebar", className: sidebarClass, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "sidebar-refresh-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "sidebar-refresh-fill", style: { width: `${refreshProgress}%` } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "button-fold-sidebar", role: "button", onClick: handleToggle, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sidebar-refresh-countdown" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "button-unfold-sidebar", role: "button", onClick: handleToggle }),
      settings.displayFollow > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SidebarSection,
        {
          id: "follow",
          title: "즐겨찾기 채널",
          href: "https://www.sooplive.com/my/favorite",
          channels: sidebarStore.followChannels,
          isLoading: sidebarStore.isFollowLoading,
          maxCount: settings.displayFollow,
          children: settings.isFavoriteGroupEnabled && /* @__PURE__ */ jsxRuntimeExports.jsx(FavoriteGroupTabs, {})
        }
      ),
      settings.displayMyplus > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SidebarSection,
        {
          id: "myplus",
          title: "추천 채널",
          href: "https://www.sooplive.com/myplus",
          channels: sidebarStore.myplusChannels,
          isLoading: sidebarStore.isMyplusLoading,
          maxCount: settings.displayMyplus
        }
      ),
      settings.displayTop > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SidebarSection,
        {
          id: "top",
          title: "인기 채널",
          href: "https://www.sooplive.com/live/all",
          channels: sidebarStore.topChannels,
          isLoading: sidebarStore.isTopLoading,
          maxCount: settings.displayTop,
          children: settings.isCategoryGroupEnabled && sidebarStore.pinnedCategories.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryGroupTabs, {})
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipPreview, {})
    ] });
  });
  const BUTTON_DATA = [
    { id: "nav-live", label: "LIVE", href: "https://www.sooplive.com/live/all", onClickTarget: "#live > a" },
    { id: "nav-my", label: "MY", href: "https://www.sooplive.com/my/favorite", onClickTarget: "#my > a" },
    {
      id: "nav-search",
      label: "탐색",
      href: "https://www.sooplive.com/directory/category",
      onClickTarget: "#cate > a"
    },
    { id: "nav-catch", label: "캐치", href: "https://vod.sooplive.com/player/catch", onClickTarget: "#catch > a" }
  ];
  const isMainPage = () => window.location.href.startsWith("https://www.sooplive.com");
  const NavButtons = observer(() => {
    useSettingsStore();
    const handleClick = (e, onClickTarget) => {
      if (isMainPage() && onClickTarget) {
        const targetEl = document.querySelector(onClickTarget);
        if (targetEl) {
          e.preventDefault();
          targetEl.click();
        }
      }
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: [...BUTTON_DATA].reverse().map((btn) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        id: btn.id,
        href: btn.href,
        target: "_self",
        rel: "noreferrer",
        onClick: (e) => handleClick(e, btn.onClickTarget),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "left_nav_button", children: btn.label })
      },
      btn.id
    )) });
  });
  const NavBar = observer(() => {
    const [container, setContainer] = reactExports.useState(null);
    reactExports.useEffect(() => {
      const existing = document.querySelector(".left_navbar");
      if (existing) {
        setContainer(existing);
        return;
      }
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
    return ReactDOM.createPortal(/* @__PURE__ */ jsxRuntimeExports.jsx(NavButtons, {}), container);
  });
  const EXPORT_KEYS = [
    "isCustomSidebarEnabled",
    "isRandomSortEnabled",
    "isFavoriteGroupEnabled",
    "isShortenFavoriteGroupNameEnabled",
    "isCategoryGroupEnabled",
    "isShortenCategoryNameEnabled",
    "isChannelFeedEnabled",
    "isBlockedCategorySortingEnabled",
    "isPinnedStreamWithNotificationEnabled",
    "isPinnedStreamWithPinEnabled",
    "isPinnedOnlineOnlyEnabled",
    "isSmallUserLayoutEnabled",
    "isSendLoadBroadEnabled",
    "isDuplicateRemovalEnabled",
    "isTopDuplicateRemovalEnabled",
    "myplusOrder",
    "isChzzkFollowChannelsEnabled",
    "isChzzkTopChannelsEnabled",
    "displayFollow",
    "displayMyplus",
    "pollIntervalSeconds",
    "displayMyplusvod",
    "displayTop",
    "nicknameWidth",
    "isAlignNicknameRightEnabled",
    "isThemeLockEnabled",
    "isRemoveRedistributionTagEnabled",
    "isRemoveWatchLaterButtonEnabled",
    "isRemoveBroadStartTimeTagEnabled",
    "isReplaceEmptyThumbnailEnabled",
    "isThumbnailTooltipEnabled",
    "isRemoveCarouselEnabled",
    "isBroadTitleTextEllipsisEnabled",
    "isNoAutoVODEnabled",
    "isAutoReloadAfterBroadcastEndEnabled",
    "isHideEsportsInfoEnabled",
    "isShowPauseButtonEnabled",
    "isCaptureButtonEnabled",
    "preferredQuality",
    "isClickPlayerEventMapperEnabled",
    "selectLeftClick",
    "selectRightClick",
    "isShowBufferTimeTitleEnabled",
    "isShowBufferTimeChatEnabled",
    "isSharpmodeShortcutEnabled",
    "isLLShortcutEnabled",
    "isQualityChangeShortcutEnabled",
    "isMutedInactiveTabsEnabled",
    "isAutoChangeQualityEnabled",
    "isDocumentTitleUpdateEnabled",
    "isShowSidebarOnScreenModeAlwaysEnabled",
    "isMouseOverSideBarEnabled",
    "isChatPositionEnabled",
    "isAutoScreenModeEnabled",
    "isClickToMuteEnabled",
    "isSelectBestQualityEnabled",
    "isVODHighlightEnabled",
    "isHideSupporterBadgeEnabled",
    "isHideFanBadgeEnabled",
    "isHideSubBadgeEnabled",
    "isHideVIPBadgeEnabled",
    "isHideMngrBadgeEnabled",
    "isHideStreamerBadgeEnabled",
    "isUnlockCopyPasteEnabled",
    "isHideButtonsAboveChatInputEnabled",
    "isHideChatItemsEnabled"
  ];
  async function compressSettings(data) {
    const encoded = new TextEncoder().encode(JSON.stringify(data));
    const cs = new CompressionStream("deflate-raw");
    const writer = cs.writable.getWriter();
    writer.write(encoded);
    writer.close();
    const chunks = [];
    const reader = cs.readable.getReader();
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
    const bytes = new Uint8Array(chunks.reduce((n2, c) => n2 + c.length, 0));
    let off = 0;
    for (const c of chunks) {
      bytes.set(c, off);
      off += c.length;
    }
    let binary = "";
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }
  async function decompressSettings(b64) {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const ds = new DecompressionStream("deflate-raw");
    const writer = ds.writable.getWriter();
    writer.write(bytes);
    writer.close();
    const chunks = [];
    const reader = ds.readable.getReader();
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
    const combined = new Uint8Array(chunks.reduce((n2, c) => n2 + c.length, 0));
    let off = 0;
    for (const c of chunks) {
      combined.set(c, off);
      off += c.length;
    }
    return JSON.parse(new TextDecoder().decode(combined));
  }
  const SECTIONS = [
    { id: "broadcast-options-title", label: "방송 목록" },
    { id: "sidebar-options-title", label: "사이드바" },
    { id: "live-player-options-title", label: "LIVE 플레이어" },
    { id: "vod-player-options-title", label: "VOD 플레이어" },
    { id: "chat-options-title", label: "채팅창" },
    { id: "etc-options-title", label: "기타" },
    { id: "management-title", label: "차단/부가설명" }
  ];
  const Toggle = ({ checked, onChange, id: id2 }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "switch_v8xK4z", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: id2, type: "checkbox", checked, onChange: (e) => onChange(e.target.checked) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slider_v8xK4z round" })
  ] });
  const BADGE_CONFIG = {
    list: { label: "목록", bg: "rgba(121,134,203,0.18)", color: "#7986cb" },
    sidebar: { label: "사이드바", bg: "rgba(77,182,172,0.18)", color: "#4db6ac" },
    follow: { label: "즐겨찾기", bg: "rgba(249,168,37,0.18)", color: "#f9a825" },
    myplus: { label: "추천채널", bg: "rgba(102,187,106,0.18)", color: "#66bb6a" },
    top: { label: "인기채널", bg: "rgba(239,83,80,0.18)", color: "#ef5350" },
    live: { label: "LIVE", bg: "rgba(229,57,53,0.18)", color: "#ef5350" },
    vod: { label: "VOD", bg: "rgba(103,58,183,0.18)", color: "#9575cd" },
    etc: { label: "기타", bg: "rgba(158,158,158,0.18)", color: "#9e9e9e" },
    player: { label: "플레이어", bg: "rgba(33,150,243,0.18)", color: "#42a5f5" },
    chat: { label: "채팅창", bg: "rgba(0,188,212,0.18)", color: "#26c6da" },
    shortcut: { label: "단축키", bg: "rgba(156,39,176,0.18)", color: "#ce93d8" },
    tab: { label: "탭", bg: "rgba(96,125,139,0.18)", color: "#90a4ae" },
    screen: { label: "스크린", bg: "rgba(25,118,210,0.18)", color: "#64b5f6" },
    nickname: { label: "닉네임", bg: "rgba(233,30,99,0.18)", color: "#f48fb1" }
  };
  const B = ({ k: k2 }) => {
    const c = BADGE_CONFIG[k2];
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        style: {
          display: "inline-block",
          padding: "1px 6px",
          marginRight: 8,
          borderRadius: 3,
          fontSize: "10px",
          fontWeight: 700,
          lineHeight: "16px",
          verticalAlign: "middle",
          background: c.bg,
          color: c.color,
          border: `1px solid ${c.color}55`,
          whiteSpace: "nowrap",
          flexShrink: 0
        },
        children: c.label
      }
    );
  };
  const Opt = ({ id: id2, badge, label, checked, onChange }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "option_v8xK4z", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: id2, children: [
      badge != null && /* @__PURE__ */ jsxRuntimeExports.jsx(B, { k: badge }),
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { checked, onChange, id: id2 })
  ] });
  const SettingModal = observer(() => {
    var _a2;
    const s = useSettingsStore();
    const sb2 = useSidebarStore();
    const [open, setOpen] = reactExports.useState(false);
    const [activeSection, setActiveSection] = reactExports.useState(SECTIONS[0].id);
    const [searchText, setSearchText] = reactExports.useState("");
    const [exportMsg, setExportMsg] = reactExports.useState("");
    const [importMsg, setImportMsg] = reactExports.useState("");
    const bodyRef = reactExports.useRef(null);
    const [triggerContainer, setTriggerContainer] = reactExports.useState(null);
    reactExports.useEffect(() => {
      const containerDiv = document.createElement("div");
      containerDiv.setAttribute("id", "openModalBtn");
      const attach = (serviceUtil) => {
        serviceUtil.prepend(containerDiv);
        setTriggerContainer(containerDiv);
      };
      const existing = document.querySelector("div.serviceUtil");
      if (existing) {
        attach(existing);
      } else {
        const observer2 = new MutationObserver(() => {
          const el2 = document.querySelector("div.serviceUtil");
          if (el2) {
            observer2.disconnect();
            attach(el2);
          }
        });
        observer2.observe(document.body, { childList: true, subtree: true });
        return () => {
          observer2.disconnect();
          containerDiv.remove();
        };
      }
      return () => containerDiv.remove();
    }, []);
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);
    reactExports.useEffect(() => {
      if (!open) return;
      const handler = (e) => {
        if (e.key === "Escape") closeModal();
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [open]);
    reactExports.useEffect(() => {
      if (!open) return;
      const container = bodyRef.current;
      if (!container) return;
      const updateActive = () => {
        let active = SECTIONS[0].id;
        const containerTop = container.getBoundingClientRect().top;
        for (const sec of SECTIONS) {
          const el2 = container.querySelector(`#${sec.id}`);
          if (!el2) continue;
          const relTop = el2.getBoundingClientRect().top - containerTop;
          if (relTop <= 80) {
            active = sec.id;
          }
        }
        setActiveSection(active);
      };
      container.addEventListener("scroll", updateActive, { passive: true });
      return () => container.removeEventListener("scroll", updateActive);
    }, [open]);
    const scrollToSection = (id2) => {
      var _a3;
      setActiveSection(id2);
      const el2 = (_a3 = bodyRef.current) == null ? void 0 : _a3.querySelector(`#${id2}`);
      if (el2) el2.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const version = (typeof GM_info !== "undefined" ? (_a2 = GM_info == null ? void 0 : GM_info.script) == null ? void 0 : _a2.version : "") || "20260524004723";
    const handleExport = async () => {
      const data = {};
      for (const key of EXPORT_KEYS) {
        data[key] = s[key];
      }
      data["pinnedChzzkUsers"] = sb2.pinnedChzzkUsers;
      data["pinnedCategories"] = sb2.pinnedCategories;
      data["blockedUsers"] = sb2.blockedUsers;
      data["blockedCategories"] = sb2.blockedCategories;
      try {
        const compressed = await compressSettings(data);
        await navigator.clipboard.writeText(compressed);
        setExportMsg("복사됨");
        setTimeout(() => setExportMsg(""), 2500);
      } catch {
        setExportMsg("복사 실패");
        setTimeout(() => setExportMsg(""), 3e3);
      }
    };
    const handleImport = async () => {
      try {
        const text = (await navigator.clipboard.readText()).trim();
        if (!text) throw new Error("empty");
        let data;
        try {
          data = await decompressSettings(text);
        } catch {
          data = JSON.parse(text);
        }
        if (typeof data !== "object" || data === null) throw new Error("invalid");
        const SIDEBAR_KEYS = ["pinnedChzzkUsers", "pinnedCategories", "blockedUsers", "blockedCategories"];
        for (const [key, value] of Object.entries(data)) {
          if (EXPORT_KEYS.includes(key)) {
            s.setSetting(key, value);
          } else if (SIDEBAR_KEYS.includes(key)) {
            if (key === "pinnedChzzkUsers") sb2.setPinnedChzzkUsers(value);
            else if (key === "pinnedCategories") sb2.setPinnedCategories(value);
            else if (key === "blockedUsers") sb2.setBlockedUsers(value);
            else if (key === "blockedCategories") sb2.setBlockedCategories(value);
          }
        }
        setImportMsg("적용 완료");
        setTimeout(() => setImportMsg(""), 3e3);
      } catch {
        setImportMsg("올바르지 않은 설정 코드");
        setTimeout(() => setImportMsg(""), 3e3);
      }
    };
    const modal = open ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        id: "myModal",
        className: "modal_v8xK4z",
        style: { display: "block" },
        onClick: (e) => {
          if (e.target === e.currentTarget) closeModal();
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-content_v8xK4z", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "modal-index_v8xK4z", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "index-title_v8xK4z", children: "설정 메뉴" }),
            SECTIONS.map((sec) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: `index-button_v8xK4z${activeSection === sec.id ? " active" : ""}`,
                "data-target-id": sec.id,
                onClick: () => scrollToSection(sec.id),
                children: sec.label
              },
              sec.id
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  marginTop: "auto",
                  padding: "6px 0 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      className: "index-button_v8xK4z",
                      onClick: handleExport,
                      disabled: !!exportMsg,
                      style: {
                        textAlign: "left",
                        color: exportMsg === "복사 실패" ? "#f44336" : exportMsg ? "#4caf50" : void 0
                      },
                      children: exportMsg || "내보내기"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      className: "index-button_v8xK4z",
                      onClick: handleImport,
                      disabled: !!importMsg,
                      style: {
                        textAlign: "left",
                        color: importMsg === "올바르지 않은 설정 코드" ? "#f44336" : importMsg ? "#4caf50" : void 0
                      },
                      children: importMsg || "불러오기"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-version_v8xK4z", children: [
              "SOOP Sidebar UI",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "(",
              version,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-main-content_v8xK4z", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "modal-header_v8xK4z", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-search-container_v8xK4z", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "search-input-wrapper_v8xK4z", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "search-icon_v8xK4z", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fa fa-search" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "modal-search-input_v8xK4z",
                    type: "text",
                    placeholder: "설정 검색...",
                    autoComplete: "off",
                    value: searchText,
                    onChange: (e) => setSearchText(e.target.value)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    id: "modal-search-clear_v8xK4z",
                    title: "검색 비우기",
                    style: { display: searchText ? void 0 : "none" },
                    onClick: () => setSearchText(""),
                    children: "×"
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-button_v8xK4z", "aria-label": "닫기", onClick: closeModal, children: "×" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-body_v8xK4z", ref: bodyRef, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { id: "broadcast-options-title", className: "section-title_v8xK4z", children: "방송 목록 옵션" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "option_v8xK4z multi-option_v8xK4z", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Opt,
                    {
                      id: "switchRemoveRedistributionTag",
                      badge: "list",
                      label: "탐방허용 태그 숨기기",
                      checked: s.isRemoveRedistributionTagEnabled,
                      onChange: (v2) => s.setSetting("isRemoveRedistributionTagEnabled", v2)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Opt,
                    {
                      id: "switchRemoveWatchLaterButton",
                      badge: "list",
                      label: "나중에 보기 버튼 숨기기",
                      checked: s.isRemoveWatchLaterButtonEnabled,
                      onChange: (v2) => s.setSetting("isRemoveWatchLaterButtonEnabled", v2)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Opt,
                    {
                      id: "switchRemoveBroadStartTimeTag",
                      badge: "list",
                      label: "방송 시작 시간 숨기기",
                      checked: s.isRemoveBroadStartTimeTagEnabled,
                      onChange: (v2) => s.setSetting("isRemoveBroadStartTimeTagEnabled", v2)
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchReplaceEmptyThumbnail",
                    badge: "list",
                    label: "마우스 오버 시 연령 제한 썸네일 보기",
                    checked: s.isReplaceEmptyThumbnailEnabled,
                    onChange: (v2) => s.setSetting("isReplaceEmptyThumbnailEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchThumbnailTooltip",
                    badge: "list",
                    label: "마우스 오버 시 썸네일 미리보기 툴팁",
                    checked: s.isThumbnailTooltipEnabled,
                    onChange: (v2) => s.setSetting("isThumbnailTooltipEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchRemoveCarousel",
                    badge: "list",
                    label: "자동 재생되는 채널 전광판 숨기기",
                    checked: s.isRemoveCarouselEnabled,
                    onChange: (v2) => s.setSetting("isRemoveCarouselEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchBroadTitleTextEllipsis",
                    badge: "list",
                    label: "방송 제목이 긴 경우 ...으로 생략하기",
                    checked: s.isBroadTitleTextEllipsisEnabled,
                    onChange: (v2) => s.setSetting("isBroadTitleTextEllipsisEnabled", v2)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divider_v8xK4z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { id: "sidebar-options-title", className: "section-title_v8xK4z", children: "사이드바 옵션" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchCustomSidebar",
                    badge: "sidebar",
                    label: "사이드바 사용 (해제 시 기본 사이드바)",
                    checked: s.isCustomSidebarEnabled,
                    onChange: (v2) => s.setSetting("isCustomSidebarEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "option_v8xK4z range-option_v8xK4z customSidebarOptionsContainer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "favoriteChannelsDisplay", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(B, { k: "follow" }),
                    "즐겨찾기 채널 표시 수"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "range-container_v8xK4z", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "range",
                        id: "favoriteChannelsDisplay",
                        min: 0,
                        max: 100,
                        title: "0 = 숨김",
                        value: s.displayFollow,
                        onChange: (e) => s.setSetting("displayFollow", Number(e.target.value))
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { id: "favoriteChannelsDisplayValue", className: "range-value_v8xK4z", children: s.displayFollow })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "option_v8xK4z range-option_v8xK4z customSidebarOptionsContainer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "myPlusChannelsDisplay", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(B, { k: "myplus" }),
                    "추천 채널 표시 수"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "range-container_v8xK4z", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "range",
                        id: "myPlusChannelsDisplay",
                        min: 0,
                        max: 40,
                        title: "0 = 숨김",
                        value: s.displayMyplus,
                        onChange: (e) => s.setSetting("displayMyplus", Number(e.target.value))
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { id: "myPlusChannelsDisplayValue", className: "range-value_v8xK4z", children: s.displayMyplus })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "option_v8xK4z range-option_v8xK4z customSidebarOptionsContainer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "myPlusVODDisplay", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(B, { k: "myplus" }),
                    "추천 VOD 표시 수"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "range-container_v8xK4z", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "range",
                        id: "myPlusVODDisplay",
                        min: 0,
                        max: 40,
                        title: "0 = 숨김",
                        value: s.displayMyplusvod,
                        onChange: (e) => s.setSetting("displayMyplusvod", Number(e.target.value))
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { id: "myPlusVODDisplayValue", className: "range-value_v8xK4z", children: s.displayMyplusvod })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "option_v8xK4z range-option_v8xK4z customSidebarOptionsContainer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "popularChannelsDisplay", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(B, { k: "top" }),
                    "인기 채널 표시 수"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "range-container_v8xK4z", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "range",
                        id: "popularChannelsDisplay",
                        min: 0,
                        max: 40,
                        title: "0 = 숨김",
                        value: s.displayTop,
                        onChange: (e) => s.setSetting("displayTop", Number(e.target.value))
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { id: "popularChannelsDisplayValue", className: "range-value_v8xK4z", children: s.displayTop })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "option_v8xK4z customSidebarOptionsContainer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "pollIntervalSelect", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(B, { k: "sidebar" }),
                    "새로고침 주기"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mapper-setting_v8xK4z", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "select",
                    {
                      id: "pollIntervalSelect",
                      value: s.pollIntervalSeconds,
                      onChange: (e) => s.setSetting("pollIntervalSeconds", Number(e.target.value)),
                      children: Array.from({ length: 12 }, (_, i) => (i + 1) * 5).map((sec) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: sec, children: [
                        sec,
                        "초"
                      ] }, sec))
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "divider_v8xK4z customSidebarOptionsContainer",
                    style: { marginTop: 15, marginBottom: 15 }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchSmallUserLayout",
                    badge: "sidebar",
                    label: "미니 방송 목록",
                    checked: s.isSmallUserLayoutEnabled,
                    onChange: (v2) => s.setSetting("isSmallUserLayoutEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "sendLoadBroadCheck",
                    badge: "sidebar",
                    label: "새로고침 없는 방송 전환 사용",
                    checked: s.isSendLoadBroadEnabled,
                    onChange: (v2) => s.setSetting("isSendLoadBroadEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchFavoriteGroups",
                    badge: "follow",
                    label: "그룹 탭 표시",
                    checked: s.isFavoriteGroupEnabled,
                    onChange: (v2) => s.setSetting("isFavoriteGroupEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchShortenFavoriteGroupName",
                    badge: "follow",
                    label: "그룹 탭 이름을 한 글자로 축약",
                    checked: s.isShortenFavoriteGroupNameEnabled,
                    onChange: (v2) => s.setSetting("isShortenFavoriteGroupNameEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchRandomSort",
                    badge: "sidebar",
                    label: "랜덤 정렬 (해제 시 시청자 많은 순)",
                    checked: s.isRandomSortEnabled,
                    onChange: (v2) => s.setSetting("isRandomSortEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchChannelFeed",
                    badge: "follow",
                    label: "오프라인 채널의 최신 글 보기",
                    checked: s.isChannelFeedEnabled,
                    onChange: (v2) => s.setSetting("isChannelFeedEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchBlockedCategorySorting",
                    badge: "follow",
                    label: "차단된 카테고리를 하단으로 이동",
                    checked: s.isBlockedCategorySortingEnabled,
                    onChange: (v2) => s.setSetting("isBlockedCategorySortingEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "fixNotificationChannel",
                    badge: "follow",
                    label: "알림 설정된 채널을 상단 고정",
                    checked: s.isPinnedStreamWithNotificationEnabled,
                    onChange: (v2) => s.setSetting("isPinnedStreamWithNotificationEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "fixFixedChannel",
                    badge: "follow",
                    label: "스트리머 관리에서 고정된 채널을 상단 고정",
                    checked: s.isPinnedStreamWithPinEnabled,
                    onChange: (v2) => s.setSetting("isPinnedStreamWithPinEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchPinnedOnlineOnly",
                    badge: "follow",
                    label: "온라인일 때만 상단 고정하기",
                    checked: s.isPinnedOnlineOnlyEnabled,
                    onChange: (v2) => s.setSetting("isPinnedOnlineOnlyEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "mpSortByViewers",
                    badge: "sidebar",
                    label: "정렬을 추천순으로 변경 (해제 시 시청자순)",
                    checked: Boolean(s.myplusOrder),
                    onChange: (v2) => s.setSetting("myplusOrder", v2 ? 1 : 0)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "removeDuplicates",
                    badge: "follow",
                    label: "즐겨찾기 중복 제거",
                    checked: s.isDuplicateRemovalEnabled,
                    onChange: (v2) => s.setSetting("isDuplicateRemovalEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchTopDuplicateRemoval",
                    badge: "top",
                    label: "인기채널 즐겨찾기 중복 제거",
                    checked: s.isTopDuplicateRemovalEnabled,
                    onChange: (v2) => s.setSetting("isTopDuplicateRemovalEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchCategoryGroups",
                    badge: "top",
                    label: "카테고리 탭 표시",
                    checked: s.isCategoryGroupEnabled,
                    onChange: (v2) => s.setSetting("isCategoryGroupEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchShortenCategoryName",
                    badge: "top",
                    label: "카테고리 탭 이름을 한 글자로 축약",
                    checked: s.isShortenCategoryNameEnabled,
                    onChange: (v2) => s.setSetting("isShortenCategoryNameEnabled", v2)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divider_v8xK4z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { id: "live-player-options-title", className: "section-title_v8xK4z", children: "LIVE 플레이어 옵션" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchNoAutoVOD",
                    badge: "live",
                    label: "방송 종료 후 자동 VOD 재생 중지",
                    checked: s.isNoAutoVODEnabled,
                    onChange: (v2) => s.setSetting("isNoAutoVODEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchAutoReloadAfterBroadcastEnd",
                    badge: "live",
                    label: "방종 후 방송 재시작 시 자동 진입",
                    checked: s.isAutoReloadAfterBroadcastEndEnabled,
                    onChange: (v2) => s.setSetting("isAutoReloadAfterBroadcastEndEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchHideEsportsInfo",
                    badge: "live",
                    label: "E-Sports 정보 숨기기",
                    checked: s.isHideEsportsInfoEnabled,
                    onChange: (v2) => s.setSetting("isHideEsportsInfoEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "showPauseButton",
                    badge: "player",
                    label: "일시정지 버튼",
                    checked: s.isShowPauseButtonEnabled,
                    onChange: (v2) => s.setSetting("isShowPauseButtonEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchCaptureButton",
                    badge: "player",
                    label: "LIVE / VOD 스크린샷 버튼",
                    checked: s.isCaptureButtonEnabled,
                    onChange: (v2) => s.setSetting("isCaptureButtonEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchClickToMute",
                    badge: "player",
                    label: "클릭으로 음소거",
                    checked: s.isClickToMuteEnabled,
                    onChange: (v2) => s.setSetting("isClickToMuteEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "option_v8xK4z", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "selectPreferredQuality", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(B, { k: "player" }),
                    "방송 진입 시 화질 고정"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mapper-setting_v8xK4z", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      id: "selectPreferredQuality",
                      value: s.preferredQuality,
                      onChange: (e) => s.setSetting("preferredQuality", e.target.value),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "off", children: "사용 안함" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "max", children: "최대화질" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "1440", children: "1440p" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "1080", children: "1080p" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "720", children: "720p" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "540", children: "540p" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "360", children: "360p" })
                      ]
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "option_v8xK4z", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "switchClickPlayerEventMapper", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(B, { k: "player" }),
                    "클릭/우클릭 기능 매핑"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "mapper-setting_v8xK4z",
                        style: { marginLeft: 0, display: "inline-flex", alignItems: "center", gap: 4 },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "selectLeftClick", children: "좌" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "select",
                            {
                              id: "selectLeftClick",
                              value: s.selectLeftClick,
                              onChange: (e) => s.setSetting("selectLeftClick", e.target.value),
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "none", children: "없음" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "toggleMute", children: "음소거" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "togglePause", children: "일시정지" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "toggleStop", children: "정지" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "toggleScreenMode", children: "스크린모드" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "toggleFullscreen", children: "전체화면" })
                              ]
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "mapper-setting_v8xK4z",
                        style: { marginLeft: 0, display: "inline-flex", alignItems: "center", gap: 4 },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "selectRightClick", children: "우" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "select",
                            {
                              id: "selectRightClick",
                              value: s.selectRightClick,
                              onChange: (e) => s.setSetting("selectRightClick", e.target.value),
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "none", children: "없음" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "toggleMute", children: "음소거" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "togglePause", children: "일시정지" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "toggleStop", children: "정지" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "toggleScreenMode", children: "스크린 모드" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "toggleFullscreen", children: "전체화면" })
                              ]
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Toggle,
                      {
                        checked: s.isClickPlayerEventMapperEnabled,
                        onChange: (v2) => s.setSetting("isClickPlayerEventMapperEnabled", v2),
                        id: "switchClickPlayerEventMapper"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "showBufferTimeChat",
                    badge: "chat",
                    label: "방송 딜레이 표시",
                    checked: s.isShowBufferTimeChatEnabled,
                    onChange: (v2) => s.setSetting("isShowBufferTimeChatEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchSharpmodeShortcut",
                    badge: "shortcut",
                    label: "'선명한 모드'(e) 활성화",
                    checked: s.isSharpmodeShortcutEnabled,
                    onChange: (v2) => s.setSetting("isSharpmodeShortcutEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchLLShortcut",
                    badge: "shortcut",
                    label: "'시차 단축'(d) 활성화",
                    checked: s.isLLShortcutEnabled,
                    onChange: (v2) => s.setSetting("isLLShortcutEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchQualityChangeShortcut",
                    badge: "shortcut",
                    label: "화질 변경(숫자) 활성화",
                    checked: s.isQualityChangeShortcutEnabled,
                    onChange: (v2) => s.setSetting("isQualityChangeShortcutEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "mutedInactiveTabs",
                    badge: "tab",
                    label: "전환 시 음소거",
                    checked: s.isMutedInactiveTabsEnabled,
                    onChange: (v2) => s.setSetting("isMutedInactiveTabsEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchAutoChangeQuality",
                    badge: "tab",
                    label: "전환 시 화질 낮추기",
                    checked: s.isAutoChangeQualityEnabled,
                    onChange: (v2) => s.setSetting("isAutoChangeQualityEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchDocumentTitleUpdate",
                    badge: "tab",
                    label: "제목에 시청자 수 표시",
                    checked: s.isDocumentTitleUpdateEnabled,
                    onChange: (v2) => s.setSetting("isDocumentTitleUpdateEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "showBufferTimeTitle",
                    badge: "tab",
                    label: "제목에 방송 딜레이 표시",
                    checked: s.isShowBufferTimeTitleEnabled,
                    onChange: (v2) => s.setSetting("isShowBufferTimeTitleEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchShowSidebarOnScreenModeAlways",
                    badge: "screen",
                    label: "항상 사이드바 보기",
                    checked: s.isShowSidebarOnScreenModeAlwaysEnabled,
                    onChange: (v2) => s.setSetting("isShowSidebarOnScreenModeAlwaysEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "mouseOverSideBar",
                    badge: "screen",
                    label: "좌상단 마우스 오버 시 사이드바 보기",
                    checked: s.isMouseOverSideBarEnabled,
                    onChange: (v2) => s.setSetting("isMouseOverSideBarEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "chatPosition",
                    badge: "screen",
                    label: "세로로 긴 화면에서 채팅창을 아래에 위치",
                    checked: s.isChatPositionEnabled,
                    onChange: (v2) => s.setSetting("isChatPositionEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchAutoScreenMode",
                    badge: "screen",
                    label: "자동 스크린 모드",
                    checked: s.isAutoScreenModeEnabled,
                    onChange: (v2) => s.setSetting("isAutoScreenModeEnabled", v2)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divider_v8xK4z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { id: "vod-player-options-title", className: "section-title_v8xK4z", children: "VOD 플레이어 옵션" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "selectBestQuality",
                    badge: "vod",
                    label: "최고화질 자동 선택",
                    checked: s.isSelectBestQualityEnabled,
                    onChange: (v2) => s.setSetting("isSelectBestQualityEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchVODHighlight",
                    badge: "vod",
                    label: "VOD 하이라이트(별별랭킹) 타임라인 활성화",
                    checked: s.isVODHighlightEnabled,
                    onChange: (v2) => s.setSetting("isVODHighlightEnabled", v2)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divider_v8xK4z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { id: "chat-options-title", className: "section-title_v8xK4z", children: "채팅창 옵션" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "option_v8xK4z range-option_v8xK4z", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "nicknameWidthDisplay", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(B, { k: "nickname" }),
                    "가로 크기 (채팅 메시지 정렬 시)"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "range-container_v8xK4z", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "range",
                        id: "nicknameWidthDisplay",
                        min: 86,
                        max: 186,
                        value: s.nicknameWidth,
                        onChange: (e) => s.setSetting("nicknameWidth", Number(e.target.value))
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { id: "nicknameWidthDisplayValue", className: "range-value_v8xK4z", children: s.nicknameWidth })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchAlignNicknameRight",
                    badge: "nickname",
                    label: "오른쪽으로 붙이기 (채팅 메시지 정렬 시)",
                    checked: s.isAlignNicknameRightEnabled,
                    onChange: (v2) => s.setSetting("isAlignNicknameRightEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "option_v8xK4z multi-option_v8xK4z", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Opt,
                    {
                      id: "selectHideSupporterBadge",
                      badge: "chat",
                      label: "서포터 배지 숨기기",
                      checked: s.isHideSupporterBadgeEnabled,
                      onChange: (v2) => s.setSetting("isHideSupporterBadgeEnabled", v2)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Opt,
                    {
                      id: "selectHideFanBadge",
                      badge: "chat",
                      label: "팬 배지 숨기기",
                      checked: s.isHideFanBadgeEnabled,
                      onChange: (v2) => s.setSetting("isHideFanBadgeEnabled", v2)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Opt,
                    {
                      id: "selectHideSubBadge",
                      badge: "chat",
                      label: "구독팬 배지 숨기기",
                      checked: s.isHideSubBadgeEnabled,
                      onChange: (v2) => s.setSetting("isHideSubBadgeEnabled", v2)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Opt,
                    {
                      id: "selectHideVIPBadge",
                      badge: "chat",
                      label: "열혈팬 배지 숨기기",
                      checked: s.isHideVIPBadgeEnabled,
                      onChange: (v2) => s.setSetting("isHideVIPBadgeEnabled", v2)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Opt,
                    {
                      id: "selectHideMngrBadge",
                      badge: "chat",
                      label: "매니저 배지 숨기기",
                      checked: s.isHideMngrBadgeEnabled,
                      onChange: (v2) => s.setSetting("isHideMngrBadgeEnabled", v2)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Opt,
                    {
                      id: "selectHideStreamerBadge",
                      badge: "chat",
                      label: "스트리머 배지 숨기기",
                      checked: s.isHideStreamerBadgeEnabled,
                      onChange: (v2) => s.setSetting("isHideStreamerBadgeEnabled", v2)
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchUnlockCopyPaste",
                    badge: "chat",
                    label: "복사/붙여넣기 기능 복원",
                    checked: s.isUnlockCopyPasteEnabled,
                    onChange: (v2) => s.setSetting("isUnlockCopyPasteEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchHideButtonsAboveChatInput",
                    badge: "chat",
                    label: "버튼 탭 숨기기",
                    checked: s.isHideButtonsAboveChatInputEnabled,
                    onChange: (v2) => s.setSetting("isHideButtonsAboveChatInputEnabled", v2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchHideChatItems",
                    badge: "chat",
                    label: "채팅창 메뉴 숨기기",
                    checked: s.isHideChatItemsEnabled,
                    onChange: (v2) => s.setSetting("isHideChatItemsEnabled", v2)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divider_v8xK4z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { id: "etc-options-title", className: "section-title_v8xK4z", children: "기타 옵션" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "option_v8xK4z multi-option_v8xK4z", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Opt,
                    {
                      id: "switchChzzkFollowChannels",
                      badge: "etc",
                      label: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        "치지직 팔로우 채널 통합",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("sup", { children: "4)" })
                      ] }),
                      checked: s.isChzzkFollowChannelsEnabled,
                      onChange: (v2) => s.setSetting("isChzzkFollowChannelsEnabled", v2)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Opt,
                    {
                      id: "switchChzzkTopChannels",
                      badge: "etc",
                      label: "치지직 인기 채널 통합",
                      checked: s.isChzzkTopChannelsEnabled,
                      onChange: (v2) => s.setSetting("isChzzkTopChannelsEnabled", v2)
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Opt,
                  {
                    id: "switchThemeLock",
                    badge: "etc",
                    label: "테마 쿠키 무기한 유지",
                    checked: s.isThemeLockEnabled,
                    onChange: (v2) => s.setSetting("isThemeLockEnabled", v2)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "modal-footer_v8xK4z", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { id: "management-title", className: "section-title_v8xK4z", children: "차단 관리 및 부가 설명" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "description_v8xK4z", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fa fa-ban" }),
                  " 채널 차단: 본문 방송 목록 -> ⋮ 버튼 -> [이 브라우저에서 ... 숨기기]"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "description_v8xK4z", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fa fa-check-circle" }),
                  " 카테고리 탭 추가: 본문 방송 목록 -> ⋮ 버튼 -> [이 카테고리를 탭에 추가]"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "description_v8xK4z", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fa fa-check-circle" }),
                  " 카테고리 탭 해제: Tampermonkey 아이콘을 눌러서 가능합니다."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divider_v8xK4z" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "description_v8xK4z", children: [
                  "1) MY 페이지에서 스트리머 고정 버튼(",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fa fa-thumb-tack" }),
                  ")을 누르면 사이드바에 고정이 됩니다."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "description_v8xK4z", children: "3) 즐겨찾기 채널 중에서만 이동. 커스텀은 고정->알림->일반 순. 열린 탭 체크 후 이동." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "description_v8xK4z", children: "4) 치지직 로그인이 되어있지 않으면 응답지연이 생겨서 느려집니다" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "description_v8xK4z", children: "5) 'SOOP (숲) - 현재 방송을 보고 있는 스트리머' 실행 필요. 없을 시 0명으로 나옵니다" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divider_v8xK4z" })
            ] })
          ] })
        ] })
      }
    ) : null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      ReactDOM.createPortal(modal, document.body),
      triggerContainer && ReactDOM.createPortal(
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-settings-ui", onClick: openModal, title: "사이드바 설정" }),
        triggerContainer
      )
    ] });
  });
  const PreviewModalContent = ({ broadNo, userId, userNick, broadTitle, onClose }) => {
    const thumbnailUrl = `https://liveimg.sooplive.com/m/${broadNo}.jpg`;
    reactExports.useEffect(() => {
      const handler = (e) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [onClose]);
    return ReactDOM.createPortal(
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          id: "previewModal",
          className: "preview-modal-overlay_v8xK4z",
          onClick: (e) => {
            if (e.target === e.currentTarget) onClose();
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "preview-modal-content_v8xK4z", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "preview-modal-close_v8xK4z", onClick: onClose, children: "×" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "preview-modal-thumbnail_v8xK4z", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: thumbnailUrl, alt: broadTitle }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "preview-modal-info_v8xK4z", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "preview-modal-nick_v8xK4z", children: userNick }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "preview-modal-title_v8xK4z", children: broadTitle }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  className: "preview-modal-link_v8xK4z",
                  href: `https://play.sooplive.com/${userId}/${broadNo}`,
                  target: "_blank",
                  rel: "noreferrer",
                  children: "방송 바로가기"
                }
              )
            ] })
          ] })
        }
      ),
      document.body
    );
  };
  const PreviewModal = () => {
    const [modalProps, setModalProps] = reactExports.useState(null);
    reactExports.useEffect(() => {
      return () => {
      };
    }, []);
    if (!modalProps) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewModalContent, { ...modalProps, onClose: () => setModalProps(null) });
  };
  const MainPage = observer(() => {
    const settings = useSettingsStore();
    reactExports.useEffect(() => {
      if (settings.isCustomSidebarEnabled) {
        document.body.classList.add("customSidebar");
      } else {
        document.body.classList.remove("customSidebar");
      }
      return () => document.body.classList.remove("customSidebar");
    }, [settings.isCustomSidebarEnabled]);
    reactExports.useEffect(() => {
      if (!settings.isThemeLockEnabled) return;
      const refreshThemeCookie = () => {
        const entry = document.cookie.split(";").map((c) => c.trim()).find((c) => c.startsWith("theme="));
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
    reactExports.useEffect(() => {
      if (!settings.isRemoveRedistributionTagEnabled) return;
      const style = document.createElement("style");
      style.textContent = `[data-type=cBox] .thumbs-box .allow { display: none !important; }`;
      document.head.appendChild(style);
      return () => style.remove();
    }, [settings.isRemoveRedistributionTagEnabled]);
    reactExports.useEffect(() => {
      if (!settings.isRemoveWatchLaterButtonEnabled) return;
      const style = document.createElement("style");
      style.textContent = `[data-type=cBox] .thumbs-box .later { display: none !important; }`;
      document.head.appendChild(style);
      return () => style.remove();
    }, [settings.isRemoveWatchLaterButtonEnabled]);
    reactExports.useEffect(() => {
      if (!settings.isRemoveBroadStartTimeTagEnabled) return;
      const style = document.createElement("style");
      style.textContent = `[data-type=cBox] .thumbs-box .time { display: none !important; }`;
      document.head.appendChild(style);
      return () => style.remove();
    }, [settings.isRemoveBroadStartTimeTagEnabled]);
    reactExports.useEffect(() => {
      if (!settings.isRemoveCarouselEnabled) return;
      const style = document.createElement("style");
      style.textContent = `div[class^="player_player_wrap"] { display: none !important; }`;
      document.head.appendChild(style);
      return () => style.remove();
    }, [settings.isRemoveCarouselEnabled]);
    reactExports.useEffect(() => {
      if (!settings.isBroadTitleTextEllipsisEnabled) return;
      const style = document.createElement("style");
      style.textContent = `[data-type=cBox] .cBox-info .title a { white-space: nowrap; text-overflow: ellipsis; display: inline-block; overflow: hidden; max-width: 100%; }`;
      document.head.appendChild(style);
      return () => style.remove();
    }, [settings.isBroadTitleTextEllipsisEnabled]);
    reactExports.useEffect(() => {
      if (!settings.isSendLoadBroadEnabled) return;
      const handleClick = (e) => {
        if (e.ctrlKey || e.metaKey || e.shiftKey) return;
        const inCBox = e.target.closest('[data-type="cBox"]');
        if (!inCBox) return;
        const anchor = e.target.closest('a[href*="play.sooplive.com/"]');
        if (!anchor) return;
        e.preventDefault();
        e.stopPropagation();
        window.location.href = anchor.href;
      };
      document.addEventListener("click", handleClick, true);
      return () => document.removeEventListener("click", handleClick, true);
    }, [settings.isSendLoadBroadEnabled]);
    reactExports.useEffect(() => {
      if (!settings.isReplaceEmptyThumbnailEnabled) return;
      const _uw2 = (() => {
        try {
          return unsafeWindow;
        } catch {
          return window;
        }
      })();
      if (!document.querySelector("script[data-hls-loader]")) {
        const hlsScript = document.createElement("script");
        hlsScript.src = "https://cdn.jsdelivr.net/npm/hls.js@latest";
        hlsScript.dataset.hlsLoader = "1";
        document.head.appendChild(hlsScript);
      }
      const getBroadM3u8Domain2 = async (broadNumber) => {
        const params = new URLSearchParams({
          return_type: "gs_cdn_pc_web",
          use_cors: "true",
          cors_origin_url: "play.sooplive.com",
          broad_key: `${broadNumber}-common-master-hls`,
          player_mode: "landing",
          time: "0"
        });
        try {
          const res = await fetch(`https://livestream-manager.sooplive.com/broad_stream_assign.html?${params}`, {
            credentials: "include",
            cache: "no-store"
          });
          if (!res.ok) return null;
          const data = await res.json();
          return data.result === "1" && data.view_url ? data.view_url : null;
        } catch {
          return null;
        }
      };
      const getBroadAid2 = async (id2, broadNumber) => {
        var _a2;
        const payload = new URLSearchParams({
          bid: id2,
          bno: broadNumber,
          from_api: "0",
          mode: "landing",
          player_type: "html5",
          stream_type: "common",
          quality: "sd",
          type: "aid",
          pwd: ""
        });
        try {
          const res = await fetch("https://live.sooplive.com/afreeca/player_live_api.php", {
            method: "POST",
            body: payload,
            credentials: "include",
            cache: "no-store"
          });
          const data = await res.json();
          return ((_a2 = data == null ? void 0 : data.CHANNEL) == null ? void 0 : _a2.AID) ?? null;
        } catch {
          return null;
        }
      };
      const captureFrame = (video) => new Promise((resolve) => {
        const canvas = document.createElement("canvas");
        canvas.width = 480;
        canvas.height = 270;
        const ctx = canvas.getContext("2d");
        const vr = video.videoWidth / video.videoHeight;
        const cr = 480 / 270;
        let dw = 480, dh2 = 270, ox = 0, oy = 0;
        if (vr > cr) {
          dh2 = 480 / vr;
          oy = (270 - dh2) / 2;
        } else {
          dw = 270 * vr;
          ox = (480 - dw) / 2;
        }
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 480, 270);
        ctx.drawImage(video, ox, oy, dw, dh2);
        resolve(canvas.toDataURL("image/webp"));
      });
      const loadFrame = async (id2, broadNumber) => {
        const Hls = _uw2.Hls;
        if (!(Hls == null ? void 0 : Hls.isSupported())) return null;
        const [aid, baseUrl] = await Promise.all([getBroadAid2(id2, broadNumber), getBroadM3u8Domain2(broadNumber)]);
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
            { once: true }
          );
          setTimeout(() => {
            hls.destroy();
            resolve(null);
          }, 15e3);
        });
      };
      const bindLink = (link) => {
        if (link.dataset.adultThumbBound === "true") return;
        const img = link.querySelector("img");
        if (!img) return;
        link.dataset.adultThumbBound = "true";
        let intervalId = null;
        const load = async () => {
          if (link.dataset.loading === "true") return;
          const m2 = (link.getAttribute("href") ?? "").match(/play\.sooplive\.com\/([^/]+)\/(\d+)/);
          if (!m2) return;
          const [, id2, broadNo] = m2;
          link.dataset.loading = "true";
          if (!link.dataset.imageLoaded) {
            img.style.filter = "grayscale(100%)";
            img.style.transition = "filter 0.5s ease";
          }
          const frame = await loadFrame(id2, broadNo);
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
          const expired = Date.now() - parseInt(link.dataset.lastLoadedTime ?? "0", 10) > 3e4;
          if (!link.dataset.imageLoaded || expired) load();
          intervalId = setInterval(load, 3e4);
        });
        link.addEventListener("mouseleave", () => {
          if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
          }
        });
      };
      const scanAndBind = () => {
        document.querySelectorAll("[data-type=cBox] .thumbs-box .status.adult").forEach((el2) => {
          const link = el2.closest(".thumbs-box a[href]");
          if (link && !link.href.startsWith("https://vod.sooplive.com")) bindLink(link);
        });
      };
      scanAndBind();
      const obs = new MutationObserver(scanAndBind);
      obs.observe(document.body, { childList: true, subtree: true });
      return () => obs.disconnect();
    }, [settings.isReplaceEmptyThumbnailEnabled]);
    const [sidebarContainer, setSidebarContainer] = React$1.useState(null);
    reactExports.useEffect(() => {
      const container = document.createElement("div");
      document.body.appendChild(container);
      setSidebarContainer(container);
      waitForElementAsync("#soop-gnb", 3e3).then((gnb) => {
        if (gnb) gnb.insertAdjacentElement("afterend", container);
      });
      return () => container.remove();
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavBar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingModal, {}),
      settings.isCustomSidebarEnabled && sidebarContainer && ReactDOM.createPortal(/* @__PURE__ */ jsxRuntimeExports.jsx(SidebarView, {}), sidebarContainer),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewModal, {})
    ] });
  });
  function getOrCreateContainer(id2, parent) {
    let el2 = document.getElementById(id2);
    if (!el2) {
      el2 = document.createElement("div");
      el2.id = id2;
      parent.appendChild(el2);
    }
    return el2;
  }
  const PlayerControls = observer(() => {
    const settings = useSettingsStore();
    const videoRef = reactExports.useRef(null);
    const getVideo = () => {
      if (!videoRef.current) {
        videoRef.current = document.querySelector("video");
      }
      return videoRef.current;
    };
    const handlePause = reactExports.useCallback(() => {
      const video = getVideo();
      if (!video) return;
      if (video.paused) {
        video.play().catch(() => void 0);
      } else {
        video.pause();
      }
    }, []);
    const handleCapture = reactExports.useCallback(() => {
      const video = getVideo();
      if (!video) return;
      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(video, 0, 0);
        const link = document.createElement("a");
        link.download = `capture_${Date.now()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      } catch (e) {
        console.error("캡처 실패", e);
      }
    }, []);
    const controlBar = document.querySelector(".player_v8xK4z-control-bar") ?? document.querySelector('[class*="control-bar"]') ?? document.querySelector('[class*="controlBar"]');
    if (!controlBar) return null;
    const container = getOrCreateContainer(
      "custom-player-controls",
      controlBar
    );
    return ReactDOM.createPortal(
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "custom-controls-wrapper_v8xK4z", children: [
        settings.isShowPauseButtonEnabled && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "custom-ctrl-btn_v8xK4z pause-btn_v8xK4z",
            onClick: handlePause,
            title: "일시정지",
            children: "⏸"
          }
        ),
        settings.isCaptureButtonEnabled && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "custom-ctrl-btn_v8xK4z capture-btn_v8xK4z",
            onClick: handleCapture,
            title: "캡처",
            children: "📷"
          }
        )
      ] }),
      container
    );
  });
  const _uw = (() => {
    try {
      return unsafeWindow;
    } catch {
      return window;
    }
  })();
  const QUALITY_MAP = {
    sd: "LOW",
    hd: "NORMAL",
    hd4k: "HIGH_4000",
    hd8k: "HIGH_8000",
    original: "ORIGINAL",
    auto: "AUTO"
  };
  function waitForLivePlayer(timeout = 1e4) {
    return new Promise((resolve, reject) => {
      const interval = 1500;
      let elapsed = 0;
      const check = () => {
        const lp = (_uw == null ? void 0 : _uw.livePlayer) ?? window.livePlayer;
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
  function addStyle(css) {
    if (typeof GM_addStyle !== "undefined") {
      GM_addStyle(css);
    } else {
      const style = document.createElement("style");
      style.textContent = css;
      document.head.appendChild(style);
    }
  }
  const PlayerPage = observer(() => {
    const settings = useSettingsStore();
    reactExports.useRef(0);
    reactExports.useRef("");
    const latestBufferTimeRef = reactExports.useRef("");
    const latestViewerSuffixRef = reactExports.useRef("");
    const qualityChangeTimerRef = reactExports.useRef(null);
    const prevQualityRef = reactExports.useRef(null);
    const updateTitleRef = reactExports.useRef(null);
    const prevIsAutoModeRef = reactExports.useRef(null);
    const didChangedToLowestRef = reactExports.useRef(false);
    reactExports.useEffect(() => {
      if (!settings.isThemeLockEnabled) return;
      const refreshThemeCookie = () => {
        const entry = document.cookie.split(";").map((c) => c.trim()).find((c) => c.startsWith("theme="));
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
    reactExports.useEffect(() => {
      const cssRules = [];
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
      settings.isHideStreamerBadgeEnabled
    ]);
    reactExports.useEffect(() => {
      if (!settings.isHideButtonsAboveChatInputEnabled) return;
      addStyle(`
            .chatbox .actionbox .chat_item_list { display: none !important; }
            .chatbox .actionbox { height: auto !important; }
        `);
    }, [settings.isHideButtonsAboveChatInputEnabled]);
    reactExports.useEffect(() => {
      if (!settings.isHideChatItemsEnabled) return;
      const style = document.createElement("style");
      style.textContent = `
            .chatbox .actionbox .chat_item_list { display: none !important; }
            .chatbox .actionbox { height: auto !important; }
        `;
      document.head.appendChild(style);
      return () => style.remove();
    }, [settings.isHideChatItemsEnabled]);
    reactExports.useEffect(() => {
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
    reactExports.useEffect(() => {
      if (!settings.isAlignNicknameRightEnabled) return;
      addStyle(`
            .starting-line .chatting-list-item .message-container .username > button {
                float: right !important;
                white-space: nowrap;
            }
        `);
    }, [settings.isAlignNicknameRightEnabled]);
    reactExports.useEffect(() => {
      if (!settings.isChatPositionEnabled) return;
      document.body.classList.add("chat-position-changed");
      return () => document.body.classList.remove("chat-position-changed");
    }, [settings.isChatPositionEnabled]);
    reactExports.useEffect(() => {
      if (!settings.isMutedInactiveTabsEnabled) return;
      const isInPiP = () => {
        const v2 = document.querySelector("video");
        return v2 ? document.pictureInPictureElement === v2 : false;
      };
      const handler = () => {
        if (isInPiP()) return;
        const btn = document.querySelector("#btn_sound");
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
    reactExports.useEffect(() => {
      if (!settings.isAutoChangeQualityEnabled) return;
      const isInPiP = () => {
        const v2 = document.querySelector("video");
        return v2 ? document.pictureInPictureElement === v2 : false;
      };
      const getCurrentQuality = () => {
        var _a2, _b2;
        try {
          return ((_b2 = (_a2 = _uw.LivePlayer) == null ? void 0 : _a2.getPlayerInfo()) == null ? void 0 : _b2.quality) ?? null;
        } catch {
          return null;
        }
      };
      const getIsAutoMode = () => {
        var _a2, _b2, _c;
        try {
          return !!((_c = (_b2 = (_a2 = _uw.LivePlayer) == null ? void 0 : _a2.getPlayerInfo()) == null ? void 0 : _b2.qualityInfo) == null ? void 0 : _c.isAuto);
        } catch {
          return false;
        }
      };
      const changeQuality = (name) => {
        var _a2;
        try {
          (_a2 = _uw.livePlayer) == null ? void 0 : _a2.changeQuality(name);
        } catch {
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
    reactExports.useEffect(() => {
      const showPlayerBar = (target) => {
        const player = document.getElementById("player");
        if (!player) return;
        player.classList.add("mouseover");
        const btn = player.querySelector(
          target === "quality_box" ? "button.btn_quality_mode" : "button.btn_setting"
        );
        const boxOn = player.querySelector(target === "quality_box" ? ".quality_box.on" : ".setting_box.on");
        if (btn && !boxOn) btn.click();
        setTimeout(() => {
          const openBox = player.querySelector(".quality_box.on, .setting_box.on");
          if (openBox) openBox.classList.remove("on");
          player.classList.remove("mouseover");
        }, 1500);
      };
      const handler = (e) => {
        if (isUserTyping()) return;
        if (e.code === "KeyE" && settings.isSharpmodeShortcutEnabled) {
          e.stopPropagation();
          const el2 = document.getElementById("clear_screen");
          if (el2) {
            el2.click();
            showPlayerBar("quality_box");
          }
        }
        if (e.code === "KeyD" && settings.isLLShortcutEnabled) {
          e.stopPropagation();
          const el2 = document.getElementById("delay_check");
          if (el2) {
            el2.click();
            showPlayerBar("setting_box");
          }
        }
      };
      document.addEventListener("keydown", handler, true);
      return () => document.removeEventListener("keydown", handler, true);
    }, [settings.isSharpmodeShortcutEnabled, settings.isLLShortcutEnabled]);
    reactExports.useEffect(() => {
      if (!settings.isQualityChangeShortcutEnabled) return;
      let shortcutMap = /* @__PURE__ */ new Map();
      const setupShortcuts = async () => {
        var _a2;
        try {
          const livePlayer = await waitForLivePlayer();
          const info = await livePlayer.getLiveInfo();
          const presets = ((_a2 = info == null ? void 0 : info.CHANNEL) == null ? void 0 : _a2.VIEWPRESET) ?? [];
          if (!presets.length) return;
          presets.sort((a, b) => {
            if (a.name === "auto") return -1;
            if (b.name === "auto") return 1;
            return parseInt(b.label_resolution ?? 0) - parseInt(a.label_resolution ?? 0);
          });
          const keys = ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
          const newMap = /* @__PURE__ */ new Map();
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
      const keyHandler = (e) => {
        var _a2;
        if (isUserTyping()) return;
        const key = e.key === "~" ? "`" : e.key;
        if (shortcutMap.has(key)) {
          e.preventDefault();
          try {
            (_a2 = _uw.livePlayer) == null ? void 0 : _a2.changeQuality(shortcutMap.get(key));
          } catch {
          }
        }
      };
      setupShortcuts();
      document.addEventListener("keydown", keyHandler, true);
      return () => document.removeEventListener("keydown", keyHandler, true);
    }, [settings.isQualityChangeShortcutEnabled]);
    reactExports.useEffect(() => {
      const enabled = settings.isDocumentTitleUpdateEnabled || settings.isShowBufferTimeTitleEnabled;
      if (!enabled) {
        document.title = document.title.split(" ")[0];
        return;
      }
      const updateTitle = () => {
        const baseTitle = document.title.split(" ")[0];
        if (settings.isDocumentTitleUpdateEnabled) {
          const viewersEl = document.querySelector("#nAllViewer");
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
      const t2 = setInterval(updateTitle, 6e4);
      return () => {
        clearInterval(t2);
        updateTitleRef.current = null;
        document.title = document.title.split(" ")[0];
      };
    }, [settings.isDocumentTitleUpdateEnabled, settings.isShowBufferTimeTitleEnabled]);
    reactExports.useEffect(() => {
      if (!settings.isShowBufferTimeTitleEnabled && !settings.isShowBufferTimeChatEnabled) return;
      let videoEl = null;
      waitForElementAsync("#livePlayer").then((el2) => {
        if (!el2) return;
        videoEl = el2;
        videoEl.onprogress = () => {
          var _a2;
          const { buffered, currentTime } = videoEl;
          let remaining = "";
          if (buffered.length > 0) {
            const diff = buffered.end(buffered.length - 1) - currentTime;
            if (diff >= 0) remaining = diff.toFixed(diff % 1 === 0 ? 0 : 1);
          }
          latestBufferTimeRef.current = remaining;
          if (settings.isShowBufferTimeTitleEnabled) {
            (_a2 = updateTitleRef.current) == null ? void 0 : _a2.call(updateTitleRef);
          }
          if (settings.isShowBufferTimeChatEnabled) {
            const emptyChat = document.querySelector("#empty_chat");
            if (emptyChat && remaining) emptyChat.innerText = `${remaining}s 지연됨`;
            document.querySelectorAll("[id='broadState']").forEach((el22) => {
              const timeLi = el22.closest("li");
              if (!timeLi) return;
              let bufLi = timeLi.nextElementSibling;
              if (!(bufLi == null ? void 0 : bufLi.classList.contains("broadStateBuffer"))) {
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
        const emptyChat = document.querySelector("#empty_chat");
        if (emptyChat) emptyChat.innerText = "";
        document.querySelectorAll(".broadStateBuffer").forEach((el2) => el2.remove());
      };
    }, [settings.isShowBufferTimeTitleEnabled, settings.isShowBufferTimeChatEnabled]);
    reactExports.useEffect(() => {
      if (!settings.preferredQuality || settings.preferredQuality === "off") return;
      const selectQuality = async () => {
        var _a2;
        try {
          const livePlayer = await waitForLivePlayer();
          const info = await livePlayer.getLiveInfo();
          const presets = (((_a2 = info == null ? void 0 : info.CHANNEL) == null ? void 0 : _a2.VIEWPRESET) ?? []).filter((p2) => p2.name !== "auto" && p2.bps);
          if (!presets.length) {
            customLog.warn("화질 정보를 찾을 수 없습니다.");
            return;
          }
          presets.sort((a, b) => parseInt(b.label_resolution ?? 0) - parseInt(a.label_resolution ?? 0));
          let target;
          if (settings.preferredQuality === "max") {
            target = presets[0];
          } else {
            const targetRes = parseInt(settings.preferredQuality);
            target = presets.find((p2) => parseInt(p2.label_resolution ?? 0) === targetRes);
            if (!target) {
              const lower = presets.filter((p2) => parseInt(p2.label_resolution ?? 0) <= targetRes);
              target = lower.length > 0 ? lower[0] : presets[presets.length - 1];
            }
          }
          const internalType = QUALITY_MAP[target.name];
          if (!internalType) return;
          customLog.log(`[선호 화질] ${target.label}(${internalType})로 변경`);
          livePlayer.changeQuality(internalType);
        } catch (e) {
          customLog.error("선호 화질 설정 실패:", e.message);
        }
      };
      selectQuality();
      const unsub = observeUrlChanges(() => setTimeout(selectQuality, 4e3));
      return unsub;
    }, [settings.preferredQuality]);
    reactExports.useEffect(() => {
      if (!settings.isClickPlayerEventMapperEnabled) return;
      const userClickConfig = {
        click: settings.selectLeftClick,
        contextmenu: settings.selectRightClick
      };
      const displayCenterVolume = (isMuted, volume) => {
        const textEl = document.querySelector(".volume_text");
        const centerBtn = document.querySelector(".center_btn");
        const iconEl = document.querySelector(".volume_icon");
        if (!textEl || !centerBtn || !iconEl) return;
        const v2 = isMuted ? 0 : volume;
        const cls = isMuted ? "mute" : volume < 0.5 ? "low" : "";
        textEl.textContent = `${Math.round(100 * v2)}%`;
        textEl.classList.remove("hide_text");
        centerBtn.classList.remove("fadeOut");
        centerBtn.querySelectorAll("div, button").forEach((el2) => {
          if (!el2.classList.contains("volume_icon")) el2.style.display = "none";
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
        const selectors = {
          mute: "#btn_sound",
          pause: pauseSelector,
          stop: "#play",
          screenMode: ".btn_screen_mode",
          fullscreen: ".btn_fullScreen_mode"
        };
        const buttons = {};
        await Promise.all(
          Object.entries(selectors).map(async ([k2, sel]) => {
            buttons[k2] = await waitForElementAsync(sel);
          })
        );
        const vid = video;
        const actions = {
          none: () => {
          },
          toggleMute: () => {
            var _a2;
            (_a2 = buttons.mute) == null ? void 0 : _a2.click();
            setTimeout(() => displayCenterVolume(vid.muted, vid.volume), 50);
          },
          togglePause: () => {
            if (!buttons.pause) return;
            if (window.getComputedStyle(buttons.pause).display === "none") return;
            buttons.pause.click();
          },
          toggleStop: () => {
            var _a2;
            return (_a2 = buttons.stop) == null ? void 0 : _a2.click();
          },
          toggleScreenMode: () => {
            var _a2;
            return (_a2 = buttons.screenMode) == null ? void 0 : _a2.click();
          },
          toggleFullscreen: () => {
            var _a2;
            return (_a2 = buttons.fullscreen) == null ? void 0 : _a2.click();
          }
        };
        Object.entries(userClickConfig).forEach(([eventType, actionName]) => {
          if (!actionName || actionName === "none") return;
          player.addEventListener(eventType, (e) => {
            var _a2;
            if (e.target.closest(".player_ctrlBox")) return;
            e.preventDefault();
            (_a2 = actions[actionName]) == null ? void 0 : _a2.call(actions);
          });
        });
        customLog.log("[EventMapper] 초기화 완료");
      };
      initMapper();
    }, [settings.isClickPlayerEventMapperEnabled, settings.selectLeftClick, settings.selectRightClick]);
    reactExports.useEffect(() => {
      if (!settings.isMouseOverSideBarEnabled || !settings.isCustomSidebarEnabled) return;
      const webplayer = document.getElementById("webplayer");
      if (webplayer) {
        webplayer.style.left = "0px";
        webplayer.style.width = "100vw";
      }
      const mouseMoveHandler = (e) => {
        const body = document.body;
        const sidebar = document.getElementById("sidebar");
        const wp = document.getElementById("webplayer");
        const videoLayer = document.getElementById("player");
        if (!sidebar || !wp) return;
        const { clientX: mouseX, clientY: mouseY } = e;
        if (!body.classList.contains("showSidebar")) {
          const triggerHeight = Math.min(
            ((videoLayer == null ? void 0 : videoLayer.clientHeight) ?? window.innerHeight) / 2,
            window.innerHeight / 4
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
      const mouseOutHandler = (e) => {
        if (!e.relatedTarget && !e.toElement) {
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
    reactExports.useEffect(() => {
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
      const observer2 = new MutationObserver(handleClassChange);
      observer2.observe(document.body, { attributes: true, attributeFilter: ["class"] });
      document.addEventListener("visibilitychange", handleClassChange);
      handleClassChange();
      return () => {
        observer2.disconnect();
        document.removeEventListener("visibilitychange", handleClassChange);
      };
    }, [settings.isShowSidebarOnScreenModeAlwaysEnabled, settings.isCustomSidebarEnabled]);
    reactExports.useEffect(() => {
      if (!settings.isAutoScreenModeEnabled) return;
      waitForElementAsync("#livePlayer").then(() => {
        var _a2;
        if (!document.body.classList.contains("screen_mode")) {
          (_a2 = document.querySelector("#player .btn_screen_mode")) == null ? void 0 : _a2.click();
        }
      });
    }, [settings.isAutoScreenModeEnabled]);
    reactExports.useEffect(() => {
      if (!settings.isUnlockCopyPasteEnabled) return;
      let writeArea = null;
      const handleCopy = (e) => {
        var _a2, _b2;
        e.preventDefault();
        const text = (_a2 = window.getSelection()) == null ? void 0 : _a2.toString();
        if (text) (_b2 = e.clipboardData) == null ? void 0 : _b2.setData("text/plain", text);
      };
      const handleCut = (e) => {
        var _a2, _b2;
        e.preventDefault();
        const text = (_a2 = window.getSelection()) == null ? void 0 : _a2.toString();
        if (text) {
          (_b2 = e.clipboardData) == null ? void 0 : _b2.setData("text/plain", text);
          document.execCommand("delete");
        }
      };
      const handlePaste = (e) => {
        var _a2;
        e.preventDefault();
        const text = ((_a2 = e.clipboardData ?? window.clipboardData) == null ? void 0 : _a2.getData("text")) ?? "";
        document.execCommand("insertText", false, text);
      };
      waitForElementAsync("#write_area").then((el2) => {
        if (!el2) return;
        writeArea = el2;
        el2.addEventListener("copy", handleCopy);
        el2.addEventListener("cut", handleCut);
        el2.addEventListener("paste", handlePaste);
      });
      return () => {
        if (writeArea) {
          writeArea.removeEventListener("copy", handleCopy);
          writeArea.removeEventListener("cut", handleCut);
          writeArea.removeEventListener("paste", handlePaste);
        }
      };
    }, [settings.isUnlockCopyPasteEnabled]);
    reactExports.useEffect(() => {
      if (!settings.isAutoReloadAfterBroadcastEndEnabled) return;
      const intl = new Intl.DateTimeFormat("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      });
      const pollForRestart = async (signal) => {
        var _a2;
        const bjid = location.pathname.split("/")[1];
        if (!bjid || signal.aborted) return;
        const titleEl = await new Promise((resolve) => {
          const existing = document.querySelector(".notBroadingInfoTitle");
          if (existing) {
            resolve(existing);
            return;
          }
          const observer2 = new MutationObserver(() => {
            const target = document.querySelector(".notBroadingInfoTitle");
            if (target) {
              observer2.disconnect();
              signal.removeEventListener("abort", onAbort);
              resolve(target);
            }
          });
          const onAbort = () => {
            observer2.disconnect();
            resolve(null);
          };
          signal.addEventListener("abort", onAbort, { once: true });
          observer2.observe(document.body, { childList: true, subtree: true });
        });
        if (!titleEl || signal.aborted) return;
        let bno;
        do {
          if (signal.aborted) return;
          await sleep(1e3);
          if (signal.aborted) return;
          try {
            const res = await fetch("https://live.sooplive.com/afreeca/player_live_api.php", {
              headers: { "content-type": "application/x-www-form-urlencoded" },
              body: `bid=${bjid}&bno=null&type=live&pwd=&player_type=html5&stream_type=common&quality=HD&mode=landing&from_api=0&is_revive=false`,
              method: "POST",
              mode: "cors",
              credentials: "include",
              signal
            });
            const data = await res.json();
            bno = (_a2 = data == null ? void 0 : data.CHANNEL) == null ? void 0 : _a2.BNO;
          } catch {
            if (signal.aborted) return;
          }
          const el2 = document.querySelector(".notBroadingInfoTitle");
          if (el2) el2.textContent = `방송 시작을 기다리는 중이에요 (${intl.format(/* @__PURE__ */ new Date())})`;
        } while (!bno || bno <= 0);
        if (signal.aborted) return;
        const parts = location.pathname.split("/");
        const currentBno = parts[parts.length - 1];
        if (String(bno) !== currentBno) {
          location.pathname = `/${bjid}/${bno}`;
        }
      };
      let ac2 = new AbortController();
      pollForRestart(ac2.signal);
      const stopUrlObserver = observeUrlChanges(() => {
        ac2.abort();
        ac2 = new AbortController();
        pollForRestart(ac2.signal);
      });
      return () => {
        ac2.abort();
        stopUrlObserver();
      };
    }, [settings.isAutoReloadAfterBroadcastEndEnabled]);
    reactExports.useEffect(() => {
      if (!settings.isNoAutoVODEnabled) return;
      const disableAutoVOD = () => {
        var _a2;
        const lv = _uw.liveView ?? window.liveView;
        const container = (_a2 = lv == null ? void 0 : lv.aContainer) == null ? void 0 : _a2[1];
        if (!(container == null ? void 0 : container.autoPlayVodBanner)) {
          setTimeout(disableAutoVOD, 3e3);
          return;
        }
        container.autoPlayVodBanner.show = () => {
        };
      };
      disableAutoVOD();
    }, [settings.isNoAutoVODEnabled]);
    reactExports.useEffect(() => {
      if (!settings.isSendLoadBroadEnabled) return;
      const handleClick = (e) => {
        var _a2;
        if (e.ctrlKey || e.metaKey) return;
        const inCBox = e.target.closest('[data-type="cBox"]');
        if (!inCBox) return;
        const anchor = e.target.closest('a[href*="play.sooplive.com/"]');
        if (!anchor) return;
        const match = anchor.href.match(/play\.sooplive\.com\/([^/?#]+)\/(\d+)/);
        if (!match) return;
        const [, user_id, broad_no] = match;
        const lv = _uw.liveView ?? window.liveView;
        if (!((_a2 = lv == null ? void 0 : lv.playerController) == null ? void 0 : _a2.sendLoadBroad)) return;
        e.preventDefault();
        e.stopPropagation();
        lv.playerController.sendLoadBroad(user_id, broad_no);
      };
      document.addEventListener("click", handleClick, true);
      return () => document.removeEventListener("click", handleClick, true);
    }, [settings.isSendLoadBroadEnabled]);
    const [sidebarTarget, setSidebarTarget] = React$1.useState(null);
    const [screenChatVisible, setScreenChatVisible] = React$1.useState(false);
    const [screenChatUrl, setScreenChatUrl] = React$1.useState(null);
    const screenChatVisibleRef = reactExports.useRef(false);
    reactExports.useEffect(() => {
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
    reactExports.useEffect(() => {
      if (!settings.isCustomSidebarEnabled) return;
      const CHAT_WIDTH = 360;
      const TRIGGER = 52;
      const handleMouseMove = (e) => {
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
    reactExports.useEffect(() => {
      const container = document.createElement("div");
      document.body.appendChild(container);
      setSidebarTarget(container);
      return () => {
        container.remove();
      };
    }, []);
    reactExports.useEffect(() => {
      if (settings.isCustomSidebarEnabled) {
        document.body.classList.add("customSidebar");
      } else {
        document.body.classList.remove("customSidebar");
      }
      return () => document.body.classList.remove("customSidebar");
    }, [settings.isCustomSidebarEnabled]);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      settings.isCustomSidebarEnabled && sidebarTarget && ReactDOM.createPortal(/* @__PURE__ */ jsxRuntimeExports.jsx(SidebarView, {}), sidebarTarget),
      settings.isCustomSidebarEnabled && screenChatVisible && screenChatUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "screen-chat-panel", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "iframe",
        {
          src: screenChatUrl,
          title: "채팅 미리보기",
          sandbox: "allow-scripts allow-same-origin allow-forms"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavBar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingModal, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PlayerControls, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewModal, {})
    ] });
  });
  const DraggableResizableModal = ({ items, onSeek, onClose }) => {
    const [pos, setPos] = reactExports.useState({ x: 80, y: 80 });
    const [size, setSize] = reactExports.useState({ w: 280, h: 320 });
    const dragging = reactExports.useRef(false);
    const dragStart = reactExports.useRef({ mx: 0, my: 0, px: 0, py: 0 });
    const resizing = reactExports.useRef(false);
    const resizeStart = reactExports.useRef({ mx: 0, my: 0, w: 0, h: 0 });
    const handleMouseDown = (e) => {
      if (e.target.classList.contains("resize-handle_v8xK4z")) {
        return;
      }
      e.preventDefault();
      dragging.current = true;
      dragStart.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };
      const onMove = (ev) => {
        if (!dragging.current) return;
        setPos({
          x: dragStart.current.px + ev.clientX - dragStart.current.mx,
          y: dragStart.current.py + ev.clientY - dragStart.current.my
        });
      };
      const onUp = () => {
        dragging.current = false;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    };
    const handleResizeDown = (e) => {
      e.preventDefault();
      e.stopPropagation();
      resizing.current = true;
      resizeStart.current = { mx: e.clientX, my: e.clientY, w: size.w, h: size.h };
      const onMove = (ev) => {
        if (!resizing.current) return;
        setSize({
          w: Math.max(180, resizeStart.current.w + ev.clientX - resizeStart.current.mx),
          h: Math.max(120, resizeStart.current.h + ev.clientY - resizeStart.current.my)
        });
      };
      const onUp = () => {
        resizing.current = false;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    };
    const formatTime = (secs) => {
      const h = Math.floor(secs / 3600);
      const m2 = Math.floor(secs % 3600 / 60);
      const s = Math.floor(secs % 60);
      if (h > 0) return `${h}:${String(m2).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
      return `${m2}:${String(s).padStart(2, "0")}`;
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "draggable-modal_v8xK4z",
        style: {
          position: "fixed",
          left: pos.x,
          top: pos.y,
          width: size.w,
          height: size.h,
          zIndex: 99999,
          overflow: "hidden",
          cursor: "grab",
          userSelect: "none"
        },
        onMouseDown: handleMouseDown,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "draggable-modal-header_v8xK4z", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "VOD 하이라이트" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "draggable-modal-close_v8xK4z", children: "×" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "draggable-modal-body_v8xK4z", style: { overflow: "auto", height: "calc(100% - 36px)" }, children: items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-highlights_v8xK4z", children: "하이라이트 없음" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "highlight-list_v8xK4z", children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "highlight-item_v8xK4z", onClick: () => onSeek(item.time), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "highlight-time_v8xK4z", children: formatTime(item.time) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "highlight-title_v8xK4z", children: item.title })
          ] }, i)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "resize-handle_v8xK4z",
              style: {
                position: "absolute",
                right: 0,
                bottom: 0,
                width: 14,
                height: 14,
                cursor: "se-resize"
              },
              onMouseDown: handleResizeDown
            }
          )
        ]
      }
    );
  };
  function useHighlightScanner() {
    const [items, setItems] = reactExports.useState([]);
    reactExports.useEffect(() => {
      const scan = () => {
        const els = document.querySelectorAll(".vod-highlight, [data-highlight-time]");
        if (els.length === 0) return;
        const entries = Array.from(els).map((el2) => {
          var _a2;
          return {
            time: Number(el2.dataset.highlightTime ?? el2.dataset.time ?? 0),
            title: el2.dataset.title ?? ((_a2 = el2.textContent) == null ? void 0 : _a2.trim()) ?? ""
          };
        });
        setItems(entries);
      };
      scan();
      const timer = setInterval(scan, 3e3);
      return () => clearInterval(timer);
    }, []);
    return items;
  }
  const VodPage = observer(() => {
    const settings = useSettingsStore();
    const { pathname } = window.location;
    const isCatchPage = pathname === "/player/catch" || pathname.startsWith("/player/catch/") || /\/player\/\d+\/catch/.test(pathname);
    const [sidebarTarget, setSidebarTarget] = reactExports.useState(null);
    reactExports.useEffect(() => {
      if (!isCatchPage || !settings.isCustomSidebarEnabled) return;
      document.body.classList.add("customSidebar");
      const container = document.createElement("div");
      document.body.appendChild(container);
      setSidebarTarget(container);
      return () => {
        container.remove();
        document.body.classList.remove("customSidebar");
      };
    }, [isCatchPage, settings.isCustomSidebarEnabled]);
    const highlightItems = useHighlightScanner();
    const [showHighlights, setShowHighlights] = reactExports.useState(false);
    reactExports.useEffect(() => {
      if (!settings.isSelectBestQualityEnabled) return;
      const trySelect = () => {
        const qualityBtns = document.querySelectorAll(
          '[class*="quality"] option, [class*="resolution"] option'
        );
        if (qualityBtns.length > 0) {
          const select = qualityBtns[0].closest("select");
          if (select) {
            select.selectedIndex = 0;
            select.dispatchEvent(new Event("change", { bubbles: true }));
          }
          return true;
        }
        return false;
      };
      const timer = setInterval(() => {
        if (trySelect()) clearInterval(timer);
      }, 500);
      const timeout = setTimeout(() => clearInterval(timer), 1e4);
      return () => {
        clearInterval(timer);
        clearTimeout(timeout);
      };
    }, [settings.isSelectBestQualityEnabled]);
    reactExports.useEffect(() => {
      if (!settings.isVODHighlightEnabled) return;
      if (highlightItems.length === 0) return;
      setShowHighlights(true);
    }, [settings.isVODHighlightEnabled, highlightItems.length]);
    const handleSeek = reactExports.useCallback((time) => {
      const video = document.querySelector("video");
      if (video) video.currentTime = time;
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      isCatchPage && sidebarTarget && ReactDOM.createPortal(/* @__PURE__ */ jsxRuntimeExports.jsx(SidebarView, {}), sidebarTarget),
      !isCatchPage && settings.isVODHighlightEnabled && showHighlights && /* @__PURE__ */ jsxRuntimeExports.jsx(
        DraggableResizableModal,
        {
          items: highlightItems,
          onSeek: handleSeek,
          onClose: () => setShowHighlights(false)
        }
      )
    ] });
  });
  function detectPage() {
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
  const App = () => {
    const page = detectPage();
    if (page === "main") return /* @__PURE__ */ jsxRuntimeExports.jsx(MainPage, {});
    if (page === "player") return /* @__PURE__ */ jsxRuntimeExports.jsx(PlayerPage, {});
    if (page === "vod") return /* @__PURE__ */ jsxRuntimeExports.jsx(VodPage, {});
    return null;
  };
  if (typeof GM_getValue === "undefined") {
    const _store = new Map(
      Object.entries(localStorage).filter(([k2]) => k2.startsWith("GM_")).map(([k2, v2]) => {
        try {
          return [k2.slice(3), JSON.parse(v2)];
        } catch {
          return [k2.slice(3), v2];
        }
      })
    );
    window.GM_getValue = (key, def) => _store.has(key) ? _store.get(key) : def;
    window.GM_setValue = (key, val) => {
      _store.set(key, val);
      localStorage.setItem(`GM_${key}`, JSON.stringify(val));
    };
    window.GM_listValues = () => [..._store.keys()];
    window.GM_addStyle = (css) => {
      const s = document.createElement("style");
      s.textContent = css;
      document.head.appendChild(s);
    };
    window.GM_registerMenuCommand = () => {
    };
    window.GM_unregisterMenuCommand = () => {
    };
    window.GM_xmlhttpRequest = () => {
    };
  }
  const _faLink = document.createElement("link");
  _faLink.rel = "stylesheet";
  _faLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
  document.head.appendChild(_faLink);
  function mount() {
    let container = document.getElementById("__soop_ext_root__");
    if (!container) {
      container = document.createElement("div");
      container.id = "__soop_ext_root__";
      container.style.display = "none";
      document.body.appendChild(container);
    }
    createRoot(container).render(
      /* @__PURE__ */ jsxRuntimeExports.jsx(StoreProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
    );
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }

})();