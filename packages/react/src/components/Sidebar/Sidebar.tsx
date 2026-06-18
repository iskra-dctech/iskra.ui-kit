import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { Icon } from '../Icon/Icon.js'
import { cx } from '../../utils/cx.js'
import type { IconName } from '@iskra-ui/icons'
import {
  resolveSidebarGroups,
  type SidebarNavGroup,
  type SidebarNavItem,
  type SidebarVariant,
} from '@iskra-ui/core'
import './Sidebar.css'

export type SidebarTheme = '' | 'theme-cold' | 'theme-warm'

export type { SidebarNavGroup, SidebarNavItem, SidebarVariant }
export {
  DCI_OPERATOR_NAV,
  DCI_ADMIN_NAV,
  DCI_FOOTER_NAV,
  NOTIFIER_NAV,
  resolveSidebarGroups,
} from './presets.js'

export interface SidebarItemRenderContext {
  active: boolean
  collapsed: boolean
  badge?: number
}

export interface SidebarProps {
  /** Navigation tree. Omit when using `children` for a fully custom body. */
  groups?: SidebarNavGroup[]
  /** Declarative footer items (rendered as nav buttons). */
  footerItems?: SidebarNavItem[]
  /** Brand block in the top bar (logo, product name). No default — pass explicitly. */
  brand?: ReactNode
  /** Optional content below the brand bar, above scrollable nav. */
  header?: ReactNode
  /** Custom footer slot — overrides `footerItems` when set. */
  footer?: ReactNode
  /** Replaces the default groups renderer in the scroll area. */
  children?: ReactNode
  collapsed?: boolean
  /** Show collapse control when `onToggle` is provided. Default: true. */
  collapsible?: boolean
  onToggle?: () => void
  activeItem?: string
  onNavigate?: (id: string) => void
  onItemClick?: (item: SidebarNavItem) => void
  /** Convenience preset when `groups` is omitted. Prefer explicit `groups` in products. */
  variant?: SidebarVariant
  theme?: SidebarTheme
  badges?: Record<string, number>
  ariaLabel?: string
  renderItem?: (item: SidebarNavItem, ctx: SidebarItemRenderContext) => ReactNode
  className?: string
}

interface ItemProps {
  item: SidebarNavItem
  active: boolean
  collapsed: boolean
  badge?: number
  onHover?: (e: MouseEvent<HTMLButtonElement>, lbl: string) => void
  onLeave?: () => void
  onClick?: () => void
  renderItem?: SidebarProps['renderItem']
}

function DefaultItemButton({
  item,
  active,
  badge,
  onHover,
  onLeave,
  onClick,
}: Omit<ItemProps, 'collapsed' | 'renderItem'>) {
  return (
    <button
      className={cx('isb-item', active && 'isb-on')}
      title={item.label}
      onMouseEnter={onHover ? (e) => onHover(e, item.label) : undefined}
      onMouseLeave={onLeave}
      onClick={onClick}
      type="button"
      disabled={item.disabled}
      aria-current={active ? 'page' : undefined}
    >
      <span className="isb-ico">
        {item.icon ? <Icon name={item.icon as IconName} size={16} /> : null}
      </span>
      <span className="isb-lbl">{item.label}</span>
      {badge != null && badge > 0 && (
        <span className="isb-bdg" aria-label={`${item.label}: ${badge}`}>
          {badge}
        </span>
      )}
    </button>
  )
}

function Item(props: ItemProps) {
  const { renderItem, item, active, collapsed, badge, onClick, onHover, onLeave } = props
  if (renderItem) {
    return (
      <div className="isb-item-wrap" onClick={onClick}>
        {renderItem(item, { active, collapsed, badge })}
      </div>
    )
  }
  return (
    <DefaultItemButton
      item={item}
      active={active}
      badge={badge}
      onClick={onClick}
      onHover={onHover}
      onLeave={onLeave}
    />
  )
}

function NavGroups({
  groups,
  activeItem,
  collapsed,
  badges,
  onItemActivate,
  hover,
  renderItem,
}: {
  groups: SidebarNavGroup[]
  activeItem?: string
  collapsed: boolean
  badges: Record<string, number>
  onItemActivate: (item: SidebarNavItem) => void
  hover: { onHover?: ItemProps['onHover']; onLeave?: ItemProps['onLeave'] }
  renderItem?: SidebarProps['renderItem']
}) {
  return (
    <>
      {groups.map(({ id, label, items }) => (
        <div key={id} className="isb-grp">
          {label && (
            <div className="isb-sec" aria-hidden="true">
              {label}
            </div>
          )}
          {items.map((item) => (
            <Item
              key={item.id}
              item={item}
              active={activeItem === item.id}
              collapsed={collapsed}
              badge={badges[item.id] ?? item.badge}
              onClick={() => onItemActivate(item)}
              renderItem={renderItem}
              {...hover}
            />
          ))}
        </div>
      ))}
    </>
  )
}

/**
 * Sidebar — universal app navigation shell. Supply `groups` + `brand` per product,
 * or pass `children` for a fully custom body. Presets (`NOTIFIER_NAV`, …) live in
 * `@iskra-ui/core` for convenience only.
 */
export function Sidebar({
  groups: groupsProp,
  footerItems = [],
  brand,
  header,
  footer,
  children,
  collapsed = false,
  collapsible = true,
  onToggle,
  activeItem,
  onNavigate,
  onItemClick,
  variant = 'operator',
  theme = '',
  badges = {},
  ariaLabel = 'Навигация',
  renderItem,
  className = '',
}: SidebarProps) {
  const [tip, setTip] = useState<{ lbl: string; top: number } | null>(null)
  const [tipRdy, setTipRdy] = useState(false)
  const [prevCollapsed, setPrevCollapsed] = useState(collapsed)
  const sbRef = useRef<HTMLElement>(null)

  const groups = groupsProp ?? (children ? [] : resolveSidebarGroups(variant))
  const showCollapser = collapsible && typeof onToggle === 'function'

  if (collapsed !== prevCollapsed) {
    setPrevCollapsed(collapsed)
    setTipRdy(false)
    setTip(null)
  }

  useEffect(() => {
    if (!collapsed) return
    const t = setTimeout(() => setTipRdy(true), 210)
    return () => clearTimeout(t)
  }, [collapsed])

  const showTip = useCallback(
    (e: MouseEvent<HTMLButtonElement>, lbl: string) => {
      if (!tipRdy || !sbRef.current) return
      const ir = e.currentTarget.getBoundingClientRect()
      const sr = sbRef.current.getBoundingClientRect()
      setTip({ lbl, top: ir.top - sr.top + ir.height / 2 })
    },
    [tipRdy],
  )

  const hideTip = useCallback(() => setTip(null), [])

  const hover = collapsed ? { onHover: showTip, onLeave: hideTip } : {}

  const handleItem = (item: SidebarNavItem) => {
    onItemClick?.(item)
    onNavigate?.(item.id)
  }

  return (
    <aside
      className={cx(
        'iskra-sb',
        collapsed && 'isb-c',
        collapsed && tipRdy && 'isb-tip-rdy',
        theme,
        className,
      )}
      ref={sbRef}
      role="navigation"
      aria-label={ariaLabel}
    >
      {(brand != null || showCollapser) && (
        <div className="isb-logo">
          {brand != null && <div className="isb-brand">{brand}</div>}
          {showCollapser && (
            <button
              className="isb-collapser"
              type="button"
              onClick={onToggle}
              aria-expanded={!collapsed}
              aria-label={collapsed ? 'Развернуть боковую панель' : 'Свернуть боковую панель'}
            >
              <svg
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="7,2 4,5 7,8" />
              </svg>
            </button>
          )}
        </div>
      )}

      {header != null && <div className="isb-head">{header}</div>}

      <div className="isb-scroll">
        {children ?? (
          <NavGroups
            groups={groups}
            activeItem={activeItem}
            collapsed={collapsed}
            badges={badges}
            onItemActivate={handleItem}
            hover={hover}
            renderItem={renderItem}
          />
        )}
      </div>

      {footer != null ? (
        <div className="isb-foot">{footer}</div>
      ) : footerItems.length > 0 ? (
        <div className="isb-foot">
          {footerItems.map((item) => (
            <Item
              key={item.id}
              item={item}
              active={activeItem === item.id}
              collapsed={collapsed}
              badge={badges[item.id] ?? item.badge}
              onClick={() => handleItem(item)}
              renderItem={renderItem}
              {...hover}
            />
          ))}
        </div>
      ) : null}

      {tip && (
        <div className="isb-floatip" style={{ top: tip.top }}>
          {tip.lbl}
        </div>
      )}
    </aside>
  )
}
