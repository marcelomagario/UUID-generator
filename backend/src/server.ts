import express from 'express';
import path from 'path';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import uuidRoutes from './routes/uuidRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

  // // CORS
  app.use((req, res, next) => {
    const proxied = req.header('x-nginx-proxy');

    if (!proxied) {
      res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'authorization, cache-control, content-type, dnt, if-modified-since, keep-alive, pragma, range, user-agent, x-customheader, x-legacy-authorization, x-requested-with, mz-internal-app, mz-token-data, mz-finger-print, mz-finger-print-data');
    }
    if (req.method === 'OPTIONS') {
      res.statusCode = 200;
      return res.send();
    }
    return next();
  });

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