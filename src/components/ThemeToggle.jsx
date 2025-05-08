import { useState, useEffect } from 'react';

const ThemeToggle = () => {
  // State to track whether the component has mounted.
  // This helps prevent hydration issues in React when dealing with localStorage
  const [isMounted, setIsMounted] = useState(false);

  // State to hold the current theme ('light' or 'dark')
  const [theme, setTheme] = useState('light');

  // useEffect hook to handle theme initialization and updates
  useEffect(() => {
    // Set the 'isMounted' state to true once the component has rendered on the client
    setIsMounted(true);

    // Get the theme preference from localStorage
    const storedTheme = localStorage.getItem('theme');

    // Check if a theme is stored in localStorage
    if (storedTheme) {
      setTheme(storedTheme);
      // Apply the theme to the document element
      if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // If no theme is stored, check the user's system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
      // Apply the initial theme based on system preference
      if (prefersDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark'); // Store the preference
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light'); // Store the preference
      }
    }
  }, []); // Empty dependency array ensures this runs only once after the initial render

  // Function to toggle the theme
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark'); // Update localStorage
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light'); // Update localStorage
    }
  };

  // We only want to render the button after the component has mounted
  // to avoid potential mismatches between server and client rendering.
  if (!isMounted) {
    return null; // Or a placeholder like <div>Loading theme...</div> if you prefer
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg border bg-gray-100 dark:bg-gray-800 dark:text-white transition-colors duration-300"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default ThemeToggle;