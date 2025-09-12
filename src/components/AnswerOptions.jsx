import React from 'react';

/**
 * Renders a list of up to 4 answer buttons with feedback styling.
 * Delegates selection handling to parent via onSelect.
 */
const AnswerOptions = ({answers = [], selectedIndex = null, correctAnswer, onSelect, className}) => {
    const isCorrect = (answer) => answer === correctAnswer;
    const anyChosen = selectedIndex !== null;

    return (
        <div className={className ?? 'answers'}>
            {answers.slice(0, 4).map((answer, idx) => {
                const chosen = selectedIndex === idx;
                const correctForThisButton = isCorrect(answer);

                // When a bad answer is selected, also highlight the correct one in green
                let style;
                if (anyChosen) {
                    if (chosen) {
                        style = {
                            backgroundColor: correctForThisButton ? '#2ecc71' : '#e74c3c',
                            borderColor: 'black',
                            color: 'white',
                        };
                    } else if (!chosen && !isCorrect(answers[selectedIndex]) && correctForThisButton) {
                        // user chose wrong; show the correct answer
                        style = {
                            backgroundColor: '#2ecc71',
                            borderColor: 'black',
                            color: 'white',
                        };
                    }
                }

                return (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => onSelect?.(idx)}
                        style={style}
                    >
                        {answer}
                    </button>
                );
            })}
        </div>
    );
};

export default AnswerOptions;
