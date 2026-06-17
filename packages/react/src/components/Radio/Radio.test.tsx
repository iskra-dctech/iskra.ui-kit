import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { RadioGroup } from './Radio.js';

const options = [
  { value: 'admin', label: 'admin' },
  { value: 'operator', label: 'operator' },
];

describe('RadioGroup', () => {
  it('renders a radiogroup with options', () => {
    render(<RadioGroup options={options} />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });

  it('fires onChange with the selected value', async () => {
    const onChange = vi.fn();
    render(<RadioGroup options={options} onChange={onChange} />);
    await userEvent.click(screen.getByRole('radio', { name: 'operator' }));
    expect(onChange).toHaveBeenCalledWith('operator');
  });

  it('has no a11y violations', async () => {
    const { container } = render(<RadioGroup options={options} defaultValue="admin" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
