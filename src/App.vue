<script setup>
import { ref } from 'vue'

let id = 0

const newTask = ref({
  text: '',
  day: '',
  reminder: false
})

const tasks = ref([
  {
    id: id++,
    text: 'Doctors Appointment',
    day: 'Feb 5th at 2:30pm',
    reminder: true
  },
  {
    id: id++,
    text: 'Meeting at School',
    day: 'Feb 6th at 1:30pm',
    reminder: true
  },
  {
    id: id++,
    text: 'Food Shopping',
    day: 'Feb 5th at 2:30pm',
    reminder: false
  }
])

function addTask() {
  tasks.value.push({ ...newTask.value, id: id++ })
}

function deleteTask(removeTaskId) {
  tasks.value = tasks.value.filter((task) => task.id !== removeTaskId);
}

const onSubmit = () => {
  if (!newTask.value.text) {
    alert('Please add a task')
    return
  }
  addTask()
  newTask.value.text = ''
  newTask.value.day = ''
  newTask.value.reminder = false
}
</script>

<template>
  <div class="container">
    <header class="header">
      <h1>Task tracker</h1>
      <button class="btn" @click="addTask">Add</button>
    </header>
    <main>
      <form class="add-form" @submit.prevent="onSubmit">
        <div class="form-control">
          <label for="task">Task</label>
          <input type="text" v-model="newTask.text" />
        </div>
        <div class="form-control">
          <label for="day">Day & Time</label>
          <input type="text" v-model="newTask.day" />
        </div>
        <div class="form-control form-control-check">
          <label for="reminder">Set Reminder</label>
          <input type="checkbox" v-model="newTask.reminder" />
        </div>
        <input class="btn btn-block" type="submit" />
      </form>
      <ul class="tasks">
        <li
          class="task"
          v-for="task in tasks"
          :key="task.id"
          :class="task.reminder ? 'reminder' : ''"
        >
          <div>
            <h3>{{ task.text }}</h3>
            <p>{{ task.day }}</p>
          </div>
          <button type="button" class="btn-delete" @click="deleteTask(task.id)">❌</button>
        </li>
      </ul>
    </main>
  </div>
</template>

<style scoped></style>
