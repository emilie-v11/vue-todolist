<script setup>
const { tasks } = defineProps({
  tasks: Array
})
const emit = defineEmits(['delete-task', 'toggle-reminder'])
</script>

<template>
  <ul class="tasks">
    <p v-if="tasks.length === 0">No tasks to show</p>
    <li
      v-else
      v-for="task in tasks"
      class="task"
      :key="task.id"
      :class="task.reminder ? 'reminder' : ''"
      @dblclick="emit('toggle-reminder', task.id)"
    >
      <div>
        <h3>{{ task.text }}</h3>
        <p>{{ task.day }}</p>
      </div>
      <button type="button" class="btn-delete" @click="emit('delete-task', task.id)">❌</button>
    </li>
  </ul>
</template>

<style scoped></style>
