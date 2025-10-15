import { useMutation } from '@tanstack/react-query';
import { LoginSchema } from '../useLoginForm/schema';
import AuthService from '../../services/login';

export const useSignIn = () => {
  return useMutation({
    mutationFn: (data: LoginSchema) => AuthService.signIn(data),
  });
};

//TODO: implement other AuthServices's methods with react-query hooks and export individually
