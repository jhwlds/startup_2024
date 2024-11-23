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
            updateRanks();
        }

        // 게임 진행 상태를 웹소켓을 통해 전송 (예: 게임 질문 번호와 점수)
        const gameEvent = {
            userName: new URLSearchParams(window.location.search).get('name'),
            score,
            currentQuestionIndex,
        };
    };

    const updateRanks = () => {
        const userName = new URLSearchParams(window.location.search).get('name');
        const newScore = { name: userName, score };
        
        const savedScores = JSON.parse(localStorage.getItem('topScores')) || [];
        
        const updatedScores = [...savedScores, newScore]
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);
        
        localStorage.setItem('topScores', JSON.stringify(updatedScores));

        // 게임 종료 시 점수와 랭킹을 웹소켓을 통해 전송
        GameNotifier.broadcastEvent(userName, GameEvent.End, { score, rankings: updatedScores });
    };

    const resetGame = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setIsGameOver(false);

        // 게임 초기화 시 웹소켓을 통해 게임 시작 이벤트 전송
        const userName = new URLSearchParams(window.location.search).get('name');
        GameNotifier.broadcastEvent(userName, GameEvent.Start, {});
    };

    return { questions, currentQuestionIndex, score, isGameOver, handleAnswerClick, resetGame };
};