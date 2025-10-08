import React, {useEffect} from 'react'
import styles from './Quiz.module.scss'
import buses, {type Bus} from '../../data/buses'
import QuizCard from '../../components/QuizCard'

export type QuizProps = {
    numberOfQuestions: number
    setDisplayQuiz: React.Dispatch<React.SetStateAction<boolean>>
    setDisplayResult: React.Dispatch<React.SetStateAction<boolean>>
    numberOfGoodAnswers: number
    setNumberOfGoodAnswers: React.Dispatch<React.SetStateAction<number>>
}

const Quiz = ({numberOfQuestions, setDisplayQuiz, setDisplayResult, numberOfGoodAnswers, setNumberOfGoodAnswers}: QuizProps) => {
    const [selectedBuses, setSelectedBuses] = React.useState<(Bus & { answers: string[] })[]>([])
    const [selectedBusIndex, setSelectedBusIndex] = React.useState(0)
    const [isFadingOut, setIsFadingOut] = React.useState(false)

    useEffect(() => {
        // Create the quiz when the component mounts
        // Shuffle buses and pick the requested number of questions
        const shuffled = [...buses].sort(() => Math.random() - 0.5)
        const picked = shuffled.slice(0, numberOfQuestions)

        // Get all bus names
        const allNames = buses.map((b) => b.model)

        // Build answers array for each picked bus: include the current bus name among the options
        const pickedWithAnswers = picked.map((bus) => {
            // Candidate names excluding the current bus
            const candidates = allNames.filter((name) => name !== bus.model)

            // Take 3 random other names and include the correct one, then shuffle
            const options = [...candidates].sort(() => Math.random() - 0.5).slice(0, 3)

            const answers = [...options, bus.model].sort(() => Math.random() - 0.5)

            return {...bus, answers}
        })

        // Save the selected buses in state
        setSelectedBuses(pickedWithAnswers)
        // Reset progress when creating a new quiz
        setSelectedBusIndex(0)
    }, [numberOfQuestions])

    useEffect(() => {
        if (selectedBusIndex >= numberOfQuestions) {
            // Trigger fade-out before navigating to results
            setIsFadingOut(true)
            window.setTimeout(() => {
                setDisplayQuiz(false)
                setDisplayResult(true)
            }, 300)
        }
    }, [numberOfQuestions, setDisplayQuiz, setDisplayResult, selectedBusIndex])

    // Use a safe index to keep the last question visible during fade-out
    const displayIndex = selectedBuses.length > 0 ? Math.min(selectedBusIndex, selectedBuses.length - 1) : 0

    return (
        <div className={`${styles['quiz-container']} ${styles['fade-in']} ${isFadingOut ? styles['fade-out'] : ''}`}>
            <h2>What model is it?</h2>
            <h3>Score: {numberOfGoodAnswers}/{numberOfQuestions}</h3>
            {selectedBuses.length > 0 && (
                <QuizCard
                    selectedBus={selectedBuses[displayIndex]}
                    setSelectedBusIndex={setSelectedBusIndex}
                    setNumberOfGoodAnswers={setNumberOfGoodAnswers}
                />
            )}
        </div>
    )
}

export default Quiz
