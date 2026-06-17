import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './TextField.js';
import { Icon } from '../Icon/Icon.js';

const meta = {
  title: 'Primitives/TextField',
  component: TextField,
  args: { label: 'Хост', placeholder: 'leaf-07.msk' },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithIconAndClear: Story = {
  args: { iconBefore: <Icon name="search" />, clearable: true, defaultValue: 'leaf-07' },
};
export const Hint: Story = { args: { hint: 'FQDN устройства в инвентаре' } };
export const Error: Story = { args: { error: 'Устройство не найдено' } };
export const Disabled: Story = { args: { disabled: true, defaultValue: '10.0.2.7' } };
