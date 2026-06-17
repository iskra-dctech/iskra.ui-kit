import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '../../utils/useFocusTrap.js';
import { cx } from '../../utils/cx.js';
import './Modal.css';

export type ModalSize = 's' | 'm' | 'l';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  showClose?: boolean;
  closeLabel?: string;
  className?: string;
}

/**
 * Modal — accessible dialog rendered in a portal. Implements the WAI-ARIA dialog
 * pattern: `role="dialog"`, `aria-modal`, focus trap, Esc to close, focus
 * restoration, and an `aria-labelledby`/`aria-describedby` association.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'm',
  closeOnEsc = true,
  closeOnOverlayClick = true,
  showClose = true,
  closeLabel = 'Закрыть',
  className,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef, open);

  useEffect(() => {
    if (!open || !closeOnEsc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, closeOnEsc, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || typeof document === 'undefined') return null;

  const titleId = title ? 'ik-modal-title' : undefined;
  const descId = description ? 'ik-modal-desc' : undefined;

  const onOverlayMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className="ik-modal-overlay" onMouseDown={onOverlayMouseDown}>
      <div
        ref={dialogRef}
        className={cx('ik-modal', `ik-modal-${size}`, className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
      >
        {(title || showClose) && (
          <div className="ik-modal-header">
            <div className="ik-modal-titles">
              {title && (
                <div id={titleId} className="ik-modal-title">
                  {title}
                </div>
              )}
              {description && (
                <div id={descId} className="ik-modal-desc">
                  {description}
                </div>
              )}
            </div>
            {showClose && (
              <button
                type="button"
                className="ik-modal-close"
                onClick={onClose}
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
        {children != null && <div className="ik-modal-body">{children}</div>}
        {footer && <div className="ik-modal-footer">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
