import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover } from './Popover.js';
import { IconButton } from '../IconButton/IconButton.js';
import { Icon } from '../Icon/Icon.js';

const notificationPanel = (
  <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
    <div style={{ fontWeight: 600, fontSize: 12, color: 'var(--fg2)' }}>УВЕДОМЛЕНИЯ</div>
    <div style={{ fontSize: 12 }}>
      <span style={{ color: 'var(--status-err)' }}>[Ошибка]</span> Ошибка доставки в Telegram
    </div>
    <div style={{ fontSize: 12, color: 'var(--fg2)' }}>
      Черновик INC-001245 сформирован автоматически
    </div>
  </div>
);

const BellTrigger = () => (
  <IconButton icon={<Icon name="bell" size={16} />} aria-label="Уведомления" variant="ghost" />
);

const meta = {
  title: 'Patterns/Popover',
  component: Popover,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Popover trigger={<BellTrigger />}>{notificationPanel}</Popover>,
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Popover open={open} onOpenChange={setOpen} trigger={<BellTrigger />}>
        {notificationPanel}
      </Popover>
    );
  },
};

export const Notifications: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Popover open={open} onOpenChange={setOpen} trigger={<BellTrigger />}>
        {notificationPanel}
      </Popover>
    );
  },
};
