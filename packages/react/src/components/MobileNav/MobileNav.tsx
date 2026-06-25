import { useState, type ReactNode } from 'react';
import {
  resolvePrimaryNavItems,
  type SidebarNavGroup,
  type SidebarNavItem,
} from '@iskra-ui/core';
import { useIskraT } from '../../i18n/useIskraT.js';
import { cx } from '../../utils/cx.js';
import { Icon } from '../Icon/Icon.js';
import { Sheet } from '../Sheet/Sheet.js';
import type { IconName } from '@iskra-ui/icons';
import './MobileNav.css';

export interface MobileNavProps {
  groups: SidebarNavGroup[];
  footerItems?: SidebarNavItem[];
  primaryItems: string[];
  activeItem?: string;
  onNavigate?: (id: string) => void;
  onItemClick?: (item: SidebarNavItem) => void;
  menuLabel?: string;
  sheetTitle?: ReactNode;
  badges?: Record<string, number>;
  ariaLabel?: string;
  className?: string;
}

function NavListItem({
  item,
  active,
  badge,
  onSelect,
}: {
  item: SidebarNavItem;
  active: boolean;
  badge?: number;
  onSelect: (item: SidebarNavItem) => void;
}) {
  return (
    <button
      type="button"
      className={cx('imn-sheet-item', active && 'imn-sheet-item--on')}
      disabled={item.disabled}
      aria-current={active ? 'page' : undefined}
      onClick={() => onSelect(item)}
    >
      <span className="imn-sheet-item-ico">
        {item.icon ? <Icon name={item.icon as IconName} size={16} /> : null}
      </span>
      <span className="imn-sheet-item-lbl">{item.label}</span>
      {badge != null && badge > 0 && (
        <span className="imn-sheet-item-bdg" aria-label={`${item.label}: ${badge}`}>
          {badge}
        </span>
      )}
    </button>
  );
}

/**
 * MobileNav — fixed bottom navigation bar for viewports below `bp-md`.
 * Shows up to four primary items plus a menu button that opens a Sheet with full nav.
 */
export function MobileNav({
  groups,
  footerItems = [],
  primaryItems,
  activeItem,
  onNavigate,
  onItemClick,
  menuLabel,
  sheetTitle,
  badges = {},
  ariaLabel,
  className,
}: MobileNavProps) {
  const t = useIskraT();
  const [menuOpen, setMenuOpen] = useState(false);
  const resolvedAriaLabel = ariaLabel ?? t('a11y.mobileNavigation');
  const resolvedMenuLabel = menuLabel ?? t('a11y.openMenu');
  const resolvedSheetTitle = sheetTitle ?? t('a11y.moreNavigation');
  const primary = resolvePrimaryNavItems(groups, primaryItems, 4);

  const handleSelect = (item: SidebarNavItem) => {
    onItemClick?.(item);
    onNavigate?.(item.id);
    setMenuOpen(false);
  };

  const isMenuActive = primary.every((item) => item.id !== activeItem) && activeItem != null;

  return (
    <>
      <nav
        className={cx('iskra-mobile-nav', className)}
        role="navigation"
        aria-label={resolvedAriaLabel}
      >
        {primary.map((item) => {
          const badge = badges[item.id] ?? item.badge;
          const active = activeItem === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={cx('imn-tab', active && 'imn-tab--on')}
              disabled={item.disabled}
              aria-current={active ? 'page' : undefined}
              onClick={() => handleSelect(item)}
            >
              <span className="imn-tab-ico">
                {item.icon ? <Icon name={item.icon as IconName} size={18} /> : null}
              </span>
              <span className="imn-tab-lbl">{item.label}</span>
              {badge != null && badge > 0 && (
                <span className="imn-tab-bdg" aria-hidden="true">
                  {badge > 9 ? '9+' : badge}
                </span>
              )}
            </button>
          );
        })}
        <button
          type="button"
          className={cx('imn-tab', isMenuActive && 'imn-tab--on')}
          aria-label={resolvedMenuLabel}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <span className="imn-tab-ico">
            <Icon name="grid" size={18} />
          </span>
          <span className="imn-tab-lbl">{resolvedMenuLabel}</span>
        </button>
      </nav>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen} title={resolvedSheetTitle} snap="half">
        <div className="imn-sheet-body">
          {groups.map((group, index) => (
            <div key={group.id} className="imn-sheet-grp">
              {index > 0 ? <div className="imn-sheet-divider" role="separator" /> : null}
              {group.label ?
                <div className="imn-sheet-sec" aria-hidden="true">
                  {group.label}
                </div>
              : null}
              {group.items.map((item) => (
                <NavListItem
                  key={item.id}
                  item={item}
                  active={activeItem === item.id}
                  badge={badges[item.id] ?? item.badge}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          ))}
          {footerItems.length > 0 ?
            <div className="imn-sheet-grp">
              <div className="imn-sheet-divider" role="separator" />
              {footerItems.map((item) => (
                <NavListItem
                  key={item.id}
                  item={item}
                  active={activeItem === item.id}
                  badge={badges[item.id] ?? item.badge}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          : null}
        </div>
      </Sheet>
    </>
  );
}
