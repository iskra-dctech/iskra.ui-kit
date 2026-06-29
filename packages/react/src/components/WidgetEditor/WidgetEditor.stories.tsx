import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ChartType, MetricDefinition, MetricSeries } from '@iskra-ui/core';
import { useStoryT } from '../../storybook/useStoryT.js';
import { WidgetEditor } from './WidgetEditor.js';
import { Button } from '../Button/Button.js';

const metrics: MetricDefinition[] = [
  { id: 'cpu', label: 'CPU', unit: '%', group: 'Host' },
  { id: 'memory', label: 'Memory', unit: '%', group: 'Host' },
];

async function fetchPreview(metricId: string, _chartType: ChartType): Promise<MetricSeries> {
  const now = Date.now();
  return {
    id: metricId,
    label: metrics.find((m) => m.id === metricId)?.label ?? metricId,
    unit: '%',
    points: Array.from({ length: 20 }, (_, i) => ({
      timestamp: now - (19 - i) * 3600000,
      value: 30 + Math.sin(i / 2) * 25,
    })),
  };
}

const meta = {
  title: 'Patterns/WidgetEditor',
  component: WidgetEditor,
  parameters: { layout: 'centered' },
  args: {
    open: false,
    onClose: () => undefined,
    onSave: () => undefined,
    metrics: [],
    fetchPreview: async () => ({ id: '', label: '', points: [] }),
  },
} satisfies Meta<typeof WidgetEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddWidget: Story = {
  render: () => {
    const t = useStoryT();
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>{t('dashboard.addWidget')}</Button>
        <WidgetEditor
          open={open}
          onClose={() => setOpen(false)}
          onSave={() => setOpen(false)}
          metrics={metrics}
          fetchPreview={fetchPreview}
        />
      </>
    );
  },
};

export const DotChartPreview: Story = {
  name: 'Dot chart preview',
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <WidgetEditor
        open={open}
        onClose={() => setOpen(false)}
        onSave={() => setOpen(false)}
        metrics={metrics}
        fetchPreview={fetchPreview}
        initialWidget={{
          id: 'preview',
          title: 'CPU',
          metricId: 'cpu',
          chartType: 'scatter',
          timeRange: '24h',
        }}
      />
    );
  },
};
