<script setup>
import { ref } from 'vue'
import { useJournalStore } from '../stores/journalStore'
import BaseButton from '../components/base/BaseButton.vue'

const journalStore = useJournalStore()

const currentEntry = ref('')
const currentMood = ref('neutral')
const isSubmitting = ref(false)

const moods = [
  { value: 'happy', icon: '😊', label: 'Happy', color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
  { value: 'neutral', icon: '😐', label: 'Neutral', color: 'bg-slate-100 text-slate-700 border-slate-300' },
  { value: 'sad', icon: '😔', label: 'Sad', color: 'bg-rose-100 text-rose-700 border-rose-300' }
]

const addEntry = () => {
  if (currentEntry.value.trim() && !isSubmitting.value) {
    isSubmitting.value = true
    journalStore.addEntry(currentEntry.value, currentMood.value)
    currentEntry.value = ''
    currentMood.value = 'neutral'
    setTimeout(() => {
      isSubmitting.value = false
    }, 300)
  }
}

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date);
}

const getMoodStyle = (moodValue) => {
  const m = moods.find(m => m.value === moodValue)
  return m ? m.color : 'bg-slate-100 text-slate-700 border-slate-300'
}

const getMoodIcon = (moodValue) => {
  const m = moods.find(m => m.value === moodValue)
  return m ? m.icon : '😐'
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-end justify-between">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Journal</h1>
        <p class="text-slate-500 mt-1">Reflect on your day, your goals, and your habits.</p>
      </div>
    </div>

    <!-- New Entry Form -->
    <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col space-y-4">
      <div class="flex items-center space-x-4 mb-2">
        <span class="text-sm font-semibold tracking-wide text-slate-600 uppercase">How are you feeling?</span>
        <div class="flex gap-2">
          <button 
            v-for="mood in moods" 
            :key="mood.value"
            @click="currentMood = mood.value"
            class="px-3 py-1.5 rounded-full border text-sm font-medium transition-colors"
            :class="[
              currentMood === mood.value ? mood.color : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
            ]"
          >
            {{ mood.icon }} {{ mood.label }}
          </button>
        </div>
      </div>
      <textarea 
        v-model="currentEntry" 
        placeholder="Write what's on your mind..."
        class="w-full h-32 p-4 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all resize-y text-slate-700 bg-slate-50 focus:bg-white"
      ></textarea>
      <div class="flex justify-end">
        <BaseButton 
          variant="primary" 
          @click="addEntry" 
          :disabled="!currentEntry.trim() || isSubmitting"
          class="px-6 py-2 shadow-sm disabled:opacity-50"
        >
          {{ isSubmitting ? 'Saving...' : 'Save Entry' }}
        </BaseButton>
      </div>
    </div>

    <!-- Journal History -->
    <div>
      <h2 class="text-xl font-bold text-slate-900 mb-4 tracking-tight">Recent Entries</h2>
      <div v-if="journalStore.recentEntries.length === 0" class="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
        <svg class="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        <h3 class="mt-2 text-sm font-semibold text-slate-900">No entries</h3>
        <p class="mt-1 text-sm text-slate-500">Get started by creating your first journal entry.</p>
      </div>
      
      <div v-else class="space-y-4">
        <!-- Entry Item -->
        <div 
          v-for="entry in journalStore.recentEntries" 
          :key="entry.id"
          class="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-300 transition-all duration-200 relative"
        >
          <div class="flex items-center justify-between mb-3 text-sm">
            <span class="font-medium text-slate-500">{{ formatDate(entry.date) }}</span>
            <div class="flex items-center gap-3">
              <span class="flex items-center whitespace-nowrap px-2.5 py-0.5 rounded-full border text-xs font-semibold" :class="getMoodStyle(entry.mood)">
                {{ getMoodIcon(entry.mood) }} <span class="ml-1 capitalize">{{ entry.mood }}</span>
              </span>
              <button 
                @click="journalStore.removeEntry(entry.id)"
                class="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                title="Delete Entry"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
          <p class="text-slate-700 whitespace-pre-wrap leading-relaxed">{{ entry.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../assets/main.css";
</style>
