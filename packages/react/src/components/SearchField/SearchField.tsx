import { useEffect, useId, useRef, useState, type InputHTMLAttributes } from 'react';
import { useIskraT } from '../../i18n/useIskraT.js';
import { Icon } from '../Icon/Icon.js';
import { cx } from '../../utils/cx.js';
import './SearchField.css';

export type SearchFieldSize = 's' | 'm';
export type SearchFieldVariant = 'default' | 'inline';

export interface SearchFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type'
> {
  size?: SearchFieldSize;
  variant?: SearchFieldVariant;
  clearable?: boolean;
  onClear?: () => void;
  clearLabel?: string;
  /** Keyboard shortcut hint shown on the right, e.g. "⌘K". */
  shortcut?: string;
  /** When true, registers a global shortcut listener (Ctrl/Cmd+K). */
  enableShortcut?: boolean;
  onShortcut?: () => void;
  wrapClassName?: string;
}

function isModKey(e: KeyboardEvent) {
  return e.metaKey || e.ctrlKey;
}

/** SearchField — compact search input for headers and filter panels. */
export function SearchField({
  size = 'm',
  variant = 'default',
  clearable = true,
  onClear,
  clearLabel,
  shortcut,
  enableShortcut = false,
  onShortcut,
  disabled = false,
  value,
  defaultValue,
  onChange,
  onFocus,
  id,
  className,
  wrapClassName,
  placeholder,
  ...rest
}: SearchFieldProps) {
  const t = useIskraT();
  const resolvedClearLabel = clearLabel ?? t('common.clear');
  const resolvedPlaceholder = placeholder ?? t('common.search');
  const autoId = useId();
  const inputId = id ?? `ik-sf-${autoId}`;
  const inputRef = useRef<HTMLInputElement>(null);

  const controlled = value != null;
  const [hasVal, setHasVal] = useState(
    controlled ? String(value).length > 0 : String(defaultValue ?? '').length > 0,
  );
  const showClear = clearable && !disabled && (controlled ? String(value).length > 0 : hasVal);

  useEffect(() => {
    if (!enableShortcut) return;
    const onKey = (e: KeyboardEvent) => {
      if (isModKey(e) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        onShortcut?.();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [enableShortcut, onShortcut]);

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

  return (
    <div className={cx('ik-sf-wrap', wrapClassName)}>
      <div
        className={cx(
          'ik-sf-field',
          `ik-sf-${size}`,
          variant === 'inline' && 'ik-sf-inline',
          disabled && 'is-disabled',
          className,
        )}
      >
        <span className="ik-sf-ico" aria-hidden="true">
          <Icon name="search" size={14} />
        </span>
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          className="ik-sf-input"
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onFocus={onFocus}
          placeholder={resolvedPlaceholder}
          aria-label={rest['aria-label'] ?? resolvedPlaceholder}
          {...rest}
        />
        {showClear && (
          <button
            type="button"
            className="ik-sf-clear"
            onClick={handleClear}
            aria-label={resolvedClearLabel}
          >
            <Icon name="close" size={13} />
          </button>
        )}
        {shortcut && !showClear && (
          <kbd className="ik-sf-kbd" aria-hidden="true">
            {shortcut}
          </kbd>
        )}
      </div>
    </div>
  );
}
