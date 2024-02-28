<script setup>
const { task } = defineProps({
  task: Object
})
const emit = defineEmits(['delete-task', 'toggle-reminder'])
</script>

<template>
  <li
    class="task"
    :class="task.reminder ? 'reminder' : ''"
    @dblclick="emit('toggle-reminder', task.id)"
  >
    <div>
      <h3>{{ task.text }}</h3>
      <p>{{ task.day }}</p>
    </div>
    <button type="button" class="btn-delete" @click="emit('delete-task', task.id)">❌</button>
  </li>
</template>

<style scoped>
.task {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.task.reminder {
  border-left: 5px solid green;
}
.btn-delete {
  cursor: pointer;
  border: none;
}
</style>
