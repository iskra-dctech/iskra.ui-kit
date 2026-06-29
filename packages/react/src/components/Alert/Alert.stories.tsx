import type { Meta, StoryObj } from '@storybook/react-vite';
import { useStoryT } from '../../storybook/useStoryT.js';
import { Alert } from './Alert.js';

const meta = {
  title: 'Patterns/Alert',
  component: Alert,
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const t = useStoryT();
    return <Alert variant="warning" title={t('demo.descriptions.driftDetected')} />;
  },
};

export const Variants: Story = {
  render: () => {
    const t = useStoryT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>
        <Alert variant="info" title={t('demo.titles.info')}>
          {t('demo.descriptions.scheduledMaintenance')}
        </Alert>
        <Alert variant="success" title={t('demo.titles.done')}>
          {t('demo.descriptions.configApplied')}
        </Alert>
        <Alert variant="warning" title={t('demo.titles.drift')}>
          {t('demo.descriptions.driftDevices')}
        </Alert>
        <Alert variant="error" title={t('demo.titles.error')} closable>
          {t('demo.descriptions.connectionFailed')}
        </Alert>
      </div>
    );
  },
};
