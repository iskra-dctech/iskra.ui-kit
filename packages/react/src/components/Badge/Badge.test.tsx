import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Badge, Tag } from './Badge.js';

describe('Badge / Tag', () => {
  it('applies the variant class', () => {
    render(<Badge variant="warning">Drift</Badge>);
    expect(screen.getByText('Drift')).toHaveClass('ik-bdg-warning');
  });

  it('fires onRemove for removable tags', async () => {
    const onRemove = vi.fn();
    render(<Tag onRemove={onRemove}>x</Tag>);
    await userEvent.click(screen.getByRole('button', { name: 'Удалить' }));
    expect(onRemove).toHaveBeenCalledOnce();
  });
});
