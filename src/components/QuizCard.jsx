import React, {useEffect, useRef, useState} from 'react';
import PropTypes from '../shims/prop-types';
import styles from './QuizCard.module.scss';
import {getAudio} from '../utils/audioManager';
import AnswerOptions from './AnswerOptions.jsx';

const QuizCard = ({selectedBus, setSelectedBusIndex, setNumberOfGoodAnswers}) => {
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

    // Audio refs
    const honkRef = useRef();
    const crashRef = useRef();

    // Initialize and cache audio elements once via audioManager for instant playback
    useEffect(() => {
        honkRef.current = getAudio('honk');
        crashRef.current = getAudio('crash');

        return () => {
            [honkRef.current, crashRef.current].forEach(audio => {
                if (audio) {
                    try {
                        audio.pause();
                    } catch { /* ignore */
                    }
                }
            });
        };
    }, []);

    // Reset choice when selected bus changes
    useEffect(() => {
        setSelectedAnswerIndex(null);
    }, [selectedBus]);

    // Safely extract answers
    const answers = selectedBus?.answers ?? [];

    const isCorrect = (answer) => answer === selectedBus?.model;

    const handleClick = (index) => {
        if (selectedAnswerIndex !== null) return; // lock after first choice

        setSelectedAnswerIndex(index);
        const answer = answers[index];
        const correct = isCorrect(answer);
        if (correct) {
            setNumberOfGoodAnswers(prev => prev + 1);
        }

        // Play corresponding sound and advance after it ends
        const toPlay = correct ? honkRef.current : crashRef.current;

        const advance = () => setSelectedBusIndex(prev => prev + 1);

        if (toPlay) {
            try {
                // Ensure from start
                toPlay.currentTime = 0;

                // Prepare a one-time handler
                const onEnded = () => {
                    // guard: only advance if this card still mounted and an answer was chosen
                    advance();
                };
                toPlay.addEventListener('ended', onEnded, {once: true});

                const playPromise = toPlay.play(); // user gesture context
                // If play() returns a promise, handle rejection and set a fallback
                if (playPromise && typeof playPromise.catch === 'function') {
                    playPromise.catch(() => {
                        // If playback failed (e.g., autoplay policies), fallback to quick advance
                        toPlay.removeEventListener('ended', onEnded);
                        advance();
                    });
                }

                // Safety fallback: in case 'ended' never fires (corrupt audio), advance after 3s
                // Only set this after a user click; and clear it if audio actually ends
                const safetyTimer = setTimeout(() => {
                    // If still playing, let 'ended' handle it
                    if (toPlay && !toPlay.paused && !toPlay.ended) return;
                    // Otherwise, advance as a safety net
                    advance();
                }, 3000);

                // Wrap onEnded to also clear safety timer
                const originalOnEnded = onEnded;
                const clearAndAdvance = () => {
                    clearTimeout(safetyTimer);
                    originalOnEnded();
                };
                toPlay.removeEventListener('ended', onEnded);
                toPlay.addEventListener('ended', clearAndAdvance, {once: true});
            } catch {
                // If any error occurs during play, advance immediately
                advance();
            }
        } else {
            // No audio available; advance immediately
            advance();
        }
    };

    return (
        <div className={styles['quiz-card']}>
            <h2>What model is it?</h2>
            {selectedBus && (
                <>
                    <div className={styles.media}>
                        <img src={selectedBus.image} alt={selectedBus.model} loading="lazy"/>
                        <AnswerOptions
                            className={styles.answers}
                            answers={answers}
                            selectedIndex={selectedAnswerIndex}
                            correctAnswer={selectedBus.model}
                            onSelect={handleClick}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

QuizCard.propTypes = {
    selectedBus: PropTypes.shape({
        model: PropTypes.string,
        image: PropTypes.string,
        answers: PropTypes.arrayOf(PropTypes.string),
    }),
    setSelectedBusIndex: PropTypes.func.isRequired,
    setNumberOfGoodAnswers: PropTypes.func.isRequired,
};

export default QuizCard;
