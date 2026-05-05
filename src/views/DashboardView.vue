<script setup>
import { onMounted, ref, computed } from 'vue'
import { useGoalStore } from "../stores/goalStore"
import { useHabitStore } from "../stores/habitStore"
import { useJournalStore } from "../stores/journalStore"
import BaseCard from "../components/base/BaseCard.vue"
import GoalList from "../components/goals/GoalList.vue"
import HabitList from "../components/habits/HabitList.vue"

import { useSettingStore } from "../stores/settingStore"
import AICoachCard from "../components/dashboard/AICoachCard.vue"
import PomodoroTimer from "../components/dashboard/PomodoroTimer.vue"
import GamificationBadges from "../components/dashboard/GamificationBadges.vue"
import { notificationService } from "../services/notificationService"

const goalStore = useGoalStore()
const habitStore = useHabitStore()
const journalStore = useJournalStore()
const settingStore = useSettingStore()

const searchQuery = ref('')
const isSearchFocused = ref(false)

const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return { goals: [], habits: [] }
  const query = searchQuery.value.toLowerCase()
  return {
    goals: goalStore.goals.filter(g => 
      g.title.toLowerCase().includes(query) || 
      (g.description && g.description.toLowerCase().includes(query))
    ).slice(0, 5),
    habits: habitStore.habits.filter(h => 
      h.name.toLowerCase().includes(query)
    ).slice(0, 5)
  }
})

const handleBlur = () => {
  setTimeout(() => {
    isSearchFocused.value = false
  }, 200)
}

const isCreateDropdownOpen = ref(false)

const closeCreateDropdown = () => {
  setTimeout(() => {
    isCreateDropdownOpen.value = false
  }, 200)
}
onMounted(async () => {
  await Promise.all([
    goalStore.fetchGoals(),
    habitStore.fetchHabits(),
    journalStore.fetchJournals()
  ])
  
  // Kiểm tra và gửi thông báo nếu cần (dựa trên thói quen và mục tiêu chưa xong)
  notificationService.checkAndNotify(goalStore.goals, habitStore.habits)
})
</script>

<template>
  <div class="space-y-8">
    <header class="space-y-6">
      <div class="flex items-center justify-between gap-4 w-full relative z-50">
        <div class="relative flex-1">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            v-model="searchQuery"
            @focus="isSearchFocused = true"
            @blur="handleBlur"
            class="block w-full pl-10 pr-3 py-2.5 border border-neutral-300 dark:border-neutral-700 rounded-lg leading-5 bg-white dark:bg-neutral-800 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out shadow-sm" 
            placeholder="Search tasks, habits, goals..." 
          />
          
          <!-- Search Results Dropdown -->
          <div v-if="searchQuery.trim() && isSearchFocused" class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-800 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 z-50 overflow-hidden">
            <div v-if="searchResults.goals.length === 0 && searchResults.habits.length === 0" class="p-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
              No results found for "{{ searchQuery }}"
            </div>
            
            <div v-else class="max-h-96 overflow-y-auto">
              <!-- Goals -->
              <div v-if="searchResults.goals.length > 0" class="p-2">
                <h3 class="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider px-3 mb-2 mt-1">Goals</h3>
                <ul class="space-y-1">
                  <li v-for="goal in searchResults.goals" :key="goal.id">
                    <RouterLink to="/goals" class="block px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                      <div class="flex items-center gap-2">
                        <span class="text-sm font-medium text-neutral-800 dark:text-neutral-200">{{ goal.title }}</span>
                        <span v-if="goal.status === 'completed'" class="text-xs text-emerald-500">✓ Completed</span>
                      </div>
                    </RouterLink>
                  </li>
                </ul>
              </div>
              
              <div v-if="searchResults.goals.length > 0 && searchResults.habits.length > 0" class="h-px bg-neutral-200 dark:bg-neutral-700 mx-2"></div>
              
              <!-- Habits -->
              <div v-if="searchResults.habits.length > 0" class="p-2">
                <h3 class="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider px-3 mb-2 mt-1">Habits</h3>
                <ul class="space-y-1">
                  <li v-for="habit in searchResults.habits" :key="habit.id">
                    <RouterLink to="/habits" class="block px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                      <div class="flex items-center gap-2">
                        <span class="text-sm font-medium text-neutral-800 dark:text-neutral-200">{{ habit.name }}</span>
                        <span class="text-xs text-indigo-500">🔥 {{ habit.streak || 0 }} streak</span>
                      </div>
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="relative">
          <button 
            @click="isCreateDropdownOpen = !isCreateDropdownOpen"
            @blur="closeCreateDropdown"
            class="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out whitespace-nowrap"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Create new
            <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-4 w-4 transition-transform duration-200" :class="{ 'rotate-180': isCreateDropdownOpen }" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          
          <div v-if="isCreateDropdownOpen" class="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 z-50 overflow-hidden">
            <div class="py-1">
              <RouterLink to="/goals" class="flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700">
                <span class="mr-2">🎯</span> New Goal / Task
              </RouterLink>
              <RouterLink to="/habits" class="flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700">
                <span class="mr-2">🌱</span> New Habit
              </RouterLink>
              <RouterLink to="/journal" class="flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700">
                <span class="mr-2">📝</span> New Journal Entry
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      
      <!-- AI Goal Coach -->
      <AICoachCard v-if="settingStore.aiActive" class="w-full" />
      
      <!-- Phase 2 & Phase 3 Features (Side by Side) -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PomodoroTimer class="h-full" />
        <GamificationBadges class="h-full" />
      </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Goals Overview -->
      <section class="h-full">
        <BaseCard class="h-full relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 border-none text-white shadow-lg shadow-indigo-500/30 dashboard-purple-card">
          <!-- Decorative background elements -->
          <div class="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10 blur-2xl pointer-events-none"></div>
          <div class="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-black opacity-10 blur-xl pointer-events-none"></div>
          
          <div class="relative z-10 space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-bold flex items-center gap-2">
                <span>🎯</span> Recent Goals
              </h2>
              <RouterLink to="/goals" class="text-xs font-medium px-3 py-1.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm text-white">View All</RouterLink>
            </div>
            <GoalList :limit="3" />
          </div>
        </BaseCard>
      </section>

      <!-- Habits Overview -->
      <section class="h-full">
        <BaseCard class="h-full relative overflow-hidden bg-gradient-to-br from-purple-600 to-indigo-500 border-none text-white shadow-lg shadow-purple-500/30 dashboard-purple-card">
          <!-- Decorative background elements -->
          <div class="absolute top-0 left-0 -ml-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10 blur-2xl pointer-events-none"></div>
          <div class="absolute bottom-0 right-0 -mr-8 -mb-8 w-24 h-24 rounded-full bg-black opacity-10 blur-xl pointer-events-none"></div>

          <div class="relative z-10 space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-bold flex items-center gap-2">
                <span>🌱</span> Daily Habits
              </h2>
              <RouterLink to="/habits" class="text-xs font-medium px-3 py-1.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm text-white">View All</RouterLink>
            </div>
            <HabitList :limit="3" />
          </div>
        </BaseCard>
      </section>
    </div>
  </div>
</template>

<style>
/* Override styles for components inside the purple dashboard cards */
.dashboard-purple-card .text-neutral-500 {
  color: rgba(255, 255, 255, 0.8) !important;
}
.dashboard-purple-card .bg-neutral-200 {
  background-color: rgba(255, 255, 255, 0.2) !important;
}
.dashboard-purple-card .bg-neutral-50 {
  background-color: rgba(255, 255, 255, 0.1) !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
}

/* Make inner items glassmorphic */
.dashboard-purple-card .goal-item, 
.dashboard-purple-card .habit-item {
  background-color: rgba(255, 255, 255, 0.15) !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.dashboard-purple-card .goal-item:hover, 
.dashboard-purple-card .habit-item:hover {
  background-color: rgba(255, 255, 255, 0.25) !important;
  border-color: rgba(255, 255, 255, 0.4) !important;
}

/* Force text colors inside the card to white */
.dashboard-purple-card .text-neutral-900 {
  color: #ffffff !important;
}

/* Completed items text */
.dashboard-purple-card .text-neutral-400 {
  color: rgba(255, 255, 255, 0.5) !important;
}

/* Unchecked Checkbox */
.dashboard-purple-card .border-neutral-300 {
  border-color: rgba(255, 255, 255, 0.4) !important;
}
.dashboard-purple-card .border-neutral-300:hover {
  border-color: rgba(255, 255, 255, 0.8) !important;
}
</style>
