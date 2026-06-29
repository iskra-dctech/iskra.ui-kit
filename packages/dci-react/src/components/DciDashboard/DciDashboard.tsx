import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChartType, MetricSeries, WidgetConfig } from '@iskra-ui/core';
import { createLocalStorageDashboardStore } from '@iskra-ui/core';
import {
  Button,
  Chart,
  DashboardGrid,
  DashboardToolbar,
  DashboardWidget,
  EmptyState,
  Icon,
  Spinner,
  useDashboard,
  useIskraT,
  WidgetEditor,
  WidgetExpandView,
} from '@iskra-ui/react';
import type { DciMetricSource } from '../../metrics/catalog.js';
import './DciDashboard.css';

const defaultStore = createLocalStorageDashboardStore({ keyPrefix: 'iskra.dci.dashboard' });

export interface DciDashboardProps {
  dashboardId: string;
  metricSource: DciMetricSource;
  store?: ReturnType<typeof createLocalStorageDashboardStore>;
  defaultName?: string;
  className?: string;
}

/**
 * DciDashboard — composed personalised dashboard for Искра.DCI.
 */
export function DciDashboard({
  dashboardId,
  metricSource,
  store = defaultStore,
  defaultName,
  className,
}: DciDashboardProps) {
  const t = useIskraT();
  const resolvedDefaultName = defaultName ?? t('dashboard.defaultName');
  const {
    dashboard,
    isLoading,
    isSaving,
    editable,
    setEditable,
    addWidget,
    updateWidget,
    removeWidget,
    setLayout,
  } = useDashboard({ dashboardId, store, defaultName: resolvedDefaultName });

  const [metrics, setMetrics] = useState<Awaited<ReturnType<DciMetricSource['listMetrics']>>>([]);
  const [seriesMap, setSeriesMap] = useState<Record<string, MetricSeries>>({});
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingWidget, setEditingWidget] = useState<WidgetConfig | undefined>();
  const [expandedWidget, setExpandedWidget] = useState<WidgetConfig | null>(null);

  useEffect(() => {
    metricSource.listMetrics().then(setMetrics);
  }, [metricSource]);

  const loadedSeriesRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!dashboard) return;
    let cancelled = false;

    for (const widget of dashboard.widgets) {
      if (loadedSeriesRef.current.has(widget.id)) continue;
      loadedSeriesRef.current.add(widget.id);

      void metricSource
        .fetchSeries(widget.metricId, widget.timeRange, widget.chartType)
        .then((series) => {
          if (!cancelled) {
            setSeriesMap((prev) => ({ ...prev, [widget.id]: series }));
          }
        });
    }

    return () => {
      cancelled = true;
    };
  }, [dashboard, metricSource]);

  const fetchPreview = useCallback(
    (metricId: string, chartType: ChartType) =>
      metricSource.fetchSeries(metricId, '24h', chartType),
    [metricSource],
  );

  const handleSaveWidget = (widget: Omit<WidgetConfig, 'id'> & { id?: string }) => {
    if (widget.id) {
      updateWidget(widget as WidgetConfig);
    } else {
      addWidget(widget);
    }
  };

  if (isLoading || !dashboard) {
    return (
      <div className="dci-dashboard-loading">
        <Spinner label={t('dashboard.loading')} />
      </div>
    );
  }

  const expandedSeries = expandedWidget ? seriesMap[expandedWidget.id] : null;

  return (
    <div className={['dci-dashboard', className].filter(Boolean).join(' ')}>
      <DashboardToolbar
        title={dashboard.name}
        editable={editable}
        onEditableChange={setEditable}
        onAddWidget={() => {
          setEditingWidget(undefined);
          setEditorOpen(true);
        }}
        actions={
          isSaving ? (
            <span className="dci-dashboard-saving">{t('dashboard.saving')}</span>
          ) : undefined
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
                onExpand={() => setExpandedWidget(widget)}
                onEdit={
                  editable
                    ? () => {
                        setEditingWidget(widget);
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
          setEditingWidget(undefined);
        }}
        onSave={handleSaveWidget}
        metrics={metrics}
        fetchPreview={fetchPreview}
        initialWidget={editingWidget}
      />

      {expandedWidget && (
        <WidgetExpandView
          open={Boolean(expandedWidget)}
          onClose={() => setExpandedWidget(null)}
          title={expandedWidget.title}
        >
          <Chart
            type={expandedWidget.chartType}
            series={
              expandedSeries ?? {
                id: expandedWidget.metricId,
                label: expandedWidget.title,
                points: [],
              }
            }
            density="comfortable"
            loading={!expandedSeries}
            height={480}
          />
        </WidgetExpandView>
      )}
    </div>
  );
}
