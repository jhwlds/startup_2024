import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export function Login() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && userName && password) {
            isCreating ? handleCreate() : handleLogin();
        }
    };

    const handleCreate = async () => {
        try {
            const response = await fetch('/api/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: userName, password })
            });
    
            if (response.ok) {
                alert('Account created! You can now log in.');
                setIsCreating(false);
            } else {
                const data = await response.json();
                if (data.error === 'Username already exists') {
                    alert('This username is already taken. Please choose another one.');
                } else {
                    alert(data.error || 'Error creating account.');
                }
            }
        } catch (error) {
            alert('Error creating account.');
        }
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: userName, password })
            });

            if (response.ok) {
                navigate(`/game/play?name=${userName}`);
            } else {
                const data = await response.json();
                alert(data.error);
            }
        } catch (error) {
            alert('Error logging in.');
        }
    };

    return (
        <header>
            <div className='login-box'>
                <div>
                    <label>{isCreating ? 'Create Account' : 'Log In'}</label>
                    <input 
                        type="text" 
                        placeholder="Enter your name" 
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <input 
                        type="password" 
                        placeholder="Enter your password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={isCreating ? handleCreate : handleLogin}>
                        {isCreating ? 'Create Account' : 'Log In'}
                    </button>
                    <button onClick={() => setIsCreating(!isCreating)}>
                        {isCreating ? 'Back to Login' : 'Create'}
                    </button>
                </div>
            </div>
        </header>
    );
}