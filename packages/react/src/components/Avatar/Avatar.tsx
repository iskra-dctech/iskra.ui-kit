import { useState, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx.js';
import './Avatar.css';

export type AvatarSize = 'sm' | 'md' | 'lg';
export type AvatarShape = 'circle' | 'square';
export type AvatarStatus = 'online' | 'warn' | 'off' | 'error';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Display name — used for the accessible label and initials fallback. */
  name?: string;
  src?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  status?: AvatarStatus;
}

function initials(name?: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0] ?? '').join('') || '?';
}

/** Avatar — user/device representation with image or initials fallback + status dot. */
export function Avatar({
  name,
  src,
  size = 'md',
  shape = 'circle',
  status,
  className,
  ...rest
}: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const showImg = src && !failed;
  return (
    <span
      className={cx('ik-av', `ik-av-${size}`, `ik-av-${shape}`, className)}
      role="img"
      aria-label={name}
      {...rest}
    >
      {showImg ? (
        <img className="ik-av-img" src={src} alt="" onError={() => setFailed(true)} />
      ) : (
        <span aria-hidden="true">{initials(name)}</span>
      )}
      {status && (
        <span className={cx('ik-av-status', `ik-av-status-${status}`)} aria-hidden="true" />
      )}
    </span>
  );
}
