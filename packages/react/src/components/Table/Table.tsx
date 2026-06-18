import { type ReactNode } from 'react'
import { Icon } from '../Icon/Icon.js'
import { Skeleton } from '../Skeleton/Skeleton.js'
import { cx } from '../../utils/cx.js'
import './Table.css'

export type TableDensity = 'regular' | 'compact'
export type TableAlign = 'left' | 'right' | 'center'
export type SortDirection = 'asc' | 'desc'

export interface TableSort {
  key: string
  direction: SortDirection
}

export interface TableColumn<T> {
  key: string
  header: ReactNode
  render?: (row: T, index: number) => ReactNode
  align?: TableAlign
  width?: number | string
  sortable?: boolean
  sortKey?: string
  filter?: ReactNode
}

export interface TableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  getRowId?: (row: T, index: number) => string | number
  density?: TableDensity
  stickyHeader?: boolean
  loading?: boolean
  loadingRows?: number
  empty?: ReactNode
  onRowClick?: (row: T, index: number) => void
  selectedRowId?: string | number
  caption?: string
  sort?: TableSort | null
  onSortChange?: (sort: TableSort | null) => void
  className?: string
}

const alignClass = (a?: TableAlign) =>
  a === 'right' ? 'ik-table-align-right' : a === 'center' ? 'ik-table-align-center' : undefined

function HeaderCell<T>({
  col,
  sort,
  onSortChange,
}: {
  col: TableColumn<T>
  sort?: TableSort | null
  onSortChange?: (sort: TableSort | null) => void
}) {
  const sk = col.sortKey ?? col.key
  const isActive = sort?.key === sk

  const handleSort = () => {
    if (!col.sortable || !onSortChange) return
    if (!isActive) onSortChange({ key: sk, direction: 'asc' })
    else if (sort!.direction === 'asc') onSortChange({ key: sk, direction: 'desc' })
    else onSortChange(null)
  }

  const content = (
    <span className="ik-table-th-inner">
      <span className="ik-table-th-label">{col.header}</span>
      {col.sortable && (
        <span className="ik-table-sort-icons" aria-hidden="true">
          <Icon
            name="chevron-up"
            size={10}
            style={{ opacity: isActive && sort?.direction === 'asc' ? 1 : 0.35 }}
          />
          <Icon
            name="chevron-down"
            size={10}
            style={{ opacity: isActive && sort?.direction === 'desc' ? 1 : 0.35 }}
          />
        </span>
      )}
      {col.filter && <span className="ik-table-th-filter">{col.filter}</span>}
    </span>
  )

  if (col.sortable) {
    return (
      <button type="button" className="ik-table-sort-btn" onClick={handleSort}>
        {content}
      </button>
    )
  }

  return content
}

/** Table — foundational data table with optional column sort and filter slots. */
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
  sort,
  onSortChange,
  className,
}: TableProps<T>) {
  const colCount = columns.length
  const rowId = (row: T, i: number) => getRowId?.(row, i) ?? i

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
                aria-sort={
                  c.sortable
                    ? sort?.key === (c.sortKey ?? c.key)
                      ? sort.direction === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : 'none'
                    : undefined
                }
              >
                <HeaderCell col={c} sort={sort} onSortChange={onSortChange} />
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
              const id = rowId(row, i)
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
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
