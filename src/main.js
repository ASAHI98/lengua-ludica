
import './index.css';
import './styles/toast.css';

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
  
  // Initialize App
  const appElement = document.getElementById('root');
  if (appElement) {
    import('./App.js').then(module => {
      const App = module.default;
      App();
    });
  }
  
  // Global toast notification system
  window.toast = {
    show(message, type = 'default', duration = 3000) {
      const toastContainer = document.getElementById('toast-container') || createToastContainer();
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.innerHTML = `
        <div class="toast-content">
          <p>${message}</p>
          <button class="toast-close">×</button>
        </div>
      `;
      
      toastContainer.appendChild(toast);
      
      // Add close button functionality
      const closeBtn = toast.querySelector('.toast-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          toast.classList.add('toast-dismiss');
          toast.addEventListener('animationend', () => {
            toastContainer.removeChild(toast);
          });
        });
      }
      
      // Auto dismiss
      setTimeout(() => {
        if (toast.parentNode === toastContainer) {
          toast.classList.add('toast-dismiss');
          toast.addEventListener('animationend', () => {
            if (toast.parentNode === toastContainer) {
              toastContainer.removeChild(toast);
            }
          });
        }
      }, duration);
    },
    
    success(message, duration) {
      this.show(message, 'success', duration);
    },
    
    error(message, duration) {
      this.show(message, 'error', duration);
    },
    
    warning(message, duration) {
      this.show(message, 'warning', duration);
    },
    
    info(message, duration) {
      this.show(message, 'info', duration);
    }
  };
  
  function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
  }
});
