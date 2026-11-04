# UissWebsite

This repository powers the official UISS website, a platform dedicated to showcasing the achievements, projects, and mission of UISS—where innovation meets opportunity.
With a focus on real-world projects in AI, software development, UI/UX design, and networking, the website offers a space for sponsors and industry partners to connect with talented ICT students and witness our commitment to advancing technology and education.
Through this website, we aim to foster lasting partnerships and provide sponsors with a clear view of UISS’s impact, growth, and potential, while highlighting opportunities for collaboration and support.

## Development

Follow [the public interface design guide](DESIGN.md) for the light theme, shared components, typography, and interaction behavior.

Use Node.js 24 or newer and Bun 1.4.4.

```sh
bun install --frozen-lockfile
bun run dev
```

Run `bun run typecheck`, `bun run lint`, and `bun run build` before submitting changes. Run browser checks with `bunx playwright install` followed by `bun run test:ui`.

Linting uses Oxlint with vendored anti-slop rules. Run `bun run lint:fix` for safe lint fixes, `bun run format` for formatting, and `bun run test:dependencies` for tooling regression checks. See [the linting guide](docs/linting.md) for configuration and migration details.

See [the dependency upgrade notes](docs/dependency-upgrade.md) for version changes, breaking changes, and compatibility decisions.

## Pre-commit checks

In a Git checkout, `bun install` runs `prepare` to activate Husky automatically. Run `bun run prepare` once if dependencies were installed before Git was available.

Each commit formats staged files with Prettier through lint-staged, then runs `bun run typecheck` and `bun run test:dependencies`. Any failing step stops the commit. Generated files and assets follow the existing Oxfmt exclusions. Prettier uses the same 100-column width and trailing commas as the current Oxfmt setup; `bun run format` remains available for whole-project formatting.

A downloaded folder without `.git` can hold this configuration, but cannot run Git hooks until it is a Git checkout.

See [the code organization guide](docs/code-structure.md) for action, route and shared-service responsibilities.
