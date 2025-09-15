import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuizCard from '../QuizCard';
import {describe, expect, it, vi} from 'vitest';

// Mock the CSS module import to a plain object
vi.mock('../QuizCard.module.scss', () => ({default: {'quiz-card': 'quiz-card', answers: 'answers'}}), {virtual: true});

// Mock audioManager.getAudio to provide a controllable audio stub
vi.mock('../../utils/audioManager', () => {
    class AudioStub extends EventTarget {
        constructor() {
            super();
            this.currentTime = 0;
            this.paused = true;
            this.ended = false;
        }

        play() {
            this.paused = false;
            // fire ended soon to simulate short sound
            setTimeout(() => {
                this.ended = true;
                this.dispatchEvent(new Event('ended'));
            }, 0);
            return Promise.resolve();
        }

        pause() {
            this.paused = true;
        }

        addEventListener(...args) {
            return EventTarget.prototype.addEventListener.call(this, ...args);
        }

        removeEventListener(...args) {
            return EventTarget.prototype.removeEventListener.call(this, ...args);
        }
    }

    const cache = {};
    return {
        getAudio: (key) => {
            if (!cache[key]) cache[key] = new AudioStub();
            return cache[key];
        }
    };
});

describe('QuizCard', () => {
    const selectedBus = {
        model: 'Model X',
        image: '/images/x.jpg',
        answers: ['Model A', 'Model X', 'Model Z', 'Model Q']
    };

    it('renders question image and answers', () => {
        render(
            <QuizCard
                selectedBus={selectedBus}
                setSelectedBusIndex={() => {
                }}
                setNumberOfGoodAnswers={() => {
                }}
            />
        );

        expect(screen.getByRole('heading', {name: /what model is it/i})).toBeInTheDocument();
        expect(screen.getByAltText('Model X')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Model X'})).toBeInTheDocument();
    });

    it('increments score on correct answer and advances after sound ends', async () => {
        const user = userEvent.setup();
        const setIndex = vi.fn();
        const setGood = vi.fn((updater) => {
            // support functional updates
            if (typeof updater === 'function') updater(0);
        });

        render(
            <QuizCard
                selectedBus={selectedBus}
                setSelectedBusIndex={setIndex}
                setNumberOfGoodAnswers={setGood}
            />
        );

        await user.click(screen.getByRole('button', {name: 'Model X'}));

        // score increment attempted
        expect(setGood).toHaveBeenCalled();

        // wait for the microtask/timeout that dispatches 'ended'
        await new Promise((r) => setTimeout(r, 5));

        expect(setIndex).toHaveBeenCalled();
    });

    it('locks selection after first click', async () => {
        const user = userEvent.setup();

        render(
            <QuizCard
                selectedBus={selectedBus}
                setSelectedBusIndex={() => {
                }}
                setNumberOfGoodAnswers={() => {
                }}
            />
        );

        await user.click(screen.getByRole('button', {name: 'Model A'}));
        await user.click(screen.getByRole('button', {name: 'Model Z'}));

        // Only the first click should have been processed; visual check: first button has background color red
        expect(screen.getByRole('button', {name: 'Model A'})).toHaveStyle({backgroundColor: '#e74c3c'});
    });
});
