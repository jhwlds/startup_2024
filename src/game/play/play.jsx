import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './play.css';
import { useGameLogic } from './gameLogic.js';

export function Play() {
    const { questions, currentQuestionIndex, score, isGameOver, handleAnswerClick, resetGame } = useGameLogic();
    const currentQuestion = questions[currentQuestionIndex];
    const location = useLocation();
    const userName = new URLSearchParams(location.search).get('name');

    const [rankings, setRankings] = useState([]);

    useEffect(() => {
        if (isGameOver) {
            updateRank(userName, score);
        }
    }, [isGameOver, score, userName]);

    const updateRank = (name, score) => {
        const currentRankings = JSON.parse(sessionStorage.getItem('rankings')) || [];
        const newRecord = { name, score, timestamp: new Date().toISOString() };

        currentRankings.push(newRecord);
        currentRankings.sort((a, b) => {
            if (b.score === a.score) {
                return new Date(b.timestamp) - new Date(a.timestamp);
            }
            return b.score - a.score;
        });

        const topRankings = currentRankings.slice(0, 5);
        sessionStorage.setItem('rankings', JSON.stringify(topRankings));
        setRankings(topRankings);
    };


    const restartGame = () => {
        resetGame(); 
    };

    return (
        <header>
            <div className="two-box">
                <div className="game-box">
                    <div className="gameQ">
                        {!isGameOver && <p>{currentQuestion.questionText}</p>}
                    </div>
                    <div className="gameA">
                        {!isGameOver ? (
                            currentQuestion.options.map((option, index) => (
                                <button key={index} onClick={() => handleAnswerClick(option)}>
                                    {option}
                                </button>
                            ))
                        ) : (
                            <div>
                                <h2>{userName}, Your final score is: {score}</h2>
                                <button onClick={restartGame}>Restart Game</button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="rank-box">
                    <h2>Your Rank</h2>
                    <ul>
                        {rankings.map((rank, index) => (
                            <li key={index}>
                                {rank.name}: {rank.score} points
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
    );
}