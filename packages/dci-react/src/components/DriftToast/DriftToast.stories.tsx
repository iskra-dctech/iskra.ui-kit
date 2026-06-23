import type { Meta, StoryObj } from '@storybook/react-vite'
import { useIskraT } from '@iskra-ui/react'
import { DriftToast } from './DriftToast.js'

const meta: Meta<typeof DriftToast> = {
  title: 'Domain/DriftToast',
  component: DriftToast,
}
export default meta
type Story = StoryObj<typeof DriftToast>

export const Drift: Story = {
  render: () => {
    const t = useIskraT()
    return (
      <DriftToast
        variant="drift"
        title={t('demo.driftToast.driftDetected')}
        description={t('demo.driftToast.driftDescription')}
        onClose={() => {}}
      />
    )
  },
}

export const Stack: Story = {
  render: () => {
    const t = useIskraT()
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, width: 420 }}>
        <DriftToast
          variant="drift"
          title={t('demo.driftToast.driftDetected')}
          description={t('demo.driftToast.driftDescription')}
        />
        <DriftToast
          variant="ok"
          title={t('demo.driftToast.synced')}
          description={t('demo.driftToast.syncedDescription')}
        />
        <DriftToast
          variant="error"
          title={t('demo.driftToast.connectionLost')}
          description={t('demo.driftToast.connectionRetry')}
        />
        <DriftToast
          variant="info"
          title={t('demo.driftToast.firmwareUpdate')}
          description={t('demo.driftToast.firmwareDescription')}
        />
      </div>
    )
  },
}
