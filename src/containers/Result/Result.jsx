import React from 'react';
import './Result.scss';

const Result = ({numberOfQuestions, numberOfGoodAnswers, setDisplayResult}) => {
    const isPerfect = Number(numberOfGoodAnswers) === Number(numberOfQuestions);
    const [isFadingOut, setIsFadingOut] = React.useState(false);
    const audioRef = React.useRef(null);

    // Play celebratory or sad sound when the result is shown
    React.useEffect(() => {
        // Choose the sound based on result
        const src = isPerfect ? '/sounds/yay.mp3' : '/sounds/sad-trombone.mp3';
        const audio = new Audio(src);
        audioRef.current = audio;
        // slight volume reduction to be gentle
        audio.volume = 0.7;
        // Try to play; ignore failures due to autoplay policies
        const tryPlay = async () => {
            try {
                await audio.play();
            } catch {
                // Autoplay restriction or other playback error; fail silently
                // It will still be ready to play on next user gesture.
            }
        };
        tryPlay();

        return () => {
            // Cleanup when component unmounts
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                audioRef.current = null;
            }
        };
    }, [isPerfect]);

    const onButtonClick = () => {
        // trigger fade-out animation
        setIsFadingOut(true);
        // stop sound immediately on exit
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        // Wait for the fade-out animation to complete before hiding the result
        setTimeout(() => setDisplayResult(false), 300);
    };

    return (
        <div className={`result-container fade-in ${isFadingOut ? 'fade-out' : ''}`}>
            {isPerfect ? (
                <h2>Congratulations! You got all questions right! 🥳🚌</h2>
            ) : (
                <h2>Oh no, you didn't get it right. 😔<br/> Better luck next time!</h2>
            )}
            You've got {numberOfGoodAnswers} out of {numberOfQuestions} questions right.
            <br/>
            <br/>
            ️
            <button type="button" onClick={onButtonClick}>
                <ion-icon name="arrow-forward-outline"></ion-icon>
                Back to the start
            </button>
        </div>
    );
};

export default Result;
