import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DashboardToolbar } from './DashboardToolbar.js';

describe('DashboardToolbar', () => {
  it('toggles edit mode', async () => {
    const onEditableChange = vi.fn();
    render(
      <DashboardToolbar
        title="Fleet"
        editable={false}
        onEditableChange={onEditableChange}
        onAddWidget={vi.fn()}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Редактировать' }));
    expect(onEditableChange).toHaveBeenCalledWith(true);
  });
});
