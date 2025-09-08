import React, {useEffect} from 'react';
import './Quiz.scss';
import buses from '../../data/buses';

const Quiz = () => {
    const [selectedBuses, setSelectedBuses] = React.useState([]);

    useEffect(() => {
        // Create the quiz when the component mounts
        // Create an array with 3 random elements from buses.js
        const shuffled = [...buses].sort(() => Math.random() - 0.5);
        setSelectedBuses(shuffled.slice(0, 3));
    }, [])

    return (<div className="quiz-container">
        <h2>What model is it?</h2>
    </div>);
};

export default Quiz;
