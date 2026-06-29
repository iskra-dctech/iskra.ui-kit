import { useEffect, useState } from 'react';
import type { ChartType, MetricDefinition, MetricSeries, WidgetConfig } from '@iskra-ui/core';
import { useIskraT } from '../../i18n/useIskraT.js';
import { Button } from '../Button/Button.js';
import { Chart } from '../Chart/Chart.js';
import { ChartTypeSelector } from '../ChartTypeSelector/ChartTypeSelector.js';
import { MetricPicker } from '../MetricPicker/MetricPicker.js';
import { Modal } from '../Modal/Modal.js';
import { Sheet } from '../Sheet/Sheet.js';
import { TextField } from '../TextField/TextField.js';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import { MEDIA_BELOW_MD } from '../../responsive/breakpoints.js';
import './WidgetEditor.css';

export interface WidgetEditorProps {
  open: boolean;
  onClose: () => void;
  onSave: (widget: Omit<WidgetConfig, 'id'> & { id?: string }) => void;
  metrics: MetricDefinition[];
  fetchPreview: (metricId: string, chartType: ChartType) => Promise<MetricSeries>;
  initialWidget?: WidgetConfig;
}

interface PreviewState {
  key: string;
  data: MetricSeries | null;
  error?: string;
}

function WidgetEditorForm({
  metrics,
  fetchPreview,
  initialWidget,
  onClose,
  onSave,
}: Omit<WidgetEditorProps, 'open'>) {
  const t = useIskraT();
  const [metricId, setMetricId] = useState(initialWidget?.metricId ?? '');
  const [chartType, setChartType] = useState<ChartType>(initialWidget?.chartType ?? 'line');
  const [title, setTitle] = useState(initialWidget?.title ?? '');
  const [previewState, setPreviewState] = useState<PreviewState>({ key: '', data: null });

  const previewKey = metricId ? `${metricId}:${chartType}` : '';
  const preview = previewState.key === previewKey ? previewState.data : null;
  const loading = Boolean(metricId) && previewState.key !== previewKey;
  const error = previewState.key === previewKey ? previewState.error : undefined;

  const handleMetricChange = (id: string) => {
    setMetricId(id);
    const metric = metrics.find((m) => m.id === id);
    if (metric && !title.trim()) {
      setTitle(metric.label);
    }
  };

  useEffect(() => {
    if (!metricId) return;
    const key = `${metricId}:${chartType}`;
    let cancelled = false;
    fetchPreview(metricId, chartType)
      .then((series) => {
        if (!cancelled) setPreviewState({ key, data: series });
      })
      .catch(() => {
        if (!cancelled) {
          setPreviewState({ key, data: null, error: t('widget.previewLoadError') });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [metricId, chartType, fetchPreview, t]);

  const canSave = Boolean(metricId && title.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSave) return;
    onSave({
      id: initialWidget?.id,
      title: title.trim(),
      metricId,
      chartType,
      timeRange: initialWidget?.timeRange ?? '24h',
    });
    onClose();
  };

  return (
    <form className="ik-widget-editor-form" onSubmit={handleSubmit}>
      <div className="ik-widget-editor-field">
        <label htmlFor="widget-metric">{t('widget.metric')}</label>
        <MetricPicker metrics={metrics} value={metricId} onChange={handleMetricChange} />
      </div>
      <div className="ik-widget-editor-field">
        <span id="widget-chart-type-label">{t('widget.chartType')}</span>
        <ChartTypeSelector value={chartType} onChange={setChartType} />
      </div>
      <div className="ik-widget-editor-field">
        <label htmlFor="widget-title">{t('widget.title')}</label>
        <TextField
          id="widget-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t('widget.titlePlaceholder')}
        />
      </div>
      <div className="ik-widget-editor-field">
        <span id="widget-preview-label">{t('widget.preview')}</span>
        <div className="ik-widget-editor-preview" aria-labelledby="widget-preview-label">
          {metricId ? (
            <Chart
              type={chartType}
              series={preview ?? { id: metricId, label: title, points: [] }}
              density="comfortable"
              loading={loading}
              error={error}
              height={200}
            />
          ) : (
            <div className="ik-chart-state">{t('chart.selectMetricForPreview')}</div>
          )}
        </div>
      </div>
      <div className="ik-modal-footer" style={{ marginTop: 8, padding: 0 }}>
        <Button type="button" variant="ghost" onClick={onClose}>
          {t('common.cancel')}
        </Button>
        <Button type="submit" disabled={!canSave}>
          {t('common.save')}
        </Button>
      </div>
    </form>
  );
}

/**
 * WidgetEditor — modal (desktop) or sheet (mobile) for creating/editing dashboard widgets.
 */
export function WidgetEditor({
  open,
  onClose,
  onSave,
  metrics,
  fetchPreview,
  initialWidget,
}: WidgetEditorProps) {
  const t = useIskraT();
  const isMobile = useMediaQuery(MEDIA_BELOW_MD);
  const title = initialWidget ? t('widget.edit') : t('widget.add');
  const formKey = open ? (initialWidget?.id ?? 'new') : 'closed';

  const form = open ? (
    <WidgetEditorForm
      key={formKey}
      onClose={onClose}
      onSave={onSave}
      metrics={metrics}
      fetchPreview={fetchPreview}
      initialWidget={initialWidget}
    />
  ) : null;

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={(next) => !next && onClose()} title={title} snap="full">
        {form}
      </Sheet>
    );
  }

  return (
    <Modal open={open} onClose={onClose} title={title} size="l">
      {form}
    </Modal>
  );
}
