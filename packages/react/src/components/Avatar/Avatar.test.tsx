import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar.js';

describe('Avatar', () => {
  it('derives initials from the name', () => {
    render(<Avatar name="Алексей Иванов" />);
    expect(screen.getByText('АИ')).toBeInTheDocument();
  });

  it('applies status ring class when status is set', () => {
    const { container } = render(<Avatar name="test" status="online" />);
    expect(container.querySelector('.ik-av-ring-online')).toBeInTheDocument();
  });

  it('exposes the name as an accessible label', () => {
    render(<Avatar name="leaf-07" />);
    expect(screen.getByRole('img', { name: 'leaf-07' })).toBeInTheDocument();
  });
});
