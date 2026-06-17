import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup } from './Radio.js';

const meta = {
  title: 'Primitives/RadioGroup',
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: 'root', label: 'root', description: 'Полный доступ' },
  { value: 'admin', label: 'admin' },
  { value: 'operator', label: 'operator' },
  { value: 'viewer', label: 'viewer', disabled: true },
];

export const Vertical: Story = { args: { options, defaultValue: 'admin' } };
export const Horizontal: Story = {
  args: { options, orientation: 'horizontal', defaultValue: 'root' },
};
