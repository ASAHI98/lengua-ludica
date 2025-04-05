
// Theme settings
const themeToggle = document.getElementById('theme-toggle');
const lightThemeBtn = document.getElementById('light-theme');
const darkThemeBtn = document.getElementById('dark-theme');
const systemThemeBtn = document.getElementById('system-theme');

// Initialize theme
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    // Use system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }
}

// Set theme
function setTheme(theme) {
  const body = document.body;
  
  // Remove all theme classes
  body.classList.remove('light-theme', 'dark-theme');
  
  if (theme === 'system') {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      body.classList.add('dark-theme');
      updateThemeIcon('dark');
    } else {
      body.classList.add('light-theme');
      updateThemeIcon('light');
    }
    localStorage.removeItem('theme'); // Use system preference
  } else {
    body.classList.add(`${theme}-theme`);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
  }
  
  // Update button states if they exist
  if (lightThemeBtn) lightThemeBtn.classList.toggle('active', theme === 'light');
  if (darkThemeBtn) darkThemeBtn.classList.toggle('active', theme === 'dark');
  if (systemThemeBtn) systemThemeBtn.classList.toggle('active', theme === 'system');
}

// Update theme icon
function updateThemeIcon(theme) {
  if (themeToggle) {
    themeToggle.innerHTML = theme === 'dark' ? 
      '<i class="fas fa-sun"></i>' : 
      '<i class="fas fa-moon"></i>';
    
    themeToggle.setAttribute('aria-label', 
      theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
  }
}

// Toggle between light and dark theme
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    
    // Show notification
    if (window.showNotification) {
      window.showNotification(`Tema cambiado a ${currentTheme === 'dark' ? 'claro' : 'oscuro'}`);
    }
  });
}

// Theme buttons in settings panel
if (lightThemeBtn) {
  lightThemeBtn.addEventListener('click', () => {
    setTheme('light');
    if (window.showNotification) window.showNotification('Tema cambiado a claro');
  });
}

if (darkThemeBtn) {
  darkThemeBtn.addEventListener('click', () => {
    setTheme('dark');
    if (window.showNotification) window.showNotification('Tema cambiado a oscuro');
  });
}

if (systemThemeBtn) {
  systemThemeBtn.addEventListener('click', () => {
    setTheme('system');
    if (window.showNotification) window.showNotification('Tema cambiado a preferencia del sistema');
  });
}

// Watch for system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  if (!localStorage.getItem('theme')) {
    setTheme(event.matches ? 'dark' : 'light');
  }
});

// Initialize theme when page loads
document.addEventListener('DOMContentLoaded', initializeTheme);
