
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initUserProgress } from './services/UserProgress.ts'

// Inicializar progreso del usuario
initUserProgress();

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
