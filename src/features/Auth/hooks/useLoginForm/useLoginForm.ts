import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form';
import { loginSchema, LoginSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/shared/hooks/useAuth/useAuth';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface UseLoginFormReturn {
  register: UseFormRegister<LoginSchema>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<LoginSchema>;
  isValid: boolean;
  isLoading: boolean;
  loginError: Error | null;
  isLoginSuccess: boolean;
}

export const useLoginForm = (): UseLoginFormReturn => {
  const { register, handleSubmit, formState } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { errors, isValid } = formState;

  const { signIn } = useAuth();

  const { mutateAsync, isPending, error, isSuccess } = useMutation({
    mutationFn: (data: LoginSchema) => signIn(data.email, data.password),
    onSuccess: (response) => {
      console.log('Login realizado com sucesso', response);
    },
    onError: (error: AxiosError) => {
      console.error('Erro ao fazer login Hook:', error);
    },
  });

  const onSubmit = handleSubmit(async (data) => await mutateAsync(data));

  return {
    register,
    onSubmit,
    errors,
    isValid,
    isLoading: isPending,
    loginError: error,
    isLoginSuccess: isSuccess,
  };
};