
// config/db.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB connected (with Mongoose) – ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;






// const { MongoClient } = require('mongodb');
// const dotenv = require('dotenv');

// dotenv.config();
// const uri = process.env.MONGODB_URI;

// let db;

// const connectDB = async () => {
//   try {
//     const client = new MongoClient(uri);
//     await client.connect();
//     db = client.db(); // use default DB from URI
//     console.log('✅ MongoDB connected (without Mongoose)');
//   } catch (error) {
//     console.error('❌ MongoDB connection failed:', error.message);
//     process.exit(1);
//   }
// };


// // getter for accessing DB
// const getDB = () => db;

// module.exports = { connectDB, getDB };
