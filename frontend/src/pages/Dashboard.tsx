import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import TaskStatuses from "@/components/TaskStatuses";
import TaskOverview from "@/components/TaskOverview";
import { fetchTasksByStatus } from "@/services/TaskApi";

function Dashboard() {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  const refreshTasks = async () => {
    try {
      const [pending, inProgress, done] = await Promise.all([
        fetchTasksByStatus("pending"),
        fetchTasksByStatus("in-progress"),
        fetchTasksByStatus("done"),
      ]);
      setPendingTasks(pending);
      setInProgressTasks(inProgress);
      setDoneTasks(done);
    } catch (error) {
      console.error("Error refreshing tasks:", error);
    }
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  const totalTasks =
    pendingTasks.length + inProgressTasks.length + doneTasks.length;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
            <TaskOverview
              totalTasks={totalTasks}
              totalPending={pendingTasks.length}
              totalInProgress={inProgressTasks.length}
              totalDone={doneTasks.length}
            />
            <TaskStatuses
              pendingTasks={pendingTasks}
              inProgressTasks={inProgressTasks}
              doneTasks={doneTasks}
              refreshTasks={refreshTasks}
            />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;