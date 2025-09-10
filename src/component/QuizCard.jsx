import React from 'react';
import './QuizCard.scss';

const QuizCard = (props) => {

    return (<div className="quiz-card">
        <h2>What model is it?</h2>
        <img src={props.selectedBus.image} alt={props.selectedBus.model}/>
        <button>{props.selectedBus.model}</button>
    </div>);
};

export default QuizCard;
