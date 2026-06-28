import {
  CalendarDays,
  Flag,
  Pencil,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import { deleteTask } from "../services/taskService";

const priorityColors = {
  High: "bg-red-50 text-red-700 border-red-200",
  Medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Low: "bg-green-50 text-green-700 border-green-200",
};

const statusColors = {
  Pending: "bg-orange-50 text-orange-700 border-orange-200",
  "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
  Completed: "bg-green-50 text-green-700 border-green-200",
};

const TaskCard = ({
  task,
  fetchTasks,
  setEditingTask,
}) => {
  const handleDelete = async () => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await deleteTask(task._id);

      toast.success("Task deleted");

      fetchTasks();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">

      {/* Top Accent */}
      <div
        className={`h-1 ${
          task.priority === "High"
            ? "bg-red-500"
            : task.priority === "Medium"
            ? "bg-yellow-500"
            : "bg-green-500"
        }`}
      />

      <div className="p-6">

        {/* Title */}

        <div className="flex justify-between items-start">

          <h2 className="text-xl font-bold text-slate-900">
            {task.title}
          </h2>

          <Flag
            size={20}
            className="text-slate-400"
          />

        </div>

        {/* Description */}

        <p className="text-slate-500 mt-4 leading-7 line-clamp-3">
          {task.description}
        </p>

        {/* Badges */}

        <div className="flex gap-3 mt-6 flex-wrap">

          <span
            className={`px-4 py-1 rounded-full border text-sm font-semibold ${priorityColors[task.priority]}`}
          >
            {task.priority}
          </span>

          <span
            className={`px-4 py-1 rounded-full border text-sm font-semibold ${statusColors[task.status]}`}
          >
            {task.status}
          </span>

        </div>

        {/* Footer */}

        <div className="flex justify-between items-center mt-8 pt-5 border-t border-slate-100">

          <div className="flex items-center gap-2 text-slate-400 text-sm">

            <CalendarDays size={16} />

            {new Date(task.createdAt).toLocaleDateString()}

          </div>

          <div className="flex gap-3">

            <button
              onClick={() => {
                setEditingTask(task);

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="h-10 w-10 rounded-xl bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition"
            >
              <Pencil
                size={18}
                className="text-blue-600"
              />
            </button>

            <button
              onClick={handleDelete}
              className="h-10 w-10 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center transition"
            >
              <Trash2
                size={18}
                className="text-red-600"
              />
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default TaskCard;