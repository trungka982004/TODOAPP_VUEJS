<script setup>
import { ref, computed, onUnmounted } from 'vue'
import BaseCard from '../base/BaseCard.vue'

const POMODORO_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;

const timeLeft = ref(POMODORO_TIME)
const isRunning = ref(false)
const isBreak = ref(false)
let timer = null

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const startTimer = () => {
  if (isRunning.value) return
  isRunning.value = true
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      // Timer finished
      clearInterval(timer)
      isRunning.value = false
      // Play a sound or notification here
      new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play().catch(() => {})
      
      if (!isBreak.value) {
        // Auto-switch to break
        isBreak.value = true
        timeLeft.value = SHORT_BREAK_TIME
      } else {
        // Auto-switch to work
        isBreak.value = false
        timeLeft.value = POMODORO_TIME
      }
    }
  }, 1000)
}

const pauseTimer = () => {
  isRunning.value = false
  clearInterval(timer)
}

const resetTimer = () => {
  isRunning.value = false
  clearInterval(timer)
  timeLeft.value = isBreak.value ? SHORT_BREAK_TIME : POMODORO_TIME
}

const toggleMode = () => {
  isBreak.value = !isBreak.value
  resetTimer()
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <BaseCard class="pomodoro-card relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 border-none text-white">
    <!-- Decorative background elements -->
    <div class="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10 blur-2xl pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-black opacity-10 blur-xl pointer-events-none"></div>

    <div class="relative z-10 flex flex-col items-center justify-center p-4">
      <div class="flex items-center justify-between w-full mb-2">
        <h3 class="font-bold flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          Focus Mode
        </h3>
        <button @click="toggleMode" class="text-xs px-2 py-1 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-sm">
          {{ isBreak ? 'Switch to Work' : 'Switch to Break' }}
        </button>
      </div>

      <div class="text-5xl font-black tracking-widest my-4 drop-shadow-md tabular-nums">
        {{ formattedTime }}
      </div>

      <div class="flex items-center gap-4 mt-2">
        <button 
          v-if="!isRunning" 
          @click="startTimer"
          class="w-12 h-12 flex items-center justify-center rounded-full bg-white text-indigo-600 hover:scale-105 hover:shadow-lg transition-all"
          title="Start"
        >
          <svg class="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/></svg>
        </button>
        <button 
          v-else 
          @click="pauseTimer"
          class="w-12 h-12 flex items-center justify-center rounded-full bg-white text-indigo-600 hover:scale-105 hover:shadow-lg transition-all"
          title="Pause"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
        </button>

        <button 
          @click="resetTimer"
          class="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
          title="Reset"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
        </button>
      </div>

      <div class="mt-4 text-sm text-white/80 font-medium">
        {{ isBreak ? 'Take a short break ☕' : 'Stay focused on your tasks 🔥' }}
      </div>
    </div>
  </BaseCard>
</template>

<style scoped>
@reference "../../assets/main.css";
.pomodoro-card {
  box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.4);
}
</style>
