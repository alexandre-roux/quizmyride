import React, {useEffect, useState} from 'react';
import './QuizCard.scss';

const QuizCard = ({selectedBus}) => {
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

    // Reset choice when selected bus changes
    useEffect(() => {
        setSelectedAnswerIndex(null);
    }, [selectedBus]);

    // Safely extract answers
    const answers = selectedBus?.answers ?? [];

    const handleClick = (index) => {
        if (selectedAnswerIndex === null) {
            setSelectedAnswerIndex(index); // lock after first choice
        }
    };

    const isCorrect = (answer) => answer === selectedBus?.model;

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
