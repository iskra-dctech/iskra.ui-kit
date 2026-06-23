import { type ReactNode } from 'react';
import { Modal } from '../Modal/Modal.js';
import { cx } from '../../utils/cx.js';
import './WidgetExpandView.css';

export interface WidgetExpandViewProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: ReactNode;
  toolbar?: ReactNode;
  children: ReactNode;
  closeLabel?: string;
  className?: string;
}

/**
 * WidgetExpandView — near-fullscreen modal for expanded chart inspection.
 * Built on the foundation Modal with focus trap and Esc to close.
 */
export function WidgetExpandView({
  open,
  onClose,
  title,
  description,
  toolbar,
  children,
  closeLabel = 'Закрыть',
  className,
}: WidgetExpandViewProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      size="l"
      closeLabel={closeLabel}
      className={cx('ik-widget-expand', className)}
    >
      {toolbar && <div className="ik-widget-expand-toolbar">{toolbar}</div>}
      <div className="ik-widget-expand-chart">{children}</div>
    </Modal>
  );
}
