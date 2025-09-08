import './App.scss'
import Home from "./components/Home/Home.jsx";
import {useState} from "react";
import Quiz from "./components/Quiz/Quiz.jsx";

function App() {
    const [displayHome, setDisplayHome] = useState(true);
    const [displayQuiz, setDisplayQuiz] = useState(false);

    return (
        <div className="main-container">
            {displayHome ? (
                <Home setDisplayHome={setDisplayHome} setDisplayQuiz={setDisplayQuiz}/>
            ) : displayQuiz ? (
                <Quiz/>
            ) : (<div/>)}
        </div>
    )
}

export default App
