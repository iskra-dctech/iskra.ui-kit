import { type CSSProperties, type SVGProps } from 'react';
import { icons, iconNames, type IconName } from '@iskra-ui/icons';

export type { IconName };
/** All registered icon names — handy for tooling / showcases. */
export const ICON_NAMES = iconNames;

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  /** Icon name from the canonical set. */
  name: IconName;
  /** Size — number (px) or any CSS length. Defaults to 1em (scales with text). */
  size?: number | string;
  strokeWidth?: number;
  /** Accessible name. When omitted the icon is decorative (aria-hidden). */
  title?: string;
  style?: CSSProperties;
}

/**
 * Icon — single shared 16×16 / 1.5px-stroke outline set. Monochrome, inherits
 * `currentColor`. Provide `title` to expose an accessible name.
 */
export function Icon({
  name,
  size = '1em',
  strokeWidth = 1.5,
  title,
  className,
  style,
  ...rest
}: IconProps) {
  const inner = icons[name];
  const px = typeof size === 'number' ? `${size}px` : size;
  return (
    <svg
      className={('iskra-icon ' + (className ?? '')).trim()}
      width={px}
      height={px}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : 'true'}
      aria-label={title || undefined}
      style={{ display: 'inline-block', flexShrink: 0, verticalAlign: 'middle', ...style }}
      dangerouslySetInnerHTML={{ __html: (title ? `<title>${title}</title>` : '') + inner }}
      {...rest}
    />
  );
}
