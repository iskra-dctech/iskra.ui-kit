import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert.js';

const meta = {
  title: 'Patterns/Alert',
  component: Alert,
  args: { variant: 'warning', title: 'Обнаружен дрейф конфигурации' },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>
      <Alert variant="info" title="Info">
        Плановое обслуживание в 02:00.
      </Alert>
      <Alert variant="success" title="Готово">
        Конфигурация применена на 42 устройства.
      </Alert>
      <Alert variant="warning" title="Дрейф">
        3 устройства разошлись с desired state.
      </Alert>
      <Alert variant="error" title="Ошибка" closable>
        Не удалось подключиться к leaf-07.
      </Alert>
    </div>
  ),
};
