# 1. Pin TypeScript below 7 and ESLint below 10

## Status

Accepted

## Context

Commit `2adfa16` found that `pnpm build`, `pnpm lint`, `pnpm type-check`, and `pnpm test`
were all silently broken across the repo, almost certainly from a run of Dependabot's
weekly `weekly-updates` group (which bundles every npm dependency, including majors, into
a single PR). Two of the breakages were toolchain-wide rather than fixable at the
config level:

- **TypeScript 7.0.2** — `typescript-eslint` 8.67.0 (the newest release at the time)
  hard-crashes on TypeScript >=7 by design. See
  [typescript-eslint/typescript-eslint#10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940)
  and [#12518](https://github.com/typescript-eslint/typescript-eslint/issues/12518).
  Five different pnpm peer-override mechanisms were tried; none redirect the parser's
  internal `require("typescript")` away from the hoisted 7.x install.
- **ESLint 10.8.1** — `eslint-plugin-react` 7.37.5 (bundled transitively by
  `eslint-config-next` and used by `@repo/eslint-config`'s `react-internal` preset)
  only supports ESLint up to `^9.7` and crashes on the `context.getFilename()` API
  removed in ESLint 10.

Both were rolled back (`typescript@6.0.3`, `eslint@9.39.5`) across every workspace that
declares them. That fix only lives in `package.json` version ranges, which Dependabot's
weekly group — `patterns: ['*']`, `update-types: [minor, patch, major]` — does not
respect. Left alone, the very next scheduled run re-bumps both packages and silently
re-breaks the same four gates.

## Decision

Add `ignore` entries for `typescript` (`>=7`) and `eslint` (`>=10`) to the npm
`package-ecosystem` block in `.github/dependabot.yml`, so Dependabot stops proposing
those majors regardless of what the weekly group would otherwise bundle.

## Consequences

- Dependabot will still propose patch/minor updates within TypeScript 6.x and
  ESLint 9.x.
- This pin needs to be revisited (and the `ignore` entries removed) once
  `typescript-eslint` ships a release that tolerates TypeScript 7, and once the
  ESLint 10 ecosystem (`eslint-plugin-react`, `eslint-config-next`) catches up. Check
  the linked upstream issues before removing.
- Whoever removes this pin should re-run the same verification `2adfa16` did: a full
  `pnpm build && pnpm lint && pnpm type-check && pnpm test` across every workspace,
  not just a version bump.
