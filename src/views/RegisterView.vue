<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const email = ref('')
const fullName = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const successMessage = ref('')
const showPasswordValue = ref(false)

const togglePasswordVisibility = () => {
  showPasswordValue.value = !showPasswordValue.value
}

const handleRegister = async () => {
  error.value = '' 
  successMessage.value = ''
  
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match!'
    return
  }

  const success = await authStore.register(email.value, password.value, fullName.value)
  
  if (success) {
    successMessage.value = 'Registration successful! Please check your email for confirmation (if enabled) or proceed to login.'
    setTimeout(() => {
      router.push('/login')
    }, 3000)
  } else {
    error.value = authStore.error
  }
}

const goToLogin = () => router.push('/login')
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 dark:from-neutral-900 dark:via-indigo-950 dark:to-neutral-900 p-4 relative overflow-hidden">
    
    <!-- Decorative Orbs -->
    <div class="absolute top-[-10%] right-[-5%] w-96 h-96 bg-purple-400/40 rounded-full mix-blend-screen filter blur-[100px] opacity-70"></div>
    <div class="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-indigo-400/40 rounded-full mix-blend-screen filter blur-[100px] opacity-70"></div>

    <div class="w-full max-w-md bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-neutral-700/50 p-8 space-y-6 relative z-10 my-8">
      
      <div class="text-center">
        <div class="flex justify-center mb-4">
          <div class="h-14 w-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 transform -rotate-3 hover:rotate-0 transition-transform">
            <span class="text-white text-2xl font-bold">P</span>
          </div>
        </div>
        <h1 class="text-3xl font-extrabold text-neutral-800 dark:text-neutral-100 tracking-tight">Create an Account</h1>
        <p class="text-neutral-500 dark:text-neutral-400 mt-2">Start your productivity journey today</p>
      </div>
      
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Full Name</label>
          <input 
            type="text" 
            v-model="fullName" 
            placeholder="What should we call you?"
            class="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-neutral-50 dark:bg-neutral-800 focus:bg-white dark:focus:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400"
            required
          >
        </div>
        
        <div>
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Email</label>
          <input 
            type="email" 
            v-model="email" 
            placeholder="Enter your email"
            class="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-neutral-50 dark:bg-neutral-800 focus:bg-white dark:focus:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400"
            required
          >
        </div>
        
        <div>
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Password</label>
          <div class="relative">
            <input 
              :type="showPasswordValue ? 'text' : 'password'" 
              v-model="password" 
              placeholder="Create a password"
              class="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-neutral-50 dark:bg-neutral-800 focus:bg-white dark:focus:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 pr-12"
              required
            >
            <button 
              type="button" 
              @click="togglePasswordVisibility"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-indigo-500 focus:outline-none transition-colors"
            >
              {{ showPasswordValue ? '🙈' : '👁️' }}
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Confirm Password</label>
          <div class="relative">
            <input 
              :type="showPasswordValue ? 'text' : 'password'" 
              v-model="confirmPassword" 
              placeholder="Confirm your password"
              class="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-neutral-50 dark:bg-neutral-800 focus:bg-white dark:focus:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 pr-12"
              required
            >
            <button 
              type="button" 
              @click="togglePasswordVisibility"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-indigo-500 focus:outline-none transition-colors"
            >
              {{ showPasswordValue ? '🙈' : '👁️' }}
            </button>
          </div>
        </div>

        <div v-if="error" class="bg-red-50/80 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm p-3 rounded-xl text-center font-medium animate-pulse backdrop-blur-sm">
          {{ error }}
        </div>

        <div v-if="successMessage" class="bg-emerald-50/80 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm p-3 rounded-xl text-center font-medium backdrop-blur-sm">
          {{ successMessage }}
        </div>

        <button 
          type="submit" 
          :disabled="authStore.loading"
          class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-indigo-400 disabled:to-purple-400 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-indigo-500/30 mt-6 transform hover:-translate-y-0.5"
        >
          {{ authStore.loading ? 'Creating Account...' : 'Sign Up' }}
        </button>
      </form>

      <p class="text-center text-sm text-neutral-600 dark:text-neutral-400 pt-2">
        Already have an account? 
        <button @click="goToLogin" class="font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus:outline-none transition-colors">
          Sign In
        </button>
      </p>
      
    </div>
  </div>
</template>
