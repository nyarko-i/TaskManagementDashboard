import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskSearch from '../components/TaskSearch';

describe('TaskSearch Component', () => {
  jest.useFakeTimers(); // Control debounce timing

  it('renders search input correctly', () => {
    const mockSetSearchQuery = jest.fn();
    render(<TaskSearch setSearchQuery={mockSetSearchQuery} />);

    expect(screen.getByPlaceholderText(/Enter task title or description/i)).toBeInTheDocument();
  });

  it('calls setSearchQuery after debounce', () => {
    const mockSetSearchQuery = jest.fn();
    render(<TaskSearch setSearchQuery={mockSetSearchQuery} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test task' } });

    // Fast-forward debounce delay
    jest.advanceTimersByTime(300);

    expect(mockSetSearchQuery).toHaveBeenCalledWith('test task');
  });
});
