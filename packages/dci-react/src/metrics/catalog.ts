import type { ChartType, MetricDefinition, MetricSeries } from '@iskra-ui/core';
import { getMessages, type IskraLocale } from '@iskra-ui/i18n';

/** DCI metric source — integrate with the platform metrics API. */
export interface DciMetricSource {
  listMetrics(): Promise<MetricDefinition[]>;
  fetchSeries(metricId: string, range?: string, chartType?: ChartType): Promise<MetricSeries>;
}

export function getDciMockMetrics(locale: IskraLocale = 'en'): MetricDefinition[] {
  const descriptions = getMessages(locale).dci.metrics;
  return [
    {
      id: 'cpu',
      label: 'CPU',
      unit: '%',
      group: 'Host',
      description: descriptions.cpu,
    },
    {
      id: 'memory',
      label: 'Memory',
      unit: '%',
      group: 'Host',
      description: descriptions.memory,
    },
    {
      id: 'traffic',
      label: 'Traffic',
      unit: 'Gbps',
      group: 'Network',
      description: descriptions.traffic,
    },
    {
      id: 'sync',
      label: 'Fleet Sync',
      unit: '%',
      group: 'Fleet',
      description: descriptions.sync,
    },
    {
      id: 'drift',
      label: 'Drift count',
      unit: '',
      group: 'Fleet',
      description: descriptions.drift,
    },
  ];
}

/** @deprecated Use `getDciMockMetrics(locale)` for locale-aware descriptions. */
export const DCI_MOCK_METRICS: MetricDefinition[] = getDciMockMetrics('en');

function seededValue(seed: number, i: number) {
  return 30 + ((seed * 17 + i * 13) % 50);
}

export function createMockDciMetricSource(locale: IskraLocale = 'en'): DciMetricSource {
  const metrics = getDciMockMetrics(locale);
  return {
    async listMetrics() {
      return metrics;
    },
    async fetchSeries(metricId, range = '24h', _chartType) {
      const metric = metrics.find((m) => m.id === metricId);
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
