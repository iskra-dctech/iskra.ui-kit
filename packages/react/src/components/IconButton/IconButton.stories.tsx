import type { Meta, StoryObj } from '@storybook/react-vite';
import { useStoryT } from '../../storybook/useStoryT.js';
import { IconButton } from './IconButton.js';
import { Icon } from '../Icon/Icon.js';

const meta = {
  title: 'Primitives/IconButton',
  component: IconButton,
  args: { icon: <Icon name="refresh" />, variant: 'secondary', 'aria-label': 'Action' },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const t = useStoryT();
    return <IconButton {...args} aria-label={t('demo.labels.refresh')} />;
  },
};

export const Sizes: Story = {
  render: (args) => {
    const t = useStoryT();
    return (
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <IconButton {...args} size="s" aria-label={t('demo.labels.refresh')} />
        <IconButton {...args} size="m" aria-label={t('demo.labels.refresh')} />
        <IconButton {...args} size="l" aria-label={t('demo.labels.refresh')} />
      </div>
    );
  },
};
