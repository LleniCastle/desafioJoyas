import { obtenerTotalJoyas, filtrarJoyas, obtenerConteoJoyas } from '../models/tiendaModel.js';

export const obtenerJoyas = async (req, res) => {
    try {
        const { limits, page, order_by } = req.query;
        const joyas = await obtenerTotalJoyas(limits, page, order_by);
        const joyasTotal = await obtenerConteoJoyas();
        res.json({
            totalJoyas: joyas.length,
            stockTotal: joyasTotal,
            results: joyas.map(joya => ({
                name: joya.nombre,
                href: `/joyas/joya/${joya.id}`
            }))
        });
    } catch (error) {
        console.error('Error al buscar joyas', error); 
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const obtenerJoyasFiltradas = async (req, res) => {
    try {
        const filtros = req.query;
        const joyasFiltradas = await filtrarJoyas(filtros);
        res.json(joyasFiltradas);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};