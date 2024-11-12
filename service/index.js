const express = require('express');
const uuid = require('uuid');
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