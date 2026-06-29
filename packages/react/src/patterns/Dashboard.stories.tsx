import { useEffect, useMemo, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ChartType, MetricDefinition, MetricSeries, WidgetConfig } from '@iskra-ui/core';
import { createLocalStorageDashboardStore } from '@iskra-ui/core';
import { useStoryT } from '../storybook/useStoryT.js';
import {
  Button,
  Chart,
  DashboardGrid,
  DashboardToolbar,
  DashboardWidget,
  EmptyState,
  Icon,
  useDashboard,
  WidgetEditor,
  WidgetExpandView,
} from '../index.js';

const MOCK_METRICS: MetricDefinition[] = [
  { id: 'cpu', label: 'CPU', unit: '%', group: 'Host' },
  { id: 'memory', label: 'Memory', unit: '%', group: 'Host' },
  { id: 'traffic', label: 'Traffic', unit: 'Gbps', group: 'Network' },
];

function mockFetchSeries(metricId: string, _chartType: ChartType): Promise<MetricSeries> {
  const metric = MOCK_METRICS.find((m) => m.id === metricId);
  const now = Date.now();
  const points = Array.from({ length: 24 }, (_, i) => ({
    timestamp: now - (23 - i) * 3600000,
    value: 40 + Math.sin(i / 3) * 25 + metricId.length * 3,
  }));
  return Promise.resolve({
    id: metricId,
    label: metric?.label ?? metricId,
    unit: metric?.unit,
    points,
  });
}

const store = createLocalStorageDashboardStore({ keyPrefix: 'iskra.story.dashboard' });

function DashboardDemo() {
  const t = useStoryT();
  const {
    dashboard,
    isLoading,
    editable,
    setEditable,
    addWidget,
    updateWidget,
    removeWidget,
    setLayout,
    isSaving,
  } = useDashboard({
    dashboardId: 'story-demo',
    store,
    defaultName: t('dashboard.defaultName'),
  });

  const [seriesMap, setSeriesMap] = useState<Record<string, MetricSeries>>({});
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<WidgetConfig | undefined>();
  const [expanded, setExpanded] = useState<WidgetConfig | null>(null);

  const loadedSeriesRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!dashboard) return;
    let cancelled = false;

    for (const widget of dashboard.widgets) {
      if (loadedSeriesRef.current.has(widget.id)) continue;
      loadedSeriesRef.current.add(widget.id);

      void mockFetchSeries(widget.metricId, widget.chartType).then((series) => {
        if (!cancelled) {
          setSeriesMap((prev) => ({ ...prev, [widget.id]: series }));
        }
      });
    }

    return () => {
      cancelled = true;
    };
  }, [dashboard]);

  const fetchPreview = useMemo(
    () => (metricId: string, chartType: ChartType) => mockFetchSeries(metricId, chartType),
    [],
  );

  if (isLoading || !dashboard) {
    return (
      <div style={{ padding: 24, minHeight: '100vh', background: 'var(--bg, #0d1117)' }}>
        Loading…
      </div>
    );
  }

  return (
    <div style={{ padding: 24, minHeight: '100vh', background: 'var(--bg, #0d1117)' }}>
      <DashboardToolbar
        title={dashboard.name}
        editable={editable}
        onEditableChange={setEditable}
        onAddWidget={() => {
          setEditing(undefined);
          setEditorOpen(true);
        }}
        actions={
          isSaving ? (
            <span style={{ fontSize: 12, color: 'var(--fg3)' }}>{t('dashboard.saving')}</span>
          ) : null
        }
      />

      {dashboard.widgets.length === 0 ? (
        <EmptyState
          icon={<Icon name="grid" size={32} />}
          title={t('dashboard.noWidgetsTitle')}
          description={t('dashboard.noWidgetsDescription')}
          action={
            <Button size="s" onClick={() => setEditorOpen(true)}>
              {t('dashboard.addWidget')}
            </Button>
          }
        />
      ) : (
        <DashboardGrid layout={dashboard.layout} onLayoutChange={setLayout} editable={editable}>
          {dashboard.widgets.map((widget) => (
            <div key={widget.id}>
              <DashboardWidget
                title={widget.title}
                onExpand={() => setExpanded(widget)}
                onEdit={
                  editable
                    ? () => {
                        setEditing(widget);
                        setEditorOpen(true);
                      }
                    : undefined
                }
                onRemove={editable ? () => removeWidget(widget.id) : undefined}
              >
                <Chart
                  type={widget.chartType}
                  series={
                    seriesMap[widget.id] ?? {
                      id: widget.metricId,
                      label: widget.title,
                      points: [],
                    }
                  }
                  density="compact"
                  loading={!seriesMap[widget.id]}
                />
              </DashboardWidget>
            </div>
          ))}
        </DashboardGrid>
      )}

      <WidgetEditor
        open={editorOpen}
        onClose={() => {
          setEditorOpen(false);
          setEditing(undefined);
        }}
        onSave={(widget) => {
          if (widget.id) updateWidget(widget as WidgetConfig);
          else addWidget(widget);
        }}
        metrics={MOCK_METRICS}
        fetchPreview={fetchPreview}
        initialWidget={editing}
      />

      {expanded && (
        <WidgetExpandView open onClose={() => setExpanded(null)} title={expanded.title}>
          <Chart
            type={expanded.chartType}
            series={
              seriesMap[expanded.id] ?? {
                id: expanded.metricId,
                label: expanded.title,
                points: [],
              }
            }
            density="comfortable"
            height={420}
          />
        </WidgetExpandView>
      )}
    </div>
  );
}

const meta: Meta = {
  title: 'Patterns/Dashboard',
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const FullFlow: StoryObj = {
  render: () => <DashboardDemo />,
};
