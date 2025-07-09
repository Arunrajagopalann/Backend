require("dotenv").config();
const mongoose = require("mongoose");

const dbConnection = process.env.DB_CONNECTION;
const dbName = process.env.DB_NAME;

async function connectToDatabase() {
  try {
    const connectionUri = `${dbConnection}/${dbName}`;
    await mongoose.connect(connectionUri, {
      authSource: "admin",
      retryWrites: false,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(`Error connecting to MongoDB: ${err.stack}`);
  }
}

connectToDatabase();
