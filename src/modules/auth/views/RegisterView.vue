<template>
  <h1 class="text-2xl font-semibold mb-4">Crear Cuenta</h1>
  <form @submit.prevent="onRegister" class='w-full sm:w-[450px]'>
    <div className='mb-4'>
      <label className='block text-gray-600'>Nombres</label>
      <input v-model="myForm.firstName" ref="firstNameInputRef" type='text' id='firstName'
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autoComplete='off' autoFocus />
    </div>
    <div className='mb-4'>
      <label className='block text-gray-600'>Apellidos</label>
      <input v-model="myForm.lastName" ref="lastNameInputRef" type='text' id='lastName'
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autoComplete='off' autoFocus />
    </div>
    <div class='mb-4'>
      <label class='block text-gray-600'>Correo electrónico</label>
      <input v-model="myForm.email" ref="emailInputRef" type='email' id='email' name='email'
        class='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500' />
    </div>
    <div class='mb-4 relative '>
      <label class='block text-gray-600'>Contraseña</label>
      <input v-model="myForm.password" ref="passwordInputRef" type="password" id='password' name='password'
        class='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 pr-10' />
    </div>
    <div class='mb-4 text-blue-500'>
      <a href='#' class='hover:underline'>
        ¿Olvidaste tu contraseña?
      </a>
    </div>
    <button type='submit' :disabled="isLoading"
      class="shadow text-sm font-semibold bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded transition-all  w-full tracking-wider disabled:bg-gray-400">
      Ingresar
    </button>
    <div class='my-3 text-center'>
      <span class='text-gray-600'>¿Ya tienes cuenta?&nbsp;</span>
      <RouterLink to='/auth/login' class='text-blue-500 hover:underline'>
        Iniciar sesión
      </RouterLink>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuthStore } from '../store/auth.store';


const authStore = useAuthStore()
const isLoading = ref(false)
const firstNameInputRef = ref<HTMLInputElement | null>(null)
const lastNameInputRef = ref<HTMLInputElement | null>(null)
const emailInputRef = ref<HTMLInputElement | null>(null)
const passwordInputRef = ref<HTMLInputElement | null>(null)
const myForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
})

const onRegister = async () => {
  if (myForm.firstName === '') {
    return firstNameInputRef.value?.focus()
  }
  if (myForm.lastName === '') {
    return lastNameInputRef.value?.focus()
  }
  if (myForm.email === '') {
    return emailInputRef.value?.focus()
  }
  if (myForm.password === '') {
    return passwordInputRef.value?.focus()
  }

  isLoading.value = true
  await authStore.register(myForm.firstName, myForm.lastName, myForm.email, myForm.password)
  isLoading.value = false
}
</script>

<style scoped></style>