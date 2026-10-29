# Astro Migration Progress

Last updated: 2026-10-29

## Current State

- Branch: `astro-migration` (based on `main`)
- Working tree: uncommitted changes; no commit has been made yet.
- Repository layout: single Astro application at the repository root; `frontend/` and `backend/` no longer exist.
- Migration plan: `astro-migration.md`
- Frontend stack:
  - Astro `7.3.8`
  - `@astrojs/react` `6.0.6`
  - React `18.3.1`
- Output: static Astro site
- Node used locally: `v22.15.0`, npm `10.9.2`
- `npm run check`: **passes** (36 files, 0 errors, 0 warnings)
- `npm test`: **passes** (3 files, 13 tests)
- `npm run build`: **passes** (7 pages generated)
- `npm audit`: **1 low severity** (`esbuild`; Windows dev-server-only advisory)

Generated routes:

- `/`
- `/contacto`
- `/contacto/success`
- `/regala-luz`
- `/mundo-pequeno`
- `/gastronotuya`
- `/404.html`

## Completed

- Created migration plan in `astro-migration.md`.
- Created and switched to branch `astro-migration`.
- Deleted the unused `backend/` Strapi application.
- Moved the Astro frontend from `frontend/` to the repository root.
- Updated CI, README, and ignore files for the root-level layout.
- Moved frontend source into `src/`:
  - `components`
  - `Entities`
  - `utils`
  - `constants`
  - `styles`
  - `resources`
- Removed Next.js-specific files/configuration:
  - `pages/`
  - `next.config.js`
  - `next-env.d.ts`
  - `jest.config.js`
  - `jest.setup.js`
  - `.eslintrc.json`
  - `Untitled-1.yml`
  - `components/layout/`
  - `components/navbar/index.tsx`
- Deleted `cloudunary.mjs` because it contained hard-coded Cloudinary credentials.
- Rewrote `package.json` for Astro + Vitest.
- Added:
  - `astro.config.mjs`
  - `src/env.d.ts`
  - `vitest.config.ts`
  - `vitest.setup.ts`
- Updated `tsconfig.json` for Astro.
- Updated `.env.example` to use `PUBLIC_FORM_API_KEY=`.
- Reinstalled dependencies with a fresh `node_modules` and `package-lock.json`.
- Migrated data types:
  - Added `HomePage`.
  - Made `ImageFormat.name` and `ImageFormat.provider_metadata` optional.
- Updated local content helpers:
  - `src/utils/content.ts` uses `HomePage` and `Page[]`.
  - `src/utils/api.ts` now has typed `getPages()` and `getHomePage()`.
- Simplified:
  - `src/constants/index.tsx` to `FIXED_LINKS`.
  - `src/utils/utils.tsx` to `imagesToSliderImages`.
- Created Astro pages:
  - `src/pages/index.astro`
  - `src/pages/[slug].astro`
  - `src/pages/contacto/index.astro`
  - `src/pages/contacto/success.astro`
  - `src/pages/404.astro`
- Created Astro layout:
  - `src/layouts/BaseLayout.astro`
- Created Astro navbar:
  - `src/components/navbar/Navbar.astro`
- Created gallery wrapper:
  - `src/components/imageGallery/Gallery.tsx`
- Migrated React tests from Jest to Vitest:
  - `src/components/button/button.test.tsx`
  - `src/components/image/image.test.tsx`
  - `src/components/imageGallery/imageGallery.test.tsx`
- Added `@vitejs/plugin-react` dev dependency.
- Contact form uses `PUBLIC_FORM_API_KEY` and redirects to `/contacto/success`.
- Updated `.gitignore` for Astro output (`dist/`, `.astro/`) and removed Next.js/Vercel entries.
- Rewrote `README.md` for Astro, Node requirements, scripts, env vars, structure, and testing.
- Updated `.github/workflows/build-test-fe.yml`:
  - Node `22.x`
  - `actions/checkout@v4`
  - `actions/setup-node@v4` with npm cache
  - Runs `npm ci`, `npm test`, and `npm run build`
- Verified no remaining Next.js runtime/config/dependencies in the frontend.
- Upgraded Astro from `6.4.8` to `7.3.8`:
  - Removes the critical/high npm audit findings.
  - Works with local Node `22.15.0` because Astro 7.3.8 requires Node `>=22.12.0`.
  - `@astrojs/react` remains at `6.0.6`; newer `@astrojs/react` 7 requires Node `>=22.23.4`.

## Build Fix Applied

The static build originally failed during React server rendering with:

```text
Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object.
```

Cause: `fslightbox-react` and `react-awesome-slider` are CJS/UMD packages whose default export is wrapped as `{ default: Component }` under Vite SSR.

Fixed in:

- `src/components/imageGallery/Gallery.tsx`
- `src/components/imageSlider/index.tsx`

Pattern used:

```ts
const Component =
  (ComponentImport as { default?: typeof ComponentImport }).default ??
  ComponentImport;
```

## Browser Smoke Test Results

Tested against the production preview build with headless Chromium.

- All routes returned the expected status:
  - `/`, `/contacto`, `/contacto/success`, `/regala-luz`, `/mundo-pequeno`, `/gastronotuya` -> `200`
  - `/missing` -> `404`
- Page titles are generated correctly.
- Navbar renders 10 links.
- Mobile menu:
  - Opens and sets `aria-expanded="true"`.
  - Locks body scroll while open.
  - Closes and restores body scroll.
- Home slider:
  - Hydrates successfully.
  - Auto-advances after 5 seconds.
- Portfolio gallery:
  - `/regala-luz` renders 11 images.
  - Gallery hydrates when scrolled into view (`client:visible`).
  - Lightbox opens on image click.
  - Clicking the third image opens at slide `3/11`.
  - Lightbox closes correctly.
- Contact page:
  - Form renders with 5 visible fields.
  - Redirect points to `https://www.estudioluismena.com/contacto/success`.
  - `access_key` is absent locally because `PUBLIC_FORM_API_KEY` is not set.
- No console errors or failed resource requests during the smoke test, apart from the intentional `/missing` 404 navigation.

Screenshots from the smoke test were saved to `/tmp`:

- `/tmp/luismena-home.png`
- `/tmp/luismena-gallery.png`
- `/tmp/luismena-mobile-menu.png`
- `/tmp/luismena-contacto.png`

## Important Decisions / Gotchas

- Astro `7.3.8` is used instead of `6.4.8` to avoid critical/high security advisories.
- Astro `7.4.x` requires Node `>=22.23.4`, so it cannot be used with local Node `22.15.0`.
- `@astrojs/react` `6.0.6` is used with Astro `7.3.8` and React `18.3.1`; this combination passes check, tests, build, and browser smoke tests.
- `@astrojs/react` `7.x` requires Node `>=22.23.4`; revisit after upgrading Node.
- Vitest config does not use Astro's `getViteConfig` due to a Vite version type mismatch. It uses `defineConfig` from `vitest/config` with `@vitejs/plugin-react`.
- `package.json` has `"type": "module"`.
- Local npm warns that `undici@8.12.3` requires Node `>=22.19.0`; builds still work. Use a newer Node 22 LTS in CI/local.
- `npm audit` now reports only 1 low severity issue in `esbuild`.
- The legacy Strapi backend was removed. Content is local and no longer fetched from Strapi.
- `src/pages/[slug].astro` currently includes `RegalaLuzHeader` and `Gallery`.

## Remaining Work

1. Set a real `PUBLIC_FORM_API_KEY` in the deployment environment and submit the contact form once against Web3Forms.
2. Manually review the generated screenshots and compare them with baseline screenshots of the old Next.js site.
3. Confirm the static host serves Astro routes as expected (`.html` files, trailing-slash behavior, custom 404).
4. Rotate the Cloudinary credentials that were exposed in `cloudunary.mjs`.
5. Optionally upgrade Node to `>=22.23.4` and move to `@astrojs/react` 7 later.
6. Optionally address the remaining low-severity `esbuild` advisory in the Windows dev server.
7. Review `git status` and commit the migration on `astro-migration` when ready.

## Resume Commands

```bash
cd /home/marcos/projects/luismena
git status
git branch --show-current

npm run check
npm test
npm run build
npm run dev
npm run preview
```

## Useful Files

- `astro-migration.md`
- `package.json`
- `astro.config.mjs`
- `tsconfig.json`
- `vitest.config.ts`
- `vitest.setup.ts`
- `src/layouts/BaseLayout.astro`
- `src/components/navbar/Navbar.astro`
- `src/components/imageGallery/Gallery.tsx`
- `src/components/imageSlider/index.tsx`
- `src/pages/[slug].astro`
- `src/pages/contacto/index.astro`
- `src/utils/api.ts`
- `src/utils/content.ts`
- `src/Entities/index.ts`
- `.github/workflows/build-test-fe.yml`
