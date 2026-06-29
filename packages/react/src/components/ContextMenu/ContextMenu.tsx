import { useCallback, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import type { PopoverPlacement } from '@iskra-ui/core';
import {
  ContextMenuContext,
  type ContextMenuPositionMode,
  type ContextMenuTriggerOn,
  type RegisteredMenuItem,
} from './context.js';

export interface ContextMenuProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** How the menu opens: right-click, left-click, or both (default). */
  triggerOn?: ContextMenuTriggerOn;
  /** Placement when opened via click (anchor mode). */
  placement?: PopoverPlacement;
}

/**
 * ContextMenu — WAI-ARIA Menu pattern for contextual and action menus.
 * Compose with ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator.
 */
export function ContextMenu({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  triggerOn = 'both',
  placement = 'bottom-start',
}: ContextMenuProps) {
  const autoId = useId();
  const contentId = `ik-context-menu-${autoId}`;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const controlled = openProp !== undefined;
  const open = controlled ? openProp : uncontrolledOpen;

  const triggerRef = useRef<HTMLElement | null>(null);
  const [positionMode, setPositionMode] = useState<ContextMenuPositionMode>('anchor');
  const [cursorPoint, setCursorPoint] = useState<{ x: number; y: number } | null>(null);
  const [items, setItems] = useState<RegisteredMenuItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!controlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
      if (!next) {
        setCursorPoint(null);
        setActiveIndex(0);
      }
    },
    [controlled, onOpenChange],
  );

  const close = useCallback(() => setOpen(false), [setOpen]);

  const registerItem = useCallback((item: RegisteredMenuItem) => {
    setItems((prev) => {
      const index = prev.findIndex((entry) => entry.id === item.id);
      if (index === -1) return [...prev, item];
      const next = [...prev];
      next[index] = item;
      return next;
    });
  }, []);

  const unregisterItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((entry) => entry.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      open,
      setOpen,
      triggerOn,
      triggerRef,
      contentId,
      positionMode,
      setPositionMode,
      cursorPoint,
      setCursorPoint,
      placement,
      close,
      items,
      registerItem,
      unregisterItem,
      activeIndex,
      setActiveIndex,
    }),
    [
      open,
      setOpen,
      triggerOn,
      contentId,
      positionMode,
      cursorPoint,
      placement,
      close,
      items,
      registerItem,
      unregisterItem,
      activeIndex,
    ],
  );

  return <ContextMenuContext.Provider value={value}>{children}</ContextMenuContext.Provider>;
}
