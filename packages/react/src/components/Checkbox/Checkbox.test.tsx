import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Checkbox } from './Checkbox.js';

describe('Checkbox', () => {
  it('renders a labelled native checkbox', () => {
    render(<Checkbox label="Включить" />);
    expect(screen.getByRole('checkbox', { name: 'Включить' })).toBeInTheDocument();
  });

  it('reflects the indeterminate state on the input', () => {
    render(<Checkbox label="X" indeterminate />);
    expect((screen.getByRole('checkbox') as HTMLInputElement).indeterminate).toBe(true);
  });

  it('has no a11y violations', async () => {
    const { container } = render(<Checkbox label="X" description="desc" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
