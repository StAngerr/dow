import React, { useState } from "react";

export const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex items-center">
      <span className="text-sm font-medium mr-2">Dark Mode</span>
      <label
        htmlFor="darkModeToggle"
        className="flex items-center cursor-pointer"
      >
        <div
          className={`relative w-10 h-6 transition-all duration-200 rounded-full ${
            isDarkMode ? "bg-accent3" : `bg-border`
          }`}
        >
          <div
            className={`absolute w-4 h-4 transition-all duration-200 rounded-full ${
              isDarkMode ? "bg-accent1 left-6" : "bg-white left-0"
            }`}
          ></div>
        </div>
        <input
          type="checkbox"
          id="darkModeToggle"
          className="sr-only"
          checked={isDarkMode}
          onChange={handleToggle}
        />
      </label>
    </div>
  );
};
