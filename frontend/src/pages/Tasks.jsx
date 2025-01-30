import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, addTask, updateTask, deleteTask } from "../slices/taskSlice";
import TaskForm from "../components/TaskForm";

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

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="border p-2 mt-2 flex justify-between">
            <span>{task.title}</span>
            <br></br>
            <span>{task.description}</span>
            <div>
              <button onClick={() => handleEdit(task)} className="bg-yellow-500  rounded-md text-white px-4 py-1 mx-2">
                Edit
              </button>
              <button onClick={() => handleDelete(task.id)} className="bg-red-500  rounded-md text-white px-4 py-1">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && <TaskForm task={currentTask} onSubmit={handleAddOrUpdateTask} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Tasks;
