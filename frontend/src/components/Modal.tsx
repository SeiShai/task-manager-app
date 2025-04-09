import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createTask } from "@/services/TaskApi";

function TaskModal({ onClose, refreshTasks }: { onClose: () => void; refreshTasks: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [deadline, setDeadline] = useState("");
  const [subTask, setSubTask] = useState("");
  const [subTasks, setSubTasks] = useState<string[]>([]);

  // Function to handle adding a subtask
  const handleAddSubTask = () => {
    if (subTask.trim()) {
      setSubTasks([...subTasks, subTask]);
      setSubTask("");
    }
  };

  // Function to handle removing a subtask
  const handleRemoveSubTask = (index: number) => {
    setSubTasks(subTasks.filter((_, i) => i !== index));
  };

  // Function to print form submission
  const handleSubmit = async () => {
    const taskData = {
      title,
      description,
      status,
      deadline,
      subTasks,
    };
    try {
      const savedTask = await createTask(taskData);
      console.log("Task saved:", savedTask);
      refreshTasks();
      onClose();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-in fade-in duration-300">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Add New Task
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Task Name */}
          <div className="space-y-2">
            <label
              htmlFor="task-name"
              className="block text-sm font-medium text-gray-700"
            >
              Task Name
            </label>
            <input
              id="task-name"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
            />
          </div>

          {/* Task Description */}
          <div className="space-y-2">
            <label
              htmlFor="task-description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 resize-none"
            />
          </div>

          {/* Status and deadline */}
          <div className="flex space-x-4 items-end">
            {/* Status dropdown */}
            <div className="w-1/2 space-y-2">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status" className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Deadline input */}
            <div className="w-1/2 space-y-2">
              <label
                htmlFor="deadline"
                className="block text-sm font-medium text-gray-700"
              >
                Deadline
              </label>
              <div className="relative border border-gray-300 rounded-md p-1">
                <input
                  id="deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full pl-10"
                />
              </div>
            </div>
          </div>
          {/* Sub Tasks */}
          <div className="space-y-2">
            <label
              htmlFor="subtasks"
              className="block text-sm font-medium text-gray-700"
            >
              Sub Tasks
            </label>
            <div className="flex items-center gap-2">
              <input
                id="subtasks"
                type="text"
                value={subTask}
                onChange={(e) => setSubTask(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSubTask();
                  }
                }}
                placeholder="Enter sub task"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
              />
              <button
                onClick={handleAddSubTask}
                className="text-sm px-2 py-2 bg-purple-600 text-white w-1/5 hover:bg-purple-700 cursor-pointer rounded-md font-medium transition-colors"
              >
                + Add
              </button>
            </div>

            {/* Sub Tasks List */}
            {subTasks.length > 0 && (
              <div className="mt-3 space-y-2 max-h-32 overflow-y-auto">
                {subTasks.map((task, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded-md group"
                  >
                    <span className="text-sm text-gray-700">{task}</span>
                    <button
                      onClick={() => handleRemoveSubTask(index)}
                      className="opacity-0 group-hover:opacity-100 cursor-pointer text-red-500 hover:text-red-700 transition-opacity"
                      aria-label="Remove sub task"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            title="Cancel"
            className="px-4 py-2 cursor-pointer text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            title="Save Task"
            className="px-4 py-2 text-sm font-medium text-white cursor-pointer bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
