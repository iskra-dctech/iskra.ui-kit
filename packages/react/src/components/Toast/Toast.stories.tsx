import type { Meta, StoryObj } from '@storybook/react-vite'
import { useStoryT } from '../../storybook/useStoryT.js'
import { ToastProvider, useToast } from './Toast.js'
import { Button } from '../Button/Button.js'

const meta = {
  title: 'Patterns/Toast',
  component: ToastProvider,
} satisfies Meta<typeof ToastProvider>

export default meta
type Story = StoryObj<typeof meta>

function Demo() {
  const t = useStoryT()
  const { toast } = useToast()
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button
        onClick={() =>
          toast({
            variant: 'success',
            title: t('demo.toast.synced'),
            description: t('demo.toast.syncedDevices'),
          })
        }
      >
        Success
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toast({
            variant: 'error',
            title: t('demo.titles.error'),
            description: t('demo.toast.errorDevice'),
          })
        }
      >
        Error
      </Button>
    </div>
  )
}

export const Imperative: Story = {
  args: { children: null },
  render: () => (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  ),
}
