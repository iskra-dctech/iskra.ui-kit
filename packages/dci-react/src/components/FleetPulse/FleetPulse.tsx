import { useId, useState } from 'react';
import { Badge, Button, Icon, useIskraT } from '@iskra-ui/react';
import './FleetPulse.css';

export type IssueSeverity = 'error' | 'drift';

export interface FleetIssue {
  id: string;
  name: string;
  reason: string;
  severity: IssueSeverity;
  actionLabel?: string;
  onAction?: () => void;
}

export interface FleetPulseProps {
  /** Percentage of the fleet in sync (0–100). */
  percent: number;
  issues?: FleetIssue[];
  label?: string;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

const RADIUS = 22;
const CIRC = 2 * Math.PI * RADIUS;

/**
 * FleetPulse — interactive sync ring summarising fleet health that expands into
 * a list of problem devices with inline remediation actions. Controlled or
 * uncontrolled via `open`/`defaultOpen`.
 */
export function FleetPulse({
  percent,
  issues = [],
  label,
  defaultOpen = false,
  open,
  onOpenChange,
  className,
}: FleetPulseProps) {
  const t = useIskraT();
  const resolvedLabel = label ?? t('dci.fleetPulse.label');
  const controlled = open != null;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = controlled ? open : internalOpen;
  const issuesId = useId();

  const pct = Math.max(0, Math.min(100, percent));
  const dash = (pct / 100) * CIRC;
  const hasIssues = issues.length > 0;

  const toggle = () => {
    const next = !isOpen;
    if (!controlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <div className={['dci-pulse-panel', isOpen && 'is-open', className].filter(Boolean).join(' ')}>
      <button
        type="button"
        className="dci-pulse-head"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={hasIssues ? issuesId : undefined}
      >
        <svg className="dci-pulse-ring" viewBox="0 0 56 56" aria-hidden="true">
          <circle
            cx="28"
            cy="28"
            r={RADIUS}
            fill="none"
            stroke="var(--line, #30363d)"
            strokeWidth="4"
          />
          <circle
            cx="28"
            cy="28"
            r={RADIUS}
            fill="none"
            stroke="var(--accent, #00ffc2)"
            strokeWidth="4"
            strokeDasharray={`${dash} ${CIRC - dash}`}
            strokeLinecap="round"
            transform="rotate(-90 28 28)"
          />
        </svg>
        <span>
          <span className="dci-pulse-pct">{pct}%</span>
          <span className="dci-pulse-label">
            <p className="dci-pulse-label-text">{resolvedLabel}</p>
          </span>
          {!hasIssues && <span className="dci-pulse-sub">{t('dci.fleetPulse.allSynced')}</span>}
          {hasIssues && (
            <span className="dci-pulse-sub">
              {t('dci.fleetPulse.devicesNeedAttention', { count: issues.length })}
            </span>
          )}
        </span>
        <span className="dci-pulse-chev" aria-hidden="true">
          <Icon name="chevron-down" size={16} />
        </span>
      </button>
      {hasIssues && isOpen && (
        <div className="dci-pulse-issues" id={issuesId}>
          <div className="dci-pulse-issues-hd">
            {t('dci.fleetPulse.problematicDevices', { count: issues.length })}
          </div>
          {issues.map((issue) => (
            <div className="dci-pulse-row" key={issue.id}>
              <span className={`dci-pulse-row-dot sev-${issue.severity}`} aria-hidden="true" />
              <span className="dci-pulse-row-name">{issue.name}</span>
              <span className="dci-pulse-row-reason">{issue.reason}</span>
              <Badge variant={issue.severity === 'error' ? 'error' : 'warning'} size="s">
                {issue.severity === 'error' ? t('dci.fleetPulse.error') : t('dci.fleetPulse.drift')}
              </Badge>
              {issue.actionLabel && (
                <Button
                  variant="outline"
                  size="s"
                  onClick={issue.onAction}
                  iconBefore={<Icon name="sync" size={13} />}
                >
                  {issue.actionLabel}
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
