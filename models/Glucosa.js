const mongoose = require('mongoose');

const glucoseSchema = new mongoose.Schema({
  concentracion: Number,
  fecha: {
    type: Date,
    default: Date.now, // Asigna la fecha y hora actuales por defecto
  },
  usuario: String
});

const Glucosa = mongoose.model('Glucosa', glucoseSchema);

module.exports = Glucosa;