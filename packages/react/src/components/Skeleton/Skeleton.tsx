import { type CSSProperties, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx.js';
import './Skeleton.css';

export type SkeletonVariant = 'text' | 'rect' | 'circle';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  /** For variant="text": number of lines to render. */
  lines?: number;
  animated?: boolean;
}

const dim = (v: number | string | undefined): string | undefined =>
  v == null ? undefined : typeof v === 'number' ? `${v}px` : v;

/** Skeleton — content placeholder shown while data loads. Decorative (aria-hidden). */
export function Skeleton({
  variant = 'text',
  width,
  height,
  lines = 1,
  animated = true,
  className,
  style,
  ...rest
}: SkeletonProps) {
  const base = cx('ik-sk', `ik-sk-${variant}`, animated && 'ik-sk-animated', className);

  if (variant === 'text' && lines > 1) {
    return (
      <div className="ik-sk-lines" aria-hidden="true" {...rest}>
        {Array.from({ length: lines }).map((_, i) => (
          <span
            key={i}
            className={base}
            style={{ width: i === lines - 1 ? '60%' : (dim(width) ?? '100%'), ...style }}
          />
        ))}
      </div>
    );
  }

  const css: CSSProperties = { width: dim(width), height: dim(height), ...style };
  return <div className={base} style={css} aria-hidden="true" {...rest} />;
}
