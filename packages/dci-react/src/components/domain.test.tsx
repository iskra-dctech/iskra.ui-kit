import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DeviceCard } from './DeviceCard/DeviceCard.js';
import { FleetPulse } from './FleetPulse/FleetPulse.js';
import { CliRow } from './CliRow/CliRow.js';
import { DriftToast } from './DriftToast/DriftToast.js';
import { ApiKeyModal } from './ApiKeyModal/ApiKeyModal.js';

describe('DeviceCard', () => {
  it('renders identity and status, and fires onSelect', async () => {
    const onSelect = vi.fn();
    render(
      <DeviceCard
        name="leaf-07.msk"
        ip="10.0.2.7"
        status="drift"
        metricLabel="CPU"
        metricValue="88%"
        onSelect={onSelect}
      />,
    );
    const card = screen.getByRole('button', { name: /leaf-07\.msk/i });
    expect(screen.getByText('10.0.2.7')).toBeInTheDocument();
    await userEvent.click(card);
    expect(onSelect).toHaveBeenCalledOnce();
  });
});

describe('FleetPulse', () => {
  it('expands to reveal problem devices', async () => {
    render(
      <FleetPulse
        percent={81}
        issues={[
          { id: '1', name: 'border-01', reason: 'down', severity: 'error', actionLabel: 'Retry' },
        ]}
      />,
    );
    const head = screen.getByRole('button', { expanded: false });
    expect(screen.queryByText('border-01')).not.toBeInTheDocument();
    await userEvent.click(head);
    expect(screen.getByText('border-01')).toBeInTheDocument();
  });
});

describe('CliRow', () => {
  it('copies the command via the provided handler', async () => {
    const onCopy = vi.fn();
    render(<CliRow command="curl ...sync" onCopy={onCopy} />);
    await userEvent.click(screen.getByRole('button', { name: /copy/i }));
    expect(onCopy).toHaveBeenCalledWith('curl ...sync');
  });
});

describe('DriftToast', () => {
  it('announces drift assertively', () => {
    render(<DriftToast variant="drift" title="Drift" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Drift');
  });
});

describe('ApiKeyModal', () => {
  it('enables submit only with a name and a scope', async () => {
    const onCreate = vi.fn();
    render(<ApiKeyModal open onClose={() => {}} onCreate={onCreate} />);
    const submit = screen.getByRole('button', { name: 'Создать ключ' });
    expect(submit).toBeDisabled();

    await userEvent.type(screen.getByLabelText(/Название ключа/i), 'ci-bot');
    await userEvent.click(screen.getAllByRole('checkbox')[0]!);
    expect(submit).toBeEnabled();

    await userEvent.click(submit);
    expect(onCreate).toHaveBeenCalledWith({ name: 'ci-bot', scopes: ['devices:read'] });
  });
});
