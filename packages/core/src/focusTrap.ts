export const FOCUSABLE_SELECTOR =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

/** All tabbable descendants of `root`, in DOM order. */
export function getFocusable(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
}

export interface FocusTrap {
  /** Focus the first focusable element (or the container) and start trapping. */
  activate(): void;
  /** Stop trapping and restore focus to the previously focused element. */
  deactivate(): void;
}

/**
 * Framework-agnostic focus trap for dialog-like surfaces. Keeps Tab/Shift+Tab
 * focus cycling inside `root` and restores focus on deactivate. React and Vue
 * wrap this in their respective lifecycles.
 */
export function createFocusTrap(root: HTMLElement): FocusTrap {
  let previouslyFocused: HTMLElement | null = null;

  const onKeyDown = (e: KeyboardEvent): void => {
    if (e.key !== 'Tab') return;
    const items = getFocusable(root);
    if (items.length === 0) {
      e.preventDefault();
      return;
    }
    const first = items[0]!;
    const last = items[items.length - 1]!;
    const active = (root.getRootNode() as Document | ShadowRoot).activeElement;
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return {
    activate() {
      previouslyFocused = document.activeElement as HTMLElement | null;
      const [first] = getFocusable(root);
      (first ?? root).focus();
      root.addEventListener('keydown', onKeyDown);
    },
    deactivate() {
      root.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus?.();
    },
  };
}
