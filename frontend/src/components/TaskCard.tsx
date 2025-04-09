import React from "react";

type TaskCardProps = {
  title: string;
  description: string;
  deadline?: string;
  subtasks: { id: number; title: string }[];
  status: string;
  onDelete: () => void;
};

const TaskCard: React.FC<TaskCardProps> = ({ title, description, deadline, subtasks, status, onDelete, }) => {
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
    <div className={`shadow-md  rounded-lg p-4 ${getStatusColor()}`}>
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
        <div className="flex flex-row justify-end gap-4 mt-2">
            <button className="text-black">Update</button>
            <button onClick={onDelete} className="text-bklack">Delete</button>
        </div>
    </div>
  );
};

export default TaskCard;