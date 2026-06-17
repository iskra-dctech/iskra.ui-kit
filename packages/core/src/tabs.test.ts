import { describe, expect, it } from 'vitest';
import { createTabsIds, firstEnabledValue, getNextTabValue } from './tabs.js';
import { Keys } from './keyboard.js';

const items = [{ value: 'a' }, { value: 'b', disabled: true }, { value: 'c' }, { value: 'd' }];

describe('getNextTabValue', () => {
  it('moves to the next enabled tab, skipping disabled', () => {
    expect(getNextTabValue(items, 'a', Keys.ArrowRight)).toBe('c');
  });

  it('wraps from last to first', () => {
    expect(getNextTabValue(items, 'd', Keys.ArrowRight)).toBe('a');
  });

  it('moves to the previous enabled tab', () => {
    expect(getNextTabValue(items, 'c', Keys.ArrowLeft)).toBe('a');
  });

  it('Home/End jump to first/last enabled', () => {
    expect(getNextTabValue(items, 'c', Keys.Home)).toBe('a');
    expect(getNextTabValue(items, 'a', Keys.End)).toBe('d');
  });

  it('honours vertical orientation keys', () => {
    expect(getNextTabValue(items, 'a', Keys.ArrowDown, 'vertical')).toBe('c');
    expect(getNextTabValue(items, 'a', Keys.ArrowRight, 'vertical')).toBeUndefined();
  });

  it('returns undefined for non-navigation keys', () => {
    expect(getNextTabValue(items, 'a', 'x')).toBeUndefined();
  });
});

describe('helpers', () => {
  it('firstEnabledValue skips disabled', () => {
    expect(firstEnabledValue(items)).toBe('a');
    expect(firstEnabledValue([{ value: 'z', disabled: true }, { value: 'y' }])).toBe('y');
  });

  it('createTabsIds builds related ids', () => {
    const ids = createTabsIds('base');
    expect(ids.tab('a')).toBe('base-tab-a');
    expect(ids.panel('a')).toBe('base-panel-a');
  });
});
