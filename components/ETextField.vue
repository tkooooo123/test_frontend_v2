<template>
  <div class="flex flex-col items-start">
    <label class="text-white" :for="id">
      {{ label }}
    </label>
    <input class="w-full h-7 box-border bg-#2a2a2a mt-1 rounded-2 text-white" :id="id" :type="type" :value="modelValue"
    v-bind="$attrs"   
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  id?: string // 若使用者有輸入，以使用者輸入的為主，若沒有請產出一個唯一 ID
  label?: string
  modelValue?: string | number | null
  type?: string
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<style scoped lang="scss"></style>
