import { describe, it, expect, vi, afterEach } from 'vitest';
import { flattenSidebarItems, resolvePrimaryNavItems, type SidebarNavGroup } from './sidebar.js';

const groups: SidebarNavGroup[] = [
  {
    id: 'a',
    items: [
      { id: 'one', label: 'One', icon: 'grid' },
      { id: 'two', label: 'Two', icon: 'bell' },
    ],
  },
  {
    id: 'b',
    items: [{ id: 'three', label: 'Three', icon: 'key' }],
  },
];

describe('sidebar helpers', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('flattenSidebarItems preserves order', () => {
    expect(flattenSidebarItems(groups).map((i) => i.id)).toEqual(['one', 'two', 'three']);
  });

  it('resolvePrimaryNavItems returns items by id up to max', () => {
    const result = resolvePrimaryNavItems(groups, ['three', 'one', 'two'], 2);
    expect(result.map((i) => i.id)).toEqual(['three', 'one']);
  });

  it('resolvePrimaryNavItems skips unknown ids with dev warning', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const result = resolvePrimaryNavItems(groups, ['missing', 'one'], 4);
    expect(result.map((i) => i.id)).toEqual(['one']);
    expect(warn).toHaveBeenCalled();
  });
});
