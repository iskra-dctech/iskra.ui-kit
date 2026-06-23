import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChartTypeSelector } from './ChartTypeSelector.js';

describe('ChartTypeSelector', () => {
  it('changes chart type', async () => {
    const onChange = vi.fn();
    render(<ChartTypeSelector value="line" onChange={onChange} />);
    await userEvent.click(screen.getByRole('radio', { name: 'Столбчатая диаграмма' }));
    expect(onChange).toHaveBeenCalledWith('bar');
  });
});
