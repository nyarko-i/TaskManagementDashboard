// src/utils/theme.js
export const setDarkTheme = () => {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  };
  
  export const setLightTheme = () => {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  };
  