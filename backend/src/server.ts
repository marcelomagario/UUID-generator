import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; // Importar dotenv
import uuidRoutes from './routes/uuidRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware para permitir CORS
app.use(cors());
app.use(express.json());

// Usar as rotas definidas em uuidRoutes
app.use('/api', uuidRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});