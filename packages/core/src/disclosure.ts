/**
 * Headless open/close model shared by Disclosure, Dialog, Popover, Tooltip.
 * Pure reducer — frameworks own the storage of `open`.
 */
export type DisclosureEvent = 'open' | 'close' | 'toggle';

export function disclosureReducer(open: boolean, event: DisclosureEvent): boolean {
  switch (event) {
    case 'open':
      return true;
    case 'close':
      return false;
    case 'toggle':
      return !open;
    default:
      return open;
  }
}

export interface TriggerAria {
  'aria-expanded': boolean;
  'aria-controls': string;
  'aria-haspopup'?: 'menu' | 'dialog' | boolean;
}

export interface TriggerAriaOptions {
  haspopup?: 'menu' | 'dialog';
}

/** ARIA props for a disclosure trigger button. */
export function getTriggerAria(
  open: boolean,
  contentId: string,
  options?: TriggerAriaOptions,
): TriggerAria {
  const aria: TriggerAria = {
    'aria-expanded': open,
    'aria-controls': contentId,
  };
  if (options?.haspopup) {
    aria['aria-haspopup'] = options.haspopup;
  }
  return aria;
}
