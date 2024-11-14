import React, { useState } from 'react';
import './motivation.css';

export function MotivationPopup() {
    const [phrase, setPhrase] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const fetchPhrase = async () => {
        try {
            const response = await fetch('https://gomezmig03.github.io/MotivationalAPI/en.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const randomPhrase = data[Math.floor(Math.random() * data.length)];
            setPhrase(randomPhrase.phrase);
            setShowPopup(true);
        } catch (error) {
            console.error('Failed to fetch motivational phrase:', error);
        }
    };

    const closePopup = () => setShowPopup(false); 

    return (
        <div>
            <button onClick={fetchPhrase}>Motivation</button>
             
            {showPopup && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Have A Great Day!</h3>
                        <p>{phrase}</p>
                        <button onClick={closePopup}>close</button>
                    </div>
                </div>
            )}
        </div>
    );
}