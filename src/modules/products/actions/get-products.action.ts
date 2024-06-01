import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/product.interface';

export const getProductsPaginatedAction = async (page: number = 1, limit: number = 12) => {
  try {
    const { data } = await tesloApi.get<Product[]>(
      `/products?limit=${limit}&offset=${(page - 1) * limit}`,
    );
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(
      'Ha ocurrido un error al obtener los productos. Por favor, inténtalo de nuevo.',
    );
  }
};
