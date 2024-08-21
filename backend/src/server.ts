import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import uuidRoutes from './routes/uuidRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware para permitir CORS
app.use(cors());
app.use(express.json());

// Usar as rotas definidas em uuidRoutes
app.use('/api', uuidRoutes);

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// Redirecionar todas as outras rotas para o frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});