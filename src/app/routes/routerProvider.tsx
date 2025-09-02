import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';

const Home = lazy(() => import('@/features/Home/pages/Home'));
const About = lazy(() => import('@/features/About/pages/About'));

export const RouterProvider = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.about} element={<About />} />
      </Routes>
    </Suspense>
  );
};
