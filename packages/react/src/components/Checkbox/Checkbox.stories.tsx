import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox.js';

const meta = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
  args: { label: 'Включить Force Sync' },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Indeterminate: Story = { args: { indeterminate: true } };
export const WithDescription: Story = {
  args: { description: 'Применить желаемое состояние ко всем устройствам' },
};
export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };
