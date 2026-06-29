import type { ReactNode } from 'react';
import type { SidebarNavGroup, SidebarNavItem, SidebarVariant } from '@iskra-ui/core';

export type SidebarTheme = '' | 'theme-cold' | 'theme-warm';

export type { SidebarNavGroup, SidebarNavItem, SidebarVariant };

export interface SidebarItemRenderContext {
  active: boolean;
  collapsed: boolean;
  badge?: number;
}

export interface SidebarProps {
  /** Navigation tree. Omit when using `children` for a fully custom body. */
  groups?: SidebarNavGroup[];
  /** Declarative footer items (rendered as nav buttons). */
  footerItems?: SidebarNavItem[];
  /** Brand block in the top bar (logo, product name). No default — pass explicitly. */
  brand?: ReactNode;
  /** Optional content below the brand bar, above scrollable nav. */
  header?: ReactNode;
  /** Custom footer slot — overrides `footerItems` when set. */
  footer?: ReactNode;
  /** Replaces the default groups renderer in the scroll area. */
  children?: ReactNode;
  collapsed?: boolean;
  /** Show collapse control when `onToggle` is provided. Default: true. */
  collapsible?: boolean;
  onToggle?: () => void;
  activeItem?: string;
  onNavigate?: (id: string) => void;
  onItemClick?: (item: SidebarNavItem) => void;
  /** Convenience preset when `groups` is omitted. Prefer explicit `groups` in products. */
  variant?: SidebarVariant;
  theme?: SidebarTheme;
  badges?: Record<string, number>;
  ariaLabel?: string;
  renderItem?: (item: SidebarNavItem, ctx: SidebarItemRenderContext) => ReactNode;
  /** Hide sidebar below `bp-md` (tablet/desktop only). */
  desktopOnly?: boolean;
  className?: string;
}

export interface SidebarItemProps {
  id?: string;
  label?: string;
  icon?: string;
  badge?: number;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
  item?: SidebarNavItem;
  className?: string;
}

export interface SidebarGroupProps {
  children?: ReactNode;
  className?: string;
}

export interface SidebarSectionProps {
  children?: ReactNode;
  className?: string;
}
