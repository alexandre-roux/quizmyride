import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it} from 'vitest'
import App from '../App'

vi.mock('../utils/audioManager', () => ({
    warmUp: vi.fn(() => Promise.resolve()),
    play: vi.fn(() => Promise.resolve()),
    getAudio: vi.fn(() => new Audio()),
}))

describe('App integration', () => {
    it('navigates Home → Quiz → Result → Home', async () => {
        const user = userEvent.setup()
        render(<App/>)

        // Home screen
        const startBtn = await screen.findByRole('button', {name: /start the quiz/i})
        expect(startBtn).toBeInTheDocument()

        // Start
        await user.click(startBtn)
        await new Promise((r) => setTimeout(r, 320))

        // Quiz screen appears
        expect(await screen.findByRole('heading', {name: /what model is it\?/i})).toBeInTheDocument()

        // Answer 3 questions correctly (default in App)
        for (let i = 0; i < 3; i++) {
            const img = await screen.findByRole('img')
            const model = img.getAttribute('alt') || ''
            const btn = screen.getByRole('button', {name: model})
            await user.click(btn)
            await Promise.resolve()
        }

        // Transition to result after fade-out
        await new Promise((r) => setTimeout(r, 320))

        const backBtn = await screen.findByRole('button', {name: /back to the start/i})
        expect(backBtn).toBeInTheDocument()

        // Back to home
        await user.click(backBtn)
        await new Promise((r) => setTimeout(r, 320))

        expect(await screen.findByRole('button', {name: /start the quiz/i})).toBeInTheDocument()
    })
})
