import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './play.css';
import { useGameLogic } from './gameLogic.js';
import { Players } from './players.jsx';

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

    const updateRank = async (name, score) => {
        try {
            const response = await fetch('/api/submit-score', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: name, score })  
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }

            const topRankings = await response.json();
            setRankings(topRankings); 
        } catch (error) {
            console.error('Error updating ranking:', error);
        }
    };

    const restartGame = () => {
        resetGame(); 
    };

    return (
        <>
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
                    <h2>Top 5 Ranker</h2>
                    <ul>
                        {rankings.map((rank, index) => (
                            <li key={index}>
                                {rank.username}: {rank.score} points
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
        <Players />
        </>
    );
}