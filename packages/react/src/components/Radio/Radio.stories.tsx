import type { Meta, StoryObj } from '@storybook/react-vite'
import { useStoryT } from '../../storybook/useStoryT.js'
import { RadioGroup } from './Radio.js'

const meta = {
  title: 'Primitives/RadioGroup',
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

function useRoleOptions() {
  const t = useStoryT()
  return [
    { value: 'root', label: 'root', description: t('demo.labels.fullAccess') },
    { value: 'admin', label: 'admin' },
    { value: 'operator', label: 'operator' },
    { value: 'viewer', label: 'viewer', disabled: true },
  ]
}

export const Vertical: Story = {
  render: () => {
    const options = useRoleOptions()
    return <RadioGroup options={options} defaultValue="admin" />
  },
}

export const Horizontal: Story = {
  render: () => {
    const options = useRoleOptions()
    return <RadioGroup options={options} orientation="horizontal" defaultValue="root" />
  },
}
