import { describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { createEmptyDashboard, createLocalStorageDashboardStore } from '@iskra-ui/core';
import { useDashboard } from './useDashboard.js';

describe('useDashboard', () => {
  it('loads and saves dashboard', async () => {
    const store = createLocalStorageDashboardStore({ keyPrefix: 'test.hook' });
    const seed = createEmptyDashboard('dash-1', 'Test');
    await store.save(seed);

    const { result } = renderHook(() =>
      useDashboard({ dashboardId: 'dash-1', store, debounceMs: 50 }),
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.dashboard?.name).toBe('Test');

    result.current.addWidget({
      title: 'CPU',
      metricId: 'cpu',
      chartType: 'line',
    });

    await waitFor(() => expect(result.current.dashboard?.widgets).toHaveLength(1));
  });
});
