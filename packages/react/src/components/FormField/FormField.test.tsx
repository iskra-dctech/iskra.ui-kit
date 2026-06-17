import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormField } from './FormField.js';

describe('FormField', () => {
  it('wires label, aria-invalid and aria-describedby to the control', () => {
    render(
      <FormField label="Хост" error="Ошибка" required>
        <input />
      </FormField>,
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveAccessibleName('Хост');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toHaveAccessibleDescription('Ошибка');
  });
});
