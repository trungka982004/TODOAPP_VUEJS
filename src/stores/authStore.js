import {defineStore} from 'pinia'
import { authService } from '../services/authService'
import router from '../router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: authService.getCurrentUser(), // Initialize user state from LocalStorage
    error: null,
  }),
  
  getters: {
    // Returns true if user is logged in
    isAuthenticated: (state) => !!state.user, 
  },
  
  actions: {
    async login(username, password) {
      this.error = null;
      try {
        const user = authService.login(username, password);
        this.user = user;
        return true;
      } catch (err) {
        this.error = err.message;
        return false;
      }
    },
    
    async register(username, password) {
      this.error = null;
      try {
        authService.register(username, password);
        return true;
      } catch (err) {
        this.error = err.message;
        return false;
      }
    },
    
    logout() {
     authService.logout();
     this.user = null;
     router.push('/login');
    }
  }
});