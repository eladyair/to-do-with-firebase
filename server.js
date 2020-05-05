const path = require('path');
const express = require('express');
const cors = require('cors');

// Initializing the server
const app = express();

// Middlewares
// Initializing the json middleware, to enable parsing incoming json requests
app.use(express.json());
// Initializing the cross origin middleware, to enable receving requests from our client app that runs on a diffrent port
app.use(cors());

// 5000 is the port to run the server locally
const PORT = process.env.PORT || 5000;

// Running the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
