import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmptyState } from './EmptyState.js';

describe('EmptyState', () => {
  it('renders title, description and action', () => {
    render(<EmptyState title="Нет данных" description="desc" action={<button>Add</button>} />);
    expect(screen.getByText('Нет данных')).toBeInTheDocument();
    expect(screen.getByText('desc')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('renders not-found defaults with code and actions', () => {
    const onHome = vi.fn();
    const onBack = vi.fn();
    render(<EmptyState variant="not-found" onHome={onHome} onBack={onBack} />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go home' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
  });

  it('calls onHome and onBack from not-found actions', async () => {
    const onHome = vi.fn();
    const onBack = vi.fn();
    render(<EmptyState variant="not-found" onHome={onHome} onBack={onBack} />);
    await userEvent.click(screen.getByRole('button', { name: 'Go home' }));
    await userEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(onHome).toHaveBeenCalledOnce();
    expect(onBack).toHaveBeenCalledOnce();
  });
});
