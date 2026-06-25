import { createContext, useContext, type MouseEvent, type ReactNode, type RefObject } from 'react';
import type { SidebarItemRenderContext, SidebarProps } from './types.js';

export interface SidebarContextValue {
  collapsed: boolean;
  tipRdy: boolean;
  sbRef: RefObject<HTMLElement | null>;
  showTip: (e: MouseEvent<HTMLButtonElement>, lbl: string) => void;
  hideTip: () => void;
  renderItem?: SidebarProps['renderItem'];
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({
  value,
  children,
}: {
  value: SidebarContextValue;
  children: ReactNode;
}) {
  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebarContext(): SidebarContextValue {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error('Sidebar subcomponents must be used within Sidebar');
  }
  return ctx;
}

export type { SidebarItemRenderContext };
