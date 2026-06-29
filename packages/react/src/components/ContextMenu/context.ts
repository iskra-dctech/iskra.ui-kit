import { createContext, useContext } from 'react';
import type { RefObject } from 'react';
import type { MenuItemLike, PopoverPlacement } from '@iskra-ui/core';

export type ContextMenuTriggerOn = 'contextmenu' | 'click' | 'both';
export type ContextMenuPositionMode = 'cursor' | 'anchor';

export interface RegisteredMenuItem extends MenuItemLike {
  focus: () => void;
}

export interface ContextMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerOn: ContextMenuTriggerOn;
  triggerRef: RefObject<HTMLElement | null>;
  contentId: string;
  positionMode: ContextMenuPositionMode;
  setPositionMode: (mode: ContextMenuPositionMode) => void;
  cursorPoint: { x: number; y: number } | null;
  setCursorPoint: (point: { x: number; y: number } | null) => void;
  placement: PopoverPlacement;
  close: () => void;
  items: RegisteredMenuItem[];
  registerItem: (item: RegisteredMenuItem) => void;
  unregisterItem: (id: string) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export const ContextMenuContext = createContext<ContextMenuContextValue | null>(null);

export function useContextMenu(): ContextMenuContextValue {
  const ctx = useContext(ContextMenuContext);
  if (!ctx) {
    throw new Error('ContextMenu components must be used within <ContextMenu>.');
  }
  return ctx;
}

export function useContextMenuOptional(): ContextMenuContextValue | null {
  return useContext(ContextMenuContext);
}
