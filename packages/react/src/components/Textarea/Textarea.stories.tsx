import type { Meta, StoryObj } from '@storybook/react-vite'
import { useStoryT } from '../../storybook/useStoryT.js'
import { Textarea } from './Textarea.js'

const meta = {
  title: 'Primitives/Textarea',
  component: Textarea,
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const t = useStoryT()
    return <Textarea label={t('demo.labels.ruleDescription')} placeholder="cron + desired state…" />
  },
}

export const WithCounter: Story = {
  render: () => {
    const t = useStoryT()
    return <Textarea maxLength={200} showCount hint={t('demo.labels.briefly')} />
  },
}

export const Error: Story = {
  render: () => {
    const t = useStoryT()
    return <Textarea label={t('demo.labels.ruleDescription')} error={t('demo.descriptions.fieldRequired')} />
  },
}
