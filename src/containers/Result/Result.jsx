import React from 'react';
import './Result.scss';

const Result = ({numberOfQuestions, numberOfGoodAnswers}) => {
    const isPerfect = Number(numberOfGoodAnswers) === Number(numberOfQuestions);

    return (
        <div className="result-container fade-in">
            <p>
                Score: {numberOfGoodAnswers} / {numberOfQuestions}
            </p>
            {isPerfect ? (
                <h2>Congratulations! You got all questions right!</h2>
            ) : (
                <h2>Better luck next time</h2>
            )}
        </div>
    );
};

export default Result;
