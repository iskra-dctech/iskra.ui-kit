import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WidgetEditor } from './WidgetEditor.js';
import type { MetricDefinition } from '@iskra-ui/core';

const metrics: MetricDefinition[] = [{ id: 'cpu', label: 'CPU' }];

describe('WidgetEditor', () => {
  it('renders when open', () => {
    render(
      <WidgetEditor
        open
        onClose={vi.fn()}
        onSave={vi.fn()}
        metrics={metrics}
        fetchPreview={async () => ({ id: 'cpu', label: 'CPU', points: [] })}
      />,
    );
    expect(screen.getByText('Add widget')).toBeInTheDocument();
  });
});
