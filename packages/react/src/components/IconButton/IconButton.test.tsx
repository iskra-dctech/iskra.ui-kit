import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { IconButton } from './IconButton.js';
import { Icon } from '../Icon/Icon.js';

describe('IconButton', () => {
  it('uses aria-label as its accessible name', () => {
    render(<IconButton icon={<Icon name="refresh" />} aria-label="Обновить" />);
    expect(screen.getByRole('button', { name: 'Обновить' })).toHaveClass('ik-btn-io');
  });

  it('has no a11y violations', async () => {
    const { container } = render(<IconButton icon={<Icon name="close" />} aria-label="Закрыть" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
