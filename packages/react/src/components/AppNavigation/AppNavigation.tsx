import { useMemo, type ReactNode } from 'react';
import { resolveSidebarGroups } from '@iskra-ui/core';
import { useIskraLocale } from '../../i18n/useIskraLocale.js';
import { useBreakpoint } from '../../hooks/useMediaQuery.js';
import { Sidebar } from '../Sidebar/Sidebar.js';
import type { SidebarProps } from '../Sidebar/types.js';
import { MobileNav } from '../MobileNav/MobileNav.js';

export interface AppNavigationProps extends Omit<SidebarProps, 'className' | 'desktopOnly'> {
  /** Nav item ids shown in the mobile bottom bar (max 4). */
  primaryItems: string[];
  menuSheetTitle?: ReactNode;
  className?: string;
  sidebarClassName?: string;
  mobileClassName?: string;
}

/**
 * AppNavigation — switches between Sidebar (tablet/desktop) and MobileNav (mobile)
 * based on the `below-md` breakpoint.
 */
export function AppNavigation({
  primaryItems,
  menuSheetTitle,
  className,
  sidebarClassName,
  mobileClassName,
  ...sidebarProps
}: AppNavigationProps) {
  const isMobile = useBreakpoint('below-md', { ssrMatch: false });
  const { locale } = useIskraLocale();
  const resolvedGroups = useMemo(
    () => sidebarProps.groups ?? resolveSidebarGroups(sidebarProps.variant ?? 'operator', locale),
    [sidebarProps.groups, sidebarProps.variant, locale],
  );

  if (isMobile) {
    const { footerItems, activeItem, onNavigate, onItemClick, badges, ariaLabel } = sidebarProps;
    return (
      <MobileNav
        groups={resolvedGroups}
        footerItems={footerItems}
        primaryItems={primaryItems}
        activeItem={activeItem}
        onNavigate={onNavigate}
        onItemClick={onItemClick}
        badges={badges}
        ariaLabel={ariaLabel}
        sheetTitle={menuSheetTitle}
        className={mobileClassName ?? className}
      />
    );
  }

  return (
    <Sidebar
      {...sidebarProps}
      groups={resolvedGroups}
      desktopOnly
      className={sidebarClassName ?? className}
    />
  );
}
