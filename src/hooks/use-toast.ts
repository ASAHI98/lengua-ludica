
// Simple toast notification system

interface ToastOptions {
  duration?: number;
}

export const toast = {
  show(message: string, type = 'default', duration = 3000) {
    const toastContainer = document.getElementById('toast-container') || createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <p>${message}</p>
      </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto dismiss
    setTimeout(() => {
      toast.classList.add('toast-dismiss');
      toast.addEventListener('animationend', () => {
        toastContainer.removeChild(toast);
      });
    }, duration);
  },
  
  success(message: string, duration?: number) {
    this.show(message, 'success', duration);
  },
  
  error(message: string, duration?: number) {
    this.show(message, 'error', duration);
  },
  
  warning(message: string, duration?: number) {
    this.show(message, 'warning', duration);
  },
  
  info(message: string, duration?: number) {
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
