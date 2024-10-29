require('dotenv').config(); // Load .env file

const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Function to connect to MongoDB
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

// Log the API_KEY to verify it's loaded
console.log('API_KEY:', process.env.MONGODB_URI);

// Define a basic route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
