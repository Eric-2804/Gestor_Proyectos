import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js'; // ✅ rutas
import roleRoutes from './routes/Role.js'; // ✅ rutas de roles
import categoryRoutes from './routes/category.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gestor_proyectos';

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/categories',categoryRoutes)

// Ruta raíz
app.get('/', (req, res) => {
    res.json({ message: 'API funcionando 🚀' });
});

// Conexión a MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, () => {
        console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });
})
.catch((error) => {
    console.error('❌ Error al conectar MongoDB:', error);
});

