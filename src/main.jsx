import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Set runtime-dependent asset URLs based on Vite's BASE_URL
const baseUrl = (import.meta && import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : '/'
// Update CSS variable for background image so it works under subpath deployments
const bgUrl = `url('${baseUrl}images/background.webp')`
document.documentElement.style.setProperty('--bg-url', bgUrl)
// Ensure favicon also respects BASE_URL
const favicon = document.querySelector('link[rel="icon"]')
if (favicon) {
    favicon.href = `${baseUrl}images/icon.png`
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App/>
    </StrictMode>,
)
