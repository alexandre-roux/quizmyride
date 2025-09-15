import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// Determine platform-specific native esbuild packages to externalize during bundling
const platformExternal = []
if (process.platform === 'win32' && process.arch === 'x64') {
    // Externalize the native esbuild binary for Windows x64 so Rollup/Vite won't try to bundle it
    platformExternal.push('@esbuild/win32-x64')
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/', // ✅ use root path on Netlify
    build: {
        rollupOptions: {
            // Prevent bundling platform-specific native packages that are not needed in the browser
            external: platformExternal,
        },
    },
    test: {
        environment: 'jsdom',
        setupFiles: './vitest.setup.js',
        globals: true,
        css: true,
    },
})
