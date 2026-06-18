import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { getTriggerAria } from '@iskra-ui/core'
import { cx } from '../../utils/cx.js'
import { useAnchorPosition, type PopoverPlacement } from '../../utils/useAnchorPosition.js'
import './Popover.css'

export type { PopoverPlacement }

export interface PopoverProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  trigger: ReactElement
  children: ReactNode
  placement?: PopoverPlacement
  offset?: number
  closeOnEsc?: boolean
  closeOnClickOutside?: boolean
  panelClassName?: string
  id?: string
}

/** Popover — anchored floating panel for notifications, menus, filters. */
export function Popover({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  trigger,
  children,
  placement = 'bottom-end',
  offset = 8,
  closeOnEsc = true,
  closeOnClickOutside = true,
  panelClassName,
  id: idProp,
}: PopoverProps) {
  const autoId = useId()
  const panelId = idProp ?? `ik-popover-${autoId}`
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const controlled = openProp !== undefined
  const open = controlled ? openProp : uncontrolledOpen

  const anchorRef = useRef<HTMLSpanElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const setOpen = useCallback(
    (next: boolean) => {
      if (!controlled) setUncontrolledOpen(next)
      onOpenChange?.(next)
    },
    [controlled, onOpenChange],
  )

  const pos = useAnchorPosition(open, anchorRef, panelRef, placement, offset)

  useEffect(() => {
    if (!open || !closeOnEsc) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, closeOnEsc, setOpen])

  useEffect(() => {
    if (!open || !closeOnClickOutside) return
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node
      if (anchorRef.current?.contains(t) || panelRef.current?.contains(t)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open, closeOnClickOutside, setOpen])

  const triggerAria = getTriggerAria(open, panelId)

  const handleTriggerClick = (e: ReactMouseEvent) => {
    if (isValidElement(trigger)) {
      const props = trigger.props as { onClick?: (ev: ReactMouseEvent) => void }
      props.onClick?.(e)
    }
    setOpen(!open)
  }

  const mergedTrigger = isValidElement(trigger)
    ? cloneElement(trigger, {
        onClick: handleTriggerClick,
        'aria-expanded': triggerAria['aria-expanded'],
        'aria-controls': open ? panelId : undefined,
      } as Record<string, unknown>)
    : trigger

  return (
    <>
      <span ref={anchorRef} className="ik-popover-anchor" style={{ display: 'inline-flex' }}>
        {mergedTrigger}
      </span>
      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            className={cx('ik-popover-panel', panelClassName)}
            style={
              pos
                ? { top: pos.top, left: pos.left, visibility: 'visible' as const }
                : { top: -9999, left: -9999, visibility: 'hidden' as const }
            }
            onMouseDown={(e) => e.stopPropagation()}
          >
            {children}
          </div>,
          document.body,
        )}
    </>
  )
}
