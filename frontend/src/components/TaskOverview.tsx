import React from "react";

// This component displays an overview of tasks with their statuses.
interface TaskOverviewProps {
  totalTasks: number;
  totalPending: number;
  totalInProgress: number;
  totalDone: number;
}

// This component takes in the total number of tasks and their statuses as props and displays them in a grid format.
const TaskOverview: React.FC<TaskOverviewProps> = ({
  totalTasks,
  totalPending,
  totalInProgress,
  totalDone,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold mb-4">Task Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-300 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Total Tasks</h3>
          <p className="text-2xl font-bold">{totalTasks}</p>
        </div>
        <div className="bg-red-300 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Pending</h3>
          <p className="text-2xl font-bold">{totalPending}</p>
        </div>
        <div className="bg-blue-300 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold">In Progress</h3>
          <p className="text-2xl font-bold">{totalInProgress}</p>
        </div>
        <div className="bg-green-300 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Done</h3>
          <p className="text-2xl font-bold">{totalDone}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskOverview;
