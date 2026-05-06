/**
 * Portfolio Website Script
 *
 * This script handles dynamic content updates and user interactions for the portfolio website.
 * It includes functionality for setting the current year in the footer, displaying the last edited date,
 * and toggling between light and dark themes.
 */

// ========================================
// DOM Element References
// ========================================

/**
 * Reference to the span element that displays the current year in the footer.
 * @type {HTMLElement|null}
 */
const yearSpan = document.getElementById("year");

/**
 * Reference to the button that toggles the theme (light/dark mode).
 * @type {HTMLElement|null}
 */
const themeToggle = document.getElementById("theme-toggle");

/**
 * Reference to the span element that displays the last edited date in the footer.
 * @type {HTMLElement|null}
 */
const lastEditedSpan = document.getElementById("last-edited");

// ========================================
// Initialization Functions
// ========================================

/**
 * Sets the current year in the copyright section of the footer.
 * Uses the current date to dynamically update the year display.
 */
function setCurrentYear() {
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

/**
 * Sets the last edited date in the footer.
 * Displays the current date in MM/DD/YYYY format (US locale).
 */
function setLastEditedDate() {
  if (lastEditedSpan) {
    lastEditedSpan.textContent = new Date().toLocaleDateString('en-US');
  }
}

// ========================================
// Event Handlers
// ========================================

/**
 * Toggles the dark mode class on the body element and updates the theme toggle button text.
 * This function is attached to the theme toggle button's click event.
 */
function toggleTheme() {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeToggle.textContent = "Switch to Light Mode";
  } else {
    themeToggle.textContent = "Switch to Dark Mode";
  }
}

// ========================================
// Event Listeners Setup
// ========================================

/**
 * Initializes the script by setting up dynamic content and event listeners.
 * This function is called when the DOM is fully loaded.
 */
function initializeScript() {
  // Set dynamic footer content
  setCurrentYear();
  setLastEditedDate();

  // Attach event listener for theme toggle
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
}

// ========================================
// Script Execution
// ========================================

// Run initialization when the DOM content is loaded
document.addEventListener("DOMContentLoaded", initializeScript);
