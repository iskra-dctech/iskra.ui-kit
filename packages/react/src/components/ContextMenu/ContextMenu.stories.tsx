import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useStoryT } from '../../storybook/useStoryT.js'
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from './index.js'
import { Card } from '../Card/Card.js'
import { Button } from '../Button/Button.js'
import { Icon } from '../Icon/Icon.js'

const meta = {
  title: 'Primitives/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Context and action menu (WAI-ARIA Menu). Right-click or click the trigger. Compose: ContextMenu → Trigger → Content → Item / Separator.',
      },
    },
  },
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const t = useStoryT()
    return (
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <Card padding="m" style={{ width: 280, cursor: 'context-menu' }}>
            {t('demo.contextMenu.openHint')}
          </Card>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={() => undefined}>{t('demo.labels.copy')}</ContextMenuItem>
          <ContextMenuItem onSelect={() => undefined}>{t('demo.labels.paste')}</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onSelect={() => undefined}>{t('demo.labels.properties')}</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )
  },
}

export const WithIcons: Story = {
  render: () => {
    const t = useStoryT()
    return (
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <Button type="button" variant="outline">
            {t('demo.labels.actions')}
          </Button>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem icon={<Icon name="refresh" size={16} />} onSelect={() => undefined}>
            {t('demo.labels.refresh')}
          </ContextMenuItem>
          <ContextMenuItem icon={<Icon name="search" size={16} />} onSelect={() => undefined}>
            {t('demo.labels.find')}
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )
  },
}

export const DestructiveAndDisabled: Story = {
  render: () => {
    const t = useStoryT()
    return (
      <ContextMenu>
        <ContextMenuTrigger>
          <Button type="button">{t('demo.labels.menu')}</Button>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={() => undefined}>{t('demo.labels.edit')}</ContextMenuItem>
          <ContextMenuItem disabled onSelect={() => undefined}>
            {t('demo.labels.archiveDisabled')}
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem destructive onSelect={() => undefined}>
            {t('demo.labels.delete')}
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )
  },
}

export const TableRow: Story = {
  render: () => {
    const t = useStoryT()
    return (
      <div style={{ width: 480, border: '1px solid var(--line)', borderRadius: 'var(--radius)' }}>
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 80px',
                padding: '10px 12px',
                cursor: 'context-menu',
              }}
            >
              <span>INC-1042</span>
              <span>{t('demo.labels.critical')}</span>
              <span>{t('demo.labels.open')}</span>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onSelect={() => undefined}>
              {t('demo.contextMenu.openIncident')}
            </ContextMenuItem>
            <ContextMenuItem onSelect={() => undefined}>{t('demo.labels.assign')}</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem destructive onSelect={() => undefined}>
              {t('common.close')}
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    )
  },
}

export const Controlled: Story = {
  render: () => {
    const t = useStoryT()
    const [open, setOpen] = useState(false)
    return (
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Button type="button" variant="outline" onClick={() => setOpen(true)}>
          {t('demo.labels.openProgrammatically')}
        </Button>
        <ContextMenu open={open} onOpenChange={setOpen}>
          <ContextMenuTrigger>
            <Button type="button">{t('demo.labels.trigger')}</Button>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onSelect={() => setOpen(false)}>{t('common.close')}</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    )
  },
}

export const ClickOnly: Story = {
  render: () => {
    const t = useStoryT()
    return (
      <ContextMenu triggerOn="click">
        <ContextMenuTrigger asChild>
          <Button type="button">{t('demo.labels.clickOnly')}</Button>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={() => undefined}>{t('demo.labels.export')}</ContextMenuItem>
          <ContextMenuItem onSelect={() => undefined}>{t('demo.labels.import')}</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )
  },
}

export const ContextMenuOnly: Story = {
  render: () => {
    const t = useStoryT()
    return (
      <ContextMenu triggerOn="contextmenu">
        <ContextMenuTrigger asChild>
          <Card padding="m" style={{ width: 240 }}>
            {t('demo.labels.contextMenuOnlyShort')}
          </Card>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={() => undefined}>{t('demo.labels.copy')}</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )
  },
}
