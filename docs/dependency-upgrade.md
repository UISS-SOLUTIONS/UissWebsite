# Dependency upgrade — 3 November 2026

Versions were checked against npm's release tags. The upstream sources below cover the Next.js, Tailwind CSS, and Zod migration changes used here. NextAuth stays on the existing v5 beta line because its stable `latest` tag is v4.

## Changes that affect this repository

| Upgrade                                                  | Upstream changes and breaking behavior                                                                                                             | Repository action                                                                                                                                                                                                                                                                 |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Next.js 15 → 16                                          | Turbopack is the default builder; synchronous request APIs are removed; middleware becomes Node.js proxy; linting is separate from builds.         | Renamed `middleware.ts` and its export to `proxy.ts`/`proxy`; retained route matching and admin checks. Dynamic pages already await `params`/`searchParams`, and membership already awaits `headers()`. Keep separate lint/typecheck CI steps.                                    |
| Tailwind CSS 3 → 4                                       | Dedicated PostCSS plugin, CSS theme configuration, changed utility scales and border defaults. Requires Safari 16.4+, Chrome 111+, Firefox 128+.   | Ran the official migration tool: moved theme/plugin configuration into `app/globals.css`, changed PostCSS to `@tailwindcss/postcss`, updated utility syntax throughout templates, and retained border compatibility styles. Cleared the deleted config path in `components.json`. |
| tailwind-merge 2 → 3                                     | Version 3 targets Tailwind 4 utility conflict rules.                                                                                               | Updated alongside Tailwind; retain the existing `cn()` wrapper in `lib/utils.ts`.                                                                                                                                                                                                 |
| ESLint 8 → 10; Next lint config 15 → 16                  | Legacy eslintrc configuration is removed; Node runtime requirements increase. Next config 16.4 adds ESLint 10 support.                             | Replaced `.eslintrc.json` with `eslint.config.mjs`, importing Next's flat configurations. Added ignores for generated reports. Standardized CI on Node 24 and Bun 1.4.4.                                                                                                          |
| TypeScript 5 → 7                                         | Native compiler improves check speed but 7.0 does not expose the compiler API used by tools such as typescript-eslint.                             | Use side-by-side aliases: `typescript` resolves to `@typescript/typescript6` for programmatic consumers; `@typescript/native` resolves to TypeScript 7 and provides `tsc`. `bun run typecheck` generates Next declarations first.                                                 |
| React 19.1 → 19.3; React types 18 → 19                   | Runtime was already React 19, but old declarations hid React 19 ref typing changes.                                                                | Align both runtime packages and both type packages. Update `useClickOutside` to accept `RefObject<T \| null>`.                                                                                                                                                                    |
| Lucide 0.460 → 1                                         | Brand icon exports are removed; icons are decorative by default.                                                                                   | The footer actually imports removed `Instagram` and `Linkedin`. Preserve their existing SVG shapes in `components/social-icons.tsx`, with the original license in `docs/licenses/lucide-icons.txt`, and retain the links' accessible names.                                       |
| Motion 13 → 14                                           | Version 14 retains the existing public APIs; internal version constraints become stricter.                                                         | Keep `motion/react` imports and current `AnimatePresence`, layout, scroll, and reduced-motion APIs. Verify navigation, dialogs, marquee, and carousel with existing UI tests.                                                                                                     |
| dotenv 16 → 18                                           | Adds a CLI/optional fast parser; removes vault/preloading support; injection logs move to stderr.                                                  | Both database scripts explicitly call `config()`, so removed preloading is not used. Retain `.env.local` then `.env` precedence. Consider `quiet: true` if injection logs are undesirable.                                                                                        |
| next-cloudinary 6 → 7                                    | Requires Next 16/Node 22; removes `onUpload`, changes video player, restricts internal import paths.                                               | No source imports `next-cloudinary`: actual uploads use `fetch()` against Cloudinary, and display uses Next Image. No component rewrite is warranted. Any future widget must use `onSuccess`, not `onUpload`.                                                                     |
| Zod 3 → 4; resolvers 5 → 7                               | Zod changes error customization, record construction, and error shapes. Resolver 6 changes Effect support; resolver 7 changes TypeBox integration. | The initial upgrade required no validation rewrite. The later Oxlint migration uses Zod 4 to decode admin rows and form strings at their boundaries; resolvers remain unused. Use Zod 4's `error` customization and `.issues` for future schemas.,                                |
| Drizzle ORM 0.39 → 0.45; Kit 0.30 → 0.31; pg 8.13 → 8.23 | Updates database tooling and driver within their current API families.                                                                             | Existing `node-postgres`, pg-core schemas, query builders, and SQL migrator remain the integration points. Typecheck the schema/queries. Review generated SQL separately before applying any future schema change; this dependency update does not run database migrations.       |
| Radix primitives                                         | Recent releases improve tree-shaking, development-only checks, and nullable ref compatibility.                                                     | Keep existing per-primitive packages and wrappers. Exercise keyboard navigation, accordions, collapsibles, and focus restoration.                                                                                                                                                 |

The migrated theme uses `@theme inline` because its values reference UISS tokens and Next Font variables scoped on the body. This keeps font utilities bound to the loaded fonts rather than root-level fallbacks.

Additional reviewed updates:

- Resend 6.37 fixes attachment encoding and path validation. Membership sends text/HTML email through `resend.emails.send()` without attachments, so retain that call and its error handling.
- React Hook Form 7.91 fixes field-array and asynchronous validation behavior. Existing form wrappers do not need new APIs.
- Zustand 5.0.16 adjusts server snapshots and devtools behavior. No Zustand imports were found in application source.
- Playwright 1.64 adds WebMCP support, which these tests do not use. Refresh the managed browsers before running the existing viewport matrix.
- NextAuth beta.32 is still a prerelease; existing v5 `NextAuth()` destructuring and `getToken()` calls must stay on that API line.

## Additional migrations found during verification

- Next 16.4 blocks dev assets requested from unlisted hostnames. Playwright uses `127.0.0.1`, so `next.config.ts` explicitly allows that loopback origin. Without this, static pages render but client controls cannot hydrate correctly.
- New React lint checks require removing avoidable state updates in effects and render-time ref mutations. Reset admin navigation via a pathname key; reset blog pagination in filter events; use the active section ID as the animated label key; assign chapter refs through direct callbacks. The reading-progress heading scan keeps one documented local exception because its data is obtained from the post-hydration article DOM.
- Carousel controls now read Embla through `useSyncExternalStore`, with event cleanup for both `select` and `reInit`. Dialog portals use a server/client snapshot for hydration readiness. Components that read reduced-motion preferences share `hooks/use-reduced-motion.ts`, keeping server markup and the hydration snapshot consistent while subscribing to subsequent preference changes.
- Next type generation set `jsx` to `react-jsx` and included development route declarations in `tsconfig.json`. Login now uses Next's router for internal navigation.

## Specific follow-up recommendations

- Keep testing `/admin` redirects after future NextAuth or proxy updates. `auth.ts` intentionally rejects credential login; do not enable it as part of dependency maintenance.
- Test Tailwind changes on mobile and reduced motion, including footer brand links, FAQ disclosures, and club preview focus restoration. The browser minimums above are a real support change.
- Keep the TypeScript compatibility alias until Next tooling supports the native compiler API; reassess when that API is stable.
- Database integration and outbound email require separate checks against configured non-production services. Public fallback rendering alone does not verify SQL execution or email delivery.

## Version inventory

The following are manifest ranges before and after this update. Packages already at the current release stay unchanged; `bun.lock` records installed transitive versions.

| Package                           | Before           | After                                |
| --------------------------------- | ---------------- | ------------------------------------ |
| `@hookform/resolvers`             | `^5.9.1`         | `^7.0.2`                             |
| `@radix-ui/react-accordion`       | `^1.2.20`        | `^1.3.1`                             |
| `@radix-ui/react-avatar`          | `^1.2.6`         | `^1.3.1`                             |
| `@radix-ui/react-collapsible`     | `^1.1.20`        | `^1.2.1`                             |
| `@radix-ui/react-label`           | `^2.1.15`        | `^2.1.17`                            |
| `@radix-ui/react-navigation-menu` | `^1.2.22`        | `^1.4.1`                             |
| `@radix-ui/react-separator`       | `^1.1.15`        | `^1.2.0`                             |
| `@radix-ui/react-slot`            | `^1.1.0`         | `^1.5.0`                             |
| `class-variance-authority`        | `^0.7.0`         | `^0.7.1`                             |
| `clsx`                            | `^2.1.1`         | `^2.1.1`                             |
| `dotenv`                          | `^16.4.7`        | `^18.0.9`                            |
| `drizzle-orm`                     | `^0.39.3`        | `^0.45.4`                            |
| `embla-carousel-react`            | `^8.5.1`         | `^8.6.0`                             |
| `lucide-react`                    | `^0.460.0`       | `^1.67.0`                            |
| `motion`                          | `^13.2.0`        | `^14.9.0`                            |
| `next`                            | `15.5.23`        | `16.4.5`                             |
| `next-auth`                       | `^5.0.0-beta.26` | `^5.0.0-beta.32`                     |
| `next-cloudinary`                 | `^6.16.0`        | `^7.0.0`                             |
| `pg`                              | `^8.13.3`        | `^8.23.1`                            |
| `react`                           | `^19.1.0`        | `^19.3.1`                            |
| `react-dom`                       | `^19.1.0`        | `^19.3.1`                            |
| `react-hook-form`                 | `^7.87.0`        | `^7.91.0`                            |
| `resend`                          | `6.25.0`         | `6.37.0`                             |
| `sonner`                          | `^2.0.1`         | `^2.0.8`                             |
| `tailwind-merge`                  | `^2.5.4`         | `^3.7.0`                             |
| `tailwindcss-animate`             | `^1.0.7`         | `^1.0.7`                             |
| `zenblog`                         | `^1.2.0`         | `^1.2.0`                             |
| `zod`                             | `^3.25.76`       | `^4.6.7`                             |
| `zustand`                         | `^5.0.2`         | `^5.0.16`                            |
| `@playwright/test`                | `^1.58.2`        | `^1.64.1`                            |
| `@tailwindcss/postcss`            | `added`          | `^4.3.4`                             |
| `@types/node`                     | `^20`            | `^26.6.6`                            |
| `@types/pg`                       | `^8.11.11`       | `^8.23.1`                            |
| `@types/react`                    | `^18`            | `^19.3.0`                            |
| `@types/react-dom`                | `^18`            | `^19.3.0`                            |
| `drizzle-kit`                     | `^0.30.4`        | `^0.31.11`                           |
| `eslint`                          | `^8`             | `^10.14.0`                           |
| `eslint-config-next`              | `15.5.23`        | `16.4.5`                             |
| `postcss`                         | `^8`             | `^8.5.32`                            |
| `tailwindcss`                     | `^3.4.1`         | `^4.3.4`                             |
| `tsx`                             | `^4.19.3`        | `^4.23.15`                           |
| `typescript`                      | `^5`             | `npm:@typescript/typescript6@^6.0.2` |
| `@typescript/native`              | `added`          | `npm:typescript@^7.0.2`              |

## Dependency audit

The dependency update first patched the two remaining advisories with scoped overrides. The subsequent [Oxlint migration](linting.md) removed ESLint and its entire minimatch dependency chain, so the temporary minimatch adapter and both minimatch overrides have been deleted. The Picomatch override also became unnecessary after removing those ESLint dependencies.

The remaining `@esbuild-kit/core-utils>esbuild` override pins 0.25.12, replacing the legacy Drizzle loader's vulnerable 0.18.20 dependency. Tests verify TypeScript transformation in both module formats, cross-origin response restrictions, and repeatable generation of the real schema in a temporary directory. No live database connection is used.

`bun audit` reports no vulnerabilities; no advisory is suppressed. The historical version inventory above describes the initial upgrade. The current lint stack is Oxlint 1.91.0, matching `@oxlint/plugins` 1.91.0, and Oxfmt 0.76.0. [Migration details and coverage differences](linting.md).

## Verification

- Passed: `bun install --frozen-lockfile --offline`, `bun run lint`, `bun run typecheck`, and `bun run build` after the final code and dependency changes.
- After the Oxlint migration, all nine `bun run test:dependencies` checks pass. Schema generation uses an isolated temporary output directory; the repository's migrations stay unchanged.
- Checked the production build in Chrome: FAQ expansion, keyboard focus ring, 390px layout without horizontal overflow, mobile menu opening/closing, keyboard size selection and independent order availability, and unauthenticated `/admin` redirect to `/login`.
- Home and merchandise browser console checks reported no errors during those connected-browser checks.
- The full automated browser matrix was not completed on the final source. Automated browser launches were stopped at the user's request; final browser checks reused the existing connected Chrome tab. Firefox, WebKit, and a complete final reduced-motion automated run remain unverified.
- No live database migrations or outbound emails were performed. No database or email integration success is implied by the build checks.
