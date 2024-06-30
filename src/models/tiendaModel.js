import pool from '../../database/config.js';
import format from 'pg-format';

export const obtenerTotalJoyas = async (limits, page, order_by) => {
    let query = 'SELECT * FROM inventario';
    
    if (order_by) {
        query = format('%s ORDER BY %I %s', query, order_by.split('_')[0], order_by.split('_')[1]);
    }
    
    if (limits && page) {
        const offset = (page - 1) * limits;
        query = format('%s LIMIT %L OFFSET %L', query, limits, offset);
    }
    
    const result = await pool.query(query);
    return result.rows;
};

export const obtenerConteoJoyas = async () => {
    const result = await pool.query('SELECT COUNT(*) FROM inventario');
    return parseInt(result.rows[0].count, 10);
};

export const filtrarJoyas = async (filters) => {
    const { precio_min, precio_max, categoria, metal } = filters;
    let query = `SELECT * FROM inventario WHERE 1=1`;
    const values = [];

    if (precio_min !== undefined) {
        query = format('%s AND precio >= %L', query, precio_min);
    }
    if (precio_max !== undefined) {
        query = format('%s AND precio <= %L', query, precio_max);
    }
    if (categoria !== undefined) {
        query = format('%s AND categoria = %L', query, categoria);
    }
    if (metal !== undefined) {
        query = format('%s AND metal = %L', query, metal);
    }

    const result = await pool.query(query);
    return result.rows;
};