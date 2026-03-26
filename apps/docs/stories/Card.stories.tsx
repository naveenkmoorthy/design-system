import type { Meta, StoryObj } from "@storybook/react";
import { Card, Button } from "@basis/ui";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div style={{ width: 380 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <h3 className="text-lg font-semibold text-text">Card title</h3>
        <p className="text-sm text-text-muted">Optional subtitle goes here</p>
      </Card.Header>
      <Card.Body>
        <p>This is the card body. Any content can go here.</p>
      </Card.Body>
      <Card.Footer>
        <Button size="sm">Action</Button>
        <Button size="sm" variant="ghost">Cancel</Button>
      </Card.Footer>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card variant="elevated">
        <Card.Body>Elevated card</Card.Body>
      </Card>
      <Card variant="outlined">
        <Card.Body>Outlined card</Card.Body>
      </Card>
      <Card variant="ghost">
        <Card.Body>Ghost card</Card.Body>
      </Card>
    </div>
  ),
};
