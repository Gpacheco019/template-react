import { Button } from '@/shared/components/ui/button';
import { CardContent, CardFooter } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';

import { useLoginForm } from '../../hooks/useLoginForm/useLoginForm';

const LoginForm = () => {
  const { 
    register, 
    onSubmit, 
    errors, 
    isValid, 
    isLoading, 
    loginError     
  } = useLoginForm();

  return (
    <>
      <CardContent className="flex flex-col">
        <form className="flex flex-col gap-3" onSubmit={onSubmit}>
          
          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">
                {loginError.message || 'Erro ao fazer login. Tente novamente.'}
              </p>
            </div>
          )}

          <div>
            <Input 
              type="email" 
              placeholder="Email" 
              className="h-12" 
              disabled={isLoading}
              {...register('email')}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <Input 
              type="password" 
              placeholder="Password" 
              className="h-12" 
              disabled={isLoading}
              {...register('password')}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <Button 
            type="submit" 
            variant="default" 
            size="lg" 
            className="mt-2" 
            disabled={!isValid || isLoading}
          >
            {isLoading ? 'Loading...' : 'Login'}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
            Don't have an account?
        </p>
      </CardFooter>
    </>
  );
};

export default LoginForm;