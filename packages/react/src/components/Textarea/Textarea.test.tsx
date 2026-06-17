import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from './Textarea.js';

describe('Textarea', () => {
  it('associates label and links the error', () => {
    render(<Textarea label="Описание" error="Обязательно" />);
    const ta = screen.getByLabelText('Описание');
    expect(ta).toHaveAttribute('aria-invalid', 'true');
    expect(ta).toHaveAccessibleDescription('Обязательно');
  });

  it('updates the character counter', async () => {
    render(<Textarea label="X" maxLength={50} showCount />);
    await userEvent.type(screen.getByLabelText('X'), 'abc');
    expect(screen.getByText('3/50')).toBeInTheDocument();
  });
});
