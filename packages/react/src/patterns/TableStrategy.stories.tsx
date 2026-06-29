import { useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useStoryT } from '../storybook/useStoryT.js';
import { Badge } from '../components/Badge/Badge.js';
import { Card } from '../components/Card/Card.js';
import { DataList } from '../components/DataList/DataList.js';
import { Table, type TableColumn } from '../components/Table/Table.js';

const meta = {
  title: 'Patterns/TableStrategy',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Data density strategies. Table stays a table; compact entity view is a separate DataList. No auto-switch inside Table.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

interface AuditRow {
  id: string;
  actor: string;
  action: string;
  resource: string;
  ts: string;
}

const auditRows: AuditRow[] = [
  {
    id: '1',
    actor: 'operator@iskra',
    action: 'FORCE_SYNC',
    resource: 'leaf-07.msk',
    ts: '2026-06-18T10:12:00Z',
  },
  {
    id: '2',
    actor: 'admin@iskra',
    action: 'POLICY_UPDATE',
    resource: 'role:operator',
    ts: '2026-06-18T09:44:00Z',
  },
  {
    id: '3',
    actor: 'system',
    action: 'DRIFT_DETECTED',
    resource: 'spine-01.msk',
    ts: '2026-06-18T08:01:00Z',
  },
];

interface PermissionRow {
  role: string;
  read: boolean;
  write: boolean;
  admin: boolean;
  audit: boolean;
}

const permissions: PermissionRow[] = [
  { role: 'viewer', read: true, write: false, admin: false, audit: false },
  { role: 'operator', read: true, write: true, admin: false, audit: true },
  { role: 'admin', read: true, write: true, admin: true, audit: true },
];

interface SelectRow {
  id: string;
  name: string;
  status: string;
}

const selectRows: SelectRow[] = [
  { id: 'd1', name: 'leaf-07.msk', status: 'sync' },
  { id: 'd2', name: 'spine-01.msk', status: 'drift' },
];

function useAuditColumns() {
  const t = useStoryT();
  return useMemo<TableColumn<AuditRow>[]>(
    () => [
      { key: 'ts', header: t('demo.labels.timeUtc'), sortable: true },
      { key: 'actor', header: t('demo.labels.actor'), sortable: true },
      { key: 'action', header: t('demo.labels.action') },
      { key: 'resource', header: t('demo.labels.resource') },
      { key: 'id', header: t('demo.labels.eventId') },
    ],
    [t],
  );
}

function usePermissionColumns() {
  const t = useStoryT();
  return useMemo<TableColumn<PermissionRow>[]>(
    () => [
      { key: 'role', header: t('demo.labels.role') },
      { key: 'read', header: 'Read', render: (r) => (r.read ? '✓' : '—') },
      { key: 'write', header: 'Write', render: (r) => (r.write ? '✓' : '—') },
      { key: 'admin', header: 'Admin', render: (r) => (r.admin ? '✓' : '—') },
      { key: 'audit', header: 'Audit', render: (r) => (r.audit ? '✓' : '—') },
    ],
    [t],
  );
}

export const HorizontalScroll: Story = {
  parameters: {
    viewport: { defaultViewport: 'compact375' },
  },
  render: () => {
    const auditColumns = useAuditColumns();
    return (
      <div style={{ maxWidth: 360 }}>
        <Table columns={auditColumns} data={auditRows} getRowId={(r) => r.id} />
      </div>
    );
  },
};

export const EntityCards: Story = {
  parameters: {
    viewport: { defaultViewport: 'compact375' },
  },
  render: () => {
    const t = useStoryT();
    return (
      <DataList
        items={auditRows}
        getItemKey={(r) => r.id}
        aria-label={t('demo.labels.auditLog')}
        renderItem={(r) => (
          <Card padding="s">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg3)' }}>
              {r.ts}
            </div>
            <div style={{ marginTop: 4, fontWeight: 500 }}>{r.action}</div>
            <div style={{ marginTop: 4, fontSize: 12, color: 'var(--fg2)' }}>{r.resource}</div>
            <div style={{ marginTop: 4, fontSize: 11, fontFamily: 'var(--font-mono)' }}>
              {r.actor}
            </div>
          </Card>
        )}
      />
    );
  },
};

export const PermissionMatrix: Story = {
  render: () => {
    const permColumns = usePermissionColumns();
    return <Table columns={permColumns} data={permissions} getRowId={(r) => r.role} />;
  },
};

export const BulkSelectTable: Story = {
  render: () => {
    const t = useStoryT();
    return (
      <Table
        columns={[
          { key: 'name', header: t('demo.labels.device') },
          {
            key: 'status',
            header: t('demo.labels.status'),
            render: (r) => (
              <Badge variant={r.status === 'drift' ? 'warning' : 'success'}>{r.status}</Badge>
            ),
          },
        ]}
        data={selectRows}
        getRowId={(r) => r.id}
        selectedRowId="d2"
      />
    );
  },
};
