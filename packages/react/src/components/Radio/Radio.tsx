import {
  Children,
  cloneElement,
  isValidElement,
  useId,
  useState,
  type InputHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx.js';
import './Radio.css';

export type RadioSize = 's' | 'm';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  value: string;
  size?: RadioSize;
  label?: ReactNode;
  description?: ReactNode;
}

/** Radio — single radio button (usually rendered by RadioGroup). */
export function Radio({
  value,
  checked,
  defaultChecked,
  name,
  disabled = false,
  size = 'm',
  label,
  description,
  onChange,
  id,
  className,
  ...rest
}: RadioProps) {
  const autoId = useId();
  const inputId = id ?? `ik-rd-${autoId}`;
  return (
    <label
      className={cx('ik-rd', `ik-rd-${size}`, disabled && 'is-disabled', className)}
      htmlFor={inputId}
    >
      <input
        id={inputId}
        type="radio"
        className="ik-rd-input"
        value={value}
        name={name}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onChange}
        {...rest}
      />
      <span className="ik-rd-circle" aria-hidden="true">
        <span className="ik-rd-dot" />
      </span>
      {(label || description) && (
        <span className="ik-rd-textwrap">
          {label && <span className="ik-rd-text">{label}</span>}
          {description && <span className="ik-rd-desc">{description}</span>}
        </span>
      )}
    </label>
  );
}

export interface RadioOption {
  value: string;
  label?: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options?: RadioOption[];
  size?: RadioSize;
  orientation?: 'vertical' | 'horizontal';
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

/** RadioGroup — manages single selection across its Radios. Controlled or uncontrolled. */
export function RadioGroup({
  name,
  value,
  defaultValue,
  onChange,
  options,
  size = 'm',
  orientation = 'vertical',
  disabled = false,
  className,
  children,
}: RadioGroupProps) {
  const autoName = useId();
  const groupName = name ?? `ik-rdg-${autoName}`;
  const controlled = value != null;
  const [internal, setInternal] = useState(defaultValue);
  const current = controlled ? value : internal;

  const handle = (v: string) => {
    if (!controlled) setInternal(v);
    onChange?.(v);
  };

  return (
    <div className={cx('ik-rdg', `ik-rdg-${orientation}`, className)} role="radiogroup">
      {options
        ? options.map((opt) => (
            <Radio
              key={opt.value}
              name={groupName}
              size={size}
              value={opt.value}
              label={opt.label}
              description={opt.description}
              disabled={disabled || opt.disabled}
              checked={current === opt.value}
              onChange={() => handle(opt.value)}
            />
          ))
        : Children.map(children, (child) => {
            if (!isValidElement<RadioProps>(child)) return child;
            return cloneElement(child as ReactElement<RadioProps>, {
              name: groupName,
              size: child.props.size ?? size,
              checked: current === child.props.value,
              disabled: disabled || child.props.disabled,
              onChange: () => handle(child.props.value),
            });
          })}
    </div>
  );
}
