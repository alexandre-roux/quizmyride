import '@testing-library/jest-dom';

// Polyfill for HTMLMediaElement methods used in tests when not mocked
Object.defineProperty(globalThis, 'HTMLMediaElement', {
    value: class HTMLMediaElement extends EventTarget {
        constructor() {
            super();
            this._src = '';
            this.currentTime = 0;
            this.paused = true;
            this.ended = false;
            this.muted = false;
            this.volume = 1;
            this.preload = 'auto';
        }

        get src() {
            return this._src;
        }

        set src(val) {
            this._src = val;
        }

        load() {
        }

        play() {
            this.paused = false;
            // simulate async play that eventually ends
            queueMicrotask(() => {
                this.ended = true;
                this.dispatchEvent(new Event('ended'));
            });
            return Promise.resolve();
        }

        pause() {
            this.paused = true;
        }

        addEventListener(...args) {
            return super.addEventListener(...args);
        }

        removeEventListener(...args) {
            return super.removeEventListener(...args);
        }

        dispatchEvent(...args) {
            return super.dispatchEvent(...args);
        }
    },
});

// Provide a global Audio constructor leveraging HTMLMediaElement
class AudioShim extends globalThis.HTMLMediaElement {
    constructor(src = '') {
        super();
        this.src = src;
    }
}

// @ts-ignore
globalThis.Audio = AudioShim;
