import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import TaskModal from "@/components/Modal";
import TaskCard from "@/components/TaskCard";
import { fetchTasksByStatus } from "@/services/TaskApi";
import { deleteTask } from "@/services/TaskApi";

function Tasks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  // Fetch tasks by status
  const loadTasks = async () => {
    try {
      const pending = await fetchTasksByStatus("pending");
      const inProgress = await fetchTasksByStatus("in-progress");
      const done = await fetchTasksByStatus("done");

      setPendingTasks(pending);
      setInProgressTasks(inProgress);
      setDoneTasks(done);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-100 p-4 h-full">
        <h1 className="text-2xl font-bold">Tasks Management</h1>

        {/* Tasks Status */}
        <div className="flex-1 overflow-hidden my-4">
          <div className="h-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full md:overflow-hidden overflow-x-auto">
              <div className="md:contents min-w-[768px] flex gap-4">
                {/* Pending */}
                <TaskColumn title="Pending" tasks={pendingTasks} refreshTasks={loadTasks} />
                {/* In Progress */}
                <TaskColumn title="In Progress" tasks={inProgressTasks} refreshTasks={loadTasks} />
                {/* Done */}
                <TaskColumn title="Done" tasks={doneTasks} refreshTasks={loadTasks} />
              </div>
            </div>
          </div>
        </div>

        {/* Add Task Button */}
        <div className="mt-auto">
          <button
            className="w-full bg-purple-400 cursor-pointer text-white px-4 py-2 shadow-md hover:bg-purple-500 transition-colors duration-300"
            onClick={() => setIsModalOpen(true)}
            title="Add Task"
          >
            + Add Task
          </button>
        </div>
      </div>

      {isModalOpen && <TaskModal onClose={() => setIsModalOpen(false)} refreshTasks={loadTasks} />}
    </div>
  );
}

interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  subtasks: { id: number; title: string }[];
}

function TaskColumn({ title, tasks, refreshTasks }: { title: string; tasks: Task[]; refreshTasks: () => void }) {
  // Map column title to status
  const getStatus = () => {
    switch (title) {
      case "Pending":
        return "pending";
      case "In Progress":
        return "in-progress";
      case "Done":
        return "done";
      default:
        return "";
    }
  };

  // Handle task deletion
  const handleDelete = async (id: string) => {
    try {
      await deleteTask(Number(id)); // Call the API to delete the task
      refreshTasks(); // Refresh the task list after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 gap-4 flex flex-col min-w-64 w-full">
        <div className="flex flex-row items-center overflow-y-auto self-center">
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              deadline={task.deadline}
              subtasks={task.subtasks}
              status={getStatus()}
              onDelete={() => handleDelete(task.id)}
            />
          ))}
        </div>
    </div>
  );
}

export default Tasks;