import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Skeleton } from './Skeleton.js';

describe('Skeleton', () => {
  it('renders the requested number of text lines', () => {
    const { container } = render(<Skeleton variant="text" lines={3} />);
    expect(container.querySelectorAll('.ik-sk')).toHaveLength(3);
  });

  it('is hidden from assistive tech', () => {
    const { container } = render(<Skeleton variant="rect" height={40} />);
    expect(container.querySelector('.ik-sk')).toHaveAttribute('aria-hidden', 'true');
  });
});
