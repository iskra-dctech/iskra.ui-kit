import * as React from 'react';

export type TextFieldSize = 's' | 'm' | 'l';

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Control height: `s` 28px · `m` 32px · `l` 36px. @default 'm' */
  size?: TextFieldSize;

  /** Label rendered above the field. */
  label?: React.ReactNode;

  /** Helper text rendered below the field (hidden when `error` is a string). */
  hint?: React.ReactNode;

  /**
   * Error state. Pass `true` to colour the field red, or a string to also
   * render it as the message below.
   */
  error?: boolean | string;

  /** Marks the label with a red asterisk. @default false */
  required?: boolean;

  /** Leading element, typically `<Icon name="search" />`. */
  iconBefore?: React.ReactNode;

  /** Shows a clear (✕) button while the field is non-empty. @default false */
  clearable?: boolean;

  /** Fired when the clear button is pressed (after the value is reset). */
  onClear?: () => void;

  /** Accessible label for the clear button. @default 'Очистить' */
  clearLabel?: string;

  /** Extra class on the inner `<input>`’s field container. */
  className?: string;

  /** Extra class on the outer wrapper. */
  wrapClassName?: string;
}

/**
 * ИСКРА.DCI — TextField.
 * Single-line input with optional label, hint/error message, leading icon and
 * clear button. Works controlled or uncontrolled. Self-injects scoped styles.
 *
 * @example
 * ```tsx
 * <TextField label="Хост" placeholder="leaf-07.msk" iconBefore={<Icon name="search" />} clearable />
 * <TextField label="Имя ключа" error="Уже используется" defaultValue="prod-key" />
 * <TextField size="s" placeholder="Фильтр…" />
 * ```
 */
export declare function TextField(props: TextFieldProps): React.ReactElement;
