const { MongoClient } = require('mongodb');
const express = require('express');
const { DNS } = require('dns2'); // Correct import of DNS

const app = express();
const port = 3000;

// Create a DNS resolver (no need to instantiate)
const dns = DNS; // Use DNS directly

const mongoHost = "depedinfostorage.mongodb.net";
const mongoUriTemplate = "mongodb://angelesedgardo17:dNjeAKovMY0psOmU@{ip}/myusers?retryWrites=true&w=majority";

async function resolveMongoHost() {
    try {
        // Resolve MongoDB hostname to an IP address
        const response = await dns.resolveA(mongoHost); // Using resolveA for A records
        const ipAddress = response.answers[0]?.address;

        if (!ipAddress) throw new Error("Failed to resolve MongoDB host IP.");

        return mongoUriTemplate.replace("{ip}", ipAddress);
    } catch (error) {
        console.error("DNS resolution error:", error);
        throw error;
    }
}

async function connectToMongoDB() {
    try {
        const uri = await resolveMongoHost();
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB");

        // Keep the MongoDB client available for other app functionality here
        return client;
    } catch (error) {
        console.error("Connection error:", error);
    }
}

// Initialize MongoDB connection
connectToMongoDB();

// Define a basic route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
