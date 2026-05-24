CREATE TABLE IF NOT EXISTS user_pins (
    user_id   TEXT PRIMARY KEY,
    pins      TEXT NOT NULL DEFAULT '[]',
    updated_at TEXT NOT NULL
);
