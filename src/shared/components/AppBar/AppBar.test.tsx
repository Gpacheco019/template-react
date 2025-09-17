import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { AppBar } from './index';

/* const MockBrowserRouter = jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => children,
}));

// Wrapper para fornecer o contexto do Router
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <MockBrowserRouter>
      {component}
    </MockBrowserRouter>
  );
}; */

describe('AppBar', () => {
  it('should render the component with children', () => {
    const testMessage = 'Teste do AppBar';
    
    render(<AppBar>{testMessage}</AppBar>, { wrapper: BrowserRouter });

    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  it('should render without children', () => {
    render(<AppBar>{null}</AppBar>, { wrapper: BrowserRouter });
    
    expect(document.body).toBeInTheDocument();
  });
});
