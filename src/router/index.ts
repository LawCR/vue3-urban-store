import { adminRoutes } from '@/modules/admin/routes';
import { authRoutes } from '@/modules/auth/routes';
import ShopLayout from '@/modules/shop/layouts/ShopLayout.vue';
import HomeView from '@/modules/shop/views/HomeView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: ShopLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: '/admin',
          name: 'admin',
          component: HomeView,
        },
        {
          path: 'product/:id',
          name: 'product',
          component: HomeView,
          // component: () => import('@/modules/shop/views/ProductView.vue'),
        },
        // {
        //   path: 'cart',
        //   name: 'cart',
        //   component: () => import('@/modules/shop/views/CartView.vue'),
        // },
        // {
        //   path: 'checkout',
        //   name: 'checkout',
        //   component: () => import('@/modules/shop/views/CheckoutView.vue'),
        // },
        // {
        //   path: 'order/:id',
        //   name: 'order',
        //   component: () => import('@/modules/shop/views/OrderView.vue'),
        // },
        // {
        //   path: 'profile',
        //   name: 'profile',
        //   component: () => import('@/modules/shop/views/ProfileView.vue'),
        // },
        // {
        //   path: 'login',
        //   name: 'login',
        //   component: () => import('@/modules/shop/views/LoginView.vue'),
        // },
        // {
        //   path: 'register',
        //   name: 'register',
        //   component: () => import('@/modules/shop/views/RegisterView.vue'),
        // },
        // {
        //   path: 'forgot-password',
        //   name: 'forgot-password',
        //   component: () => import('@/modules/shop/views/ForgotPasswordView.vue'),
        // },
        // {
        //   path: 'reset-password/:token',
        //   name: 'reset-password',
        //   component: () => import('@/modules/shop/views/ResetPasswordView.vue'),
        // },
        // {
        //   path: 'verify-email/:token',
        //   name: 'verify-email',
        //   component: () => import('@/modules/shop/views/VerifyEmailView.vue'),
        // },
        // {
        //   path: '404',
        //   name: '404',
        //   component: () => import('@/modules/shop/views/NotFoundView.vue'),
        // },
        // {
        //   path: '500',
        //   name: '500',
        //   component: () => import('@/modules/shop/views/ErrorView.vue'),
        // },
        // {
        //   path: '/:catchAll(.*)',
        //   redirect: { name: '404' },
        // }
      ],
    },
    // Auth Routes
    authRoutes,
    // Admin Routes
    adminRoutes,
  ],
});

export default router;
