import React, { useEffect } from "react";

const ThemeToggle = () => {
  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  // Toggle theme on button click
  const toggleTheme = () => {
    const newTheme = document.documentElement.classList.contains("dark") ? "light" : "dark";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme); // Save theme selection
  };

  return (
    <button 
      onClick={toggleTheme} 
      className="bg-gray-700 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600"
    >
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;