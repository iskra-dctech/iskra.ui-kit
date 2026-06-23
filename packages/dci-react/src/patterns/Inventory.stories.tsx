import type { Meta, StoryObj } from '@storybook/react-vite'
import { DataList, useIskraT } from '@iskra-ui/react'
import { DeviceCard } from '../components/DeviceCard/DeviceCard.js'

const meta = {
  title: 'Patterns/Inventory/DeviceCards',
  parameters: {
    layout: 'padded',
    viewport: { defaultViewport: 'compact375' },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const devices = [
  { id: '1', name: 'leaf-07.msk', ip: '10.0.2.7', status: 'sync' as const, cpu: '42%' },
  { id: '2', name: 'spine-01.msk', ip: '10.0.2.1', status: 'drift' as const, cpu: '88%' },
]

export const CompactDeviceList: Story = {
  render: () => {
    const t = useIskraT()
    return (
      <DataList
        items={devices}
        getItemKey={(d) => d.id}
        aria-label={t('demo.labels.deviceInventory')}
        renderItem={(d) => (
          <DeviceCard
            name={d.name}
            ip={d.ip}
            status={d.status}
            metricLabel={t('demo.deviceCard.cpu24h')}
            metricValue={d.cpu}
            metricAlert={d.status === 'drift'}
            sparkline={[0.3, 0.5, 0.7, 0.88]}
            tags={['msk']}
          />
        )}
      />
    )
  },
}
