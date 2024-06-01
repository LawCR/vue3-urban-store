<template>

  <div class="bg-white p-5 rounded shadow-md">
    <div class=" flex items-center justify-between pb-4">
      <h1 class="text-2xl font-semibold text-gray-800">Gestión de Productos</h1>
      <RouterLink to="/admin/products/create"
        class="flex items-center justify-center h-10 px-4 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">
        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span class="ml-2 leading-none">Nuevo Producto</span>
      </RouterLink>
    </div>
    <div class="w-full">
      <div class="shadow overflow-hidden rounded border-b border-gray-200">
        <table class="min-w-full bg-white">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="w-20 text-left py-3 pl-4 uppercase font-semibold text-sm">Imagen</th>
              <th class="flex-1 text-left py-3 px-4 uppercase font-semibold text-sm">Título</th>
              <th class="w-28 text-left py-3 px-4 uppercase font-semibold text-sm">Precio</th>
              <th class="w-60 text-left py-3 px-4 uppercase font-semibold text-sm">Tallas</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr v-for="(product, index) in products" :key="product.id"
              :class="index % 2 === 0 ? 'bg-gray-100 hover:bg-gray-200 transition-all duration-200' : 'hover:bg-gray-200 transition-all duration-200'">
              <td class="text-left py-3 px-4">
                <img :src="product.images[0]" :alt="product.title" class="h-11 w-11 object-cover rounded-md">
              </td>
              <td class="text-left py-3 px-4">
                <RouterLink :to="{ name: 'admin-product-detail', params: { productId: product.id } }"
                  class="hover:text-blue-500 hover:underline">{{ product.title }}</RouterLink>
              </td>
              <td class="text-left py-3 px-4">
                <span class="text-sm">{{ formatCurrency(product.price) }}</span>
              </td>
              <td class="text-left py-3 px-4">
                <div class="flex flex-wrap gap-1">
                  <p v-for="size in product.sizes" :key="`${product.id} - ${size}`"
                    class="bg-blue-200 text-blue-600 py-2 px-3 rounded-md text-xs">
                    {{
                      size }}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <ButtonsPagination :has-more-pages="!!products && products?.length === maxProductsByPage" :is-first-page="page === 1"
    :page="page" />
</template>

<script setup lang="ts">
import { formatCurrency } from '@/modules/common/helpers/formats';
import { getProductsPaginatedAction } from '@/modules/products/actions';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { watchEffect } from 'vue';
import ButtonsPagination from '@/modules/common/components/ButtonsPagination.vue';
import { usePagination } from '@/modules/common/composables/usePagination';

const { page, maxProductsByPage } = usePagination();
const queryClient = useQueryClient();
const { data: products } = useQuery({
  queryKey: ['products', { page }],
  queryFn: () => getProductsPaginatedAction(page.value, maxProductsByPage.value),
  staleTime: 1000 * 60 * 5,
})


watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['products', { page: page.value + 1 }],
    queryFn: () => getProductsPaginatedAction(page.value + 1, maxProductsByPage.value),
  })
});
</script>

<style scoped></style>