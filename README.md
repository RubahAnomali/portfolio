# Portfolio

The personal portfolio of **RubahAnomali**: web and game developer, cyber security student. A single page of full-screen slides, with dark and light themes, an animations switch, and four games you can play in the browser.

**Live site: [rubahanomali.vercel.app](https://rubahanomali.vercel.app)**

Built with React 19, TypeScript and Vite. No UI library: the layout, motion and 3D map are plain CSS and SVG.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type check + production bundle in dist/
npm run lint
```

## Where to change things

Everything you read on the site lives in [`src/data/site.ts`](src/data/site.ts): the profile and bio, social links, projects, updates, skills and the build log. Styles are in `src/styles/index.css`.

Media for the games is in `public/media/games/` (one screenshot and one short clip per game, set through `image` and `video` in `site.ts`). The share-preview image is `public/og.jpg` (1200×630), referenced from the meta tags in `index.html`.

## Hosting

The site is deployed on Vercel from this repository: every push to `main` builds and publishes it. The games are already built into `public/games/`, so the host only runs `npm run build`.

## The games

Four games are playable from the Projects slide. Each one is its own repository:

- [Breach Protocol](https://github.com/RubahAnomali/breach-protocol): turn-based tactics
- [Cyber-Parry Arena](https://github.com/RubahAnomali/cyber-parry-arena): top-down arena action
- [Kinetic Courier](https://github.com/RubahAnomali/kinetic-courier): first-person grapple-hook time trial
- [Slingshot Salvage](https://github.com/RubahAnomali/slingshot-salvage): orbital physics

Their production builds are copied into `public/games/<name>/` so the site can host them. To refresh them, clone the four repos into a folder named `game dev porto/` next to `package.json` and run:

```bash
npm run sync:games
```

## Live updates

The Updates slide reads the latest public repositories from the GitHub API and falls back to the list in `site.ts` when offline or rate-limited.

## Motion and accessibility

- The nav has an **Animations** switch. Turning it off stops the page transitions, the hero clips and the entrance effects.
- The first visit follows the system "reduce motion" setting.
- The page moves one slide per wheel tick, arrow key or Page key, and all slides stay reachable from the nav.
- At 960 px wide or less the page scrolls normally.

## Project layout

```
src/
  components/    nav, side strip, frame, overlay, clip player, slides in sections/
  hooks/         page flow, active slide, URL hash, theme, GitHub feed
  data/site.ts   all content
  styles/        design tokens and every slide's styles
public/
  games/         built games
  media/games/   screenshots and clips
scripts/         sync-games.mjs
```
