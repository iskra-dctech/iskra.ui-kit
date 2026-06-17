import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField.js';

const meta = {
  title: 'Patterns/FormField',
  component: FormField,
  args: { label: 'Имя хоста', required: true },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithNativeInput: Story = {
  args: { children: <input /> },
  render: (args) => (
    <FormField {...args} hint="FQDN устройства">
      <input
        className="ik-tf-input"
        style={{
          border: '1px solid var(--line)',
          padding: 8,
          borderRadius: 4,
          background: 'var(--bg)',
          color: 'var(--fg1)',
        }}
      />
    </FormField>
  ),
};

export const Error: Story = {
  args: { children: <input /> },
  render: (args) => (
    <FormField {...args} error="Обязательное поле">
      <input
        style={{
          border: '1px solid var(--status-err)',
          padding: 8,
          borderRadius: 4,
          background: 'var(--bg)',
          color: 'var(--fg1)',
        }}
      />
    </FormField>
  ),
};
