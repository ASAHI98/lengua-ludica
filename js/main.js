
// DOM Elements
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const accessibilityToggle = document.getElementById('accessibility-toggle');
const accessibilityPanel = document.getElementById('accessibility-panel');
const settingsPanel = document.getElementById('settings-panel');
const closeSettings = document.getElementById('close-settings');

// Update copyright year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Mobile Menu Toggle
if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    mobileMenuToggle.setAttribute('aria-expanded', isOpen);
    mobileMenuToggle.innerHTML = isOpen ? 
      '<i class="fas fa-times"></i>' : 
      '<i class="fas fa-bars"></i>';
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
  if (mobileMenu && mobileMenuToggle && !mobileMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
    mobileMenu.classList.remove('open');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  }
});

// Accessibility Panel Toggle
if (accessibilityToggle) {
  accessibilityToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    accessibilityPanel.classList.toggle('hidden');
  });
}

// Close accessibility panel when clicking outside
document.addEventListener('click', (event) => {
  if (accessibilityPanel && accessibilityToggle && 
      !accessibilityPanel.contains(event.target) && 
      !accessibilityToggle.contains(event.target)) {
    accessibilityPanel.classList.add('hidden');
  }
});

// Settings Panel
if (closeSettings) {
  closeSettings.addEventListener('click', () => {
    settingsPanel.classList.add('hidden');
  });
}

// Close settings panel when clicking outside content
settingsPanel?.addEventListener('click', (event) => {
  if (event.target === settingsPanel) {
    settingsPanel.classList.add('hidden');
  }
});

// Close panels on ESC key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (accessibilityPanel) accessibilityPanel.classList.add('hidden');
    if (settingsPanel) settingsPanel.classList.add('hidden');
  }
});

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', () => {
  // Add active class to current page in navigation
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link, .mobile-nav .nav-link');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentPath === linkPath || 
        (currentPath.includes(linkPath) && linkPath !== '/')) {
      link.classList.add('active');
    }
  });
  
  // Show notifications
  function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
      </div>
      <button class="notification-close">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Auto dismiss
    const dismissTimeout = setTimeout(() => {
      dismissNotification(notification);
    }, 5000);
    
    // Manual dismiss
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      clearTimeout(dismissTimeout);
      dismissNotification(notification);
    });
  }
  
  function dismissNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }
  
  // Expose notification function globally
  window.showNotification = showNotification;
});

// Helper Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
