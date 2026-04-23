<script setup>
import HabitInput from '../components/habits/HabitInput.vue'
import HabitList from '../components/habits/HabitList.vue'
import BaseCard from '../components/base/BaseCard.vue'
</script>

<template>
  <div class="habits-page">
    <BaseCard>
      <header class="mb-8">
        <h1 class="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Daily Habits</h1>
        <p class="text-neutral-500 dark:text-neutral-400">Consistency is the key to success.</p>
      </header>
      
      <HabitInput />
      <HabitList />
    </BaseCard>
  </div>
</template>
