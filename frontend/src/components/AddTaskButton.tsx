import React, { useState } from "react";
import TaskModal from "./Modal";

type AddTaskButtonProps = {
  refreshTasks: () => void;
};

// This component renders a button that opens a modal for adding a new task
const AddTaskButton: React.FC<AddTaskButtonProps> = ({ refreshTasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        className="w-full bg-purple-400 cursor-pointer text-white px-4 py-2 shadow-md hover:bg-purple-500 transition-colors duration-300 rounded-md flex items-center justify-center gap-2"
        onClick={() => setIsModalOpen(true)}
        title="Add Task"
      >
        <span className="text-xl font-bold">+</span>
        <span>Add Task</span>
      </button>

      {isModalOpen && (
        <TaskModal 
          onClose={() => setIsModalOpen(false)} 
          refreshTasks={refreshTasks} 
          mode="create" 
        />
      )}
    </>
  );
};

export default AddTaskButton;