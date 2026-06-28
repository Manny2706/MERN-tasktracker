import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { getTasks } from "../services/taskService";
import toast from "react-hot-toast";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const data = await getTasks();

      setTasks(data.data);
    } catch (error) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">

        <Hero />

        <div className="grid lg:grid-cols-5 gap-8 mt-8">

          <div className="lg:col-span-2">

            <TaskForm
              fetchTasks={fetchTasks}
              editingTask={editingTask}
              setEditingTask={setEditingTask}
            />

          </div>

          <div className="lg:col-span-3">

            <TaskList
              tasks={tasks}
              loading={loading}
              fetchTasks={fetchTasks}
              setEditingTask={setEditingTask}
            />

          </div>

        </div>

      </main>

    </div>
  );
};

export default Home;