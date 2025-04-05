
document.addEventListener('DOMContentLoaded', function() {
  const accessibilityButton = document.getElementById('accessibility-button');
  const accessibilityPanel = document.getElementById('accessibility-panel');
  const fontNormalBtn = document.getElementById('font-normal');
  const fontLargeBtn = document.getElementById('font-large');
  const fontXLargeBtn = document.getElementById('font-xlarge');
  const contrastToggle = document.getElementById('contrast-toggle');
  
  // Get saved settings from localStorage
  const savedFontSize = localStorage.getItem('fontSize') || 'normal';
  const savedContrast = localStorage.getItem('contrastMode') || 'normal';
  
  // Apply saved settings
  document.documentElement.setAttribute('data-font-size', savedFontSize);
  document.documentElement.setAttribute('data-contrast', savedContrast);
  
  // Update active button states
  function updateButtonStates() {
    const currentFontSize = document.documentElement.getAttribute('data-font-size');
    
    fontNormalBtn.classList.remove('active');
    fontLargeBtn.classList.remove('active');
    fontXLargeBtn.classList.remove('active');
    
    if (currentFontSize === 'normal') {
      fontNormalBtn.classList.add('active');
    } else if (currentFontSize === 'large') {
      fontLargeBtn.classList.add('active');
    } else if (currentFontSize === 'extra-large') {
      fontXLargeBtn.classList.add('active');
    }
  }
  
  // Toggle accessibility panel
  accessibilityButton.addEventListener('click', function(e) {
    e.stopPropagation();
    accessibilityPanel.classList.toggle('hidden');
    updateButtonStates();
  });
  
  // Close panel when clicking outside
  document.addEventListener('click', function(e) {
    if (!accessibilityPanel.contains(e.target) && e.target !== accessibilityButton) {
      accessibilityPanel.classList.add('hidden');
    }
  });
  
  // Font size buttons
  fontNormalBtn.addEventListener('click', function() {
    document.documentElement.setAttribute('data-font-size', 'normal');
    localStorage.setItem('fontSize', 'normal');
    updateButtonStates();
  });
  
  fontLargeBtn.addEventListener('click', function() {
    document.documentElement.setAttribute('data-font-size', 'large');
    localStorage.setItem('fontSize', 'large');
    updateButtonStates();
  });
  
  fontXLargeBtn.addEventListener('click', function() {
    document.documentElement.setAttribute('data-font-size', 'extra-large');
    localStorage.setItem('fontSize', 'extra-large');
    updateButtonStates();
  });
  
  // Contrast toggle
  contrastToggle.addEventListener('click', function() {
    const currentContrast = document.documentElement.getAttribute('data-contrast');
    const newContrast = currentContrast === 'normal' ? 'high-contrast' : 'normal';
    
    document.documentElement.setAttribute('data-contrast', newContrast);
    localStorage.setItem('contrastMode', newContrast);
  });
  
  // Initialize
  updateButtonStates();
});
