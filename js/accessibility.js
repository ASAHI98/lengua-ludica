
// DOM Elements
const fontSizeSlider = document.getElementById('font-size-slider');
const fontSizeValue = document.getElementById('font-size-value');
const decreaseFontBtn = document.getElementById('decrease-font');
const increaseFontBtn = document.getElementById('increase-font');
const highContrastToggle = document.getElementById('high-contrast');
const resetSettingsBtn = document.getElementById('reset-settings');

// Font size controls in accessibility panel
const fontNormalBtn = document.getElementById('font-normal');
const fontLargeBtn = document.getElementById('font-large');
const fontXLargeBtn = document.getElementById('font-xlarge');
const toggleContrastBtn = document.getElementById('toggle-contrast');

// Initialize accessibility settings
function initializeAccessibility() {
  // Load saved font size
  const savedFontSize = localStorage.getItem('fontSize');
  if (savedFontSize) {
    setFontSize(parseInt(savedFontSize, 10));
    if (fontSizeSlider) fontSizeSlider.value = savedFontSize;
    if (fontSizeValue) fontSizeValue.textContent = `${savedFontSize}%`;
  }
  
  // Load high contrast setting
  const highContrast = localStorage.getItem('highContrast') === 'true';
  setHighContrast(highContrast);
  if (highContrastToggle) highContrastToggle.checked = highContrast;
}

// Set font size
function setFontSize(size) {
  document.documentElement.style.fontSize = `${size}%`;
  
  // Update UI if elements exist
  if (fontSizeValue) fontSizeValue.textContent = `${size}%`;
  if (fontSizeSlider) fontSizeSlider.value = String(size);
  
  // Save to localStorage
  localStorage.setItem('fontSize', String(size));
}

// Set high contrast
function setHighContrast(enabled) {
  if (enabled) {
    document.documentElement.classList.add('high-contrast');
  } else {
    document.documentElement.classList.remove('high-contrast');
  }
  
  // Update UI if toggle exists
  if (highContrastToggle) highContrastToggle.checked = enabled;
  
  // Save to localStorage
  localStorage.setItem('highContrast', String(enabled));
}

// Reset settings
function resetSettings() {
  setFontSize(100);
  setHighContrast(false);
  localStorage.removeItem('theme');
  
  // Use system preference for theme
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  }
  
  if (window.showNotification) {
    window.showNotification('Ajustes restablecidos a valores predeterminados');
  }
}

// Font size slider
if (fontSizeSlider) {
  fontSizeSlider.addEventListener('input', () => {
    const newSize = parseInt(fontSizeSlider.value, 10);
    setFontSize(newSize);
  });
}

// Font size buttons
if (decreaseFontBtn) {
  decreaseFontBtn.addEventListener('click', () => {
    const currentSize = parseInt(localStorage.getItem('fontSize') || '100', 10);
    const newSize = Math.max(70, currentSize - 10);
    setFontSize(newSize);
  });
}

if (increaseFontBtn) {
  increaseFontBtn.addEventListener('click', () => {
    const currentSize = parseInt(localStorage.getItem('fontSize') || '100', 10);
    const newSize = Math.min(150, currentSize + 10);
    setFontSize(newSize);
  });
}

// High contrast toggle
if (highContrastToggle) {
  highContrastToggle.addEventListener('change', () => {
    setHighContrast(highContrastToggle.checked);
    
    if (window.showNotification) {
      window.showNotification(
        `Alto contraste ${highContrastToggle.checked ? 'activado' : 'desactivado'}`
      );
    }
  });
}

// Reset settings button
if (resetSettingsBtn) {
  resetSettingsBtn.addEventListener('click', resetSettings);
}

// Panel font size controls
if (fontNormalBtn) {
  fontNormalBtn.addEventListener('click', () => {
    setFontSize(100);
    if (window.showNotification) window.showNotification('Tamaño de texto: normal');
  });
}

if (fontLargeBtn) {
  fontLargeBtn.addEventListener('click', () => {
    setFontSize(125);
    if (window.showNotification) window.showNotification('Tamaño de texto: grande');
  });
}

if (fontXLargeBtn) {
  fontXLargeBtn.addEventListener('click', () => {
    setFontSize(150);
    if (window.showNotification) window.showNotification('Tamaño de texto: muy grande');
  });
}

// Toggle contrast button in accessibility panel
if (toggleContrastBtn) {
  toggleContrastBtn.addEventListener('click', () => {
    const isHighContrast = document.documentElement.classList.contains('high-contrast');
    setHighContrast(!isHighContrast);
    
    if (window.showNotification) {
      window.showNotification(
        `Alto contraste ${!isHighContrast ? 'activado' : 'desactivado'}`
      );
    }
  });
}

// Initialize accessibility settings when page loads
document.addEventListener('DOMContentLoaded', initializeAccessibility);
