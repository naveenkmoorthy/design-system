# Basis

A monorepo containing a design system and a reference product store built with it.

## What's inside

```
basis/
├── apps/
│   ├── store/        # Next.js 15 product listing app
│   └── api/          # Node.js + Express REST API
├── packages/
│   ├── ui/           # @basis/ui — React component library
│   └── tokens/       # @basis/tokens — design tokens
```

## Tech stack

| Layer | Technology |
|---|---|
| Monorepo | Turborepo 2.8.20 |
| Package manager | pnpm |
| Frontend | Next.js 15, React 19 |
| Styling | Tailwind CSS v4 |
| Component library | `@basis/ui` (this repo) |
| Backend | Node.js, Express |
| Documentation | Storybook 8, Chromatic |

## Getting started

### Prerequisites
- Node.js 18+
- pnpm 9+

### Install dependencies

```bash
pnpm install
```

### Run everything

```bash
pnpm dev
```

This starts all apps and packages in watch mode:
- **Store** → http://localhost:3000
- **API** → http://localhost:4000
- **UI package** → watching for changes

### Run individually

```bash
pnpm --filter @basis/store dev   # Next.js store
pnpm --filter @basis/api dev     # Express API
pnpm --filter @basis/ui dev       # Component library
```

## Apps

### Store (`apps/store`)
A product listing app that consumes `@basis/ui` components. Features product grid, category filtering, detail pages, loading skeletons, and error boundaries.

### API (`apps/api`)
A REST API built with Express and TypeScript.

| Endpoint | Description |
|---|---|
| `GET /api/products` | List all products |
| `GET /api/products?category=X` | Filter by category |
| `GET /api/products/:id` | Get a single product |
| `GET /api/products/meta/categories` | List all categories |
| `GET /health` | Health check |

## Packages

### `@basis/ui`
React component library built with Tailwind CSS v4. Components are documented in Storybook and published to Chromatic.

Available components: `Button`, `Card`, `Input`

### `@basis/tokens`
Design tokens consumed by `@basis/ui`. Covers color, typography, spacing, and more.

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps and packages |
| `pnpm lint` | Lint all packages |
| `pnpm typecheck` | Type check all packages |