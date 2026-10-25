const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://127.0.0.1:27017");
const dbName = "assignment7";

let db;

async function connectDB() {
  await client.connect();
  db = client.db(dbName);
  console.log("connected");
}

function getDB() {
  if (!db) {
    throw new Error(" not connected yet");
  }
  return db;
}

module.exports = { connectDB, getDB };
