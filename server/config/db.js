const mongoose = require("mongoose");
const { mongoDB } = require("./config");

async function connectToDatabase() {
  try {
    const connect = await mongoose.connect(mongoDB.uri);

    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectToDatabase;
