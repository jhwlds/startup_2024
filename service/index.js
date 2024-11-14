const express = require('express');
const uuid = require('uuid');
const axios = require('axios');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

let users = {}; 
let scores = [];


apiRouter.post('/create', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const userExists = Object.values(users).some(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    const userId = uuid.v4();
    users[userId] = { username, password, score: 0 };

    res.json({ userId, username });
});


apiRouter.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = Object.values(users).find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(400).json({ error: 'Invalid username or password' });
    }

    res.json({ message: 'Login successful', username: user.username });
});

apiRouter.post('/submit-score', (req, res) => {
    const { username, score } = req.body;

    if (!username || score === undefined) {
        return res.status(400).json({ error: 'Username and score are required' });
    }

    scores.push({ username, score, timestamp: new Date().toISOString() });

    scores.sort((a, b) => b.score - a.score || new Date(b.timestamp) - new Date(a.timestamp));
    const topScores = scores.slice(0, 5);

    res.json(topScores);
});

apiRouter.get('/motivation', async (req, res) => {
    try {
        const response = await axios.get('https://gomezmig03.github.io/MotivationalAPI/en.json');
        
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching motivational phrases:', error);
        res.status(500).json({ error: 'Failed to retrieve motivational phrases' });
    }
});