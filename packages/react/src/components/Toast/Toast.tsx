import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { useIskraT } from '../../i18n/useIskraT.js';
import { cx } from '../../utils/cx.js';
import './Toast.css';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastOptions {
  title?: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
  /** Auto-dismiss delay in ms. 0 keeps it until dismissed. Default 5000. */
  duration?: number;
  action?: ReactNode;
  closeLabel?: string;
}

interface ToastRecord extends ToastOptions {
  id: string;
}

interface ToastContextValue {
  toast: (opts: ToastOptions) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let counter = 0;

/** ToastProvider — owns the toast queue and renders the viewport. Wrap your app once. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const t = useIskraT();
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const dismiss = useCallback((id: string) => {
    setToasts((list) => list.filter((t) => t.id !== id));
    const timer = timers.current[id];
    if (timer) {
      clearTimeout(timer);
      delete timers.current[id];
    }
  }, []);

  const toast = useCallback(
    (opts: ToastOptions) => {
      const id = `ik-toast-${++counter}`;
      const duration = opts.duration ?? 5000;
      setToasts((list) => [...list, { ...opts, id }]);
      if (duration > 0) {
        timers.current[id] = setTimeout(() => dismiss(id), duration);
      }
      return id;
    },
    [dismiss],
  );

  useEffect(() => {
    const t = timers.current;
    return () => {
      Object.values(t).forEach(clearTimeout);
    };
  }, []);

  const ctx = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={ctx}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <div className="ik-toast-viewport" role="region" aria-label={t('a11y.notifications')}>
            {toasts.map((t) => (
              <ToastItem key={t.id} toast={t} onClose={() => dismiss(t.id)} />
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

/** useToast — imperative API: `const { toast, dismiss } = useToast()`. */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a <ToastProvider>');
  return ctx;
}

function ToastItem({ toast, onClose }: { toast: ToastRecord; onClose: () => void }) {
  const t = useIskraT();
  const { title, description, variant = 'info', action, closeLabel } = toast;
  const resolvedCloseLabel = closeLabel ?? t('common.close');
  const role = variant === 'error' || variant === 'warning' ? 'alert' : 'status';
  return (
    <div className={cx('ik-toast', `ik-toast-${variant}`)} role={role}>
      <div className="ik-toast-body">
        {title && <div className="ik-toast-title">{title}</div>}
        {description && <div className="ik-toast-desc">{description}</div>}
        {action && <div className="ik-toast-action">{action}</div>}
      </div>
      <button
        type="button"
        className="ik-toast-close"
        onClick={onClose}
        aria-label={resolvedCloseLabel}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="4" y1="4" x2="12" y2="12" />
          <line x1="12" y1="4" x2="4" y2="12" />
        </svg>
      </button>
    </div>
  );
}
