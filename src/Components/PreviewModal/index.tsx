import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

interface PreviewModalProps {
  broadNo: string | number;
  userId: string;
  userNick: string;
  broadTitle: string;
  onClose: () => void;
}

// 외부에서 모달 열기 위한 싱글톤
let globalOpenFn: ((props: Omit<PreviewModalProps, "onClose">) => void) | null = null;

export const openPreviewModal = (
  props: Omit<PreviewModalProps, "onClose">
): void => {
  globalOpenFn?.(props);
};

// 실제 모달 내용
const PreviewModalContent: React.FC<PreviewModalProps> = ({
  broadNo,
  userId,
  userNick,
  broadTitle,
  onClose,
}) => {
  const thumbnailUrl = `https://liveimg.sooplive.com/m/${broadNo}.jpg`;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div
      id="previewModal"
      className="preview-modal-overlay_v8xK4z"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="preview-modal-content_v8xK4z">
        <button className="preview-modal-close_v8xK4z" onClick={onClose}>
          &times;
        </button>
        <div className="preview-modal-thumbnail_v8xK4z">
          <img src={thumbnailUrl} alt={broadTitle} />
        </div>
        <div className="preview-modal-info_v8xK4z">
          <div className="preview-modal-nick_v8xK4z">{userNick}</div>
          <div className="preview-modal-title_v8xK4z">{broadTitle}</div>
          <a
            className="preview-modal-link_v8xK4z"
            href={`https://play.sooplive.com/${userId}/${broadNo}`}
            target="_blank"
            rel="noreferrer"
          >
            방송 바로가기
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
};

// 모달 컨테이너 (App에 한 번 마운트)
const PreviewModal: React.FC = () => {
  const [modalProps, setModalProps] = useState<
    Omit<PreviewModalProps, "onClose"> | null
  >(null);

  useEffect(() => {
    globalOpenFn = (props) => setModalProps(props);
    return () => {
      globalOpenFn = null;
    };
  }, []);

  if (!modalProps) return null;

  return (
    <PreviewModalContent
      {...modalProps}
      onClose={() => setModalProps(null)}
    />
  );
};

export default PreviewModal;
