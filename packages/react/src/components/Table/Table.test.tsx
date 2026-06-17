import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Table, type TableColumn } from './Table.js';

interface Row {
  id: string;
  host: string;
}
const columns: TableColumn<Row>[] = [{ key: 'host', header: 'Хост' }];

describe('Table', () => {
  it('renders header and rows', () => {
    render(
      <Table columns={columns} data={[{ id: '1', host: 'leaf-07' }]} getRowId={(r) => r.id} />,
    );
    expect(screen.getByRole('columnheader', { name: 'Хост' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'leaf-07' })).toBeInTheDocument();
  });

  it('shows the empty slot when there is no data', () => {
    render(<Table columns={columns} data={[]} empty={<span>Пусто</span>} />);
    expect(screen.getByText('Пусто')).toBeInTheDocument();
  });
});
