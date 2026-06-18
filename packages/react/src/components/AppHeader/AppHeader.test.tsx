import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppHeader } from './AppHeader.js';

describe('AppHeader', () => {
  it('renders leading, center and trailing zones from props', () => {
    render(
      <AppHeader
        leading={<span>Nav</span>}
        center={<span>Search</span>}
        trailing={<span>Actions</span>}
      />,
    );
    expect(screen.getByText('Nav')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('renders platform nav with current item', () => {
    render(
      <AppHeader.Nav
        items={[
          { id: 'a', label: 'Platform' },
          { id: 'b', label: 'Space', current: true },
        ]}
      />,
    );
    expect(screen.getByRole('button', { name: 'Space' })).toHaveAttribute('aria-current', 'page');
  });

  it('calls onNavigate from nav buttons', async () => {
    const onNavigate = vi.fn();
    render(
      <AppHeader.Nav
        items={[
          { id: 'home', label: 'Home' },
          { id: 'settings', label: 'Settings' },
        ]}
        onNavigate={onNavigate}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Settings' }));
    expect(onNavigate).toHaveBeenCalledWith('settings');
  });
});
