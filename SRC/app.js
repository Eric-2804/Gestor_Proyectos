import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from '../ROUTES/users.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gestor_proyectos';

app.use(cors());
app.use(express.json());

// Usa la ruta
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando 🚀' });
});

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
<<<<<<< HEAD
    .then(() => {
        console.log('✅ Conectado a MongoDB');
        app.listen(PORT, () => {
            console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('❌ Error al conectar a MongoDB:', error);
    });
=======
.then(() => {
  console.log('✅ Conectado a MongoDB');
  app.listen(PORT, () => {
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error('❌ Error al conectar MongoDB:', error);
});
>>>>>>> 3536a911d1eb197e47c607371f1a4979ba9ce535
