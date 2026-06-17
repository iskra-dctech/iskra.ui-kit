import { useEffect, useId, useRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx.js';
import './Checkbox.css';

export type CheckboxSize = 's' | 'm';

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type'
> {
  indeterminate?: boolean;
  size?: CheckboxSize;
  label?: ReactNode;
  description?: ReactNode;
}

/** Checkbox — checked / indeterminate / disabled, with optional label + description. */
export function Checkbox({
  checked,
  defaultChecked,
  indeterminate = false,
  disabled = false,
  size = 'm',
  label,
  description,
  onChange,
  id,
  className,
  ...rest
}: CheckboxProps) {
  const autoId = useId();
  const inputId = id ?? `ik-cb-${autoId}`;
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate, checked]);

  return (
    <label
      className={cx('ik-cb', `ik-cb-${size}`, disabled && 'is-disabled', className)}
      htmlFor={inputId}
    >
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        className="ik-cb-input"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onChange}
        {...rest}
      />
      <span className="ik-cb-box" aria-hidden="true">
        <svg
          className="ik-cb-check"
          width="11"
          height="11"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="3.5,8.5 6.5,11.5 12.5,4.5" />
        </svg>
        <svg
          className="ik-cb-dash"
          width="11"
          height="11"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        >
          <line x1="3.5" y1="8" x2="12.5" y2="8" />
        </svg>
      </span>
      {(label || description) && (
        <span className="ik-cb-textwrap">
          {label && <span className="ik-cb-text">{label}</span>}
          {description && <span className="ik-cb-desc">{description}</span>}
        </span>
      )}
    </label>
  );
}
