import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'
import Result from '../Result'

vi.mock('../../../utils/audioManager', () => ({
    getAudio: vi.fn(() => new Audio()),
}))

const audio = await import('../../../utils/audioManager')

describe('Result', () => {
    it('plays yay sound for perfect score and hides on back after fade-out', async () => {
        const user = userEvent.setup()
        const setDisplayResult = vi.fn()

        render(
            <Result
                numberOfQuestions={3}
                numberOfGoodAnswers={3}
                setDisplayResult={setDisplayResult}
            />
        )

        // yay sound selected
        expect((audio as any).getAudio).toHaveBeenCalledWith('yay')

        await user.click(screen.getByRole('button', {name: /back to the start/i}))

        await new Promise((r) => setTimeout(r, 320))
        expect(setDisplayResult).toHaveBeenCalledWith(false)
    })

    it('plays sad sound for non-perfect score', () => {
        render(
            <Result
                numberOfQuestions={5}
                numberOfGoodAnswers={2}
                setDisplayResult={() => {
                }}
            />
        )

        expect((audio as any).getAudio).toHaveBeenCalledWith('sad')
    })
})
