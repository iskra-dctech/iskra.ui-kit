import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Button } from './Button.js';

describe('Button', () => {
  it('renders a native button with the label', () => {
    render(<Button>Force Sync</Button>);
    expect(screen.getByRole('button', { name: 'Force Sync' })).toBeInTheDocument();
  });

  it('applies variant and size classes', () => {
    render(
      <Button variant="outline" size="l">
        X
      </Button>,
    );
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('ik-btn-outline', 'ik-btn-l');
  });

  it('does not fire onClick when loading', async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        X
      </Button>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('has no a11y violations (icon-only requires aria-label)', async () => {
    const { container } = render(<Button iconOnly aria-label="Обновить" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
