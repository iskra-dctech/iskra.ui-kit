import { Keys } from './keyboard.js';

export interface MenuItemLike {
  id: string;
  disabled?: boolean;
}

/**
 * Pure roving-index resolver for the Menu pattern. Given the currently
 * focused item index and a key, returns the next enabled index, or
 * `undefined` if the key is not a navigation key.
 */
export function getNextMenuItemIndex(
  items: MenuItemLike[],
  currentIndex: number,
  key: string,
): number | undefined {
  const enabledIndices = items
    .map((item, index) => (!item.disabled ? index : -1))
    .filter((index) => index >= 0);
  if (enabledIndices.length === 0) return undefined;

  const pos = enabledIndices.indexOf(currentIndex);
  const safePos = pos === -1 ? 0 : pos;

  switch (key) {
    case Keys.ArrowDown:
      return enabledIndices[(safePos + 1) % enabledIndices.length];
    case Keys.ArrowUp:
      return enabledIndices[(safePos - 1 + enabledIndices.length) % enabledIndices.length];
    case Keys.Home:
      return enabledIndices[0];
    case Keys.End:
      return enabledIndices[enabledIndices.length - 1];
    default:
      return undefined;
  }
}

/** Index of the first non-disabled menu item. */
export function firstEnabledMenuItemIndex(items: MenuItemLike[]): number | undefined {
  const index = items.findIndex((item) => !item.disabled);
  return index === -1 ? undefined : index;
}
