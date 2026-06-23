import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DashboardGrid } from './DashboardGrid.js';
import { DashboardWidget } from '../DashboardWidget/DashboardWidget.js';

describe('DashboardGrid', () => {
  it('renders widgets in grid', () => {
    render(
      <DashboardGrid
        layout={[{ i: 'w1', x: 0, y: 0, w: 4, h: 3 }]}
        children={[
          <div key="w1">
            <DashboardWidget title="CPU">
              <span>chart</span>
            </DashboardWidget>
          </div>,
        ]}
      />,
    );
    expect(screen.getByText('CPU')).toBeInTheDocument();
  });
});
