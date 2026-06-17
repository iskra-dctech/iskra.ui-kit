import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, Tag } from './Badge.js';

const meta = {
  title: 'Primitives/Badge',
  component: Badge,
  args: { variant: 'warning', dot: true, children: 'Drift' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Statuses: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Badge variant="success" dot>
        In sync
      </Badge>
      <Badge variant="warning" dot>
        Drift
      </Badge>
      <Badge variant="error" dot>
        Error
      </Badge>
      <Badge variant="info" dot>
        Info
      </Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="neutral">Neutral</Badge>
    </div>
  ),
};

export const Tags: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag>leaf-07.msk</Tag>
      <Tag accent>10.0.2.7</Tag>
      <Tag onRemove={() => {}}>removable</Tag>
    </div>
  ),
};
