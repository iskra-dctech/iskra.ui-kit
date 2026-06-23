import { type ReactNode } from 'react';
import { useIskraT } from '../../i18n/useIskraT.js';
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
  editLabel,
  removeLabel,
  className,
}: DashboardWidgetProps) {
  const t = useIskraT();
  const resolvedExpandLabel = expandLabel ?? t('widget.expandLabel', { title });
  const resolvedEditLabel = editLabel ?? t('widget.editLabel');
  const resolvedRemoveLabel = removeLabel ?? t('widget.removeLabel');

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
                aria-label={resolvedEditLabel}
                onClick={onEdit}
              />
            )}
            {onRemove && (
              <IconButton
                variant="ghost"
                size="s"
                icon={<Icon name="trash" size={14} />}
                aria-label={resolvedRemoveLabel}
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
