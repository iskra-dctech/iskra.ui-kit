import type { Meta, StoryObj } from '@storybook/react-vite'
import { useStoryT } from '../../storybook/useStoryT.js'
import { Card } from './Card.js'
import { Button } from '../Button/Button.js'

const meta = {
  title: 'Primitives/Card',
  component: Card,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Structured: Story = {
  render: () => {
    const t = useStoryT()
    return (
      <Card padding="none" style={{ maxWidth: 360 }}>
        <Card.Header>leaf-07.msk</Card.Header>
        <Card.Body>{t('demo.card.syncState')}</Card.Body>
        <Card.Footer>
          <Button size="s" variant="outline">
            {t('demo.card.details')}
          </Button>
        </Card.Footer>
      </Card>
    )
  },
}

export const Interactive: Story = {
  render: () => {
    const t = useStoryT()
    return (
      <Card interactive onClick={() => undefined}>
        {t('demo.card.clickable')}
      </Card>
    )
  },
}

export const Selected: Story = {
  render: () => {
    const t = useStoryT()
    return <Card selected>{t('demo.card.selected')}</Card>
  },
}
