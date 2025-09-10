import React, {useEffect, useRef, useState} from 'react';
import './QuizCard.scss';

const QuizCard = ({selectedBus}) => {
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

        // Play corresponding sound
        const toPlay = correct ? honkRef.current : crashRef.current;
        if (toPlay) {
            try {
                toPlay.currentTime = 0;
                void toPlay.play(); // browsers require user gesture → ok (inside click)
            } catch {
                // ignore play errors
            }
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
