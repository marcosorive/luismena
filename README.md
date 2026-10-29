# Luis Mena

Frontend of [estudioluismena.com](https://www.estudioluismena.com), built with [Astro](https://astro.build/) and React islands.

## Requirements

- Node.js >= 22.13.0
- npm

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

The development server runs at `http://localhost:4321`.

## Scripts

- `npm run dev` - start the Astro development server
- `npm run build` - type-check and build the static site into `dist/`
- `npm run preview` - preview the production build locally
- `npm run check` - run the Astro type checker
- `npm test` - run the Vitest suite once
- `npm run test:watch` - run Vitest in watch mode
- `npm run test:coverage` - run tests with coverage

## Environment variables

- `PUBLIC_FORM_API_KEY` - Web3Forms access key used by the contact form

Copy `.env.example` to `.env` and set the value locally. Variables prefixed with `PUBLIC_` are exposed to the browser.

## Project structure

```text
.
├── public/            Static assets
├── src/
│   ├── components/    Astro and React components
│   ├── constants/     Shared constants
│   ├── Entities/      TypeScript data types
│   ├── layouts/       Astro layouts
│   ├── pages/         Astro routes
│   ├── resources/     Inline SVG assets
│   ├── styles/        Global and shared SCSS modules
│   └── utils/         Content and data helpers
├── astro.config.mjs
└── vitest.config.ts
```

## Testing

Tests use Vitest and React Testing Library:

```bash
npm test
```
