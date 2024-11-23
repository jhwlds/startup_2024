const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('Startup');
const userCollection = db.collection('user');
const scoreCollection = db.collection('score');


(async function testConnection() {
  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log('Database connection test successful!');
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
});


async function createUser(username, password) {

    const existingUser = await userCollection.findOne({ username });
    if (existingUser) {
        throw new Error('Username already exists'); 
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuid.v4();

    const user = {
        userId,
        username,
        password: hashedPassword,
    };

    await userCollection.insertOne(user);
    return { userId, username };
}


async function loginUser(username, password) {
  const user = await userCollection.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    return { userId: user.userId, username: user.username };
  }
  return null;
}


async function submitScore(username, score) {
  const timestamp = new Date().toISOString();
  await scoreCollection.insertOne({ username, score, timestamp });

  const topScores = await scoreCollection
    .find({})
    .sort({ score: -1, timestamp: -1 })
    .limit(5)
    .toArray();
  return topScores;
}


module.exports = {
  createUser,
  loginUser,
  submitScore,
};