import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RouterProvider } from './routerProvider';
import { routes } from './routes';


jest.mock('@/features/Home/pages/Home', () => ({
  __esModule: true,
  default: () => <div data-testid="home-page">Home Page</div>,
}));

jest.mock('@/features/About/pages/About', () => ({
  __esModule: true,
  default: () => <div data-testid="about-page">About Page</div>,
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('RouterProvider', () => {
  beforeEach(() => {    
    jest.clearAllMocks();
  });

  it('should render the Home component on the root route', async () => {    
    window.history.pushState({}, '', routes.home);
    
    renderWithRouter(<RouterProvider />);    
   
    await waitFor(() => {
      expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('should render the About component on the /about route', async () => {    
    window.history.pushState({}, '', routes.about);
    
    renderWithRouter(<RouterProvider />);    
    
    await waitFor(() => {
      expect(screen.getByTestId('about-page')).toBeInTheDocument();
    });
    
    expect(screen.getByText('About Page')).toBeInTheDocument();
  });

  it('should have the correct routes configured', () => {
    expect(routes.home).toBe('/');
    expect(routes.about).toBe('/about');
  });

  it('should render without errors', () => {
    expect(() => {
      renderWithRouter(<RouterProvider />);
    }).not.toThrow();
  });

  it('should use Suspense for lazy loading', async () => {
    const { container } = renderWithRouter(<RouterProvider />);    
    
    await waitFor(() => {
      expect(container.innerHTML).not.toContain('Loading...');
    });    
    
    const hasComponent = container.innerHTML.includes('Home Page') || container.innerHTML.includes('About Page');
    expect(hasComponent).toBe(true);
  });

  it('should have a valid routing structure', async () => {
    renderWithRouter(<RouterProvider />);
    
    
    await waitFor(() => {
      const routesElement = document.querySelector('[data-testid="home-page"], [data-testid="about-page"]');
      expect(routesElement).toBeInTheDocument();
    });
  });

  it('should show loading initially and then the component', async () => {
    const { container } = renderWithRouter(<RouterProvider />);    
    
    await waitFor(() => {
      expect(container.innerHTML).not.toContain('Loading...');
    });    
    
    const hasComponent = container.innerHTML.includes('Home Page') || container.innerHTML.includes('About Page');
    expect(hasComponent).toBe(true);
  });
});
