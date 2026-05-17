const express = require('express');
const pool    = require('../db/pool');
const router  = express.Router();

// POST /idioma_users/
router.post('/', async (req, res) => {
  const { id, idioma_id, user_id, active } = req.body;
  if (!id || !idioma_id || !user_id) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }
  try {
    await pool.query(
      'INSERT INTO idioma_users (id, idioma_id, user_id, active) VALUES (?, ?, ?, ?)',
      [id, idioma_id, user_id, active !== undefined ? (active ? 1 : 0) : 1]
    );
    res.status(201).json({ message: 'IdiomaUser creado', id });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'ID duplicado' });
    res.status(500).json({ error: err.message });
  }
});

// GET /idioma_users/por_idioma/:id
router.get('/por_idioma/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM idioma_users WHERE idioma_id = ?', [req.params.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /idioma_users/por_usuario/:userId
router.get('/por_usuario/:userId', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM idioma_users WHERE user_id = ?', [req.params.userId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /idioma_users/por_idioma_usuario/:idioma_id/:user_id
router.get('/por_idioma_usuario/:idioma_id/:user_id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM idioma_users WHERE idioma_id = ? AND user_id = ?',
      [req.params.idioma_id, req.params.user_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /idioma_users/:id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM idioma_users WHERE id = ?', [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /idioma_users/:id  (active)
router.put('/:id', async (req, res) => {
  const { active } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE idioma_users SET active = ? WHERE id = ?',
      [active ? 1 : 0, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ message: 'Actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /idioma_users/:id
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM idioma_users WHERE id = ?', [req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ message: 'Eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
