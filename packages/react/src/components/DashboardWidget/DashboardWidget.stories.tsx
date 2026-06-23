import type { Meta, StoryObj } from '@storybook/react-vite'
import { useStoryT } from '../../storybook/useStoryT.js'
import { Chart } from '../Chart/Chart.js'
import { DashboardWidget } from './DashboardWidget.js'
import type { MetricSeries } from '@iskra-ui/core'

const series: MetricSeries = {
  id: 'cpu',
  label: 'CPU',
  unit: '%',
  points: Array.from({ length: 12 }, (_, i) => ({
    timestamp: Date.now() - (11 - i) * 3600000,
    value: 50 + Math.sin(i) * 20,
  })),
}

const meta: Meta<typeof DashboardWidget> = {
  title: 'Patterns/DashboardWidget',
  component: DashboardWidget,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof DashboardWidget>

export const Default: Story = {
  render: () => {
    const t = useStoryT()
    return (
      <div style={{ width: 320, height: 200 }}>
        <DashboardWidget
          title={t('demo.deviceCard.cpu24h')}
          onExpand={() => {}}
          onEdit={() => {}}
          onRemove={() => {}}
        >
          <Chart type="line" series={series} density="compact" />
        </DashboardWidget>
      </div>
    )
  },
}
