import { type ReactNode } from 'react';
import { Skeleton } from '../Skeleton/Skeleton.js';
import { cx } from '../../utils/cx.js';
import './Table.css';

export type TableDensity = 'regular' | 'compact';
export type TableAlign = 'left' | 'right' | 'center';

export interface TableColumn<T> {
  /** Unique column key; also used to read `row[key]` when no `render` is given. */
  key: string;
  header: ReactNode;
  render?: (row: T, index: number) => ReactNode;
  align?: TableAlign;
  width?: number | string;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  /** Stable row id; defaults to the row index. */
  getRowId?: (row: T, index: number) => string | number;
  density?: TableDensity;
  stickyHeader?: boolean;
  loading?: boolean;
  /** Number of skeleton rows while loading. */
  loadingRows?: number;
  /** Shown when `data` is empty and not loading. */
  empty?: ReactNode;
  onRowClick?: (row: T, index: number) => void;
  selectedRowId?: string | number;
  /** Visually-hidden caption for screen readers. */
  caption?: string;
  className?: string;
}

const alignClass = (a?: TableAlign) =>
  a === 'right' ? 'ik-table-align-right' : a === 'center' ? 'ik-table-align-center' : undefined;

/** Table — foundational data table. Not a virtualized data-grid; see roadmap. */
export function Table<T>({
  columns,
  data,
  getRowId,
  density = 'regular',
  stickyHeader = false,
  loading = false,
  loadingRows = 5,
  empty,
  onRowClick,
  selectedRowId,
  caption,
  className,
}: TableProps<T>) {
  const colCount = columns.length;
  const rowId = (row: T, i: number) => getRowId?.(row, i) ?? i;

  return (
    <div className="ik-table-wrap">
      <table
        className={cx(
          'ik-table',
          `ik-table-${density}`,
          stickyHeader && 'ik-table-sticky',
          className,
        )}
      >
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                className={alignClass(c.align)}
                style={{ width: c.width }}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: loadingRows }).map((_, r) => (
              <tr key={`sk-${r}`}>
                {columns.map((c) => (
                  <td key={c.key} className={alignClass(c.align)}>
                    <Skeleton variant="text" />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td className="ik-table-state" colSpan={colCount}>
                {empty}
              </td>
            </tr>
          ) : (
            data.map((row, i) => {
              const id = rowId(row, i);
              return (
                <tr
                  key={id}
                  className={cx(
                    onRowClick && 'ik-table-row-clickable',
                    selectedRowId != null && selectedRowId === id && 'ik-table-row-selected',
                  )}
                  aria-selected={selectedRowId != null ? selectedRowId === id : undefined}
                  onClick={onRowClick ? () => onRowClick(row, i) : undefined}
                >
                  {columns.map((c) => (
                    <td key={c.key} className={alignClass(c.align)}>
                      {c.render
                        ? c.render(row, i)
                        : ((row as Record<string, ReactNode>)[c.key] ?? null)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
