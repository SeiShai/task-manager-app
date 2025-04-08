import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TaskModal from "@/components/Modal";

function Tasks() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-100 p-4 h-full">
        <h1 className="text-2xl font-bold">Tasks Management</h1>

        {/* Tasks Status */}
        <div className="flex-1 overflow-hidden my-4">
          {/* This container handles both scrolling on small screens and full width on large screens */}
          <div className="h-full">
            {/* Grid on large screens, scrollable flex on small screens */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full md:overflow-hidden overflow-x-auto">
              {/* This inner container ensures columns maintain width on small screens */}
              <div className="md:contents min-w-[768px] flex gap-4">
                {/* Pending */}
                <div className="bg-white shadow-md rounded-lg p-4 gap-4 flex flex-col min-w-64 w-full">
                  <div className="flex flex-row items-center self-center">
                    <h2 className="text-xl font-semibold">Pending</h2>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {/* Pending items would go here */}
                  </div>
                </div>

                {/* In Progress */}
                <div className="bg-white shadow-md rounded-lg p-4 gap-4 flex flex-col min-w-64 w-full">
                  <div className="flex flex-row items-center self-center">
                    <h2 className="text-xl font-semibold">In Progress</h2>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {/* In Progress items would go here */}
                  </div>
                </div>

                {/* Done */}
                <div className="bg-white shadow-md rounded-lg p-4 gap-4 flex flex-col min-w-64 w-full">
                  <div className="flex flex-row items-center self-center">
                    <h2 className="text-xl font-semibold">Done</h2>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {/* Done items would go here */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Task Button */}
        <div className="mt-auto">
          <button
            className="w-full bg-purple-400 cursor-pointer text-white px-4 py-2 shadow-md hover:bg-purple-500 transition-colors duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            + Add Task
          </button>
        </div>
      </div>

      {isModalOpen && (
        <TaskModal
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Tasks;
