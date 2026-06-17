import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx.js';
import './Button.css';

export type ButtonVariant = 'primary' | 'outline' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 's' | 'm' | 'l';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /** Visual variant. */
  variant?: ButtonVariant;
  /** Control size — s·m·l map to 28·32·36px height. */
  size?: ButtonSize;
  /** Icon rendered before the label. */
  iconBefore?: ReactNode;
  /** Icon rendered after the label. */
  iconAfter?: ReactNode;
  /** Square icon-only button (requires an accessible name via aria-label). */
  iconOnly?: boolean;
  /** Shows a spinner and disables interaction. */
  loading?: boolean;
  /** Stretches to the full width of its container. */
  fullWidth?: boolean;
}

/**
 * Button — primary action control. Always renders a native `<button>`.
 * For toggle buttons set `aria-pressed`; for icon-only buttons set `aria-label`.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'm',
    iconBefore,
    iconAfter,
    iconOnly = false,
    loading = false,
    disabled = false,
    fullWidth = false,
    type = 'button',
    className,
    children,
    ...rest
  },
  ref,
) {
  const cls = cx(
    'ik-btn',
    `ik-btn-${variant}`,
    `ik-btn-${size}`,
    iconOnly && 'ik-btn-io',
    fullWidth && 'ik-btn-fw',
    loading && 'ik-btn-loading',
    className,
  );

  return (
    <button ref={ref} type={type} className={cls} disabled={disabled || loading} {...rest}>
      {loading && <span className="ik-btn-spinner" aria-hidden="true" />}
      <span className="ik-btn-content">
        {iconBefore}
        {!iconOnly && children != null && <span>{children}</span>}
        {iconOnly && children}
        {iconAfter}
      </span>
    </button>
  );
});
