// @iskra-dci/icons — framework-agnostic icon data + a tiny SVG-string helper.
// Framework wrappers (React `<Icon>`, Vue `<Icon>`) consume `icons[name]`.
import { icons, type IconName } from './icons.js';

export { icons, type IconName };

export const iconNames = Object.keys(icons) as IconName[];

export interface IconSvgOptions {
  size?: number | string;
  strokeWidth?: number;
  title?: string;
  className?: string;
}

/** Returns a complete `<svg>…</svg>` string for the given icon (SSR / non-React use). */
export function iconSvg(name: IconName, opts: IconSvgOptions = {}): string {
  const { size = '1em', strokeWidth = 1.5, title, className } = opts;
  const px = typeof size === 'number' ? `${size}px` : size;
  const inner = icons[name];
  const titleTag = title ? `<title>${title}</title>` : '';
  const a11y = title ? `role="img" aria-label="${title}"` : 'aria-hidden="true"';
  const cls = className ? ` class="${className}"` : '';
  return (
    `<svg${cls} width="${px}" height="${px}" viewBox="0 0 16 16" fill="none" ` +
    `stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" ` +
    `stroke-linejoin="round" ${a11y}>${titleTag}${inner}</svg>`
  );
}
