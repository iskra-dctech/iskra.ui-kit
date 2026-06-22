import type { InjectionKey, Ref } from 'vue';
import type { MenuItemLike, PopoverPlacement } from '@iskra-ui/core';

export type ContextMenuTriggerOn = 'contextmenu' | 'click' | 'both';
export type ContextMenuPositionMode = 'cursor' | 'anchor';

export interface RegisteredMenuItem extends MenuItemLike {
  focus: () => void;
}

export interface ContextMenuContext {
  open: Ref<boolean>;
  setOpen: (value: boolean) => void;
  triggerOn: ContextMenuTriggerOn;
  triggerRef: Ref<HTMLElement | null>;
  contentId: string;
  positionMode: Ref<ContextMenuPositionMode>;
  setPositionMode: (mode: ContextMenuPositionMode) => void;
  cursorPoint: Ref<{ x: number; y: number } | null>;
  setCursorPoint: (point: { x: number; y: number } | null) => void;
  placement: PopoverPlacement;
  close: () => void;
  items: Ref<RegisteredMenuItem[]>;
  registerItem: (item: RegisteredMenuItem) => void;
  unregisterItem: (id: string) => void;
  activeIndex: Ref<number>;
  setActiveIndex: (index: number) => void;
}

export const contextMenuKey: InjectionKey<ContextMenuContext> = Symbol('iskra-context-menu');
