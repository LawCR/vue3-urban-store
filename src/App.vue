<template>
  <div>
    <VueQueryDevtools />
    <Toaster :duration="2500" position="top-right" rich-colors />
    <FullScreenLoadingBlocks v-if="authStore.isChecking" />
    <RouterView v-else />
    <!-- <FullScreenLoadingDots /> -->
  </div>
</template>

<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { Toaster } from 'vue-sonner';
import { useAuthStore } from './modules/auth/store/auth.store';
import { AuthStatus } from './modules/auth/interfaces';
import { useRoute, useRouter } from 'vue-router';
import FullScreenLoadingBlocks from './modules/common/components/FullScreenLoadingBlocks.vue';
// import FullScreenLoadingDots from './modules/common/components/FullScreenLoadingDots.vue';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
authStore.$subscribe((_, state) => {
  if (state.authStatus === AuthStatus.CHECKING) {
    authStore.checkAuthStatus();
    return
  }

  if (route.path.includes('/auth') && state.authStatus === AuthStatus.AUTHENTICATED) {
    // console.log('LLamo aqui 2')
    // console.log(route.query)
    router.replace({ name: 'home' });
    return
  }

}, {
  immediate: true,
})
</script>

<style scoped></style>