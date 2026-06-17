import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from './Tabs.js';

const items = [
  { value: 'a', label: 'A', content: 'Panel A' },
  { value: 'b', label: 'B', content: 'Panel B' },
  { value: 'c', label: 'C', content: 'Panel C' },
];

describe('Tabs', () => {
  it('selects the first tab by default and shows its panel', () => {
    render(<Tabs items={items} aria-label="t" />);
    expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Panel A')).toBeVisible();
  });

  it('navigates with the arrow keys (roving tabindex)', async () => {
    render(<Tabs items={items} aria-label="t" />);
    await userEvent.click(screen.getByRole('tab', { name: 'A' }));
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'B' })).toHaveAttribute('aria-selected', 'true');
  });
});
