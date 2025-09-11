import React, {useEffect} from 'react';
import './Home.scss';

const Home = ({numberOfQuestions, setDisplayQuiz, setNumberOfGoodAnswers}) => {
    const [isFadingOut, setIsFadingOut] = React.useState(false);

    useEffect(() => {
        setNumberOfGoodAnswers(0)
    }, [setNumberOfGoodAnswers])

    const onButtonClick = () => {
        // trigger fade-out animation
        setIsFadingOut(true);
        // Play gong sound
        const audio = new Audio('/sounds/bvg-gong.mp3');
        audio.volume = 0.8;
        audio.play();

        // Start the quiz after fade-out completes
        setTimeout(() => setDisplayQuiz(true), 300);
    };

    return (<div className={`home-container fade-in ${isFadingOut ? 'fade-out' : ''}`}>
        <h1>Welcome to Quiz My Ride!</h1>
        <img src="/images/logo.png" className="logo" alt="Quiz My Ride Logo"/>
        <p className="intro-text">
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

export default Home;
