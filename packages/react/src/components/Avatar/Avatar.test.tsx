import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar.js';

describe('Avatar', () => {
  it('derives initials from the name', () => {
    render(<Avatar name="Алексей Иванов" />);
    expect(screen.getByText('АИ')).toBeInTheDocument();
  });

  it('exposes the name as an accessible label', () => {
    render(<Avatar name="leaf-07" />);
    expect(screen.getByRole('img', { name: 'leaf-07' })).toBeInTheDocument();
  });
});
