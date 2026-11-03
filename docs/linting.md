# Oxlint and anti-slop

`bun run lint` runs Oxlint 1.91.0. `@oxlint/plugins` is pinned to the same version. `bun run lint:fix` applies safe fixes, and `bun run format` runs Oxfmt 0.76.0. CI runs lint, formatting, tooling regression tests, type checking, and the production build.

The previous ESLint flat configuration was converted with the official `@oxlint/migrate` 1.90.0 tool. Supported rule severities and options, TypeScript file overrides, generated-file ignores, React checks, and Next.js checks were retained in `.oxlintrc.json`. Browser and Node globals use the equivalent environment presets.

## Anti-slop installation

The custom rule bundle is included at `tools/oxlint/anti-slop/`. All 18 generic custom rules and the native `oxc/no-accumulating-spread` companion rule are enabled as errors. Effect rules are not enabled because this project has no direct Effect dependency. Generated files and the vendored implementation are excluded from application lint and formatting.

The generic entry point is registered through `jsPlugins`. `tools/oxlint/package.json` supplies its ES module scope. TypeScript's `allowImportingTsExtensions` permits the bundle's explicit `.ts` imports under the existing `noEmit` configuration; the application typecheck also checks the vendored TypeScript.

The bundle's original repository and commit are unknown. [UPSTREAM.md](../tools/oxlint/anti-slop/UPSTREAM.md) records the actual local source, an exact recoverable pristine archive and its SHA-256, and the unchanged implementation. The nested ESLint Stylistic license and provenance remain beside its copied source. The bundled upstream test files were not included; local CLI tests verify that the registered plugin accepts typed code and rejects unknown inputs and returns.

## Repository cleanup

Whitespace fixes were applied separately before semantic changes; a second fix/format pass verifies stability. Cleanup removes unchecked error and DOM assertions, validates admin table cells and form strings at their boundaries, preserves exact admin-role comparisons, and replaces redundant array passes with single `flatMap` operations. DOM checks now establish `Node`/`HTMLElement` membership rather than casting event targets. The admin-data decoder has regression tests for valid rows, executable values, and missing core-value fields.

ESLint, `eslint-config-next`, their minimatch overrides, and the private legacy minimatch adapter were removed. The obsolete ESLint-specific tests were replaced by Oxlint/plugin checks. The independent esbuild override and its loader, cross-origin, and database-schema generation tests remain. Database generation checks use temporary output and an unused connection URL; they do not apply migrations.

Existing lint exceptions were translated to Oxlint's canonical rule names. No anti-slop rule was disabled or reduced in severity.

## Coverage differences

Oxlint natively handles JSX variable usage without the former `jsx-uses-react` and `jsx-uses-vars` rules. Its React Compiler checks use fixed options, so ESLint's `config` and `gating` configuration validators have no separate equivalent. `react/require-render-return` remains enabled as an error even though the migration tool classifies it as a nursery rule.

The old `react/no-deprecated` rule and Next's `no-location-assign-relative-destination` warning have no direct equivalent in this configuration. Deprecation checking would require a separate type-aware rule setup. The repository already uses Next's router for its login navigation. The migration tool also drops ESLint parser/resolver settings; Oxlint resolves TypeScript imports through `tsconfig.json`. These are explicit coverage differences, rather than a claim that every ESLint rule is identical in Oxlint.

## Verification

Run:

```sh
bun run lint
bun run format:check
bun run test:dependencies
bun run typecheck
bun run build
bun audit
bun install --frozen-lockfile --offline
```

Database generation checks write to temporary directories and do not apply migrations.
