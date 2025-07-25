import { API_URL } from './url-api'

async function fetchWithHandling(url, options = {}, errorMessage = 'API request failed') {
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`${errorMessage}:`, error)
    throw error
  }
}

const tasksApi = {
  getTasks: () => fetchWithHandling(API_URL, {}, 'Error fetching tasks'),

  createTask: (task) =>
    fetchWithHandling(
      API_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      },
      'Error creating task'
    ),

  getTaskById: (taskId) => fetchWithHandling(`${API_URL}/${taskId}`, {}, 'Error fetching task'),

  updateTask: (task) =>
    fetchWithHandling(
      `${API_URL}/${task.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      },
      'Error updating task'
    ),

  deleteTask: (taskId) =>
    fetchWithHandling(
      `${API_URL}/${taskId}`,
      {
        method: 'DELETE'
      },
      'Error deleting task'
    )
}

export default tasksApi;
