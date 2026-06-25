import { describe, it, expect, vi, afterEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithIskra } from '../../i18n/test-utils.js';
import { MobileNav } from './MobileNav.js';
import type { SidebarNavGroup } from '@iskra-ui/core';

const groups: SidebarNavGroup[] = [
  {
    id: 'main',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
      { id: 'incidents', label: 'Incidents', icon: 'bell' },
      { id: 'console', label: 'Console', icon: 'terminal' },
      { id: 'workspace', label: 'Workspace', icon: 'layers' },
      { id: 'rules', label: 'Rules', icon: 'git-branch' },
    ],
  },
];

describe('MobileNav', () => {
  it('renders primary tabs and menu button', () => {
    renderWithIskra(
      <MobileNav
        groups={groups}
        primaryItems={['dashboard', 'incidents']}
        activeItem="dashboard"
        onNavigate={() => undefined}
      />,
    );
    expect(screen.getByRole('button', { name: 'Dashboard' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
  });

  it('opens sheet and navigates from overflow item', async () => {
    const onNavigate = vi.fn();
    renderWithIskra(
      <MobileNav
        groups={groups}
        primaryItems={['dashboard', 'incidents']}
        activeItem="dashboard"
        onNavigate={onNavigate}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    await userEvent.click(screen.getByRole('button', { name: 'Rules' }));
    expect(onNavigate).toHaveBeenCalledWith('rules');
  });
});
