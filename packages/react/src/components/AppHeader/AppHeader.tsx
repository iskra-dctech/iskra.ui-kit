import { type HTMLAttributes, type ReactNode } from 'react';
import { useIskraT } from '../../i18n/useIskraT.js';
import { cx } from '../../utils/cx.js';
import './AppHeader.css';

export type AppHeaderIndicatorDot = 'ok' | 'warn' | 'error' | 'off';
/** @deprecated Use AppHeaderIndicatorDot */
export type AppHeaderStatusDot = AppHeaderIndicatorDot;

export interface AppHeaderNavItem {
  id: string;
  label: string;
  href?: string;
  current?: boolean;
}

export interface AppHeaderProps extends HTMLAttributes<HTMLElement> {
  /** Left zone — platform nav, breadcrumbs, status. */
  leading?: ReactNode;
  /** Center zone — typically global search (grows). */
  center?: ReactNode;
  /** Right zone — actions, notifications, user menu. */
  trailing?: ReactNode;
  /** Full custom layout; overrides leading/center/trailing when set. */
  children?: ReactNode;
}

function AppHeaderRoot({
  leading,
  center,
  trailing,
  children,
  className,
  ...rest
}: AppHeaderProps) {
  if (children != null) {
    return (
      <header className={cx('ik-app-header', className)} {...rest}>
        {children}
      </header>
    );
  }

  return (
    <header className={cx('ik-app-header', className)} {...rest}>
      {leading != null && <div className="ik-app-header-leading">{leading}</div>}
      {center != null && <div className="ik-app-header-center">{center}</div>}
      {trailing != null && <div className="ik-app-header-trailing">{trailing}</div>}
    </header>
  );
}

function Leading({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx('ik-app-header-leading', className)} {...rest}>
      {children}
    </div>
  );
}

function Center({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx('ik-app-header-center', className)} {...rest}>
      {children}
    </div>
  );
}

function Trailing({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx('ik-app-header-trailing', className)} {...rest}>
      {children}
    </div>
  );
}

/** @deprecated Use AppHeader.Leading */
const Start = Leading;
/** @deprecated Use AppHeader.Trailing */
const End = Trailing;

function Actions({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx('ik-app-header-actions', className)} {...rest}>
      {children}
    </div>
  );
}

export interface AppHeaderNavProps extends HTMLAttributes<HTMLElement> {
  items: AppHeaderNavItem[];
  separator?: ReactNode;
  onNavigate?: (id: string) => void;
}

function Nav({ items, separator = '/', onNavigate, className, ...rest }: AppHeaderNavProps) {
  const t = useIskraT();
  return (
    <nav className={cx('ik-app-header-nav', className)} aria-label={t('a11y.navigation')} {...rest}>
      {items.map((item, i) => (
        <span key={item.id} style={{ display: 'contents' }}>
          {i > 0 && (
            <span className="ik-app-header-nav-sep" aria-hidden="true">
              {separator}
            </span>
          )}
          {item.href ? (
            <a
              href={item.href}
              className={cx('ik-app-header-nav-link', item.current && 'is-current')}
              aria-current={item.current ? 'page' : undefined}
            >
              {item.label}
            </a>
          ) : (
            <button
              type="button"
              className={cx('ik-app-header-nav-link', item.current && 'is-current')}
              aria-current={item.current ? 'page' : undefined}
              onClick={() => onNavigate?.(item.id)}
            >
              {item.label}
            </button>
          )}
        </span>
      ))}
    </nav>
  );
}

export interface AppHeaderIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  dot?: AppHeaderIndicatorDot;
  mono?: boolean;
  children?: ReactNode;
}

function Indicator({
  dot = 'ok',
  mono = false,
  children,
  className,
  ...rest
}: AppHeaderIndicatorProps) {
  return (
    <div className={cx('ik-app-header-indicator', className)} {...rest}>
      <span className={cx('ik-app-header-indicator-dot', `is-${dot}`)} aria-hidden="true" />
      <span className={mono ? 'ik-app-header-text-mono' : undefined}>{children}</span>
    </div>
  );
}

/** @deprecated Use AppHeader.Indicator */
const Status = Indicator;

export interface AppHeaderTextProps extends HTMLAttributes<HTMLSpanElement> {
  mono?: boolean;
  children?: ReactNode;
}

function Text({ mono = false, children, className, ...rest }: AppHeaderTextProps) {
  return (
    <span
      className={cx('ik-app-header-text', mono && 'ik-app-header-text-mono', className)}
      {...rest}
    >
      {children}
    </span>
  );
}

/** @deprecated Use AppHeader.Text */
const Meta = Text;

/**
 * AppHeader — universal top shell bar. Compose with Leading / Center / Trailing
 * zones, or pass `leading` / `center` / `trailing` props. Product-specific
 * content (Notifier, DCI, …) belongs in the host app, not in defaults here.
 */
export const AppHeader = Object.assign(AppHeaderRoot, {
  Leading,
  Center,
  Trailing,
  Start,
  End,
  Nav,
  Actions,
  Indicator,
  Status,
  Text,
  Meta,
});
