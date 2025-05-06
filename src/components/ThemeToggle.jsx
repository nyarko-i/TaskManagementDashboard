// src/components/ThemeSwitchToggle.jsx
import React, { useState, useEffect } from "react";
import { setDarkTheme, setLightTheme } from "../utils/theme";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Load theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.theme;
    if (savedTheme === "dark") {
      setIsDark(true);
      setDarkTheme();
    } else {
      setIsDark(false);
      setLightTheme();
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      setLightTheme();
      setIsDark(false);
    } else {
      setDarkTheme();
      setIsDark(true);
    }
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        checked={isDark}
        onChange={toggleTheme}
      />
      <span className="w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-700"></span>
      <span
        className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out ${
          isDark ? "transform translate-x-5" : ""
        }`}
      ></span>
    </label>
  );
}
