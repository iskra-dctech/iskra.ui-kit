import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import { cx } from '../../utils/cx.js';
import './Sidebar.css';

export type SidebarVariant = 'operator' | 'admin';
export type SidebarTheme = '' | 'theme-cold' | 'theme-warm';

export interface SidebarProps {
  /** Icon-only narrow mode (52px). */
  collapsed?: boolean;
  /** Flip `collapsed` in host state. */
  onToggle?: () => void;
  /** Highlights item + sets aria-current. */
  activeItem?: string;
  /** Called on item click. */
  onNavigate?: (id: string) => void;
  /** Admin adds Пользователи / Аудит / Система. */
  variant?: SidebarVariant;
  /** Theme scope class (dark by default). */
  theme?: SidebarTheme;
  /** Numeric badges keyed by nav item id, e.g. { alerts: 3 }. */
  badges?: Record<string, number>;
  className?: string;
}

type IconId =
  | 'overview'
  | 'devices'
  | 'topology'
  | 'alerts'
  | 'apikeys'
  | 'log'
  | 'settings'
  | 'users'
  | 'audit'
  | 'system'
  | 'logout';

interface NavItem {
  id: string;
  lbl: string;
  ico: IconId;
}
interface NavGroup {
  id: string;
  lbl: string;
  items: NavItem[];
}

const ICON_PROPS = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 16 16',
  width: 16,
  height: 16,
  'aria-hidden': true,
};

function NavIcon({ id }: { id: IconId }) {
  const p = ICON_PROPS;
  switch (id) {
    case 'overview':
      return (
        <svg {...p}>
          <rect x="2" y="2" width="5" height="5" rx="1" />
          <rect x="9" y="2" width="5" height="5" rx="1" />
          <rect x="2" y="9" width="5" height="5" rx="1" />
          <rect x="9" y="9" width="5" height="5" rx="1" />
        </svg>
      );
    case 'devices':
      return (
        <svg {...p}>
          <rect x="1.5" y="3" width="13" height="4" rx="1" />
          <rect x="1.5" y="9" width="13" height="4" rx="1" />
          <circle cx="12.5" cy="5" r=".85" fill="currentColor" stroke="none" />
          <circle cx="12.5" cy="11" r=".85" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'topology':
      return (
        <svg {...p}>
          <circle cx="8" cy="3" r="1.5" />
          <circle cx="2.5" cy="12.5" r="1.5" />
          <circle cx="13.5" cy="12.5" r="1.5" />
          <line x1="8" y1="4.5" x2="3.3" y2="11.2" />
          <line x1="8" y1="4.5" x2="12.7" y2="11.2" />
          <line x1="4" y1="12.5" x2="12" y2="12.5" />
        </svg>
      );
    case 'alerts':
      return (
        <svg {...p}>
          <path d="M8 2a4 4 0 0 1 4 4c0 2.5 1 3.5 1 3.5H3S4 9.5 4 6a4 4 0 0 1 4-4z" />
          <path d="M6.5 9.5a1.5 1.5 0 0 0 3 0" />
        </svg>
      );
    case 'apikeys':
      return (
        <svg {...p}>
          <circle cx="5.5" cy="8" r="3" />
          <path d="M8.5 8h5.5m-2.5-1.5v3" />
        </svg>
      );
    case 'log':
      return (
        <svg {...p}>
          <line x1="3" y1="4.5" x2="13" y2="4.5" />
          <line x1="3" y1="8" x2="13" y2="8" />
          <line x1="3" y1="11.5" x2="9" y2="11.5" />
        </svg>
      );
    case 'settings':
      return (
        <svg {...p}>
          <line x1="3" y1="4" x2="13" y2="4" />
          <line x1="3" y1="8" x2="13" y2="8" />
          <line x1="3" y1="12" x2="13" y2="12" />
          <circle cx="6" cy="4" r="1.5" fill="currentColor" />
          <circle cx="10" cy="8" r="1.5" fill="currentColor" />
          <circle cx="7" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );
    case 'users':
      return (
        <svg {...p}>
          <circle cx="6" cy="6" r="2.5" />
          <path d="M1 14c0-3 2.5-4.5 5-4.5s5 1.5 5 4.5" />
          <path d="M11 4.5a2 2 0 0 1 0 3.5" />
          <path d="M13.5 14c0-2-1.2-3.5-2.5-4" />
        </svg>
      );
    case 'audit':
      return (
        <svg {...p}>
          <path d="M8 1.5 13.5 3.5V8c0 3.5-2.5 5.5-5.5 6.5-3-1-5.5-3-5.5-6.5V3.5Z" />
          <polyline points="5.5,8 7,9.5 10.5,6" />
        </svg>
      );
    case 'system':
      return (
        <svg {...p}>
          <rect x="1.5" y="2.5" width="13" height="11" rx="1.5" />
          <polyline points="4.5,6.5 7,9 4.5,11.5" />
          <line x1="8.5" y1="11.5" x2="11.5" y2="11.5" />
        </svg>
      );
    case 'logout':
      return (
        <svg {...p}>
          <path d="M6 3H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3" />
          <polyline points="10,5.5 13.5,8 10,10.5" />
          <line x1="6" y1="8" x2="13.5" y2="8" />
        </svg>
      );
    default:
      return (
        <svg {...p}>
          <circle cx="8" cy="8" r="5" />
        </svg>
      );
  }
}

function Spark() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" width="20" height="20">
      <path d="M10 1 12.6 7.8 19.5 9.8 12.6 11.9 10 18.7 7.4 11.9.5 9.8 7.4 7.8Z" />
    </svg>
  );
}

const OPERATOR_NAV: NavGroup[] = [
  {
    id: 'monitoring',
    lbl: 'Мониторинг',
    items: [
      { id: 'overview', lbl: 'Обзор', ico: 'overview' },
      { id: 'devices', lbl: 'Устройства', ico: 'devices' },
      { id: 'topology', lbl: 'Топология', ico: 'topology' },
    ],
  },
  {
    id: 'management',
    lbl: 'Управление',
    items: [
      { id: 'alerts', lbl: 'Оповещения', ico: 'alerts' },
      { id: 'apikeys', lbl: 'API-ключи', ico: 'apikeys' },
      { id: 'log', lbl: 'Журнал', ico: 'log' },
    ],
  },
];

const ADMIN_NAV: NavGroup[] = [
  ...OPERATOR_NAV,
  {
    id: 'admin',
    lbl: 'Администрирование',
    items: [
      { id: 'users', lbl: 'Пользователи', ico: 'users' },
      { id: 'audit', lbl: 'Аудит', ico: 'audit' },
      { id: 'system', lbl: 'Система', ico: 'system' },
    ],
  },
];

const FOOTER_NAV: NavItem[] = [
  { id: 'settings', lbl: 'Настройки', ico: 'settings' },
  { id: 'logout', lbl: 'Выход', ico: 'logout' },
];

interface ItemProps {
  item: NavItem;
  active: boolean;
  badge?: number;
  onHover?: (e: MouseEvent<HTMLButtonElement>, lbl: string) => void;
  onLeave?: () => void;
  onClick?: () => void;
}

function Item({ item, active, badge, onHover, onLeave, onClick }: ItemProps) {
  return (
    <button
      className={cx('isb-item', active && 'isb-on')}
      title={item.lbl}
      onMouseEnter={onHover ? (e) => onHover(e, item.lbl) : undefined}
      onMouseLeave={onLeave}
      onClick={onClick}
      type="button"
      aria-current={active ? 'page' : undefined}
    >
      <span className="isb-ico">
        <NavIcon id={item.ico} />
      </span>
      <span className="isb-lbl">{item.lbl}</span>
      {badge != null && badge > 0 && (
        <span className="isb-bdg" aria-label={`${item.lbl}: ${badge} уведомлений`}>
          {badge}
        </span>
      )}
    </button>
  );
}

/** Sidebar — shared navigation for operator and admin frontends. */
export function Sidebar({
  collapsed = false,
  onToggle,
  activeItem = 'overview',
  onNavigate,
  variant = 'operator',
  theme = '',
  badges = {},
  className = '',
}: SidebarProps) {
  const [tip, setTip] = useState<{ lbl: string; top: number } | null>(null);
  const [tipRdy, setTipRdy] = useState(false);
  const sbRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setTipRdy(false);
    setTip(null);
    if (!collapsed) return;
    const t = setTimeout(() => setTipRdy(true), 210);
    return () => clearTimeout(t);
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

  const sections = variant === 'admin' ? ADMIN_NAV : OPERATOR_NAV;
  const hover = collapsed ? { onHover: showTip, onLeave: hideTip } : {};

  return (
    <aside
      className={cx(
        'iskra-sb',
        collapsed && 'isb-c',
        collapsed && tipRdy && 'isb-tip-rdy',
        theme,
        className,
      )}
      ref={sbRef}
      role="navigation"
      aria-label="Навигация платформы"
    >
      <div className="isb-logo">
        <span className="isb-spark">
          <Spark />
        </span>
        <span className="isb-wmark">ИСКРА.DCI</span>
        <button
          className="isb-collapser"
          type="button"
          onClick={onToggle}
          aria-expanded={!collapsed}
          aria-label={collapsed ? 'Развернуть боковую панель' : 'Свернуть боковую панель'}
        >
          <svg
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="7,2 4,5 7,8" />
          </svg>
        </button>
      </div>

      <div className="isb-scroll">
        {sections.map(({ id, lbl, items }) => (
          <div key={id} className="isb-grp">
            <div className="isb-sec" aria-hidden="true">
              {lbl}
            </div>
            {items.map((item) => (
              <Item
                key={item.id}
                item={item}
                active={activeItem === item.id}
                badge={badges[item.id]}
                onClick={() => onNavigate?.(item.id)}
                {...hover}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="isb-foot">
        {FOOTER_NAV.map((item) => (
          <Item
            key={item.id}
            item={item}
            active={activeItem === item.id}
            badge={badges[item.id]}
            onClick={() => onNavigate?.(item.id)}
            {...hover}
          />
        ))}
      </div>

      {tip && (
        <div className="isb-floatip" style={{ top: tip.top }}>
          {tip.lbl}
        </div>
      )}
    </aside>
  );
}
