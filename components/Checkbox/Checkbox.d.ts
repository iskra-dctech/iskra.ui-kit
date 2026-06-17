import * as React from 'react';

export type CheckboxSize = 's' | 'm';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Controlled checked state. */
  checked?: boolean;

  /** Uncontrolled initial checked state. */
  defaultChecked?: boolean;

  /**
   * Renders the mixed (dash) state. Visual only — the underlying input stays
   * unchecked unless you also pass `checked`.
   * @default false
   */
  indeterminate?: boolean;

  /** Box size: `s` 14px · `m` 16px. @default 'm' */
  size?: CheckboxSize;

  /** Label text shown beside the box. */
  label?: React.ReactNode;

  /** Secondary description below the label. */
  description?: React.ReactNode;

  /** @default false */
  disabled?: boolean;
}

/**
 * ИСКРА.DCI — Checkbox.
 * Real `<input type="checkbox">` with a styled box; supports indeterminate,
 * label and description. Self-injects scoped styles.
 *
 * @example
 * ```tsx
 * <Checkbox label="Авто-reconcile при drift" defaultChecked />
 * <Checkbox label="Все сайты" description="Включает MSK-DC1 и SPB-DC2" indeterminate />
 * <Checkbox label="Недоступно" disabled />
 * ```
 */
export declare function Checkbox(props: CheckboxProps): React.ReactElement;
