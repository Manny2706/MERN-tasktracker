import TaskCard from "./TaskCard";

const TaskList = ({
  tasks,
  loading,
  fetchTasks,
  setEditingTask,
}) => {
  if (loading) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold">
          Loading Tasks...
        </h2>
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="bg-white rounded-xl shadow-md p-10 text-center">
        <h2 className="text-2xl font-semibold text-gray-700">
          No Tasks Found
        </h2>

        <p className="text-gray-500 mt-2">
          Create your first task to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          fetchTasks={fetchTasks}
          setEditingTask={setEditingTask}
        />
      ))}
    </div>
  );
};

export default TaskList;