import { useMemo, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useStoryT } from '../../storybook/useStoryT.js'
import { Table, type TableColumn, type TableSort } from './Table.js'
import { Badge } from '../Badge/Badge.js'
import { EmptyState } from '../EmptyState/EmptyState.js'
import { TextField } from '../TextField/TextField.js'

interface Device {
  id: string
  host: string
  ip: string
  status: 'ok' | 'drift' | 'off'
}

const data: Device[] = [
  { id: '1', host: 'leaf-07.msk', ip: '10.0.2.7', status: 'ok' },
  { id: '2', host: 'leaf-08.msk', ip: '10.0.2.8', status: 'drift' },
  { id: '3', host: 'spine-01.msk', ip: '10.0.1.1', status: 'off' },
]

function useDeviceColumns() {
  const t = useStoryT()
  return useMemo<TableColumn<Device>[]>(
    () => [
      { key: 'host', header: t('demo.labels.host'), sortable: true },
      {
        key: 'ip',
        header: 'IP',
        align: 'left',
        filter: (
          <TextField size="s" placeholder={t('demo.labels.ipFilter')} aria-label={t('demo.labels.ipFilter')} />
        ),
      },
      {
        key: 'status',
        header: t('demo.labels.status'),
        render: (r) => (
          <Badge
            variant={r.status === 'ok' ? 'success' : r.status === 'drift' ? 'warning' : 'neutral'}
            dot
          >
            {r.status}
          </Badge>
        ),
      },
    ],
    [t],
  )
}

const meta = {
  title: 'Patterns/Table',
  component: Table<Device>,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Table<Device>>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => {
    const t = useStoryT()
    const columns = useDeviceColumns()
    return <Table columns={columns} data={data} getRowId={(r) => r.id} caption={t('demo.labels.devices')} />
  },
}

export const Loading: Story = {
  render: () => {
    const columns = useDeviceColumns()
    return <Table columns={columns} data={[]} loading />
  },
}

export const Empty: Story = {
  render: () => {
    const t = useStoryT()
    const columns = useDeviceColumns()
    return <Table columns={columns} data={[]} empty={<EmptyState title={t('demo.titles.noDevices')} />} />
  },
}

export const Sortable: Story = {
  render: () => {
    const columns = useDeviceColumns()
    const [sort, setSort] = useState<TableSort | null>(null)
    const sorted = [...data].sort((a, b) => {
      if (!sort) return 0
      const cmp = a.host.localeCompare(b.host)
      return sort.direction === 'asc' ? cmp : -cmp
    })
    return (
      <Table
        columns={columns}
        data={sorted}
        getRowId={(r) => r.id}
        sort={sort}
        onSortChange={setSort}
      />
    )
  },
}
