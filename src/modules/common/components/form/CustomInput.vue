<template>
  <div>
    <label for="title" class="form-label">{{ label }}</label>
    <input :type="type" :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value || (type === 'number' ? 1 : ''))"
      @blur="$emit('blur')" :class="['form-control', {
        'border-red-500': error
      }]" />
    <span class="text-red-500" v-if="error">{{ error }}</span>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  label: string;
  modelValue: string | Number;
  error?: string;
  type?: 'text' | 'number';
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  error: ''
});

defineEmits(['update:modelValue', 'blur']);
</script>

<style scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}

.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>