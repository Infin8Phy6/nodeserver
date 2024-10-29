// Load environment variables from .env file
require('dotenv').config(); 

const { MongoClient } = require('mongodb');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000; // Use PORT from environment variables or default to 3000

// MongoDB URI from environment variables
const uri = process.env.MONGODB_URI; 
const client = new MongoClient(uri);

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Connection error:", error);
    }
}

// Call the MongoDB connection function
connectToMongoDB();

// Define a basic route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
