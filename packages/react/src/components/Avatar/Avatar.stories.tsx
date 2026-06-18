import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar.js';

const meta = {
  title: 'Primitives/Avatar',
  component: Avatar,
  args: { name: 'Алексей Иванов', size: 'md' },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {};
export const WithStatus: Story = { args: { status: 'online', statusDisplay: 'ring' } };
export const WithImage: Story = {
  args: {
    name: 'Иванов Иван',
    src: 'https://i.pravatar.cc/64?u=iskra-ad',
    status: 'online',
  },
};
export const ImageFallback: Story = {
  args: {
    name: 'Петров Петр',
    src: 'https://invalid.example/avatar.png',
    status: 'warn',
  },
};
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" status="warn" />
    </div>
  ),
};
