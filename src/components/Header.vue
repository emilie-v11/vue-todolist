<script setup>
defineProps(['toggleShowAddTask', 'showAddTask'])
</script>

<template>
  <header class="header">
    <h1>Task tracker</h1>
    <button
      class="btn"
      @click="toggleShowAddTask"
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
