import React from "react";

// TaskFilter Component: Allows users to filter tasks by status
const TaskFilter = ({ setFilter }) => {
  return (
    <div className="mb-4">
      <label className="font-semibold mr-2">Filter by Status:</label>
      <select
        className="border p-2 rounded-2xl border-gray-400"
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In-Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
};

export default TaskFilter;