import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './motivation.css';

export function MotivationPopup() {
    const [phrase, setPhrase] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const fetchPhrase = async () => {
        try {
            const response = await axios.get('/api/motivation');
            const randomPhrase = response.data[Math.floor(Math.random() * response.data.length)];
            setPhrase(randomPhrase);
            setShowPopup(true);
        } catch (error) {
            console.error('Failed to fetch motivational phrase:', error);
        }
    };

    const closePopup = () => setShowPopup(false); 

    return (
        <div>
            <button onClick={fetchPhrase}>Motivational Phrases</button>
             
            {showPopup && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Motivational Phrases For You Today</h3>
                        <p>{phrase}</p>
                        <button onClick={closePopup}>close</button>
                    </div>
                </div>
            )}
        </div>
    );
}