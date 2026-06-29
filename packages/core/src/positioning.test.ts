import { describe, expect, it } from 'vitest';
import { computeAnchorPosition, computeCursorPosition } from './positioning.js';

const viewport = { width: 400, height: 300 };

describe('computeAnchorPosition', () => {
  it('places panel below anchor start', () => {
    const anchor = { top: 10, left: 20, right: 120, bottom: 40, width: 100, height: 30 } as DOMRect;
    const pos = computeAnchorPosition(
      anchor,
      { width: 80, height: 50 },
      'bottom-start',
      8,
      viewport,
    );
    expect(pos).toEqual({ top: 48, left: 20 });
  });

  it('clamps panel inside viewport', () => {
    const anchor = {
      top: 280,
      left: 380,
      right: 400,
      bottom: 295,
      width: 20,
      height: 15,
    } as DOMRect;
    const pos = computeAnchorPosition(
      anchor,
      { width: 100, height: 80 },
      'bottom-start',
      8,
      viewport,
    );
    expect(pos.top).toBeLessThanOrEqual(300 - 80 - 8);
    expect(pos.left).toBeLessThanOrEqual(400 - 100 - 8);
  });
});

describe('computeCursorPosition', () => {
  it('places panel at cursor with offset', () => {
    const pos = computeCursorPosition({ x: 50, y: 60 }, { width: 120, height: 40 }, 4, viewport);
    expect(pos).toEqual({ top: 64, left: 54 });
  });

  it('clamps panel inside viewport', () => {
    const pos = computeCursorPosition({ x: 390, y: 290 }, { width: 100, height: 50 }, 0, viewport);
    expect(pos.left).toBe(400 - 100 - 8);
    expect(pos.top).toBe(300 - 50 - 8);
  });
});
