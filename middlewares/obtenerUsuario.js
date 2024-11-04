const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Asegúrate de tener el modelo de usuario importado
require('dotenv').config();

// Middleware para verificar y obtener el usuario
const obtenerUsuario = async (request, res, next) => {
  let token = request.header('Authorization');

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7).trim(); // Elimina el prefijo 'Bearer ' y los espacios en los extremos
  } else {
    return res.status(401).json({ mensaje: 'No se ha proporcionado un token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY); // Verifica el token

    const usuario = await User.findById(decoded.id); // Encuentra al usuario en la base de datos
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    request.email = usuario.email; // Asigna el objeto de usuario a la solicitud
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido', error: error.message });
  }
};

module.exports = { obtenerUsuario };

