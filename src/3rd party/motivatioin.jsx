import React, { useEffect, useState } from 'react';
import axios from 'axios';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function Motivation() {
    const [phrases, setPhrases] = useState([]);

    useEffect(() => {
        const fetchPhrases = async () => {
            try {
                const response = await axios.get('/api/motivation');
                setPhrases(response.data);
            } catch (error) {
                console.error('Failed to fetch motivational phrases:', error);
            }
        };

        fetchPhrases();
    }, []);

    return (
        <div>
            <h2>Motivational Phrases</h2>
            <ul>
                {phrases.map((phrase, index) => (
                    <li key={index}>{phrase}</li>
                ))}
            </ul>
        </div>
    );
}