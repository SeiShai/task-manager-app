import Sidebar from "@/components/Sidebar";

function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
    </div>
  );
}

export default Dashboard;
