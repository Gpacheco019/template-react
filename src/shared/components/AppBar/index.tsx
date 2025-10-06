import { Link } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import { AlignJustify, X } from 'lucide-react';
import { useAppBar } from './useAppBar';

interface AppBarProps {
  children: React.ReactNode;
}

export const AppBar = ({ children }: AppBarProps) => {
  const { isMenuOpen, navItems, location, toggleMenu, closeMenu } = useAppBar();

  return (
    <div className='min-h-screen bg-background pt-12'>
      <header className='bg-primary fixed top-0 left-0 right-0 z-50 h-12 flex items-center'>
        <div className='container px-4 py-4'>
          <nav className='flex items-center justify-between'>
            <div className='sm:hidden'>
              <Button
                variant='ghost'
                size='icon'
                onClick={toggleMenu}
                aria-label='Toggle menu'
                className='text-white'
              >
                {isMenuOpen ? <X size={24} /> : <AlignJustify size={24} />}
              </Button>
            </div>
            <div className='flex items-center space-x-6'>
              <h1 className='text-xl font-bold text-white'>Name App</h1>
              <div className='sm:flex hidden'>
                {navItems.map(item => (
                  <Button
                    key={item.path}
                    asChild
                    className={`text-white back bg-[#1CB29A] rounded-none h-[48px] hover:bg-[#1CB29A] ${
                      location.pathname === item.path
                        ? 'bg-[#1CB29A]'
                        : 'bg-primary'
                    }`}
                  >
                    <Link to={item.path}>{item.label}</Link>
                  </Button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </header>

      {isMenuOpen && (
        <>
          <div
            className='fixed inset-0 bg-black/50 z-40 sm:hidden'
            onClick={closeMenu}
            aria-hidden='true'
          />

          <div
            className={`
              fixed top-0 left-0 h-full w-80 max-w-[85vw]
              bg-background border-r shadow-lg z-50 sm:hidden
              transform transition-transform duration-300 ease-in-out 
              ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
          >
            <div className='flex flex-col h-full'>
              <div className='flex items-center justify-between p-4 border-b'>
                <h2 className='text-lg font-semibold'>Menu</h2>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={closeMenu}
                  aria-label='Close menu'
                >
                  <X size={20} />
                </Button>
              </div>

              <nav className='flex-1 p-4'>
                <div className='flex flex-col gap-2'>
                  {navItems.map(item => (
                    <Button
                      key={item.path}
                      variant={
                        location.pathname === item.path ? 'default' : 'ghost'
                      }
                      asChild
                      className='justify-start'
                      onClick={closeMenu}
                    >
                      <Link to={item.path}>{item.label}</Link>
                    </Button>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </>
      )}

      <main className='mx-auto'>{children}</main>
    </div>
  );
};
