import React from "react";
import { createRoot } from "react-dom/client";
import "./global.less";
import App from "./App";
import { StoreProvider } from "@Stores/index";

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
    </StoreProvider>
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount);
} else {
  mount();
}
