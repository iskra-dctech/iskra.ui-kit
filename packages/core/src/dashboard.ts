/**
 * Headless dashboard model — types, reducer and schema migration.
 * Framework-agnostic; React/Vue own rendering and persistence wiring.
 */

export const DASHBOARD_SCHEMA_VERSION = 1 as const;

export type ChartType = 'line' | 'bar' | 'area' | 'scatter';
export type ChartDensity = 'compact' | 'comfortable';

export interface DataPoint {
  timestamp: number;
  value: number;
}

export interface MetricSeries {
  id: string;
  label: string;
  unit?: string;
  points: DataPoint[];
}

export interface MetricDefinition {
  id: string;
  label: string;
  unit?: string;
  group?: string;
  description?: string;
}

export interface WidgetConfig {
  id: string;
  title: string;
  metricId: string;
  chartType: ChartType;
  timeRange?: string;
}

export interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
}

export interface DashboardConfig {
  id: string;
  name: string;
  version: typeof DASHBOARD_SCHEMA_VERSION;
  widgets: WidgetConfig[];
  layout: LayoutItem[];
  updatedAt: string;
}

export type DashboardSummary = Pick<DashboardConfig, 'id' | 'name' | 'updatedAt'>;

export type DashboardEvent =
  | { type: 'HYDRATE'; config: DashboardConfig }
  | { type: 'ADD_WIDGET'; widget: WidgetConfig; layout: LayoutItem }
  | { type: 'UPDATE_WIDGET'; widget: WidgetConfig }
  | { type: 'REMOVE_WIDGET'; widgetId: string }
  | { type: 'SET_LAYOUT'; layout: LayoutItem[] }
  | { type: 'RENAME_DASHBOARD'; name: string };

export const DEFAULT_WIDGET_SIZE = { w: 4, h: 3, minW: 2, minH: 2 } as const;

/** Find the next free grid position for a new widget (12-column grid). */
export function findNextLayoutPosition(
  layout: LayoutItem[],
  size: Pick<LayoutItem, 'w' | 'h' | 'minW' | 'minH'> = DEFAULT_WIDGET_SIZE,
): Pick<LayoutItem, 'x' | 'y' | 'w' | 'h' | 'minW' | 'minH'> {
  if (layout.length === 0) {
    return { x: 0, y: 0, ...size };
  }

  const maxY = Math.max(...layout.map((item) => item.y + item.h));
  return { x: 0, y: maxY, ...size };
}

export function createEmptyDashboard(id: string, name: string): DashboardConfig {
  const now = new Date().toISOString();
  return {
    id,
    name,
    version: DASHBOARD_SCHEMA_VERSION,
    widgets: [],
    layout: [],
    updatedAt: now,
  };
}

export function dashboardReducer(state: DashboardConfig, event: DashboardEvent): DashboardConfig {
  const now = new Date().toISOString();

  switch (event.type) {
    case 'HYDRATE':
      return { ...event.config, updatedAt: event.config.updatedAt || now };

    case 'ADD_WIDGET':
      return {
        ...state,
        widgets: [...state.widgets, event.widget],
        layout: [...state.layout, event.layout],
        updatedAt: now,
      };

    case 'UPDATE_WIDGET':
      return {
        ...state,
        widgets: state.widgets.map((w) => (w.id === event.widget.id ? event.widget : w)),
        updatedAt: now,
      };

    case 'REMOVE_WIDGET':
      return {
        ...state,
        widgets: state.widgets.filter((w) => w.id !== event.widgetId),
        layout: state.layout.filter((l) => l.i !== event.widgetId),
        updatedAt: now,
      };

    case 'SET_LAYOUT':
      return {
        ...state,
        layout: event.layout,
        updatedAt: now,
      };

    case 'RENAME_DASHBOARD':
      return {
        ...state,
        name: event.name,
        updatedAt: now,
      };

    default:
      return state;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isChartType(value: unknown): value is ChartType {
  return value === 'line' || value === 'bar' || value === 'area' || value === 'scatter';
}

function isWidgetConfig(value: unknown): value is WidgetConfig {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.metricId === 'string' &&
    isChartType(value.chartType) &&
    (value.timeRange === undefined || typeof value.timeRange === 'string')
  );
}

function isLayoutItem(value: unknown): value is LayoutItem {
  if (!isRecord(value)) return false;
  return (
    typeof value.i === 'string' &&
    typeof value.x === 'number' &&
    typeof value.y === 'number' &&
    typeof value.w === 'number' &&
    typeof value.h === 'number'
  );
}

/** Parse and migrate raw persisted dashboard JSON. Returns null when invalid. */
export function migrateDashboardConfig(raw: unknown): DashboardConfig | null {
  if (!isRecord(raw)) return null;
  if (typeof raw.id !== 'string' || typeof raw.name !== 'string') return null;

  const version = raw.version;
  if (version !== 1) return null;

  if (!Array.isArray(raw.widgets) || !Array.isArray(raw.layout)) return null;
  if (!raw.widgets.every(isWidgetConfig) || !raw.layout.every(isLayoutItem)) {
    return null;
  }

  return {
    id: raw.id,
    name: raw.name,
    version: DASHBOARD_SCHEMA_VERSION,
    widgets: raw.widgets,
    layout: raw.layout,
    updatedAt: typeof raw.updatedAt === 'string' ? raw.updatedAt : new Date().toISOString(),
  };
}
