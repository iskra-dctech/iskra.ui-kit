import { useMemo, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { getNotifierNav } from '@iskra-ui/core'
import { useIskraLocale } from '../../i18n/useIskraLocale.js'
import { useStoryT } from '../../storybook/useStoryT.js'
import { Drawer } from './Drawer.js'
import { Button } from '../Button/Button.js'
import { Sidebar } from '../Sidebar/Sidebar.js'

const meta = {
  title: 'Patterns/Drawer',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const WithSidebar: Story = {
  render: () => {
    const t = useStoryT()
    const { locale } = useIskraLocale()
    const groups = useMemo(() => getNotifierNav(locale), [locale])
    const [open, setOpen] = useState(false)
    return (
      <div style={{ padding: 24, background: 'var(--bg)', minHeight: '100vh' }}>
        <Button onClick={() => setOpen(true)}>{t('demo.labels.openNavigation')}</Button>
        <Drawer open={open} onOpenChange={setOpen} aria-label={t('demo.labels.appNavigation')}>
          <Sidebar
            groups={groups}
            brand={<span className="isb-wmark">{t('demo.labels.platform')}</span>}
            activeItem="incidents"
            onNavigate={() => setOpen(false)}
          />
        </Drawer>
      </div>
    )
  },
}
