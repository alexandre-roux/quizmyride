import styles from './App.module.scss'
import Home from './containers/Home/Home'
import Quiz from './containers/Quiz/Quiz'
import { useState } from 'react'
import Result from './containers/Result/Result'

function App() {
  // Lazy-load sounds: no eager preloading here to improve initial load time
  const numberOfQuestions = 3
  const [numberOfGoodAnswers, setNumberOfGoodAnswers] = useState<number>(0)

  const [displayQuiz, setDisplayQuiz] = useState(false)
  const [displayResult, setDisplayResult] = useState(false)

  return (
    <div className={styles['main-container']}>
      {displayQuiz ? (
        <Quiz
          numberOfQuestions={numberOfQuestions}
          setDisplayQuiz={setDisplayQuiz}
          setDisplayResult={setDisplayResult}
          setNumberOfGoodAnswers={setNumberOfGoodAnswers}
        />
      ) : displayResult ? (
        <Result
          numberOfQuestions={numberOfQuestions}
          numberOfGoodAnswers={numberOfGoodAnswers}
          setDisplayResult={setDisplayResult}
        />
      ) : (
        <Home
          numberOfQuestions={numberOfQuestions}
          setDisplayQuiz={setDisplayQuiz}
          setNumberOfGoodAnswers={setNumberOfGoodAnswers}
        />
      )}
    </div>
  )
}

export default App
