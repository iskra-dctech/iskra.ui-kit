import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea.js';

const meta = {
  title: 'Primitives/Textarea',
  component: Textarea,
  args: { label: 'Описание правила', placeholder: 'cron + desired state…' },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithCounter: Story = { args: { maxLength: 200, showCount: true, hint: 'Кратко' } };
export const Error: Story = { args: { error: 'Поле обязательно' } };
