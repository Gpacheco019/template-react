import { routes } from '@/app/routes/routes';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const navItems = Object.entries(routes).map(([key, value]) => ({
  path: value,
  label: key.charAt(0).toUpperCase() + key.slice(1),
}));

export const useAppBar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return {
    location,
    navItems,
    isMenuOpen,
    setIsMenuOpen,
    toggleMenu,
    closeMenu,
  };
};
