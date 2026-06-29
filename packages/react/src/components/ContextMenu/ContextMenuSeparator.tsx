import { cx } from '../../utils/cx.js';

export interface ContextMenuSeparatorProps {
  className?: string;
}

/** Visual separator between groups of menu items. */
export function ContextMenuSeparator({ className }: ContextMenuSeparatorProps) {
  return <div role="separator" className={cx('ik-context-menu-separator', className)} />;
}
