import React from 'react';
import './Result.scss';

const Result = ({numberOfQuestions, numberOfGoodAnswers, setDisplayResult}) => {
    const isPerfect = Number(numberOfGoodAnswers) === Number(numberOfQuestions);
    const [isFadingOut, setIsFadingOut] = React.useState(false);

    const onButtonClick = () => {
        // trigger fade-out animation
        setIsFadingOut(true);
        setDisplayResult(false)

        // Start the quiz after fade-out completes
        setTimeout(() => setDisplayResult(false), 300);
    };

    return (
        <div className={`result-container fade-in ${isFadingOut ? 'fade-out' : ''}`}>
            {isPerfect ? (
                <h2>Congratulations! You got all questions right! 🥳🚌</h2>
            ) : (
                <h2>Oh no, you didn't get it right. 😔<br/> Better luck next time!</h2>
            )}
            <button type="button" onClick={onButtonClick}>
                <ion-icon name="arrow-forward-outline"></ion-icon>
                Back to the start
            </button>
        </div>
    );
};

export default Result;
