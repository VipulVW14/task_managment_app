import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, addTask, updateTask, deleteTask } from "../slices/taskSlice";
import TaskForm from "../components/TaskForm";
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

const Tasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddOrUpdateTask = (task) => {
    if (currentTask) {
      dispatch(updateTask({ id: currentTask.id, task }));
    } else {
      dispatch(addTask(task));
    }
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <button onClick={() => setIsModalOpen(true)} className="bg-green-500 text-white px-4 py-2 mb-4 rounded-md">
        + Add Task
      </button>

      {/* Table Structure */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Task</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border">
                <td className="border p-2">{task.title}</td>
                <td className="border p-2">{task.description}</td>
                <td className="border p-2">{task.status}</td>
                <td className="p-2 flex justify-center space-x-2">
                  <button onClick={() => handleEdit(task)} className="text-blue-600 hover:bg-blue-100 rounded-md px-3 py-2">
                    <AiOutlineEdit />
                  </button>
                  <button onClick={() => handleDelete(task.id)} className="text-red-600 hover:bg-red-100 rounded-md px-3 py-2">
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && <TaskForm task={currentTask} onSubmit={handleAddOrUpdateTask} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Tasks;
