const { Router } = require('express');
const { addUser, getAllUsers } = require('../controllers/userController');
const route = Router();

// Agregar nuevo usuario
route.post('/users', addUser);
route.get('/users', getAllUsers);

module.exports = route;