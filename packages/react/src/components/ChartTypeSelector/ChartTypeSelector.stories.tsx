import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ChartType } from '@iskra-ui/core';
import { ChartTypeSelector } from './ChartTypeSelector.js';
import { Chart } from '../Chart/Chart.js';
import type { MetricSeries } from '@iskra-ui/core';

const series: MetricSeries = {
  id: 'cpu',
  label: 'CPU',
  unit: '%',
  points: Array.from({ length: 16 }, (_, i) => ({
    timestamp: Date.now() - (15 - i) * 3600000,
    value: 35 + Math.sin(i / 2) * 20 + i,
  })),
};

const meta = {
  title: 'Primitives/ChartTypeSelector',
  component: ChartTypeSelector,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ChartTypeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [type, setType] = useState<ChartType>('line');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
        <ChartTypeSelector value={type} onChange={setType} />
        <Chart type={type} series={series} density="comfortable" height={220} />
      </div>
    );
  },
};

export const DotChartSelected: Story = {
  name: 'Dot chart selected',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
      <ChartTypeSelector value="scatter" onChange={() => undefined} />
      <Chart type="scatter" series={series} density="comfortable" height={220} />
    </div>
  ),
};
