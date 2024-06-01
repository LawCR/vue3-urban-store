import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export const usePagination = (productsByPage: number = 12) => {
  const route = useRoute();
  const page = ref(Number(route.query.page) || 1);
  const maxProductsByPage = ref(productsByPage);

  watch(
    () => route.query.page,
    (newPage) => {
      page.value = Number(newPage) || 1;
      window.scrollTo({
        top: 50,
        behavior: 'smooth',
      });
    },
  );

  return {
    page,
    maxProductsByPage,
  };
};
