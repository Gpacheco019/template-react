import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import LoginForm from './LoginForm';
import * as useLoginFormModule from '../../hooks/useLoginForm/useLoginForm';
import { LoginSchema } from '../../hooks/useLoginForm/schema';
import { FieldErrors } from 'react-hook-form';

describe('LoginForm',() => {
  it('should be render the component default state', () => {
    const { getByRole, getByPlaceholderText, getByText } = render(<LoginForm />);

    expect(getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(getByPlaceholderText('Email')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByText('Don\'t have an account?')).toBeInTheDocument();
  });

  it('should be show loading when isLoading is true', () => {
    const spy = vi.spyOn(useLoginFormModule, 'useLoginForm').mockReturnValue({
      isLoading: true,
      loginError: null,
      register: vi.fn(),
      onSubmit: vi.fn(),
      errors: {},
      isValid: true,
    });

    const { getByRole } = render(<LoginForm />);

    expect(getByRole('button', { name: 'Loading...' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Loading...' })).toBeDisabled();

    spy.mockRestore();
  });

  it('should be disabled button when isValid is false', () => {
    const spy = vi.spyOn(useLoginFormModule, 'useLoginForm').mockReturnValue({
      isLoading: false,
      loginError: null,
      register: vi.fn(),
      onSubmit: vi.fn(),
      errors: {},
      isValid: false,
    });

    const { getByRole } = render(<LoginForm />);

    expect(getByRole('button', { name: 'Login' })).toBeDisabled();

    spy.mockRestore();
  });

  it('should be show error when loginError is not null', () => {
    const spy = vi.spyOn(useLoginFormModule, 'useLoginForm').mockReturnValue({
      isLoading: false,
      loginError: new Error('Senha ou email inválidos'),
      register: vi.fn(),
      onSubmit: vi.fn(),
      errors: {},
      isValid: true,
    });

    const { getByText } = render(<LoginForm />);

    expect(getByText('Senha ou email inválidos')).toBeInTheDocument();

    spy.mockRestore();
  });

  it('should be show error when email is invalid', () => {
    const spy = vi.spyOn(useLoginFormModule, 'useLoginForm').mockReturnValue({
      isLoading: false,
      loginError: null,
      register: vi.fn(),
      onSubmit: vi.fn(),
      errors: { email: { message: 'Email inválido' } } as FieldErrors<LoginSchema>,
      isValid: true,
    });

    const { getByText } = render(<LoginForm />);

    expect(getByText('Email inválido')).toBeInTheDocument();

    spy.mockRestore();
  });

  it('should be show error when password is invalid', () => {
    const spy = vi.spyOn(useLoginFormModule, 'useLoginForm').mockReturnValue({
      isLoading: false,
      loginError: null,
      register: vi.fn(),
      onSubmit: vi.fn(),
      errors: { password: { message: 'Senha inválida' } } as FieldErrors<LoginSchema>,
      isValid: true,
    });

    const { getByText } = render(<LoginForm />);

    expect(getByText('Senha inválida')).toBeInTheDocument();

    spy.mockRestore();
  });
});