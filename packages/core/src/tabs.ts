import { Keys } from './keyboard.js';

export type Orientation = 'horizontal' | 'vertical';

export interface TabsItemLike {
  value: string;
  disabled?: boolean;
}

export interface TabsIds {
  tab: (value: string) => string;
  panel: (value: string) => string;
}

/** Build stable tab/panel id helpers from a base id (for `aria-controls`/`aria-labelledby`). */
export function createTabsIds(baseId: string): TabsIds {
  return {
    tab: (value) => `${baseId}-tab-${value}`,
    panel: (value) => `${baseId}-panel-${value}`,
  };
}

/** First non-disabled value — the sensible default selection. */
export function firstEnabledValue(items: TabsItemLike[]): string | undefined {
  return items.find((i) => !i.disabled)?.value;
}

/**
 * Pure roving-tabindex resolver for the Tabs pattern. Given the currently
 * focused value and a key, returns the value that should receive focus next,
 * or `undefined` if the key is not a navigation key. Disabled tabs are skipped
 * and navigation wraps around.
 */
export function getNextTabValue(
  items: TabsItemLike[],
  currentValue: string,
  key: string,
  orientation: Orientation = 'horizontal',
): string | undefined {
  const enabled = items.filter((i) => !i.disabled);
  if (enabled.length === 0) return undefined;

  const nextKey = orientation === 'horizontal' ? Keys.ArrowRight : Keys.ArrowDown;
  const prevKey = orientation === 'horizontal' ? Keys.ArrowLeft : Keys.ArrowUp;
  const pos = enabled.findIndex((i) => i.value === currentValue);
  const safePos = pos === -1 ? 0 : pos;

  switch (key) {
    case nextKey:
      return enabled[(safePos + 1) % enabled.length]!.value;
    case prevKey:
      return enabled[(safePos - 1 + enabled.length) % enabled.length]!.value;
    case Keys.Home:
      return enabled[0]!.value;
    case Keys.End:
      return enabled[enabled.length - 1]!.value;
    default:
      return undefined;
  }
}
