import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskSort from '../components/TaskSort';

describe('TaskSort Component', () => {
  it('renders sorting options correctly', () => {
    const mockSetSort = jest.fn();
    render(<TaskSort setSort={mockSetSort} />);

    expect(screen.getByText(/Due Date \(Oldest First\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Due Date \(Newest First\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Title \(A-Z\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Title \(Z-A\)/i)).toBeInTheDocument();
  });

  it('calls setSort when an option is selected', () => {
    const mockSetSort = jest.fn();
    render(<TaskSort setSort={mockSetSort} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'title-desc' } });

    expect(mockSetSort).toHaveBeenCalledWith('title-desc');
  });
});
