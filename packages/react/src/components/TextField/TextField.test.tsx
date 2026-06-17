import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { TextField } from './TextField.js';

describe('TextField', () => {
  it('associates label with the input', () => {
    render(<TextField label="Хост" />);
    expect(screen.getByLabelText('Хост')).toBeInTheDocument();
  });

  it('sets aria-invalid and links the error message', () => {
    render(<TextField label="Хост" error="Не найдено" />);
    const input = screen.getByLabelText('Хост');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Не найдено');
  });

  it('clears an uncontrolled value', async () => {
    render(<TextField label="Хост" clearable defaultValue="leaf-07" />);
    await userEvent.click(screen.getByRole('button', { name: 'Очистить' }));
    expect(screen.getByLabelText('Хост')).toHaveValue('');
  });

  it('has no a11y violations', async () => {
    const { container } = render(<TextField label="Хост" hint="FQDN" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
