import { useEffect, useState } from 'react';
import {
  mediaQueryForBreakpoint,
  type BreakpointName,
} from '../responsive/breakpoints.js';

export interface UseMediaQueryOptions {
  /**
   * SSR default when `window` is unavailable.
   * `false` (default): server renders desktop layout; client updates after mount.
   */
  ssrMatch?: boolean;
}

function getMatch(query: string): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia(query).matches;
}

/**
 * Subscribes to a CSS media query. Safe for SSR when `ssrMatch` is set explicitly.
 */
export function useMediaQuery(
  query: string,
  options: UseMediaQueryOptions = {},
): boolean {
  const { ssrMatch = false } = options;
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return ssrMatch;
    return getMatch(query);
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Alias for common breakpoint tokens (`below-md` | `md-up`). */
export function useBreakpoint(
  name: BreakpointName,
  options?: UseMediaQueryOptions,
): boolean {
  return useMediaQuery(mediaQueryForBreakpoint(name), options);
}
