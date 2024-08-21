import express from 'express';
import path from 'path';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import uuidRoutes from './routes/uuidRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Lista de origens permitidas
const allowedOrigins: string[] = ['https://uuid-generator-frontend.onrender.com/', 'http://another-example.com'];

// Função de configuração do CORS
const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allowed?: boolean) => void) => {
    // Permite solicitações de origens na lista de permitidas ou sem origem
    if (origin === undefined || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(express.json());

// Usar as rotas definidas em uuidRoutes
app.use('/api', uuidRoutes);

app.get('/api/uuids', (req, res) => {
  res.json(['uuid1', 'uuid2']);
});

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