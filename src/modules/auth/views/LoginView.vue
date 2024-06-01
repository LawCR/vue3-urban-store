<template>
  <h1 class="text-2xl font-semibold mb-4">Iniciar Sesión</h1>
  <form class='w-full sm:w-[450px]' @submit.prevent="onLogin">
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
    <div class='mb-3 flex items-center'>
      <input v-model="myForm.rememberMe" type='checkbox' id='rememberMe' name='rememberMe' class='text-blue-500' />
      <label class='text-gray-600 ml-2'>Recuérdame</label>
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
      <span class='text-gray-600'>¿Aún no tienes cuenta?&nbsp;</span>
      <RouterLink to='/auth/register' class='text-blue-500 hover:underline'>
        Regístrate aquí
      </RouterLink>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue';
import { useAuthStore } from '../store/auth.store';

const authStore = useAuthStore()
const isLoading = ref(false)
const emailInputRef = ref<HTMLInputElement | null>(null)
const passwordInputRef = ref<HTMLInputElement | null>(null)
const myForm = reactive({
  email: '',
  password: '',
  rememberMe: false,
})

const onLogin = async () => {
  if (myForm.email === '') {
    return emailInputRef.value?.focus()
  }
  if (myForm.password === '') {
    return passwordInputRef.value?.focus()
  }
  if (myForm.rememberMe) {
    localStorage.setItem('email', myForm.email)
  } else {
    localStorage.removeItem('email')
  }
  isLoading.value = true
  await authStore.login(myForm.email, myForm.password)
  isLoading.value = false
  // const isSuccess = await authStore.login(myForm.email, myForm.password)
  // if (!isSuccess) return
  // const path = localStorage.getItem('lastPath') || '/'
  // localStorage.setItem('userId', 'ABC-123')
  // router.replace(path)
}

watchEffect(() => {
  const email = localStorage.getItem('email')
  if (email) {
    myForm.email = email
    myForm.rememberMe = true
  }
})
</script>

<style scoped></style>