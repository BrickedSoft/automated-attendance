import React from 'react'
import ReactDOM from 'react-dom/client'

import './global.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div className="relative flex flex-col justify-between min-h-screen overflow-x-hidden">
      <App />
    </div>
  </React.StrictMode>
)
