import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Drawer } from './Drawer.js';

describe('Drawer', () => {
  it('renders an accessible dialog when open', () => {
    render(
      <Drawer open onOpenChange={() => {}} aria-label="Навигация">
        nav
      </Drawer>,
    );
    expect(screen.getByRole('dialog', { name: 'Навигация' })).toHaveAttribute('aria-modal', 'true');
  });

  it('does not render when closed', () => {
    render(
      <Drawer open={false} onOpenChange={() => {}} aria-label="Навигация">
        nav
      </Drawer>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onOpenChange(false) on Escape', async () => {
    const onOpenChange = vi.fn();
    render(
      <Drawer open onOpenChange={onOpenChange} aria-label="Навигация">
        nav
      </Drawer>,
    );
    await userEvent.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
