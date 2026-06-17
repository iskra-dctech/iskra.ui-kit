import * as React from 'react';

/**
 * ИСКРА.DCI — Sidebar navigation component.
 * Shared between operator and admin frontends.
 * Self-injects scoped CSS on first render.
 *
 * @example
 * ```tsx
 * const [collapsed, setCollapsed] = React.useState(false);
 * const [page, setPage] = React.useState('overview');
 *
 * <Sidebar
 *   collapsed={collapsed}
 *   onToggle={() => setCollapsed(c => !c)}
 *   activeItem={page}
 *   onNavigate={setPage}
 *   variant="operator"
 *   badges={{ alerts: 3 }}
 * />
 * ```
 */

export interface SidebarProps {
  /**
   * Collapsed (icon-only) mode.
   * The parent is responsible for persisting this state.
   * @default false
   */
  collapsed?: boolean;

  /**
   * Fires when the user clicks the collapse / expand toggle button.
   * Use to flip `collapsed` in the parent's state.
   */
  onToggle?: () => void;

  /**
   * ID of the currently active nav item.
   * Used to highlight the selected item and set aria-current="page".
   * @default 'overview'
   */
  activeItem?: string;

  /**
   * Fires when a nav item is clicked, passing its string ID.
   * The caller is responsible for routing or state updates.
   */
  onNavigate?: (itemId: string) => void;

  /**
   * Navigation profile rendered in the sidebar.
   * - `'operator'` — Monitoring + Management sections
   * - `'admin'`    — Same, plus an Administration section
   * @default 'operator'
   */
  variant?: 'operator' | 'admin';

  /**
   * CSS class that activates a colour theme.
   * Applies ИСКРА.DCI design-token overrides to all descendants.
   * Leave empty (`''`) for the default dark theme.
   * @default ''
   */
  theme?: '' | 'theme-cold' | 'theme-warm';

  /**
   * Notification / alert badge counts, keyed by nav item ID.
   * A value of `0` or `undefined` hides the badge for that item.
   *
   * @example
   * badges={{ alerts: 3 }}
   */
  badges?: Record<string, number>;

  /**
   * Extra CSS class(es) appended to the root `<aside>` element.
   * Use for layout integration (e.g. sticky position helpers).
   */
  className?: string;
}

export declare function Sidebar(props: SidebarProps): React.ReactElement;
