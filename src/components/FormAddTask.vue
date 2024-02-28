<script setup>
import { ref } from 'vue'
import Button from './Button.vue'

const emit = defineEmits(['add-task'])

const newTask = ref({
  text: '',
  day: '',
  reminder: false
})

const onSubmit = () => {
  if (!newTask.value.text) {
    alert('Please add a task')
    return
  }
  emit('add-task', { ...newTask.value })
  console.log(newTask.value)

  newTask.value.text = ''
  newTask.value.day = ''
  newTask.value.reminder = false
}
</script>

<template>
  <form class="add-form" @submit.prevent="onSubmit">
    <div class="form-control">
      <label for="task">Task</label>
      <input id="task" type="text" v-model="newTask.text" />
    </div>
    <div class="form-control">
      <label for="day">Day & Time</label>
      <input id="day" type="text" v-model="newTask.day" />
    </div>
    <div class="form-control form-control-check">
      <label for="reminder">Set Reminder</label>
      <input id="reminder" type="checkbox" v-model="newTask.reminder" />
    </div>
    <Button class="btn-block" :textBtn="'Send'" :type="'submit'"></Button>
  </form>
</template>

<style scoped></style>
