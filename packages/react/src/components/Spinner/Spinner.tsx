import { type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx.js';
import './Spinner.css';

export type SpinnerSize = 's' | 'm' | 'l';

export interface SpinnerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
  size?: SpinnerSize;
  /** Accessible label announced to screen readers. */
  label?: string;
}

/** Spinner — indeterminate loading indicator with an accessible label. */
export function Spinner({ size = 'm', label = 'Загрузка…', className, ...rest }: SpinnerProps) {
  return (
    <div role="status" aria-live="polite" className={cx('ik-spinner-wrap', className)} {...rest}>
      <span className={cx('ik-spinner', `ik-spinner-${size}`)} aria-hidden="true" />
      <span className="ik-spinner-label">{label}</span>
    </div>
  );
}
