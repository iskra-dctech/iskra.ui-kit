import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { Badge } from '../components/Badge/Badge.js'
import type { TableColumn } from '../components/Table/Table.js'
import { useStoryT } from './useStoryT.js'

export interface DemoIncident {
  id: string
  severity: 'critical' | 'warning'
  service: string
  status: string
}

export function useDemoIncidents() {
  const t = useStoryT()

  const incidents = useMemo<DemoIncident[]>(
    () => [
      {
        id: 'INC-2026-001245',
        severity: 'critical',
        service: t('demo.incidents.storageFailure'),
        status: t('demo.incidents.awaitingAck'),
      },
      {
        id: 'INC-2026-001242',
        severity: 'warning',
        service: t('demo.incidents.apiLatency'),
        status: t('demo.incidents.sent'),
      },
    ],
    [t],
  )

  const shortIncidents = useMemo(
    () =>
      incidents.map(({ id, severity, service }) => ({
        id,
        severity,
        service,
      })),
    [incidents],
  )

  const severityLabel = (severity: DemoIncident['severity']) =>
    severity === 'critical' ? t('demo.labels.critical') : t('demo.labels.warning')

  const renderSeverityBadge = (severity: DemoIncident['severity']): ReactNode => (
    <Badge variant={severity === 'critical' ? 'error' : 'warning'}>{severityLabel(severity)}</Badge>
  )

  const columns = useMemo<TableColumn<DemoIncident>[]>(
    () => [
      {
        key: 'severity',
        header: t('demo.labels.criticality'),
        render: (r) => renderSeverityBadge(r.severity),
      },
      { key: 'id', header: t('demo.labels.incidentId'), sortable: true },
      { key: 'service', header: t('demo.labels.service'), sortable: true },
      { key: 'status', header: t('demo.labels.status') },
    ],
    [t],
  )

  return { incidents, shortIncidents, columns, severityLabel, renderSeverityBadge }
}
