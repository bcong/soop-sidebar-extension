interface Env {
    DB: D1Database;
}

const CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        if (request.method === "OPTIONS") {
            return new Response(null, { headers: CORS });
        }

        const url = new URL(request.url);
        // /pins/{32자 hex userIdHash}
        const match = url.pathname.match(/^\/pins\/([a-f0-9]{32})$/);
        if (!match) {
            return new Response("Not Found", { status: 404, headers: CORS });
        }
        const userId = match[1];

        if (request.method === "GET") {
            const row = await env.DB.prepare("SELECT pins FROM user_pins WHERE user_id = ?")
                .bind(userId)
                .first<{ pins: string }>();
            return new Response(row?.pins ?? "[]", {
                headers: { ...CORS, "Content-Type": "application/json" },
            });
        }

        if (request.method === "POST") {
            const body = await request.text();
            let parsed: unknown;
            try {
                parsed = JSON.parse(body);
            } catch {
                return new Response("Bad Request: invalid JSON", { status: 400, headers: CORS });
            }
            if (!Array.isArray(parsed) || !parsed.every((v) => typeof v === "string")) {
                return new Response("Bad Request: expected string[]", { status: 400, headers: CORS });
            }
            await env.DB.prepare("INSERT OR REPLACE INTO user_pins (user_id, pins, updated_at) VALUES (?, ?, ?)")
                .bind(userId, body, new Date().toISOString())
                .run();
            return new Response("OK", { headers: CORS });
        }

        return new Response("Method Not Allowed", { status: 405, headers: CORS });
    },
};
