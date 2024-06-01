<template>
  <div class="bg-white px-5 py-2 rounded">
    <!-- <h1 class="text-2xl">Producto: <small class="text-blue-500">{{ title }}</small></h1> -->
    <h1 class="text-2xl mt-2 font-semibold">{{ productId === 'create' ? 'Registrar Producto' : 'Actualizar Producto'
      }}</h1>
    <hr class="my-4" />
  </div>

  <form @submit="onSubmit" class="grid grid-cols-1 sm:grid-cols-2 bg-white px-5 gap-x-5">
    <div class="first-col">
      <!-- Primera parte del formulario -->
      <div class="mb-4">
        <CustomInput v-model="title" v-bind="titleAttrs" :error="errors.title" label="Título" />
      </div>

      <div class="mb-4">
        <CustomInput v-model="slug" v-bind="slugAttrs" :error="errors.slug" label="Slug" />
      </div>

      <div class="mb-4">
        <CustomInputTextArea v-model="description" v-bind="descriptionAttrs" :error="errors.description"
          label="Descripción" />
      </div>

      <div class="flex flex-row gap-3">
        <div class="mb-4 flex-1">
          <CustomInput v-model.number="price" v-bind="priceAttrs" :error="errors.price" label="Precio" type="number" />
        </div>

        <div class="mb-4 flex-1">
          <CustomInput v-model.number="stock" v-bind="stockAttrs" :error="errors.stock" label="Inventario"
            type="number" />
        </div>
      </div>

      <div class="mb-4">
        <label for="sizes" class="form-label">Tallas</label>
        <div class="flex flex-wrap gap-2">
          <button v-for="size in allSizes" :key="size" @click="toggleSize(size)" type="button" :class="['p-2 rounded w-14', {
            'bg-blue-500 text-white': hasSize(size),
            'bg-blue-100': !hasSize(size)
          }]">{{ size }}</button>
        </div>
        <!-- <button type="button" class="bg-blue-500 text-white p-2 rounded w-14 mr-2">S</button>
        <button type="button" class="bg-blue-500 text-white p-2 rounded w-14 mr-2">M</button> -->
      </div>
    </div>

    <!-- Segunda columna -->
    <div class="first-col">
      <div class="mb-4">
        <CustomInputSelect v-model.number="gender" v-bind="genderAttrs" :error="errors.gender" label="Género"
          :options="genderOptions" />
      </div>
      <!-- Upload image -->
      <div class="mb-4">
        <label for="image" class="form-label">Subir imagen</label>

        <input multiple type="file" id="image" class="form-control" accept="image/*" @change="onFileChange" />
        <div v-if="imageFiles.length > 0" class="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
          <div v-for="(imageFile, index) of imageFiles" :key="imageFile.value.name" class="relative">
            <img :src="temporalImageUrl(imageFile.value)" :alt="title"
              class="h-[150px] w-full rounded object-cover border-2" />
            <button @click="onRemoveFile(index)" type="button"
              class="bg-red-500 absolute top-3 right-3 text-white font-bold py-1 px-2 rounded">X</button>
          </div>
        </div>
      </div>
      <label for="stock" class="form-label">Imágenes</label>
      <!-- Row with scrollable horizontal -->
      <div v-if="images.length > 0"
        class="flex p-2 overflow-x-auto overflow-y-hidden space-x-8 w-full h-[270px] border rounded">
        <div v-for="(image, index) of images" :key="image.value" class="flex-shrink-0 relative">
          <img :src="image.value" :alt="title" class="w-[250px] h-[250px] rounded" />
          <button @click="onRemoveImage(index)" type="button"
            class="bg-red-500 absolute top-3 right-3 text-white font-bold py-1 px-2 rounded">X</button>
        </div>
      </div>

      <div v-else>
        <p class="text-gray-400 text-sm">No hay imágenes guardadas del producto.</p>
      </div>




      <!-- Botón para guardar -->
    </div>
    <div class="col-span-1 pt-4 sm:col-span-2 my-4 text-right border-t">
      <button :disabled="isPending || isLoading" type="submit"
        class="bg-blue-500 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded">
        Guardar
      </button>
    </div>
  </form>

  <div class="grid grid-cols-1 sm:grid-cols-1 mt-2">
    <pre class="bg-red-200 p-2 overflow-hidden">
      {{ JSON.stringify(errors, null, 2) }}
    </pre>
    <pre class="bg-blue-200 p-2 overflow-hidden">
      {{ JSON.stringify(values, null, 2) }}
    </pre>
    <pre class="bg-green-200 p-2 col-span-1 overflow-hidden">
      {{ JSON.stringify(meta, null, 2) }}
    </pre>
  </div>
</template>

<script src="./ProductDetailsView.ts" lang="ts"></script>

<style scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}
</style>