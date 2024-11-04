const Glucosa = require('../models/Glucosa');
const User = require('../models/User');

const addConcentracion = async (request, response) => {
  try {
    const { concentracion, usuarioId } = request.body;

    // Verifica que el usuarioId esté presente
    if (!usuarioId) {
      return response.status(400).json({ mensaje: 'El usuarioId es requerido' });
    }

    const usuario = await User.findById(usuarioId);
    if (!usuario) {
      return response.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const newGlucoseData = new Glucosa({
      concentracion,
      usuario: usuario._id // Asignar solo el ID del usuario
    });

    await newGlucoseData.save();

    // Empujar el nuevo ID de glucosa en la matriz del usuario
    usuario.glucosa.push(newGlucoseData._id); // Cambiado a _id
    await usuario.save();

    response.status(200).json({ mensaje: 'Dato guardado con éxito' });

  } catch (error) {
    response.status(500).json({ mensaje: 'Error al guardar el dato: ' + error.message });
  }
};

const getAllGlucose = async (req, res) => {
  try {
    const glucose = await Glucosa.find();
    res.status(200).json(glucose);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { addConcentracion, getAllGlucose };