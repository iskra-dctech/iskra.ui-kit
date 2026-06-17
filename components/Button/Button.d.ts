import * as React from 'react';

export type ButtonVariant = 'primary' | 'outline' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 's' | 'm' | 'l';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /**
   * Visual style.
   * - `'primary'` — solid mint, the strong call-to-action
   * - `'outline'` — mint outline, the restrained system action
   * - `'secondary'` — neutral outline
   * - `'ghost'` — text only, no border
   * - `'destructive'` — red outline for dangerous actions
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Control height: `s` 28px · `m` 32px · `l` 36px.
   * @default 'm'
   */
  size?: ButtonSize;

  /** Element rendered before the label (e.g. `<Icon name="refresh" />`). */
  iconBefore?: React.ReactNode;

  /** Element rendered after the label (e.g. `<Icon name="chevron-down" />`). */
  iconAfter?: React.ReactNode;

  /**
   * Square icon-only button. Pass the icon as `children` and always set
   * `aria-label` for accessibility.
   * @default false
   */
  iconOnly?: boolean;

  /**
   * Shows a spinner and disables interaction.
   * @default false
   */
  loading?: boolean;

  /**
   * Stretch to the full width of the container.
   * @default false
   */
  fullWidth?: boolean;

  /** Native button type. @default 'button' */
  type?: 'button' | 'submit' | 'reset';
}

/**
 * ИСКРА.DCI — Button.
 * Self-injects its scoped styles on first render. Works in the dark (default)
 * and `theme-cold` themes via design-system CSS variables.
 *
 * @example
 * ```tsx
 * <Button onClick={save}>Сохранить</Button>
 * <Button variant="outline" iconBefore={<Icon name="refresh" />}>Синхронизировать</Button>
 * <Button variant="destructive" size="s">Отозвать</Button>
 * <Button iconOnly aria-label="Настройки"><Icon name="settings" /></Button>
 * <Button loading>Отправка…</Button>
 * ```
 */
export declare function Button(props: ButtonProps): React.ReactElement;
