import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar.js';

const meta = {
  title: 'Patterns/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  render: (args) => {
    const [collapsed, setCollapsed] = useState(false);
    const [page, setPage] = useState('overview');
    return (
      <div style={{ height: 520, display: 'flex', background: 'var(--bg)' }}>
        <Sidebar
          {...args}
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
          activeItem={page}
          onNavigate={setPage}
          badges={{ alerts: 3 }}
        />
      </div>
    );
  },
};

export const Admin: Story = { ...Interactive, args: { variant: 'admin' } };
