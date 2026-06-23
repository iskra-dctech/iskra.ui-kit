import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sidebar } from './Sidebar.js';

describe('Sidebar', () => {
  it('marks the active item with aria-current', () => {
    render(<Sidebar activeItem="devices" variant="operator" brand={<span>App</span>} />);
    expect(screen.getByRole('button', { name: 'Devices' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('fires onNavigate with the item id', async () => {
    const onNavigate = vi.fn();
    render(<Sidebar onNavigate={onNavigate} variant="operator" brand={<span>App</span>} />);
    await userEvent.click(screen.getByRole('button', { name: 'Topology' }));
    expect(onNavigate).toHaveBeenCalledWith('topology');
  });

  it('adds admin sections for the admin variant', () => {
    render(<Sidebar variant="admin" brand={<span>App</span>} />);
    expect(screen.getByRole('button', { name: 'Users' })).toBeInTheDocument();
  });

  it('renders custom children instead of groups', () => {
    render(
      <Sidebar brand={<span>App</span>}>
        <div>Custom nav body</div>
      </Sidebar>,
    );
    expect(screen.getByText('Custom nav body')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Overview' })).not.toBeInTheDocument();
  });
});
