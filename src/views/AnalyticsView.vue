<script setup>
import { computed } from 'vue'
import { useGoalStore } from '../stores/goalStore'
import { useHabitStore } from '../stores/habitStore'
import { useJournalStore } from '../stores/journalStore'

const goalStore = useGoalStore()
const habitStore = useHabitStore()
const journalStore = useJournalStore()

// Mock logic for simple stats
const totalGoals = computed(() => goalStore.totalCount)
const completedGoals = computed(() => goalStore.completedCount)
const goalProgress = computed(() => goalStore.progress)

const totalHabits = computed(() => habitStore.totalCount)
const completedHabits = computed(() => habitStore.completedCount)
const habitProgress = computed(() => habitStore.progress)

const totalEntries = computed(() => journalStore.recentEntries.length)

// Basic charts with Tailwind sizes instead of charting library (Task 2.4 says simple charts/progress)
// We'll just build pure CSS/HTML progress bars and stat cards for now.

</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex items-end justify-between">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Analytics Overview</h1>
        <p class="text-slate-500 mt-1">Track your progress across all activities.</p>
      </div>
    </div>

    <!-- Stat Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Goals Stat -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-500">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <span class="text-3xl font-bold text-slate-800">{{ goalProgress }}%</span>
        </div>
        <h3 class="text-lg font-bold text-slate-700">Goal Progress</h3>
        <p class="text-slate-500 text-sm mt-1">{{ completedGoals }} of {{ totalGoals }} completed</p>
        
        <div class="mt-4 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div class="h-full bg-indigo-500 rounded-full transition-all duration-500" :style="{ width: `${goalProgress}%` }"></div>
        </div>
      </div>

      <!-- Habits Stat -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-500">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          </div>
          <span class="text-3xl font-bold text-slate-800">{{ habitProgress }}%</span>
        </div>
        <h3 class="text-lg font-bold text-slate-700">Daily Habits</h3>
        <p class="text-slate-500 text-sm mt-1">{{ completedHabits }} of {{ totalHabits }} checked today</p>
        
        <div class="mt-4 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div class="h-full bg-emerald-500 rounded-full transition-all duration-500" :style="{ width: `${habitProgress}%` }"></div>
        </div>
      </div>

      <!-- Journal Stat -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-500">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          </div>
          <span class="text-3xl font-bold text-slate-800">{{ totalEntries }}</span>
        </div>
        <h3 class="text-lg font-bold text-slate-700">Journal Entries</h3>
        <p class="text-slate-500 text-sm mt-1">Total moments reflected</p>
      </div>
    </div>

    <!-- Recent Activity Highlights -->
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h2 class="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Productivity Summary</h2>
      
      <div class="space-y-6">
        <div class="flex gap-4 items-start">
          <div class="mt-1 bg-indigo-100 text-indigo-600 p-2 rounded-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div>
            <h4 class="font-bold text-slate-800">Goal Focus</h4>
            <p class="text-slate-600 text-sm mt-1">You have completed {{ completedGoals }} out of {{ totalGoals }} goals. Keep pushing toward your major milestones.</p>
          </div>
        </div>

        <div class="flex gap-4 items-start">
          <div class="mt-1 bg-emerald-100 text-emerald-600 p-2 rounded-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div>
            <h4 class="font-bold text-slate-800">Habit Consistency</h4>
            <p class="text-slate-600 text-sm mt-1">Your completion rate for today's habits is {{ habitProgress }}%. Make sure to check off the remaining items!</p>
          </div>
        </div>
        
        <div class="flex gap-4 items-start">
           <div class="mt-1 bg-amber-100 text-amber-600 p-2 rounded-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
          </div>
          <div>
            <h4 class="font-bold text-slate-800">Mindfulness</h4>
            <p class="text-slate-600 text-sm mt-1">You've recorded {{ totalEntries }} reflections so far. Journaling regularly helps maintain focus and emotional balance.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../assets/main.css";
</style>
