const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('Startup');
const userCollection = db.collection('user');
const scoreCollection = db.collection('score');

async function connectDB() {
    if (!client.isConnected()) {
        await client.connect();
    }
}

module.exports = {
    connectDB,

    async createUser(username, password) {
        await connectDB();
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = uuid.v4();
        await userCollection.insertOne({ userId, username, password: hashedPassword });
        return { userId, username };
    },

    async loginUser(username, password) {
        await connectDB();
        const user = await userCollection.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            return { userId: user.userId, username: user.username };
        }
        return null;
    },

    async submitScore(username, score) {
        await connectDB();
        const timestamp = new Date().toISOString();
        await scoreCollection.insertOne({ username, score, timestamp });

        const topScores = await scoreCollection
            .find({})
            .sort({ score: -1, timestamp: 1 })
            .limit(5)
            .toArray();
        return topScores;
    },
};