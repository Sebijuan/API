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
  // Removed deprecated options
})
.then(() => console.log('✅ Conexión a MongoDB establecida'))
.catch(err => console.error('❌ Error de conexión:', err));

// Use the user routes
app.use('/api', userRoutes);

// Add a route to check if the server is running
app.get('/', (req, res) => {
  res.send('Server is running');
});

module.exports = app;
