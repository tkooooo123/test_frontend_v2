<template>
  <button class="e-btn rounded-2 cursor-pointer border-none text-4" :class="`e-btn-${color}`">
    {{ text }}
    <slot v-if="!text" />
  </button>
</template>

<script setup lang="ts">
interface Props {
  text?: string // 若有輸入時以此為主，若沒有就顯示 slot
  color?: 'success' | 'error' | 'warn' // 預設為 success
}

const props = withDefaults(defineProps<Props>(), {
  color: 'success'
})
</script>

<style scoped lang="scss">
.e-btn {
  height: 40px;
  padding: 0 16px;

  // success 綠
  &-success {
    background: #0e861e;
    color: white;
    font-weight: 600;
  }

  // error 紅
  &-error {
    background: #ae1c18;
    color: white;
    font-weight: 600;
  }

  // warn 黃
  &-warn {
    background: #f9c13f;
    color: black;
    font-weight: 600;
  }
}
</style>
