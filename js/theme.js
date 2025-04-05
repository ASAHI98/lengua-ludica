
// Theme functionality
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  const settingsPanel = document.getElementById('settings-panel');
  const closeSettings = document.getElementById('close-settings');
  const lightTheme = document.getElementById('light-theme');
  const darkTheme = document.getElementById('dark-theme');
  const systemTheme = document.getElementById('system-theme');
  const accessibilityToggle = document.getElementById('accessibility-toggle');
  
  // Helper function to set theme
  function setTheme(theme) {
    const body = document.body;
    
    // Remove existing theme classes
    body.classList.remove('light-theme', 'dark-theme');
    
    // Add new theme class
    body.classList.add(theme + '-theme');
    
    // Update icon in toggle button
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
      }
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Show notification
    if (window.showNotification) {
      window.showNotification(theme === 'light' ? 'Tema claro activado' : 'Tema oscuro activado');
    }
    
    // Update system theme status
    if (systemTheme) {
      systemTheme.classList.toggle('active', theme === 'system');
    }
  }
  
  // Load theme from localStorage
  function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      if (savedTheme === 'system') {
        applySystemTheme();
      } else {
        setTheme(savedTheme);
      }
    } else {
      // Default to system preference
      applySystemTheme();
    }
  }
  
  // Apply system theme based on user's preference
  function applySystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
    
    localStorage.setItem('theme', 'system');
    
    // Update system theme status
    if (systemTheme) {
      systemTheme.classList.add('active');
    }
  }
  
  // Theme toggle button event
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
    });
  }
  
  // Accessibility panel toggle
  if (accessibilityToggle && settingsPanel) {
    accessibilityToggle.addEventListener('click', function() {
      settingsPanel.classList.toggle('open');
    });
  }
  
  // Close settings panel
  if (closeSettings && settingsPanel) {
    closeSettings.addEventListener('click', function() {
      settingsPanel.classList.remove('open');
    });
  }
  
  // Theme option buttons
  if (lightTheme) {
    lightTheme.addEventListener('click', function() {
      setTheme('light');
    });
  }
  
  if (darkTheme) {
    darkTheme.addEventListener('click', function() {
      setTheme('dark');
    });
  }
  
  if (systemTheme) {
    systemTheme.addEventListener('click', function() {
      applySystemTheme();
    });
  }
  
  // Initialize theme
  loadTheme();
  
  // Listen for system theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'system') {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
});
