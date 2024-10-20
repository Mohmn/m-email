import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { FilterProvider } from './contexts/filterContext.tsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <FilterProvider>
    <App />
  </FilterProvider>
  // </StrictMode>,
)
