import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from './EmptyState.js';
import { Icon } from '../Icon/Icon.js';
import { Button } from '../Button/Button.js';

const meta = {
  title: 'Patterns/EmptyState',
  component: EmptyState,
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoDevices: Story = {
  args: {
    icon: <Icon name="server" size={32} />,
    title: 'Нет устройств',
    description: 'Добавьте первое устройство в инвентарь, чтобы начать мониторинг.',
    action: <Button size="s">Добавить устройство</Button>,
  },
};

export const Platform404: Story = {
  parameters: { layout: 'fullscreen' },
  args: {
    variant: 'not-found',
    fullPage: true,
    onHome: () => undefined,
    onBack: () => undefined,
  },
};
