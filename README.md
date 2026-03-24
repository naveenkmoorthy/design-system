# Basis

A modern, accessible design system built with React 19, Tailwind CSS v4, and Turborepo. Basis provides a token-driven component library with full TypeScript support and interactive documentation.

[![CI](https://github.com/naveenkmoorthy/design-system/actions/workflows/ci.yml/badge.svg)](https://github.com/naveenkmoorthy/design-system/actions/workflows/ci.yml)
[![React](https://img.shields.io/badge/React-19.2.4-61dafb?logo=react&logoColor=white)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2.2-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.8.20-ef4444?logo=turborepo&logoColor=white)](https://turbo.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)

**[View Storybook →](https://69c21a13c92f56296fd7f891-lxwrqcpxpc.chromatic.com/)** &nbsp;·&nbsp; **[GitHub →](https://github.com/naveenkmoorthy/design-system)**

---

## Overview

Basis is structured as a monorepo where design decisions flow in one direction — from tokens to components to documentation. Every visual property (color, spacing, typography, radius) is defined once as a CSS variable and consumed everywhere else.

```
Token layer (@repo/tokens)
    ↓
Component layer (@repo/ui)
    ↓
Documentation layer (apps/docs)
```

---

## Monorepo Structure

```
basis/
├── apps/
│   └── docs/                    # Storybook 8 — interactive component docs
├── packages/
│   ├── tokens/                  # Design tokens as Tailwind v4 CSS variables
│   ├── ui/                      # React 19 component library
│   ├── typescript-config/       # Shared TypeScript configuration
│   └── eslint-config/           # Shared ESLint rules
├── .changeset/                  # Changesets versioning config
├── .github/workflows/ci.yml     # CI pipeline
└── turbo.json                   # Turborepo task pipeline
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+

```bash
npm install -g pnpm
```

### Installation

```bash
# Clone the repository
git clone https://github.com/naveenkmoorthy/design-system.git
cd design-system

# Install all dependencies
pnpm install
```

### Development

```bash
# Start Storybook at localhost:6006
pnpm dev --filter docs

# Build all packages
pnpm build

# Typecheck all packages
pnpm turbo run typecheck

# Lint all packages
pnpm turbo run lint
```

---

## Packages

### `@repo/tokens`

The single source of truth for all visual decisions. Tokens are defined using Tailwind v4's `@theme` directive and compiled to CSS custom properties.

```css
/* packages/tokens/src/index.css */
@theme {
  --color-primary-600: #7c3aed;
  --color-text:        var(--color-neutral-900);
  --radius-md:         0.375rem;
  --spacing-4:         1rem;
}
```

Token categories:

- **Color** — a full neutral palette + semantic primary, success, warning, and danger ramps
- **Typography** — font families, sizes, weights, and line heights
- **Spacing** — a consistent spacing scale from `1px` to `6rem`
- **Border radius** — from `none` to `full`
- **Shadows** — four elevation levels
- **Transitions** — duration and easing constants

Dark mode is handled via `@media (prefers-color-scheme: dark)` overriding the semantic aliases — the raw palette stays fixed, only the semantic layer changes.

---

### `@repo/ui`

The React component library. Built with Vite, outputs ESM and CJS simultaneously with full TypeScript declaration maps.

**Available components:**

| Component | Description |
|-----------|-------------|
| `Button`  | Four variants (primary, secondary, ghost, danger), three sizes, loading state |
| `Input`   | Label, hint, error states, left/right element slots, three sizes |
| `Card`    | Compound component with `Card.Header`, `Card.Body`, `Card.Footer` sub-parts |

**Installation in a new project:**

```bash
pnpm add @repo/ui @repo/tokens
```

**Usage:**

```tsx
import { Button, Input, Card } from "@repo/ui";
import "@repo/ui/styles";

export function LoginForm() {
  return (
    <Card>
      <Card.Header>
        <h2>Sign in</h2>
      </Card.Header>
      <Card.Body>
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
        />
      </Card.Body>
      <Card.Footer>
        <Button variant="primary">Sign in</Button>
        <Button variant="ghost">Cancel</Button>
      </Card.Footer>
    </Card>
  );
}
```

---

### `apps/docs`

Interactive documentation built with Storybook 8 and the `@storybook/react-vite` framework.

Every component has:
- **Stories** for each variant and state
- **Auto-generated props table** from TypeScript types via `react-docgen-typescript`
- **Controls panel** for live prop editing
- **Accessibility checks** via `@storybook/addon-a11y`

```bash
pnpm dev --filter docs
# Opens at http://localhost:6006
```

---

## Architecture Decisions

### Why Turborepo?

Turborepo provides intelligent task scheduling and caching across the monorepo. Tasks only re-run when their inputs change — on a cold run the full build takes a few seconds, on a warm run it completes in under 200ms.

```bash
# Second run — nothing changed
pnpm build
# → Tasks: 5 successful | Cached: 5 cached | Time: 111ms >>> FULL TURBO
```

The build order is inferred from `package.json` dependencies:

```
@repo/typescript-config
@repo/eslint-config
@repo/tokens
    └── @repo/ui
            └── docs
```

### Why Tailwind CSS v4?

Tailwind v4 introduces a CSS-first configuration model. Instead of a `tailwind.config.js` file, the entire token system lives in a `@theme {}` block inside a `.css` file. This means:

- Tokens are plain CSS custom properties — no build step required for the token package
- Any tool that can import CSS can consume the tokens, not just Tailwind
- The `@repo/tokens` package is a zero-dependency CSS file

### Why two token layers?

The token system has a raw palette layer and a semantic alias layer:

```css
/* Raw — never used directly in components */
--color-neutral-900: #171717;

/* Semantic — what components reference */
--color-text: var(--color-neutral-900);
```

Theming is a semantic layer swap. Changing the primary color system-wide is one variable change, not a grep across every component.

### Why compound components for Card?

```tsx
<Card>
  <Card.Header>...</Card.Header>
  <Card.Body>...</Card.Body>
  <Card.Footer>...</Card.Footer>
</Card>
```

The compound pattern keeps the API discoverable via autocomplete, enforces semantic structure, and avoids a deeply nested props API (`headerContent`, `footerContent`, etc.) that becomes unwieldy as components grow.

---

## Versioning

Basis uses [Changesets](https://github.com/changesets/changesets) for versioning.

```bash
# After making a change, create a changeset
pnpm changeset

# Bump versions across affected packages
pnpm version-packages
```

---

## Contributing

```bash
# Create a feature branch
git checkout -b feat/your-component

# Make your changes, then create a changeset
pnpm changeset

# Verify everything builds and typechecks
pnpm build
pnpm turbo run typecheck
```

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [React](https://react.dev) | 19.2.4 | Component model |
| [Tailwind CSS](https://tailwindcss.com) | 4.2.2 | Styling, token consumption |
| [Vite](https://vitejs.dev) | 6.4.1 | Component library bundler |
| [Turborepo](https://turbo.build) | 2.8.20 | Monorepo task orchestration |
| [Storybook](https://storybook.js.org) | 8.6.18 | Component documentation |
| [TypeScript](https://www.typescriptlang.org) | 5.7 | Type safety across all packages |
| [Changesets](https://github.com/changesets/changesets) | 3.x | Package versioning |
| [pnpm](https://pnpm.io) | 9.x | Package manager, workspace linking |

---

## License

MIT