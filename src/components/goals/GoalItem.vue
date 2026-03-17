<script setup>
import { ref, nextTick } from "vue"
import { useGoalStore } from "../../stores/goalStore"
import BaseButton from "../base/BaseButton.vue"
import BaseCheckBox from "../base/BaseCheckBox.vue"

const props = defineProps({
  goal: {
    type: Object,
    required: true,
    default: () => ({
      id: 0,
      text: '',
      done: false
    }),
    validator: (value) => {
      return typeof value.id === 'number' && typeof value.text === 'string' && typeof value.done === 'boolean'
    }
  }
})

const goalStore = useGoalStore()
const { toggleGoal, editGoal, removeGoal, addMilestone, editMilestone, toggleMilestone, removeMilestone } = goalStore

// State for editing
const isEditing = ref(false)
const isSaving = ref(false)
const editText = ref(props.goal.text)
const inputRef = ref(null)

const startEdit = async () => {
  editText.value = props.goal.text
  isEditing.value = true
  // Focus input after DOM updates
  await nextTick()
  inputRef.value?.focus()
}

const saveEdit = () => {
  // Lock to prevent duplicate calls from blur + enter
  if (isSaving.value) return; 
  isSaving.value = true;
  
  if (editText.value.trim() && editText.value !== props.goal.text) {
    editGoal(props.goal.id, editText.value)
  }
  isEditing.value = false;
  
  // Unlock after short delay
  setTimeout(() => isSaving.value = false, 100);
}

const cancelEdit = () => {
  editText.value = props.goal.text
  isEditing.value = false
}

// Milestones state
const showMilestones = ref(false)
const newMilestoneText = ref('')

const handleAddMilestone = () => {
  if (newMilestoneText.value.trim()) {
    addMilestone(props.goal.id, newMilestoneText.value)
    newMilestoneText.value = ''
  }
}
</script>

<template>
  <div class="goal-item group">
    <!-- Checkbox (Hidden while editing) -->
    <BaseCheckBox 
      v-if="!isEditing"
      :checked="goal.done"
      @toggle="toggleGoal(goal.id)"
    />

    <!-- Todo Text / Edit Input -->
    <div class="flex-1">
      <input
        v-if="isEditing"
        ref="inputRef"
        v-model="editText"
        @keyup.enter="saveEdit"
        @keyup.esc="cancelEdit"
        @blur="saveEdit"
        class="goal-input"
        :style="{ width: `${Math.max(editText.length + 1, 5)}ch`, maxWidth: '100%' }"
      />
      <div v-else class="flex flex-col gap-1">
        <span
          @dblclick="startEdit"
          class="goal-text cursor-pointer"
          :class="[
            goal.done
              ? 'line-through text-slate-400'
              : 'text-slate-900 font-medium'
          ]"  
        >
          {{ goal.text }}
        </span>
        <!-- Milestone Summary -->
        <span v-if="goal.milestones && goal.milestones.length > 0" class="text-xs text-slate-500 font-medium">
          Milestones: {{ goal.milestones.filter(m => m.done).length }} / {{ goal.milestones.length }}
        </span>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-1">
      <!-- Normal Mode Buttons -->
      <template v-if="!isEditing">
        <BaseButton 
          variant="modify" 
          @click="startEdit" 
          class="goal-action-button"
          title="Edit"
        >
          <svg class="goal-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
          </svg>
        </BaseButton>
        
        <BaseButton 
          variant="danger" 
          @click="removeGoal(goal.id)" 
          class="goal-action-button"
          title="Delete"
        >
          <svg class="goal-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </BaseButton>
      </template>

      <!-- Editing Mode Buttons -->
      <template v-else>
        <BaseButton 
          variant="primary" 
          @click="saveEdit" 
          class="goal-action-button"
          title="Save"
        >
          <svg class="goal-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </BaseButton>
        
        <BaseButton 
          variant="danger" 
          @click="cancelEdit" 
          class="goal-action-button"
          title="Cancel"
        >
          <svg class="goal-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </BaseButton>
      </template>
      
      <!-- Expand Milestones Button -->
      <BaseButton 
        v-if="!isEditing"
        variant="primary" 
        @click="showMilestones = !showMilestones" 
        class="p-2 transition-opacity"
        :class="[ showMilestones ? 'opacity-100 bg-slate-100' : 'opacity-0 group-hover:opacity-100' ]"
        title="Toggle Milestones"
      >
        <svg class="goal-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" :class="{ 'rotate-180': showMilestones, 'transition-transform': true }">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </BaseButton>
    </div>
  </div>

  <!-- Milestones Section Box -->
  <div v-if="showMilestones" class="pl-12 pr-4 py-2 bg-slate-50 border border-t-0 border-slate-200 rounded-b-lg -mt-2 mb-2">
    <div class="flex flex-col gap-2 pt-2">
      <!-- Milestone List -->
      <div 
        v-for="milestone in (goal.milestones || [])" 
        :key="milestone.id"
        class="flex items-center gap-2 group/milestone"
      >
        <BaseCheckBox 
          :checked="milestone.done"
          @toggle="toggleMilestone(goal.id, milestone.id)"
          size="sm"
        />
        <span 
          class="flex-1 text-sm pt-1"
          :class="milestone.done ? 'line-through text-slate-400' : 'text-slate-700'"
        >
          {{ milestone.text }}
        </span>
        <!-- Milestone Delete -->
        <button 
          @click="removeMilestone(goal.id, milestone.id)"
          class="text-red-400 hover:text-red-600 opacity-0 group-hover/milestone:opacity-100 transition-opacity p-1"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Add Milestone Input -->
      <div class="flex items-center gap-2 mt-1">
        <svg class="w-4 h-4 text-slate-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        <input 
          v-model="newMilestoneText"
          @keyup.enter="handleAddMilestone"
          placeholder="Add a new milestone..."
          class="flex-1 bg-transparent border-b border-slate-300 focus:border-sky-500 outline-none text-sm text-slate-700 py-1"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.goal-item {
  @apply flex items-center gap-3 p-4 rounded-lg bg-white border border-slate-200 hover:border-sky-400 hover:shadow-md transition-all duration-200;
}

.goal-input {
  @apply bg-slate-50 border-b-2 border-sky-500 outline-none px-2 py-1 text-sm font-medium text-slate-900 transition-all duration-200;
}

.goal-text {
  @apply block text-sm transition-all duration-200;
}

.goal-action-button {
  @apply p-2 opacity-0 group-hover:opacity-100 transition-opacity;
}

.goal-icon {
  @apply w-5 h-5;
}
</style>