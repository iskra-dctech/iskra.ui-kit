import * as React from 'react';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'accent' | 'neutral';
export type BadgeSize = 's' | 'm';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Signal colour.
   * `success` (Sync/Online) · `warning` (Drift) · `error` (Critical) ·
   * `info` (Maintenance) · `accent` (mint) · `neutral` (Offline/Inactive).
   * @default 'neutral'
   */
  variant?: BadgeVariant;
  /** `s` 11px · `m` 12px. @default 'm' */
  size?: BadgeSize;
  /** Leading status dot in the current colour. @default false */
  dot?: boolean;
  /** Optional leading icon (e.g. `<Icon name="success" size={12} />`). */
  icon?: React.ReactNode;
}

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Mint-tinted styling instead of neutral. @default false */
  accent?: boolean;
  /** When provided, renders a removable ✕ chip and fires this on click. */
  onRemove?: () => void;
  /** Accessible label for the remove button. @default 'Удалить' */
  removeLabel?: string;
}

/**
 * ИСКРА.DCI — Badge. Status signal pill; colour follows the design-system
 * status model. Border/background are derived from the text colour so the same
 * component works in both themes.
 *
 * @example
 * ```tsx
 * <Badge variant="success" dot>Sync</Badge>
 * <Badge variant="warning" dot>Drift</Badge>
 * <Badge variant="error" icon={<Icon name="error" size={12} />}>Critical</Badge>
 * ```
 */
export declare function Badge(props: BadgeProps): React.ReactElement;

/**
 * ИСКРА.DCI — Tag. Monospace technical label; optionally removable.
 *
 * @example
 * ```tsx
 * <Tag>spine</Tag>
 * <Tag accent>prod</Tag>
 * <Tag accent onRemove={() => drop('leaf')}>leaf</Tag>
 * ```
 */
export declare function Tag(props: TagProps): React.ReactElement;
