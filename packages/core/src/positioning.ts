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

export interface Point {
  x: number;
  y: number;
}

export interface RectLike {
  width: number;
  height: number;
}

export interface ViewportSize {
  width: number;
  height: number;
}

const VIEWPORT_PAD = 8;

/** Positions a floating panel relative to an anchor rect. */
export function computeAnchorPosition(
  anchor: DOMRect,
  panel: RectLike,
  placement: PopoverPlacement,
  offset = 8,
  viewport?: ViewportSize,
): AnchorPosition {
  const vw = viewport?.width ?? (typeof window !== 'undefined' ? window.innerWidth : 0);
  const vh = viewport?.height ?? (typeof window !== 'undefined' ? window.innerHeight : 0);
  let top: number;
  let left: number;

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

  left = Math.max(VIEWPORT_PAD, Math.min(left, vw - panel.width - VIEWPORT_PAD));
  top = Math.max(VIEWPORT_PAD, Math.min(top, vh - panel.height - VIEWPORT_PAD));

  return { top, left };
}

/** Positions a menu at cursor coordinates with viewport clamping. */
export function computeCursorPosition(
  point: Point,
  panel: RectLike,
  offset = 0,
  viewport?: ViewportSize,
): AnchorPosition {
  const vw = viewport?.width ?? (typeof window !== 'undefined' ? window.innerWidth : 0);
  const vh = viewport?.height ?? (typeof window !== 'undefined' ? window.innerHeight : 0);
  let left = point.x + offset;
  let top = point.y + offset;

  left = Math.max(VIEWPORT_PAD, Math.min(left, vw - panel.width - VIEWPORT_PAD));
  top = Math.max(VIEWPORT_PAD, Math.min(top, vh - panel.height - VIEWPORT_PAD));

  return { top, left };
}
