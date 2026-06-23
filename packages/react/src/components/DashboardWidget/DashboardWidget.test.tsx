import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { DashboardWidget } from './DashboardWidget.js';

describe('DashboardWidget', () => {
  it('renders title and children', () => {
    render(
      <DashboardWidget title="CPU">
        <div>chart</div>
      </DashboardWidget>,
    );
    expect(screen.getByText('CPU')).toBeInTheDocument();
    expect(screen.getByText('chart')).toBeInTheDocument();
  });

  it('fires expand handler', async () => {
    const onExpand = vi.fn();
    render(
      <DashboardWidget title="CPU" onExpand={onExpand}>
        <div>chart</div>
      </DashboardWidget>,
    );
    await userEvent.click(screen.getByRole('button', { name: /Развернуть график CPU/ }));
    expect(onExpand).toHaveBeenCalled();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <DashboardWidget title="CPU" onExpand={() => {}}>
        <div>chart</div>
      </DashboardWidget>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
