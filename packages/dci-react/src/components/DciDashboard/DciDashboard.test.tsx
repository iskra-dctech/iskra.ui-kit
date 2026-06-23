import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DciDashboard } from './DciDashboard.js';
import { createMockDciMetricSource } from '../../metrics/catalog.js';

describe('DciDashboard', () => {
  it('renders loading then dashboard', async () => {
    render(
      <DciDashboard
        dashboardId="test-dash"
        metricSource={createMockDciMetricSource()}
      />,
    );
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
