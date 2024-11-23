const express = require('express');
const { createUser, loginUser, submitScore } = require('./database.js');
const app = express();
const { peerProxy } = require('./ws.js');
const path = require('path');

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(express.static('public'));
app.set('trust proxy', true);

const apiRouter = express.Router();
app.use(`/api`, apiRouter);


apiRouter.post('/create', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const result = await createUser(username, password);
        res.json(result);
    } catch (err) {
        if (err.message === 'Username already exists') {
            res.status(400).json({ error: err.message }); 
        } else {
            console.log(err);
            res.status(500).json({ error: 'Error is happening here!' });
        }
    }
});

apiRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await loginUser(username, password);
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        res.json({ message: 'Login successful', username: user.username });
    } catch (err) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

apiRouter.post('/submit-score', async (req, res) => {
    const { username, score } = req.body;

    if (!username || score === undefined) {
        return res.status(400).json({ error: 'Username and score are required' });
    }

    try {
        const topScores = await submitScore(username, score);
        res.json(topScores);
    } catch (err) {
        res.status(500).json({ error: 'Error submitting score' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
  
peerProxy(httpService);