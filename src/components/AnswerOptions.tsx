import React from 'react'

export type AnswerOptionsProps = {
  answers?: string[]
  selectedIndex?: number | null
  correctAnswer?: string
  onSelect?: (index: number) => void
  className?: string
}

/**
 * Renders a list of up to 4 answer buttons with feedback styling.
 * Delegates selection handling to parent via onSelect.
 */
const AnswerOptions: React.FC<AnswerOptionsProps> = ({
  answers = [],
  selectedIndex = null,
  correctAnswer,
  onSelect,
  className,
}) => {
  const isCorrect = (answer?: string) => !!correctAnswer && answer === correctAnswer
  const anyChosen = selectedIndex !== null

  return (
    <div className={className ?? 'answers'}>
      {answers.slice(0, 4).map((answer, idx) => {
        const chosen = selectedIndex === idx
        const correctForThisButton = isCorrect(answer)

        // When a bad answer is selected, also highlight the correct one in green
        let style: React.CSSProperties | undefined
        if (anyChosen) {
          if (chosen) {
            style = {
              backgroundColor: correctForThisButton ? '#2ecc71' : '#e74c3c',
              borderColor: 'black',
              color: 'white',
            }
          } else if (!chosen && selectedIndex !== null && !isCorrect(answers[selectedIndex]) && correctForThisButton) {
            // user chose wrong; show the correct answer
            style = {
              backgroundColor: '#2ecc71',
              borderColor: 'black',
              color: 'white',
            }
          }
        }

        return (
          <button key={idx} type="button" onClick={() => onSelect?.(idx)} style={style}>
            {answer}
          </button>
        )
      })}
    </div>
  )
}

export default AnswerOptions
