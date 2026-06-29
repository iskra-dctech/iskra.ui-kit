import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WidgetExpandView } from './WidgetExpandView.js';

describe('WidgetExpandView', () => {
  it('renders when open', () => {
    render(
      <WidgetExpandView open onClose={vi.fn()} title="CPU">
        <div>expanded chart</div>
      </WidgetExpandView>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('expanded chart')).toBeInTheDocument();
  });
});
