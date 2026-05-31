import { AxiosError } from 'axios';

export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const data = error.response?.data as
      | { error_description?: string; msg?: string; message?: string }
      | undefined;

    const serverMsg = data?.error_description || data?.msg || data?.message;

    switch (status) {
      case 400:
        return serverMsg || 'Invalid request. Check your input.';
      case 401:
      case 403:
        return 'Invalid email or password';
      case 409:
        return 'This email is already registered';
      case 422:
        return serverMsg || 'Validation failed';
      default:
        return serverMsg || 'Something went wrong. Try again.';
    }
  }
  return 'Network error. Check your connection.';
}