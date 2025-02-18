require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json()); // Ensure this middleware is set up

// Configure CORS to allow requests from your frontend's origin
const corsOptions = {
  origin: 'https://despliegue-prueba-kohl.vercel.app',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  throw new Error('MONGO_URI environment variable is not defined');
}

// Conectar a MongoDB Compose
mongoose.connect(mongoURI, {
  serverSelectionTimeoutMS: 20000, // Increase timeout to 20 seconds
  socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
})
.then(() => console.log('✅ Conexión a MongoDB establecida'))
.catch(err => {
  console.error('❌ Error de conexión:', err);
  process.exit(1); // Exit the process if the connection fails
});

// Log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Use the user routes
app.use('/api', userRoutes);

// Add a route to check if the server is running
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
