import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import ResultMessage from '../ResultMessage';

describe('ResultMessage', () => {
    it('shows congratulations when perfect', () => {
        render(<ResultMessage isPerfect numberOfGoodAnswers={5} numberOfQuestions={5}/>);
        expect(screen.getByText(/congratulations/i)).toBeInTheDocument();
        expect(screen.getByText(/5 out of 5/i)).toBeInTheDocument();
    });

    it('shows encouragement when not perfect', () => {
        render(<ResultMessage isPerfect={false} numberOfGoodAnswers={3} numberOfQuestions={5}/>);
        expect(screen.getByText(/oh no/i)).toBeInTheDocument();
        expect(screen.getByText(/3 out of 5/i)).toBeInTheDocument();
    });
});
