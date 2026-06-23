import type { Meta, StoryObj } from '@storybook/react-vite'
import { useIskraT } from '@iskra-ui/react'
import { DeviceCard } from './DeviceCard.js'

const meta: Meta<typeof DeviceCard> = {
  title: 'Domain/DeviceCard',
  component: DeviceCard,
}
export default meta
type Story = StoryObj<typeof DeviceCard>

export const InSync: Story = {
  render: () => {
    const t = useIskraT()
    return (
      <DeviceCard
        name="spine-01.msk"
        ip="10.0.1.1"
        status="sync"
        metricLabel={t('demo.deviceCard.traffic24h')}
        metricValue={t('demo.deviceCard.trafficValue')}
        sparkline={[0.4, 0.55, 0.35, 0.7, 0.6, 0.45, 0.75, 0.58]}
        tags={['spine', 'prod']}
      />
    )
  },
}

export const Drift: Story = {
  render: () => {
    const t = useIskraT()
    return (
      <DeviceCard
        name="leaf-07.msk"
        ip="10.0.2.7"
        status="drift"
        metricLabel={t('demo.deviceCard.cpu24h')}
        metricValue="88%"
        metricAlert
        sparkline={[0.5, 0.85, 0.9, 0.88, 0.6, 0.4, 0.55, 0.42]}
        tags={['leaf', 'drift']}
        onSelect={() => {}}
      />
    )
  },
}
