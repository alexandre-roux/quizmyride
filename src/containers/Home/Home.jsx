import React, {useEffect} from 'react';
import PropTypes from '../../shims/prop-types';
import styles from './Home.module.scss';
import {play, warmUp} from '../../utils/audioManager';

const Home = ({numberOfQuestions, setDisplayQuiz, setNumberOfGoodAnswers}) => {
    const [isFadingOut, setIsFadingOut] = React.useState(false);

    useEffect(() => {
        setNumberOfGoodAnswers(0)
    }, [setNumberOfGoodAnswers])

    const onButtonClick = async () => {
        // trigger fade-out animation
        setIsFadingOut(true);
        // Ensure audio is unlocked before playing the gong on first click
        try {
            await warmUp();
        } catch { /* ignore */
        }
        void play('gong');

        // Start the quiz after fade-out completes
        setTimeout(() => setDisplayQuiz(true), 300);
    };

    return (
        <div className={`${styles['home-container']} ${styles['fade-in']} ${isFadingOut ? styles['fade-out'] : ''}`}>
        <h1>Welcome to Quiz My Ride!</h1>
            <img src={`${import.meta.env.BASE_URL}images/logo.png`} className={styles.logo} alt="Quiz My Ride Logo"
                 loading="lazy"/>
            <p className={styles['intro-text']}>
            Think you know the BVG bus fleet like the back of your Fahrkarte?<br/>
            Can you tell a Citaro from a Citea faster than a bus at a green light?
            <br/>
            Put your bus-spotting skills to the ultimate test in this quiz where only true bus nerds will
            survive.<br/><br/>
            This quiz will give you a series of {numberOfQuestions} bus images, and you have to pick the correct model
            from four options.
            <br/>
            No pressure, but your street cred as a Berliner bus aficionado is on the line!
        </p>
        <button onClick={onButtonClick}>
            <ion-icon name="arrow-forward-outline"></ion-icon>
            Start the quiz
        </button>
    </div>);
};

Home.propTypes = {
    numberOfQuestions: PropTypes.number.isRequired,
    setDisplayQuiz: PropTypes.func.isRequired,
    setNumberOfGoodAnswers: PropTypes.func.isRequired,
};

export default Home;
