import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
const DarkModeButton = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const buttonStyle = {
    backgroundColor: darkMode ? '#3d3d3d' : 'rgb(209 213 219)',
    color: darkMode ? 'rgb(209 213 219)' : '#3d3d3d',
    
  };

  // Apply dark mode styles to the root element
  if (darkMode) {
    document.documentElement.classList.add('dark-mode');
  } else {
    document.documentElement.classList.remove('dark-mode');
  }
  const icon = darkMode ? faMoon : faSun;
  return (
    <div className="dark-mode-container">
      <button
        className="dark-mode-button"
        style={buttonStyle}
        onClick={handleDarkModeToggle}
      >
        <FontAwesomeIcon icon={icon} />
      </button>
    </div>
  );
};

export default DarkModeButton;
