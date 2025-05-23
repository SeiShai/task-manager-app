import axios from "axios";

const API_BASE_URL = "https://task-manager-app-ge29.onrender.com/tasks";

// Fetch tasks by status
export const fetchTasksByStatus = async (status: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${status}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching tasks with status "${status}":`, error);
    throw error;
  }
};

// Create a new task
export const createTask = async (taskData: {
  title: string;
  description: string;
  status: string;
  deadline: string;
  subTasks: string[];
}) => {
  try {
    const response = await axios.post(API_BASE_URL, taskData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

// Update the TaskData type to handle subtasks as objects
type SubtaskData = string | { id?: number; title: string };

type TaskData = {
  title: string;
  description: string;
  status: string;
  deadline: string;
  subTasks: SubtaskData[];
};

// Update an existing task
export const updateTask = async (id: number, taskData: Partial<TaskData>) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, taskData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating task with ID ${id}:`, error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting task with ID ${id}:`, error);
    throw error;
  }
};