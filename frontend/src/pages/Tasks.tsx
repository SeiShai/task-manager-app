import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import AddTaskButton from "@/components/AddTaskButton";
import TaskStatuses from "@/components/TaskStatuses";
import { fetchTasksByStatus } from "@/services/TaskApi";

function Tasks() {
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
      <div className="flex-1 flex flex-col gap-4 overflow-hidden bg-gray-100 p-4 h-full">
        <h1 className="text-2xl font-bold">Tasks Management</h1>
        
        {/* Task Statuses Component */}
        <TaskStatuses 
          pendingTasks={pendingTasks}
          inProgressTasks={inProgressTasks}
          doneTasks={doneTasks}
          refreshTasks={loadTasks}
        />

        {/* Add Task Button */}
        <div className="mt-auto">
          <AddTaskButton refreshTasks={loadTasks} />
        </div>
      </div>
    </div>
  );
}

export default Tasks;