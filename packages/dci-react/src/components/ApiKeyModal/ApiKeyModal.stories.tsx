import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@iskra-dci/react';
import { ApiKeyModal } from './ApiKeyModal.js';

const meta: Meta<typeof ApiKeyModal> = {
  title: 'Domain/ApiKeyModal',
  component: ApiKeyModal,
};
export default meta;
type Story = StoryObj<typeof ApiKeyModal>;

export const Interactive: Story = {
  args: { open: false, onClose: () => {}, onCreate: () => {} },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Создать API-ключ</Button>
        <ApiKeyModal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onCreate={(draft) => {
            console.log('create', draft);
            setOpen(false);
          }}
        />
      </>
    );
  },
};
