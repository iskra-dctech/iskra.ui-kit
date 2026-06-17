import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Icon, ICON_NAMES } from './Icon.js';

describe('Icon', () => {
  it('exposes the full icon set', () => {
    expect(ICON_NAMES.length).toBeGreaterThan(30);
  });

  it('is decorative (aria-hidden) without a title', () => {
    const { container } = render(<Icon name="refresh" />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('exposes an accessible name when title is provided', () => {
    const { getByRole } = render(<Icon name="refresh" title="Обновить" />);
    expect(getByRole('img', { name: 'Обновить' })).toBeInTheDocument();
  });
});
