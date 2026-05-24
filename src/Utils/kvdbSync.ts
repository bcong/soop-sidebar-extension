import { GM_getValue, GM_setValue } from "vite-plugin-monkey/dist/client";

// ======================================================================
// 치지직 핀 동기화 — kvdb.io 기반
//
// [1회 설정] https://kvdb.io/ 방문 → "Get a bucket" 클릭 → ID 복사 후 아래에 붙여넣기
// 이후 모든 브라우저에서 자동으로 동일 치지직 계정의 핀을 공유합니다.
// ======================================================================
export const KVDB_BUCKET = ""; // 예: "AbCdEfGhIj"

const KVDB_PINS_PREFIX = "_soop_sidebar_chzzk-pins-";

/** 현재 로그인된 치지직 유저의 채널 ID를 반환 (캐시 포함) */
export async function fetchChzzkUserId(): Promise<string | null> {
    const cached = GM_getValue("chzzkUserId_cached", "") as string;
    if (cached) return cached;

    try {
        const res = await fetch("https://api.chzzk.naver.com/service/v1/me/profile", {
            credentials: "include",
        });
        if (!res.ok) return null;
        const json = await res.json();
        const channelId: string | null = json?.content?.channelId ?? json?.content?.channel?.channelId ?? null;
        if (channelId) {
            GM_setValue("chzzkUserId_cached", channelId);
        }
        return channelId;
    } catch {
        return null;
    }
}

/** 캐시된 치지직 유저 ID 초기화 (로그아웃 등) */
export function clearChzzkUserIdCache(): void {
    GM_setValue("chzzkUserId_cached", "");
}

export async function kvdbPush(chzzkUserId: string, pins: string[]): Promise<void> {
    if (!KVDB_BUCKET || !chzzkUserId) return;
    const key = `${KVDB_PINS_PREFIX}${chzzkUserId}`;
    const res = await fetch(`https://kvdb.io/${KVDB_BUCKET}/${encodeURIComponent(key)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pins),
    });
    if (!res.ok) throw new Error(`kvdb PUT failed: ${res.status}`);
}

export async function kvdbPull(chzzkUserId: string): Promise<string[]> {
    if (!KVDB_BUCKET || !chzzkUserId) return [];
    const key = `${KVDB_PINS_PREFIX}${chzzkUserId}`;
    const res = await fetch(`https://kvdb.io/${KVDB_BUCKET}/${encodeURIComponent(key)}`);
    if (res.status === 404) return [];
    if (!res.ok) throw new Error(`kvdb GET failed: ${res.status}`);
    const text = await res.text();
    if (!text) return [];
    const data: unknown = JSON.parse(text);
    if (!Array.isArray(data)) return [];
    return (data as unknown[]).filter((v): v is string => typeof v === "string");
}

/** KVDB_BUCKET 상수가 설정되어 있는지 확인 */
export function isKvdbConfigured(): boolean {
    return KVDB_BUCKET.length > 0;
}
