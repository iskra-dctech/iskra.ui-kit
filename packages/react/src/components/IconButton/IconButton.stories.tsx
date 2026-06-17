import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton.js';
import { Icon } from '../Icon/Icon.js';

const meta = {
  title: 'Primitives/IconButton',
  component: IconButton,
  args: { icon: <Icon name="refresh" />, 'aria-label': 'Обновить', variant: 'secondary' },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <IconButton {...args} size="s" />
      <IconButton {...args} size="m" />
      <IconButton {...args} size="l" />
    </div>
  ),
};
