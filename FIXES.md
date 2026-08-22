# Fix Log

Running record of issues found in the [review](#) and how each was fixed. Grouped by the pass they were fixed in.

---

## Pass 1 — Code quality, accessibility, content

### Code quality

**`npm run lint` failed: `react-hooks/set-state-in-effect` in `Projects.tsx`**
- Error: a `useEffect` keyed on `selectedProject` called `setActiveMediaIndex(0)` synchronously just to reset the gallery index when the modal opened — exactly the "resetting state via an effect" anti-pattern React's lint rule flags (risks an extra cascading render).
- Fix: removed the effect entirely. `activeMediaIndex` is now reset inline, in the same place `selectedProject` is set (a new `openProject(project)` helper calls both `setSelectedProject` and `setActiveMediaIndex(0)` together). `src/components/Projects.tsx`.

**`npm run lint` warning: missing `useEffect` dependency in `BootLoader.tsx`**
- Warning: `bootSequence` was redeclared inline on every render and used inside a `useEffect` without being listed as a dependency.
- Fix: hoisted the array to a module-level `BOOT_SEQUENCE` constant outside the component — it never depended on props/state, so it doesn't belong in render scope at all. `src/components/BootLoader.tsx`.

**Duplicated icon maps**
- `ThoughtLabPage.tsx` and `ThoughtLabArticlePage.tsx` each defined the same 10-entry `Record<string, React.ReactNode>` mapping icon names to pre-sized `lucide-react` elements.
- Fix: extracted to `src/utils/thoughtLabIcons.tsx`, exporting `getThoughtLabIcon(name, size)`. Both pages now call this instead of maintaining their own copy.

**Dead code: `FunSection.tsx` (the commented-out Swarm Intelligence Demo)**
- 513-line component that was already disconnected (import/usage commented out in `App.tsx` in a prior session).
- Fix: deleted `src/components/FunSection.tsx` and removed the leftover commented-out import/usage lines in `App.tsx`.

**Unused dependency: `@google/genai`**
- Present in `package.json` but never imported anywhere in `src/`.
- Fix: `npm uninstall @google/genai`.

### Accessibility

**No `aria-label` on any icon-only button in the codebase**
- Fixed on: `Navbar.tsx` hamburger menu (`aria-label` + `aria-expanded`), `Projects.tsx` carousel prev/next buttons, `Projects.tsx` modal close button, `ThoughtLabArticlePage.tsx` share button.

**Project detail modal (`Projects.tsx`) had no dialog semantics**
- No `role="dialog"`/`aria-modal`, no Escape-to-close, no focus moved into the modal on open.
- Fix: added `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing at the project title heading; added a `useEffect` that focuses the modal container and listens for `Escape` to close while the modal is open.

**Non-keyboard-operable clickable `<div>`s**
- `Achievements.tsx` marquee pause toggle, `ThoughtLabPage.tsx` article cards, `Projects.tsx` center carousel card, and the `Projects.tsx` modal gallery thumbnails were all `onClick`-only `<div>`s with no way to reach or activate them from a keyboard.
- Fix: added `role="button"`, `tabIndex={0}`, an `onKeyDown` handler (Enter/Space), and a descriptive `aria-label` to each. (Left/right partial carousel cards were left as mouse-only since the existing prev/next buttons already cover that action via keyboard.)

### Content

**Typo in `index.html`**: "love to make things **movr**" → "move".

**Stale scaffold README**: `README.md` was still the generic AI-Studio-generated "how to customize this template" guide (folder-by-folder instructions, some of them factually wrong — e.g. told readers to add an `image` field that doesn't exist on the `Project` type, which actually uses `gallery: string[]`). Rewrote it to describe the actual site, stack, structure, and dev/build/deploy commands.

**Stale/incorrect header comment in `constants.ts`**: same issue as the README — referenced a nonexistent `image`/`video` field shape. Rewrote to describe the real `gallery: string[]` shape and the `BASE_URL` asset-path convention.

**Verification**: `npx tsc -b`, `npm run lint`, and `npx vite build` all pass clean after this pass.

---

## Pass 2 — "Game changer" items

### 1. Tailwind was running from the CDN, not built

- Problem: `index.html` loaded `cdn.tailwindcss.com` plus an inline `tailwind.config` `<script>`. This ships the entire Tailwind JIT compiler to every visitor's browser and recompiles on the fly — `npx vite build` produced **zero CSS files** in `dist/`.
- Fix: installed `tailwindcss` + `@tailwindcss/vite` (v4, CSS-first config). Created `src/index.css` with `@import "tailwindcss";` and an `@theme` block carrying over the custom fonts (Inter/Orbitron), neon color palette, and the two custom animations (`spin-slow`, `pulse-fast`, with their `@keyframes` defined explicitly rather than relying on undocumented default-keyframe reuse). Moved the global body/scrollbar CSS from `index.html`'s `<style>` block into the same file. Registered the `@tailwindcss/vite` plugin in `vite.config.ts` and imported `index.css` from `src/main.tsx`. Also removed a dead `<script type="importmap">` pointing at `aistudiocdn.com` (an artifact of the project's original AI-Studio scaffold — Vite bundles its own copies of React/framer-motion/lucide, so this was pure dead weight).
- Result: `dist/` now emits a real, purged CSS file (~56 KB / ~9 KB gzip) instead of shipping a client-side compiler. `index.html` itself shrank too (3.71 KB → 2.06 KB) with the inline scripts gone.
- Files: `src/index.css` (new), `vite.config.ts`, `src/main.tsx`, `index.html`, `package.json`.

### 2. Thought Lab share links / browser Back-Forward didn't work

- Problem: `App.tsx` pushed a `#thought-lab` / `#thought-lab/<id>` hash onto history when navigating, but nothing ever read `location.hash` back on mount — page state was a plain `useState('home')`. Opening a copied share link, refreshing, or hitting browser Back always landed back on the homepage (the `popstate` handler unconditionally called `navigateToHome()`).
- Fix: added a `parseHash()` helper that reads `#thought-lab[/articleId]` out of the URL. `currentPage`/`selectedArticleId` now initialize from it (lazy `useState` initializer), so a direct link or refresh restores the right view immediately. The `popstate` handler now re-parses the hash and restores state instead of always bouncing home, so Back/Forward actually works. Replaced the old "push on every state change" effect (which would have double-pushed on initial mount) with explicit `history.pushState` calls inside each `navigate*` function, precisely when a navigation actually happens. An unknown/deleted article id is handled gracefully by `ThoughtLabArticlePage`'s existing "Article not found" fallback rather than by hash validation, so this doesn't need to import the Thought Lab content data (keeping it lazy-load friendly, see #5).
- Files: `src/App.tsx`.

### 3. 127 MB of uncompressed media in `public/`

- Problem: 15 video files (up to 34 MB each, several at 1080p/60fps with a multi-Mbps bitrate) and a handful of oversized photos (an 11 MB JPEG shot at 6024×4020 — far beyond anything the site ever displays it at).
- Fix: installed ffmpeg (used the copy already on this machine at `C:\ffmpeg\ffmpeg-8.1.1-full_build`, no new install needed) and batch re-encoded every project/Thought-Lab video: H.264, CRF 26, capped at 1280px width (only ever downscaling) and 30 fps, audio kept at AAC 96k where present, `+faststart` for progressive playback. Each file's re-encode was only kept if it actually came out smaller (none failed that check). Also downsized and recompressed the four oversized JPEGs (`rover.jpg`, `rick robot.jpg`, `Coverpage.jpeg`, `my_pic.jpeg`) to sane display dimensions at quality 4 (ffmpeg mjpeg scale).
- Result: **videos: 108 MB → 10 MB**. `rover.jpg` alone: 10.7 MB → 204 KB. Total `public/`: **127 MB → 17 MB** (~86% smaller), and the same drop carries through to `dist/` on every future deploy.
- Verified: `ffprobe` on the re-encoded files confirms matching durations/resolutions/codecs to the originals — nothing was truncated or corrupted.
- Files: every video under `public/projects/**` and `public/thought_lab/lcp/`, plus the four JPEGs above. No code changes needed — filenames were kept identical.

### 4. Broken/placeholder social meta tags, missing favicon/robots/sitemap

- Problems in `index.html`: `og:image` was the literal, un-interpolated string `${import.meta.env.BASE_URL}logo.png` (Vite doesn't process JS template syntax inside static HTML), `twitter:image` pointed at a random `picsum.photos` stock photo, `og:url` claimed `kaveesha.github.io` while the actual git remote is `KD-27/portfolio` (→ `kd-27.github.io`), there was no `<link rel="icon">` at all, no canonical URL, and no `robots.txt`/`sitemap.xml`. The meta `description` also still claimed "Swarm Intelligence" as a specialization, which no longer maps to anything on the site now that the Swarm demo is gone.
- Fix: `og:image`/`twitter:image` now both point at the real, absolute `https://kd-27.github.io/portfolio/logo.png`; `og:url` and a new `<link rel="canonical">` use the correct `kd-27.github.io` domain; added `<link rel="icon" type="image/png" href="/logo.png">` (verified it correctly resolves to `/portfolio/logo.png` in the production build via Vite's base-path rewriting); dropped the unsubstantiated "Swarm Intelligence" claim from the description; added `public/robots.txt` (allow-all, points at the sitemap) and `public/sitemap.xml` listing the site root; removed the unused leftover `public/vite.svg`.
- Files: `index.html`, `public/robots.txt` (new), `public/sitemap.xml` (new).

### 5. No code splitting for the Thought Lab route

- Problem: `App.tsx` statically imported `ThoughtLabPage` and `ThoughtLabArticlePage`, so their code — plus everything they pull from `constants.ts` (all Thought Lab article bodies) — shipped in the single main bundle even for visitors who never open Thought Lab.
- Fix: converted both to `React.lazy()` imports with a `Suspense` boundary (simple spinner fallback) wrapping `renderPage()` in `App.tsx`.
- Result: `ThoughtLabPage`, `ThoughtLabArticlePage`, and the shared `thoughtLabIcons` util now build as separate chunks (~6 KB, ~12 KB, ~3 KB) pulled in only on navigation; the main bundle dropped from 409.63 KB to 391.31 KB.
- Files: `src/App.tsx`.

### Verification

`npx tsc -b`, `npm run lint`, and `npx vite build` all pass clean. Final `dist/` size: ~18 MB, down from the ~128 MB it would have been before this pass (dominated by the media fix).

**Note:** ffmpeg was briefly installed system-wide via `winget` before discovering an existing install on this machine (`C:\ffmpeg\ffmpeg-8.1.1-full_build`) — the winget copy was uninstalled again immediately, and the pre-existing install was used for all the compression work above. No lasting system changes were made outside this repo.
