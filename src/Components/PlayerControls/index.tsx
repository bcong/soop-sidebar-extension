import React, { useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react-lite";
import { useSettingsStore } from "@Stores/index";

// Player 내부에 버튼을 렌더할 DOM 요소를 찾거나 생성
function getOrCreateContainer(id: string, parent: Element): HTMLElement {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("div");
    el.id = id;
    parent.appendChild(el);
  }
  return el;
}

const PlayerControls: React.FC = observer(() => {
  const settings = useSettingsStore();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const getVideo = (): HTMLVideoElement | null => {
    if (!videoRef.current) {
      videoRef.current = document.querySelector("video");
    }
    return videoRef.current;
  };

  const handlePause = useCallback(() => {
    const video = getVideo();
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, []);

  const handleCapture = useCallback(() => {
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

  // 플레이어 컨트롤 DOM 요소 탐색
  const controlBar =
    document.querySelector(".player_v8xK4z-control-bar") ??
    document.querySelector('[class*="control-bar"]') ??
    document.querySelector('[class*="controlBar"]');

  if (!controlBar) return null;

  const container = getOrCreateContainer(
    "custom-player-controls",
    controlBar
  );

  return ReactDOM.createPortal(
    <div className="custom-controls-wrapper_v8xK4z">
      {settings.isShowPauseButtonEnabled && (
        <button
          className="custom-ctrl-btn_v8xK4z pause-btn_v8xK4z"
          onClick={handlePause}
          title="일시정지"
        >
          ⏸
        </button>
      )}
      {settings.isCaptureButtonEnabled && (
        <button
          className="custom-ctrl-btn_v8xK4z capture-btn_v8xK4z"
          onClick={handleCapture}
          title="캡처"
        >
          📷
        </button>
      )}
    </div>,
    container
  );
});

export default PlayerControls;
