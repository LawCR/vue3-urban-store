import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../store/auth.store';

const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  // const userId = localStorage.getItem('userId');
  // localStorage.setItem('lastPath', to.path);
  const authStore = useAuthStore();
  await authStore.checkAuthStatus();

  if (authStore.isUnauthenticated) {
    // return next({ name: 'home' });
    return next({ name: 'login' });
  }

  return next();
};

export default isAuthenticatedGuard;
