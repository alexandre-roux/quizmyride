import React, {useEffect, useRef, useState} from 'react';
import './QuizCard.scss';

const QuizCard = ({selectedBus, setSelectedBusIndex}) => {
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

    // Audio refs
    const honkRef = useRef();
    const crashRef = useRef();

    // Initialize audio elements once
    useEffect(() => {
        honkRef.current = new Audio('/sounds/honk.mp3');
        crashRef.current = new Audio('/sounds/crash.mp3');

        // Lower volume a bit to be user-friendly
        [honkRef.current, crashRef.current].forEach(audio => {
            if (audio) audio.volume = 0.8;
        });

        return () => {
            [honkRef.current, crashRef.current].forEach(audio => {
                if (audio) {
                    audio.pause();
                    audio.src = '';
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

        // Play corresponding sound and advance after it ends
        const toPlay = correct ? honkRef.current : crashRef.current;

        const advance = () => setSelectedBusIndex(prev => prev + 1);

        if (toPlay) {
            try {
                // Ensure from start
                toPlay.currentTime = 0;

                // Prepare a one-time handler
                const onEnded = () => {
                    toPlay.removeEventListener('ended', onEnded);
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
                setTimeout(() => {
                    // If still playing, let 'ended' handle it
                    if (toPlay && !toPlay.paused && !toPlay.ended) return;
                    // Otherwise, advance as a safety net
                    advance();
                }, 3000);
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
        <div className="quiz-card">
            <h2>What model is it?</h2>
            {selectedBus && (
                <>
                    <img src={selectedBus.image} alt={selectedBus.model}/>
                    <div className="answers">
                        {answers.slice(0, 4).map((answer, idx) => {
                            const chosen = selectedAnswerIndex === idx;
                            const style =
                                selectedAnswerIndex !== null && chosen
                                    ? {
                                        backgroundColor: isCorrect(answer) ? '#2ecc71' : '#e74c3c',
                                        borderColor: 'black',
                                        color: 'white',
                                    }
                                    : undefined;

                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => handleClick(idx)}
                                    style={style}
                                >
                                    {answer}
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default QuizCard;
