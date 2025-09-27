import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import LoginForm from '../components/LoginForm/LoginForm';

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[21rem] h-[29rem] flex flex-col px-3 gap-12">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Welcome to the login page</CardDescription>
        </CardHeader>
        <LoginForm />
      </Card>
    </div>
  );
};

export default Login;