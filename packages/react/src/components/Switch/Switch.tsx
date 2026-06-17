import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx.js';
import './Switch.css';

export type SwitchSize = 's' | 'm';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  size?: SwitchSize;
  label?: ReactNode;
  description?: ReactNode;
}

/** Switch — on/off toggle. Semantically a `role="switch"` checkbox, not a checkbox skin. */
export function Switch({
  checked,
  defaultChecked,
  disabled = false,
  size = 'm',
  label,
  description,
  onChange,
  id,
  className,
  ...rest
}: SwitchProps) {
  const autoId = useId();
  const inputId = id ?? `ik-sw-${autoId}`;
  return (
    <label
      className={cx('ik-sw', `ik-sw-${size}`, disabled && 'is-disabled', className)}
      htmlFor={inputId}
    >
      <input
        id={inputId}
        type="checkbox"
        role="switch"
        className="ik-sw-input"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onChange}
        {...rest}
      />
      <span className="ik-sw-track" aria-hidden="true">
        <span className="ik-sw-knob" />
      </span>
      {(label || description) && (
        <span className="ik-sw-textwrap">
          {label && <span className="ik-sw-text">{label}</span>}
          {description && <span className="ik-sw-desc">{description}</span>}
        </span>
      )}
    </label>
  );
}
