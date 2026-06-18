import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMediaQuery, useBreakpoint } from './useMediaQuery.js';
import { MEDIA_BELOW_MD } from '../responsive/breakpoints.js';

function createMatchMedia(matches: boolean) {
  return vi.fn((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe('useMediaQuery', () => {
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    window.matchMedia = createMatchMedia(false);
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('returns ssrMatch default before mount when window is absent', () => {
    const saved = window.matchMedia;
    // @ts-expect-error simulate SSR
    delete window.matchMedia;
    const { result } = renderHook(() =>
      useMediaQuery(MEDIA_BELOW_MD, { ssrMatch: true }),
    );
    expect(result.current).toBe(true);
    window.matchMedia = saved;
  });

  it('subscribes to matchMedia and updates on change', () => {
    let listener: ((e: MediaQueryListEvent) => void) | null = null;
    window.matchMedia = vi.fn(() => ({
      matches: false,
      media: MEDIA_BELOW_MD,
      onchange: null,
      addEventListener: (_: string, fn: (e: MediaQueryListEvent) => void) => {
        listener = fn;
      },
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })) as typeof window.matchMedia;

    const { result } = renderHook(() => useMediaQuery(MEDIA_BELOW_MD));
    expect(result.current).toBe(false);

    act(() => {
      listener?.({ matches: true } as MediaQueryListEvent);
    });
    expect(result.current).toBe(true);
  });

  it('useBreakpoint resolves below-md query', () => {
    const { result } = renderHook(() => useBreakpoint('below-md'));
    expect(typeof result.current).toBe('boolean');
    expect(window.matchMedia).toHaveBeenCalledWith(MEDIA_BELOW_MD);
  });
});
