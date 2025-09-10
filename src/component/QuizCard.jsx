import React from 'react';
import './QuizCard.scss';

const QuizCard = (props) => {
    const answers = props.selectedBus && Array.isArray(props.selectedBus.answers)
        ? props.selectedBus.answers
        : [];

    return (
        <div className="quiz-card">
            <h2>What model is it?</h2>
            <img src={props.selectedBus.image} alt={props.selectedBus.model}/>
            <div className="answers">
                {answers.slice(0, 4).map((answer, idx) => (
                    <button key={idx} type="button">
                        {answer}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuizCard;
