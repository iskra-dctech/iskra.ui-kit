import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from './Alert.js';

describe('Alert', () => {
  it('uses role="alert" for errors', () => {
    render(<Alert variant="error">boom</Alert>);
    expect(screen.getByRole('alert')).toHaveTextContent('boom');
  });

  it('uses role="status" for info', () => {
    render(<Alert variant="info">fyi</Alert>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('fires onClose', async () => {
    const onClose = vi.fn();
    render(
      <Alert variant="warning" closable onClose={onClose}>
        x
      </Alert>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});
