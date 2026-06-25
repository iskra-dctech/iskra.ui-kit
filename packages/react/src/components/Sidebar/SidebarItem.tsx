import type { MouseEvent } from 'react';
import { Icon } from '../Icon/Icon.js';
import { cx } from '../../utils/cx.js';
import type { IconName } from '@iskra-ui/icons';
import type { SidebarNavItem } from '@iskra-ui/core';
import { useSidebarContext } from './SidebarContext.js';
import type { SidebarItemProps } from './types.js';

function resolveItem(props: SidebarItemProps): SidebarNavItem {
  if (props.item) return props.item;
  return {
    id: props.id ?? props.label ?? '',
    label: props.label ?? '',
    icon: props.icon,
    badge: props.badge,
    disabled: props.disabled,
  };
}

function DefaultItemButton({
  item,
  active,
  badge,
  onHover,
  onLeave,
  onClick,
}: {
  item: SidebarNavItem;
  active: boolean;
  badge?: number;
  onHover?: (e: MouseEvent<HTMLButtonElement>, lbl: string) => void;
  onLeave?: () => void;
  onClick?: () => void;
}) {
  return (
    <button
      className={cx('isb-item', active && 'isb-on')}
      title={item.label}
      onMouseEnter={onHover ? (e) => onHover(e, item.label) : undefined}
      onMouseLeave={onLeave}
      onClick={onClick}
      type="button"
      disabled={item.disabled}
      aria-current={active ? 'page' : undefined}
    >
      <span className="isb-ico">
        {item.icon ? <Icon name={item.icon as IconName} size={16} /> : null}
      </span>
      <span className="isb-lbl">{item.label}</span>
      {badge != null && badge > 0 && (
        <span className="isb-bdg" aria-label={`${item.label}: ${badge}`}>
          {badge}
        </span>
      )}
    </button>
  );
}

export function SidebarItem({
  active = false,
  onClick,
  badge,
  className,
  ...rest
}: SidebarItemProps) {
  const { collapsed, renderItem, showTip, hideTip } = useSidebarContext();
  const item = resolveItem({ active, onClick, badge, className, ...rest });
  const resolvedBadge = badge ?? item.badge;

  if (renderItem) {
    return (
      <div className={cx('isb-item-wrap', className)} onClick={onClick}>
        {renderItem(item, { active, collapsed, badge: resolvedBadge })}
      </div>
    );
  }

  const hover =
    collapsed ?
      {
        onHover: showTip,
        onLeave: hideTip,
      }
    : {};

  return (
    <div className={className}>
      <DefaultItemButton
        item={item}
        active={active}
        badge={resolvedBadge}
        onClick={onClick}
        {...hover}
      />
    </div>
  );
}
