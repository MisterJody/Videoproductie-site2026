# Code Audit & VPS Deployment Hardening Spec

## Why
The current app needs a focused audit and a small set of changes to be safer, more maintainable, and straightforward to deploy on a VPS for production use.

## What Changes
- Remove secret injection into the browser bundle (notably `GEMINI_API_KEY`) and formalize public vs private configuration.
- Reduce risk and bloat by removing unused runtime dependencies and dead configuration paths.
- Add a reproducible production deployment path for a VPS (Docker-first, with an Nginx reverse-proxy option).
- Improve performance and accessibility of embedded media (lazy-loading, better iframe attributes, and safer defaults).
- Refactor the single large UI module into smaller units to improve maintainability without changing the design.

## Impact
- Affected specs: configuration management, security posture, deployment packaging, frontend performance, code organization
- Affected code: `vite.config.ts`, `package.json`, `README.md`, `src/App.tsx`, `index.html`

## ADDED Requirements

### Requirement: No Secret Exposure
The system SHALL NOT embed private secrets into browser-delivered assets (JavaScript/CSS/HTML) during build or runtime.

#### Scenario: Production build without secrets
- **WHEN** the production build is created
- **THEN** the output bundle SHALL NOT contain any secret values (e.g., `GEMINI_API_KEY`)

### Requirement: VPS Deployable Build
The system SHALL provide a reproducible production deployment method suitable for a VPS.

#### Scenario: Docker-based deployment
- **WHEN** a user runs a documented Docker build and container run command
- **THEN** the site SHALL serve the built assets successfully on an HTTP port suitable for reverse-proxying

#### Scenario: Nginx reverse proxy
- **WHEN** the site is served behind Nginx on a VPS
- **THEN** the documentation SHALL include a working Nginx server block with appropriate caching and security headers

### Requirement: Production Security Headers
The system SHALL provide a production configuration that sets baseline security headers via the reverse proxy and/or the app server.

#### Scenario: Browser request
- **WHEN** the browser requests the site root
- **THEN** responses SHALL include baseline security headers (at minimum: `Content-Security-Policy` appropriate for YouTube embeds, `X-Content-Type-Options`, `Referrer-Policy`)

### Requirement: Media Performance Baseline
The system SHALL minimize initial load impact from embedded media.

#### Scenario: Initial page load
- **WHEN** the landing page renders initially
- **THEN** non-critical iframes (portfolio embeds) SHALL be lazy-loaded

## MODIFIED Requirements

### Requirement: Environment Configuration
Public (client) configuration SHALL use Vite’s `import.meta.env` with `VITE_`-prefixed variables only, and private configuration SHALL remain server-side only.

## REMOVED Requirements

### Requirement: Gemini API Key Usage In Client
**Reason**: Shipping a Gemini API key to the browser is insecure and unnecessary for the current landing-page functionality.
**Migration**: If Gemini features are reintroduced, use a server-side API route/proxy and keep secrets on the server (or use a managed secret store).
