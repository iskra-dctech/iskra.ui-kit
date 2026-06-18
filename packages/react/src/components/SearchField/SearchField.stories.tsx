import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchField } from './SearchField.js'

const meta = {
  title: 'Primitives/SearchField',
  component: SearchField,
  args: { placeholder: 'Поиск по всем пространствам…', shortcut: '⌘K', enableShortcut: true },
} satisfies Meta<typeof SearchField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Inline: Story = { args: { variant: 'inline' } }
export const Small: Story = { args: { size: 's' } }
