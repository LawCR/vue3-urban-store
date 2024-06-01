<template>
  <div class="flex justify-center pt-8 pb-10 bg-gray-100 gap-2">
    <button :disabled="isFirstPage" @click="$router.push({ query: { page: page - 1 } })"
      class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-500 disabled:bg-gray-300 hover:bg-blue-600">
      <ArrowLeftIcon />
      <span>Anterior</span>
    </button>
    <button :disabled="!hasMorePages" @click="$router.push({ query: { page: page + 1 } })"
      class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-500 disabled:bg-gray-300 hover:bg-blue-600">
      <span>Siguiente</span>
      <ArrowRightIcon />
    </button>
  </div>
</template>

<script setup lang="ts">
import ArrowLeftIcon from '@/icons/ArrowLeftIcon.vue';
import ArrowRightIcon from '@/icons/ArrowRightIcon.vue';

interface Props {
  page: number;
  isFirstPage: boolean;
  hasMorePages: boolean;
}

defineProps<Props>();


</script>

<style scoped></style>