import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToastProvider, useToast } from './Toast.js';
import { Button } from '../Button/Button.js';

const meta = {
  title: 'Patterns/Toast',
  component: ToastProvider,
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo() {
  const { toast } = useToast();
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button
        onClick={() =>
          toast({ variant: 'success', title: 'Синхронизировано', description: '42 устройства' })
        }
      >
        Success
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toast({ variant: 'error', title: 'Ошибка', description: 'leaf-07 недоступен' })
        }
      >
        Error
      </Button>
    </div>
  );
}

export const Imperative: Story = {
  args: { children: null },
  render: () => (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  ),
};
