# Monthly Plan

A private, single-page daily discipline tracker — modeled on the "System" from *Solo Leveling*. Every day is a quest with assigned tasks, the day locks in at midnight, and failing a task **costs points** instead of just earning none. It's not a neutral habit checklist; the penalty is the point.

## Purpose

Monthly Plan exists to keep one person (its only user) honest about a daily routine — diet, gym, water, sleep, spending, and weight — by scoring each day out of 100 and turning the run into a visible rank and set of titles. It was built after the previous version's log was silently wiped by Chrome clearing local storage, so the whole architecture is designed around one hard rule: **opening the app must never require a manual step**, or the log goes cold and the habit dies with it.

## How it runs

- `Monthly Plan.bat` launches a tiny stdlib-only Python server (`server.py`) on `http://127.0.0.1:8731` and opens the app in its own dedicated Chrome app-window profile (isolated from normal browsing, so clearing browser data can never touch it again).
- `data.json`, sitting next to the app, is the single source of truth — written atomically (temp file + replace) with a rolling backup copy. The server shuts itself down once the window closes.
- If Python or the server isn't available, the app falls back to opening as a plain `file://` page backed by `localStorage`, so it still works, just without durable file storage.

## Core features

- **Calendar view** — a full month grid, each day colored by score band (Good / Moderate / Bad / in progress), with a running month summary.
- **Day sheet** — tap any day to check off tasks grouped into All day / Morning / Afternoon / Evening / Night, with a live 0–100 score bar.
- **Analytics view** — weekly score trend, gym attendance table, spending chart against a daily budget line, and weight progress toward target.
- **Scoring engine** — ~15 weighted tasks summing to exactly 100 points per day; some tasks (like sleep hours or water bottles) score on a curve rather than as flat yes/no.
- **Gym / rest day toggle** — the morning task set reshapes itself depending on whether it's a gym day or a rest day, while both variants still sum to 100.
- **CSV sync** — the log can be linked directly to a `.csv` file on disk (e.g. inside a synced Google Drive folder) via the File System Access API, updating on every change, with manual export/import as a fallback.

## Special features (the design signature of this app)

- **Penalty-based scoring, not just completion.** The score runs **−100 to +100**, not 0–100 — an unchecked task actively subtracts its weight rather than simply not adding. This is deliberate: it mirrors a game system's daily quest penalty, not a forgiving habit tracker.
- **Bonus tasks.** Two tasks (10 AM and 3 PM plain tea) are flagged `bonus:true` — they add points if done but cost nothing if skipped. This is the one intentional exception to the penalty model.
- **Weekly gym quota with a week-level penalty.** Missing the 4-session/week gym target docks the *week's* average by a flat 5 points, without touching or repainting any individual day's score — one bad week can't retroactively wreck days that were actually fine.
- **Dual rank system (Rank vs. Level).** Rank (E → D → C → B → A → S) is a rolling 7-day average that can rise *or fall*, with a 3-day confirmation before promotion and a 3-day grace period before demotion — so one great or one bad day can't whipsaw the rank. A and S rank are additionally capped at B if the previous week's gym quota wasn't met, lifting automatically the moment a clean week closes. Rank history is never stored — it's replayed live from the score log, so editing a past day retroactively and correctly rewrites the whole rank timeline.
- **Unscored tracks with titles instead of points.** Weekly body-weight (Monday morning) and daily spending are deliberately kept *outside* the 100-point score — logged, charted, and totaled, but never scored or penalized. Each instead earns a title as it improves (weight: Unforged → Kindled → Tempered → Ironclad → Ascendant at target; spending: its own "Steward" track against a daily budget). This is a deliberate boundary — biology and money don't answer to willpower the way a checklist does.
- **Everything is a pure function of the log.** No derived state (rank, streaks, titles) is stored anywhere — it's all recomputed from `data.json` on load, so editing history is always safe and self-consistent.
- **Demo mode.** Visiting with `?demo=1` loads sample data from a completely separate storage key — the real log is never read or written while demoing.

## Data & backups

- `data.json` — the live log (source of truth).
- `data.backup.json` — automatic previous-copy backup, refreshed on every save.
- `data.corrupt-<timestamp>.json` — a damaged file is quarantined here rather than silently discarded, and the app starts fresh instead of crashing.
- A linked CSV copy (optional, e.g. on Google Drive) serves as a portable, human-readable spare.
