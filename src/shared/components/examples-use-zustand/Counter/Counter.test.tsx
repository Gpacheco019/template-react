import { render, screen } from '@testing-library/react';
import { Counter } from './index';

// Mock do Zustand store
jest.mock('../../../../app/store', () => ({
  useStore: () => ({
    counter: 0,
    increment: jest.fn(),
    decrement: jest.fn(),
  }),
}));

describe('Counter', () => {
  it('should render the counter with initial value', () => {
    render(<Counter />);
    
    expect(screen.getByText('Counter: 0')).toBeInTheDocument();
  });

  it('should have increment and decrement buttons', () => {
    render(<Counter />);
    
    expect(screen.getByText('Increment')).toBeInTheDocument();
    expect(screen.getByText('Decrement')).toBeInTheDocument();
  });
});
