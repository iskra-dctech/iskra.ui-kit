import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MetricPicker } from './MetricPicker.js';
import type { MetricDefinition } from '@iskra-ui/core';

const metrics: MetricDefinition[] = [
  { id: 'cpu', label: 'CPU', group: 'Host' },
  { id: 'mem', label: 'Memory', group: 'Host' },
];

describe('MetricPicker', () => {
  it('renders search field', () => {
    render(<MetricPicker metrics={metrics} onChange={vi.fn()} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
