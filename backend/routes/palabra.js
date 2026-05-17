const express = require('express');
const pool    = require('../db/pool');
const router  = express.Router();

// POST /palabra/
router.post('/', async (req, res) => {
  const { id, gv_id, col1, col2 } = req.body;
  if (!id || !gv_id || col1 === undefined || col2 === undefined) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }
  try {
    await pool.query(
      'INSERT INTO palabra (id, gv_id, col1, col2) VALUES (?, ?, ?, ?)',
      [id, gv_id, col1, col2]
    );
    res.status(201).json({ id, gv_id, col1, col2 });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'ID duplicado' });
    res.status(500).json({ error: err.message });
  }
});

// GET /palabra/
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM palabra');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /palabra/gv/:gv_id
router.get('/gv/:gv_id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM palabra WHERE gv_id = ?', [req.params.gv_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /palabra/:id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM palabra WHERE id = ?', [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Palabra no encontrada' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /palabra/:id
router.put('/:id', async (req, res) => {
  const { col1, col2 } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE palabra SET col1 = ?, col2 = ? WHERE id = ?',
      [col1, col2, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Palabra no encontrada' });
    res.json({ message: 'Palabra actualizada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /palabra/gv/:gv_id  (eliminar todas las palabras de un grupo)
router.delete('/gv/:gv_id', async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM palabra WHERE gv_id = ?', [req.params.gv_id]
    );
    res.json({ message: 'Palabras eliminadas', affected: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /palabra/:id
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM palabra WHERE id = ?', [req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Palabra no encontrada' });
    res.json({ message: 'Palabra eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
