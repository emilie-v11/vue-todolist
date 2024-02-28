<script setup>
const { color, textBtn } = defineProps({
  color: String,
  textBtn: String
})
const emit = defineEmits(['btn-click'])
</script>

<template>
  <button class="btn" @click="emit('btn-click')" :style="{ backgroundColor: color }">
    {{ textBtn }}
  </button>
</template>

<style></style>

<!-- :style="{ backgroundColor: showAddTask ? 'red' : 'green' }" -->
<!-- {{ showAddTask ? 'Close Form' : 'Add Task' }} -->
