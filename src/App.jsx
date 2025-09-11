import './App.scss'
import Home from "./containers/Home/Home.jsx";
import Quiz from "./containers/Quiz/Quiz.jsx";
import {useState} from "react";
import Result from "./containers/Result/Result.jsx";

function App() {
    const numberOfQuestions = 3;

    const [displayQuiz, setDisplayQuiz] = useState(false);
    const [displayResult, setDisplayScore] = useState(false);

    return (
        <div className="main-container">
            {displayQuiz ? (
                <Quiz numberOfQuestions={numberOfQuestions} setDisplayQuiz={setDisplayQuiz}
                      setDisplayScore={setDisplayScore}/>
            ) : displayResult ? (
                <Result/>
            ) : (
                <Home numberOfQuestions={numberOfQuestions} setDisplayQuiz={setDisplayQuiz}/>
            )}
        </div>
    )
}

export default App
