import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useStoryT } from '../../storybook/useStoryT.js';
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
    const t = useStoryT();
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 24, background: 'var(--bg)', minHeight: '100vh' }}>
        <Button onClick={() => setOpen(true)}>{t('demo.labels.createIncident')}</Button>
        <Sheet
          open={open}
          onOpenChange={setOpen}
          title={t('demo.titles.manualIncident')}
          description={t('demo.descriptions.manualIncident')}
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                {t('common.cancel')}
              </Button>
              <Button onClick={() => setOpen(false)}>{t('demo.labels.create')}</Button>
            </>
          }
        >
          {t('demo.descriptions.manualIncidentBody')}
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
    const t = useStoryT();
    const [open, setOpen] = useState(true);
    return (
      <Sheet open={open} onOpenChange={setOpen} title={t('demo.titles.filters')} snap="half">
        {t('demo.descriptions.sheetHalf')}
      </Sheet>
    );
  },
};
