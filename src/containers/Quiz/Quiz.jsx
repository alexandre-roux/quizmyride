import React, {useEffect} from 'react';
import './Quiz.scss';
import buses from '../../data/buses';
import QuizCard from "../../component/QuizCard.jsx";

const Quiz = (props) => {
    const [selectedBuses, setSelectedBuses] = React.useState([]);
    const [selectedBusIndex, setSelectedBusIndex] = React.useState(0);

    useEffect(() => {
        // Create the quiz when the component mounts
        // Shuffle buses and pick the requested number of questions
        const shuffled = [...buses].sort(() => Math.random() - 0.5);
        const picked = shuffled.slice(0, props.numberOfQuestions);

        // Get all bus names
        const allNames = buses.map(b => b.model);

        // Build answers array for each picked bus: 4 names of other buses
        const pickedWithAnswers = picked.map(bus => {
            // Candidate names excluding the current bus
            const candidates = allNames.filter(name => name !== bus.model);

            // Shuffle candidates and take the first 4
            const answers = [...candidates]
                .sort(() => Math.random() - 0.5)
                .slice(0, 4);

            return {...bus, answers};
        });

        // Save the selected buses in state
        setSelectedBuses(pickedWithAnswers);
    }, [props.numberOfQuestions]);


    useEffect(() => {
        if (selectedBusIndex >= props.numberOfQuestions) {
            props.setDisplayQuiz(false);
            props.setDisplayResults(true);
        }
    }, [props, selectedBusIndex]);

    return (
        <div className="quiz-container">
            {(selectedBuses.length > 0) && (
                <QuizCard selectedBus={selectedBuses[selectedBusIndex]}/>
            )}
        </div>
    );
};

export default Quiz;
