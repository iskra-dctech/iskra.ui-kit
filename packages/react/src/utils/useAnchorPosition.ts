import { useLayoutEffect, useState, type RefObject } from 'react';
import { computeAnchorPosition, type AnchorPosition, type PopoverPlacement } from '@iskra-ui/core';

export type { PopoverPlacement, AnchorPosition };

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

  return open ? pos : null;
}
