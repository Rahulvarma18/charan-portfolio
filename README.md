# Charan — Motion Designer Portfolio

Converted from the original Lovable/TanStack Router project to a plain **Vite + React + Tailwind CSS v4** app.

## Setup

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/
    ShowreelIntro.jsx   9s animated cinematic intro (auto-hides after first load)
    Navbar.jsx           Brand + nav links (Work / About / Contact / Reel)
    FilmStack.jsx        Rotating full-bleed background images + haze/grain overlay
    About.jsx            Manifesto headline ("Design motion with intent")
    Contact.jsx          Age / experience line
    Work.jsx             Thumbnail grid for switching the active project
  data/
    media.js             Image URLs + project labels — swap these for your own assets
  App.jsx                 Top-level composition + intro/load timing
  index.css               Tailwind import + all bespoke animation/layout CSS
```

## Replacing the images

`src/data/media.js` currently points at the placeholder image URLs from the
original site. To use your own:

1. Drop your images into `src/assets/`.
2. Import them at the top of `media.js`, e.g.
   ```js
   import afterEffects from "@/assets/after-effects-workspace.jpg";
   ```
3. Use the imported variables in the `films` array instead of the URL strings.

## Notes on styling

Most of the layout is intentionally kept as hand-written CSS in `src/index.css`
rather than Tailwind utility classes. The site relies on multi-stage 3D
`transform`/`clip-path` keyframe animations (the intro reel) and viewport-based
`clamp()` typography that don't translate cleanly into single-purpose utility
classes — trying to force them into Tailwind would make the animation timing
harder to read and maintain. Tailwind is wired up via `@import "tailwindcss"`
and is ready to use for any new components you add.
