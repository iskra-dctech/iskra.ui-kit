import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider, useToast } from './Toast.js';

function Trigger() {
  const { toast } = useToast();
  return (
    <button onClick={() => toast({ variant: 'success', title: 'Готово', duration: 0 })}>
      notify
    </button>
  );
}

describe('Toast', () => {
  it('shows a toast via the imperative API', async () => {
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'notify' }));
    expect(screen.getByRole('status')).toHaveTextContent('Готово');
  });

  it('dismisses a toast', async () => {
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'notify' }));
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
