import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    // If deploying under a subpath (e.g., GitHub Pages: /quizmyride/), set base accordingly.
    // You can override via env: set VITE_BASE_URL to desired base path.
    base: process.env.VITE_BASE_URL || '/quizmyride/',
    plugins: [react()],
    test: {
        environment: 'jsdom',
        setupFiles: './vitest.setup.js',
        globals: true,
        css: true,
    },
})
