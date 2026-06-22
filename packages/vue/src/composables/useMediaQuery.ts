import { onMounted, onUnmounted, ref, type Ref } from 'vue';
import { mediaQueryForBreakpoint, type BreakpointName } from '../responsive/breakpoints.js';

export interface UseMediaQueryOptions {
  /** SSR default when `window` is unavailable. Default `false`. */
  ssrMatch?: boolean;
}

function getMatch(query: string, fallback: boolean): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return fallback;
  }
  return window.matchMedia(query).matches;
}

/**
 * Subscribes to a CSS media query. Safe for SSR when `ssrMatch` is set explicitly.
 */
export function useMediaQuery(query: string, options: UseMediaQueryOptions = {}): Ref<boolean> {
  const { ssrMatch = false } = options;
  const matches = ref(getMatch(query, ssrMatch));

  let mql: MediaQueryList | null = null;

  const onChange = (e: MediaQueryListEvent) => {
    matches.value = e.matches;
  };

  onMounted(() => {
    if (typeof window.matchMedia !== 'function') return;
    mql = window.matchMedia(query);
    matches.value = mql.matches;
    mql.addEventListener('change', onChange);
  });

  onUnmounted(() => {
    mql?.removeEventListener('change', onChange);
  });

  return matches;
}

export function useBreakpoint(name: BreakpointName, options?: UseMediaQueryOptions): Ref<boolean> {
  return useMediaQuery(mediaQueryForBreakpoint(name), options);
}
