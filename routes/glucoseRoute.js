const { Router } = require('express');
const { addConcentracion, getAllGlucose } = require('../controllers/glucoseController');
const route = Router();

// Agregar nuevo usuario
route.post('/glucose', addConcentracion);
route.get('/glucose', getAllGlucose);

module.exports = route;