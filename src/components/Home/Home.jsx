import React from 'react';
import './Home.scss';

const Home = (props) => {
    const onButtonClick = () => {
        // Play gong sound
        const audio = new Audio('/sounds/bvg-gong.mp3');
        audio.play();

        // Start the quiz
        props.setDisplayHome(false);
        props.setDisplayQuiz(true);
    };

    return (<div className="home-container">
        <h1>Welcome to Quiz My Ride!</h1>
            <img src="/images/logo.png" className="logo" alt="Quiz My Ride Logo"/>
            <p className="intro-text">
                Think you know the BVG bus fleet like the back of your Fahrkarte?<br/>
                Can you tell a Citaro from a Citea faster than a bus at a green light?
                <br/><br/>
                Put your bus-spotting skills to the ultimate test in this quiz where only true bus nerds will
                survive.<br/>
                Guess the model, earn eternal respect, and maybe you’ll become the unofficial BVG Bus Master.
            </p>
        <button onClick={onButtonClick}>
                <ion-icon name="arrow-forward-outline"></ion-icon>
                Start the quiz
            </button>
    </div>);
};

export default Home;
