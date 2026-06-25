import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithIskra } from '../../i18n/test-utils.js';
import { Sidebar } from './Sidebar.js';

describe('Sidebar', () => {
  it('marks the active item with aria-current', () => {
    renderWithIskra(<Sidebar activeItem="devices" variant="operator" brand={<span>App</span>} />);
    expect(screen.getByRole('button', { name: 'Devices' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('fires onNavigate with the item id', async () => {
    const onNavigate = vi.fn();
    renderWithIskra(<Sidebar onNavigate={onNavigate} variant="operator" brand={<span>App</span>} />);
    await userEvent.click(screen.getByRole('button', { name: 'Topology' }));
    expect(onNavigate).toHaveBeenCalledWith('topology');
  });

  it('adds admin sections for the admin variant', () => {
    renderWithIskra(<Sidebar variant="admin" brand={<span>App</span>} />);
    expect(screen.getByRole('button', { name: 'Users' })).toBeInTheDocument();
  });

  it('renders custom children instead of groups', () => {
    renderWithIskra(
      <Sidebar brand={<span>App</span>}>
        <div>Custom nav body</div>
      </Sidebar>,
    );
    expect(screen.getByText('Custom nav body')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Overview' })).not.toBeInTheDocument();
  });

  it('renders compound Sidebar.Item with aria-current', () => {
    renderWithIskra(
      <Sidebar>
        <Sidebar.Body>
          <Sidebar.Item id="home" label="Home" icon="grid" active onClick={() => undefined} />
        </Sidebar.Body>
      </Sidebar>,
    );
    expect(screen.getByRole('button', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
  });

  it('renders Sidebar.Divider in compound mode', () => {
    const { container } = renderWithIskra(
      <Sidebar>
        <Sidebar.Body>
          <Sidebar.Divider data-testid="nav-divider" />
        </Sidebar.Body>
      </Sidebar>,
    );
    expect(container.querySelector('.isb-divider')).toBeInTheDocument();
  });
});
