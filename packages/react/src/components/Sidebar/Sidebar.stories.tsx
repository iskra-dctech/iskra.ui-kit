import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { getDciFooterNav, getNotifierNav } from '@iskra-ui/core';
import { useIskraLocale } from '../../i18n/useIskraLocale.js';
import { useStoryT } from '../../storybook/useStoryT.js';
import { Sidebar } from './Sidebar.js';

const meta = {
  title: 'Patterns/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Universal navigation shell. `collapsed` is controlled: pass `collapsed` + `onToggle`. In collapsed mode only icons are visible; labels appear in tooltips on hover.',
      },
    },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

function DciBrand() {
  const t = useStoryT();
  return (
    <>
      <span className="isb-spark">
        <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" aria-hidden>
          <path d="M10 1 12.6 7.8 19.5 9.8 12.6 11.9 10 18.7 7.4 11.9.5 9.8 7.4 7.8Z" />
        </svg>
      </span>
      <span className="isb-wmark">{t('demo.labels.dciBrand')}</span>
    </>
  );
}

function useDciFooter() {
  const { locale } = useIskraLocale();
  return useMemo(() => getDciFooterNav(locale), [locale]);
}

export const DciOperator: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    const [page, setPage] = useState('overview');
    const footerItems = useDciFooter();
    return (
      <div style={{ height: 520, display: 'flex', background: 'var(--bg)' }}>
        <Sidebar
          brand={<DciBrand />}
          variant="operator"
          footerItems={footerItems}
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
    const footerItems = useDciFooter();
    return (
      <div style={{ height: 520, display: 'flex', background: 'var(--bg)' }}>
        <Sidebar
          brand={<DciBrand />}
          variant="operator"
          footerItems={footerItems}
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
    const footerItems = useDciFooter();
    return (
      <div style={{ height: 520, display: 'flex', gap: 24, padding: 24, background: 'var(--bg)' }}>
        <Sidebar
          brand={<DciBrand />}
          variant="operator"
          footerItems={footerItems}
          collapsed={false}
          onToggle={() => undefined}
          activeItem={page}
          onNavigate={setPage}
          badges={{ alerts: 3 }}
        />
        <Sidebar
          brand={<DciBrand />}
          variant="operator"
          footerItems={footerItems}
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
    const footerItems = useDciFooter();
    return (
      <div style={{ height: 520, display: 'flex', background: 'var(--bg)' }}>
        <Sidebar
          brand={<DciBrand />}
          variant="admin"
          footerItems={footerItems}
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
    const t = useStoryT();
    const { locale } = useIskraLocale();
    const groups = useMemo(() => getNotifierNav(locale), [locale]);
    const [collapsed, setCollapsed] = useState(false);
    const [page, setPage] = useState('dashboard');
    return (
      <div style={{ height: 600, display: 'flex', background: 'var(--bg)' }}>
        <Sidebar
          groups={groups}
          brand={
            <span className="isb-wmark" style={{ fontFamily: 'var(--font-mono)' }}>
              {t('demo.labels.iskraNotifications')}
            </span>
          }
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
          activeItem={page}
          onNavigate={setPage}
          ariaLabel={t('demo.labels.notifierNav')}
        />
      </div>
    );
  },
};

export const CustomBody: Story = {
  render: () => {
    const t = useStoryT();
    return (
      <div style={{ height: 320, display: 'flex', background: 'var(--bg)' }}>
        <Sidebar
          brand={<span className="isb-wmark">{t('demo.labels.customApp')}</span>}
          ariaLabel={t('demo.labels.customMainMenu')}
        >
          <div style={{ padding: 12, fontSize: 13, color: 'var(--fg2)' }}>
            {t('demo.sidebar.childrenHint')} <code>children</code>
          </div>
        </Sidebar>
      </div>
    );
  },
};

export const CompoundApi: Story = {
  render: () => {
    const t = useStoryT();
    const [page, setPage] = useState('overview');
    const footerItems = useDciFooter();
    return (
      <div style={{ height: 520, display: 'flex', background: 'var(--bg)' }}>
        <Sidebar collapsed={false} onToggle={() => undefined}>
          <div className="isb-logo">
            <Sidebar.Brand>
              <DciBrand />
            </Sidebar.Brand>
          </div>
          <Sidebar.Body>
            <Sidebar.Group>
              <Sidebar.Section>{t('sidebar.monitoring')}</Sidebar.Section>
              <Sidebar.Item
                id="overview"
                label={t('sidebar.overview')}
                icon="grid"
                active={page === 'overview'}
                onClick={() => setPage('overview')}
              />
              <Sidebar.Item
                id="devices"
                label={t('sidebar.devices')}
                icon="server"
                active={page === 'devices'}
                onClick={() => setPage('devices')}
              />
            </Sidebar.Group>
            <Sidebar.Divider />
          </Sidebar.Body>
          <Sidebar.Footer>
            {footerItems.map((item) => (
              <Sidebar.Item
                key={item.id}
                item={item}
                active={page === item.id}
                onClick={() => setPage(item.id)}
              />
            ))}
          </Sidebar.Footer>
        </Sidebar>
      </div>
    );
  },
};
