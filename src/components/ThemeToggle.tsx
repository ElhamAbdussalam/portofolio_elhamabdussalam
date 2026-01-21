// src/components/ThemeToggle.tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 w-9 h-9" />
    );
  }

  const handleToggle = () => {
    console.log("=== TOGGLE START ===");
    console.log("Current theme:", theme);
    console.log(
      "Current HTML classes BEFORE:",
      document.documentElement.className,
    );

    const newTheme = theme === "dark" ? "light" : "dark";
    console.log("New theme will be:", newTheme);

    // Apply class immediately BEFORE state update
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      console.log("Added dark class");
    } else {
      document.documentElement.classList.remove("dark");
      console.log("Removed dark class");
    }

    console.log("HTML classes AFTER:", document.documentElement.className);

    // Save to localStorage
    localStorage.setItem("theme", newTheme);
    console.log("Saved to localStorage:", newTheme);

    // Then update state
    toggleTheme();
    console.log("State updated");
    console.log("=== TOGGLE END ===");
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
}
