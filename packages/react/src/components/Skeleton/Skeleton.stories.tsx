import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton.js';

const meta = { title: 'Primitives/Skeleton', component: Skeleton } satisfies Meta<typeof Skeleton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280 }}>
      <Skeleton variant="circle" width={48} height={48} />
      <Skeleton variant="rect" height={80} />
      <Skeleton variant="text" lines={3} />
    </div>
  ),
};
