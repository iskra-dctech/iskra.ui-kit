import { type ReactNode } from 'react';
import { IconButton, Icon, type IconName } from '@iskra-ui/react';
import './DriftToast.css';

export type DriftToastVariant = 'drift' | 'ok' | 'error' | 'info';

const ICON: Record<DriftToastVariant, IconName> = {
  drift: 'warning',
  ok: 'check-circle',
  error: 'x-circle',
  info: 'info',
};

const ROLE: Record<DriftToastVariant, 'alert' | 'status'> = {
  drift: 'alert',
  ok: 'status',
  error: 'alert',
  info: 'status',
};

export interface DriftToastProps {
  variant?: DriftToastVariant;
  title: ReactNode;
  description?: ReactNode;
  onClose?: () => void;
  closeLabel?: string;
  className?: string;
}

/**
 * DriftToast — Искра.DCI notification with a left status stripe, tuned for the
 * drift/sync/error/info lifecycle. Drift and error announce assertively
 * (`role="alert"`); ok/info are polite (`role="status"`).
 */
export function DriftToast({
  variant = 'info',
  title,
  description,
  onClose,
  closeLabel = 'Закрыть',
  className,
}: DriftToastProps) {
  return (
    <div
      className={['dci-toast', `v-${variant}`, className].filter(Boolean).join(' ')}
      role={ROLE[variant]}
    >
      <span className="dci-toast-icon" aria-hidden="true">
        <Icon name={ICON[variant]} size={11} />
      </span>
      <div className="dci-toast-body">
        <div className="dci-toast-title">{title}</div>
        {description && <div className="dci-toast-desc">{description}</div>}
      </div>
      {onClose && (
        <IconButton
          className="dci-toast-close"
          variant="ghost"
          size="s"
          aria-label={closeLabel}
          onClick={onClose}
          icon={<Icon name="close" size={13} />}
        />
      )}
    </div>
  );
}
