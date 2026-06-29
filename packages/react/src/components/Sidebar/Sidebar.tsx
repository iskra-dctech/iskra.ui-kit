import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import { useIskraLocale } from '../../i18n/useIskraLocale.js';
import { useIskraT } from '../../i18n/useIskraT.js';
import { cx } from '../../utils/cx.js';
import { resolveSidebarGroups, type SidebarNavGroup, type SidebarNavItem } from '@iskra-ui/core';
import { SidebarProvider } from './SidebarContext.js';
import { SidebarItem } from './SidebarItem.js';
import {
  SidebarBody,
  SidebarBrand,
  SidebarCollapser,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarSection,
  SidebarDivider,
} from './SidebarParts.js';
import type { SidebarProps } from './types.js';
import './Sidebar.css';

export type {
  SidebarTheme,
  SidebarNavGroup,
  SidebarNavItem,
  SidebarVariant,
  SidebarItemRenderContext,
  SidebarProps,
  SidebarItemProps,
  SidebarGroupProps,
  SidebarSectionProps,
} from './types.js';

export {
  DCI_OPERATOR_NAV,
  DCI_ADMIN_NAV,
  DCI_ADMIN_EXTRA,
  DCI_FOOTER_NAV,
  NOTIFIER_NAV,
  getDciOperatorNav,
  getDciAdminNav,
  getDciAdminExtra,
  getDciFooterNav,
  getNotifierNav,
  resolveSidebarGroups,
} from './presets.js';

function NavGroups({
  groups,
  activeItem,
  badges,
  onItemActivate,
}: {
  groups: SidebarNavGroup[];
  activeItem?: string;
  badges: Record<string, number>;
  onItemActivate: (item: SidebarNavItem) => void;
}) {
  return (
    <>
      {groups.map(({ id, label, items }) => (
        <SidebarGroup key={id}>
          {label ? <SidebarSection>{label}</SidebarSection> : null}
          {items.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              active={activeItem === item.id}
              badge={badges[item.id] ?? item.badge}
              onClick={() => onItemActivate(item)}
            />
          ))}
        </SidebarGroup>
      ))}
    </>
  );
}

function SidebarRoot({
  groups: groupsProp,
  footerItems = [],
  brand,
  header,
  footer,
  children,
  collapsed = false,
  collapsible = true,
  onToggle,
  activeItem,
  onNavigate,
  onItemClick,
  variant = 'operator',
  theme = '',
  badges = {},
  ariaLabel,
  renderItem,
  desktopOnly = false,
  className = '',
}: SidebarProps) {
  const t = useIskraT();
  const { locale } = useIskraLocale();
  const resolvedAriaLabel = ariaLabel ?? t('a11y.navigation');
  const [tip, setTip] = useState<{ lbl: string; top: number } | null>(null);
  const [tipRdy, setTipRdy] = useState(false);
  const [prevCollapsed, setPrevCollapsed] = useState(collapsed);
  const sbRef = useRef<HTMLElement>(null);

  const groups = groupsProp ?? (children ? [] : resolveSidebarGroups(variant, locale));
  const showCollapser = collapsible && typeof onToggle === 'function';
  const hasBrandBar = brand != null || showCollapser;
  const isCompoundMode =
    children != null &&
    groupsProp == null &&
    brand == null &&
    header == null &&
    footer == null &&
    footerItems.length === 0;

  if (collapsed !== prevCollapsed) {
    setPrevCollapsed(collapsed);
    setTipRdy(false);
    setTip(null);
  }

  useEffect(() => {
    if (!collapsed) return;
    const timer = setTimeout(() => setTipRdy(true), 210);
    return () => clearTimeout(timer);
  }, [collapsed]);

  const showTip = useCallback(
    (e: MouseEvent<HTMLButtonElement>, lbl: string) => {
      if (!tipRdy || !sbRef.current) return;
      const ir = e.currentTarget.getBoundingClientRect();
      const sr = sbRef.current.getBoundingClientRect();
      setTip({ lbl, top: ir.top - sr.top + ir.height / 2 });
    },
    [tipRdy],
  );

  const hideTip = useCallback(() => setTip(null), []);

  const handleItem = (item: SidebarNavItem) => {
    onItemClick?.(item);
    onNavigate?.(item.id);
  };

  const contextValue = {
    collapsed,
    tipRdy,
    sbRef,
    showTip,
    hideTip,
    renderItem,
  };

  const collapseLabel = collapsed ? t('a11y.sidebarExpand') : t('a11y.sidebarCollapse');

  const legacyBody = (
    <>
      {hasBrandBar && (
        <div className="isb-logo">
          {brand != null && <SidebarBrand>{brand}</SidebarBrand>}
          {showCollapser && (
            <SidebarCollapser collapsed={collapsed} label={collapseLabel} onClick={onToggle} />
          )}
        </div>
      )}
      {header != null && <SidebarHeader>{header}</SidebarHeader>}
      <SidebarBody>
        {children ??
          (groups.length > 0 ? (
            <NavGroups
              groups={groups}
              activeItem={activeItem}
              badges={badges}
              onItemActivate={handleItem}
            />
          ) : null)}
      </SidebarBody>
      {footer != null ? (
        <SidebarFooter>{footer}</SidebarFooter>
      ) : footerItems.length > 0 ? (
        <SidebarFooter>
          {footerItems.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              active={activeItem === item.id}
              badge={badges[item.id] ?? item.badge}
              onClick={() => handleItem(item)}
            />
          ))}
        </SidebarFooter>
      ) : null}
    </>
  );

  return (
    <SidebarProvider value={contextValue}>
      <aside
        className={cx(
          'iskra-sb',
          collapsed && 'isb-c',
          collapsed && tipRdy && 'isb-tip-rdy',
          desktopOnly && 'iskra-sb--desktop-only',
          theme,
          className,
        )}
        ref={sbRef}
        role="navigation"
        aria-label={resolvedAriaLabel}
      >
        {isCompoundMode ? children : legacyBody}
        {tip && (
          <div className="isb-floatip" style={{ top: tip.top }}>
            {tip.lbl}
          </div>
        )}
      </aside>
    </SidebarProvider>
  );
}

/**
 * Sidebar — universal app navigation shell. Supply `groups` + `brand` per product,
 * or compose with `Sidebar.Item`, `Sidebar.Group`, etc. Presets live in `@iskra-ui/core`.
 */
export const Sidebar = Object.assign(SidebarRoot, {
  Brand: SidebarBrand,
  Header: SidebarHeader,
  Body: SidebarBody,
  Group: SidebarGroup,
  Section: SidebarSection,
  Item: SidebarItem,
  Divider: SidebarDivider,
  Footer: SidebarFooter,
  Collapser: SidebarCollapser,
});
