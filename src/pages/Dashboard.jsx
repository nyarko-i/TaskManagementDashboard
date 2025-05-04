import React, { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import TaskSearch from "../components/TaskSearch"; // <-- import TaskSearch

const Dashboard = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // <-- search state

  // Save or update task
  const handleSaveTask = (newTask) => {
    if (taskToEdit) {
      const updatedTasks = tasks.map((task) =>
        task.id === taskToEdit.id ? { ...task, ...newTask } : task
      );
      setTasks(updatedTasks);
    } else {
      const taskWithId = { ...newTask, id: Date.now().toString() };
      setTasks([...tasks, taskWithId]);
    }

    setShowTaskForm(false);
    setTaskToEdit(null);
  };

  // Edit a task
  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setShowTaskForm(true);
  };

  // Delete a task
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Filter tasks based on search query
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Create Task Button */}
      <button
        onClick={() => setShowTaskForm(!showTaskForm)}
        className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600 mb-4"
      >
        {showTaskForm ? "Close Task Form" : "Create Task"}
      </button>

      {/* Task Search Component */}
      <TaskSearch setSearchQuery={setSearchQuery} /> {/* <-- search bar */}

      {/* Conditionally render TaskForm */}
      {showTaskForm && <TaskForm onSave={handleSaveTask} existingTask={taskToEdit} />}
      <br />

      {/* Display tasks */}
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          ))}
        </div>
      ) : (
        <p>No tasks found. {tasks.length === 0 ? 'Click "Create Task" to add one.' : 'Try a different search.'}</p>
      )}
    </div>
  );
};

export default Dashboard;
