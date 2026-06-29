import type { Meta, StoryObj } from '@storybook/react-vite';
import { useStoryT } from '../../storybook/useStoryT.js';
import { EmptyState } from './EmptyState.js';
import { Icon } from '../Icon/Icon.js';
import { Button } from '../Button/Button.js';

const meta = {
  title: 'Patterns/EmptyState',
  component: EmptyState,
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoDevices: Story = {
  render: () => {
    const t = useStoryT();
    return (
      <EmptyState
        icon={<Icon name="server" size={32} />}
        title={t('demo.titles.noDevices')}
        description={t('demo.descriptions.noDevices')}
        action={<Button size="s">{t('demo.labels.addDevice')}</Button>}
      />
    );
  },
};

export const Platform404: Story = {
  parameters: { layout: 'fullscreen' },
  args: {
    variant: 'not-found',
    fullPage: true,
    onHome: () => undefined,
    onBack: () => undefined,
  },
};
