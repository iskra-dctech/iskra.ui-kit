import { describe, expect, it } from 'vitest';
import {
  createEmptyDashboard,
  dashboardReducer,
  findNextLayoutPosition,
  migrateDashboardConfig,
} from './dashboard.js';
import { createLocalStorageDashboardStore } from './dashboardStore.js';

describe('dashboardReducer', () => {
  const base = createEmptyDashboard('d1', 'Fleet');

  it('adds, updates and removes widgets', () => {
    const widget = {
      id: 'w1',
      title: 'CPU',
      metricId: 'cpu',
      chartType: 'line' as const,
    };
    const layout = { i: 'w1', x: 0, y: 0, w: 4, h: 3 };
    const withWidget = dashboardReducer(base, {
      type: 'ADD_WIDGET',
      widget,
      layout,
    });
    expect(withWidget.widgets).toHaveLength(1);

    const updated = dashboardReducer(withWidget, {
      type: 'UPDATE_WIDGET',
      widget: { ...widget, title: 'CPU usage' },
    });
    expect(updated.widgets[0]?.title).toBe('CPU usage');

    const removed = dashboardReducer(updated, { type: 'REMOVE_WIDGET', widgetId: 'w1' });
    expect(removed.widgets).toHaveLength(0);
    expect(removed.layout).toHaveLength(0);
  });

  it('renames dashboard and sets layout', () => {
    const renamed = dashboardReducer(base, { type: 'RENAME_DASHBOARD', name: 'Ops' });
    expect(renamed.name).toBe('Ops');

    const layout = [{ i: 'w1', x: 0, y: 0, w: 6, h: 4 }];
    const withLayout = dashboardReducer(renamed, { type: 'SET_LAYOUT', layout });
    expect(withLayout.layout).toEqual(layout);
  });
});

describe('findNextLayoutPosition', () => {
  it('places first widget at origin', () => {
    expect(findNextLayoutPosition([])).toEqual({ x: 0, y: 0, w: 4, h: 3, minW: 2, minH: 2 });
  });

  it('stacks below existing widgets', () => {
    const pos = findNextLayoutPosition([{ i: 'a', x: 0, y: 0, w: 4, h: 3 }]);
    expect(pos.y).toBe(3);
  });
});

describe('migrateDashboardConfig', () => {
  it('accepts valid v1 config', () => {
    const config = createEmptyDashboard('x', 'Test');
    expect(migrateDashboardConfig(config)).toEqual(config);
  });

  it('rejects invalid payloads', () => {
    expect(migrateDashboardConfig(null)).toBeNull();
    expect(migrateDashboardConfig({ id: 'x' })).toBeNull();
  });
});

describe('createLocalStorageDashboardStore', () => {
  it('persists and loads dashboards', async () => {
    const mem = new Map<string, string>();
    const storage: StorageLike = {
      get length() {
        return mem.size;
      },
      getItem(key) {
        return mem.get(key) ?? null;
      },
      key(index) {
        return [...mem.keys()][index] ?? null;
      },
      removeItem(key) {
        mem.delete(key);
      },
      setItem(key, value) {
        mem.set(key, value);
      },
    };

    const store = createLocalStorageDashboardStore({
      keyPrefix: 'test.dash',
      storage,
    });
    const config = createEmptyDashboard('fleet', 'Fleet overview');
    await store.save(config);

    const loaded = await store.load('fleet');
    expect(loaded?.name).toBe('Fleet overview');

    const list = await store.list();
    expect(list).toHaveLength(1);
    expect(list[0]?.id).toBe('fleet');
  });
});
