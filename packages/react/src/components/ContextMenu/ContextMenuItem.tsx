import { useEffect, useId, useRef, type KeyboardEvent, type ReactNode } from 'react';
import { isActivationKey } from '@iskra-ui/core';
import { cx } from '../../utils/cx.js';
import { useContextMenu } from './context.js';

export interface ContextMenuItemProps {
  children: ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  icon?: ReactNode;
  className?: string;
}

/**
 * Menu action item. Invokes `onSelect` and closes the menu on activation.
 */
export function ContextMenuItem({
  children,
  onSelect,
  disabled = false,
  destructive = false,
  icon,
  className,
}: ContextMenuItemProps) {
  const itemId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { items, registerItem, unregisterItem, activeIndex, setActiveIndex, close, triggerRef } =
    useContextMenu();

  const isActive = items[activeIndex]?.id === itemId;
  const tabIndex = isActive ? 0 : -1;

  useEffect(() => {
    registerItem({
      id: itemId,
      disabled,
      focus: () => buttonRef.current?.focus(),
    });
    return () => unregisterItem(itemId);
  }, [itemId, disabled, registerItem, unregisterItem]);

  const handleSelect = () => {
    if (disabled) return;
    onSelect?.();
    close();
    triggerRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!isActivationKey(e.key)) return;
    e.preventDefault();
    handleSelect();
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      role="menuitem"
      disabled={disabled}
      tabIndex={tabIndex}
      className={cx(
        'ik-context-menu-item',
        destructive && 'ik-context-menu-item--destructive',
        className,
      )}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      onFocus={() => {
        const idx = items.findIndex((entry) => entry.id === itemId);
        if (idx >= 0) setActiveIndex(idx);
      }}
    >
      {icon ? <span className="ik-context-menu-item-icon" aria-hidden="true">{icon}</span> : null}
      <span className="ik-context-menu-item-label">{children}</span>
    </button>
  );
}
