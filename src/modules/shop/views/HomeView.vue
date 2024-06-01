<template>
  <div class="pt-32  bg-white">
    <h1 class="text-center text-2xl font-bold text-gray-800">Todos los Productos</h1>
  </div>
  <!-- Tab Menu -->
  <div
    class="flex flex-wrap items-center  overflow-x-auto overflow-y-hidden py-10 justify-center   bg-white text-gray-800">
    <a rel="noopener noreferrer" href="#" class="flex items-center flex-shrink-0 px-5 py-3 space-x-2 text-gray-600">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
      <span>Zapatillas</span>
    </a>
    <a rel="noopener noreferrer" href="#"
      class="flex items-center flex-shrink-0 px-5 py-3 space-x-2 rounded-t-lg text-gray-900">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
      <span>Camisas</span>
    </a>
    <a rel="noopener noreferrer" href="#" class="flex items-center flex-shrink-0 px-5 py-3 space-x-2  text-gray-600">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
        <polygon
          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
        </polygon>
      </svg>
      <span>Polos</span>
    </a>
    <a rel="noopener noreferrer" href="#" class="flex items-center flex-shrink-0 px-5 py-3 space-x-2  text-gray-600">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
        <circle cx="12" cy="12" r="10"></circle>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
      </svg>
      <span>Gorras</span>
    </a>
  </div>

  <!-- <p>{{ data }}</p> -->
  <!-- Product List -->
  <ProductList v-if="products" :products="products" />
  <div v-else class="bg-gray-100 h-full flex-1 flex flex-col justify-center items-center gap-1">
    <div
      class="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent rounded-full text-blue-500"
      aria-label="loading">
    </div>
    <h1 class="text-gray-600">Cargando Productos...</h1>
  </div>
  <ButtonsPagination :has-more-pages="!!products && products?.length === maxProducts" :is-first-page="page === 1"
    :page="page" />
</template>

<script setup lang="ts">
import ButtonsPagination from '@/modules/common/components/ButtonsPagination.vue';
import { getProductsPaginatedAction } from '@/modules/products/actions';
import ProductList from '@/modules/products/components/ProductList.vue';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { ref, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const page = ref(Number(route.query.page) || 1);
const maxProducts = ref(12);

const queryClient = useQueryClient();
const { data: products } = useQuery({
  queryKey: ['products', { page }],
  queryFn: () => getProductsPaginatedAction(page.value, maxProducts.value),
  staleTime: 1000 * 60 * 5,
})

watch(() => route.query.page, (newPage) => {
  page.value = Number(newPage) || 1;
  window.scrollTo({
    top: 50,
    behavior: 'smooth',
  });
});

watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['products', { page: page.value + 1 }],
    queryFn: () => getProductsPaginatedAction(page.value + 1, maxProducts.value),
  })
});
</script>

<style scoped></style>