import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchField } from './SearchField.js';

describe('SearchField', () => {
  it('renders a search input with placeholder', () => {
    render(<SearchField placeholder="Поиск по ID" />);
    expect(screen.getByRole('searchbox')).toHaveAttribute('placeholder', 'Поиск по ID');
  });

  it('clears value when clear button clicked', async () => {
    const onClear = vi.fn();
    render(<SearchField defaultValue="test" onClear={onClear} />);
    await userEvent.click(screen.getByRole('button', { name: 'Очистить' }));
    expect(onClear).toHaveBeenCalled();
  });
});
