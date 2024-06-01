import { tesloApi } from '@/api/tesloApi';
import type { AuthResponse, User } from '../interfaces';
import { isAxiosError } from 'axios';

interface RegisterError {
  ok: false;
  message: string;
}

interface RegisterSuccess {
  ok: true;
  message: string;
  token: string;
  user: User;
}

export const registerAction = async (
  fullName: string,
  email: string,
  password: string,
): Promise<RegisterError | RegisterSuccess> => {
  if (!fullName || !email || !password) {
    return {
      ok: false,
      message: 'Rellenar todos los campos',
    };
  }

  // console.log({fullName, email, password})
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
      fullName,
      email,
      password,
    });

    return {
      ok: true,
      message: 'Registro exitoso',
      token: data.token,
      user: data.user,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
      // console.log(error.response?.data.message[0]);
      return {
        ok: false,
        message: 'Credenciales incorrectas o usuario ya registrado',
      };
    }
    console.log(error);
    return {
      ok: false,
      message: 'Hubo un error al registrar',
    };
  }
};
