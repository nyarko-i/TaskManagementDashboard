import React from "react";

// TaskSort Component: Allows users to sort tasks by due date or title
const TaskSort = ({ setSort }) => {
  return (
    <div className="mb-4">
      <label className="font-medium mr-2">Sort by:</label>
      <select
        className="border p-2 rounded-2xl border-gray-400"
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="date-asc">Due Date (Oldest First)</option>
        <option value="date-desc">Due Date (Newest First)</option>
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
      </select>
    </div>
  );
};

export default TaskSort;