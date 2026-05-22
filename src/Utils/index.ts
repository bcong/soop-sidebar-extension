// ===========================
// 범용 유틸리티
// ===========================

export const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const customLog = {
  log: (...args: any[]) => console.log("[SOOP-EXT]", ...args),
  warn: (...args: any[]) => console.warn("[SOOP-EXT]", ...args),
  error: (...args: any[]) => console.error("[SOOP-EXT]", ...args),
};

// ===========================
// DOM 유틸리티
// ===========================

export const awaitElement = (selector: string): Promise<Element> => {
  return new Promise((resolve) => {
    const el = document.querySelector(selector);
    if (el) return resolve(el);

    const observer = new MutationObserver(() => {
      const target = document.querySelector(selector);
      if (target) {
        observer.disconnect();
        resolve(target);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
};

export const waitForElementAsync = (
  selector: string,
  timeout = 10000
): Promise<Element | null> => {
  return new Promise((resolve) => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }

    let observer: MutationObserver | null = null;

    const timeoutId = setTimeout(() => {
      if (observer) {
        observer.disconnect();
        resolve(null);
      }
    }, timeout);

    observer = new MutationObserver(() => {
      const targetElement = document.querySelector(selector);
      if (targetElement) {
        observer!.disconnect();
        clearTimeout(timeoutId);
        resolve(targetElement);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });
};

export const waitForVariable = (
  varName: string,
  timeout = 20000
): Promise<any> => {
  return new Promise((resolve, reject) => {
    let elapsed = 0;
    const t = setInterval(() => {
      const val = (unsafeWindow as any)[varName];
      if (val) {
        clearInterval(t);
        resolve(val);
      } else {
        elapsed += 200;
        if (elapsed >= timeout) {
          clearInterval(t);
          reject(new Error(`'${varName}' 변수를 찾지 못했습니다.`));
        }
      }
    }, 200);
  });
};

export const waitForLivePlayer = (timeout = 10000): Promise<any> => {
  return new Promise((resolve, reject) => {
    const interval = 1500;
    let elapsed = 0;

    const check = () => {
      if ((unsafeWindow as any).livePlayer) {
        resolve((unsafeWindow as any).livePlayer);
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
};

export const isElementVisible = (selector: string): boolean => {
  const el = document.querySelector(selector);
  if (!el) return false;

  const style = window.getComputedStyle(el);
  if (
    style.display === "none" ||
    style.visibility === "hidden" ||
    style.opacity === "0"
  )
    return false;

  const rect = el.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return false;

  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth)
  );
};

export const isUserTyping = (): boolean => {
  const active = document.activeElement;
  const tag = active?.tagName?.toUpperCase();
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    (active as HTMLElement)?.isContentEditable ||
    active?.id === "write_area"
  );
};

// ===========================
// URL 변경 감지
// ===========================

export const observeUrlChanges = (() => {
  let lastUrl = window.location.pathname;
  const callbacks = new Set<(url: string) => void>();
  let isObserving = false;

  const triggerCallbacks = (newUrl: string) => {
    if (newUrl !== lastUrl) {
      lastUrl = newUrl;
      callbacks.forEach((cb) => cb(newUrl));
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

    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      triggerCallbacks(
        (args[2]?.toString() as string) || window.location.pathname
      );
    };

    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      triggerCallbacks(
        (args[2]?.toString() as string) || window.location.pathname
      );
    };
  };

  return function registerCallback(callback: (url: string) => void) {
    startObserving();
    callbacks.add(callback);
    return function disconnect() {
      callbacks.delete(callback);
    };
  };
})();

export const addLocationChangeCallback = (callback: () => void): void => {
  let lastHref = location.href;
  const observer = new MutationObserver(() => {
    if (location.href !== lastHref) {
      lastHref = location.href;
      callback();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
};

// ===========================
// 기타 유틸리티
// ===========================

export const loadHlsScript = (): void => {
  const hlsScript = document.createElement("script");
  hlsScript.src = "https://cdn.jsdelivr.net/npm/hls.js@latest";
  hlsScript.onload = () => customLog.log("hls.js가 성공적으로 로드되었습니다.");
  hlsScript.onerror = () =>
    customLog.error("hls.js 로드 중 오류가 발생했습니다.");
  document.head.appendChild(hlsScript);
};

export const loadScript = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${url}"]`)) {
      customLog.log(`스크립트가 이미 로드됨: ${url}`);
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = url;
    script.onload = () => {
      customLog.log(`스크립트 로드 성공: ${url}`);
      resolve();
    };
    script.onerror = () => {
      customLog.error(`스크립트 로드 실패: ${url}`);
      reject(new Error(`${url} 로드 실패`));
    };
    document.head.appendChild(script);
  });
};
