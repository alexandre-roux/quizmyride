import React from 'react'

export type ResultMessageProps = {
  isPerfect: boolean
  numberOfGoodAnswers: number
  numberOfQuestions: number
}

/**
 * Displays the result headline and score summary.
 */
const ResultMessage: React.FC<ResultMessageProps> = ({ isPerfect, numberOfGoodAnswers, numberOfQuestions }) => {
  return (
    <>
      {isPerfect ? (
        <h2>Congratulations! You got all questions right! 🥳🚌</h2>
      ) : (
        <h2>
          Oh no, you didn't get it right. 😔
          <br /> Better luck next time!
        </h2>
      )}
      You've got {numberOfGoodAnswers} out of {numberOfQuestions} questions right.
    </>
  )
}

export default ResultMessage
