import React, { useState } from "react";
import TaskModal from "./Modal"; 

// TaskCardProps interface defines the properties for the TaskCard component
type TaskCardProps = {
  id: number;
  title: string;
  description: string;
  deadline?: string;
  subtasks: { id: number; title: string }[];
  status: string;
  onDelete: () => void;
  refreshTasks: () => void;
};

// TaskCard component to display individual task details
const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  deadline,
  subtasks,
  status,
  onDelete,
  refreshTasks
}) => {
  // State to manage the visibility of the update modal
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // Determine background color based on status
  const getStatusColor = () => {
    switch (status) {
      case "pending":
        return "bg-red-300";
      case "in-progress":
        return "bg-blue-300";
      case "done":
        return "bg-green-300";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <>
      <div className={`shadow-md rounded-lg p-4 ${getStatusColor()}`}>
        <div className="flex flex-col px-2 border-l-2 border-gray-black">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-800">{description}</p>
          {deadline && (
            <p className="text-sm text-gray-800 mt-2">
              <strong>Deadline:</strong> {deadline}
            </p>
          )}
          {subtasks.length > 0 && (
            <ul className="mt-2 text-sm text-gray-800">
              <li>
                <strong>Subtasks:</strong>
              </li>
              {subtasks.map((subtask) => (
                <li key={subtask.id}>- {subtask.title}</li>
              ))}
            </ul>
          )}
        </div>
        {/* option to update and delete task */}
        <div className="flex flex-row justify-end gap-2">
          <button 
            onClick={() => setShowUpdateModal(true)}
            className="text-black cursor-pointer px-4 py-2 rounded-md transition-all duration-300 hover:bg-gray-200 hover:scale-105 hover:shadow-md"
          >
            Update
          </button>
          <button
            onClick={onDelete}
            className="text-black cursor-pointer px-4 py-2 rounded-md transition-all duration-300 hover:bg-red-100 hover:text-red-600 hover:scale-110 hover:shadow-md"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Update Modal */}
      {showUpdateModal && (
        <TaskModal
          mode="update"
          onClose={() => setShowUpdateModal(false)}
          refreshTasks={refreshTasks}
          task={{
            id,
            title,
            description,
            status,
            deadline: deadline || "",
            subtasks
          }}
        />
      )}
    </>
  );
};

export default TaskCard;