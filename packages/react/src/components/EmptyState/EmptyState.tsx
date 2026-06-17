import { type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx.js';
import './EmptyState.css';

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Primary action (usually a Button). */
  action?: ReactNode;
}

/** EmptyState — zero-data placeholder with optional icon, copy and a call to action. */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...rest
}: EmptyStateProps) {
  return (
    <div className={cx('ik-empty', className)} {...rest}>
      {icon && (
        <span className="ik-empty-ico" aria-hidden="true">
          {icon}
        </span>
      )}
      <div className="ik-empty-title">{title}</div>
      {description && <div className="ik-empty-desc">{description}</div>}
      {action && <div className="ik-empty-action">{action}</div>}
    </div>
  );
}
