import { type HTMLAttributes, type ReactNode } from 'react';
import { Button } from '../Button/Button.js';
import { Icon } from '../Icon/Icon.js';
import { cx } from '../../utils/cx.js';
import './EmptyState.css';

export type EmptyStateVariant = 'default' | 'not-found';

const NOT_FOUND_DEFAULTS = {
  title: 'Страница не найдена',
  description:
    'Запрошенный адрес отсутствует в платформе Искра или был перемещён. Проверьте ссылку или вернитесь на главную.',
  code: 404,
} as const;

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: EmptyStateVariant;
  /** HTTP status code — shown for `not-found` (default 404). */
  code?: number;
  /** Full viewport layout for route-level pages. */
  fullPage?: boolean;
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** Primary action (usually a Button). */
  action?: ReactNode;
  /** Secondary action — e.g. «Назад». */
  secondaryAction?: ReactNode;
  /** Default primary handler for `variant="not-found"` when `action` is omitted. */
  onHome?: () => void;
  /** Default secondary handler for `variant="not-found"` when `secondaryAction` is omitted. */
  onBack?: () => void;
}

/**
 * EmptyState — zero-data placeholder or platform-level not-found page.
 * Use `variant="not-found"` + `fullPage` for HTTP 404 routes.
 */
export function EmptyState({
  variant = 'default',
  code,
  fullPage = false,
  icon,
  title,
  description,
  action,
  secondaryAction,
  onHome,
  onBack,
  className,
  ...rest
}: EmptyStateProps) {
  const isNotFound = variant === 'not-found';
  const resolvedCode = code ?? (isNotFound ? NOT_FOUND_DEFAULTS.code : undefined);
  const resolvedTitle = title ?? (isNotFound ? NOT_FOUND_DEFAULTS.title : '');
  const resolvedDescription =
    description ?? (isNotFound ? NOT_FOUND_DEFAULTS.description : undefined);
  const resolvedIcon = icon ?? (isNotFound ? <Icon name="help" size={40} /> : undefined);

  const primaryAction =
    action ?? (isNotFound ? <Button onClick={onHome}>На главную</Button> : undefined);

  const secondary =
    secondaryAction ??
    (isNotFound && onBack ? (
      <Button variant="ghost" onClick={onBack}>
        Назад
      </Button>
    ) : undefined);

  return (
    <div
      className={cx(
        'ik-empty',
        isNotFound && 'ik-empty-not-found',
        fullPage && 'ik-empty-full-page',
        className,
      )}
      role={isNotFound ? 'region' : undefined}
      aria-label={isNotFound ? 'Страница не найдена' : undefined}
      {...rest}
    >
      {resolvedCode != null && (
        <div className="ik-empty-code" aria-hidden="true">
          {resolvedCode}
        </div>
      )}
      {resolvedIcon && (
        <span className="ik-empty-ico" aria-hidden="true">
          {resolvedIcon}
        </span>
      )}
      <div className="ik-empty-title">{resolvedTitle}</div>
      {resolvedDescription && <div className="ik-empty-desc">{resolvedDescription}</div>}
      {(primaryAction || secondary) && (
        <div className="ik-empty-actions">
          {primaryAction && <div className="ik-empty-action">{primaryAction}</div>}
          {secondary && <div className="ik-empty-action">{secondary}</div>}
        </div>
      )}
    </div>
  );
}
