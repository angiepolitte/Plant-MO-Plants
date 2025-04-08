import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const SetTheme = () => {
  const [theme, setTheme] = useState("light");

  // Step 2: Toggle the theme between light and dark
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className>
      <button
        onClick={toggleTheme}
        style={{ fontSize: "24px", cursor: "pointer" }}
        className="theme-toggle-btn"
      >
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </button>
      {/*<h1>{theme === "light" ? "Light Mode" : "Dark Mode"}</h1>*/}
    </div>
  );
};

export default SetTheme;
