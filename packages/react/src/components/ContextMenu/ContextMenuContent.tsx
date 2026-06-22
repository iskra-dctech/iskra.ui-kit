import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import {
  computeAnchorPosition,
  computeCursorPosition,
  firstEnabledMenuItemIndex,
  getNextMenuItemIndex,
  Keys,
} from '@iskra-ui/core';
import { cx } from '../../utils/cx.js';
import { useContextMenu } from './context.js';
import './ContextMenu.css';

export interface ContextMenuContentProps {
  children: ReactNode;
  className?: string;
}

/**
 * Portaled menu panel. Handles positioning, dismiss, and arrow-key navigation.
 */
export function ContextMenuContent({ children, className }: ContextMenuContentProps) {
  const {
    open,
    close,
    triggerRef,
    contentId,
    positionMode,
    cursorPoint,
    placement,
    items,
    activeIndex,
    setActiveIndex,
  } = useContextMenu();

  const panelRef = useRef<HTMLDivElement>(null);
  const openedRef = useRef(false);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  const updatePosition = () => {
    const panel = panelRef.current;
    if (!panel) return;
    const pr = panel.getBoundingClientRect();

    if (positionMode === 'cursor' && cursorPoint) {
      const nextPos = computeCursorPosition(cursorPoint, pr);
      panel.style.top = `${nextPos.top}px`;
      panel.style.left = `${nextPos.left}px`;
    } else {
      const anchor = triggerRef.current;
      if (!anchor) return;
      const ar = anchor.getBoundingClientRect();
      const nextPos = computeAnchorPosition(ar, pr, placement);
      panel.style.top = `${nextPos.top}px`;
      panel.style.left = `${nextPos.left}px`;
    }
    panel.style.visibility = 'visible';
  };

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open, positionMode, cursorPoint, placement]);

  useLayoutEffect(() => {
    if (!open) {
      openedRef.current = false;
      return;
    }
    if (openedRef.current || items.length === 0) return;
    openedRef.current = true;
    prevFocusRef.current = document.activeElement as HTMLElement | null;
    const first = firstEnabledMenuItemIndex(items);
    if (first === undefined) return;
    setActiveIndex(first);
    requestAnimationFrame(() => items[first]?.focus());
  }, [open, items, setActiveIndex]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === Keys.Escape) {
        e.preventDefault();
        close();
        prevFocusRef.current?.focus();
        return;
      }

      const nextIndex = getNextMenuItemIndex(items, activeIndex, e.key);
      if (nextIndex !== undefined) {
        e.preventDefault();
        setActiveIndex(nextIndex);
        items[nextIndex]?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close, items, activeIndex, setActiveIndex]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      close();
      prevFocusRef.current?.focus();
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open, close, triggerRef]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      ref={panelRef}
      id={contentId}
      role="menu"
      aria-orientation="vertical"
      className={cx('ik-context-menu', className)}
      style={{ top: -9999, left: -9999, visibility: 'hidden' }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {children}
    </div>,
    document.body,
  );
}
