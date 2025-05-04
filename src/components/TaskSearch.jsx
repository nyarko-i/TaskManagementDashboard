import React, { useState } from "react";

// Debounce function to prevent excessive search re-renders
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

// TaskSearch Component: Allows users to search tasks by title or description
const TaskSearch = ({ setSearchQuery }) => {
  const [query, setQuery] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Apply debounce before updating the search state
    debounce(() => setSearchQuery(value), 300)();
  };

  return (
    <div className="mb-4">
      <label className="font-semibold mr-2">Search Task:</label>
      <input
        type="text"
        className="border p-2 w-80"
        placeholder="Enter task title or description..."
        value={query}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default TaskSearch;