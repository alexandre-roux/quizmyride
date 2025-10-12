import buses from '../data/buses'
import {preloadAllSounds} from './audioManager'

let started = false
let imageHolders: HTMLImageElement[] = []

// Resolve against BASE_URL at runtime (Vite)
const baseUrl = (import.meta && (import.meta as any).env && (import.meta as any).env.BASE_URL)
    ? (import.meta as any).env.BASE_URL
    : '/'

function absolute(url: string) {
    // If it's already absolute (http(s) or data), return as is
    if (/^(?:https?:)?\/\//i.test(url) || /^data:/i.test(url)) return url
    // Ensure single slash join
    if (url.startsWith('/')) url = url.slice(1)
    if (baseUrl.endsWith('/')) return `${baseUrl}${url}`
    return `${baseUrl}/${url}`
}

function preloadImage(url: string): Promise<void> {
    return new Promise((resolve) => {
        try {
            const img = new Image()
            imageHolders.push(img)
            img.onload = () => resolve()
            img.onerror = () => resolve()
            img.decoding = 'async'
            img.referrerPolicy = 'no-referrer'
            img.src = url
        } catch {
            resolve()
        }
    })
}

export async function preloadAssets(): Promise<void> {
    if (started) return
    started = true

    // Preload images: quiz images + UI images
    const imageUrls = new Set<string>()
    try {
        for (const b of buses) {
            if (b.image) imageUrls.add(b.image)
        }
    } catch {
        /* ignore */
    }
    // UI assets
    imageUrls.add(absolute('images/logo.png'))
    imageUrls.add(absolute('images/background.webp'))
    imageUrls.add(absolute('images/icon.png'))

    // Kick off audio preloading (non-blocking)
    try {
        preloadAllSounds()
    } catch {
        /* ignore */
    }

    // Start all image preloads in parallel; don't throw on failures
    await Promise.all(Array.from(imageUrls).map((u) => preloadImage(u)))

    // Keep a minimal timeout before freeing holders to give the browser a moment
    // to commit decoded bitmaps (not strictly necessary)
    window.setTimeout(() => {
        imageHolders = imageHolders.filter((img) => !img.complete)
    }, 1000)
}
