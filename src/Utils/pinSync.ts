import { GM_xmlhttpRequest } from "vite-plugin-monkey/dist/client";

// ======================================================================
// 치지직 핀 동기화 — Cloudflare Workers + D1 기반
//
// [배포 절차] workers/ 폴더에서:
//   1. npm install -g wrangler  (최초 1회)
//   2. wrangler login
//   3. npm run db:create        → database_id 복사 → wrangler.toml에 붙여넣기
//   4. npm run db:migrate       → D1 테이블 생성
//   5. npm run deploy           → 출력된 URL을 아래 WORKER_URL에 입력
// ======================================================================
export const WORKER_URL = "https://soop-sidebar.bcong.workers.dev";

/** 네이버 userIdHash 반환 — comm-api (치지직 로그인 필요) */
export async function fetchChzzkUserId(): Promise<string | null> {
    return new Promise((resolve) => {
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://comm-api.game.naver.com/nng_main/v1/user/getUserStatus",
            onload: (res) => {
                try {
                    const json = JSON.parse(res.responseText);
                    const userIdHash: string | null = json?.content?.userIdHash ?? null;
                    resolve(userIdHash);
                } catch {
                    resolve(null);
                }
            },
            onerror: () => resolve(null),
        });
    });
}

/** 네이버 로그인 진단 — 테스트 버튼용 */
export async function diagnoseChzzkLogin(): Promise<{ ok: boolean; detail: string }> {
    return new Promise((resolve) => {
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://comm-api.game.naver.com/nng_main/v1/user/getUserStatus",
            onload: (res) => {
                try {
                    const json = JSON.parse(res.responseText);
                    const userIdHash: string | null = json?.content?.userIdHash ?? null;
                    const nickname: string = json?.content?.nickname ?? "";
                    if (userIdHash && json?.content?.loggedIn) {
                        resolve({ ok: true, detail: `${nickname} (${userIdHash.slice(0, 8)}...)` });
                    } else {
                        resolve({ ok: false, detail: `로그인 안 됨 | HTTP ${res.status}` });
                    }
                } catch {
                    resolve({
                        ok: false,
                        detail: `파싱 실패 | HTTP ${res.status} | ${res.responseText.slice(0, 120)}`,
                    });
                }
            },
            onerror: () => resolve({ ok: false, detail: "네트워크 오류 (GM_xmlhttpRequest)" }),
        });
    });
}

export async function syncPush(userId: string, pins: string[]): Promise<void> {
    if (!WORKER_URL || !userId) return;
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: "POST",
            url: `${WORKER_URL}/pins/${userId}`,
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify(pins),
            onload: (res) => {
                if (res.status >= 200 && res.status < 300) resolve();
                else reject(new Error(`sync POST ${res.status} | ${res.responseText.slice(0, 200)}`));
            },
            onerror: () => reject(new Error("sync POST network error")),
        });
    });
}

export async function syncPull(userId: string): Promise<string[]> {
    if (!WORKER_URL || !userId) return [];
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: "GET",
            url: `${WORKER_URL}/pins/${userId}`,
            onload: (res) => {
                if (res.status === 404) {
                    resolve([]);
                    return;
                }
                if (res.status < 200 || res.status >= 300) {
                    reject(new Error(`sync GET ${res.status}`));
                    return;
                }
                try {
                    const data: unknown = JSON.parse(res.responseText);
                    if (!Array.isArray(data)) {
                        resolve([]);
                        return;
                    }
                    resolve((data as unknown[]).filter((v): v is string => typeof v === "string"));
                } catch {
                    resolve([]);
                }
            },
            onerror: () => reject(new Error("sync GET network error")),
        });
    });
}

/** WORKER_URL이 설정되어 있는지 확인 */
export function isSyncConfigured(): boolean {
    return WORKER_URL.length > 0;
}
