import { describe, expect, it } from 'vitest';
import { firstEnabledMenuItemIndex, getNextMenuItemIndex } from './menu.js';
import { Keys } from './keyboard.js';

const items = [{ id: 'a' }, { id: 'b', disabled: true }, { id: 'c' }, { id: 'd' }];

describe('getNextMenuItemIndex', () => {
  it('moves down skipping disabled items', () => {
    expect(getNextMenuItemIndex(items, 0, Keys.ArrowDown)).toBe(2);
  });

  it('wraps from last enabled to first', () => {
    expect(getNextMenuItemIndex(items, 3, Keys.ArrowDown)).toBe(0);
  });

  it('moves up skipping disabled items', () => {
    expect(getNextMenuItemIndex(items, 2, Keys.ArrowUp)).toBe(0);
  });

  it('Home/End jump to first/last enabled', () => {
    expect(getNextMenuItemIndex(items, 2, Keys.Home)).toBe(0);
    expect(getNextMenuItemIndex(items, 0, Keys.End)).toBe(3);
  });

  it('returns undefined for non-navigation keys', () => {
    expect(getNextMenuItemIndex(items, 0, 'x')).toBeUndefined();
  });
});

describe('firstEnabledMenuItemIndex', () => {
  it('returns first non-disabled index', () => {
    expect(firstEnabledMenuItemIndex(items)).toBe(0);
    expect(firstEnabledMenuItemIndex([{ id: 'x', disabled: true }, { id: 'y' }])).toBe(1);
  });
});
