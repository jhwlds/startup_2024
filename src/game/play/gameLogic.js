import { useState } from 'react';
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
            updateRanks();
        }
    };


    const updateRanks = () => {
        const userName = new URLSearchParams(window.location.search).get('name');
        const newScore = { name: userName, score };
        
        const savedScores = JSON.parse(localStorage.getItem('topScores')) || [];
        

        const updatedScores = [...savedScores, newScore]
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);
        
        localStorage.setItem('topScores', JSON.stringify(updatedScores));
    };

    return { questions, currentQuestionIndex, score, isGameOver, handleAnswerClick };
};