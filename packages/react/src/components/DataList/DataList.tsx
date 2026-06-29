import type { ReactNode } from 'react';
import { useIskraT } from '../../i18n/useIskraT.js';
import { cx } from '../../utils/cx.js';
import { Spinner } from '../Spinner/Spinner.js';
import './DataList.css';

export type DataListDensity = 'regular' | 'compact';

export interface DataListRenderContext {
  index: number;
}

export interface DataListProps<T> {
  items: T[];
  getItemKey: (item: T) => string;
  renderItem: (item: T, ctx: DataListRenderContext) => ReactNode;
  loading?: boolean;
  empty?: ReactNode;
  error?: ReactNode;
  density?: DataListDensity;
  'aria-label': string;
  className?: string;
}

/**
 * DataList — generic list container for compact entity views. Not a table; supply
 * domain cards or rows via `renderItem`. Pair with `Table` on desktop via
 * `useMediaQuery`, not automatic breakpoint switching inside this component.
 */
export function DataList<T>({
  items,
  getItemKey,
  renderItem,
  loading = false,
  empty,
  error,
  density = 'regular',
  'aria-label': ariaLabel,
  className,
}: DataListProps<T>) {
  const t = useIskraT();
  if (error != null) {
    return (
      <div className={cx('ik-datalist-state', 'ik-datalist-state-error', className)} role="alert">
        {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div className={cx('ik-datalist-state', className)} aria-label={ariaLabel} aria-busy="true">
        <Spinner size="m" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={cx('ik-datalist-state', className)} role="status">
        {empty ?? t('common.noData')}
      </div>
    );
  }

  return (
    <ul
      className={cx('ik-datalist', density === 'compact' && 'ik-datalist-compact', className)}
      role="list"
      aria-label={ariaLabel}
    >
      {items.map((item, index) => (
        <li key={getItemKey(item)} className="ik-datalist-item" role="listitem">
          {renderItem(item, { index })}
        </li>
      ))}
    </ul>
  );
}
