import { useState } from 'react';
import { GameNotifier, GameEvent } from './gameNotifier'; // GameNotifier import
import questions from './questions';

export const useGameLogic = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

    const handleAnswerClick = (selectedAnswer) => {
        if (isGameOver) return;

        const correctAnswer = questions[currentQuestionIndex].correctAnswer;
        if (selectedAnswer === correctAnswer) {
            setScore((prevScore) => prevScore + 1);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
            setIsGameOver(true);
            finalScore();
        }

        const gameEvent = {
            userName: new URLSearchParams(window.location.search).get('name'),
            score,
            currentQuestionIndex,
        };
    };

    const finalScore = () => {
        const userName = new URLSearchParams(window.location.search).get('name');

        GameNotifier.broadcastEvent(userName, GameEvent.End, { score });
    };

    const resetGame = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setIsGameOver(false);

        const userName = new URLSearchParams(window.location.search).get('name');
        GameNotifier.broadcastEvent(userName, GameEvent.Start, {});
    };

    return { questions, currentQuestionIndex, score, isGameOver, handleAnswerClick, resetGame };
};