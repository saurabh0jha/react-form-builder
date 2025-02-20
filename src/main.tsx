import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/Index.css'
import './styles/Colors.css'
import './styles/Fonts.css'
import './styles/Headings.css'
import './styles/Buttons.css'
import './styles/Inputs.css'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
