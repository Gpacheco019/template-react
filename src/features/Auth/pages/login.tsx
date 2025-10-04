import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import LoginForm from '../components/LoginForm/LoginForm';

const Login = () => {
  return (
    <div className='flex justify-center items-baseline-last sm:justify-center sm:items-center h-screen'>
      <Card className='w-full h-[70vh] rounded-b-none sm:w-[21rem] sm:h-[29rem] flex flex-col px-3 gap-12 sm:rounded-b-lg'>
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
