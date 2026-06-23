import { useMemo, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, useIskraT } from '@iskra-ui/react'
import { ApiKeyModal } from './ApiKeyModal.js'

const meta: Meta<typeof ApiKeyModal> = {
  title: 'Domain/ApiKeyModal',
  component: ApiKeyModal,
}
export default meta
type Story = StoryObj<typeof ApiKeyModal>

export const Interactive: Story = {
  args: { open: false, onClose: () => {}, onCreate: () => {} },
  render: (args) => {
    const t = useIskraT()
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>{t('demo.labels.createApiKey')}</Button>
        <ApiKeyModal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onCreate={() => setOpen(false)}
        />
      </>
    )
  },
}
