import type { Meta, StoryObj } from '@storybook/react-vite';
import { useStoryT } from '../../storybook/useStoryT.js';
import { TextField } from './TextField.js';
import { Icon } from '../Icon/Icon.js';

const meta = {
  title: 'Primitives/TextField',
  component: TextField,
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const t = useStoryT();
    return <TextField label={t('demo.labels.host')} placeholder="leaf-07.msk" />;
  },
};

export const WithIconAndClear: Story = {
  render: () => <TextField iconBefore={<Icon name="search" />} clearable defaultValue="leaf-07" />,
};

export const Hint: Story = {
  render: () => {
    const t = useStoryT();
    return <TextField label={t('demo.labels.host')} hint={t('demo.descriptions.hostHint')} />;
  },
};

export const Error: Story = {
  render: () => {
    const t = useStoryT();
    return <TextField label={t('demo.labels.host')} error={t('demo.descriptions.hostError')} />;
  },
};

export const Disabled: Story = {
  render: () => <TextField label="IP" disabled defaultValue="10.0.2.7" />,
};
