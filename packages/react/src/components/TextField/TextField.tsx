import { useId, useRef, useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx.js';
import './TextField.css';

export type TextFieldSize = 's' | 'm' | 'l';

export interface TextFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'prefix'
> {
  size?: TextFieldSize;
  label?: ReactNode;
  hint?: ReactNode;
  /** Error message (string) or boolean error state. */
  error?: ReactNode | boolean;
  required?: boolean;
  iconBefore?: ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  clearLabel?: string;
  wrapClassName?: string;
}

/**
 * TextField — single-line text input with label, hint, error, leading icon and
 * an optional clear button. Controlled or uncontrolled. Wires `aria-describedby`
 * / `aria-invalid` for screen readers.
 */
export function TextField({
  size = 'm',
  label,
  hint,
  error,
  required = false,
  iconBefore,
  clearable = false,
  onClear,
  disabled = false,
  value,
  defaultValue,
  onChange,
  id,
  className,
  wrapClassName,
  clearLabel = 'Очистить',
  ...rest
}: TextFieldProps) {
  const autoId = useId();
  const inputId = id ?? `ik-tf-${autoId}`;
  const inputRef = useRef<HTMLInputElement>(null);

  const controlled = value != null;
  const [hasVal, setHasVal] = useState(
    controlled ? String(value).length > 0 : String(defaultValue ?? '').length > 0,
  );
  const showClear = clearable && !disabled && (controlled ? String(value).length > 0 : hasVal);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!controlled) setHasVal(e.target.value.length > 0);
    onChange?.(e);
  };

  const handleClear = () => {
    const el = inputRef.current;
    if (el) {
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value',
      )?.set;
      setter?.call(el, '');
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.focus();
    }
    if (!controlled) setHasVal(false);
    onClear?.();
  };

  const errText = typeof error === 'string' ? error : null;
  const isError = Boolean(error);

  return (
    <div className={cx('ik-tf-wrap', wrapClassName)}>
      {label && (
        <label className="ik-tf-label" htmlFor={inputId}>
          {label}
          {required && (
            <span className="ik-tf-req" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <div
        className={cx(
          'ik-tf-field',
          `ik-tf-${size}`,
          isError && 'is-error',
          disabled && 'is-disabled',
          className,
        )}
      >
        {iconBefore && <span className="ik-tf-ico">{iconBefore}</span>}
        <input
          ref={inputRef}
          id={inputId}
          className="ik-tf-input"
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          aria-invalid={isError || undefined}
          aria-describedby={errText || hint ? `${inputId}-msg` : undefined}
          {...rest}
        />
        {showClear && (
          <button
            type="button"
            className="ik-tf-clear"
            onClick={handleClear}
            aria-label={clearLabel}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="4" y1="4" x2="12" y2="12" />
              <line x1="12" y1="4" x2="4" y2="12" />
            </svg>
          </button>
        )}
      </div>
      {(errText || hint) && (
        <div id={`${inputId}-msg`} className={cx('ik-tf-msg', isError && 'is-error')}>
          {errText || hint}
        </div>
      )}
    </div>
  );
}
