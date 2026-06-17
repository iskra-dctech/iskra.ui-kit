import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch.js';

const meta = {
  title: 'Primitives/Switch',
  component: Switch,
  args: { label: 'Live-Pulse' },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const On: Story = { args: { defaultChecked: true } };
export const WithDescription: Story = {
  args: { description: 'Анимация дыхания на странице устройства' },
};
export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };
