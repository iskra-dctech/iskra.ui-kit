import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table, type TableColumn, type TableSort } from './Table.js';
import { Badge } from '../Badge/Badge.js';
import { EmptyState } from '../EmptyState/EmptyState.js';
import { TextField } from '../TextField/TextField.js';

interface Device {
  id: string;
  host: string;
  ip: string;
  status: 'ok' | 'drift' | 'off';
}

const columns: TableColumn<Device>[] = [
  { key: 'host', header: 'Хост', sortable: true },
  {
    key: 'ip',
    header: 'IP',
    align: 'left',
    filter: <TextField size="s" placeholder="Фильтр IP" aria-label="Фильтр IP" />,
  },
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

export const Sortable: Story = {
  args: { columns, data, getRowId: (r) => r.id },
  render: (args) => {
    const [sort, setSort] = useState<TableSort | null>(null);
    const sorted = [...args.data].sort((a, b) => {
      if (!sort) return 0;
      const cmp = a.host.localeCompare(b.host);
      return sort.direction === 'asc' ? cmp : -cmp;
    });
    return <Table {...args} data={sorted} sort={sort} onSortChange={setSort} />;
  },
};
