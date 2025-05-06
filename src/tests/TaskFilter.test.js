import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskFilter from '../components/TaskFilter';


describe('TaskFilter Component', () => {
  it('renders select options correctly', () => {
    const mockSetFilter = jest.fn();
    render(<TaskFilter setFilter={mockSetFilter} />);

    // Check all options are present
    expect(screen.getByText(/All/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending/i)).toBeInTheDocument();
    expect(screen.getByText(/In-Progress/i)).toBeInTheDocument();
    expect(screen.getByText(/Completed/i)).toBeInTheDocument();
  });

  it('calls setFilter when an option is selected', () => {
    const mockSetFilter = jest.fn();
    render(<TaskFilter setFilter={mockSetFilter} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'completed' } });

    expect(mockSetFilter).toHaveBeenCalledWith('completed');
  });
});
