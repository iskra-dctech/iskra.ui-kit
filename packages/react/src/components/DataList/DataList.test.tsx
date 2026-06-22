import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DataList } from './DataList.js';
import { Card } from '../Card/Card.js';

interface Row {
  id: string;
  name: string;
}

const rows: Row[] = [
  { id: '1', name: 'alpha' },
  { id: '2', name: 'beta' },
];

describe('DataList', () => {
  it('renders items via renderItem', () => {
    render(
      <DataList
        items={rows}
        getItemKey={(r) => r.id}
        renderItem={(r) => <Card padding="s">{r.name}</Card>}
        aria-label="Устройства"
      />,
    );
    expect(screen.getByRole('list', { name: 'Устройства' })).toBeInTheDocument();
    expect(screen.getByText('alpha')).toBeInTheDocument();
    expect(screen.getByText('beta')).toBeInTheDocument();
  });

  it('shows empty state', () => {
    render(
      <DataList
        items={[]}
        getItemKey={(r: Row) => r.id}
        renderItem={() => null}
        empty="Пусто"
        aria-label="Список"
      />,
    );
    expect(screen.getByText('Пусто')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(
      <DataList
        items={[]}
        getItemKey={(r: Row) => r.id}
        renderItem={() => null}
        loading
        aria-label="Список"
      />,
    );
    expect(screen.getByLabelText('Список')).toHaveAttribute('aria-busy', 'true');
  });
});
