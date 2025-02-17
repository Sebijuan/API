const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ message: error.message });
    }
};

exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Log the request body
    console.log('Request body:', req.body);

    // Validate request body
    if (!name || !email || !password) {
        console.error('Validation error: Missing required fields');
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const newUser = new User({ name, email, password });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error saving user:', error.message);
        res.status(400).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password || user.password;

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        await user.remove();
        res.json({ message: "Usuario eliminado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
