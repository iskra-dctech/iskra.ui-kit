import * as React from 'react';

export type RadioSize = 's' | 'm';

export interface RadioProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type'
> {
  /** Value submitted / reported when this radio is selected. */
  value: string;
  /** Circle size: `s` 14px · `m` 16px. @default 'm' */
  size?: RadioSize;
  /** Label text. */
  label?: React.ReactNode;
  /** Secondary description below the label. */
  description?: React.ReactNode;
  /** @default false */
  disabled?: boolean;
}

export interface RadioOption {
  value: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** Shared input `name`. Auto-generated if omitted. */
  name?: string;
  /** Controlled selected value. */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  /** Fired with the newly selected value. */
  onChange?: (value: string) => void;
  /** Declarative items. Alternatively pass `<Radio>` children. */
  options?: RadioOption[];
  /** Size applied to every radio. @default 'm' */
  size?: RadioSize;
  /** Layout direction. @default 'vertical' */
  orientation?: 'vertical' | 'horizontal';
  /** Disable the whole group. @default false */
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * ИСКРА.DCI — single Radio button. Usually rendered for you by `RadioGroup`,
 * but can be used standalone with a shared `name`.
 */
export declare function Radio(props: RadioProps): React.ReactElement;

/**
 * ИСКРА.DCI — RadioGroup. Manages single-select state and wires
 * name/checked/onChange to its radios.
 *
 * @example
 * ```tsx
 * <RadioGroup
 *   defaultValue="all"
 *   onChange={setScope}
 *   options={[
 *     { value: 'all', label: 'Все сайты' },
 *     { value: 'msk', label: 'Только MSK-DC1', description: '42 устройства' },
 *     { value: 'spb', label: 'Только SPB-DC2', disabled: true },
 *   ]}
 * />
 * ```
 */
export declare function RadioGroup(props: RadioGroupProps): React.ReactElement;
