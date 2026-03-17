import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "../stores/authStore"
import LoginView from "../views/LoginView.vue"
import RegisterView from "../views/RegisterView.vue"
import DashboardView from "../views/DashboardView.vue"
import GoalsView from "../views/GoalsView.vue"
import HabitsView from "../views/HabitsView.vue"
import SettingView from "../views/SettingView.vue"
const routes = [
  {
    path: "/",
    name: "dashboard",
    component: DashboardView,
    meta: {requiresAuth: true}
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {requiresGuest: true}
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: {requiresGuest: true}
  },
  {
    path: "/goals",
    name: "goals",
    component: GoalsView,
  },
  {
    path: "/habits",
    name: "habits",
    component: HabitsView,
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingView,
  }
]

const router = createRouter({ 
  history: createWebHistory(),
  routes
}) 

router.beforeEach((to, from) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'login' } 
  }
  else if (to.meta.requiresGuest && isAuthenticated) {
    return { name: 'dashboard' }
  }
})


export default router