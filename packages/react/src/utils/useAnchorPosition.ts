import { useLayoutEffect, useState, type RefObject } from 'react';

export type PopoverPlacement =
  | 'bottom-start'
  | 'bottom-end'
  | 'bottom'
  | 'top-start'
  | 'top-end'
  | 'top';

export interface AnchorPosition {
  top: number;
  left: number;
}

export function computeAnchorPosition(
  anchor: DOMRect,
  panel: DOMRect,
  placement: PopoverPlacement,
  offset = 8,
): AnchorPosition {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 0;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 0;
  let top = 0;
  let left = 0;

  switch (placement) {
    case 'bottom':
      top = anchor.bottom + offset;
      left = anchor.left + anchor.width / 2 - panel.width / 2;
      break;
    case 'bottom-end':
      top = anchor.bottom + offset;
      left = anchor.right - panel.width;
      break;
    case 'bottom-start':
      top = anchor.bottom + offset;
      left = anchor.left;
      break;
    case 'top':
      top = anchor.top - panel.height - offset;
      left = anchor.left + anchor.width / 2 - panel.width / 2;
      break;
    case 'top-end':
      top = anchor.top - panel.height - offset;
      left = anchor.right - panel.width;
      break;
    case 'top-start':
      top = anchor.top - panel.height - offset;
      left = anchor.left;
      break;
    default:
      top = anchor.bottom + offset;
      left = anchor.left;
  }

  const pad = 8;
  left = Math.max(pad, Math.min(left, vw - panel.width - pad));
  top = Math.max(pad, Math.min(top, vh - panel.height - pad));

  return { top, left };
}

/** Positions a floating panel relative to an anchor element. */
export function useAnchorPosition(
  open: boolean,
  anchorRef: RefObject<HTMLElement | null>,
  panelRef: RefObject<HTMLElement | null>,
  placement: PopoverPlacement = 'bottom-end',
  offset = 8,
): AnchorPosition | null {
  const [pos, setPos] = useState<AnchorPosition | null>(null);

  useLayoutEffect(() => {
    if (!open) {
      setPos(null);
      return;
    }

    const update = () => {
      const anchor = anchorRef.current;
      const panel = panelRef.current;
      if (!anchor || !panel) return;
      const ar = anchor.getBoundingClientRect();
      const pr = panel.getBoundingClientRect();
      setPos(computeAnchorPosition(ar, pr, placement, offset));
    };

    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [open, anchorRef, panelRef, placement, offset]);

  return pos;
}
