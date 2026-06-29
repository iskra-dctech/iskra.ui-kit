import type { Meta, StoryObj } from '@storybook/react-vite';
import { useStoryT } from '../../storybook/useStoryT.js';
import { Checkbox } from './Checkbox.js';

const meta = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const t = useStoryT();
    return <Checkbox label={t('demo.form.forceSync')} />;
  },
};

export const Checked: Story = {
  render: () => {
    const t = useStoryT();
    return <Checkbox label={t('demo.form.forceSync')} defaultChecked />;
  },
};

export const Indeterminate: Story = {
  render: () => {
    const t = useStoryT();
    return <Checkbox label={t('demo.form.forceSync')} indeterminate />;
  },
};

export const WithDescription: Story = {
  render: () => {
    const t = useStoryT();
    return (
      <Checkbox
        label={t('demo.form.forceSync')}
        description={t('demo.form.forceSyncDescription')}
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const t = useStoryT();
    return <Checkbox label={t('demo.form.forceSync')} disabled defaultChecked />;
  },
};
