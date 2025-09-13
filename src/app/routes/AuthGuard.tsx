import { AppBar } from '@/shared/components/AppBar';
import { useAuth } from '@/shared/hooks/useAuth/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = ({ isPrivate }: { isPrivate: boolean }) => {
  const { signedIn } = useAuth();

  if (signedIn && !isPrivate) {
    return <Navigate to="/" replace />;
  }

  if (!signedIn && isPrivate) {    
    return <Navigate to="/login" replace />;
  }

  return (
    <AppBar>
      <Outlet />
    </AppBar>
  );
};

export default AuthGuard;
