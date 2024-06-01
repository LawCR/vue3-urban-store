import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/product.interface';

export const createUpdateProductAction = async (
  product: Partial<Product & { files: File[] }>,
) => {
  const formData = new FormData();
  formData.append('title', product.title || '');
  formData.append('slug', product.slug || '');
  formData.append('description', product.description || '');
  formData.append('price', product.price?.toString() || '');
  formData.append('stock', product.stock?.toString() || '');
  formData.append('gender', product.gender || '');

  product.sizes?.forEach(function (size) {
    formData.append('sizes[]', size);
  });
  product.files?.forEach(function (file) {
    formData.append('files', file);
  });

  if (product.id) {
    product.images?.forEach(function (image) {
      formData.append('images[]', image);
    });
    return await updateProductAction(product.id, formData);
  }

  return await createProductAction(formData);
};

const updateProductAction = async (
  productId: string,
  productData: FormData,
) => {
  try {
    return await tesloApi.patch<Product>(`/products/${productId}`, productData);
  } catch (error) {
    console.log(error);
    throw new Error('Hubo un error al actualizar el producto');
  }
};

const createProductAction = async (productData: FormData) => {
  // const filesToUpload = images.filter(image => image instanceof File)
  try {
    return await tesloApi.post<Product>('/products', productData);
  } catch (error) {
    console.log(error);
    throw new Error('Hubo un error al guardar el producto');
  }
};
