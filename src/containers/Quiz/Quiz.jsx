import React, {useEffect} from 'react';
import PropTypes from '../../shims/prop-types';
import styles from './Quiz.module.scss';
import buses from '../../data/buses';
import QuizCard from "../../components/QuizCard.jsx";

const Quiz = ({numberOfQuestions, setDisplayQuiz, setDisplayResult, setNumberOfGoodAnswers}) => {
    const [selectedBuses, setSelectedBuses] = React.useState([]);
    const [selectedBusIndex, setSelectedBusIndex] = React.useState(0);
    const [isFadingOut, setIsFadingOut] = React.useState(false);

    useEffect(() => {
        // Create the quiz when the components mounts
        // Shuffle buses and pick the requested number of questions
        const shuffled = [...buses].sort(() => Math.random() - 0.5);
        const picked = shuffled.slice(0, numberOfQuestions);

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
        // Reset progress when creating a new quiz
        setSelectedBusIndex(0);
    }, [numberOfQuestions]);


    useEffect(() => {
        if (selectedBusIndex >= numberOfQuestions) {
            // Trigger fade-out before navigating to results
            setIsFadingOut(true);
            setTimeout(() => {
                setDisplayQuiz(false);
                setDisplayResult(true);
            }, 300);
        }
    }, [numberOfQuestions, setDisplayQuiz, setDisplayResult, selectedBusIndex]);

    // Use a safe index to keep the last question visible during fade-out
    const displayIndex = selectedBuses.length > 0
        ? Math.min(selectedBusIndex, selectedBuses.length - 1)
        : 0;

    return (
        <div className={`${styles['quiz-container']} ${styles['fade-in']} ${isFadingOut ? styles['fade-out'] : ''}`}>
            {(selectedBuses.length > 0) && (
                <QuizCard selectedBus={selectedBuses[displayIndex]} setSelectedBusIndex={setSelectedBusIndex}
                          setNumberOfGoodAnswers={setNumberOfGoodAnswers}/>
            )}
        </div>
    );
};

Quiz.propTypes = {
    numberOfQuestions: PropTypes.number.isRequired,
    setDisplayQuiz: PropTypes.func.isRequired,
    setDisplayResult: PropTypes.func.isRequired,
    setNumberOfGoodAnswers: PropTypes.func.isRequired,
};

export default Quiz;
