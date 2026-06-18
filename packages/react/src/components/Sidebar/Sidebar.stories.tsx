import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Sidebar,
  DCI_OPERATOR_NAV,
  DCI_ADMIN_NAV,
  DCI_FOOTER_NAV,
  NOTIFIER_NAV,
} from './Sidebar.js';

const DciBrand = () => (
  <>
    <span className="isb-spark">
      <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" aria-hidden>
        <path d="M10 1 12.6 7.8 19.5 9.8 12.6 11.9 10 18.7 7.4 11.9.5 9.8 7.4 7.8Z" />
      </svg>
    </span>
    <span className="isb-wmark">ИСКРА.DCI</span>
  </>
);

const meta = {
  title: 'Patterns/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Универсальный навигационный shell. Состояние `collapsed` — controlled: передайте `collapsed` + `onToggle`. В свёрнутом режиме видны только иконки, подписи — в tooltip при hover.',
      },
    },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DciOperator: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    const [page, setPage] = useState('overview');
    return (
      <div style={{ height: 520, display: 'flex', background: 'var(--bg)' }}>
        <Sidebar
          brand={<DciBrand />}
          groups={DCI_OPERATOR_NAV}
          footerItems={DCI_FOOTER_NAV}
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

export const Collapsed: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(true);
    const [page, setPage] = useState('devices');
    return (
      <div style={{ height: 520, display: 'flex', background: 'var(--bg)' }}>
        <Sidebar
          brand={<DciBrand />}
          groups={DCI_OPERATOR_NAV}
          footerItems={DCI_FOOTER_NAV}
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

export const ExpandedVsCollapsed: Story = {
  render: () => {
    const [page, setPage] = useState('overview');
    return (
      <div style={{ height: 520, display: 'flex', gap: 24, padding: 24, background: 'var(--bg)' }}>
        <Sidebar
          brand={<DciBrand />}
          groups={DCI_OPERATOR_NAV}
          footerItems={DCI_FOOTER_NAV}
          collapsed={false}
          onToggle={() => undefined}
          activeItem={page}
          onNavigate={setPage}
          badges={{ alerts: 3 }}
        />
        <Sidebar
          brand={<DciBrand />}
          groups={DCI_OPERATOR_NAV}
          footerItems={DCI_FOOTER_NAV}
          collapsed
          onToggle={() => undefined}
          activeItem={page}
          onNavigate={setPage}
          badges={{ alerts: 3 }}
        />
      </div>
    );
  },
};

export const DciAdmin: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    const [page, setPage] = useState('users');
    return (
      <div style={{ height: 520, display: 'flex', background: 'var(--bg)' }}>
        <Sidebar
          brand={<DciBrand />}
          groups={DCI_ADMIN_NAV}
          footerItems={DCI_FOOTER_NAV}
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
          activeItem={page}
          onNavigate={setPage}
        />
      </div>
    );
  },
};

export const NotifierPreset: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    const [page, setPage] = useState('dashboard');
    return (
      <div style={{ height: 600, display: 'flex', background: 'var(--bg)' }}>
        <Sidebar
          groups={NOTIFIER_NAV}
          brand={
            <span className="isb-wmark" style={{ fontFamily: 'var(--font-mono)' }}>
              ISKRA // УВЕДОМЛЕНИЯ
            </span>
          }
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
          activeItem={page}
          onNavigate={setPage}
          ariaLabel="Навигация Notifier"
        />
      </div>
    );
  },
};

export const CustomBody: Story = {
  render: () => (
    <div style={{ height: 320, display: 'flex', background: 'var(--bg)' }}>
      <Sidebar brand={<span className="isb-wmark">Custom App</span>} ariaLabel="Главное меню">
        <div style={{ padding: 12, fontSize: 13, color: 'var(--fg2)' }}>
          Любой контент через <code>children</code>
        </div>
      </Sidebar>
    </div>
  ),
};
