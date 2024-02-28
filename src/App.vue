<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import FormAddTask from './components/FormAddTask.vue'

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
      <p v-if="tasks.length === 0">No tasks to show</p>
      <ul class="tasks">
        <li
          class="task"
          v-for="task in tasks"
          :key="task.id"
          :class="task.reminder ? 'reminder' : ''"
          @dblclick="() => toggleReminder(task.id)"
        >
          <div>
            <h3>{{ task.text }}</h3>
            <p>{{ task.day }}</p>
          </div>
          <button type="button" class="btn-delete" @click="deleteTask(task.id)">❌</button>
        </li>
      </ul>
    </main>
    <footer v-if="tasks.length > 0">
      <p>💡 Double click on a task to toggle reminder</p>
    </footer>
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
footer {
  margin-top: 30px;
  text-align: left;
  font-size: small;
}
</style>
