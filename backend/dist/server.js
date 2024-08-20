"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const uuidRoutes_1 = __importDefault(require("./routes/uuidRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware para permitir CORS
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Usar as rotas definidas em uuidRoutes
app.use('/api', uuidRoutes_1.default);
// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
