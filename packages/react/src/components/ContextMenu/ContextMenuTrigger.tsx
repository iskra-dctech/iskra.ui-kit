import {
  cloneElement,
  isValidElement,
  type MouseEvent as ReactMouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import { getTriggerAria } from '@iskra-ui/core';
import { useContextMenu } from './context.js';

export interface ContextMenuTriggerProps {
  children: ReactNode;
  /** Merge props onto the child element instead of wrapping in a span. */
  asChild?: boolean;
  className?: string;
}

/**
 * Wraps the menu trigger area. Opens on right-click and/or click per parent ContextMenu `triggerOn`.
 */
export function ContextMenuTrigger({
  children,
  asChild = false,
  className,
}: ContextMenuTriggerProps) {
  const { open, setOpen, triggerOn, triggerRef, contentId, setPositionMode, setCursorPoint } =
    useContextMenu();

  const triggerAria = getTriggerAria(open, contentId, { haspopup: 'menu' });

  const handleContextMenu = (e: ReactMouseEvent) => {
    if (triggerOn === 'click') return;
    e.preventDefault();
    setPositionMode('cursor');
    setCursorPoint({ x: e.clientX, y: e.clientY });
    setOpen(true);
  };

  const handleClick = (e: ReactMouseEvent) => {
    if (triggerOn === 'contextmenu') return;
    const childOnClick = isValidElement(children)
      ? (children.props as { onClick?: (ev: ReactMouseEvent) => void }).onClick
      : undefined;
    childOnClick?.(e);
    setPositionMode('anchor');
    setCursorPoint(null);
    setOpen(!open);
  };

  const triggerProps = {
    onContextMenu: handleContextMenu,
    onClick: handleClick,
    'aria-expanded': triggerAria['aria-expanded'],
    'aria-controls': open ? contentId : undefined,
    'aria-haspopup': triggerAria['aria-haspopup'],
  };

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{
      onContextMenu?: (ev: ReactMouseEvent) => void;
      onClick?: (ev: ReactMouseEvent) => void;
    }>;

    return (
      <span
        ref={triggerRef as React.RefObject<HTMLSpanElement>}
        className="ik-context-menu-trigger-anchor"
        style={{ display: 'inline-flex' }}
      >
        {cloneElement(child, {
          onContextMenu: (e: ReactMouseEvent) => {
            child.props.onContextMenu?.(e);
            handleContextMenu(e);
          },
          onClick: (e: ReactMouseEvent) => {
            handleClick(e);
          },
          'aria-expanded': triggerProps['aria-expanded'],
          'aria-controls': triggerProps['aria-controls'],
          'aria-haspopup': triggerProps['aria-haspopup'],
        } as Record<string, unknown>)}
      </span>
    );
  }

  return (
    <span
      ref={triggerRef as React.RefObject<HTMLSpanElement>}
      className={className}
      {...triggerProps}
    >
      {children}
    </span>
  );
}
