import { useMemo } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useIskraT } from '@iskra-ui/react'
import { FleetPulse } from './FleetPulse.js'

const meta: Meta<typeof FleetPulse> = {
  title: 'Domain/FleetPulse',
  component: FleetPulse,
}
export default meta
type Story = StoryObj<typeof FleetPulse>

export const WithIssues: Story = {
  render: () => {
    const t = useIskraT()
    const issues = useMemo(
      () => [
        {
          id: '1',
          name: 'border-01.spb',
          reason: t('demo.fleet.connectionLost'),
          severity: 'error' as const,
          actionLabel: 'Retry',
        },
        {
          id: '2',
          name: 'leaf-07.msk',
          reason: t('demo.fleet.driftBgp'),
          severity: 'drift' as const,
          actionLabel: 'Sync',
        },
        {
          id: '3',
          name: 'leaf-12.msk',
          reason: t('demo.fleet.driftMtu'),
          severity: 'drift' as const,
          actionLabel: 'Sync',
        },
      ],
      [t],
    )
    return <FleetPulse percent={81} defaultOpen issues={issues} />
  },
}

export const AllHealthy: Story = {
  args: { percent: 100, issues: [] },
}
