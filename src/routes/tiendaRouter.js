import express from 'express';
import { obtenerJoyas, obtenerJoyasFiltradas } from '../controllers/tiendacontroller.js';

const router = express.Router();

router.get('/', obtenerJoyas);
router.get('/filtros', obtenerJoyasFiltradas);

export default router;
