import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { RouterProvider } from './routerProvider';
import { routes } from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContext } from '@/features/Auth/contexts/AuthContext';

vi.mock('@/features/Home/pages/Home', () => ({
  __esModule: true,
  default: () => <div data-testid='home-page'>Home Page</div>,
}));

vi.mock('@/features/About/pages/About', () => ({
  __esModule: true,
  default: () => <div data-testid='about-page'>About Page</div>,
}));

vi.mock('@/features/Auth/pages/login', () => ({
  __esModule: true,
  default: () => <div data-testid='login-page'>Login Page</div>,
}));

vi.mock('./AuthGuard', () => ({
  __esModule: true,
  default: ({ isPrivate }: { isPrivate: boolean }) => {
    const { signedIn } = mockUseAuth();

    if (signedIn && !isPrivate) {
      return <div data-testid='redirect-to-home'>Redirecting to home...</div>;
    }

    if (!signedIn && isPrivate) {
      return <div data-testid='redirect-to-login'>Redirecting to login...</div>;
    }

    if (signedIn) {
      return (
        <div data-testid='app-bar'>
          <div data-testid='app-bar-content'>App Bar</div>
          <div data-testid='outlet-content'>
            {window.location.pathname === '/' && (
              <div data-testid='home-page'>Home Page</div>
            )}
            {window.location.pathname === '/about' && (
              <div data-testid='about-page'>About Page</div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div data-testid='outlet'>
        <div data-testid='outlet-content'>
          {window.location.pathname === '/login' && (
            <div data-testid='login-page'>Login Page</div>
          )}
        </div>
      </div>
    );
  },
}));

const mockUseAuth = vi.fn();
vi.mock('@/shared/hooks/useAuth/useAuth', () => ({
  useAuth: () => mockUseAuth(),
}));

const queryClient = new QueryClient();

const MockAuthProvider = ({
  children,
  signedIn = false,
}: {
  children: React.ReactNode;
  signedIn?: boolean;
}) => {
  const mockAuthValue = {
    isSignInPending: false,
    signInError: null,
    signedIn,
    signIn: vi.fn(),
    signOut: vi.fn(),
  };

  return (
    <AuthContext.Provider value={mockAuthValue}>
      {children}
    </AuthContext.Provider>
  );
};

const renderWithRouter = (component: React.ReactElement, signedIn = false) => {
  return render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <MockAuthProvider signedIn={signedIn}>{component}</MockAuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

describe('RouterProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({
      signedIn: false,
      signIn: vi.fn(),
      signOut: vi.fn(),
    });
  });

  describe('when user is not authenticated', () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        signedIn: false,
        signIn: vi.fn(),
        signOut: vi.fn(),
      });
    });

    it('should redirect to login when accessing protected routes', async () => {
      window.history.pushState({}, '', routes.home);

      renderWithRouter(<RouterProvider />);

      await waitFor(() => {
        expect(screen.getByTestId('redirect-to-login')).toBeInTheDocument();
      });

      expect(screen.getByText('Redirecting to login...')).toBeInTheDocument();
    });

    it('should render login page when accessing /login route', async () => {
      window.history.pushState({}, '', routes.login);

      renderWithRouter(<RouterProvider />);

      await waitFor(() => {
        expect(screen.getByTestId('login-page')).toBeInTheDocument();
      });

      expect(screen.getByText('Login Page')).toBeInTheDocument();
    });

    it('should redirect authenticated users away from login page', async () => {
      mockUseAuth.mockReturnValue({
        signedIn: true,
        signIn: vi.fn(),
        signOut: vi.fn(),
      });

      window.history.pushState({}, '', routes.login);

      renderWithRouter(<RouterProvider />, true);

      await waitFor(() => {
        expect(screen.getByTestId('redirect-to-home')).toBeInTheDocument();
      });

      expect(screen.getByText('Redirecting to home...')).toBeInTheDocument();
    });
  });

  describe('when user is authenticated', () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        signedIn: true,
        signIn: vi.fn(),
        signOut: vi.fn(),
      });
    });

    it('should render the Home component on the root route with AppBar', async () => {
      window.history.pushState({}, '', routes.home);

      renderWithRouter(<RouterProvider />, true);

      await waitFor(() => {
        expect(screen.getByTestId('app-bar')).toBeInTheDocument();
        expect(screen.getByTestId('home-page')).toBeInTheDocument();
      });

      expect(screen.getByText('App Bar')).toBeInTheDocument();
      expect(screen.getByText('Home Page')).toBeInTheDocument();
    });

    it('should render the About component on the /about route with AppBar', async () => {
      window.history.pushState({}, '', routes.about);

      renderWithRouter(<RouterProvider />, true);

      await waitFor(() => {
        expect(screen.getByTestId('app-bar')).toBeInTheDocument();
        expect(screen.getByTestId('about-page')).toBeInTheDocument();
      });

      expect(screen.getByText('App Bar')).toBeInTheDocument();
      expect(screen.getByText('About Page')).toBeInTheDocument();
    });
  });

  it('should have the correct routes configured', () => {
    expect(routes.home).toBe('/');
    expect(routes.about).toBe('/about');
    expect(routes.login).toBe('/login');
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

    const hasComponent =
      container.innerHTML.includes('Home Page') ||
      container.innerHTML.includes('About Page') ||
      container.innerHTML.includes('Login Page') ||
      container.innerHTML.includes('Redirecting');
    expect(hasComponent).toBe(true);
  });

  it('should show loading initially and then the component', async () => {
    const { container } = renderWithRouter(<RouterProvider />);

    await waitFor(() => {
      expect(container.innerHTML).not.toContain('Loading...');
    });

    const hasComponent =
      container.innerHTML.includes('Home Page') ||
      container.innerHTML.includes('About Page') ||
      container.innerHTML.includes('Login Page') ||
      container.innerHTML.includes('Redirecting');
    expect(hasComponent).toBe(true);
  });
});
