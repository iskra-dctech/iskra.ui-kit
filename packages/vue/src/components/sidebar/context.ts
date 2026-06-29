import type { InjectionKey, Ref } from 'vue';

export interface SidebarContext {
  collapsed: Ref<boolean>;
  tipRdy: Ref<boolean>;
  showTip: (e: MouseEvent, lbl: string) => void;
  hideTip: () => void;
}

export const sidebarContextKey: InjectionKey<SidebarContext> = Symbol('iskra-sidebar');
