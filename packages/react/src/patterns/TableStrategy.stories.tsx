import type { Meta, StoryObj } from '@storybook/react-vite';
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
          'Стратегии отображения плотных данных. Table остаётся таблицей; compact entity view — отдельный DataList. Без auto-switch внутри Table.',
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

const auditColumns: TableColumn<AuditRow>[] = [
  { key: 'ts', header: 'Время (UTC)', sortable: true },
  { key: 'actor', header: 'Актор', sortable: true },
  { key: 'action', header: 'Действие' },
  { key: 'resource', header: 'Ресурс' },
  { key: 'id', header: 'ID события' },
];

export const HorizontalScroll: Story = {
  parameters: {
    viewport: { defaultViewport: 'compact375' },
  },
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <Table columns={auditColumns} data={auditRows} getRowId={(r) => r.id} />
    </div>
  ),
};

export const EntityCards: Story = {
  parameters: {
    viewport: { defaultViewport: 'compact375' },
  },
  render: () => (
    <DataList
      items={auditRows}
      getItemKey={(r) => r.id}
      aria-label="Журнал аудита"
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
  ),
};

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

const permColumns: TableColumn<PermissionRow>[] = [
  { key: 'role', header: 'Роль' },
  { key: 'read', header: 'Read', render: (r) => (r.read ? '✓' : '—') },
  { key: 'write', header: 'Write', render: (r) => (r.write ? '✓' : '—') },
  { key: 'admin', header: 'Admin', render: (r) => (r.admin ? '✓' : '—') },
  { key: 'audit', header: 'Audit', render: (r) => (r.audit ? '✓' : '—') },
];

export const PermissionMatrix: Story = {
  render: () => <Table columns={permColumns} data={permissions} getRowId={(r) => r.role} />,
};

interface SelectRow {
  id: string;
  name: string;
  status: string;
}

const selectRows: SelectRow[] = [
  { id: 'd1', name: 'leaf-07.msk', status: 'sync' },
  { id: 'd2', name: 'spine-01.msk', status: 'drift' },
];

export const BulkSelectTable: Story = {
  render: () => (
    <Table
      columns={[
        { key: 'name', header: 'Устройство' },
        {
          key: 'status',
          header: 'Статус',
          render: (r) => (
            <Badge variant={r.status === 'drift' ? 'warning' : 'success'}>{r.status}</Badge>
          ),
        },
      ]}
      data={selectRows}
      getRowId={(r) => r.id}
      selectedRowId="d2"
    />
  ),
};
