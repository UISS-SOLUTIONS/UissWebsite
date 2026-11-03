# Anti-slop provenance

This rule bundle was copied on 3 November 2026. Its original repository and source revision were not recorded.

- Upstream repository: unknown; this bundle does not identify a canonical repository.
- Source commit: unknown; the source directory had no Git metadata.
- Recoverable pristine source: `UPSTREAM.snapshot.tar.gz` in this directory, containing the exact copied assets before repository metadata was added.
- Snapshot SHA-256: `188dbbc2a33b4fc94f75a47d46b29866bc20148319aae33f3032968b74f0acf5`.
- Generic entry point: `tools/oxlint/anti-slop/index.ts`.
- Effect entry point: copied as part of the bundle, but not registered because this project does not directly depend on Effect.
- Local implementation deviations: none. The snapshot and this provenance record are repository metadata; rule sources are unchanged.
- Nested ESLint Stylistic provenance and license remain in `vendor/eslint-stylistic/UPSTREAM.md` and `LICENSE`.

Both `oxlint` and `@oxlint/plugins` are pinned to 1.91.0. All generic rules and `oxc/no-accumulating-spread` are enabled as errors. The vendored plugin is excluded from application lint and formatting.
