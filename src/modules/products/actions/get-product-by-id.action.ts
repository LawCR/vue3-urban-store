import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/product.interface';

export const getProductIdAction = async (
  productId: string,
): Promise<Product> => {
  if (productId === 'create') {
    return {
      id: '',
      title: '',
      slug: '',
      description: '',
      price: 0,
      stock: 0,
      gender: '',
      images: [],
      sizes: [],
      isActive: true,
      tags: [],
      user: {} as any,
    };
  }

  try {
    const { data } = await tesloApi.get<Product>(`/products/${productId}`);
    // console.log(data);
    if (!data) {
      throw new Error(`No se encontró el producto con id: ${productId}`);
    }

    return data;
  } catch (error) {
    console.log(error);

    throw new Error(
      `Hubo un error al obtener el producto con id: ${productId}`,
    );
  }
};
