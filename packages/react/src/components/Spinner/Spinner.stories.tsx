import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner.js';

const meta = { title: 'Primitives/Spinner', component: Spinner } satisfies Meta<typeof Spinner>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Spinner size="s" />
      <Spinner size="m" />
      <Spinner size="l" />
    </div>
  ),
};
