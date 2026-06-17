import { useId, useState, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { cx } from '../../utils/cx.js';
import './Textarea.css';

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'style'> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode | boolean;
  required?: boolean;
  resize?: 'none' | 'vertical';
  /** Show a `value.length / maxLength` counter (requires maxLength). */
  showCount?: boolean;
  wrapClassName?: string;
}

/** Textarea — multi-line text input with label, hint, error and optional counter. */
export function Textarea({
  label,
  hint,
  error,
  required = false,
  resize = 'vertical',
  showCount = false,
  rows = 4,
  maxLength,
  value,
  defaultValue,
  onChange,
  id,
  className,
  wrapClassName,
  ...rest
}: TextareaProps) {
  const autoId = useId();
  const taId = id ?? `ik-ta-${autoId}`;
  const controlled = value != null;
  const [count, setCount] = useState(
    controlled ? String(value).length : String(defaultValue ?? '').length,
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!controlled) setCount(e.target.value.length);
    onChange?.(e);
  };

  const errText = typeof error === 'string' ? error : null;
  const isError = Boolean(error);
  const currentCount = controlled ? String(value).length : count;

  return (
    <div className={cx('ik-ta-wrap', wrapClassName)}>
      {label && (
        <label className="ik-ta-label" htmlFor={taId}>
          {label}
          {required && (
            <span className="ik-ta-req" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <textarea
        id={taId}
        className={cx('ik-ta-field', `ik-ta-resize-${resize}`, isError && 'is-error', className)}
        rows={rows}
        maxLength={maxLength}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        aria-invalid={isError || undefined}
        aria-describedby={errText || hint ? `${taId}-msg` : undefined}
        {...rest}
      />
      {(errText || hint || (showCount && maxLength)) && (
        <div className="ik-ta-foot">
          {(errText || hint) && (
            <span id={`${taId}-msg`} className={cx('ik-ta-msg', isError && 'is-error')}>
              {errText || hint}
            </span>
          )}
          {showCount && maxLength != null && (
            <span className="ik-ta-count">
              {currentCount}/{maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
