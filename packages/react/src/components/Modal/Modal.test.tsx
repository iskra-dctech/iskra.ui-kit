import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal.js';

describe('Modal', () => {
  it('renders an accessible dialog with a label when open', () => {
    render(
      <Modal open onClose={() => {}} title="Заголовок">
        body
      </Modal>,
    );
    expect(screen.getByRole('dialog', { name: 'Заголовок' })).toHaveAttribute('aria-modal', 'true');
  });

  it('does not render when closed', () => {
    render(
      <Modal open={false} onClose={() => {}} title="X">
        body
      </Modal>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes on Escape', async () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="X">
        body
      </Modal>,
    );
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });
});
