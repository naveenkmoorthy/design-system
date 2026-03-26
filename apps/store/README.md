# Basis Store

A product listing app built with the [Basis](../..) design system.

## Overview

Demonstrates real-world usage of `@basis/ui` components inside a Next.js App Router application. Connects to a separate Express API for product data.

## Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS v4
- `@basis/ui` — Basis component library

## Features

- Product listing grid with category filtering
- Product detail page
- Loading skeletons
- Error boundary
- Server components with ISR caching

## Getting started

From the monorepo root:

```bash
pnpm --filter @basis/store dev
```

Runs at http://localhost:3000. Requires the API to be running at http://localhost:4000.

## Structure

```
src/
├── app/
│   ├── page.tsx                  # Product listing
│   ├── loading.tsx               # Skeleton state
│   ├── error.tsx                 # Error boundary
│   └── products/[id]/page.tsx    # Product detail
├── components/
│   ├── Header.tsx
│   ├── Container.tsx
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   └── CategoryFilter.tsx
├── lib/
│   └── api.ts                    # Data fetching utilities
└── types/
    └── product.ts
```

## Environment variables

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:4000` | Base URL for the Express API |