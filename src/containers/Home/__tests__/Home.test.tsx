import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'
import Home from '../Home'

vi.mock('../../../utils/audioManager', () => ({
    warmUp: vi.fn(() => Promise.resolve()),
    play: vi.fn(() => Promise.resolve()),
}))

const audio = await import('../../../utils/audioManager')

describe('Home', () => {
    it('resets score on mount and starts quiz on click with audio warm up', async () => {
        const user = userEvent.setup()
        const setDisplayQuiz = vi.fn()
        const setNumberOfGoodAnswers = vi.fn()
        render(
            <Home
                numberOfQuestions={3}
                setDisplayQuiz={setDisplayQuiz}
                setNumberOfGoodAnswers={setNumberOfGoodAnswers}
            />
        )

        // sets score to 0 on mount
        expect(setNumberOfGoodAnswers).toHaveBeenCalledWith(0)

        // click start
        await user.click(screen.getByRole('button', {name: /start the quiz/i}))

        // warmUp and gong should be played
        expect((audio as any).warmUp).toHaveBeenCalled()
        expect((audio as any).play).toHaveBeenCalledWith('gong')

        // after 300ms, quiz should be displayed
        await new Promise((r) => setTimeout(r, 320))
        expect(setDisplayQuiz).toHaveBeenCalledWith(true)
    })
})
