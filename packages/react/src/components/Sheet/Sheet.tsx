import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '../../utils/useFocusTrap.js';
import { cx } from '../../utils/cx.js';
import './Sheet.css';

export type SheetSnap = 'content' | 'half' | 'full';

export interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  snap?: SheetSnap;
  showHandle?: boolean;
  dismissible?: boolean;
  showClose?: boolean;
  closeLabel?: string;
  className?: string;
  returnFocusRef?: React.RefObject<HTMLElement | null>;
}

/**
 * Sheet — bottom panel for compact forms and actions. Use instead of `Modal` on
 * narrow viewports when a full-screen takeover is too heavy.
 */
export function Sheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  snap = 'content',
  showHandle = true,
  dismissible = true,
  showClose = true,
  closeLabel = 'Закрыть',
  className,
  returnFocusRef,
}: SheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);
  useFocusTrap(sheetRef, open);

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
    if (!open || !dismissible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, dismissible, onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || typeof document === 'undefined') return null;

  const titleId = title ? 'ik-sheet-title' : undefined;
  const descId = description ? 'ik-sheet-desc' : undefined;

  const onOverlayMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (dismissible && e.target === e.currentTarget) handleClose();
  };

  return createPortal(
    <div className="ik-sheet-overlay" onMouseDown={onOverlayMouseDown}>
      <div
        ref={sheetRef}
        className={cx('ik-sheet', `ik-sheet-snap-${snap}`, className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
      >
        {showHandle && (
          <div className="ik-sheet-handle" aria-hidden="true">
            <span className="ik-sheet-handle-bar" />
          </div>
        )}
        {(title || showClose) && (
          <div className="ik-sheet-header">
            <div>
              {title && (
                <div id={titleId} className="ik-sheet-title">
                  {title}
                </div>
              )}
              {description && (
                <div id={descId} className="ik-sheet-desc">
                  {description}
                </div>
              )}
            </div>
            {showClose && (
              <button
                type="button"
                className="ik-sheet-close"
                onClick={handleClose}
                aria-label={closeLabel}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="4" y1="4" x2="12" y2="12" />
                  <line x1="12" y1="4" x2="4" y2="12" />
                </svg>
              </button>
            )}
          </div>
        )}
        {children != null && <div className="ik-sheet-body">{children}</div>}
        {footer && <div className="ik-sheet-footer">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
