const User = require('../models/User');
const bcrypt = require('bcryptjs');

const addUser = async (request, response) => {
  try {
    const { nombre, email, password, diabetes } = request.body;

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      nombre,
      email,
      password: hash,
      diabetes
    });

    await newUser.save();
    response.status(200).json({ mensaje: 'Usuario creado con éxito' });

  } catch (error) {
    if (error.code === 11000) { // Error de duplicación en Mongoose
      if (error.keyPattern && error.keyPattern.email) {
        response.status(400).json({ mensaje: 'El correo electrónico ya está registrado' });
      }
    } else {
      response.status(500).json({ mensaje: error.message });
    }
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('diabetes');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (request, response) => {
  const { id } = request.params;
  try {
    const userById = await User.findById(id);
    if (!userById) {
      return response.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    response.status(200).json(userById);
  } catch (error) {
    response.status(500).json({ mensaje: error.message });
  }
};

module.exports = { addUser, getAllUsers, getUserById };