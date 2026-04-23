<template>
  <div class="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl shadow-neutral-200/50 dark:shadow-none border border-neutral-100 dark:border-neutral-700 overflow-hidden transition-colors duration-200">
    <div v-if="$slots.header" class="px-6 py-4 border-b border-neutral-50 dark:border-neutral-700">
      <slot name="header" />
    </div>
    <div class="p-6">
      <slot />
    </div>
    <div v-if="$slots.footer" class="px-6 py-4 bg-neutral-50/50 dark:bg-neutral-800/50 border-t border-neutral-50 dark:border-neutral-700">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.card {
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
