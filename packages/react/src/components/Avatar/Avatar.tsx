import { useState, type HTMLAttributes } from 'react'
import { cx } from '../../utils/cx.js'
import './Avatar.css'

export type AvatarSize = 'sm' | 'md' | 'lg'
export type AvatarShape = 'circle' | 'square'
export type AvatarStatus = 'online' | 'warn' | 'off' | 'error'
export type AvatarStatusDisplay = 'ring' | 'none'

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Display name — used for the accessible label and initials fallback. */
  name?: string
  src?: string
  size?: AvatarSize
  shape?: AvatarShape
  status?: AvatarStatus
  /** How to render presence status. Default: coloured ring around the avatar. */
  statusDisplay?: AvatarStatusDisplay
}

function initials(name?: string): string {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/).slice(0, 2)
  return parts.map((p) => p[0] ?? '').join('') || '?'
}

/** Avatar — user representation with image or initials fallback + optional status ring. */
export function Avatar({
  name,
  src,
  size = 'md',
  shape = 'circle',
  status,
  statusDisplay = 'ring',
  className,
  ...rest
}: AvatarProps) {
  const [failed, setFailed] = useState(false)
  const showImg = src && !failed
  const showRing = status && statusDisplay === 'ring'

  return (
    <span
      className={cx(
        'ik-av-wrap',
        showRing && `ik-av-ring-${status}`,
        className,
      )}
      {...rest}
    >
      <span
        className={cx('ik-av', `ik-av-${size}`, `ik-av-${shape}`)}
        role="img"
        aria-label={name}
      >
        {showImg ? (
          <img className="ik-av-img" src={src} alt="" onError={() => setFailed(true)} />
        ) : (
          <span aria-hidden="true">{initials(name)}</span>
        )}
      </span>
    </span>
  )
}
