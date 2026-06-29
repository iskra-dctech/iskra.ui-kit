import type { Meta, StoryObj } from '@storybook/react-vite';
import { useStoryT } from '../../storybook/useStoryT.js';
import { SearchField } from './SearchField.js';

const meta = {
  title: 'Primitives/SearchField',
  component: SearchField,
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const t = useStoryT();
    return (
      <SearchField placeholder={t('demo.labels.searchAllSpaces')} shortcut="⌘K" enableShortcut />
    );
  },
};

export const Inline: Story = {
  render: () => {
    const t = useStoryT();
    return <SearchField variant="inline" placeholder={t('common.search')} />;
  },
};

export const Small: Story = {
  render: () => {
    const t = useStoryT();
    return <SearchField size="s" placeholder={t('common.search')} />;
  },
};
