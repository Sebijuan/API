let users = []; // Array en memoria para almacenar usuarios

exports.getAllUsers = (req, res) => {
    res.json(users);
};

exports.createUser = (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
};

exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = users.find(u => u.id === parseInt(id));

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    user.name = name || user.name;
    user.email = email || user.email;
    
    res.json(user);
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;
    users = users.filter(u => u.id !== parseInt(id));
    res.json({ message: "Usuario eliminado" });
};
