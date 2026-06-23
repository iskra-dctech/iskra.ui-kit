import type { Meta, StoryObj } from '@storybook/react-vite'
import { useStoryT } from '../../storybook/useStoryT.js'
import { Avatar } from './Avatar.js'

const meta = {
  title: 'Primitives/Avatar',
  component: Avatar,
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Initials: Story = {
  render: () => {
    const t = useStoryT()
    return <Avatar name={t('demo.labels.sampleUser2')} size="md" />
  },
}

export const WithStatus: Story = {
  render: () => {
    const t = useStoryT()
    return <Avatar name={t('demo.labels.sampleUser2')} status="online" statusDisplay="ring" />
  },
}

export const WithImage: Story = {
  render: () => {
    const t = useStoryT()
    return (
      <Avatar
        name={t('demo.labels.sampleUser1')}
        src="https://i.pravatar.cc/64?u=iskra-ad"
        status="online"
      />
    )
  },
}

export const ImageFallback: Story = {
  render: () => {
    const t = useStoryT()
    return (
      <Avatar
        name={t('demo.labels.sampleUser2')}
        src="https://invalid.example/avatar.png"
        status="warn"
      />
    )
  },
}

export const Sizes: Story = {
  render: () => {
    const t = useStoryT()
    const name = t('demo.labels.sampleUser1')
    return (
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Avatar name={name} size="sm" />
        <Avatar name={name} size="md" />
        <Avatar name={name} size="lg" status="warn" />
      </div>
    )
  },
}
