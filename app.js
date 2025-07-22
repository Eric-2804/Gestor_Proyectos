import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js'; // 👈 Importa las rutas de auth
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import CommentRoutes from './routes/comment.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gestor_proyectos';

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);        // 👈 Aquí agregas la ruta de auth
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/comments',CommentRoutes)

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
