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
  const {
    open,
    setOpen,
    triggerOn,
    triggerRef,
    contentId,
    setPositionMode,
    setCursorPoint,
  } = useContextMenu();

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

  const mergeProps = (child: ReactElement) =>
    cloneElement(child, {
      ref: (node: HTMLElement | null) => {
        triggerRef.current = node;
        const childRef = (child as ReactElement & { ref?: React.Ref<HTMLElement> }).ref;
        if (typeof childRef === 'function') childRef(node);
        else if (childRef && typeof childRef === 'object') {
          (childRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }
      },
      onContextMenu: (e: ReactMouseEvent) => {
        (child.props as { onContextMenu?: (ev: ReactMouseEvent) => void }).onContextMenu?.(e);
        handleContextMenu(e);
      },
      onClick: (e: ReactMouseEvent) => {
        handleClick(e);
      },
      'aria-expanded': triggerAria['aria-expanded'],
      'aria-controls': open ? contentId : undefined,
      'aria-haspopup': triggerAria['aria-haspopup'],
    } as Record<string, unknown>);

  if (asChild && isValidElement(children)) {
    return mergeProps(children);
  }

  return (
    <span
      ref={triggerRef as React.RefObject<HTMLSpanElement>}
      className={className}
      onContextMenu={handleContextMenu}
      onClick={handleClick}
      aria-expanded={triggerAria['aria-expanded']}
      aria-controls={open ? contentId : undefined}
      aria-haspopup={triggerAria['aria-haspopup']}
    >
      {children}
    </span>
  );
}
