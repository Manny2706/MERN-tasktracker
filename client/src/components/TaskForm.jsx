import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {createTask,  updateTask,} from "../services/taskService";
const TaskForm = ({
  fetchTasks,
  editingTask,
  setEditingTask,
}) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
} = useForm();

  const onSubmit = async (data) => {
    try {
        setLoading(true);

        if (editingTask) {

            await updateTask(editingTask._id, data);

            toast.success("Task updated successfully");

            setEditingTask(null);

        } else {

            await createTask(data);

            toast.success("Task created successfully");

        }

        reset();

        await fetchTasks();

    } catch (error) {

        toast.error(
            error.response?.data?.message ||
            "Something went wrong"
        );

    } finally {
        setLoading(false);
    }
};
useEffect(() => {
    if (editingTask) {
        setValue("title", editingTask.title);
        setValue("description", editingTask.description);
        setValue("priority", editingTask.priority);
        setValue("status", editingTask.status);
    }
}, [editingTask, setValue]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Add New Task
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Title */}
        <div>
          <label className="block mb-2 font-medium">
            Title
          </label>

          <input
            type="text"
            placeholder="Enter task title"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("title", {
              required: "Title is required",
            })}
          />

          {errors.title && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium">
            Description
          </label>

          <textarea
            rows="4"
            placeholder="Task description..."
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("description", {
              required: "Description is required",
            })}
          />

          {errors.description && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Priority + Status */}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block mb-2 font-medium">
              Priority
            </label>

            <select
              className="w-full border rounded-lg p-3"
              {...register("priority")}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Status
            </label>

            <select
              className="w-full border rounded-lg p-3"
              {...register("status")}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">
                In Progress
              </option>
              <option value="Completed">
                Completed
              </option>
            </select>
          </div>
        </div>

        {/* Button */}
        <button
    type="submit"
    disabled={loading}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
>
    {loading
        ? editingTask
            ? "Updating..."
            : "Creating..."
        : editingTask
            ? "Update Task"
            : "Add Task"}
</button>   
{
editingTask && (
<button
    type="button"
    onClick={() => {
  setEditingTask(null);

  reset({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
  });
}}
    className="w-full mt-3 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg"
>
    Cancel
</button>
)
}   
      </form>
    </div>
  );
};

export default TaskForm;    