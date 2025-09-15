import React from 'react'
import styles from './Result.module.scss'
import { getAudio } from '../../utils/audioManager'
import ResultMessage from '../../components/ResultMessage'

export type ResultProps = {
  numberOfQuestions: number
  numberOfGoodAnswers: number
  setDisplayResult: React.Dispatch<React.SetStateAction<boolean>>
}

const Result: React.FC<ResultProps> = ({ numberOfQuestions, numberOfGoodAnswers, setDisplayResult }) => {
  const isPerfect = Number(numberOfGoodAnswers) === Number(numberOfQuestions)
  const [isFadingOut, setIsFadingOut] = React.useState(false)
  const audioRef = React.useRef<HTMLAudioElement | null>(null)

  // Play celebratory or sad sound when the result is shown
  React.useEffect(() => {
    const key = isPerfect ? 'yay' : 'sad'
    const audio = getAudio(key)
    audioRef.current = audio
    if (audio) {
      // Attempt playback; ignore policy rejections
      const p = audio.play()
      if (p && typeof (p as any).catch === 'function') {
        ;(p as Promise<void>).catch(() => {})
      }
    }
    return () => {
      if (audioRef.current) {
        try {
          audioRef.current.pause()
        } catch {
          /* ignore */
        }
        try {
          audioRef.current.currentTime = 0
        } catch {
          /* ignore */
        }
        audioRef.current = null
      }
    }
  }, [isPerfect])

  const onButtonClick = () => {
    // trigger fade-out animation
    setIsFadingOut(true)
    // stop sound immediately on exit
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    // Wait for the fade-out animation to complete before hiding the result
    window.setTimeout(() => setDisplayResult(false), 300)
  }

  return (
    <div className={`${styles['result-container']} ${styles['fade-in']} ${isFadingOut ? styles['fade-out'] : ''}`}>
      <ResultMessage
        isPerfect={isPerfect}
        numberOfGoodAnswers={numberOfGoodAnswers}
        numberOfQuestions={numberOfQuestions}
      />
      <button type="button" onClick={onButtonClick}>
        <ion-icon name="arrow-forward-outline"></ion-icon>
        Back to the start
      </button>
    </div>
  )
}

export default Result
