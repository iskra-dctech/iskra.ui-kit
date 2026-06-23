import { type ReactNode } from 'react';
import { Button } from '../Button/Button.js';
import { Icon } from '../Icon/Icon.js';
import { cx } from '../../utils/cx.js';
import './DashboardToolbar.css';

export interface DashboardToolbarProps {
  title: string;
  editable?: boolean;
  onEditableChange?: (editable: boolean) => void;
  onAddWidget?: () => void;
  actions?: ReactNode;
  className?: string;
}

/**
 * DashboardToolbar — header actions for a dashboard (add widget, edit mode).
 */
export function DashboardToolbar({
  title,
  editable = false,
  onEditableChange,
  onAddWidget,
  actions,
  className,
}: DashboardToolbarProps) {
  return (
    <div className={cx('ik-dashboard-toolbar', className)}>
      <div className="ik-dashboard-toolbar-start">
        <h2 className="ik-dashboard-toolbar-title">{title}</h2>
      </div>
      <div className="ik-dashboard-toolbar-end">
        {actions}
        {onEditableChange && (
          <Button
            variant={editable ? 'primary' : 'outline'}
            size="s"
            onClick={() => onEditableChange(!editable)}
          >
            {editable ? 'Готово' : 'Редактировать'}
          </Button>
        )}
        {onAddWidget && (
          <Button size="s" iconBefore={<Icon name="plus" size={14} />} onClick={onAddWidget}>
            Виджет
          </Button>
        )}
      </div>
    </div>
  );
}
