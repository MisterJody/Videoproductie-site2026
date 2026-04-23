# Tasks
- [x] Task 1: Remove client-side secret injection and dead AI config
  - [x] Remove `process.env.GEMINI_API_KEY` injection from `vite.config.ts` and switch to `VITE_*` only for any future public config
  - [x] Remove Gemini-related env/example references if unused, or gate them behind a clear server-side integration path
  - [x] Re-audit `package.json` and remove unused runtime deps (e.g., `express`, `dotenv`, `@google/genai`) unless they are actually used
  - [x] Validate: `npm run build` and `npm run lint` pass; quick grep of `dist/` confirms no secret values are embedded

- [x] Task 2: Add VPS production deployment path (Docker-first) and document it
  - [x] Add a production build container recipe and a minimal runtime to serve `dist/` (static hosting)
  - [x] Provide an Nginx reverse proxy config snippet suitable for a VPS (TLS termination assumed external or via Certbot)
  - [x] Document: build/run commands, required ports, cache strategy, and where to set environment variables
  - [x] Validate: `npm run build` output serves correctly in the documented runtime

- [x] Task 3: Add baseline security headers for production
  - [x] Define a CSP compatible with YouTube embeds and required external resources (fonts if kept external)
  - [x] Add `X-Content-Type-Options`, `Referrer-Policy`, and a conservative `Permissions-Policy`
  - [x] Validate: headers are present in the deployed runtime (Docker/Nginx option)

- [x] Task 4: Improve media performance and accessibility
  - [x] Lazy-load non-critical iframes (portfolio)
  - [x] Add safer iframe attributes (`title` uniqueness, `loading`, `referrerPolicy` as applicable)
  - [x] Replace placeholder navigation `href="#"` with real section anchors to avoid accidental page jumps
  - [x] Validate: manual spot-check in `npm run dev` and `npm run preview`

- [x] Task 5: Refactor `src/App.tsx` for maintainability (no UI redesign)
  - [x] Extract translations and data arrays into separate modules
  - [x] Extract major sections into components with minimal props and consistent typing
  - [x] Validate: TypeScript build passes and UI renders unchanged

# Task Dependencies
- Task 3 depends on Task 2 (choose where headers are applied)
