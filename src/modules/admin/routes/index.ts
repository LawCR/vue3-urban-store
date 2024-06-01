import isAdminGuard from '@/modules/auth/guards/is-admin.guard';
import type { RouteRecordRaw } from 'vue-router';

export const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  name: 'admin',
  beforeEnter: [isAdminGuard],
  component: () => import('../layouts/AdminLayout.vue'),
  redirect: { name: 'admin-dashboard' },
  children: [
    {
      path: 'dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: 'products',
      name: 'admin-products',
      component: () => import('../views/ProductsView.vue'),
    },
    {
      path: 'products/:productId',
      name: 'admin-product-detail',
      component: () => import('../views/ProductDetailsView.vue'),
      props: true,
    },
  ],
};
