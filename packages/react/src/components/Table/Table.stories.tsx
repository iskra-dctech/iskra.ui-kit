import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table, type TableColumn } from './Table.js';
import { Badge } from '../Badge/Badge.js';
import { EmptyState } from '../EmptyState/EmptyState.js';

interface Device {
  id: string;
  host: string;
  ip: string;
  status: 'ok' | 'drift' | 'off';
}

const columns: TableColumn<Device>[] = [
  { key: 'host', header: 'Хост' },
  { key: 'ip', header: 'IP', align: 'left' },
  {
    key: 'status',
    header: 'Статус',
    render: (r) => (
      <Badge
        variant={r.status === 'ok' ? 'success' : r.status === 'drift' ? 'warning' : 'neutral'}
        dot
      >
        {r.status}
      </Badge>
    ),
  },
];

const data: Device[] = [
  { id: '1', host: 'leaf-07.msk', ip: '10.0.2.7', status: 'ok' },
  { id: '2', host: 'leaf-08.msk', ip: '10.0.2.8', status: 'drift' },
  { id: '3', host: 'spine-01.msk', ip: '10.0.1.1', status: 'off' },
];

const meta = {
  title: 'Patterns/Table',
  component: Table<Device>,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Table<Device>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: { columns, data, getRowId: (r) => r.id, caption: 'Устройства' },
};
export const Loading: Story = { args: { columns, data: [], loading: true } };
export const Empty: Story = {
  args: { columns, data: [], empty: <EmptyState title="Нет устройств" /> },
};
