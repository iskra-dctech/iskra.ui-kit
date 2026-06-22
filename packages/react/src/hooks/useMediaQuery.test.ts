import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMediaQuery, useBreakpoint } from './useMediaQuery.js';
import { MEDIA_BELOW_MD } from '../responsive/breakpoints.js';

type MatchMediaFn = typeof window.matchMedia;

function mockMatchMedia(
  getMatches: () => boolean,
  onSubscribe?: (notify: () => void) => void,
): MatchMediaFn {
  return vi.fn((query: string) => ({
    get matches() {
      return getMatches();
    },
    media: query,
    onchange: null,
    addEventListener: vi.fn((_type: string, listener: EventListenerOrEventListenerObject) => {
      const notify = () => {
        if (typeof listener === 'function') listener(new Event('change'));
      };
      onSubscribe?.(notify);
    }),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as MatchMediaFn;
}

describe('useMediaQuery', () => {
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    window.matchMedia = mockMatchMedia(() => false);
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('returns ssrMatch when matchMedia is unavailable', () => {
    const saved = window.matchMedia;
    // @ts-expect-error simulate environments without matchMedia
    window.matchMedia = undefined;
    const { result } = renderHook(() => useMediaQuery(MEDIA_BELOW_MD, { ssrMatch: true }));
    expect(result.current).toBe(true);
    window.matchMedia = saved;
  });

  it('subscribes to matchMedia and updates on change', () => {
    let matches = false;
    let onStoreChange: (() => void) | null = null;
    window.matchMedia = mockMatchMedia(
      () => matches,
      (notify) => {
        onStoreChange = notify;
      },
    );

    const { result } = renderHook(() => useMediaQuery(MEDIA_BELOW_MD));
    expect(result.current).toBe(false);

    act(() => {
      matches = true;
      onStoreChange?.();
    });
    expect(result.current).toBe(true);
  });

  it('useBreakpoint resolves below-md query', () => {
    const { result } = renderHook(() => useBreakpoint('below-md'));
    expect(typeof result.current).toBe('boolean');
    expect(window.matchMedia).toHaveBeenCalledWith(MEDIA_BELOW_MD);
  });
});
