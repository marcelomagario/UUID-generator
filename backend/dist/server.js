"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const uuidRoutes_1 = __importDefault(require("./routes/uuidRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Lista de origens permitidas
// const allowedOrigins: string[] = [
//   'https://uuid-generator-frontend.onrender.com',
//   'http://localhost:3000'
// ];
// // Função de configuração do CORS
// const corsOptions: CorsOptions = {
//   origin: (origin: string | undefined, callback: (err: Error | null, allowed?: boolean) => void) => {
//     // Permite solicitações de origens na lista de permitidas ou sem origem
//     if (origin === undefined || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'), false);
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// };
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
app.use(express_1.default.json());
// Usar as rotas definidas em uuidRoutes
app.use('/api', uuidRoutes_1.default);
app.get('/api/uuids', (req, res) => {
    res.json(['uuid1', 'uuid2']);
});
// Servir arquivos estáticos do frontend
app.use(express_1.default.static(path_1.default.join(__dirname, 'frontend', 'build')));
// Redirecionar todas as outras rotas para o frontend
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'frontend', 'build', 'index.html'));
});
// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
