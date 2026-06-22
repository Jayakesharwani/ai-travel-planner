import { api } from '@/lib/api';
import { AuthResponse } from '@/types/auth';

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await api.post<AuthResponse>(
    '/auth/register',
    {
      name,
      email,
      password,
    }
  );

  return response.data;
};

export const loginUser = async (
  email: string,
  password: string
) => {
  const response = await api.post<AuthResponse>(
    '/auth/login',
    {
      email,
      password,
    }
  );

  return response.data;
};