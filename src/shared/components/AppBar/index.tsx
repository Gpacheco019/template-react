import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';

interface AppBarProps {
  children: React.ReactNode;
}

export const AppBar = ({ children }: AppBarProps) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-xl font-bold">React App</h1>
              <div className="flex space-x-2">
                {navItems.map(item => (
                  <Button
                    key={item.path}
                    variant={
                      location.pathname === item.path ? 'default' : 'ghost'
                    }
                    asChild
                  >
                    <Link to={item.path}>{item.label}</Link>
                  </Button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};
