<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import FormAddTask from './components/FormAddTask.vue'
import TasksList from './components/TasksList.vue'
import Footer from './components/Footer.vue'

let id = 0
const showAddTask = ref(false)

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

function addTask(newTask) {
  tasks.value = [...tasks.value, { id: id++, ...newTask }]
}

function deleteTask(removeTaskId) {
  tasks.value = tasks.value.filter((task) => task.id !== removeTaskId)
}

function toggleReminder(id) {
  tasks.value = tasks.value.map((task) =>
    task.id === id ? { ...task, reminder: !task.reminder } : task
  )
}

function toggleAddTask() {
  showAddTask.value = !showAddTask.value
}
</script>

<template>
  <div class="container">
    <Header
      @toggle-add-task="toggleAddTask"
      :showAddTask="showAddTask"
      title="Task tracker"
    ></Header>
    <main>
      <FormAddTask v-show="showAddTask" @add-task="addTask"></FormAddTask>
      <TasksList
        :tasks="tasks"
        @delete-task="deleteTask"
        @toggle-reminder="toggleReminder"
      ></TasksList>
    </main>
    <Footer v-if="tasks.length > 0" :content="'💡 Double click on a task to toggle reminder'">
    </Footer>
  </div>
</template>

<style>
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
</style>
