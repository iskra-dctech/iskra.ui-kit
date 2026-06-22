import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sheet } from './Sheet.js';

describe('Sheet', () => {
  it('renders an accessible dialog when open', () => {
    render(
      <Sheet open onOpenChange={() => {}} title="Действие">
        body
      </Sheet>,
    );
    expect(screen.getByRole('dialog', { name: 'Действие' })).toHaveAttribute('aria-modal', 'true');
  });

  it('calls onOpenChange(false) on Escape when dismissible', async () => {
    const onOpenChange = vi.fn();
    render(
      <Sheet open onOpenChange={onOpenChange} title="X">
        body
      </Sheet>,
    );
    await userEvent.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
