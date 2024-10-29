const { MongoClient } = require('mongodb');
const express = require('express');

const app = express();
const port = 3000;

// Hardcoded MongoDB URI
const uri = "mongodb://angelesedgardo17:dNjeAKovMY0psOmU@depedinfostorage.mongodb.net/myusers.student?retryWrites=true&w=majority";
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