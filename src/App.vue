<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'

let id = 0
const showAddTask = ref(false)

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
  tasks.value = [...tasks.value, { ...newTask.value, id: id++ }]
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
    <Header 
    @toggle-add-task="toggleAddTask" :showAddTask="showAddTask" title="Task tracker"></Header>
    <main>
      <form class="add-form" v-show="showAddTask" @submit.prevent="onSubmit">
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
        <p v-if="tasks.length === 0">No tasks to show</p>
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
  </div>
</template>

<style>
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

/* .btn:focus {
  outline: none;
} */

.btn:active {
  transform: scale(0.98);
}
</style>
