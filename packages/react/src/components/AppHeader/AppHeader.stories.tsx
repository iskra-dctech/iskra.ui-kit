import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { AppHeader } from './AppHeader.js'
import { Avatar } from '../Avatar/Avatar.js'
import { Icon } from '../Icon/Icon.js'
import { IconButton } from '../IconButton/IconButton.js'
import { Popover } from '../Popover/Popover.js'
import { SearchField } from '../SearchField/SearchField.js'

const meta = {
  title: 'Patterns/AppHeader',
  component: AppHeader,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AppHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Composable: Story = {
  render: () => (
    <AppHeader
      leading={
        <AppHeader.Nav
          items={[
            { id: 'platform', label: 'Искра' },
            { id: 'space', label: 'Notifier', current: true },
          ]}
        />
      }
      trailing={
        <>
          <SearchField
            placeholder="Поиск…"
            shortcut="⌘K"
            enableShortcut
            style={{ width: 240 }}
          />
          <AppHeader.Actions>
            <Popover
              trigger={
                <IconButton
                  icon={<Icon name="bell" size={16} />}
                  aria-label="Уведомления"
                  variant="ghost"
                />
              }
            >
              <div style={{ padding: 12, fontSize: 12 }}>Нет новых уведомлений</div>
            </Popover>
            <IconButton
              icon={<Avatar name="Иванов Иван" size="sm" status="online" />}
              aria-label="Профиль пользователя"
              variant="ghost"
            />
          </AppHeader.Actions>
          <AppHeader.Text mono>ОПЕРАТОР</AppHeader.Text>
        </>
      }
    />
  ),
}

export const SlotApi: Story = {
  render: () => {
    const [notifOpen, setNotifOpen] = useState(false)
    return (
      <AppHeader>
        <AppHeader.Leading>
          <AppHeader.Indicator dot="ok" mono>
            SYNC OK
          </AppHeader.Indicator>
        </AppHeader.Leading>
        <AppHeader.Trailing>
          <SearchField placeholder="Глобальный поиск" variant="inline" style={{ width: 220 }} />
          <AppHeader.Actions>
            <Popover
              open={notifOpen}
              onOpenChange={setNotifOpen}
              trigger={
                <IconButton
                  icon={<Icon name="bell" size={16} />}
                  aria-label="Уведомления"
                  variant="ghost"
                />
              }
            >
              <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 260 }}>
                <div style={{ fontWeight: 600, fontSize: 12, color: 'var(--fg2)' }}>УВЕДОМЛЕНИЯ</div>
                <div style={{ fontSize: 12, color: 'var(--fg2)' }}>Нет новых уведомлений</div>
              </div>
            </Popover>
            <IconButton
              icon={<Avatar name="Петров Алексей" size="sm" status="online" />}
              aria-label="Профиль пользователя"
              variant="ghost"
            />
          </AppHeader.Actions>
        </AppHeader.Trailing>
      </AppHeader>
    )
  },
}
