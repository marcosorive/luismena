# Astro Migration Plan

Status: completed
Scope: original `frontend/` application; the finished Astro site now lives at the repository root and the unused `backend/` Strapi application was removed.
Goal: replace the Next.js 12 frontend with an Astro static site without changing the public URLs or visible behavior.

Historical note: paths below describe the repository before the migration and before the root-level restructure.

## 1. Current State

The frontend is a Next.js 12 / React 17 static site:

- `frontend/pages/index.tsx`: home page with an autoplaying image slider and footer social links.
- `frontend/pages/[slug].tsx`: generated portfolio pages from `utils/content.ts`, with an image gallery and `fslightbox-react` lightbox.
- `frontend/pages/contacto/index.tsx`: contact page with a Web3Forms form.
- `frontend/pages/contacto/success/index.tsx`: form success page.
- `frontend/pages/404.tsx` and `frontend/pages/500.tsx`: error pages.
- `frontend/pages/api/hello.ts`: unused example API route.
- `frontend/pages/_app.tsx` and `_document.tsx`: global layout, metadata, and navigation.
- Components: `Layout`, `Navbar`, `ImageSlider`, `ImageGallery`, `Image`, `Button`, `RegalaLuzHeader`, icons, and social logos.
- Styling: global CSS plus SCSS modules (`*.module.scss`).
- Data: the active source is `frontend/utils/content.ts` (about 4,200 lines), exposed through the synchronous `fetchAPI()` helper. The Strapi backend is not currently called. `getStaticPaths` has an existing type mismatch that should be fixed during migration.
- Tests: Jest and React Testing Library for `Button`, `Image`, and `ImageGallery`.
- CI: `.github/workflows/build-test-fe.yml` runs `npm ci` and `npm test` on Node 16.17.1.
- Environment: `NEXT_PUBLIC_FORM_API_KEY` is used by the contact form. `frontend/.env.example` currently lists `API_URL` and `FORM_API_KEY`, which do not match the code.

Next.js-specific behavior that must be replaced: `getStaticProps`, `getStaticPaths`, `next/head`, `next/link`, `useRouter`, and the API route.

### Security issue to address first

`frontend/cloudunary.mjs` contains hard-coded Cloudinary credentials. Rotate the Cloudinary API key/secret immediately, remove the file or move the values to environment variables, and confirm the secret is not reused elsewhere. `frontend/Untitled-1.yml` is stale Cloudinary API output and can be deleted.

## 2. Target State

Use Astro's default static output (`output: 'static'`), which matches the current SSG behavior. The finished Astro app lives at the repository root; the unused `backend/` application was removed.

Recommended approach: migrate to Astro with React integration for the two genuinely interactive pieces (slider and lightbox) first, then optionally remove React and the legacy slider/lightbox libraries in a follow-up. This gets to behavior parity quickly while still removing Next.js entirely.

Target structure:

```text
.
  astro.config.mjs
  package.json
  tsconfig.json
  public/
  src/
    pages/
      index.astro
      [slug].astro
      contacto/
        index.astro
        success.astro
      404.astro
    layouts/
      BaseLayout.astro
    components/
      Navbar.astro
      Image.astro
      ImageGallery.astro
      ImageSlider.tsx        # temporary React island, if needed
      RegalaLuzHeader.astro
      Button.astro
      icons/
      resources/
    data/
      content.ts
    lib/
      api.ts
      utils.ts
    entities/
      index.ts
    styles/
      globals.css
      page.module.scss
```

Recommended Astro configuration:

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://www.estudioluismena.com',
  output: 'static',
  integrations: [react()],
});
```

Pin the latest stable Astro version at implementation time rather than copying a version from this plan. Update `package.json` engines and CI to a supported LTS Node version (Node 20 or 22); Node 16 is too old for current Astro releases.

## 3. Route and File Mapping

| Next.js | Astro | Notes |
| --- | --- | --- |
| `pages/_app.tsx` + `_document.tsx` | `src/layouts/BaseLayout.astro` | HTML shell, `<head>`, title/OG metadata, navbar, slot |
| `pages/index.tsx` | `src/pages/index.astro` | Home slider and footer |
| `pages/[slug].tsx` | `src/pages/[slug].astro` | `getStaticPaths()` from local pages data |
| `pages/contacto/index.tsx` | `src/pages/contacto/index.astro` | Contact form |
| `pages/contacto/success/index.tsx` | `src/pages/contacto/success.astro` | Preserve `/contacto/success` |
| `pages/404.tsx` | `src/pages/404.astro` | Astro/static-host 404 |
| `pages/500.tsx` | Remove or host-specific | A static site has no runtime 500 page; verify host support before keeping it |
| `pages/api/hello.ts` | Delete | Unused; no Astro API route is needed for a static build |
| `components/layout` | `layouts/BaseLayout.astro` | Remove `next/head` and `useRouter` |
| `components/navbar` | `components/Navbar.astro` + small script | Server-render active link; vanilla JS for mobile menu |
| `components/imageSlider` | `components/ImageSlider.tsx` island | Temporary React island; replace with a framework-agnostic slider if practical |
| `components/imageGallery` | `components/ImageGallery.astro` | Render grid server-side; move lightbox to a small island or vanilla library |
| `components/image` | `components/Image.astro` | Static markup; keep lazy loading and orientation class logic |
| `components/button` | `components/Button.astro` | Static; remove if no longer used after conversion |
| `components/regalaLuzHeader` | `components/RegalaLuzHeader.astro` | Special page header |
| `components/icons`, `resources` | `.astro` SVG components or inline SVG | No React needed |
| `constants/index.tsx` | `src/data/navigation.ts` and `src/lib/specialPages.ts` | Replace JSX element map with Astro conditionals |
| `utils/content.ts`, `utils/api.ts`, `utils/utils.tsx` | `src/data/content.ts`, `src/lib/*.ts` | Keep local content as the default source |
| `Entities/index.ts` | `src/entities/index.ts` | Reuse existing types; add a `HomePage` type |
| `styles/*` | `src/styles/*` | CSS module imports continue to work in `.astro` files |
| `next.config.js`, `next-env.d.ts`, `pages/_app.tsx`, `pages/_document.tsx` | Delete after parity | Next-specific |
| `jest.config.js`, `jest.setup.js` | `vitest.config.ts` + test setup | Migrate to Vitest |

## 4. Migration Phases

### Phase 0: Baseline and preparation

- Create a migration branch.
- Capture the current site at desktop and mobile widths: home, each portfolio page, contact, success, 404, and the mobile navigation overlay.
- Record current build output and test results.
- Rotate the Cloudinary credentials and remove the exposed secret.
- Decide the hosting target. It affects the 500 page, redirect behavior, trailing slashes, and environment variable setup.
- Confirm whether local content remains the source of truth or whether Strapi will be used again during/after the migration.

Exit criteria: baseline screenshots, a known-good build, a hosting decision, and no active secret in the repository.

### Phase 1: Scaffold Astro alongside Next.js

- Add Astro, the React integration, and required type/test dependencies.
- Create `astro.config.mjs` and a new `tsconfig.json` using Astro's strict base config.
- Keep the existing Next.js scripts temporarily as `dev:next` / `build:next`.
- Add temporary Astro scripts: `dev`, `build`, `preview`, `check`, `test`.
- Add a minimal `BaseLayout.astro` and home page to prove the toolchain works.
- Do not run `npm create astro` directly over the existing frontend; create the config manually or scaffold in a temporary directory and copy only what is needed.

Exit criteria: `npm run dev` serves an Astro page and `npm run build` produces `dist/`.

### Phase 2: Shared layout, styles, data, and navigation

- Move `styles/` into `src/styles/` and import the global stylesheet once in `BaseLayout.astro`.
- Move content, entities, and utility modules into `src/` without rewriting the data yet.
- Replace `fetchAPI(path)` with typed helpers such as `getPages(): Page[]` and `getHomePage(): HomePage`. This removes the `unknown` return type and the existing `getStaticPaths` type error.
- Implement `BaseLayout.astro`:
  - `<html lang="es">`
  - title logic: page title + `- Estudio Luis Mena`, falling back to `Estudio Luis Mena`
  - description, viewport, robots, and Open Graph tags
  - navigation links built from fixed links plus portfolio pages
- Convert `Navbar` to an Astro component:
  - compute the active link from `Astro.url.pathname`
  - use `<a>` tags, not `next/link`
  - add a small vanilla script for the mobile overlay open/close state
  - use a `<button>` for the hamburger control and keep the existing class names/styles

Exit criteria: shared layout and navigation render identically, including the mobile menu and active link state.

### Phase 3: Static pages

- Migrate home, contact, success, and 404 pages to `.astro`.
- Home: render the slider island (`client:load` because it is above the fold) and the footer with converted social SVG components.
- Contact: keep the external Web3Forms POST. Replace `process.env.NEXT_PUBLIC_FORM_API_KEY` with `import.meta.env.PUBLIC_FORM_API_KEY`.
- Build the form redirect target from `Astro.site` (for example, `new URL('/contacto/success', Astro.site).href`) or set it client-side from `window.location.origin`. Verify the production redirect carefully.
- Update `.env.example` to `PUBLIC_FORM_API_KEY=` and remove or rename the unused `API_URL`/`FORM_API_KEY` entries.
- Success and 404 pages should use the shared layout and fetch the same navigation data.
- Delete `pages/api/hello.ts`; it is unused and static Astro does not need it.
- Decide whether to keep a 500 page. If the hosting target cannot serve a custom static 500 page, document that and remove `500.astro`.

Exit criteria: all static routes match the baseline, including metadata and the contact form redirect.

### Phase 4: Dynamic portfolio pages

- Implement `src/pages/[slug].astro` with `getStaticPaths()` using `getPages()`.
- Return `{ params: { slug } }` for every page and pass the page object as a prop.
- Use a non-fallback static model, equivalent to Next's `fallback: false`.
- Reproduce:
  - title
  - description
  - gallery images
  - lightbox sources and alt text
  - special `regala-luz` header
- Replace the `pageToSpecialComponent` JSX map with a simple Astro conditional or a map of component references.
- Add a typed `HomePage` entity and remove remaining `props: any` usage where possible.

Exit criteria: every current portfolio URL is generated at build time with the same content and order.

### Phase 5: Interactive components

Slider:

- First choice: keep `ImageSlider` as a React island while confirming the package works with the required React version. `react-awesome-slider` is old and should be treated as a migration risk.
- If it is incompatible or unstable, replace it with a framework-agnostic slider (for example Swiper) or a small Astro component with vanilla JS.
- Preserve the 5-second autoplay, no bullets, full-parent layout, and first-image rendering.
- Add `prefers-reduced-motion` handling to disable autoplay when requested.

Gallery and lightbox:

- Render the gallery grid in Astro from the page images.
- Add a small client script using a vanilla lightbox library, or keep a single React island around the gallery/lightbox during the first pass.
- Preserve image indexes, alt text, click behavior, and responsive grid CSS.
- Avoid loading the lightbox library until the user interacts with an image if using a vanilla solution.

Images:

- Convert `Image` to an Astro component and preserve:
  - default `loading="lazy"`
  - horizontal/vertical class selection
  - explicit `size` format selection
- Add `width` and `height` attributes where available. Consider `decoding="async"` and `fetchpriority="high"` only for the home hero image.
- Keep Cloudinary URLs as-is initially; do not add Astro image optimization until remote image handling and build cost are evaluated.

Icons and logos:

- Convert TSX SVG components to `.astro` components or inline SVG. They have no state and do not need React.

Exit criteria: slider, mobile navigation, gallery lightbox, and form work on desktop and mobile.

### Phase 6: Tests and CI

- Replace Jest with Vitest.
- Use `getViteConfig` from Astro, jsdom, and Testing Library for any remaining React islands.
- Configure Vitest CSS modules so tests that assert class names see stable names, or update those tests to assert behavior instead of hashed CSS class names.
- Keep unit coverage for pure logic: page lookup, slider mapping, image format selection, and special page selection.
- Add Astro component tests with the installed Astro version's container API if available; otherwise cover `.astro` components through Playwright.
- Add Playwright smoke tests for:
  - home page and slider rendering
  - navigation and mobile overlay
  - a generated portfolio page
  - gallery lightbox open/close
  - contact form fields and success redirect
  - 404 page
- Update `.github/workflows/build-test-fe.yml`:
  - Node 20 or 22
  - `npm ci`
  - `npm run check`
  - `npm test`
  - `npm run build`
  - optional separate Playwright job
- Add `@astrojs/check` and TypeScript as dev dependencies if `astro check` is used.

Exit criteria: CI builds the Astro site and all unit/e2e smoke tests pass.

### Phase 7: Cutover, cleanup, and deployment

- Remove Next.js files and dependencies: `next`, `react` only if no islands remain, `react-dom`, `eslint-config-next`, `next-env.d.ts`, `next.config.js`, `pages/_app.tsx`, `pages/_document.tsx`, and the Next-specific Jest files.
- Remove `cloudinary` and `cloudunary.mjs` if they are no longer used; remove stale `Untitled-1.yml`.
- Update `README.md` with Astro commands and deployment instructions.
- Verify the `dist/` output, route list, and asset paths against the hosting configuration.
- Deploy to a preview URL, compare against baseline screenshots, and run the smoke tests against the preview.
- After approval, switch production to the Astro build and keep the previous deployment available for rollback.

Exit criteria: production serves the Astro build with no Next.js runtime or build dependency, and rollback is documented.

## 5. Testing and Tooling Details

Suggested package scripts after cutover:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  }
}
```

TypeScript:

- Extend an Astro strict config.
- Move `Entities` to a normal `.ts` module (not `.tsx`, since it contains only types).
- Use path aliases such as `@/*` mapped to `src/*` if they simplify imports; update tests and config accordingly.

Styling:

- Astro supports SCSS modules and `import styles from './x.module.scss'` in `.astro` frontmatter.
- Import `globals.css` once in the base layout.
- Keep existing component class names to minimize visual regressions.
- Verify the installed Sass version with Astro; upgrade Sass if the current version triggers legacy API warnings or errors.

Static assets and routing:

- Move `public/favicon.ico` and `public/robots.txt` unchanged.
- Confirm whether the host expects trailing slashes. Astro's default behavior may differ from Next.js; explicitly configure `trailingSlash` if needed.
- The generated portfolio pages must match the current slug list exactly.

Environment and deployment:

- Astro exposes only variables prefixed with `PUBLIC_` to client code.
- Set `PUBLIC_FORM_API_KEY` in the deployment environment before building; otherwise the static form will ship with an empty key.
- Set `site` in `astro.config.mjs` so canonical URLs, Open Graph URLs, and the form redirect are absolute.
- Static output is `dist/`. Configure the host to build with `npm run build` and serve that directory.
- If deploying to GitHub Pages, add `base`/`site` configuration and verify asset paths. If deploying to Vercel/Netlify, verify the 404 page and redirect behavior.

## 6. Risks and Mitigations

| Risk | Mitigation |
| --- | --- |
| `react-awesome-slider` is unmaintained or incompatible with the React version required by Astro | Spike it early; fall back to Swiper or a small vanilla slider |
| `fslightbox-react` behaves differently or adds unnecessary hydration | Prefer a vanilla lightbox during migration; otherwise isolate it in one `client:visible` island |
| CSS module class names differ in tests | Configure Vitest's CSS module strategy or assert behavior/data attributes instead |
| Node 16 in CI is unsupported by current Astro | Upgrade CI to Node 20/22 and regenerate the lockfile |
| Contact form key is missing at build time | Set `PUBLIC_FORM_API_KEY` in the deploy environment and add a build/preview check |
| Dynamic route parity is broken by data typing or slug changes | Generate and compare the complete route list against the current site |
| Static hosting has no equivalent custom 500 page | Confirm host behavior; remove the page or configure the host-specific error document |
| Hard-coded Cloudinary secret | Rotate it immediately and remove the script/credentials from the repository |
| Trailing slash or redirect differences after deploy | Test preview URLs, configure `trailingSlash`, and verify the form redirect |
| Astro version upgrades change APIs | Pin the exact Astro version in `package.json` and update intentionally |

## 7. Acceptance Checklist

- [ ] `/`, `/contacto`, `/contacto/success`, `/404`, and every portfolio slug are generated.
- [ ] Page titles, descriptions, and Open Graph tags match or improve on the current output.
- [ ] Desktop and mobile navigation match, including the active link and overlay menu.
- [ ] Home slider auto-advances every 5 seconds and renders correctly before hydration.
- [ ] Portfolio pages render the same images in the same order.
- [ ] Gallery images open the lightbox at the correct index.
- [ ] The `regala-luz` special header still renders.
- [ ] The contact form posts to Web3Forms with the key from `PUBLIC_FORM_API_KEY` and redirects to `/contacto/success`.
- [ ] `astro check`, unit tests, e2e smoke tests, and `astro build` pass in CI.
- [ ] No Next.js runtime, config, or dependency remains in the frontend.
- [ ] The exposed Cloudinary credential has been rotated and removed.
- [ ] The deployed preview has been compared against the baseline screenshots.

## 8. Rollback Plan

- Keep the migration on a branch until the preview passes the acceptance checklist.
- Do not delete the Next.js files until the Astro preview is approved.
- Keep the previous production deployment available.
- If a post-cutover regression appears, redeploy the previous Next.js build while the Astro issue is investigated.
- After cleanup, rollback is a normal `git revert` of the cutover commit followed by a redeploy.

## 9. Open Decisions

1. Should React remain only for the slider/lightbox, or should the target be zero React?
2. Which hosting platform is used, and does it support a custom static 500 page?
3. Is local `content.ts` the long-term content source, or should the Astro site read from Strapi?
4. Should the contact form redirect use the configured production site URL or the visitor's current origin?
5. Is it acceptable to drop the 500 page for a static deployment?
