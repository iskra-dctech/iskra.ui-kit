import { useEffect, useId, useRef, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '../../utils/useFocusTrap.js';
import { cx } from '../../utils/cx.js';
import './Drawer.css';

export type DrawerSide = 'left' | 'right';

export interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: DrawerSide;
  title?: ReactNode;
  /** Required when `title` is omitted — names the dialog for screen readers. */
  'aria-label'?: string;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  children?: ReactNode;
  className?: string;
  returnFocusRef?: React.RefObject<HTMLElement | null>;
}

/**
 * Drawer — off-canvas panel for compact navigation. Wrap `Sidebar` or custom nav.
 * Implements `role="dialog"`, focus trap, Esc / overlay dismiss, focus restoration.
 */
export function Drawer({
  open,
  onOpenChange,
  side = 'left',
  title,
  'aria-label': ariaLabel,
  closeOnOverlay = true,
  closeOnEsc = true,
  children,
  className,
  returnFocusRef,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  useFocusTrap(panelRef, open);

  const handleClose = () => onOpenChange(false);

  useEffect(() => {
    if (open) {
      prevFocusRef.current = document.activeElement as HTMLElement | null;
      return;
    }
    const target = returnFocusRef?.current ?? prevFocusRef.current;
    target?.focus();
  }, [open, returnFocusRef]);

  useEffect(() => {
    if (!open || !closeOnEsc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, closeOnEsc, onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || typeof document === 'undefined') return null;

  const label = ariaLabel ?? (typeof title === 'string' ? title : undefined);

  const onOverlayMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlay && e.target === e.currentTarget) handleClose();
  };

  return createPortal(
    <div className="ik-drawer-overlay" onMouseDown={onOverlayMouseDown}>
      <div
        ref={panelRef}
        className={cx('ik-drawer-panel', side === 'right' ? 'is-right' : 'is-left', className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={!title ? label : undefined}
        tabIndex={-1}
      >
        {title && (
          <span id={titleId} className="ik-sr-only">
            {title}
          </span>
        )}
        <div className="ik-drawer-body">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
