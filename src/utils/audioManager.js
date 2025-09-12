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
    audio.preload = 'auto';
    audio.volume = volume;
    // Hint the browser to fetch and decode early
    try {
        audio.load();
    } catch { /* ignore */
    }
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
            // Log playback errors instead of silently ignoring
            try {
                console.warn('[audioManager] Failed to play sound', {key, src: audio && audio.src, error: err});
            } catch {
                // fallback in case console object is not available
            }
        });
    }
    return Promise.resolve();
}

// Call this once on a user gesture to unlock playback on mobile and warm cache
export function warmUp() {
    if (warmedUp) return;
    warmedUp = true;
    // Play and immediately pause to unlock; do it quietly
    ['gong', 'honk', 'crash', 'yay', 'sad'].forEach((k) => {
        const a = getAudio(k);
        if (!a) return;
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
                pr.then(stop).catch((err) => {
                    // Log warm-up playback errors
                    try {
                        console.warn('[audioManager] Warm-up play failed', {key: k, src: a && a.src, error: err});
                    } catch {
                        // ignore logging failures
                    }
                    stop();
                });
            } else {
                stop();
            }
        } catch { /* ignore */
        }
    });
}
