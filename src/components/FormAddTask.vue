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

<style scoped>
.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control-check {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-end;
}
.form-control-check label {
  margin-left: 10px;
}
.form-control-check input {
  width: 20px;
  height: 20px;
}

</style>
