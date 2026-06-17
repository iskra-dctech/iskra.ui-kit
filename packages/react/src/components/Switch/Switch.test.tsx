import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Switch } from './Switch.js';

describe('Switch', () => {
  it('exposes role="switch" with its label', () => {
    render(<Switch label="Live-Pulse" />);
    expect(screen.getByRole('switch', { name: 'Live-Pulse' })).toBeInTheDocument();
  });

  it('toggles on click', async () => {
    render(<Switch label="X" />);
    const sw = screen.getByRole('switch');
    expect(sw).not.toBeChecked();
    await userEvent.click(sw);
    expect(sw).toBeChecked();
  });

  it('has no a11y violations', async () => {
    const { container } = render(<Switch label="X" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
