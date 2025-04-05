
import './index.css';

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  console.log('Application initialized');
  
  // Initialize theme from localStorage if available
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Initialize accessibility settings
  const fontSize = localStorage.getItem('fontSize') || 'normal';
  const contrastMode = localStorage.getItem('contrastMode') || 'normal';
  
  document.documentElement.setAttribute('data-font-size', fontSize);
  document.documentElement.setAttribute('data-contrast', contrastMode);
});
