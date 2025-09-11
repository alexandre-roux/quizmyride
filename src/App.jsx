import './App.scss'
import Home from "./containers/Home/Home.jsx";
import Quiz from "./containers/Quiz/Quiz.jsx";
import {useEffect, useState} from "react";
import {getAudio} from './utils/audioManager';
import Result from "./containers/Result/Result.jsx";

function App() {
    // Preload all audio assets early to reduce playback latency
    useEffect(() => {
        ['gong', 'honk', 'crash', 'yay', 'sad'].forEach(getAudio);
    }, []);
    const numberOfQuestions = 3;
    const [numberOfGoodAnswers, setNumberOfGoodAnswers] = useState(0);

    const [displayQuiz, setDisplayQuiz] = useState(false);
    const [displayResult, setDisplayResult] = useState(false);

    return (
        <div className="main-container">
            {displayQuiz ? (
                <Quiz numberOfQuestions={numberOfQuestions} setDisplayQuiz={setDisplayQuiz}
                      setDisplayResult={setDisplayResult} setNumberOfGoodAnswers={setNumberOfGoodAnswers}/>
            ) : displayResult ? (
                <Result numberOfQuestions={numberOfQuestions} numberOfGoodAnswers={numberOfGoodAnswers}
                        setDisplayResult={setDisplayResult}/>
            ) : (
                <Home numberOfQuestions={numberOfQuestions} setDisplayQuiz={setDisplayQuiz}
                      setNumberOfGoodAnswers={setNumberOfGoodAnswers}/>
            )}
        </div>
    )
}

export default App
