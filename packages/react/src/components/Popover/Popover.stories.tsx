import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useStoryT } from '../../storybook/useStoryT.js'
import { Popover } from './Popover.js'
import { IconButton } from '../IconButton/IconButton.js'
import { Icon } from '../Icon/Icon.js'

function NotificationPanel() {
  const t = useStoryT()
  return (
    <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontWeight: 600, fontSize: 12, color: 'var(--fg2)' }}>
        {t('demo.labels.notificationsHeader')}
      </div>
      <div style={{ fontSize: 12 }}>
        <span style={{ color: 'var(--status-err)' }}>{t('demo.labels.errorTag')}</span>{' '}
        {t('demo.labels.deliveryError')}
      </div>
      <div style={{ fontSize: 12, color: 'var(--fg2)' }}>{t('demo.labels.draftAuto')}</div>
    </div>
  )
}

function BellTrigger() {
  const t = useStoryT()
  return (
    <IconButton icon={<Icon name="bell" size={16} />} aria-label={t('a11y.notifications')} variant="ghost" />
  )
}

const meta = {
  title: 'Patterns/Popover',
  component: Popover,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Popover trigger={<BellTrigger />} children={<NotificationPanel />} />,
}

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <Popover
        trigger={<BellTrigger />}
        open={open}
        onOpenChange={setOpen}
        children={<NotificationPanel />}
      />
    )
  },
}

export const Notifications: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <Popover
        trigger={<BellTrigger />}
        open={open}
        onOpenChange={setOpen}
        children={<NotificationPanel />}
      />
    )
  },
}
