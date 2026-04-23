<script setup>
defineProps({
  checked: {
    type: Boolean,
    default: false
  }
})  

defineEmits(['toggle'])
</script>
<template>
    <div
      @click="$emit('toggle')"
      class="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-md border-2 transition-all duration-200"
      :class="[
        checked
          ? 'bg-green-500 border-green-500 dark:bg-emerald-500 dark:border-emerald-500'
          : 'border-neutral-300 dark:border-neutral-600 hover:border-primary-500 dark:hover:border-primary-400 cursor-pointer'
      ]"
    >
      <svg
        v-if="checked"
        class="checkbox-icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="3"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.checkbox-icon {
  @apply w-4 h-4 text-white;
}
</style>
