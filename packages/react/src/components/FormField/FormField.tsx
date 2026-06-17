import { cloneElement, useId, type ReactElement, type ReactNode } from 'react';
import { cx } from '../../utils/cx.js';
import './FormField.css';

interface ControlAriaProps {
  id?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  'aria-required'?: boolean;
}

export interface FormFieldProps {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode | boolean;
  required?: boolean;
  /** Provide an explicit id; otherwise one is generated and wired to the control. */
  id?: string;
  /** A single form control. Receives id + aria-* automatically. */
  children: ReactElement<ControlAriaProps>;
  className?: string;
}

/**
 * FormField — labels a single control and wires `htmlFor`, `aria-describedby`,
 * `aria-invalid` and `aria-required`. Pairs with raw inputs or any control that
 * forwards id/aria props.
 */
export function FormField({
  label,
  hint,
  error,
  required = false,
  id,
  children,
  className,
}: FormFieldProps) {
  const autoId = useId();
  const fieldId = id ?? children.props.id ?? `ik-ff-${autoId}`;
  const msgId = `${fieldId}-msg`;
  const errText = typeof error === 'string' ? error : null;
  const isError = Boolean(error);
  const hasMsg = Boolean(errText || hint);

  const control = cloneElement(children, {
    id: fieldId,
    'aria-describedby': hasMsg ? msgId : children.props['aria-describedby'],
    'aria-invalid': isError || children.props['aria-invalid'],
    'aria-required': required || children.props['aria-required'],
  });

  return (
    <div className={cx('ik-ff', className)}>
      {label && (
        <label className="ik-ff-label" htmlFor={fieldId}>
          {label}
          {required && (
            <span className="ik-ff-req" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {control}
      {hasMsg && (
        <div id={msgId} className={cx('ik-ff-msg', isError && 'is-error')}>
          {errText || hint}
        </div>
      )}
    </div>
  );
}
