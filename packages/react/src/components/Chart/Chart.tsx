import { useMemo } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from 'recharts';
import type { ChartDensity, ChartType, MetricSeries } from '@iskra-ui/core';
import { Spinner } from '../Spinner/Spinner.js';
import { useIskraT } from '../../i18n/useIskraT.js';
import { cx } from '../../utils/cx.js';
import './Chart.css';

export interface ChartProps {
  type: ChartType;
  series: MetricSeries;
  density?: ChartDensity;
  height?: number;
  showAxes?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  alertThreshold?: number;
  loading?: boolean;
  error?: string;
  className?: string;
}

interface ChartRow {
  label: string;
  value: number;
  timestamp: number;
}

const CHART_COLOR = 'var(--accent, #00ffc2)';
const GRID_COLOR = 'var(--line, #30363d)';
const AXIS_COLOR = 'var(--fg3, #6e7681)';

function formatTick(ts: number) {
  const d = new Date(ts);
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

function toRows(series: MetricSeries): ChartRow[] {
  return series.points.map((p) => ({
    label: formatTick(p.timestamp),
    value: p.value,
    timestamp: p.timestamp,
  }));
}

function ChartTooltip({
  active,
  payload,
  unit,
}: {
  active?: boolean;
  payload?: { value: number }[];
  unit?: string;
}) {
  if (!active || !payload?.length) return null;
  const val = payload[0]?.value;
  if (val == null) return null;
  return (
    <div
      style={{
        background: 'var(--panel, #161b22)',
        border: '1px solid var(--line, #30363d)',
        borderRadius: 'var(--radius, 4px)',
        padding: '6px 8px',
        fontSize: 12,
        color: 'var(--fg1, #f0f6fc)',
      }}
    >
      {val}
      {unit ? ` ${unit}` : ''}
    </div>
  );
}

/**
 * Chart — unified metric visualisation (line, bar, area, dot/scatter).
 * Dot chart (`scatter`) renders as a line-less series of points over time.
 * `density="compact"` hides axes for dashboard widget thumbnails;
 * `density="comfortable"` enables full axes, legend and tooltip.
 */
export function Chart({
  type,
  series,
  density = 'comfortable',
  height,
  showAxes,
  showLegend,
  showTooltip,
  alertThreshold,
  loading = false,
  error,
  className,
}: ChartProps) {
  const t = useIskraT();
  const compact = density === 'compact';
  const resolvedHeight = height ?? (compact ? 72 : 280);
  const axes = showAxes ?? !compact;
  const legend = showLegend ?? !compact;
  const tooltip = showTooltip ?? !compact;

  const data = useMemo(() => toRows(series), [series]);

  if (loading) {
    return (
      <div className={cx('ik-chart', compact && 'ik-chart-compact', className)}>
        <div className="ik-chart-state" style={{ minHeight: resolvedHeight }}>
          <Spinner size="s" label={t('chart.loading')} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cx('ik-chart', compact && 'ik-chart-compact', className)}>
        <div className={cx('ik-chart-state', 'is-error')} style={{ minHeight: resolvedHeight }}>
          {error}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={cx('ik-chart', compact && 'ik-chart-compact', className)}>
        <div className="ik-chart-state" style={{ minHeight: resolvedHeight }}>
          {t('chart.noData')}
        </div>
      </div>
    );
  }

  const margin = compact
    ? { top: 4, right: 4, bottom: 4, left: 4 }
    : { top: 12, right: 16, bottom: 8, left: 8 };

  const commonAxis = axes ? (
    <>
      <XAxis
        dataKey="label"
        tick={{ fill: AXIS_COLOR, fontSize: 10 }}
        axisLine={{ stroke: GRID_COLOR }}
        tickLine={{ stroke: GRID_COLOR }}
        interval="preserveStartEnd"
      />
      <YAxis
        tick={{ fill: AXIS_COLOR, fontSize: 10 }}
        axisLine={{ stroke: GRID_COLOR }}
        tickLine={{ stroke: GRID_COLOR }}
        width={36}
      />
      <CartesianGrid stroke={GRID_COLOR} strokeDasharray="3 3" vertical={false} />
    </>
  ) : null;

  const tooltipEl = tooltip ? (
    <Tooltip content={<ChartTooltip unit={series.unit} />} />
  ) : null;

  const thresholdEl =
    alertThreshold != null && axes ? (
      <ReferenceLine y={alertThreshold} stroke="var(--warn, #f0b429)" strokeDasharray="4 4" />
    ) : null;

  const dotRadius = compact ? 2.5 : 3.5;

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data} margin={margin}>
            {commonAxis}
            {tooltipEl}
            {thresholdEl}
            <Line
              type="monotone"
              dataKey="value"
              stroke={CHART_COLOR}
              strokeWidth={compact ? 1.5 : 2}
              dot={false}
              activeDot={compact ? false : { r: 3 }}
              name={series.label}
            />
            {legend && <Legend />}
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart data={data} margin={margin}>
            {commonAxis}
            {tooltipEl}
            {thresholdEl}
            <Area
              type="monotone"
              dataKey="value"
              stroke={CHART_COLOR}
              fill={CHART_COLOR}
              fillOpacity={0.15}
              strokeWidth={compact ? 1.5 : 2}
              name={series.label}
            />
            {legend && <Legend />}
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart data={data} margin={margin}>
            {commonAxis}
            {tooltipEl}
            {thresholdEl}
            <Bar dataKey="value" fill={CHART_COLOR} radius={[2, 2, 0, 0]} name={series.label} />
            {legend && <Legend />}
          </BarChart>
        );
      case 'scatter':
        return (
          <LineChart data={data} margin={margin}>
            {commonAxis}
            {tooltipEl}
            {thresholdEl}
            <Line
              type="monotone"
              dataKey="value"
              stroke="none"
              dot={{ r: dotRadius, fill: CHART_COLOR, strokeWidth: 0 }}
              activeDot={tooltip ? { r: dotRadius + 1.5, fill: CHART_COLOR } : false}
              isAnimationActive={false}
              name={series.label}
            />
            {legend && <Legend />}
          </LineChart>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={cx(
        'ik-chart',
        compact ? 'ik-chart-compact' : 'ik-chart-comfortable',
        className,
      )}
      role="img"
      aria-label={`${series.label}${series.unit ? `, ${series.unit}` : ''}`}
    >
      <div className="ik-chart-inner" style={{ height: resolvedHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart() ?? <div />}
        </ResponsiveContainer>
      </div>
      {legend && compact && (
        <div className="ik-chart-legend" aria-hidden="true">
          <span className="ik-chart-legend-item">
            <span className="ik-chart-legend-swatch" />
            {series.label}
          </span>
        </div>
      )}
    </div>
  );
}
