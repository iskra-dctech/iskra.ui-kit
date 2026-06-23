import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import {
  createEmptyDashboard,
  dashboardReducer,
  DEFAULT_WIDGET_SIZE,
  findNextLayoutPosition,
  type DashboardConfig,
  type DashboardStore,
  type LayoutItem,
  type WidgetConfig,
} from '@iskra-ui/core';

export interface UseDashboardOptions {
  dashboardId: string;
  store: DashboardStore;
  defaultName?: string;
  debounceMs?: number;
}

export interface UseDashboardResult {
  dashboard: DashboardConfig | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  editable: boolean;
  setEditable: (editable: boolean) => void;
  addWidget: (widget: Omit<WidgetConfig, 'id'> & { id?: string }) => void;
  updateWidget: (widget: WidgetConfig) => void;
  removeWidget: (widgetId: string) => void;
  setLayout: (layout: LayoutItem[]) => void;
  rename: (name: string) => void;
}

function createWidgetId() {
  return `w-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * useDashboard — wires dashboardReducer to a DashboardStore with debounced auto-save.
 */
export function useDashboard({
  dashboardId,
  store,
  defaultName = 'Dashboard',
  debounceMs = 300,
}: UseDashboardOptions): UseDashboardResult {
  const [dashboard, dispatch] = useReducer(
    dashboardReducer,
    createEmptyDashboard(dashboardId, defaultName),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editable, setEditable] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    store
      .load(dashboardId)
      .then((loaded) => {
        if (cancelled) return;
        if (loaded) {
          dispatch({ type: 'HYDRATE', config: loaded });
        } else {
          dispatch({
            type: 'HYDRATE',
            config: createEmptyDashboard(dashboardId, defaultName),
          });
        }
        hydrated.current = true;
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load dashboard');
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [dashboardId, store, defaultName]);

  const scheduleSave = useCallback(
    (config: DashboardConfig) => {
      if (!hydrated.current) return;
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        setIsSaving(true);
        store
          .save(config)
          .catch((err: unknown) => {
            setError(err instanceof Error ? err.message : 'Failed to save dashboard');
          })
          .finally(() => setIsSaving(false));
      }, debounceMs);
    },
    [store, debounceMs],
  );

  useEffect(() => {
    scheduleSave(dashboard);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [dashboard, scheduleSave]);

  const addWidget = useCallback((widget: Omit<WidgetConfig, 'id'> & { id?: string }) => {
    const id = widget.id ?? createWidgetId();
    const full: WidgetConfig = { ...widget, id };
    const position = findNextLayoutPosition(dashboard.layout, DEFAULT_WIDGET_SIZE);
    const layout: LayoutItem = { i: id, ...position };
    dispatch({ type: 'ADD_WIDGET', widget: full, layout });
  }, [dashboard.layout]);

  const updateWidget = useCallback((widget: WidgetConfig) => {
    dispatch({ type: 'UPDATE_WIDGET', widget });
  }, []);

  const removeWidget = useCallback((widgetId: string) => {
    dispatch({ type: 'REMOVE_WIDGET', widgetId });
  }, []);

  const setLayout = useCallback((layout: LayoutItem[]) => {
    dispatch({ type: 'SET_LAYOUT', layout });
  }, []);

  const rename = useCallback((name: string) => {
    dispatch({ type: 'RENAME_DASHBOARD', name });
  }, []);

  return {
    dashboard,
    isLoading,
    isSaving,
    error,
    editable,
    setEditable,
    addWidget,
    updateWidget,
    removeWidget,
    setLayout,
    rename,
  };
}
