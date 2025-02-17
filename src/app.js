require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  throw new Error('MONGO_URI environment variable is not defined');
}

// Conectar a MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Conexión a MongoDB establecida'))
  .catch(err => {
    console.error('❌ Error de conexión:', err);
    process.exit(1); // Exit the process if the connection fails
  });

// Esquema y modelo de usuario
const usuarioSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

// Rutas para la API
app.get('/api/users', async (req, res) => {
  try {
    console.log('Fetching users from database'); // Add logging
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    console.error('Error fetching users:', err); // Add logging
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
    const usuarioGuardado = await nuevoUsuario.save();
    res.status(201).json(usuarioGuardado);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(usuarioActualizado);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

module.exports = app;
