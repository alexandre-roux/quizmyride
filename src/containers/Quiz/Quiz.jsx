import React, {useEffect} from 'react';
import './Quiz.scss';
import buses from '../../data/buses';
import QuizCard from "../../component/QuizCard.jsx";

const Quiz = (props) => {
    const [selectedBuses, setSelectedBuses] = React.useState([]);
    const [selectedBusIndex, setSelectedBusIndex] = React.useState(0);

    useEffect(() => {
        // Create the quiz when the component mounts
        // Create an array with random elements from buses.js
        const shuffled = [...buses].sort(() => Math.random() - 0.5);
        const picked = shuffled.slice(0, props.numberOfQuestions);
        setSelectedBuses(picked);
        console.log(picked);
    }, [])

    useEffect(() => {
        if (selectedBusIndex >= props.numberOfQuestions) {
            props.setDisplayQuiz(false);
            props.setDisplayResults(true);
        }
    }, [selectedBusIndex]);

    return (
        <div className="quiz-container">
            {(selectedBuses.length > 0) && (
                <QuizCard selectedBus={selectedBuses[selectedBusIndex]}/>
            )}
        </div>
    );
};

export default Quiz;
