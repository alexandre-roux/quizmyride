import React from 'react';
import './QuizCard.scss';

const QuizCard = (props) => {
    const [chosenIndex, setChosenIndex] = React.useState(null);

    // reset choice when selected bus changes
    React.useEffect(() => {
        setChosenIndex(null);
    }, [props.selectedBus]);

    const answers = props.selectedBus && Array.isArray(props.selectedBus.answers)
        ? props.selectedBus.answers
        : [];

    const handleClick = (idx) => {
        if (chosenIndex !== null) return; // prevent changing after first choice in this view
        setChosenIndex(idx);
    };

    const isCorrect = (answer) => props.selectedBus && answer === props.selectedBus.model;

    return (
        <div className="quiz-card">
            <h2>What model is it?</h2>
            <img src={props.selectedBus.image} alt={props.selectedBus.model}/>
            <div className="answers">
                {answers.slice(0, 4).map((answer, idx) => {
                    const chosen = chosenIndex === idx;
                    const showResult = chosenIndex !== null && chosen;
                    const style = showResult
                        ? {
                            backgroundColor: isCorrect(answer) ? '#2ecc71' : '#e74c3c',
                            borderColor: 'black',
                            color: 'white'
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
        </div>
    );
};

export default QuizCard;
