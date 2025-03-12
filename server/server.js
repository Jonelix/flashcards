require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const path = require('path');
const RequestHandler = require('./RequestHandler');

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

app.use(express.static(path.join(__dirname, '../client/dist')));

const requestHandler = new RequestHandler();
requestHandler.initializeRoutes(app);

const PORT = process.env.PORT || 5005;

const server = app.listen(PORT, () => {
    console.log(`Server up at http://localhost:${PORT}`);
});
