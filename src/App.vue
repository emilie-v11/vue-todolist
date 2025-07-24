<script setup>
import Header from './components/Header.vue'
import FormAddTask from './components/FormAddTask.vue'
import TasksList from './components/TasksList.vue'
import Footer from './components/Footer.vue'

import { onMounted, ref } from 'vue'

const tasks = ref([]);
const showAddTask = ref(false);

function toggleAddTask() {
  showAddTask.value = !showAddTask.value
};

async function fetchTasks() {
  try {
    const response = await fetch('api/tasks');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    tasks.value = await response.json();
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
  }
};

async function fetchTaskById(id) {
  try {
    const response = await fetch(`api/tasks/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch task:', error);
  }
};

async function addTask(newTask) {
  try {
    const response = await fetch('api/tasks', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newTask),
    });
    const dataNewTask = await response.json();
    tasks.value = [...tasks.value, dataNewTask];
    showAddTask.value = false;
  } catch (error) {
    console.error('Failed to add task:', error);
    return;
  }
};

async function deleteTask(removeTaskId) {
  try {
    const taskToDelete = await fetchTaskById(removeTaskId);
    if (!taskToDelete) {
      console.error(`Task with ID ${removeTaskId} not found.`);
      return;
    }
    const userConfirmed = confirm(`Are you sure you want to delete "${taskToDelete.text}"?`);
    if (!userConfirmed) return;
    const response = await fetch(`api/tasks/${removeTaskId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      console.error(`Failed to delete task. Server responded with: ${response.status} ${response.statusText}`);
      return;
    }
    tasks.value = tasks.value.filter((task) => task.id !== removeTaskId);

  } catch (error) {
    console.error('An error occurred while deleting the task:', error);
  }
};

async function toggleReminder(id) {
  const taskToToggle = await fetchTaskById(id);
  const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
  try {
    const response = await fetch(`api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });
    const data = await response.json();
    tasks.value = tasks.value.map((task) =>
      task.id === id ? { ...task, reminder: data.reminder } : task
    );
  } catch (error) {
    console.error('Failed to toggle reminder:', error);
  }
};

onMounted(async () => {
  await fetchTasks();
});
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
    <Footer
      v-if="tasks.length > 0"
      :content="'💡 Double click on a task to toggle reminder'"
    ></Footer>
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
