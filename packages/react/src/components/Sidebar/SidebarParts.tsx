import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx.js';
import type { SidebarGroupProps, SidebarSectionProps } from './types.js';

export function SidebarBrand({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return <div className={cx('isb-brand', className)}>{children}</div>;
}

export function SidebarHeader({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return <div className={cx('isb-head', className)}>{children}</div>;
}

export function SidebarBody({ children, className }: { children?: ReactNode; className?: string }) {
  return <div className={cx('isb-scroll', className)}>{children}</div>;
}

export function SidebarGroup({ children, className }: SidebarGroupProps) {
  return <div className={cx('isb-grp', className)}>{children}</div>;
}

export function SidebarSection({ children, className }: SidebarSectionProps) {
  if (children == null) return null;
  return (
    <div className={cx('isb-sec', className)} aria-hidden="true">
      {children}
    </div>
  );
}

export function SidebarDivider({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('isb-divider', className)} role="separator" {...rest} />;
}

export function SidebarFooter({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return <div className={cx('isb-foot', className)}>{children}</div>;
}

export function SidebarCollapser({
  collapsed,
  label,
  onClick,
}: {
  collapsed: boolean;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      className="isb-collapser"
      type="button"
      onClick={onClick}
      aria-expanded={!collapsed}
      aria-label={label}
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
  );
}
