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

export const DCI_OPERATOR_NAV: SidebarNavGroup[] = [
  {
    id: 'monitoring',
    label: 'Мониторинг',
    items: [
      { id: 'overview', label: 'Обзор', icon: 'grid' },
      { id: 'devices', label: 'Устройства', icon: 'server' },
      { id: 'topology', label: 'Топология', icon: 'layers' },
    ],
  },
  {
    id: 'management',
    label: 'Управление',
    items: [
      { id: 'alerts', label: 'Оповещения', icon: 'bell' },
      { id: 'apikeys', label: 'API-ключи', icon: 'key' },
      { id: 'log', label: 'Журнал', icon: 'list' },
    ],
  },
];

export const DCI_ADMIN_EXTRA: SidebarNavGroup = {
  id: 'admin',
  label: 'Администрирование',
  items: [
    { id: 'users', label: 'Пользователи', icon: 'users' },
    { id: 'audit', label: 'Аудит', icon: 'shield-check' },
    { id: 'system', label: 'Система', icon: 'terminal' },
  ],
};

export const DCI_ADMIN_NAV: SidebarNavGroup[] = [...DCI_OPERATOR_NAV, DCI_ADMIN_EXTRA];

export const DCI_FOOTER_NAV: SidebarNavItem[] = [
  { id: 'settings', label: 'Настройки', icon: 'settings' },
  { id: 'logout', label: 'Выход', icon: 'log-out' },
];

export const NOTIFIER_NAV: SidebarNavGroup[] = [
  {
    id: 'notifier',
    items: [
      { id: 'dashboard', label: 'Панель управления', icon: 'grid' },
      { id: 'console', label: 'Консоль инцидентов', icon: 'terminal' },
      { id: 'incidents', label: 'Реестр инцидентов', icon: 'bell' },
      { id: 'workspace', label: 'Рабочая область', icon: 'layers' },
      { id: 'drafts', label: 'Черновики уведомлений', icon: 'file-text' },
      { id: 'delivery', label: 'Журнал доставки', icon: 'mail' },
      { id: 'duty', label: 'График дежурств', icon: 'calendar' },
      { id: 'rules', label: 'Правила маршрутизации', icon: 'git-branch' },
      { id: 'templates', label: 'Шаблоны', icon: 'clipboard' },
      { id: 'integrations', label: 'Интеграции', icon: 'share' },
      { id: 'audit', label: 'Журнал аудита', icon: 'shield-check' },
      { id: 'admin', label: 'Администрирование', icon: 'settings' },
    ],
  },
];

export type SidebarVariant = 'operator' | 'admin';

export function resolveSidebarGroups(variant: SidebarVariant): SidebarNavGroup[] {
  return variant === 'admin' ? DCI_ADMIN_NAV : DCI_OPERATOR_NAV;
}
