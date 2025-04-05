
// Accessibility settings
document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const accessibilityToggle = document.getElementById('accessibility-toggle');
  const settingsPanel = document.getElementById('settings-panel');
  const closeSettings = document.getElementById('close-settings');
  const fontSizeRange = document.getElementById('font-size-range');
  const fontSizeValue = document.getElementById('font-size-value');
  const increaseFont = document.getElementById('increase-font');
  const decreaseFont = document.getElementById('decrease-font');
  const highContrastToggle = document.getElementById('high-contrast-toggle');
  
  // Load saved accessibility settings
  loadAccessibilitySettings();
  
  // Toggle settings panel
  if (accessibilityToggle) {
    accessibilityToggle.addEventListener('click', function() {
      settingsPanel.classList.toggle('open');
    });
  }
  
  // Close settings panel
  if (closeSettings) {
    closeSettings.addEventListener('click', function() {
      settingsPanel.classList.remove('open');
    });
  }
  
  // Font size slider
  if (fontSizeRange) {
    fontSizeRange.addEventListener('input', function() {
      changeFontSize(this.value);
    });
  }
  
  // Increase font size button
  if (increaseFont) {
    increaseFont.addEventListener('click', function() {
      const currentSize = parseInt(fontSizeRange.value);
      const newSize = Math.min(currentSize + 25, 150);
      fontSizeRange.value = newSize;
      changeFontSize(newSize);
    });
  }
  
  // Decrease font size button
  if (decreaseFont) {
    decreaseFont.addEventListener('click', function() {
      const currentSize = parseInt(fontSizeRange.value);
      const newSize = Math.max(currentSize - 25, 100);
      fontSizeRange.value = newSize;
      changeFontSize(newSize);
    });
  }
  
  // High contrast toggle
  if (highContrastToggle) {
    highContrastToggle.addEventListener('change', function() {
      toggleHighContrast(this.checked);
    });
  }
  
  // Change font size
  function changeFontSize(size) {
    document.body.style.fontSize = size + '%';
    if (fontSizeValue) fontSizeValue.textContent = size + '%';
    
    // Remove existing font size classes
    document.body.classList.remove('font-size-large', 'font-size-extra-large');
    
    // Add appropriate class
    if (size == 125) {
      document.body.classList.add('font-size-large');
    } else if (size == 150) {
      document.body.classList.add('font-size-extra-large');
    }
    
    // Save setting to localStorage
    localStorage.setItem('fontSizePreference', size);
    
    // Show notification
    if (window.showNotification) {
      window.showNotification(`Tamaño de texto cambiado a ${size}%`);
    }
  }
  
  // Toggle high contrast
  function toggleHighContrast(enabled) {
    if (enabled) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    
    // Save setting to localStorage
    localStorage.setItem('highContrastPreference', enabled);
    
    // Show notification
    if (window.showNotification) {
      window.showNotification(enabled ? 'Alto contraste activado' : 'Alto contraste desactivado');
    }
  }
  
  // Load accessibility settings from localStorage
  function loadAccessibilitySettings() {
    // Load font size preference
    const savedFontSize = localStorage.getItem('fontSizePreference');
    if (savedFontSize) {
      if (fontSizeRange) fontSizeRange.value = savedFontSize;
      changeFontSize(savedFontSize);
    }
    
    // Load high contrast preference
    const savedHighContrast = localStorage.getItem('highContrastPreference') === 'true';
    if (highContrastToggle) highContrastToggle.checked = savedHighContrast;
    toggleHighContrast(savedHighContrast);
  }
  
  // Close settings panel when clicking outside
  document.addEventListener('click', function(event) {
    if (settingsPanel && accessibilityToggle) {
      if (!settingsPanel.contains(event.target) && !accessibilityToggle.contains(event.target)) {
        settingsPanel.classList.remove('open');
      }
    }
  });
  
  // Common notification function (if not already defined)
  if (!window.showNotification) {
    window.showNotification = function(message) {
      const notification = document.getElementById('notification');
      const notificationMessage = document.getElementById('notification-message');
      
      if (notification && notificationMessage) {
        notificationMessage.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
          notification.classList.remove('show');
        }, 3000);
      }
    };
  }
});
