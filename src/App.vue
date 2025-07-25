<script setup>
import Header from './components/Header.vue'
import FormAddTask from './components/FormAddTask.vue'
import TasksList from './components/TasksList.vue'
import Footer from './components/Footer.vue'
import tasksApi from "@/api/tasks-api"

import { onMounted, ref } from 'vue'

const tasks = ref([]);
const showAddTask = ref(false);

function toggleAddTask() {
  showAddTask.value = !showAddTask.value
};

async function addTask(newTask) {
  try {
    const dataNewTask = await tasksApi.createTask(newTask);
    tasks.value = [...tasks.value, dataNewTask];
    showAddTask.value = false;
  } catch (error) {
    console.error('Failed to add task:', error);
    return;
  }
};

async function deleteTask(removeTaskId) {
  try {
    const taskToDelete = await tasksApi.getTaskById(removeTaskId);
    if (!taskToDelete) {
      console.error(`Task with ID ${removeTaskId} not found.`);
      return;
    }
    const userConfirmed = confirm(`Are you sure you want to delete "${taskToDelete.text}"?`);
    if (!userConfirmed) return;
    await tasksApi.deleteTask(removeTaskId);
    tasks.value = tasks.value.filter((task) => task.id !== removeTaskId);

  } catch (error) {
    console.error('An error occurred while deleting the task:', error);
  }
};

async function toggleReminder(id) {
  try {
    const taskToToggle = await tasksApi.getTaskById(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const { reminder} = await tasksApi.updateTask(updatedTask)
    tasks.value = tasks.value.map((task) =>
      task.id === id ? { ...task, reminder } : task
    );
  } catch (error) {
    console.error('Failed to toggle reminder:', error);
  }
};

onMounted(async () => {
  tasks.value = await tasksApi.getTasks();
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
