import { useState } from "react";

const TaskForm = ({ task, onSubmit, onClose }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "pending"); // Default status: pending

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, status });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white opacity-95 shadow-md p-6 mt-2 rounded border-1 w-1/3">
        <h2 className="text-xl font-bold mb-4">{task ? "Edit Task" : "Add Task"}</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 mb-2"
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 mb-2"
          />
          {/* Status Dropdown */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border p-2 mb-2"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
            <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
