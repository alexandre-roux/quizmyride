// Simple audio manager to preload and reuse audio elements for instant playback
// Ensures minimal latency by:
// - Creating singletons per sound
// - Setting preload to 'auto' and calling load()
// - Optionally warming up on first user interaction to bypass autoplay restrictions

// Resolve asset paths against Vite's base URL so production builds work from subpaths
const baseUrl = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : '/';
const assetPath = (p) => {
    const clean = String(p).replace(/^\/+/, '');
    if (!baseUrl) return `/${clean}`;
    if (baseUrl.endsWith('/')) return `${baseUrl}${clean}`;
    return `${baseUrl}/${clean}`;
};

// Relative paths under public/ so they are copied as-is by Vite
const soundsRel = {
    yay: 'sounds/yay.mp3',
    sad: 'sounds/sad-trombone.mp3',
    honk: 'sounds/honk.mp3',
    crash: 'sounds/crash.mp3',
    gong: 'sounds/bvg-gong.mp3',
};

const cache = {};
let warmedUp = false;

function createAudio(src, volume = 0.8) {
    const audio = new Audio(src);
    // Prefer lazy loading to improve initial load: let the browser fetch when play() is called or when warmed up
    audio.preload = 'none';
    audio.volume = volume;
    return audio;
}

export function getAudio(key) {
    const rel = soundsRel[key];
    if (!rel) return null;
    const src = assetPath(rel);
    if (!cache[key]) {
        cache[key] = createAudio(src);
    }
    return cache[key];
}

export function play(key, {fromStart = true} = {}) {
    const audio = getAudio(key);
    if (!audio) return Promise.resolve();
    if (fromStart) {
        try {
            audio.currentTime = 0;
        } catch { /* ignore */
        }
    }
    const p = audio.play();
    if (p && typeof p.catch === 'function') {
        return p.catch((err) => {
            // Log playback errors instead of silently ignoring and notify UI
            const detail = {key, src: audio && audio.src, errorMessage: err && (err.message || String(err))};
            try {
                console.warn('[audioManager] Failed to play sound', detail);
            } catch { /* ignore */
            }
            try {
                if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
                    window.dispatchEvent(new CustomEvent('audio-error', {detail}));
                }
            } catch { /* ignore */
            }
        });
    }
    return Promise.resolve();
}

// Call this once on a user gesture to unlock playback on mobile and warm cache
export function warmUp() {
    if (warmedUp) return Promise.resolve();
    warmedUp = true;

    // Unlock audio by playing a muted sound in response to a user gesture,
    // then pausing it and unmuting for subsequent real playback.
    // We only need to unlock once; use the gong asset for this purpose.
    const a = getAudio('gong');
    if (!a) return Promise.resolve();

    try {
        a.muted = true;
        a.currentTime = 0;
        const pr = a.play();
        const stop = () => {
            try {
                a.pause();
            } catch { /* ignore */
            }
            a.muted = false;
        };
        if (pr && typeof pr.then === 'function') {
            return pr.then(() => {
                stop();
            }).catch((err) => {
                const detail = {key: 'gong', src: a && a.src, errorMessage: err && (err.message || String(err))};
                try {
                    console.warn('[audioManager] Warm-up play failed', detail);
                } catch { /* ignore */
                }
                try {
                    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
                        window.dispatchEvent(new CustomEvent('audio-error', {detail}));
                    }
                } catch { /* ignore */
                }
                stop();
            });
        }
        // Fallback for browsers returning no promise
        stop();
        return Promise.resolve();
    } catch {
        return Promise.resolve();
    }
}
