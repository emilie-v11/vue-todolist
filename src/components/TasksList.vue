<script setup>
import TaskItem from './TaskItem.vue'
const { tasks } = defineProps({
  tasks: Array
})
const emit = defineEmits(['delete-task', 'toggle-reminder'])
</script>

<template>
  <ul class="tasks">
    <p v-if="tasks.length === 0">No tasks to show</p>
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @delete-task="emit('delete-task', $event)"
      @toggle-reminder="emit('toggle-reminder', $event)"
    ></TaskItem>
  </ul>
</template>

<style scoped></style>
