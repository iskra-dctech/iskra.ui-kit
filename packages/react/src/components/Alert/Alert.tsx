import { type HTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon.js';
import { useIskraT } from '../../i18n/useIskraT.js';
import { cx } from '../../utils/cx.js';
import './Alert.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

const DEFAULT_ICON: Record<AlertVariant, IconName> = {
  info: 'info',
  success: 'check-circle',
  warning: 'warning',
  error: 'x-circle',
};

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: AlertVariant;
  title?: ReactNode;
  /** Replace the default status icon (or pass null to hide it). */
  icon?: ReactNode | null;
  closable?: boolean;
  onClose?: () => void;
  closeLabel?: string;
}

/**
 * Alert — inline contextual message. Errors/warnings announce assertively
 * (`role="alert"`); info/success use a polite `role="status"`.
 */
export function Alert({
  variant = 'info',
  title,
  icon,
  closable = false,
  onClose,
  closeLabel,
  children,
  className,
  ...rest
}: AlertProps) {
  const t = useIskraT();
  const resolvedCloseLabel = closeLabel ?? t('common.close');
  const role = variant === 'error' || variant === 'warning' ? 'alert' : 'status';
  const showIcon = icon !== null;
  return (
    <div className={cx('ik-alert', `ik-alert-${variant}`, className)} role={role} {...rest}>
      {showIcon && (
        <span className="ik-alert-ico" aria-hidden="true">
          {icon ?? <Icon name={DEFAULT_ICON[variant]} size={16} />}
        </span>
      )}
      <div className="ik-alert-body">
        {title && <div className="ik-alert-title">{title}</div>}
        {children}
      </div>
      {closable && (
        <button type="button" className="ik-alert-close" onClick={onClose} aria-label={resolvedCloseLabel}>
          <Icon name="close" size={14} />
        </button>
      )}
    </div>
  );
}
