import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../components/TaskForm';

// Mock useAuthStore
jest.mock('../context/authStore', () => ({
  __esModule: true,
  default: () => ({ user: { email: 'testuser@example.com' } }),
}));

describe('TaskForm Component', () => {
  it('renders form fields correctly', () => {
    const mockOnSave = jest.fn();
    render(<TaskForm onSave={mockOnSave} />);

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Due Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Attach Files/i)).toBeInTheDocument();
  });

  it('validates and submits form correctly', () => {
    const mockOnSave = jest.fn();
    render(<TaskForm onSave={mockOnSave} />);

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByLabelText(/Due Date/i), {
      target: { value: '2099-12-31' },
    });
    fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: 'completed' } });

    fireEvent.submit(screen.getByTestId('task-form'));

    expect(mockOnSave).toHaveBeenCalledWith({
      title: 'New Task',
      dueDate: '2099-12-31',
      status: 'completed',
      files: [],
      assignedUserId: 'testuser@example.com',
    });
  });
});
