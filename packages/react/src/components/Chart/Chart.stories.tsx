import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chart } from './Chart.js';
import type { MetricSeries } from '@iskra-ui/core';

function demoSeries(): MetricSeries {
  const now = Date.now();
  const points = Array.from({ length: 24 }, (_, i) => ({
    timestamp: now - (23 - i) * 3600000,
    value: 40 + Math.sin(i / 3) * 25 + Math.random() * 10,
  }));
  return { id: 'cpu', label: 'CPU', unit: '%', points };
}

const meta = {
  title: 'Primitives/Chart',
  component: Chart,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Chart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LineComfortable: Story = {
  args: { type: 'line', series: demoSeries(), density: 'comfortable' },
};

export const LineCompact: Story = {
  args: { type: 'line', series: demoSeries(), density: 'compact' },
};

export const Bar: Story = {
  args: { type: 'bar', series: demoSeries() },
};

export const Area: Story = {
  args: { type: 'area', series: demoSeries() },
};

/** Scatter chart (`scatter`) — fourth type in the WidgetEditor ChartTypeSelector. */
export const DotChart: Story = {
  name: 'Dot chart',
  args: { type: 'scatter', series: demoSeries(), density: 'comfortable' },
};

export const DotChartCompact: Story = {
  name: 'Dot chart (compact)',
  args: { type: 'scatter', series: demoSeries(), density: 'compact' },
};

export const Empty: Story = {
  args: {
    type: 'line',
    series: { id: 'x', label: 'Empty', points: [] },
  },
};

export const Loading: Story = {
  args: { type: 'line', series: demoSeries(), loading: true },
};

export const WithThreshold: Story = {
  args: { type: 'line', series: demoSeries(), alertThreshold: 70 },
};
