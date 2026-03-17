import { defineStore } from "pinia"
import { ref, computed, watch } from 'vue'
import { storageService } from '../services/storageService'

export const useJournalStore = defineStore("journal", () => {
  // State
  const entries = ref(storageService.getJournals())

  const loadJournals = () => {
    const data = storageService.getJournals();
    entries.value.splice(0, entries.value.length, ...data);
  }

  // Getters
  const recentEntries = computed(() => {
    return [...entries.value].sort((a, b) => new Date(b.date) - new Date(a.date))
  })

  // Actions
  const addEntry = (content, mood) => {
    if(content.trim()) {
      entries.value.push({
        id: Date.now(),
        date: new Date().toISOString(),
        content: content.trim(),
        mood: mood || 'neutral' // e.g. 'happy', 'neutral', 'sad'
      })
    }
  }

  const editEntry = (id, newContent, newMood) => {
    const entry = entries.value.find(e => e.id === id)
    if(entry && newContent.trim()) {
      entry.content = newContent.trim()
      if (newMood) entry.mood = newMood
    }
  }

  const removeEntry = (id) => {
    entries.value = entries.value.filter(e => e.id !== id)
  }

  // Watch
  watch(entries, (newEntries) => {
    storageService.saveJournals(newEntries)
  }, { deep: true })
  
  return {
    entries,
    recentEntries,
    addEntry, editEntry, removeEntry,
    loadJournals
  }
})
