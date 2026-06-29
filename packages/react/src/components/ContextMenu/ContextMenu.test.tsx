import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from './index.js';
import { Button } from '../Button/Button.js';

function DemoMenu({ onCopy }: { onCopy?: () => void }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Button type="button">Область</Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onSelect={onCopy}>Копировать</ContextMenuItem>
        <ContextMenuItem onSelect={() => undefined}>Вставить</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem destructive disabled>
          Удалить
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

describe('ContextMenu', () => {
  it('opens on trigger click', async () => {
    render(<DemoMenu />);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Область' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Копировать' })).toBeInTheDocument();
  });

  it('opens on contextmenu event', () => {
    render(<DemoMenu />);
    fireEvent.contextMenu(screen.getByRole('button', { name: 'Область' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('calls onSelect and closes on item click', async () => {
    const onCopy = vi.fn();
    render(<DemoMenu onCopy={onCopy} />);
    await userEvent.click(screen.getByRole('button', { name: 'Область' }));
    await userEvent.click(screen.getByRole('menuitem', { name: 'Копировать' }));
    expect(onCopy).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes on Escape', async () => {
    render(<DemoMenu />);
    await userEvent.click(screen.getByRole('button', { name: 'Область' }));
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('navigates items with arrow keys', async () => {
    render(<DemoMenu />);
    await userEvent.click(screen.getByRole('button', { name: 'Область' }));
    const copy = screen.getByRole('menuitem', { name: 'Копировать' });
    const paste = screen.getByRole('menuitem', { name: 'Вставить' });
    await waitFor(() => expect(copy).toHaveFocus());
    await userEvent.keyboard('{ArrowDown}');
    expect(paste).toHaveFocus();
  });

  it('calls onOpenChange when toggled', async () => {
    const onOpenChange = vi.fn();
    render(
      <ContextMenu onOpenChange={onOpenChange}>
        <ContextMenuTrigger>
          <button type="button">Open</button>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>One</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('has no a11y violations when open', async () => {
    const { container } = render(<DemoMenu />);
    await userEvent.click(screen.getByRole('button', { name: 'Область' }));
    expect(await axe(container)).toHaveNoViolations();
  });
});
