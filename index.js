import express from 'express';
import cors from 'cors';
import { logger } from 'logger-express';
import path from 'path';
import tiendaRoutes from './src/routes/tiendaRouter.js';
import 'dotenv/config'; 

const PORT = process.env.PORT || 3000;


const app = express();
app.use(express.json());
app.use(cors());
app.use(logger());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    console.log(`Request to ${req.path}`);
    next();
})

app.use('/joyas', tiendaRoutes);

app.listen(PORT, () => {
    console.log(`¡Servidor encendido! http://localhost:${PORT}`);
});
