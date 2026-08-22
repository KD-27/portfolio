# Portfolio — Kaveesha Dhananjaya

A single-page portfolio site for a Mechatronics/Robotics engineer, built with React 19, TypeScript, and Vite, deployed to GitHub Pages at [kd-27.github.io/portfolio](https://kd-27.github.io/portfolio/).

The homepage is a stack of sections (Hero, Projects, Research, Journey, Skills, Achievements, About, Contact) plus a **Thought Lab** sub-section split into written **Perspectives** and hands-on **Built with AI** project write-ups, each with its own detail page.

## Project structure

- `App.tsx` — top-level layout; stacks the homepage sections and switches to the Thought Lab views.
- `constants.ts` — the content database: all site copy, project/research/achievement data, and Thought Lab article bodies.
- `types.ts` — the data shapes used throughout (`Project`, `ThoughtLabArticle`, `ContentBlock`, etc).
- `components/` — one component per section/page.
- `utils/` — small shared helpers (e.g. the Thought Lab icon lookup).
- `public/` — static assets (images, videos, resume) referenced from `constants.ts` via `${import.meta.env.BASE_URL}<path>`.

## Development

```bash
npm install
npm run dev      # start the Vite dev server
npm run lint      # eslint
npm run build     # type-check + production build
npm run deploy    # build and push dist/ to the gh-pages branch
```

Editing content (projects, achievements, Thought Lab articles, etc.) is done entirely in `constants.ts` — no component changes needed for text/data updates. Changes only go live after `npm run deploy`.
