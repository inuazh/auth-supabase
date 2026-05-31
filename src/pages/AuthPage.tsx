import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useRegister } from '../hooks/useRegister';
import { getAuthErrorMessage } from '../api/errorMessage';
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  validateName,
} from '../auth/validation';

type Mode = 'login' | 'register';

interface FieldErrors {
  name?: string | null;
  email?: string | null;
  password?: string | null;
  confirm?: string | null;
}

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>('login');

 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [errors, setErrors] = useState<FieldErrors>({});

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const isRegister = mode === 'register';
  const activeMutation = isRegister ? registerMutation : loginMutation;
  const isPending = activeMutation.isPending;


  function clearError(field: keyof FieldErrors) {
    setErrors((prev) => ({ ...prev, [field]: null }));
  }

  function validate(): boolean {
    const next: FieldErrors = {};
    next.email = validateEmail(email);
    next.password = validatePassword(password);
    if (isRegister) {
      next.name = validateName(name);
      next.confirm = validatePasswordConfirm(password, confirm);
    }
    setErrors(next);
    return Object.values(next).every((e) => !e);
  }

  function handleSubmit() {
    if (!validate()) return;

    if (isRegister) {
      registerMutation.mutate({ email, password });
    } else {
      loginMutation.mutate({ email, password });
    }
  }

  function switchMode(next: Mode) {
    setMode(next);
    setErrors({});
    loginMutation.reset();
    registerMutation.reset();
  }

 
  const inputClass = (hasError?: string | null) =>
    `w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 ${
      hasError ? 'border-red-500' : 'border-gray-300'
    }`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow">
        <h1 className="mb-6 text-2xl font-bold">
          {isRegister ? 'Create account' : 'Sign in'}
        </h1>

        <div className="space-y-4">
          {isRegister && (
            <div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  clearError('name');
                }}
                className={inputClass(errors.name)}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
          )}

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError('email');
              }}
              className={inputClass(errors.email)}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearError('password');
              }}
              className={inputClass(errors.password)}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {isRegister && (
            <div>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirm}
                onChange={(e) => {
                  setConfirm(e.target.value);
                  clearError('confirm');
                }}
                className={inputClass(errors.confirm)}
              />
              {errors.confirm && (
                <p className="mt-1 text-sm text-red-600">{errors.confirm}</p>
              )}
            </div>
          )}


          {activeMutation.isError && (
            <p className="text-sm text-red-600">
              {getAuthErrorMessage(activeMutation.error)}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full rounded-md bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending
              ? 'Please wait...'
              : isRegister
              ? 'Sign up'
              : 'Sign in'}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => switchMode(isRegister ? 'login' : 'register')}
            className="font-medium text-blue-600 hover:underline"
          >
            {isRegister ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
}