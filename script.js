/**
 * Portfolio Website Script
 *
 * This script handles dynamic content updates and user interactions for the portfolio website.
 * It includes functionality for setting the current year in the footer, displaying the last edited date,
 * toggling between light and dark themes, and keeping navigation consistent across pages.
 */

const THEME_STORAGE_KEY = 'portfolioTheme';

let yearSpan = null;
let themeToggle = null;
let lastEditedSpan = null;

/**
 * Updates the footer year to the current calendar year.
 */
function setCurrentYear() {
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

/**
 * Uses the browser document metadata to show the last modified date for the current page.
 */
function setLastEditedDate() {
  if (lastEditedSpan) {
    const modifiedDate = document.lastModified ? new Date(document.lastModified) : new Date();
    lastEditedSpan.textContent = modifiedDate.toLocaleDateString('en-US');
  }
}

/**
 * Apply the saved theme preference from localStorage.
 */
function applySavedTheme() {
  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }

  updateThemeToggleText();
}

/**
 * Update the theme toggle button label to match the current theme state.
 */
function updateThemeToggleText() {
  if (!themeToggle) {
    return;
  }

  if (document.body.classList.contains('dark-mode')) {
    themeToggle.textContent = 'Switch to Light Mode';
  } else {
    themeToggle.textContent = 'Switch to Dark Mode';
  }
}

/**
 * Toggle dark mode and remember the preference in localStorage.
 */
function toggleTheme() {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');
  } else {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'light');
  }

  updateThemeToggleText();
}

/**
 * Ensure navigation links show the active page automatically.
 */
function setActiveNavigation() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute('href');

    if (!linkHref) {
      return;
    }

    if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Sets up the page once the DOM is ready.
 */
function initializeScript() {
  yearSpan = document.getElementById('year');
  themeToggle = document.getElementById('theme-toggle');
  lastEditedSpan = document.getElementById('last-edited');

  setCurrentYear();
  setLastEditedDate();
  applySavedTheme();
  setActiveNavigation();
  initializeCarousel();

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
}

let carouselIndex = 0;
let carouselSlides = [];
let carouselPrev = null;
let carouselNext = null;

function showCarouselSlide(index) {
  if (!carouselSlides.length) {
    return;
  }

  carouselSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === index);
  });
}

function initializeCarousel() {
  carouselSlides = Array.from(document.querySelectorAll('.carousel-slide'));
  carouselPrev = document.getElementById('carousel-prev');
  carouselNext = document.getElementById('carousel-next');

  if (!carouselSlides.length || !carouselPrev || !carouselNext) {
    return;
  }

  showCarouselSlide(carouselIndex);

  carouselPrev.addEventListener('click', () => {
    carouselIndex = (carouselIndex - 1 + carouselSlides.length) % carouselSlides.length;
    showCarouselSlide(carouselIndex);
  });

  carouselNext.addEventListener('click', () => {
    carouselIndex = (carouselIndex + 1) % carouselSlides.length;
    showCarouselSlide(carouselIndex);
  });
}

document.addEventListener('DOMContentLoaded', initializeScript);

