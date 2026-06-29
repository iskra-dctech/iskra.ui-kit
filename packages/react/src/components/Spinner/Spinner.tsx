import { type HTMLAttributes } from 'react';
import { useIskraT } from '../../i18n/useIskraT.js';
import { cx } from '../../utils/cx.js';
import './Spinner.css';

export type SpinnerSize = 's' | 'm' | 'l';

export interface SpinnerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
  size?: SpinnerSize;
  /** Accessible label announced to screen readers. */
  label?: string;
}

/** Spinner — indeterminate loading indicator with an accessible label. */
export function Spinner({ size = 'm', label, className, ...rest }: SpinnerProps) {
  const t = useIskraT();
  const resolvedLabel = label ?? t('common.loading');
  return (
    <div role="status" aria-live="polite" className={cx('ik-spinner-wrap', className)} {...rest}>
      <span className={cx('ik-spinner', `ik-spinner-${size}`)} aria-hidden="true" />
      <span className="ik-spinner-label">{resolvedLabel}</span>
    </div>
  );
}
