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

        // Build answers array for each picked bus: include the current bus name among the options
        const pickedWithAnswers = picked.map(bus => {
            // Candidate names excluding the current bus
            const candidates = allNames.filter(name => name !== bus.model);

            // Take 3 random other names and include the correct one, then shuffle
            const options = [...candidates]
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);

            const answers = [...options, bus.model].sort(() => Math.random() - 0.5);

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
