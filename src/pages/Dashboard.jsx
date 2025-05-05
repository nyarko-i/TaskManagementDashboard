import React, { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import TaskSearch from "../components/TaskSearch";
import TaskFilter from "../components/TaskFilter";
import TaskSort from "../components/TaskSort";

const Dashboard = () => {
  // Toggle visibility of the task form
  const [showTaskForm, setShowTaskForm] = useState(false);

  // List of all tasks
  const [tasks, setTasks] = useState([]);

  // Task being edited
  const [taskToEdit, setTaskToEdit] = useState(null);

  // User's search input
  const [searchQuery, setSearchQuery] = useState("");

  // Filter value ( "all", "completed", "pending")
  const [filter, setFilter] = useState("all");

  // Sort value (e.g., by date ascending or descending)
  const [sort, setSort] = useState("date-asc");

  // Save a new task or update an existing one
  const handleSaveTask = (newTask) => {
    if (taskToEdit) {
      // Edit existing task
      const updatedTasks = tasks.map((task) =>
        task.id === taskToEdit.id ? { ...task, ...newTask } : task
      );
      setTasks(updatedTasks);
    } else {
      // Add new task with unique ID
      const taskWithId = { ...newTask, id: Date.now().toString() };
      setTasks([...tasks, taskWithId]);
    }

    // Reset form state
    setShowTaskForm(false);
    setTaskToEdit(null);
  };

  // Prepare a task for editing
  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setShowTaskForm(true);
  };

  // Delete a task by ID
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Filter tasks by search query
  let displayedTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description &&
        task.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Further filter by status (if not "all")
  if (filter !== "all") {
    displayedTasks = displayedTasks.filter((task) => task.status === filter);
  }

  // Sort tasks by the selected option
  displayedTasks.sort((a, b) => {
    if (sort === "date-asc") return new Date(a.dueDate) - new Date(b.dueDate);
    if (sort === "date-desc") return new Date(b.dueDate) - new Date(a.dueDate);
    if (sort === "title-asc") return a.title.localeCompare(b.title);
    if (sort === "title-desc") return b.title.localeCompare(a.title);
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto p-4 mt-8 space-y-6">
      {/* Header with title and create task button */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={() => setShowTaskForm(!showTaskForm)}
          className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-5 py-2 rounded-lg font-medium shadow hover:shadow-lg transition duration-200 cursor-pointer"
        >
          {showTaskForm ? "Close Task Form" : "Create Task"}
        </button>
      </div>

      {/* Controls: Search, Filter, Sort */}
      <div className=" flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <TaskSearch setSearchQuery={setSearchQuery} />
        <div className="flex gap-2">
          <TaskFilter setFilter={setFilter} />
          <TaskSort setSort={setSort} />
        </div>
      </div>

      {/* Task creation form */}
      {showTaskForm && (
        <div className="animate-fade-in bg-white  p-4 ">
          <TaskForm onSave={handleSaveTask} existingTask={taskToEdit} />
        </div>
      )}


{/* Task display grid or fallback message */}
      {displayedTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-4 rounded-xl  hover:shadow-lg transition duration-300"
            >
              <TaskCard
                task={task}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic text-center mt-10">
          No tasks found.{" "}
          {tasks.length === 0
            ? 'Click "Create Task" to add one.'
            : "Try a different search or filter."}
        </p>
      )}
    </div>
  );
};

export default Dashboard;