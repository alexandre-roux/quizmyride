import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it, vi} from 'vitest';
import AnswerOptions from '../AnswerOptions';

describe('AnswerOptions', () => {
    it('renders up to 4 answer buttons and triggers onSelect with index', async () => {
        const user = userEvent.setup();
        const answers = ['A', 'B', 'C', 'D', 'E'];
        const onSelect = vi.fn();

        render(<AnswerOptions answers={answers} correctAnswer="A" onSelect={onSelect}/>);

        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(4); // limited to 4

        await user.click(screen.getByRole('button', {name: 'C'}));
        expect(onSelect).toHaveBeenCalledWith(2);
    });

    it('applies feedback styling when an incorrect answer is chosen (show correct in green)', () => {
        const answers = ['Alpha', 'Beta', 'Gamma', 'Delta'];
        render(
            <AnswerOptions
                answers={answers}
                correctAnswer="Beta"
                selectedIndex={2}
            />
        );

        const chosen = screen.getByRole('button', {name: 'Gamma'});
        const correct = screen.getByRole('button', {name: 'Beta'});

        expect(chosen).toHaveStyle({backgroundColor: '#e74c3c'});
        expect(correct).toHaveStyle({backgroundColor: '#2ecc71'});
    });
});
