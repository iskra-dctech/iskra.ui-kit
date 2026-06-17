import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card.js';
import { Button } from '../Button/Button.js';

const meta = {
  title: 'Primitives/Card',
  component: Card,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Structured: Story = {
  render: () => (
    <Card padding="none" style={{ maxWidth: 360 }}>
      <Card.Header>leaf-07.msk</Card.Header>
      <Card.Body>Состояние: в синхронизации. Последний дрейф 4 минуты назад.</Card.Body>
      <Card.Footer>
        <Button size="s" variant="outline">
          Детали
        </Button>
      </Card.Footer>
    </Card>
  ),
};

export const Interactive: Story = {
  args: { interactive: true, children: 'Кликабельная карточка', onClick: () => {} },
};
export const Selected: Story = { args: { selected: true, children: 'Выбранная карточка' } };
