import { type HTMLAttributes, type ReactNode } from 'react';
import { useIskraT } from '../../i18n/useIskraT.js';
import { cx } from '../../utils/cx.js';
import './Badge.css';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'accent' | 'neutral';
export type BadgeSize = 's' | 'm';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Show a leading status dot. */
  dot?: boolean;
  icon?: ReactNode;
}

/** Badge — informational status pill. Not interactive by default. */
export function Badge({
  variant = 'neutral',
  size = 'm',
  dot = false,
  icon,
  children,
  className,
  ...rest
}: BadgeProps) {
  return (
    <span className={cx('ik-bdg', `ik-bdg-${size}`, `ik-bdg-${variant}`, className)} {...rest}>
      {dot && <span className="ik-bdg-dot" aria-hidden="true" />}
      {icon}
      {children}
    </span>
  );
}

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  accent?: boolean;
  onRemove?: () => void;
  removeLabel?: string;
}

/** Tag — mono technical label, optionally removable (chip). */
export function Tag({
  accent = false,
  onRemove,
  removeLabel,
  children,
  className,
  ...rest
}: TagProps) {
  const t = useIskraT();
  const resolvedRemoveLabel = removeLabel ?? t('common.remove');
  return (
    <span className={cx('ik-tag', accent && 'ik-tag-accent', className)} {...rest}>
      {children}
      {onRemove && (
        <button
          type="button"
          className="ik-tag-x"
          onClick={onRemove}
          aria-label={resolvedRemoveLabel}
        >
          <svg
            width="9"
            height="9"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="4" y1="4" x2="12" y2="12" />
            <line x1="12" y1="4" x2="4" y2="12" />
          </svg>
        </button>
      )}
    </span>
  );
}
