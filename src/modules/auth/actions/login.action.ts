import { tesloApi } from '@/api/tesloApi';
import type { AuthResponse, User } from '../interfaces';
import { isAxiosError } from 'axios';

interface LoginError {
  ok: false;
  message: string;
}

interface LoginSuccess {
  ok: true;
  message: string;
  token: string;
  user: User;
}

export const loginAction = async (
  email: string,
  password: string,
): Promise<LoginError | LoginSuccess> => {
  if (!email || !password) {
    return {
      ok: false,
      message: 'Debes ingresar un correo y una contraseña',
    };
  }
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/login', {
      email,
      password,
    });

    return {
      ok: true,
      message: 'Inicio de sesión exitoso',
      token: data.token,
      user: data.user,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
        message: 'Credenciales incorrectas',
      };
    }
    console.log(error);
    return {
      ok: false,
      message: 'Hubo un error al iniciar sesión',
    };
  }
};
