import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';

const Home = lazy(() => import('@/features/Home/pages/Home'));
const About = lazy(() => import('@/features/About/pages/About'));
const Login = lazy(() => import('@/features/Auth/pages/login'));
const AuthGuard = lazy(() => import('./AuthGuard'));

export const RouterProvider = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<AuthGuard isPrivate />}>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.about} element={<About />} />
        </Route>

        <Route element={<AuthGuard isPrivate={false} />}>
          <Route path={routes.login} element={<Login />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
