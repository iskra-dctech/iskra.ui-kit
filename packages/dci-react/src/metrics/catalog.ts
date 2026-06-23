import type { ChartType, MetricDefinition, MetricSeries } from '@iskra-ui/core';

/** DCI metric source — integrate with the platform metrics API. */
export interface DciMetricSource {
  listMetrics(): Promise<MetricDefinition[]>;
  fetchSeries(metricId: string, range?: string, chartType?: ChartType): Promise<MetricSeries>;
}

export const DCI_MOCK_METRICS: MetricDefinition[] = [
  {
    id: 'cpu',
    label: 'CPU',
    unit: '%',
    group: 'Host',
    description: 'Средняя загрузка CPU за период',
  },
  {
    id: 'memory',
    label: 'Memory',
    unit: '%',
    group: 'Host',
    description: 'Использование оперативной памяти',
  },
  {
    id: 'traffic',
    label: 'Traffic',
    unit: 'Gbps',
    group: 'Network',
    description: 'Суммарный трафик интерфейсов',
  },
  {
    id: 'sync',
    label: 'Fleet Sync',
    unit: '%',
    group: 'Fleet',
    description: 'Доля устройств в состоянии Sync',
  },
  {
    id: 'drift',
    label: 'Drift count',
    unit: '',
    group: 'Fleet',
    description: 'Количество устройств с drift',
  },
];

function seededValue(seed: number, i: number) {
  return 30 + ((seed * 17 + i * 13) % 50);
}

export function createMockDciMetricSource(): DciMetricSource {
  return {
    async listMetrics() {
      return DCI_MOCK_METRICS;
    },
    async fetchSeries(metricId, range = '24h', _chartType) {
      const metric = DCI_MOCK_METRICS.find((m) => m.id === metricId);
      const now = Date.now();
      const hours = range === '24h' ? 24 : 12;
      const seed = metricId.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
      const points = Array.from({ length: hours }, (_, i) => ({
        timestamp: now - (hours - 1 - i) * 3600000,
        value: seededValue(seed, i),
      }));
      return {
        id: metricId,
        label: metric?.label ?? metricId,
        unit: metric?.unit,
        points,
      };
    },
  };
}
