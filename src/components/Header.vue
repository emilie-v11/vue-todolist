<script setup>
defineProps(['showAddTask', 'title'])
</script>

<template>
  <header class="header">
    <h1>{{ title }}</h1>
    <button
      class="btn"
      @click="$emit('toggle-add-task')"
      :style="{ backgroundColor: showAddTask ? 'red' : 'green' }"
    >
      {{ showAddTask ? 'Close Form' : 'Add Task' }}
    </button>
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
