import React from 'react';
import './Result.scss';
import {getAudio} from '../../utils/audioManager';

const Result = ({numberOfQuestions, numberOfGoodAnswers, setDisplayResult}) => {
    const isPerfect = Number(numberOfGoodAnswers) === Number(numberOfQuestions);
    const [isFadingOut, setIsFadingOut] = React.useState(false);
    const audioRef = React.useRef(null);

    // Play celebratory or sad sound when the result is shown
    React.useEffect(() => {
        const key = isPerfect ? 'yay' : 'sad';
        const audio = getAudio(key);
        audioRef.current = audio;
        if (audio) {
            // Attempt playback; ignore policy rejections
            const p = audio.play();
            if (p && typeof p.catch === 'function') {
                p.catch(() => {
                });
            }
        }
        return () => {
            if (audioRef.current) {
                try {
                    audioRef.current.pause();
                } catch { /* ignore */
                }
                try {
                    audioRef.current.currentTime = 0;
                } catch { /* ignore */
                }
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
