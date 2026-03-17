/**
 * Mock Service Layer to manage LocalStorage
 * Helps abstract data storage operations
 */

const STORAGE_KEYS = {
  GOALS: 'todo_app_goals',
  HABITS: 'todo_app_habits',
  SETTINGS: 'todo_app_settings'
}

export const storageService = {
  // Fetch data by Key
  fetch(key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  },

  // Save data by Key
  save(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  },

  // Utility functions for each data type (Could use APIs here in the future)
  getGoals() {
    return this.fetch(STORAGE_KEYS.GOALS) || []
  },

  saveGoals(goals) {
    this.save(STORAGE_KEYS.GOALS, goals)
  },

  getHabits() {
    return this.fetch(STORAGE_KEYS.HABITS) || []
  },

  saveHabits(habits) {
    this.save(STORAGE_KEYS.HABITS, habits)
  }
}
