const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');

// Middleware de json
app.use(express.json());
// cors
app.use(cors());

// importación de rutas
const userRoutes = require('./routes/userRoute');
const authRoutes = require('./routes/authRoute');
const glucoseRoutes = require('./routes/glucoseRoute');

// conexión a DB
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONECTION);
    console.log('Conexión a DB con éxito!!!');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
};
dbConnection();

// uso de rutas sin prefijos
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', glucoseRoutes);
app.get('/ping', (req, res) => {
  res.status(200).send('Server is active');
});

// configuración del puerto
app.listen(process.env.PORT, () => {
  console.log(`El puerto ${process.env.PORT} funciona bien...`);
});

