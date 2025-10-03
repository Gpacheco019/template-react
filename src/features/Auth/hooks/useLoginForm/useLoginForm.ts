import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form';
import { loginSchema, LoginSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/shared/hooks/useAuth/useAuth';

interface UseLoginFormReturn {
  register: UseFormRegister<LoginSchema>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<LoginSchema>;
  isValid: boolean;
  isLoading: boolean;
  loginError: Error | null;
}

export const useLoginForm = (): UseLoginFormReturn => {
  const { signIn, isSignInPending, signInError } = useAuth();

  const { register, handleSubmit, formState } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { errors, isValid } = formState;

  const onSubmit = handleSubmit(
    async data => await signIn(data.email, data.password)
  );

  return {
    register,
    onSubmit,
    errors,
    isValid,
    isLoading: isSignInPending,
    loginError: signInError,
  };
};
