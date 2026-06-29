import type { IskraLocale } from '@iskra-ui/i18n';
import { getMessages } from '@iskra-ui/i18n';

export interface SidebarNavItem {
  id: string;
  label: string;
  icon?: string;
  badge?: number;
  disabled?: boolean;
}

export interface SidebarNavGroup {
  id: string;
  label?: string;
  items: SidebarNavItem[];
}

type SidebarMessages = ReturnType<typeof getMessages>['sidebar'];

function operatorNav(s: SidebarMessages): SidebarNavGroup[] {
  return [
    {
      id: 'monitoring',
      label: s.monitoring,
      items: [
        { id: 'overview', label: s.overview, icon: 'grid' },
        { id: 'devices', label: s.devices, icon: 'server' },
        { id: 'topology', label: s.topology, icon: 'layers' },
      ],
    },
    {
      id: 'management',
      label: s.management,
      items: [
        { id: 'alerts', label: s.alerts, icon: 'bell' },
        { id: 'apikeys', label: s.apikeys, icon: 'key' },
        { id: 'log', label: s.log, icon: 'list' },
      ],
    },
  ];
}

function adminExtra(s: SidebarMessages): SidebarNavGroup {
  return {
    id: 'admin',
    label: s.admin,
    items: [
      { id: 'users', label: s.users, icon: 'users' },
      { id: 'audit', label: s.audit, icon: 'shield-check' },
      { id: 'system', label: s.system, icon: 'terminal' },
    ],
  };
}

export function getDciOperatorNav(locale: IskraLocale = 'en'): SidebarNavGroup[] {
  return operatorNav(getMessages(locale).sidebar);
}

export function getDciAdminExtra(locale: IskraLocale = 'en'): SidebarNavGroup {
  return adminExtra(getMessages(locale).sidebar);
}

export function getDciAdminNav(locale: IskraLocale = 'en'): SidebarNavGroup[] {
  return [...getDciOperatorNav(locale), getDciAdminExtra(locale)];
}

export function getDciFooterNav(locale: IskraLocale = 'en'): SidebarNavItem[] {
  const s = getMessages(locale).sidebar;
  return [
    { id: 'settings', label: s.settings, icon: 'settings' },
    { id: 'logout', label: s.logout, icon: 'log-out' },
  ];
}

export function getNotifierNav(locale: IskraLocale = 'en'): SidebarNavGroup[] {
  const s = getMessages(locale).sidebar;
  return [
    {
      id: 'notifier',
      items: [
        { id: 'dashboard', label: s.dashboard, icon: 'grid' },
        { id: 'console', label: s.console, icon: 'terminal' },
        { id: 'incidents', label: s.incidents, icon: 'bell' },
        { id: 'workspace', label: s.workspace, icon: 'layers' },
        { id: 'drafts', label: s.drafts, icon: 'file-text' },
        { id: 'delivery', label: s.delivery, icon: 'mail' },
        { id: 'duty', label: s.duty, icon: 'calendar' },
        { id: 'rules', label: s.rules, icon: 'git-branch' },
        { id: 'templates', label: s.templates, icon: 'clipboard' },
        { id: 'integrations', label: s.integrations, icon: 'share' },
        { id: 'audit', label: s.audit, icon: 'shield-check' },
        { id: 'admin', label: s.admin, icon: 'settings' },
      ],
    },
  ];
}

/** @deprecated Use `getDciOperatorNav('ru')` or `getDciOperatorNav(locale)`. */
export const DCI_OPERATOR_NAV: SidebarNavGroup[] = getDciOperatorNav('ru');

/** @deprecated Use `getDciAdminExtra('ru')` or `getDciAdminExtra(locale)`. */
export const DCI_ADMIN_EXTRA: SidebarNavGroup = getDciAdminExtra('ru');

/** @deprecated Use `getDciAdminNav('ru')` or `getDciAdminNav(locale)`. */
export const DCI_ADMIN_NAV: SidebarNavGroup[] = getDciAdminNav('ru');

/** @deprecated Use `getDciFooterNav('ru')` or `getDciFooterNav(locale)`. */
export const DCI_FOOTER_NAV: SidebarNavItem[] = getDciFooterNav('ru');

/** @deprecated Use `getNotifierNav('ru')` or `getNotifierNav(locale)`. */
export const NOTIFIER_NAV: SidebarNavGroup[] = getNotifierNav('ru');

export type SidebarVariant = 'operator' | 'admin';

export function resolveSidebarGroups(
  variant: SidebarVariant,
  locale: IskraLocale = 'en',
): SidebarNavGroup[] {
  return variant === 'admin' ? getDciAdminNav(locale) : getDciOperatorNav(locale);
}

/** Flat list of all items from navigation groups (order preserved). */
export function flattenSidebarItems(groups: SidebarNavGroup[]): SidebarNavItem[] {
  return groups.flatMap((group) => group.items);
}

/**
 * Resolves primary mobile-nav items by id from `groups`.
 * Unknown ids are skipped; at most `max` items are returned.
 */
export function resolvePrimaryNavItems(
  groups: SidebarNavGroup[],
  primaryIds: string[],
  max = 4,
): SidebarNavItem[] {
  const byId = new Map(flattenSidebarItems(groups).map((item) => [item.id, item]));
  const resolved: SidebarNavItem[] = [];

  for (const id of primaryIds) {
    if (resolved.length >= max) break;
    const item = byId.get(id);
    if (item) {
      resolved.push(item);
      continue;
    }
    if (typeof console !== 'undefined' && console.warn) {
      console.warn(`[iskra] resolvePrimaryNavItems: unknown nav id "${id}"`);
    }
  }

  return resolved;
}
