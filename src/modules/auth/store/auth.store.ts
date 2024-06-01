import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { AuthStatus, type User } from '../interfaces';
import { checkAuthAction, loginAction, registerAction } from '../actions';
import { toast } from 'vue-sonner';
import { useLocalStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref(useLocalStorage<string | null>('token', null));
  const authStatus = ref<AuthStatus>(AuthStatus.CHECKING);

  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await loginAction(email, password);

      if (!loginResponse.ok) {
        toast.error('Error', { description: loginResponse.message });
        logout();
        return false;
      }

      toast.success(loginResponse.message, {
        description: `Bienvenido, ${loginResponse.user.fullName}`,
      });
      user.value = loginResponse.user;
      token.value = loginResponse.token;
      authStatus.value = AuthStatus.AUTHENTICATED;
      return true;
    } catch (error) {
      console.log(error);
      toast.error('Error', { description: 'Hubo un error al iniciar sesión' });
      logout();
      return false;
    }
  };

  const register = async (firstName: string, lastName: string, email: string, password: string) => {
    try {
      const fullName = `${firstName} ${lastName}`;
      const registerResponse = await registerAction(fullName, email, password);

      if (!registerResponse.ok) {
        toast.error('Error', { description: registerResponse.message });
        logout();
        return false;
      }

      toast.success(registerResponse.message, {
        description: `Bienvenido, ${registerResponse.user.fullName}`,
      });
      user.value = registerResponse.user;
      token.value = registerResponse.token;
      authStatus.value = AuthStatus.AUTHENTICATED;
      return true;
    } catch (error) {
      console.log(error);
      toast.error('Error', { description: 'Hubo un error al registrar' });
      logout();
      return false;
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    authStatus.value = AuthStatus.UNAUTHENTICATED;
  };

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const statusResponse = await checkAuthAction();
      if (!statusResponse.ok) {
        logout();
        return false;
      }

      user.value = statusResponse.user;
      token.value = statusResponse.token;
      authStatus.value = AuthStatus.AUTHENTICATED;

      return true;
    } catch (error) {
      console.log(error);
      logout();
      return false;
    }
  };

  return {
    user,
    token,
    authStatus,

    // Getters
    isChecking: computed(() => authStatus.value === AuthStatus.CHECKING),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.AUTHENTICATED),
    isUnauthenticated: computed(() => authStatus.value === AuthStatus.UNAUTHENTICATED),
    username: computed(() => user.value?.fullName),
    isAdmin: computed(() => user.value?.roles.includes('admin') || false),

    // Actions
    login,
    register,
    logout,
    checkAuthStatus,
  };
});
