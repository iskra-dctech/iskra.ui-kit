import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Chart } from './Chart.js';
import type { MetricSeries } from '@iskra-ui/core';

const series: MetricSeries = {
  id: 'cpu',
  label: 'CPU',
  unit: '%',
  points: [
    { timestamp: Date.now() - 3600000, value: 42 },
    { timestamp: Date.now(), value: 88 },
  ],
};

describe('Chart', () => {
  it('renders empty state without data', () => {
    render(<Chart type="line" series={{ ...series, points: [] }} />);
    expect(screen.getByText('Нет данных')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    render(<Chart type="line" series={series} loading />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders dot chart (scatter) with accessible label', () => {
    render(<Chart type="scatter" series={series} density="comfortable" />);
    expect(screen.getByRole('img', { name: /CPU/ })).toBeInTheDocument();
  });

  it('has no a11y violations in empty state', async () => {
    const { container } = render(
      <Chart type="line" series={{ ...series, points: [] }} density="compact" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
