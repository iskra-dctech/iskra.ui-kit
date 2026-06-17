import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner.js';

describe('Spinner', () => {
  it('exposes a status role with an accessible label', () => {
    render(<Spinner label="Синхронизация" />);
    expect(screen.getByRole('status')).toHaveTextContent('Синхронизация');
  });
});
