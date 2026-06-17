import * as React from 'react';

export type SwitchSize = 's' | 'm';

export interface SwitchProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type'
> {
  /** Controlled on/off state. */
  checked?: boolean;
  /** Uncontrolled initial state. */
  defaultChecked?: boolean;
  /** Track size: `s` 30×17 · `m` 34×19. @default 'm' */
  size?: SwitchSize;
  /** Label text beside the switch. */
  label?: React.ReactNode;
  /** Secondary description below the label. */
  description?: React.ReactNode;
  /** @default false */
  disabled?: boolean;
}

/**
 * ИСКРА.DCI — Switch (toggle).
 * Real `<input type="checkbox" role="switch">` with a sliding knob. Use for
 * instant on/off settings (Checkbox is for selection in forms). Self-injects styles.
 *
 * @example
 * ```tsx
 * <Switch label="Показывать Бит" defaultChecked />
 * <Switch label="Тех-обслуживание" description="Скрывает алёрты на 1 час" onChange={e => set(e.target.checked)} />
 * <Switch size="s" label="Компактный" />
 * ```
 */
export declare function Switch(props: SwitchProps): React.ReactElement;
