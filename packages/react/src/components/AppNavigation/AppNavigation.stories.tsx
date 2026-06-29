import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { getNotifierNav } from '@iskra-ui/core';
import { useIskraLocale } from '../../i18n/useIskraLocale.js';
import { useStoryT } from '../../storybook/useStoryT.js';
import { AppNavigation } from './AppNavigation.js';

const meta = {
  title: 'Patterns/AppNavigation',
  component: AppNavigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Adaptive navigation orchestrator: Sidebar on tablet/desktop (≥768px), MobileNav bottom bar on mobile.',
      },
    },
  },
  args: { primaryItems: [] },
} satisfies Meta<typeof AppNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  parameters: {
    viewport: { defaultViewport: 'desktop1280' },
  },
  render: () => {
    const t = useStoryT();
    const { locale } = useIskraLocale();
    const groups = useMemo(() => getNotifierNav(locale), [locale]);
    const [page, setPage] = useState('incidents');
    return (
      <div style={{ display: 'flex', height: '100vh', background: 'var(--bg)' }}>
        <AppNavigation
          groups={groups}
          brand={
            <span className="isb-wmark" style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>
              {t('demo.labels.iskraNotifications')}
            </span>
          }
          primaryItems={['dashboard', 'incidents', 'console', 'workspace']}
          activeItem={page}
          onNavigate={setPage}
          ariaLabel={t('demo.labels.notifierNav')}
        />
        <main style={{ flex: 1, padding: 24, color: 'var(--fg1)' }}>Active: {page}</main>
      </div>
    );
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'compact375' },
  },
  render: () => {
    const t = useStoryT();
    const { locale } = useIskraLocale();
    const groups = useMemo(() => getNotifierNav(locale), [locale]);
    const [page, setPage] = useState('incidents');
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          background: 'var(--bg)',
        }}
      >
        <main className="ik-has-mobile-nav" style={{ flex: 1, padding: 16, color: 'var(--fg1)' }}>
          Active: {page}
        </main>
        <AppNavigation
          groups={groups}
          primaryItems={['dashboard', 'incidents', 'console', 'workspace']}
          activeItem={page}
          onNavigate={setPage}
          ariaLabel={t('demo.labels.notifierNav')}
        />
      </div>
    );
  },
};
