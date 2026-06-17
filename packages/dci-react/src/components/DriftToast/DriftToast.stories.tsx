import type { Meta, StoryObj } from '@storybook/react';
import { DriftToast } from './DriftToast.js';

const meta: Meta<typeof DriftToast> = {
  title: 'Domain/DriftToast',
  component: DriftToast,
};
export default meta;
type Story = StoryObj<typeof DriftToast>;

export const Drift: Story = {
  args: {
    variant: 'drift',
    title: 'Drift обнаружен',
    description: 'leaf-07.msk расходится с Desired State',
    onClose: () => {},
  },
};

export const Stack: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 9, width: 420 }}>
      <DriftToast
        variant="drift"
        title="Drift обнаружен"
        description="leaf-07.msk расходится с Desired State"
      />
      <DriftToast variant="ok" title="Синхронизировано" description="spine-01.msk · 142 ms" />
      <DriftToast
        variant="error"
        title="Потеря связи"
        description="Брокер драйверов недоступен. Retry через 3s"
      />
      <DriftToast
        variant="info"
        title="Обновление прошивки доступно"
        description="leaf-09.spb · v2.4.1 → v2.5.0"
      />
    </div>
  ),
};
