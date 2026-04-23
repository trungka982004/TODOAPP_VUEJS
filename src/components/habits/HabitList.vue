<script setup>
import { storeToRefs } from "pinia"
import { useHabitStore } from "../../stores/habitStore"
import habitItem from "./HabitItem.vue"
import habitFilters from "./HabitFilters.vue"
import BaseProgressBar from "../base/BaseProgressBar.vue"

const props = defineProps({
  limit: {
    type: Number,
    default: 0
  }
})

import draggable from "vuedraggable"
import { computed } from "vue"

const habitStore = useHabitStore()
const { filteredHabits, totalCount, progress, filter } = storeToRefs(habitStore)

const draggableHabits = computed({
  get: () => props.limit ? filteredHabits.value.slice(0, props.limit) : filteredHabits.value,
  set: (val) => {
    // Only allow drag update if we are not limited and viewing 'all'
    if (!props.limit && filter.value === 'all') {
      habitStore.updateHabitsOrder(val)
    }
  }
})
</script>

<template>
  <div class="space-y-6">
    <!-- Progress Bar Section -->
    <BaseProgressBar 
      v-if="totalCount > 0"
      :progress="progress"
      label="habit Completion Progress"
    />
    <habitFilters v-if="!limit" />
    <!-- habit Items List -->
    <draggable
      v-if="draggableHabits.length > 0"
      v-model="draggableHabits"
      item-key="id"
      class="space-y-3"
      handle=".drag-handle"
      ghost-class="opacity-50"
      animation="200"
    >
      <template #item="{element}">
        <habitItem
          :key="element.id"
          :habit="element"
        />
      </template>
    </draggable>

    <!-- Empty State -->
    <div 
      v-else 
      class="text-center py-12 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border-2 border-dashed border-neutral-200 dark:border-neutral-700 transition-colors duration-200"
    >
      <p class="text-neutral-500 dark:text-neutral-400 font-medium">No habits found. Start by adding one above!</p>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
