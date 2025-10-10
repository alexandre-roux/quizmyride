import {render, screen, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it} from 'vitest'
import Quiz from '../Quiz'

// No need to mock audio: global Audio shim handles it

describe('Quiz', () => {
    it('advances through N questions and triggers result display after fade-out', async () => {
        const user = userEvent.setup()
        const setDisplayQuiz = vi.fn()
        const setDisplayResult = vi.fn()
        const setNumberOfGoodAnswers = vi.fn()

        render(
            <Quiz
                numberOfQuestions={2}
                setDisplayQuiz={setDisplayQuiz}
                setDisplayResult={setDisplayResult}
                numberOfGoodAnswers={0}
                setNumberOfGoodAnswers={setNumberOfGoodAnswers}
            />
        )

        // Answer two questions correctly by clicking the button matching the image alt text
        for (let i = 0; i < 2; i++) {
            const img = await screen.findByRole('img')
            const model = img.getAttribute('alt') || ''
            const answersRegion = img.parentElement as HTMLElement
            const btn = within(answersRegion).getByRole('button', {name: model})
            await user.click(btn)
            // let audio 'ended' microtask advance to next question
            await Promise.resolve()
        }

        // After the last question, a 300ms fade-out occurs
        await new Promise((r) => setTimeout(r, 320))

        expect(setDisplayQuiz).toHaveBeenCalledWith(false)
        expect(setDisplayResult).toHaveBeenCalledWith(true)
    })
})
