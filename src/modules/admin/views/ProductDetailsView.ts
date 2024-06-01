import CustomInput from '@/modules/common/components/form/CustomInput.vue';
import CustomInputSelect from '@/modules/common/components/form/CustomInputSelect.vue';
import CustomInputTextArea from '@/modules/common/components/form/CustomInputTextArea.vue';
import {
  createUpdateProductAction,
  getProductIdAction,
} from '@/modules/products/actions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { useFieldArray, useForm } from 'vee-validate';
import { defineComponent, ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import * as yup from 'yup';

const validationSchema = yup.object({
  title: yup
    .string()
    .required('Este campo es obligatorio!')
    .min(3, 'Son 3 minimo oee!'),
  slug: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required().positive(),
  stock: yup.number().required().positive().integer(),
  gender: yup.string().required().oneOf(['men', 'women', 'kids', 'unisex']),
});

// interface FormState {
//   title: string;
//   slug: string;
//   description: string;
//   price: number;
//   stock: number;
//   gender: string;
// }

const genderOptions = [
  {
    label: 'Niño',
    value: 'kids',
  },
  {
    label: 'Mujer',
    value: 'women',
  },
  {
    label: 'Hombre',
    value: 'men',
  },
];

export default defineComponent({
  components: {
    CustomInput,
    CustomInputTextArea,
    CustomInputSelect,
  },
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();

    const queryClient = useQueryClient();
    const {
      data: product,
      isError,
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['product', props.productId],
      queryFn: () => getProductIdAction(props.productId),
      retry: false,
    });

    const {
      mutate,
      isPending,
      isError: isMutationError,
    } = useMutation({
      mutationFn: createUpdateProductAction,
      // onError: (error) => {
      //   toast.error('Productos', {
      //     description: `Hubo un error al ${props.productId ? 'actualizar' : 'guardar'}`,
      //   });
      //   router.replace({ name: 'admin-products' });
      // },
      onSuccess: ({ data }) => {
        resetForm({
          values: {
            ...data,
          },
        });

        replaceFiles([]);

        queryClient.invalidateQueries({
          queryKey: ['products'],
        });
        if (props.productId === 'create') {
          toast.success('Productos', {
            description: 'Producto guardado exitosamente!',
          });
          router.replace({
            name: 'admin-product-detail',
            params: { productId: data.id },
          });

          return;
        }

        toast.success('Productos', {
          description: 'Producto actualizado exitosamente!',
        });
      },
    });

    const { values, defineField, errors, handleSubmit, resetForm, meta } =
      useForm({
        validationSchema,
        initialValues: {
          title: '',
          slug: '',
          description: '',
          price: 1,
          stock: 1,
          gender: '',
          // images: [],
          // sizes: [],
        },
      });

    const [title, titleAttrs] = defineField('title');
    const [slug, slugAttrs] = defineField('slug');
    const [description, descriptionAttrs] = defineField('description');
    const [price, priceAttrs] = defineField('price');
    const [stock, stockAttrs] = defineField('stock');
    const [gender, genderAttrs] = defineField('gender');

    const { fields: images, remove: removeImage } =
      useFieldArray<string>('images');
    const {
      fields: sizes,
      remove: removeSize,
      push: pushSize,
    } = useFieldArray<string>('sizes');
    const {
      fields: imageFiles,
      remove: removeFile,
      push: pushFile,
      replace: replaceFiles,
    } = useFieldArray<File>('files');

    // const imageFiles = ref<File[]>([]);

    const onSubmit = handleSubmit(async (values) => {
      mutate(values);
    });

    const toggleSize = (size: string) => {
      const currentSizes = sizes.value.map((s) => s.value);
      const hasSize = currentSizes.includes(size);

      if (hasSize) {
        removeSize(currentSizes.indexOf(size));
      } else {
        pushSize(size);
      }
    };

    const onFileChange = (e: Event) => {
      const fileInput = e.target as HTMLInputElement;
      const fileList = fileInput.files;

      if (fileList?.length === 0 || !fileList) return;

      for (const image of fileList) {
        // imageFiles.value.push(image);
        pushFile(image);
      }
    };

    const onRemoveFile = (index: number) => {
      removeFile(index);
    };

    const onRemoveImage = (index: number) => {
      removeImage(index);
    };

    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        toast.error('Hubo un error al obtener el producto');
        router.replace({ name: 'admin-products' });
      }
    });

    watch(isMutationError, () => {
      if (isMutationError.value) {
        toast.error('Productos', {
          description: `Hubo un error al ${props.productId ? 'actualizar' : 'guardar'}`,
        });
        // router.replace({ name: 'admin-products' });
      }
    });

    watch(
      () => props.productId,
      () => {
        refetch();
      },
      {
        immediate: true,
      },
    );

    // Cuando cambia el producto, carga los valores en el formulario
    watch(
      product,
      () => {
        if (!product) return;

        resetForm({
          values: product.value,
        });
      },
      {
        deep: true,
        immediate: true,
      },
    );

    return {
      // Properties
      values,
      errors,
      meta,
      isPending,
      isLoading,

      title,
      titleAttrs,
      slug,
      slugAttrs,
      description,
      descriptionAttrs,
      price,
      priceAttrs,
      stock,
      stockAttrs,
      gender,
      genderAttrs,

      images,
      sizes,
      imageFiles,

      // Getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      genderOptions,

      // Actions
      onSubmit,
      toggleSize,
      hasSize: (size: string) => {
        const currentSizes = sizes.value.map((s) => s.value);
        return currentSizes.includes(size);
      },
      onFileChange,
      temporalImageUrl: (file: File) => URL.createObjectURL(file),
      onRemoveFile,
      onRemoveImage,
    };
  },
});
