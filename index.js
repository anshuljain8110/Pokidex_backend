// index.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/dbconnect');

// Import routes
const pokemonRoutes = require('./routes/main');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to database
connectDB();

// Variables
const PORT = process.env.PORT || 8080;
const SECRET_API_PATH = "/v1/pokedex";

// Use routes
app.use(SECRET_API_PATH, pokemonRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
