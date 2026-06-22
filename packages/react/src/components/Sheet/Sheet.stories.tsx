import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sheet } from './Sheet.js';
import { Button } from '../Button/Button.js';

const meta = {
  title: 'Patterns/Sheet',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Form: Story = {
  parameters: {
    viewport: { defaultViewport: 'compact375' },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 24, background: 'var(--bg)', minHeight: '100vh' }}>
        <Button onClick={() => setOpen(true)}>Создать инцидент</Button>
        <Sheet
          open={open}
          onOpenChange={setOpen}
          title="Ручной инцидент"
          description="Создание инцидента вне автоматического конвейера."
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Отмена
              </Button>
              <Button onClick={() => setOpen(false)}>Создать</Button>
            </>
          }
        >
          Укажите услугу, критичность и описание проблемы.
        </Sheet>
      </div>
    );
  },
};

export const HalfSnap: Story = {
  parameters: {
    viewport: { defaultViewport: 'compact375' },
  },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <Sheet open={open} onOpenChange={setOpen} title="Фильтры" snap="half">
        Содержимое панели на половину экрана.
      </Sheet>
    );
  },
};
