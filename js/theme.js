
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleAccessibility = document.getElementById('theme-toggle-accessibility');
  const darkIcon = document.querySelector('.theme-icon-dark');
  const lightIcon = document.querySelector('.theme-icon-light');
  
  // Get saved theme from localStorage
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Update icon visibility based on current theme
  function updateThemeIcons() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      darkIcon.style.display = 'none';
      lightIcon.style.display = 'block';
    } else {
      darkIcon.style.display = 'block';
      lightIcon.style.display = 'none';
    }
  }
  
  // Toggle theme function
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    updateThemeIcons();
  }
  
  // Initialize icons
  updateThemeIcons();
  
  // Add click events to theme toggles
  themeToggle.addEventListener('click', toggleTheme);
  themeToggleAccessibility.addEventListener('click', toggleTheme);
});
