import * as React from 'react';

/**
 * Every icon name registered in the ИСКРА.DCI set.
 * Pass one of these to `<Icon name="…" />`.
 */
export type IconName =
  // chevrons & arrows
  | 'chevron-down' | 'chevron-up' | 'chevron-left' | 'chevron-right'
  | 'chevrons-left' | 'chevrons-right'
  | 'arrow-up' | 'arrow-down' | 'arrow-left' | 'arrow-right' | 'arrow-up-right'
  | 'external' | 'menu' | 'more' | 'more-vertical'
  // core actions
  | 'check' | 'close' | 'plus' | 'minus'
  | 'check-circle' | 'x-circle' | 'plus-circle' | 'minus-circle'
  // status
  | 'success' | 'warning' | 'error' | 'info' | 'help'
  // find / filter / sync
  | 'search' | 'filter' | 'sliders' | 'refresh' | 'sync' | 'undo' | 'redo'
  // edit / file ops
  | 'trash' | 'edit' | 'copy' | 'save' | 'download' | 'upload'
  | 'share' | 'link' | 'clipboard' | 'folder' | 'file' | 'file-text'
  // visibility
  | 'eye' | 'eye-off'
  // alerts / security
  | 'bell' | 'bell-off' | 'lock' | 'unlock' | 'shield' | 'shield-check'
  | 'key' | 'zap' | 'activity'
  // domain
  | 'settings' | 'user' | 'users' | 'user-plus' | 'calendar' | 'clock' | 'history'
  | 'server' | 'database' | 'cloud' | 'cpu' | 'globe' | 'wifi'
  | 'terminal' | 'code' | 'git-branch' | 'layers' | 'grid' | 'list'
  | 'tag' | 'bookmark' | 'star' | 'pin' | 'mail' | 'message'
  // theme / power
  | 'sun' | 'moon' | 'power' | 'log-out' | 'log-in';

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name'> {
  /** Which glyph to render. See {@link IconName}. */
  name: IconName;

  /**
   * Square size. A number is treated as pixels; a string is used verbatim.
   * Defaults to `'1em'` so the icon scales with surrounding text.
   * @default '1em'
   */
  size?: number | string;

  /**
   * Stroke width in the 16×16 viewBox.
   * @default 1.5
   */
  strokeWidth?: number;

  /**
   * Accessible label. When set the icon is exposed as `role="img"`;
   * otherwise it is `aria-hidden` (decorative).
   */
  title?: string;
}

/**
 * ИСКРА.DCI — shared icon component.
 * Renders a single glyph from the design-system icon set. Colour follows
 * `currentColor`; size follows the surrounding font-size unless `size` is set.
 *
 * @example
 * ```tsx
 * <Icon name="search" />
 * <Icon name="warning" size={20} title="Внимание" />
 * <Button iconBefore={<Icon name="refresh" />}>Sync</Button>
 * ```
 */
export declare function Icon(props: IconProps): React.ReactElement | null;

/** All registered icon names, in declaration order. */
export declare const ICON_NAMES: IconName[];
