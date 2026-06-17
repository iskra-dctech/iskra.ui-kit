import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card.js';

describe('Card', () => {
  it('is focusable when interactive', () => {
    render(
      <Card interactive aria-label="card">
        x
      </Card>,
    );
    expect(screen.getByLabelText('card')).toHaveAttribute('tabindex', '0');
  });

  it('renders header/body/footer subcomponents', () => {
    render(
      <Card padding="none">
        <Card.Header>H</Card.Header>
        <Card.Body>B</Card.Body>
        <Card.Footer>F</Card.Footer>
      </Card>,
    );
    expect(screen.getByText('H')).toHaveClass('ik-card-header');
    expect(screen.getByText('B')).toHaveClass('ik-card-body');
    expect(screen.getByText('F')).toHaveClass('ik-card-footer');
  });
});
