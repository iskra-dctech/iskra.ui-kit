import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sidebar } from './Sidebar.js';

describe('Sidebar', () => {
  it('marks the active item with aria-current', () => {
    render(<Sidebar activeItem="devices" />);
    expect(screen.getByRole('button', { name: 'Устройства' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('fires onNavigate with the item id', async () => {
    const onNavigate = vi.fn();
    render(<Sidebar onNavigate={onNavigate} />);
    await userEvent.click(screen.getByRole('button', { name: 'Топология' }));
    expect(onNavigate).toHaveBeenCalledWith('topology');
  });

  it('adds admin sections for the admin variant', () => {
    render(<Sidebar variant="admin" />);
    expect(screen.getByRole('button', { name: 'Пользователи' })).toBeInTheDocument();
  });
});
