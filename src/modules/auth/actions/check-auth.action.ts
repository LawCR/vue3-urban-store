import { tesloApi } from '@/api/tesloApi';
import type { AuthResponse, User } from '../interfaces';

interface CheckError {
  ok: false;
  message: string;
}

interface CheckSuccess {
  ok: true;
  message: string;
  token: string;
  user: User;
}

export const checkAuthAction = async (): Promise<CheckError | CheckSuccess> => {
  const token = localStorage.getItem('token');
  if (!token) {
    return { ok: false, message: 'Acceso no autorizado' };
  }

  try {
    const { data } = await tesloApi.get<AuthResponse>('/auth/check-status');
    return {
      ok: true,
      message: 'Sesión activa',
      token: data.token,
      user: data.user,
    };
  } catch (error) {
    console.log(error);
    localStorage.removeItem('token');
    return { ok: false, message: 'Error al verificar la sesión' };
  }
};
