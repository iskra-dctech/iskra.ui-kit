import { createElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useStoryT } from '../../storybook/useStoryT.js';
import { FormField, type FormFieldProps } from './FormField.js';

const meta = {
  title: 'Patterns/FormField',
  component: FormField,
  args: {
    children: createElement('input', {
      id: 'story-field',
      'aria-invalid': false,
    }) as FormFieldProps['children'],
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithNativeInput: Story = {
  render: () => {
    const t = useStoryT();
    return (
      <FormField label={t('demo.form.hostname')} required hint={t('demo.descriptions.hostHint')}>
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
    );
  },
};

export const Error: Story = {
  render: () => {
    const t = useStoryT();
    return (
      <FormField label={t('demo.form.hostname')} required error={t('demo.form.requiredField')}>
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
    );
  },
};
