import { describe, it, expect, vi, afterEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithIskra } from '../../i18n/test-utils.js';
import { AppNavigation } from './AppNavigation.js';

type MatchMediaFn = typeof window.matchMedia;

function mockMatchMedia(matches: boolean): MatchMediaFn {
  return vi.fn(() => ({
    matches,
    media: '',
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as MatchMediaFn;
}

describe('AppNavigation', () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    vi.restoreAllMocks();
  });

  it('renders Sidebar on desktop breakpoint', () => {
    window.matchMedia = mockMatchMedia(false);
    renderWithIskra(
      <AppNavigation
        variant="operator"
        brand={<span>App</span>}
        primaryItems={['overview', 'devices']}
        activeItem="overview"
      />,
    );
    expect(screen.getByRole('navigation', { name: 'Navigation' })).toHaveClass('iskra-sb');
  });

  it('renders MobileNav on mobile breakpoint', () => {
    window.matchMedia = mockMatchMedia(true);
    renderWithIskra(
      <AppNavigation
        variant="operator"
        primaryItems={['overview', 'devices']}
        activeItem="overview"
      />,
    );
    expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toHaveClass(
      'iskra-mobile-nav',
    );
  });
});
