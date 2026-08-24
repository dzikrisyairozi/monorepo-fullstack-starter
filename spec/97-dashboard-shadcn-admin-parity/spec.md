# Spec: Dashboard — shadcn-admin Parity + AI-Native Chat Surface

**Issue:** [#97](https://github.com/dzikrisyairozi/monorepo-fullstack-starter/issues/97)
**Slug:** `97-dashboard-shadcn-admin-parity`
**Status:** Draft — awaiting approval
**Date:** 2026-08-24

---

## Assumptions

These were confirmed with the user before this spec was written. Anything not on this
list was inferred from the codebase; correct it now rather than during implementation.

1. **Auth is mocked.** No backend work. A zustand `auth-store` holds a fake token in a
   cookie; the `_authenticated` route guard redirects to `/sign-in` when it's absent.
   No Clerk, no `apps/api` changes, no `@repo/api-types` regeneration.
2. **The chat section is AI-native, not a DM inbox.** shadcn-admin's WhatsApp-style
   `/chats` is _not_ ported. `/chats` becomes an agent conversation surface rebuilt from
   the beautifului.dev patterns.
3. **Split placement.** Generic primitives (`sidebar`, chat primitives) go into
   `@repo/ui`. Feature code (users table, tasks, settings forms, `sidebar-data`) stays
   in `apps/dashboard/src/features`. Data-table wrappers stay app-local so
   `@tanstack/react-table` never enters `@repo/ui`.
4. **Full i18n.** Every new user-visible string goes through `t()` with both `en` and
   `id` locale files kept in sync, matching the existing dashboard pattern.
5. **No RTL.** shadcn-admin's `direction-provider` and `@radix-ui/react-direction` are
   dropped — `en` and `id` are both LTR and nothing else in the monorepo is direction-aware.
6. **Mock data only.** Users, tasks, apps, and conversations are static fixtures. No
   fetches to `apps/api` in this scope.

---

## Objective

`apps/dashboard` today is a two-route demo: a stat-card overview and a 1,119-line UI
sandbox, hung off a hand-rolled `_layout.tsx` sidebar. It reads as a starter stub, not a
dashboard starter. The goal is to make it a complete, production-shaped admin app that a
developer can clone and build a real product on.

Two deliverables:

**A. Feature parity with [satnaing/shadcn-admin](https://github.com/satnaing/shadcn-admin)** —
every page, layout behavior, and shared component it ships, rebuilt against our own
design tokens, our `@repo/ui` package, and our i18n setup.

**B. An AI-native chat surface** at `/chats`, rebuilt from the interaction patterns
published at [beautifului.dev](https://www.beautifului.dev/) — thinking traces, streamed
answers, tool chips, approval cards, and a rich prompt bar.

### Users

- **Primary:** developers cloning this monorepo who want a dashboard that already has
  auth screens, data tables, settings, error pages, and a command palette.
- **Secondary:** the maintainer, demoing what the starter can do.

### What "adjusted to our theme" means, concretely

This is not a fork of shadcn-admin. We take its _structure and behavior_; the surface
stays ours.

| Axis             | shadcn-admin                   | Ours (keep)                                                                                     |
| ---------------- | ------------------------------ | ----------------------------------------------------------------------------------------------- |
| Primary color    | neutral / zinc                 | `--primary: #f59e0b` (amber), from `packages/tailwind-config/global.css`                        |
| Font             | Inter / Manrope                | `Outfit` (`--font-sans`), loaded in `apps/dashboard/src/index.css`                              |
| Surfaces         | flat cards                     | keep our translucent cards: `bg-white/60 dark:bg-neutral-900/60`, `backdrop-blur`, `rounded-xl` |
| Ambient          | none                           | keep the corner `blur-[120px]` primary/indigo glows from today's `_layout.tsx`                  |
| Component source | vendored `src/components/ui/*` | import from `@repo/ui/components/ui/*`                                                          |
| Icons            | `lucide-react`                 | `lucide-react` (already a dashboard dep)                                                        |
| Charts           | `recharts`                     | `recharts` + `@repo/ui/components/ui/chart` (already wired)                                     |

**Do not** copy shadcn-admin's `theme.css`, its zinc palette, or its font config. Do not
copy any asset from beautifului.dev.

### Licensing constraint on the chat work

beautifului.dev publishes **no source** — no GitHub repo, no npm package, no shadcn
registry URL, no copy button. Verified 2026-08-24: fetching the page yields zero links to
github/npm/registry/zip. Access is gated behind a newsletter signup.

Therefore the chat primitives are an **independent reimplementation from the published
visual and interaction description**, built on Radix + Tailwind + our tokens. Do not
scrape their markup, CSS, or SVG assets. Credit the inspiration in the feature README;
claim no affiliation.

---

## Tech Stack

Unchanged where possible. Current `apps/dashboard` stack:

- Vite 8, React 19.2, TypeScript 7 (strict)
- TanStack Router 1.170 (file-based, `autoCodeSplitting: true`)
- TanStack Query 5.101, Zustand 5
- Tailwind v4 via `@tailwindcss/vite`, tokens from `@repo/tailwind-config`
- `@repo/ui` (47 shadcn components), `@repo/i18n` (i18next + browser detection)
- `react-hook-form` 7.85 + `zod` 4 + `@hookform/resolvers`
- `recharts` 3.10, `lucide-react` 1.33, `next-themes` 0.4

### New dependencies

| Package                                                                          | Where                  | Why                                                                                                               |
| -------------------------------------------------------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `@tanstack/react-table` ^8.21                                                    | `apps/dashboard`       | Users and Tasks tables. No lighter option covers sorting + faceted filtering + row selection + column visibility. |
| `date-fns` ^4.4                                                                  | `apps/dashboard`       | Chat timestamp grouping. Already a transitive dep via `@repo/ui`; make it explicit.                               |
| `vitest` ^4 + `jsdom` + `@testing-library/react` + `@testing-library/user-event` | `apps/dashboard` (dev) | No test runner exists anywhere in this repo today (see Testing Strategy).                                         |
| `@faker-js/faker` ^10                                                            | `apps/dashboard` (dev) | Generating the users/tasks fixtures once, at author time.                                                         |

### Deliberately NOT added

- **`@clerk/react`** — auth is mocked; a Clerk section would demand an account to run.
- **`axios`** — no network calls in scope; `fetch` covers anything later.
- **`@radix-ui/react-direction`** — no RTL (assumption 5).
- **`react-top-loading-bar`** — the route progress bar is ~30 lines of CSS keyframes
  driven by TanStack Router's `isLoading`. Not worth a dependency.
- **`framer-motion`** — `tw-animate-css` is already imported by `@repo/tailwind-config`
  and covers every animation the chat surface needs (shimmer, fade, accordion, slide).
  Streaming text needs a JS interval, not a motion library.

---

## Commands

```bash
# From repo root
pnpm dev:dashboard          # Vite dev server → http://localhost:5174
pnpm build:dashboard        # tsc -b && vite build
pnpm build                  # all workspaces — REQUIRED after any @repo/ui change
pnpm lint                   # ESLint across all packages
pnpm format:check           # Prettier
pnpm type-check             # turbo run type-check  (see gap below)
pnpm test                   # turbo run test        (see gap below)
pnpm check-all              # type-check + lint + format:check

# From apps/dashboard
pnpm dev
pnpm build
pnpm lint
pnpm test                   # vitest run          (added in Phase 0)
pnpm test:watch             # vitest
pnpm type-check             # tsc -b --noEmit     (added in Phase 0)
```

### Gap to fix in Phase 0

`CLAUDE.md` instructs running `pnpm type-check` and `pnpm test` before reporting
completion, but **no workspace in this repo defines either script**. `turbo run
type-check` and `turbo run test` currently match zero tasks and exit 0 — a green result
that verifies nothing. Phase 0 adds real `type-check` and `test` scripts to
`apps/dashboard` so the mandated verification gate actually runs.

---

## Project Structure

### Target tree for `apps/dashboard/src`

```
src/
├── main.tsx                       # providers: I18n → Query → Theme → Font → Layout → Search → Router
├── index.css                      # Outfit import, @repo/tailwind-config, @source globs
├── routeTree.gen.ts               # generated — never edit by hand
│
├── routes/
│   ├── __root.tsx                 # + errorComponent, notFoundComponent, NavigationProgress
│   ├── (auth)/
│   │   ├── sign-in.tsx
│   │   ├── sign-in-2.tsx          # two-column variant with product screenshot
│   │   ├── sign-up.tsx
│   │   ├── forgot-password.tsx
│   │   └── otp.tsx
│   ├── (errors)/
│   │   ├── 401.tsx  403.tsx  404.tsx  500.tsx  503.tsx
│   └── _authenticated/
│       ├── route.tsx              # guard + AuthenticatedLayout (replaces _layout.tsx)
│       ├── index.tsx              # dashboard overview
│       ├── tasks/index.tsx
│       ├── apps/index.tsx
│       ├── chats/index.tsx
│       ├── users/index.tsx
│       ├── sandbox.tsx            # existing UI sandbox, re-homed
│       ├── help-center/index.tsx
│       ├── errors/$error.tsx
│       └── settings/
│           ├── route.tsx  index.tsx  account.tsx
│           ├── appearance.tsx  notifications.tsx  display.tsx
│
├── features/                      # page-level code, one dir per route group
│   ├── dashboard/    ├── tasks/    ├── users/
│   ├── apps/         ├── chats/    ├── settings/
│   ├── auth/         └── errors/
│       └── <feature>/
│           ├── index.tsx           # the page component
│           ├── components/         # feature-local components
│           └── data/               # fixtures + zod schemas
│
├── components/
│   ├── layout/                    # app-sidebar, nav-group, nav-user, team-switcher,
│   │                              # header, main, top-nav, app-title, authenticated-layout
│   │   └── data/sidebar-data.ts
│   ├── data-table/                # column-header, faceted-filter, pagination,
│   │                              # toolbar, view-options, bulk-actions, index.ts
│   ├── command-menu.tsx  config-drawer.tsx  confirm-dialog.tsx
│   ├── coming-soon.tsx   long-text.tsx      navigation-progress.tsx
│   ├── password-input.tsx profile-dropdown.tsx select-dropdown.tsx
│   ├── sign-out-dialog.tsx skip-to-main.tsx  theme-toggle.tsx
│   └── theme-provider.tsx
│
├── context/                       # font-provider, layout-provider, search-provider
├── hooks/                         # use-dialog-state, use-table-url-state
├── lib/                           # cookies.ts, handle-server-error.ts, show-submitted-data.tsx
├── stores/                        # useAppStore.ts, auth-store.ts
└── i18n/locales/{en,id}.json      # one namespace key per feature
```

### Changes to shared packages

```
packages/ui/src/
├── components/ui/sidebar.tsx      # NEW — the only shadcn primitive we're missing
├── hooks/use-mobile.ts            # NEW — required by sidebar.tsx (dir doesn't exist yet)
└── components/chat/               # NEW — the beautifului-inspired primitives
    ├── thinking-trace.tsx  streaming-text.tsx  tool-chip.tsx
    ├── approval-card.tsx   task-row.tsx        agent-loader.tsx
    ├── prompt-bar.tsx      message-bubble.tsx  source-chip.tsx
    └── index.ts
```

`packages/ui/package.json` already exports `./hooks/*` and `./components/*`, so no export
map change is needed — but `./components/*` maps to `./src/components/*.tsx`, which does
**not** match a nested `chat/` directory. Add an explicit `./components/chat` entry
pointing at `./src/components/chat/index.ts`.

New `@repo/ui` peer/runtime deps: none. `sidebar.tsx` needs `@radix-ui/react-slot`,
`@radix-ui/react-separator`, `@radix-ui/react-tooltip`, `class-variance-authority` — all
already listed.

---

## Feature Inventory

### A. shadcn-admin parity

#### Layout & shell

| Item                                              | Notes                                                                                                         |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `AppSidebar`                                      | Collapsible (`offcanvas` / `icon` / `none`) × variant (`inset` / `sidebar` / `floating`), persisted to cookie |
| `NavGroup` / `NavItem`                            | Flat links and nested collapsibles; badge support; active-state from router `useLocation`                     |
| `NavUser`                                         | Avatar + dropdown → Profile, Settings, Sign out                                                               |
| `TeamSwitcher`                                    | Multi-workspace dropdown with ⌘1..⌘3 shortcuts                                                                |
| `Header` / `Main`                                 | Sticky header with scroll shadow; `Main fixed` variant for full-height pages (chat)                           |
| `TopNav`                                          | Horizontal nav shown in the header on the overview page                                                       |
| `SkipToMain`                                      | a11y skip link — keep, it's a real accessibility win                                                          |
| `NavigationProgress`                              | Top loading bar driven by router state (CSS, no dep)                                                          |
| `CommandMenu`                                     | ⌘K palette over `cmdk`; searches nav items + theme actions                                                    |
| `ConfigDrawer`                                    | Live layout playground: sidebar variant, collapsible mode, theme, font                                        |
| `ProfileDropdown`, `ThemeSwitch`, `SignOutDialog` | Header chrome                                                                                                 |

Our existing `LanguageSwitcher` from `@repo/i18n` stays in the header — shadcn-admin has
no equivalent and we're not dropping it.

#### Pages

| Route                                                            | Content                                                                                                                                                                                    |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/`                                                              | Overview: 4 stat cards, bar chart, recent sales list, plus an **Analytics** tab (area chart)                                                                                               |
| `/tasks`                                                         | Data table with faceted status/priority filters, column visibility, row selection, pagination, URL-synced state; create/edit drawer, delete dialog, multi-delete dialog, CSV import dialog |
| `/users`                                                         | Data table with role/status facets; add/edit dialog, invite dialog, delete dialog, multi-delete dialog                                                                                     |
| `/apps`                                                          | Integration grid: search, sort (asc/desc), connected/all filter, connect/disconnect toggle                                                                                                 |
| `/chats`                                                         | See section B                                                                                                                                                                              |
| `/settings`                                                      | Nested layout with left sidebar-nav: Profile, Account, Appearance, Notifications, Display                                                                                                  |
| `/help-center`                                                   | `ComingSoon` placeholder                                                                                                                                                                   |
| `/sandbox`                                                       | Existing UI sandbox, re-homed under `_authenticated`                                                                                                                                       |
| `/sign-in`, `/sign-in-2`, `/sign-up`, `/forgot-password`, `/otp` | Auth screens, `react-hook-form` + `zod`, mock submit                                                                                                                                       |
| `/401`, `/403`, `/404`, `/500`, `/503`                           | Error pages, also reachable via `/errors/$error`                                                                                                                                           |

#### Hooks / lib / stores

`use-dialog-state`, `use-table-url-state`, `cookies`, `handle-server-error`,
`show-submitted-data`, `auth-store`.

### B. AI-native chat surface (`/chats`)

Rebuilt from the beautifului.dev interaction patterns. Layout: left conversation rail
(search + list), right thread (message stream + prompt bar).

| Primitive       | Behavior                                                                                                                                                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `AgentLoader`   | Pixel-grid shimmer loader with a live elapsed-seconds counter (`0.0s`, 100ms tick). CSS keyframes.                                                                                                                                                     |
| `ThinkingTrace` | Collapsible panel over `@repo/ui` accordion. Tabs: Steps / Reasoning / Search / Coding. Collapsed by default; shows step count + duration badge.                                                                                                       |
| `StreamingText` | Reveals a fixed answer token-by-token on an interval, with a blinking caret. Inline `SourceChip` avatars and an "N sources" pill fade in on completion, followed by follow-up suggestion pills. Respects `prefers-reduced-motion` — renders instantly. |
| `ToolChip`      | Compact `4 tool calls · 2 messages` summary badge; click expands to the individual invocations with status icons.                                                                                                                                      |
| `ApprovalCard`  | Human-in-the-loop prompt: question + 2–4 option buttons; selection collapses the card into a resolved state.                                                                                                                                           |
| `TaskRow`       | Live agent task line: status dot (queued / running / done / failed), title, elapsed time.                                                                                                                                                              |
| `PromptBar`     | Textarea composer with `@` source mentions and `/` commands (both over `cmdk`), a model picker dropdown, attach button, and send. Enter sends, Shift+Enter newlines, auto-grows to a max height.                                                       |
| `MessageBubble` | User vs assistant variants; assistant slots `ThinkingTrace`, `ToolChip`, `StreamingText`, `ApprovalCard`.                                                                                                                                              |

**Explicitly out of scope** (beautifului.dev components we're not building): Diff Table,
Records Table, Filter Table, Flowchart, Insight Cards, Fine-tune Card, Recommendation
Card, Context Cards, Selection Actions. The three table components overlap with the
data-table work; the rest are unrelated to a chat surface.

All conversation content is a static fixture in `features/chats/data/`. Nothing calls an
LLM. The "streaming" is a scripted replay of a canned response — this is a UI starter,
not an agent runtime.

---

## Code Style

Match the existing dashboard. Real example from `src/routes/_layout.index.tsx` — this is
the target shape:

```tsx
import { createFileRoute } from '@tanstack/react-router';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import { useTranslation } from '@repo/i18n';
import { CreditCard } from 'lucide-react';

export const Route = createFileRoute('/_authenticated/')({
  component: Dashboard,
});

function Dashboard() {
  const { t } = useTranslation('dashboard');

  const stats = [
    { title: t('index.totalRevenue'), value: '$45,231.89', icon: CreditCard },
  ];

  return (
    <div className="space-y-8">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-white/60 dark:bg-neutral-900/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

Conventions, all already in force in this repo:

- **Quotes:** single. **Semicolons:** yes. **JSX attributes:** double quotes. Prettier
  decides; do not hand-format. (shadcn-admin uses single-quoted JSX attributes — do
  **not** carry that over.)
- **Files:** `kebab-case.tsx`. **Components:** `PascalCase`. **Hooks:** `useCamelCase`.
- **Imports from shared packages:** `@repo/ui/components/ui/<name>`, `@repo/ui/utils`,
  `@repo/i18n`. Never a relative path into another workspace.
- **Path alias:** `@/` → `apps/dashboard/src`. Add to `vite.config.ts` and
  `tsconfig.app.json` in Phase 0; the app has no alias today and parity code assumes one.
- **`cn()`** from `@repo/ui/utils` for every conditional class. No template-literal class
  concatenation (today's `_layout.tsx` does this — it gets cleaned up).
- **Strings:** every user-visible string via `t('<feature>.<key>')`. No literals in JSX.
- **Forms:** `react-hook-form` + `zodResolver`, `@repo/ui/components/ui/form` wrappers.
- **Comments:** only where the _why_ isn't obvious. No section-banner comment blocks in
  new files. The `@author` header block stays on `main.tsx` only.
- **Types:** no `any`. Prefer `type` aliases over `interface` for props, matching
  existing files.

---

## Testing Strategy

**Current state: this repo has no test runner.** No workspace defines a `test` script;
`turbo run test` matches nothing. This spec introduces one, scoped to `apps/dashboard`.

- **Runner:** Vitest 4 with `environment: 'jsdom'` and `@testing-library/react`.
  shadcn-admin uses Vitest _browser mode_ with Playwright — we skip that. It adds a
  Chromium download to CI for a starter template's smoke tests.
- **Location:** co-located `*.test.ts(x)` next to the unit under test, matching
  shadcn-admin's convention.
- **Coverage target:** no percentage gate. Gates on percentages produce tests written to
  satisfy the gate. Instead, the rule is: **every module with real branching logic ships
  one test.**

What gets tested:

| Layer                          | Tests                                                                                |
| ------------------------------ | ------------------------------------------------------------------------------------ |
| `lib/cookies.ts`               | set/get/remove round-trip, max-age encoding                                          |
| `lib/handle-server-error.ts`   | each error shape → expected toast message                                            |
| `hooks/use-table-url-state.ts` | filter/sort/page ↔ search-param serialization, reset behavior                        |
| `stores/auth-store.ts`         | sign-in sets token + cookie; sign-out clears both                                    |
| `context/layout-provider.tsx`  | cookie persistence, `resetLayout`                                                    |
| Auth forms                     | zod validation — invalid email blocks submit, short password blocks submit           |
| `PasswordInput`                | visibility toggle flips input `type`                                                 |
| `ConfirmDialog`                | confirm fires callback, cancel does not                                              |
| `StreamingText`                | reveals full text over fake timers; renders instantly under `prefers-reduced-motion` |
| `ThinkingTrace`                | expand/collapse toggles content                                                      |
| `PromptBar`                    | Enter submits, Shift+Enter inserts a newline, empty input is a no-op                 |

Not tested: pure-presentational components, fixture files, `routeTree.gen.ts`.

**Manual verification per phase** (the type-check/lint/build gate does not catch these):

1. Light and dark mode, both readable.
2. `en` and `id`, no missing-key fallbacks in console.
3. 375px, 768px, 1440px — no horizontal scroll.
4. Keyboard only: tab order sane, focus rings visible, ⌘K opens, Escape closes.
5. Sidebar in all three collapsible modes × all three variants.

---

## Boundaries

### Always

- Re-read a file immediately before editing it. After 10+ messages, assume memory of file
  contents is stale.
- After any `packages/ui` change, run `pnpm build` at the repo root — `apps/web` and
  `apps/docs` also consume `@repo/ui`.
- Add every new string to **both** `en.json` and `id.json` in the same commit.
- Run `pnpm lint && pnpm format:check && pnpm build:dashboard` before reporting a phase
  complete. From Phase 0 onward, also `pnpm --filter dashboard test`.
- Use Conventional Commits (`feat(dashboard): …`). Husky + commitlint enforce it.
- Delete dead code as you go — dead props, unused exports, stale imports. Notably:
  `useAppStore`'s `count` / `increment` / `decrement` are unused and go in Phase 0.

### Ask first

- Adding any dependency not listed in the Tech Stack section above.
- Changing `packages/tailwind-config/global.css` — it is shared by all four apps.
- Changing the exports map in `packages/ui/package.json` beyond the one documented
  `./components/chat` addition.
- Deleting or restructuring `_layout.sandbox.tsx` (1,119 lines) beyond re-homing it.
- Any change under `apps/api`, `packages/db`, or `packages/api-types`.
- Skipping or reordering a phase.

### Never

- `git commit --no-verify`, or bypassing husky/commitlint/lint-staged.
- Copy markup, CSS, or assets from beautifului.dev. Rebuild from the description.
- Copy shadcn-admin's theme tokens, font config, or zinc palette.
- Hand-edit `routeTree.gen.ts`.
- Introduce Clerk, or any auth provider requiring an account to run the app.
- Add a dependency for something under ~40 lines of local code.
- Report a phase complete with a failing lint, type, build, or test.
- Push to `main` or open a PR unless explicitly asked.

---

## Phasing

`CLAUDE.md` caps a phase at 5 files. This feature spans roughly 130 files, so the cap is
applied as **≤5 files per commit**, with each phase landing as a short series of commits.
Where a phase's file count is listed below, that is the phase total, not a commit total.
Each phase ends at a verification gate and waits for approval before the next starts.

| #   | Phase                                                                                                                                                                                                                                                                                                     | Files | Gate                                                                                                   |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | ------------------------------------------------------------------------------------------------------ |
| 0   | **Cleanup + foundation.** Strip dead `count`/`increment`/`decrement` from `useAppStore`. Add `@/` path alias. Add `type-check` + `test` scripts to `apps/dashboard`. Add Vitest config. Install new deps.                                                                                                 | ~7    | `pnpm test` runs and passes (empty suite OK); `pnpm type-check` actually type-checks                   |
| 1   | **`@repo/ui` sidebar.** Add `sidebar.tsx` + `hooks/use-mobile.ts`. Add the `./components/chat` export entry (unused for now).                                                                                                                                                                             | ~4    | `pnpm build` green across **all four apps**                                                            |
| 2   | **App shell.** `layout-provider`, `font-provider`, `cookies.ts`, `AuthenticatedLayout`, `AppSidebar`, `NavGroup`, `NavUser`, `TeamSwitcher`, `AppTitle`, `Header`, `Main`, `sidebar-data.ts`, `types.ts`, `SkipToMain`. Replace `_layout.tsx` with `_authenticated/route.tsx`; re-home index and sandbox. | ~18   | All three collapsible modes × three variants render; existing pages still work in en + id              |
| 3   | **Header chrome.** `search-provider`, `CommandMenu`, `ConfigDrawer`, `ProfileDropdown`, `ThemeSwitch`, `SignOutDialog`, `NavigationProgress`, `TopNav`.                                                                                                                                                   | ~10   | ⌘K opens/filters/navigates; config drawer changes persist across reload                                |
| 4   | **Auth.** `auth-store`, `_authenticated` guard, `AuthLayout`, `PasswordInput`, 5 auth pages + their forms.                                                                                                                                                                                                | ~16   | Signed-out visit to `/` redirects to `/sign-in`; mock sign-in lands on `/`; sign-out clears the cookie |
| 5   | **Errors.** 5 error pages, `/errors/$error`, root `errorComponent` + `notFoundComponent`, `handle-server-error`, `ComingSoon`, `/help-center`.                                                                                                                                                            | ~11   | Every error route renders; an unknown URL hits the 404 page                                            |
| 6   | **Data-table toolkit.** `column-header`, `faceted-filter`, `pagination`, `toolbar`, `view-options`, `bulk-actions`, `use-table-url-state`, `use-dialog-state`, `LongText`, `SelectDropdown`, `ConfirmDialog`, `show-submitted-data`.                                                                      | ~13   | Unit tests for `use-table-url-state` pass                                                              |
| 7   | **Users.** Table, columns, fixtures, zod schema, provider, and the add/edit/invite/delete/multi-delete dialogs.                                                                                                                                                                                           | ~14   | Filters and sort survive a page reload via URL state; every dialog opens and closes                    |
| 8   | **Tasks.** Table, columns, fixtures, schema, provider, mutate drawer, import dialog, delete + multi-delete dialogs, row actions.                                                                                                                                                                          | ~14   | Same gate as Phase 7, plus CSV import validation rejects a malformed file                              |
| 9   | **Apps.** Integration grid with search, sort, connected filter, brand icons.                                                                                                                                                                                                                              | ~5    | Search + sort + filter compose correctly                                                               |
| 10  | **Settings.** Nested layout, `sidebar-nav`, `content-section`, and the Profile / Account / Appearance / Notifications / Display pages and forms.                                                                                                                                                          | ~14   | Appearance changes theme + font live; every form validates                                             |
| 11  | **Dashboard overview.** Rework `index.tsx` into `features/dashboard` with Overview and Analytics tabs.                                                                                                                                                                                                    | ~6    | Both tabs render; charts resize without overflow                                                       |
| 12  | **Chat primitives.** The 9 components under `packages/ui/src/components/chat/` + tests.                                                                                                                                                                                                                   | ~12   | `pnpm build` green across all four apps; primitive tests pass                                          |
| 13  | **Chat feature.** `/chats` page, conversation rail, thread, fixtures.                                                                                                                                                                                                                                     | ~7    | Streaming replays; thinking trace expands; approval card resolves; prompt bar `@` and `/` menus open   |
| 14  | **Sweep.** i18n audit (no missing keys in either locale), a11y pass, responsive pass, README update, remaining tests.                                                                                                                                                                                     | ~10   | `pnpm check-all` + `pnpm test` + `pnpm build` all green                                                |

Phases 1 and 12 touch `@repo/ui` and therefore carry cross-app build risk — they are the
two that most need the full `pnpm build`, not just `build:dashboard`.

---

## Success Criteria

Testable conditions. All must hold at the end of Phase 14.

**Parity**

1. Every route in the Pages table above resolves and renders without a console error.
2. The sidebar supports all 3 collapsible modes × 3 variants, and the choice survives a
   page reload (cookie-persisted).
3. ⌘K (Ctrl+K on Windows/Linux) opens the command palette; typing filters nav items;
   Enter navigates; Escape closes.
4. Users and Tasks tables support sort, faceted filter, column visibility, row selection,
   bulk delete, and pagination — and filter/sort/page state round-trips through the URL.
5. Visiting any `_authenticated` route without a token redirects to `/sign-in`.
6. Every auth and settings form rejects invalid input with a visible field-level message.

**Theme**

7. `--primary` reads `#f59e0b` and `--font-sans` reads `Outfit` on every new page — no
   page introduces its own palette or font.
8. Zero imports of shadcn-admin's `theme.css` or vendored `components/ui/*`. Every
   shadcn primitive resolves to `@repo/ui`.

**Chat**

9. `/chats` renders a conversation rail and a thread; selecting a conversation swaps the
   thread; on mobile (375px) the rail and thread are separate views.
10. Sending a message replays a scripted response: loader → thinking trace → streamed
    answer with source chips → follow-up pills.
11. The thinking trace expands and collapses; tool chips expand; an approval card resolves
    to a chosen state and stays resolved.
12. The prompt bar: `@` opens the source menu, `/` opens the command menu, Enter sends,
    Shift+Enter inserts a newline.
13. With `prefers-reduced-motion: reduce`, streaming text renders instantly and the loader
    does not animate.

**Quality**

14. `pnpm build` succeeds for all four apps.
15. `pnpm lint` and `pnpm format:check` report zero errors.
16. `pnpm type-check` runs a real TypeScript pass and reports zero errors.
17. `pnpm test` runs the Vitest suite and every test passes.
18. `en.json` and `id.json` have identical key sets — no missing-key warnings in either
    locale.
19. No page scrolls horizontally at 375px, 768px, or 1440px.
20. Every interactive element is reachable by keyboard with a visible focus ring.

---

## Open Questions

1. **Sandbox route.** `_layout.sandbox.tsx` is 1,119 lines showcasing every `@repo/ui`
   component. Keep it as-is under `/sandbox` (this spec's assumption), or split it into
   per-category pages? It's the largest file in the app and will only grow as components
   are added.
2. **Team switcher content.** shadcn-admin lists three fictional companies. Use our own
   placeholder names, or drop the switcher entirely since the starter has no
   multi-workspace concept?
3. **Font picker.** shadcn-admin's appearance settings offer Inter / Manrope / System.
   Ours would be Outfit / Inter / System — meaning a second Google Font import. Worth it,
   or should Appearance only control the theme?
4. **CI.** Should the new Vitest suite be wired into `.github/workflows` in Phase 0, or is
   local `pnpm test` sufficient for now?
5. **Chart data.** Overview charts currently use hardcoded arrays. Keep them hardcoded, or
   generate them with faker at module load so the demo looks different on each visit?
