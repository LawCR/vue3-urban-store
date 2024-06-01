import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../store/auth.store';

const isAdminGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();
  await authStore.checkAuthStatus();

  if (!authStore.isAuthenticated) {
    return next({ name: `login`, query: { redirect: to.fullPath } });
  }

  if (!authStore.isAdmin) {
    return next({ name: 'home' });
  }

  return next();
};

export default isAdminGuard;
