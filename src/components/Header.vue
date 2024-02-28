<script setup>
import Button from './Button.vue'

const { showAddTask, title } = defineProps({
  showAddTask: Boolean,
  title: String
})
const emit = defineEmits(['toggle-add-task'])
</script>

<template>
  <header class="header">
    <h1>{{ title }}</h1>
    <Button @btn-click="emit('toggle-add-task')" :color="showAddTask ? 'red' : 'green'" :textBtn="showAddTask ? 'Close Form' : 'Add Task'"></Button>
    <!-- <button
      class="btn"
      @click="$emit('toggle-add-task')"
      :style="{ backgroundColor: showAddTask ? 'red' : 'green' }"
    >
      {{ showAddTask ? 'Close Form' : 'Add Task' }}
    </button> -->
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
