import React from "react";
import TaskCard from "./TaskCard";
import { deleteTask } from "@/services/TaskApi";

interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  subtasks: { id: number; title: string }[];
}


interface TaskStatusesProps {
  pendingTasks: Task[];
  inProgressTasks: Task[];
  doneTasks: Task[];
  refreshTasks: () => void;
}

const TaskStatuses: React.FC<TaskStatusesProps> = ({
  pendingTasks,
  inProgressTasks,
  doneTasks,
  refreshTasks
}) => {
  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full md:overflow-hidden overflow-x-auto">
          <div className="md:contents min-w-[768px] flex gap-4">
            {/* Pending */}
            <TaskColumn title="Pending" tasks={pendingTasks} refreshTasks={refreshTasks} />
            {/* In Progress */}
            <TaskColumn title="In Progress" tasks={inProgressTasks} refreshTasks={refreshTasks} />
            {/* Done */}
            <TaskColumn title="Done" tasks={doneTasks} refreshTasks={refreshTasks} />
          </div>
        </div>
      </div>
    </div>
  );
};

// TaskColumn Component
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
      await deleteTask(Number(id));
      refreshTasks();
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
            id={Number(task.id)}
            title={task.title}
            description={task.description}
            deadline={task.deadline}
            subtasks={task.subtasks}
            status={getStatus()}
            onDelete={() => handleDelete(task.id)}
            refreshTasks={refreshTasks}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskStatuses;