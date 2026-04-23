<script setup>
import GoalList from '../components/goals/GoalList.vue'
import GoalInput from '../components/goals/GoalInput.vue';
import BaseCard from '../components/base/BaseCard.vue';
</script>

<template>
  <div class="goals-page">
    <BaseCard>
      <header class="mb-8">
        <h1 class="text-2xl font-bold text-neutral-800 dark:text-neutral-100">My Long-term Goals</h1>
        <p class="text-neutral-500 dark:text-neutral-400">Track and achieve your main objectives.</p> 
      </header>
      
      <GoalInput />
      <GoalList />
    </BaseCard>
  </div>
</template>