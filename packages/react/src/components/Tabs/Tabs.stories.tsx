import { useMemo } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useStoryT } from '../../storybook/useStoryT.js'
import { Tabs } from './Tabs.js'

const meta = {
  title: 'Patterns/Tabs',
  component: Tabs,
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const t = useStoryT()
    const items = useMemo(
      () => [
        { value: 'overview', label: t('demo.tabs.overview'), content: t('demo.tabs.overviewContent') },
        { value: 'config', label: t('demo.tabs.config'), content: t('demo.tabs.configContent') },
        { value: 'history', label: t('demo.tabs.history'), content: t('demo.tabs.historyContent') },
        { value: 'raw', label: t('demo.tabs.raw'), content: t('demo.tabs.rawContent'), disabled: true },
      ],
      [t],
    )
    return <Tabs items={items} aria-label={t('demo.labels.deviceSections')} />
  },
}
