import { useSyncExternalStore } from 'react';
import { mediaQueryForBreakpoint, type BreakpointName } from '../responsive/breakpoints.js';

export interface UseMediaQueryOptions {
  /**
   * SSR default when `window` is unavailable.
   * `false` (default): server renders desktop layout; client updates after mount.
   */
  ssrMatch?: boolean;
}

function getSnapshot(query: string, fallback: boolean): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return fallback;
  }
  return window.matchMedia(query).matches;
}

function subscribe(query: string, onStoreChange: () => void): () => void {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return () => undefined;
  }
  const mql = window.matchMedia(query);
  mql.addEventListener('change', onStoreChange);
  return () => mql.removeEventListener('change', onStoreChange);
}

/**
 * Subscribes to a CSS media query. Safe for SSR when `ssrMatch` is set explicitly.
 */
export function useMediaQuery(query: string, options: UseMediaQueryOptions = {}): boolean {
  const { ssrMatch = false } = options;
  return useSyncExternalStore(
    (onStoreChange) => subscribe(query, onStoreChange),
    () => getSnapshot(query, ssrMatch),
    () => ssrMatch,
  );
}

/** Alias for common breakpoint tokens (`below-md` | `md-up`). */
export function useBreakpoint(name: BreakpointName, options?: UseMediaQueryOptions): boolean {
  return useMediaQuery(mediaQueryForBreakpoint(name), options);
}
