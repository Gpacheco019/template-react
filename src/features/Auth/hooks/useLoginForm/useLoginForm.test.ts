import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import type { Mock } from 'vitest';
import type { FieldErrors } from 'react-hook-form';
import type { LoginSchema } from './schema';

vi.mock('@/shared/hooks/useAuth/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('react-hook-form', async () => {
  const actual = await vi.importActual<typeof import('react-hook-form')>('react-hook-form');
  return {
    ...actual,
    useForm: vi.fn(),
  };
});

import { useLoginForm } from './useLoginForm';
import { useAuth } from '@/shared/hooks/useAuth/useAuth';
import { useForm } from 'react-hook-form';

describe('useLoginForm', () => {
  const signInMock = vi.fn();
  const useFormMock = useForm as unknown as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as unknown as Mock).mockReturnValue({
      signIn: signInMock,
      isSignInPending: false,
      signInError: null,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should expose the basic API and reflect the initial auth state', () => {
    useFormMock.mockReturnValue({
      register: vi.fn(),
      handleSubmit: () => async () => {},
      formState: { errors: {}, isValid: false },
    });

    const { result } = renderHook(() => useLoginForm());

    expect(typeof result.current.register).toBe('function');
    expect(typeof result.current.onSubmit).toBe('function');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.loginError).toBeNull();
    expect(result.current.isValid).toBe(false);
    expect(Object.keys(result.current.errors || {})).toHaveLength(0);
  });

  it('should propagate isLoading and loginError from useAuth', () => {
    (useAuth as unknown as Mock).mockReturnValue({
      signIn: signInMock,
      isSignInPending: true,
      signInError: new Error('Falha ao logar'),
    });

    useFormMock.mockReturnValue({
      register: vi.fn(),
      handleSubmit: () => async () => {},
      formState: { errors: {}, isValid: false },
    });

    const { result } = renderHook(() => useLoginForm());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.loginError).toBeInstanceOf(Error);
    expect(result.current.loginError?.message).toBe('Falha ao logar');
  });

  it('should call signIn with email and password when the submit is valid', async () => {
    useFormMock.mockReturnValue({
      register: vi.fn(),
      handleSubmit: (onValid: (data: LoginSchema) => Promise<void>) => async () => {
        await onValid({ email: 'user@email.com', password: '123456' });
      },
      formState: { errors: {}, isValid: true },
    });

    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      await result.current.onSubmit();
    });

    expect(signInMock).toHaveBeenCalledTimes(1);
    expect(signInMock).toHaveBeenCalledWith('user@email.com', '123456');
  });

  it('should not call signIn when the validation fails on submit', async () => {
    useFormMock.mockReturnValue({
      register: vi.fn(),
      handleSubmit: () => async () => {
        // simulate invalid validation: do not call onValid
      },
      formState: {
        errors: {
          email: { message: 'Email inválido' },
          password: { message: 'Senha inválida' },
        } as FieldErrors<LoginSchema>,
        isValid: false,
      },
    });

    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      await result.current.onSubmit();
    });

    expect(signInMock).not.toHaveBeenCalled();

    await waitFor(() => {
      const errors = result.current.errors as FieldErrors<LoginSchema>;
      expect(errors.email?.message).toBe('Email inválido');
      expect(errors.password?.message).toBe('Senha inválida');
    });
  });
});
