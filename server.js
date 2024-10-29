const { MongoClient } = require('mongodb');
const express = require('express');
const { DNS } = require('dns2'); // Ensure you're importing DNS correctly

const app = express();
const port = 3000;

const mongoHost = "depedinfostorage.mongodb.net";
const mongoUriTemplate = "mongodb://angelesedgardo17:dNjeAKovMY0psOmU@{ip}/myusers?retryWrites=true&w=majority";

async function resolveMongoHost() {
    try {
        // Create an instance of the DNS resolver
        const dns = new DNS();

        // Resolve MongoDB hostname to an IP address
        const response = await dns.resolveA(mongoHost);
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
