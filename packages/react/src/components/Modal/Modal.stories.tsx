import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useStoryT } from '../../storybook/useStoryT.js';
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
    const t = useStoryT();
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>{t('demo.labels.deleteDevice')}</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title={t('demo.titles.deleteDevice')}
          description={t('demo.descriptions.deleteDevice')}
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                {t('common.cancel')}
              </Button>
              <Button variant="destructive" onClick={() => setOpen(false)}>
                {t('demo.labels.delete')}
              </Button>
            </>
          }
        >
          {t('demo.descriptions.deleteDeviceBody')}
        </Modal>
      </>
    );
  },
};
