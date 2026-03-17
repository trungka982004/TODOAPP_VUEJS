<script setup>
import AppLayout from './components/layouts/AppLayout.vue'
import { useRoute, RouterView } from 'vue-router'

const route = useRoute()
</script> 

<template>
  <div id="app-container" class="min-h-screen bg-slate-50">
    <!-- RENDER WITHOUT LAYOUT FOR GUEST PAGES (LOGIN/REGISTER) -->
    <template v-if="route.meta.requiresGuest">
      <RouterView />
    </template>

    <!-- RENDER WITH LAYOUT FOR AUTHORIZED PAGES -->
    <template v-else>
      <AppLayout>
        <RouterView />
      </AppLayout>
    </template>
  </div>
</template>


<style>
#app {
  width: 100%;
  margin: 0;
  padding: 0;
}
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>
