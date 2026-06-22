import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataList } from '../components/DataList/DataList.js';
import { Table, type TableColumn } from '../components/Table/Table.js';
import { Badge } from '../components/Badge/Badge.js';
import { Card } from '../components/Card/Card.js';

const meta = {
  title: 'Patterns/Inventory',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Inventory reference: desktop Table vs compact DataList. В продукте для карточек устройств используйте DeviceCard из @iskra-ui/dci-react.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

interface Device {
  id: string;
  name: string;
  ip: string;
  status: 'sync' | 'drift' | 'error' | 'offline';
  cpu: string;
}

const devices: Device[] = [
  { id: '1', name: 'leaf-07.msk', ip: '10.0.2.7', status: 'sync', cpu: '42%' },
  { id: '2', name: 'spine-01.msk', ip: '10.0.2.1', status: 'drift', cpu: '88%' },
  { id: '3', name: 'core-gw.msk', ip: '10.0.2.254', status: 'offline', cpu: '—' },
];

const columns: TableColumn<Device>[] = [
  { key: 'name', header: 'Устройство', sortable: true },
  { key: 'ip', header: 'IP' },
  {
    key: 'status',
    header: 'Статус',
    render: (r) => (
      <Badge
        variant={r.status === 'drift' ? 'warning' : r.status === 'offline' ? 'neutral' : 'success'}
      >
        {r.status}
      </Badge>
    ),
  },
  { key: 'cpu', header: 'CPU' },
];

export const Desktop: Story = {
  parameters: { viewport: { defaultViewport: 'desktop1280' } },
  render: () => (
    <Table columns={columns} data={devices} getRowId={(d) => d.id} caption="Инвентарь устройств" />
  ),
};

export const Compact: Story = {
  parameters: { viewport: { defaultViewport: 'compact375' } },
  render: () => (
    <DataList
      items={devices}
      getItemKey={(d) => d.id}
      aria-label="Инвентарь устройств"
      renderItem={(d) => (
        <Card padding="s">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
            <span style={{ fontWeight: 500 }}>{d.name}</span>
            <Badge
              variant={
                d.status === 'drift' ? 'warning' : d.status === 'offline' ? 'neutral' : 'success'
              }
            >
              {d.status}
            </Badge>
          </div>
          <div style={{ marginTop: 4, fontFamily: 'var(--font-mono)', fontSize: 12 }}>{d.ip}</div>
          <div style={{ marginTop: 4, fontSize: 12, color: 'var(--fg2)' }}>CPU · {d.cpu}</div>
        </Card>
      )}
    />
  ),
};
