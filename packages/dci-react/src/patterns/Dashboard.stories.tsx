import type { Meta, StoryObj } from '@storybook/react'
import { useIskraLocale } from '@iskra-ui/react'
import { DciDashboard } from '../components/DciDashboard/DciDashboard.js'
import { createMockDciMetricSource } from '../metrics/catalog.js'

const meta: Meta<typeof DciDashboard> = {
  title: 'DCI/Dashboard',
  component: DciDashboard,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof DciDashboard>

export const OperatorDashboard: Story = {
  render: () => {
    const { locale } = useIskraLocale()
    const metricSource = createMockDciMetricSource(locale)
    return (
      <div style={{ padding: 24, minHeight: '100vh', background: 'var(--bg, #0d1117)' }}>
        <DciDashboard dashboardId="fleet-overview" metricSource={metricSource} />
      </div>
    )
  },
}
