import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react-lite";
import { useSettingsStore } from "@Stores/index";

// ============================================================
// 설정 모달 — 전체 7개 섹션
// ============================================================

const SECTIONS = [
  { id: "broadcast-list", label: "방송 목록" },
  { id: "sidebar", label: "사이드바" },
  { id: "live-player", label: "LIVE 플레이어" },
  { id: "vod-player", label: "VOD 플레이어" },
  { id: "chat", label: "채팅창" },
  { id: "misc", label: "기타" },
  { id: "block-info", label: "차단/부가설명" },
];

// -------
// Toggle
// -------
const Toggle: React.FC<{
  checked: boolean;
  onChange: (val: boolean) => void;
  id?: string;
}> = ({ checked, onChange, id }) => (
  <label className="switch_v8xK4z" htmlFor={id}>
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    <span className="slider_v8xK4z" />
  </label>
);

// -------
// Option row
// -------
const OptionRow: React.FC<{
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
  id?: string;
  details?: React.ReactNode;
}> = ({ label, checked, onChange, id, details }) => (
  <div className="option_v8xK4z">
    <label htmlFor={id}>{label}</label>
    <Toggle checked={checked} onChange={onChange} id={id} />
    {details && <div className="option-details_v8xK4z">{details}</div>}
  </div>
);

// ============================================================
// Main modal component
// ============================================================

const SettingModal: React.FC = observer(() => {
  const s = useSettingsStore();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [searchText, setSearchText] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  // ESC 닫기
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = bodyRef.current?.querySelector(`[data-section-id="${id}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const version = (typeof GM_info !== "undefined" ? GM_info?.script?.version : "") ?? "";

  // 섹션 제목 렌더
  const SectionTitle: React.FC<{ id: string; label: string }> = ({
    id,
    label,
  }) => (
    <div
      className="section-title_v8xK4z"
      data-section-id={id}
      id={`section-${id}`}
    >
      {label}
    </div>
  );

  const modal = open ? (
    <div
      id="myModal"
      style={{ display: "block" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="modal-content_v8xK4z">
        {/* 인덱스 사이드바 */}
        <div className="modal-index_v8xK4z">
          <div className="index-title_v8xK4z">설정</div>
          {SECTIONS.map((sec) => (
            <button
              key={sec.id}
              className={`index-button_v8xK4z${activeSection === sec.id ? " active" : ""}`}
              onClick={() => scrollToSection(sec.id)}
            >
              {sec.label}
            </button>
          ))}
          <div className="modal-version_v8xK4z">
            버전: {version}
            <br />
            <a
              href="https://github.com/bcong/soop-sidebar-extension"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="modal-main-content_v8xK4z">
          {/* 헤더 */}
          <div className="modal-header_v8xK4z">
            <div className="modal-breadcrumb_v8xK4z">
              <span className="breadcrumb-root_v8xK4z">설정</span>
              <span className="breadcrumb-sep_v8xK4z">›</span>
              <span className="breadcrumb-current_v8xK4z">
                {SECTIONS.find((s) => s.id === activeSection)?.label ?? ""}
              </span>
            </div>
            <div className="modal-search-container_v8xK4z">
              <div className="search-input-wrapper_v8xK4z">
                <span className="search-icon_v8xK4z">🔍</span>
                <input
                  id="modal-search-input_v8xK4z"
                  type="text"
                  placeholder="설정 검색..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                {searchText && (
                  <button
                    id="modal-search-clear_v8xK4z"
                    onClick={() => setSearchText("")}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
            <button
              className="close-button_v8xK4z"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>

          {/* 본문 */}
          <div className="modal-body_v8xK4z" ref={bodyRef}>
            {/* ── 방송 목록 ── */}
            <section>
              <SectionTitle id="broadcast-list" label="방송 목록" />
              <OptionRow
                label="커스텀 사이드바 활성화"
                checked={s.isCustomSidebarEnabled}
                onChange={(v) => s.setSetting("isCustomSidebarEnabled", v)}
                id="isCustomSidebarEnabled"
              />
              <OptionRow
                label="즐겨찾기 그룹 탭"
                checked={s.isFavoriteGroupEnabled}
                onChange={(v) => s.setSetting("isFavoriteGroupEnabled", v)}
                id="isFavoriteGroupEnabled"
              />
              <OptionRow
                label="즐겨찾기 그룹 이름 줄이기"
                checked={s.isShortenFavoriteGroupNameEnabled}
                onChange={(v) => s.setSetting("isShortenFavoriteGroupNameEnabled", v)}
                id="isShortenFavoriteGroupNameEnabled"
              />
              <OptionRow
                label="카테고리 그룹 탭"
                checked={s.isCategoryGroupEnabled}
                onChange={(v) => s.setSetting("isCategoryGroupEnabled", v)}
                id="isCategoryGroupEnabled"
              />
              <OptionRow
                label="카테고리 이름 줄이기"
                checked={s.isShortenCategoryNameEnabled}
                onChange={(v) => s.setSetting("isShortenCategoryNameEnabled", v)}
                id="isShortenCategoryNameEnabled"
              />
              <OptionRow
                label="채널 피드 표시"
                checked={s.isChannelFeedEnabled}
                onChange={(v) => s.setSetting("isChannelFeedEnabled", v)}
                id="isChannelFeedEnabled"
              />
              <OptionRow
                label="차단 카테고리 하단 정렬"
                checked={s.isBlockedCategorySortingEnabled}
                onChange={(v) => s.setSetting("isBlockedCategorySortingEnabled", v)}
                id="isBlockedCategorySortingEnabled"
              />
              <OptionRow
                label="알림 방송 상단 고정"
                checked={s.isPinnedStreamWithNotificationEnabled}
                onChange={(v) => s.setSetting("isPinnedStreamWithNotificationEnabled", v)}
                id="isPinnedStreamWithNotificationEnabled"
              />
              <OptionRow
                label="핀 방송 상단 고정"
                checked={s.isPinnedStreamWithPinEnabled}
                onChange={(v) => s.setSetting("isPinnedStreamWithPinEnabled", v)}
                id="isPinnedStreamWithPinEnabled"
              />
              <OptionRow
                label="고정 채널 온라인만 표시"
                checked={s.isPinnedOnlineOnlyEnabled}
                onChange={(v) => s.setSetting("isPinnedOnlineOnlyEnabled", v)}
                id="isPinnedOnlineOnlyEnabled"
              />
              <OptionRow
                label="마이플러스 방송 표시"
                checked={s.displayMyplus}
                onChange={(v) => s.setSetting("displayMyplus", v)}
                id="displayMyplus"
              />
              <OptionRow
                label="마이플러스 VOD 표시"
                checked={s.displayMyplusvod}
                onChange={(v) => s.setSetting("displayMyplusvod", v)}
                id="displayMyplusvod"
              />
              <OptionRow
                label="인기 방송 표시"
                checked={s.displayTop}
                onChange={(v) => s.setSetting("displayTop", v)}
                id="displayTop"
              />
              <OptionRow
                label="치지직 팔로우 채널 표시"
                checked={s.isChzzkFollowChannelsEnabled}
                onChange={(v) => s.setSetting("isChzzkFollowChannelsEnabled", v)}
                id="isChzzkFollowChannelsEnabled"
              />
              <OptionRow
                label="치지직 인기 채널 표시"
                checked={s.isChzzkTopChannelsEnabled}
                onChange={(v) => s.setSetting("isChzzkTopChannelsEnabled", v)}
                id="isChzzkTopChannelsEnabled"
              />
              <OptionRow
                label="즐겨찾기 중복 제거"
                checked={s.isDuplicateRemovalEnabled}
                onChange={(v) => s.setSetting("isDuplicateRemovalEnabled", v)}
                id="isDuplicateRemovalEnabled"
              />
              <OptionRow
                label="인기 중복 제거"
                checked={s.isTopDuplicateRemovalEnabled}
                onChange={(v) => s.setSetting("isTopDuplicateRemovalEnabled", v)}
                id="isTopDuplicateRemovalEnabled"
              />
              <OptionRow
                label="랜덤 정렬"
                checked={s.isRandomSortEnabled}
                onChange={(v) => s.setSetting("isRandomSortEnabled", v)}
                id="isRandomSortEnabled"
              />
              <OptionRow
                label="새 탭으로 열기"
                checked={s.isOpenNewtabEnabled}
                onChange={(v) => s.setSetting("isOpenNewtabEnabled", v)}
                id="isOpenNewtabEnabled"
              />
            </section>

            {/* ── 사이드바 ── */}
            <section>
              <SectionTitle id="sidebar" label="사이드바" />
              <OptionRow
                label="작은 레이아웃"
                checked={s.isSmallUserLayoutEnabled}
                onChange={(v) => s.setSetting("isSmallUserLayoutEnabled", v)}
                id="isSmallUserLayoutEnabled"
              />
              <OptionRow
                label="닉네임 오른쪽 정렬"
                checked={s.isAlignNicknameRightEnabled}
                onChange={(v) => s.setSetting("isAlignNicknameRightEnabled", v)}
                id="isAlignNicknameRightEnabled"
              />
              <div className="option_v8xK4z range-option_v8xK4z">
                <label htmlFor="nicknameWidth">닉네임 너비</label>
                <div className="range-container_v8xK4z">
                  <input
                    id="nicknameWidth"
                    type="range"
                    min={40}
                    max={160}
                    value={s.nicknameWidth}
                    onChange={(e) =>
                      s.setSetting("nicknameWidth", Number(e.target.value))
                    }
                  />
                  <span className="range-value_v8xK4z">{s.nicknameWidth}px</span>
                </div>
              </div>
              <OptionRow
                label="썸네일 툴팁"
                checked={s.isThumbnailTooltipEnabled}
                onChange={(v) => s.setSetting("isThumbnailTooltipEnabled", v)}
                id="isThumbnailTooltipEnabled"
              />
              <OptionRow
                label="캐러셀 제거"
                checked={s.isRemoveCarouselEnabled}
                onChange={(v) => s.setSetting("isRemoveCarouselEnabled", v)}
                id="isRemoveCarouselEnabled"
              />
              <OptionRow
                label="방송 제목 말줄임표"
                checked={s.isBroadTitleTextEllipsisEnabled}
                onChange={(v) => s.setSetting("isBroadTitleTextEllipsisEnabled", v)}
                id="isBroadTitleTextEllipsisEnabled"
              />
              <OptionRow
                label="재배포 태그 제거"
                checked={s.isRemoveRedistributionTagEnabled}
                onChange={(v) => s.setSetting("isRemoveRedistributionTagEnabled", v)}
                id="isRemoveRedistributionTagEnabled"
              />
              <OptionRow
                label="나중에 보기 버튼 제거"
                checked={s.isRemoveWatchLaterButtonEnabled}
                onChange={(v) => s.setSetting("isRemoveWatchLaterButtonEnabled", v)}
                id="isRemoveWatchLaterButtonEnabled"
              />
              <OptionRow
                label="방송 시작 시간 태그 제거"
                checked={s.isRemoveBroadStartTimeTagEnabled}
                onChange={(v) => s.setSetting("isRemoveBroadStartTimeTagEnabled", v)}
                id="isRemoveBroadStartTimeTagEnabled"
              />
              <OptionRow
                label="빈 썸네일 교체"
                checked={s.isReplaceEmptyThumbnailEnabled}
                onChange={(v) => s.setSetting("isReplaceEmptyThumbnailEnabled", v)}
                id="isReplaceEmptyThumbnailEnabled"
              />
              <OptionRow
                label="다크 모드 고정"
                checked={s.isThemeLockEnabled}
                onChange={(v) => s.setSetting("isThemeLockEnabled", v)}
                id="isThemeLockEnabled"
              />
            </section>

            {/* ── LIVE 플레이어 ── */}
            <section>
              <SectionTitle id="live-player" label="LIVE 플레이어" />
              <OptionRow
                label="VOD 자동 재생 방지"
                checked={s.isNoAutoVODEnabled}
                onChange={(v) => s.setSetting("isNoAutoVODEnabled", v)}
                id="isNoAutoVODEnabled"
              />
              <OptionRow
                label="자동 재생 재개"
                checked={s.isAutoResumeVideoEnabled}
                onChange={(v) => s.setSetting("isAutoResumeVideoEnabled", v)}
                id="isAutoResumeVideoEnabled"
              />
              <OptionRow
                label="LIVE 리다이렉트"
                checked={s.isRedirectLiveEnabled}
                onChange={(v) => s.setSetting("isRedirectLiveEnabled", v)}
                id="isRedirectLiveEnabled"
              />
              <OptionRow
                label="e스포츠 정보 숨기기"
                checked={s.isHideEsportsInfoEnabled}
                onChange={(v) => s.setSetting("isHideEsportsInfoEnabled", v)}
                id="isHideEsportsInfoEnabled"
              />
              <OptionRow
                label="일시정지 버튼"
                checked={s.isShowPauseButtonEnabled}
                onChange={(v) => s.setSetting("isShowPauseButtonEnabled", v)}
                id="isShowPauseButtonEnabled"
              />
              <OptionRow
                label="캡처 버튼"
                checked={s.isCaptureButtonEnabled}
                onChange={(v) => s.setSetting("isCaptureButtonEnabled", v)}
                id="isCaptureButtonEnabled"
              />
              <OptionRow
                label="버퍼 타임 표시"
                checked={s.isShowBufferTimeEnabled}
                onChange={(v) => s.setSetting("isShowBufferTimeEnabled", v)}
                id="isShowBufferTimeEnabled"
              />
              <OptionRow
                label="동영상 스킵 핸들러"
                checked={s.isVideoSkipHandlerEnabled}
                onChange={(v) => s.setSetting("isVideoSkipHandlerEnabled", v)}
                id="isVideoSkipHandlerEnabled"
              />
              <OptionRow
                label="고화질 단축키 (Alt+S)"
                checked={s.isSharpmodeShortcutEnabled}
                onChange={(v) => s.setSetting("isSharpmodeShortcutEnabled", v)}
                id="isSharpmodeShortcutEnabled"
              />
              <OptionRow
                label="저지연 단축키 (Alt+L)"
                checked={s.isLLShortcutEnabled}
                onChange={(v) => s.setSetting("isLLShortcutEnabled", v)}
                id="isLLShortcutEnabled"
              />
              <OptionRow
                label="지연 조절 단축키"
                checked={s.isAdjustDelayNoGridEnabled}
                onChange={(v) => s.setSetting("isAdjustDelayNoGridEnabled", v)}
                id="isAdjustDelayNoGridEnabled"
              />
              <OptionRow
                label="화질 단축키 (Alt+Q)"
                checked={s.isQualityChangeShortcutEnabled}
                onChange={(v) => s.setSetting("isQualityChangeShortcutEnabled", v)}
                id="isQualityChangeShortcutEnabled"
              />
              <OptionRow
                label="비활성 탭 음소거"
                checked={s.isMutedInactiveTabsEnabled}
                onChange={(v) => s.setSetting("isMutedInactiveTabsEnabled", v)}
                id="isMutedInactiveTabsEnabled"
              />
              <OptionRow
                label="자동 화질 변경"
                checked={s.isAutoChangeQualityEnabled}
                onChange={(v) => s.setSetting("isAutoChangeQualityEnabled", v)}
                id="isAutoChangeQualityEnabled"
              />
              <OptionRow
                label="문서 제목 업데이트"
                checked={s.isDocumentTitleUpdateEnabled}
                onChange={(v) => s.setSetting("isDocumentTitleUpdateEnabled", v)}
                id="isDocumentTitleUpdateEnabled"
              />
              <OptionRow
                label="화면 모드에서 사이드바 항상 표시"
                checked={s.isShowSidebarOnScreenModeAlwaysEnabled}
                onChange={(v) => s.setSetting("isShowSidebarOnScreenModeAlwaysEnabled", v)}
                id="isShowSidebarOnScreenModeAlwaysEnabled"
              />
              <OptionRow
                label="마우스 오버로 사이드바 열기"
                checked={s.isMouseOverSideBarEnabled}
                onChange={(v) => s.setSetting("isMouseOverSideBarEnabled", v)}
                id="isMouseOverSideBarEnabled"
              />
              <OptionRow
                label="채팅 위치 변경"
                checked={s.isChatPositionEnabled}
                onChange={(v) => s.setSetting("isChatPositionEnabled", v)}
                id="isChatPositionEnabled"
              />
              <OptionRow
                label="자동 화면 모드"
                checked={s.isAutoScreenModeEnabled}
                onChange={(v) => s.setSetting("isAutoScreenModeEnabled", v)}
                id="isAutoScreenModeEnabled"
              />
              <OptionRow
                label="클릭 이벤트 매퍼"
                checked={s.isClickPlayerEventMapperEnabled}
                onChange={(v) => s.setSetting("isClickPlayerEventMapperEnabled", v)}
                id="isClickPlayerEventMapperEnabled"
                details={
                  s.isClickPlayerEventMapperEnabled ? (
                    <>
                      <span className="mapper-setting_v8xK4z">
                        좌클릭:
                        <select
                          value={s.selectLeftClick}
                          onChange={(e) =>
                            s.setSetting("selectLeftClick", e.target.value)
                          }
                        >
                          <option value="play_pause">재생/정지</option>
                          <option value="mute">음소거</option>
                          <option value="none">없음</option>
                        </select>
                      </span>
                      <span className="mapper-setting_v8xK4z">
                        우클릭:
                        <select
                          value={s.selectRightClick}
                          onChange={(e) =>
                            s.setSetting("selectRightClick", e.target.value)
                          }
                        >
                          <option value="play_pause">재생/정지</option>
                          <option value="mute">음소거</option>
                          <option value="none">없음</option>
                        </select>
                      </span>
                    </>
                  ) : undefined
                }
              />
              <div className="option_v8xK4z">
                <label htmlFor="preferredQuality">선호 화질</label>
                <select
                  id="preferredQuality"
                  value={s.preferredQuality}
                  onChange={(e) =>
                    s.setSetting("preferredQuality", e.target.value)
                  }
                >
                  <option value="original">원본</option>
                  <option value="hd">HD</option>
                  <option value="sd">SD</option>
                  <option value="mobile">모바일</option>
                </select>
              </div>
            </section>

            {/* ── VOD 플레이어 ── */}
            <section>
              <SectionTitle id="vod-player" label="VOD 플레이어" />
              <OptionRow
                label="최고 화질 자동 선택"
                checked={s.isSelectBestQualityEnabled}
                onChange={(v) => s.setSetting("isSelectBestQualityEnabled", v)}
                id="isSelectBestQualityEnabled"
              />
              <OptionRow
                label="캐치 그림자 제거"
                checked={s.isRemoveShadowsFromCatchEnabled}
                onChange={(v) =>
                  s.setSetting("isRemoveShadowsFromCatchEnabled", v)
                }
                id="isRemoveShadowsFromCatchEnabled"
              />
              <OptionRow
                label="VOD 하이라이트"
                checked={s.isVODHighlightEnabled}
                onChange={(v) => s.setSetting("isVODHighlightEnabled", v)}
                id="isVODHighlightEnabled"
              />
            </section>

            {/* ── 채팅창 ── */}
            <section>
              <SectionTitle id="chat" label="채팅창" />
              <OptionRow
                label="서포터 뱃지 숨기기"
                checked={s.isHideSupporterBadgeEnabled}
                onChange={(v) =>
                  s.setSetting("isHideSupporterBadgeEnabled", v)
                }
                id="isHideSupporterBadgeEnabled"
              />
              <OptionRow
                label="팬 뱃지 숨기기"
                checked={s.isHideFanBadgeEnabled}
                onChange={(v) => s.setSetting("isHideFanBadgeEnabled", v)}
                id="isHideFanBadgeEnabled"
              />
              <OptionRow
                label="구독 뱃지 숨기기"
                checked={s.isHideSubBadgeEnabled}
                onChange={(v) => s.setSetting("isHideSubBadgeEnabled", v)}
                id="isHideSubBadgeEnabled"
              />
              <OptionRow
                label="VIP 뱃지 숨기기"
                checked={s.isHideVIPBadgeEnabled}
                onChange={(v) => s.setSetting("isHideVIPBadgeEnabled", v)}
                id="isHideVIPBadgeEnabled"
              />
              <OptionRow
                label="매니저 뱃지 숨기기"
                checked={s.isHideMngrBadgeEnabled}
                onChange={(v) => s.setSetting("isHideMngrBadgeEnabled", v)}
                id="isHideMngrBadgeEnabled"
              />
              <OptionRow
                label="스트리머 뱃지 숨기기"
                checked={s.isHideStreamerBadgeEnabled}
                onChange={(v) =>
                  s.setSetting("isHideStreamerBadgeEnabled", v)
                }
                id="isHideStreamerBadgeEnabled"
              />
              <OptionRow
                label="복사/붙여넣기 잠금 해제"
                checked={s.isUnlockCopyPasteEnabled}
                onChange={(v) =>
                  s.setSetting("isUnlockCopyPasteEnabled", v)
                }
                id="isUnlockCopyPasteEnabled"
              />
              <OptionRow
                label="채팅 입력 위 버튼 숨기기"
                checked={s.isHideButtonsAboveChatInputEnabled}
                onChange={(v) =>
                  s.setSetting("isHideButtonsAboveChatInputEnabled", v)
                }
                id="isHideButtonsAboveChatInputEnabled"
              />
            </section>

            {/* ── 기타 ── */}
            <section>
              <SectionTitle id="misc" label="기타" />
              <OptionRow
                label="방송 로드 시 전송"
                checked={s.isSendLoadBroadEnabled}
                onChange={(v) => s.setSetting("isSendLoadBroadEnabled", v)}
                id="isSendLoadBroadEnabled"
              />
            </section>

            {/* ── 차단/부가설명 ── */}
            <section>
              <SectionTitle id="block-info" label="차단/부가설명" />
              <p className="description_v8xK4z">
                채널 항목에서 우클릭 → 차단/차단 해제
                <br />
                설정 저장 위치: Tampermonkey GM 스토리지
              </p>
              <div className="bug-report_v8xK4z description_v8xK4z">
                버그 제보 및 기능 요청:{" "}
                <a
                  href="https://github.com/bcong/soop-sidebar-extension/issues"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub Issues
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* 설정 버튼은 NavBar/TopBar에서 포탈로 렌더 */}
      {ReactDOM.createPortal(modal, document.body)}
      <li id="openModalBtn">
        <button
          className="btn-settings-ui"
          onClick={openModal}
          title="사이드바 설정"
          style={{
            width: "100%",
            height: "100%",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        />
      </li>
    </>
  );
});

export default SettingModal;
