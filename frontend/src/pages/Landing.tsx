import { useState, useEffect } from "react";
import {
  Calendar,
  CheckSquare,
  Clock,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const [isHovered, setIsHovered] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Function to format the date nicely
    const formatDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        month: "long",
        day: "numeric",
        year: "numeric",
      };
      return now.toLocaleDateString("en-US", options);
    };

    // Set initial date
    setCurrentDate(formatDate());

    // Update date every minute
    const interval = setInterval(() => {
      setCurrentDate(formatDate());
    }, 60000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Function to handle navigation
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-purple-600 to-indigo-900 text-slate-800 p-6 md:p-10">
      {/* Main Content Container with overflow-y-auto for scrolling */}
      <div className="flex flex-col items-center justify-between w-full max-w-6xl bg-white/90 backdrop-blur rounded-xl shadow-2xl overflow-hidden overflow-y-auto max-h-screen">
        {/* Nav Container */}
        <nav className="w-full bg-white/50 backdrop-blur-lg sticky top-0 z-10">
          <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 py-4">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <CheckSquare size={28} className="text-purple-700" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-800 to-indigo-700 bg-clip-text text-transparent">
                TaskMaster
              </h1>
            </div>
            <ul className="flex space-x-8">
              <li>
                <a
                  href="#hero"
                  className="text-lg font-medium hover:text-purple-700 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-lg font-medium hover:text-purple-700 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-lg font-medium hover:text-purple-700 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Hero Section */}
        <div
          id="hero"
          className="flex flex-col md:flex-row items-center justify-between w-full p-6 md:p-12 gap-8"
        >
          {/* Left Content */}
          <div className="flex flex-col items-start space-y-6 md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Organize Your Day The{" "}
              <span className="bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">
                Smart Way
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-700">
              TaskMaster helps you prioritize tasks, meet deadlines, and achieve
              your goals with powerful productivity tools.
            </p>

            {/* Feature Icons */}
            <div className="flex flex-wrap gap-6 py-6">
              <div className="flex items-center gap-2">
                <Calendar className="text-purple-700" />
                <span>Smart Calendar</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-purple-700" />
                <span>Time Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckSquare className="text-purple-700" />
                <span>Task Management</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="px-8 py-3 cursor-pointer bg-gradient-to-r from-purple-700 to-indigo-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Get Started Free
              </button>
            </div>

            {/* Social Proof with Lucide Icons */}
            <div className="mt-6 text-sm text-slate-600">
              <p className="mb-2">Connect with me:</p>
              <div className="flex gap-6 mt-2">
                <a
                  href="https://github.com/SeiShai"
                  className="hover:text-purple-700 transition-colors"
                  title="GitHub Profile"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/base-shai-frederick-r-a58a01297/"
                  className="hover:text-purple-700 transition-colors"
                  title="LinkedIn Profile"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="https://www.instagram.com/http.shachi/"
                  className="hover:text-purple-700 transition-colors"
                  title="Instagram Profile"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Content - App Preview */}
          <div className="md:w-1/2 flex justify-center items-center">
            <div
              className={`bg-slate-100 rounded-xl p-6 shadow-lg w-full max-w-md transition-all duration-500 ${
                isHovered ? "scale-105" : ""
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl">Today's Tasks</h3>
                <span className="text-purple-700 font-medium">
                  {currentDate}
                </span>
              </div>

              {/* Task List */}
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    title: "Team meeting",
                    time: "9:00 AM",
                    completed: true,
                  },
                  {
                    id: 2,
                    title: "Project proposal",
                    time: "11:30 AM",
                    completed: false,
                  },
                  {
                    id: 3,
                    title: "Client presentation",
                    time: "2:00 PM",
                    completed: false,
                  },
                  {
                    id: 4,
                    title: "Review analytics",
                    time: "4:30 PM",
                    completed: false,
                  },
                ].map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-3 bg-white rounded-lg shadow"
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        task.completed
                          ? "bg-purple-700 border-purple-700"
                          : "border-slate-400"
                      }`}
                    >
                      {task.completed && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <p
                        className={
                          task.completed ? "line-through text-slate-500" : ""
                        }
                      >
                        {task.title}
                      </p>
                    </div>
                    <div className="text-sm text-slate-500">{task.time}</div>
                  </div>
                ))}
              </div>

              {/* Add Task Button */}
              <div className="mt-6">
                <button className="w-full py-3 cursor-pointer bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition-colors">
                  + Add New Task
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full bg-slate-50 p-6 text-center text-slate-600">
          <p>© 2025 TaskMaster. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Landing;
