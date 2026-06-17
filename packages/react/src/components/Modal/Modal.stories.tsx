import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal } from './Modal.js';
import { Button } from '../Button/Button.js';

const meta = {
  title: 'Patterns/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Confirm: Story = {
  args: { open: false, onClose: () => {} },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Удалить устройство</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Удалить leaf-07.msk?"
          description="Действие необратимо. Устройство будет снято с мониторинга."
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Отмена
              </Button>
              <Button variant="destructive" onClick={() => setOpen(false)}>
                Удалить
              </Button>
            </>
          }
        >
          Все исторические метрики устройства будут удалены через 30 дней.
        </Modal>
      </>
    );
  },
};
