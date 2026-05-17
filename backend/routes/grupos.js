const express = require('express');
const pool    = require('../db/pool');
const router  = express.Router();

// POST /grupos/
router.post('/', async (req, res) => {
  const { id, nombre, idioma_id, nombre_col1, nombre_col2 } = req.body;
  if (!id || !nombre || !idioma_id) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }
  try {
    await pool.query(
      'INSERT INTO grupo_vocabulario (id, nombre, idioma_id, nombre_col1, nombre_col2) VALUES (?, ?, ?, ?, ?)',
      [id, nombre, idioma_id, nombre_col1 || 'Columna 1', nombre_col2 || 'Columna 2']
    );
    res.status(201).json({ id, nombre, idioma_id, nombre_col1: nombre_col1 || 'Columna 1', nombre_col2: nombre_col2 || 'Columna 2' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'ID duplicado' });
    res.status(500).json({ error: err.message });
  }
});

// GET /grupos/por_idioma/:id
router.get('/por_idioma/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM grupo_vocabulario WHERE idioma_id = ?', [req.params.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /grupos/:id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM grupo_vocabulario WHERE id = ?', [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Grupo no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /grupos/:id
router.put('/:id', async (req, res) => {
  const { nombre, nombre_col1, nombre_col2 } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE grupo_vocabulario SET nombre = ?, nombre_col1 = ?, nombre_col2 = ? WHERE id = ?',
      [nombre, nombre_col1, nombre_col2, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Grupo no encontrado' });
    res.json({ message: 'Grupo actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /grupos/por_idioma/:id  (eliminar todos los grupos de un idioma)
router.delete('/por_idioma/:id', async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM grupo_vocabulario WHERE idioma_id = ?', [req.params.id]
    );
    res.json({ message: 'Grupos eliminados', affected: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /grupos/:id
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM grupo_vocabulario WHERE id = ?', [req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Grupo no encontrado' });
    res.json({ message: 'Grupo eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
