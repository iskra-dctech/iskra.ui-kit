import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover } from './Popover.js';
import { Button } from '../Button/Button.js';

describe('Popover', () => {
  it('toggles panel on trigger click', async () => {
    render(
      <Popover trigger={<Button type="button">Open</Button>}>
        <p>Panel content</p>
      </Popover>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('dialog')).toHaveTextContent('Panel content');
  });

  it('closes on Escape', async () => {
    render(
      <Popover trigger={<Button type="button">Open</Button>}>
        <p>Panel</p>
      </Popover>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onOpenChange when toggled', async () => {
    const onOpenChange = vi.fn();
    render(
      <Popover trigger={<Button type="button">Open</Button>} onOpenChange={onOpenChange}>
        <p>Panel</p>
      </Popover>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
