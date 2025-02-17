const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    // Removed deprecated options
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

app.use(express.json());

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Trying another port...`);
        const alternativeServer = app.listen(0, () => {
            console.log(`Server is running on port ${alternativeServer.address().port}`);
        });
    } else {
        console.error('Server error:', err);
    }
});
