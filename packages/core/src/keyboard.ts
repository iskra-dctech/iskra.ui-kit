/** Canonical `KeyboardEvent.key` values used across the design system. */
export const Keys = {
  Enter: 'Enter',
  Space: ' ',
  Escape: 'Escape',
  Tab: 'Tab',
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  Home: 'Home',
  End: 'End',
} as const;

export type Key = (typeof Keys)[keyof typeof Keys];

/** True for keys that should activate a button/option (Enter or Space). */
export function isActivationKey(key: string): boolean {
  return key === Keys.Enter || key === Keys.Space;
}
