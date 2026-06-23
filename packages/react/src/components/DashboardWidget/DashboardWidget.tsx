import { type ReactNode } from 'react';
import { Card } from '../Card/Card.js';
import { Icon } from '../Icon/Icon.js';
import { IconButton } from '../IconButton/IconButton.js';
import { cx } from '../../utils/cx.js';
import './DashboardWidget.css';

export interface DashboardWidgetProps {
  title: string;
  children: ReactNode;
  onExpand?: () => void;
  onEdit?: () => void;
  onRemove?: () => void;
  expandLabel?: string;
  editLabel?: string;
  removeLabel?: string;
  className?: string;
}

/**
 * DashboardWidget — card shell for a dashboard panel with expand/edit/remove actions.
 */
export function DashboardWidget({
  title,
  children,
  onExpand,
  onEdit,
  onRemove,
  expandLabel,
  editLabel = 'Редактировать виджет',
  removeLabel = 'Удалить виджет',
  className,
}: DashboardWidgetProps) {
  const resolvedExpandLabel = expandLabel ?? `Развернуть график ${title}`;

  return (
    <div className={cx('ik-dash-widget', className)}>
      <Card padding="none" className="ik-dash-widget-card">
        <div className="ik-dash-widget-hd">
          <div className="ik-dash-widget-title" title={title}>
            {title}
          </div>
          <div className="ik-dash-widget-actions">
            {onExpand && (
              <IconButton
                variant="ghost"
                size="s"
                icon={<Icon name="maximize" size={14} />}
                aria-label={resolvedExpandLabel}
                onClick={onExpand}
              />
            )}
            {onEdit && (
              <IconButton
                variant="ghost"
                size="s"
                icon={<Icon name="edit" size={14} />}
                aria-label={editLabel}
                onClick={onEdit}
              />
            )}
            {onRemove && (
              <IconButton
                variant="ghost"
                size="s"
                icon={<Icon name="trash" size={14} />}
                aria-label={removeLabel}
                onClick={onRemove}
              />
            )}
          </div>
        </div>
        <div className="ik-dash-widget-body">{children}</div>
      </Card>
    </div>
  );
}
