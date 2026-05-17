const express = require('express');
const pool    = require('../db/pool');
const router  = express.Router();

// POST /idiomas/
router.post('/', async (req, res) => {
  const { id, nombre, user_id, lenguaje, private: priv } = req.body;
  if (!id || !nombre || !user_id || !lenguaje) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }
  try {
    await pool.query(
      'INSERT INTO idioma (id, nombre, user_id, lenguaje, private) VALUES (?, ?, ?, ?, ?)',
      [id, nombre, user_id, lenguaje, priv ? 1 : 0]
    );
    res.status(201).json({ id, nombre, user_id, lenguaje, private: priv ? 1 : 0 });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'ID duplicado' });
    res.status(500).json({ error: err.message });
  }
});

// GET /idiomas/publicos?nombre=X  (búsqueda pública por nombre)
router.get('/publicos', async (req, res) => {
  const nombre = (req.query.nombre || '').toLowerCase();
  try {
    const [rows] = await pool.query(
      'SELECT * FROM idioma WHERE private = 0 AND LOWER(nombre) LIKE ?',
      [`%${nombre}%`]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /idiomas/publicos_lenguaje?nombre=X&lenguaje=Y
router.get('/publicos_lenguaje', async (req, res) => {
  const nombre   = (req.query.nombre   || '').toLowerCase();
  const lenguaje = req.query.lenguaje  || '';
  try {
    const [rows] = await pool.query(
      'SELECT * FROM idioma WHERE private = 0 AND LOWER(nombre) LIKE ? AND lenguaje = ?',
      [`%${nombre}%`, lenguaje]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /idiomas/por_usuario/:userId
router.get('/por_usuario/:userId', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM idioma WHERE user_id = ?',
      [req.params.userId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /idiomas/:id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM idioma WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Idioma no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /idiomas/:id
router.put('/:id', async (req, res) => {
  const { nombre, lenguaje, private: priv } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE idioma SET nombre = ?, lenguaje = ?, private = ? WHERE id = ?',
      [nombre, lenguaje, priv ? 1 : 0, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Idioma no encontrado' });
    res.json({ message: 'Idioma actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /idiomas/:id
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM idioma WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Idioma no encontrado' });
    res.json({ message: 'Idioma eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
