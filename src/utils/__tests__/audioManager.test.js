import {beforeEach, describe, expect, it, vi} from 'vitest';
import * as audioManager from '../audioManager.js';

// helper to reset module state by re-importing if needed

describe('audioManager', () => {
    beforeEach(() => {
        // Reset spies
        vi.restoreAllMocks();
    });

    it('getAudio caches instances per key', () => {
        const a1 = audioManager.getAudio('honk');
        const a2 = audioManager.getAudio('honk');
        const b1 = audioManager.getAudio('crash');

        expect(a1).toBe(a2);
        expect(a1).not.toBe(b1);
        expect(a1).toBeInstanceOf(Audio);
    });

    it('play starts from beginning and resolves even if play rejects', async () => {
        const a = audioManager.getAudio('honk');
        const spy = vi.spyOn(a, 'play').mockRejectedValueOnce(new Error('policy'));
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {
        });

        await audioManager.play('honk', {fromStart: true});

        expect(spy).toHaveBeenCalled();
        expect(warn).toHaveBeenCalled();
    });

    it('play resolves when no audio key provided', async () => {
        await expect(audioManager.play('non-existent')).resolves.toBeUndefined();
    });

    it('warmUp plays and pauses a set of sounds once (unlocked)', async () => {
        const playSpy = vi.spyOn(Audio.prototype, 'play');
        const pauseSpy = vi.spyOn(Audio.prototype, 'pause');

        audioManager.warmUp();

        // Allow microtasks to flush
        await Promise.resolve();

        expect(playSpy).toHaveBeenCalled();
        expect(pauseSpy).toHaveBeenCalled();
    });
});
