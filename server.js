require('dotenv').config(); // Load .env file

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Log the API_KEY to verify it's loaded
console.log('API_KEY:', process.env.API_KEY);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
