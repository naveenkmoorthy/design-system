# @basis/ui

The Basis component library. Built with React 19, Tailwind CSS v4, and TypeScript. Documented in Storybook and deployed to Chromatic.

## Components

| Component | Variants |
|---|---|
| `Button` | `primary`, `secondary`, `ghost`, `danger` · sizes: `sm`, `md`, `lg` |
| `Card` | `elevated`, `outlined`, `ghost` · padding: `none`, `sm`, `md`, `lg` |
| `Input` | — |

## Usage

```tsx
import { Button, Card } from "@basis/ui";
import "@basis/ui/styles";

export default function Example() {
  return (
    <Card variant="outlined">
      <Card.Header>Hello</Card.Header>
      <Card.Footer>
        <Button variant="primary">Click me</Button>
      </Card.Footer>
    </Card>
  );
}
```

## Development

```bash
# Watch mode — rebuilds on changes
pnpm --filter @basis/ui dev

# Build
pnpm --filter @basis/ui build
```

## Documentation

Components are documented in Storybook.

```bash
pnpm --filter @basis/ui storybook
```