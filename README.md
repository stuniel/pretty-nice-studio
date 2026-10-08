# Pretty Nice Studio

Website for [prettynicestudio.com](https://www.prettynicestudio.com): an [Astro](https://astro.build)
static site, hosted on Cloudflare (Workers static assets).

## Develop

Requires Node 22 (see `.nvmrc`).

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run preview   # serve dist/
npx wrangler dev  # serve dist/ the way Cloudflare does (_redirects, _headers, 404)
```

## How it fits together

- **The site is one React app** (`src/app/`), ported from the original Gatsby site with its
  components, Redux state and page transitions intact. `src/app/App.jsx` is its root.
- **Astro builds the pages** (`src/pages/`). Every page renders `<App>` through
  `src/layouts/Base.astro` with `transition:persist`, so the app stays mounted across
  navigations and the transitions in `src/app/components/Transition.jsx` run as before.
- **Content** lives in `src/content/` (Markdown, schema in `src/content.config.ts`).
  `src/lib/content.ts` and `src/lib/images.ts` turn it into the data shapes the app expects.
- **Photos** live in `src/assets/sessions/<Session>/`. Session frontmatter refers to them by
  file name without extension. They are resized to AVIF/WebP/JPEG at build time.
- **Static files** (favicons, og images, `robots.txt`, `_redirects`, `_headers`) are in `public/`.

## Adding a session

1. Put the photos in `src/assets/sessions/<First_Last>/`.
2. Add `src/content/sessions/<First_Last>.md` (copy an existing one). `position` sets the
   order on the home page; `views` picks a layout `type` and the photos for each row.
3. Add the session to `SESSION_ORDER` in `src/lib/content.ts` (prev/next order).

## Deploy

`npm run deploy` builds and deploys with Wrangler (`wrangler.jsonc`). Set
`PUBLIC_CF_BEACON_TOKEN` at build time to enable Cloudflare Web Analytics.
