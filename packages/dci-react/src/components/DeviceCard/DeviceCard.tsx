import { type KeyboardEvent } from 'react';
import { Card, type CardProps } from '@iskra-ui/react';
import './DeviceCard.css';

export type DeviceStatus = 'sync' | 'drift' | 'error' | 'offline';

const STATUS_LABEL: Record<DeviceStatus, string> = {
  sync: 'Sync',
  drift: 'Drift',
  error: 'Error',
  offline: 'Offline',
};

export interface DeviceCardProps extends Omit<CardProps, 'children' | 'title'> {
  /** Device hostname, e.g. `spine-01.msk`. */
  name: string;
  /** Management IP. */
  ip: string;
  status: DeviceStatus;
  /** Sparkline metric label, e.g. `CPU · 24 ч`. */
  metricLabel: string;
  /** Formatted metric value, e.g. `88%`. */
  metricValue: string;
  /** Render the metric value + bars in the alert (warn) colour. */
  metricAlert?: boolean;
  /** Normalised sparkline samples in the 0..1 range. */
  sparkline?: number[];
  tags?: string[];
  onSelect?: () => void;
}

/**
 * DeviceCard — fleet device tile with status, a single configurable sparkline
 * metric and tags. Built on the foundation `Card`. Set `onSelect` to make it an
 * accessible button-like surface.
 */
export function DeviceCard({
  name,
  ip,
  status,
  metricLabel,
  metricValue,
  metricAlert = false,
  sparkline = [],
  tags = [],
  onSelect,
  className,
  ...rest
}: DeviceCardProps) {
  const clickable = typeof onSelect === 'function';
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (clickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onSelect!();
    }
  };

  return (
    <Card
      padding="s"
      interactive={clickable}
      className={['dci-device', clickable && 'is-clickable', className].filter(Boolean).join(' ')}
      onClick={clickable ? onSelect : undefined}
      onKeyDown={clickable ? onKeyDown : undefined}
      role={clickable ? 'button' : undefined}
      aria-label={clickable ? `${name} — ${STATUS_LABEL[status]}` : undefined}
      {...rest}
    >
      <div className="dci-device-top">
        <span className={`dci-device-dot s-${status}`} aria-hidden="true" />
        <span className="dci-device-name">{name}</span>
        <span className={`dci-device-status s-${status}`}>{STATUS_LABEL[status]}</span>
      </div>
      <div className="dci-device-ip">{ip}</div>
      <div className="dci-device-metahd">
        <span className="dci-device-metric-label">{metricLabel}</span>
        <span className={`dci-device-metric-value${metricAlert ? ' is-alert' : ''}`}>
          {metricValue}
        </span>
      </div>
      {sparkline.length > 0 && (
        <div className="dci-device-spark" aria-hidden="true">
          {sparkline.map((v, i) => (
            <span
              key={i}
              className={`dci-device-bar${metricAlert ? ' is-alert' : ''}`}
              style={{ height: `${Math.max(0, Math.min(1, v)) * 100}%` }}
            />
          ))}
        </div>
      )}
      {tags.length > 0 && (
        <div className="dci-device-tags">
          {tags.map((t) => (
            <span key={t} className="dci-device-tag">
              {t}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
}
