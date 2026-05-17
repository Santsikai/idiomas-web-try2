const express = require('express');
const bcrypt  = require('bcryptjs');
const pool    = require('../db/pool');
const router  = express.Router();

// GET /users/bloqueados
router.get('/bloqueados', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, email, role_id, bloqued FROM users WHERE bloqued > 0'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /users/no_bloqueados
router.get('/no_bloqueados', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, email, role_id, bloqued FROM users WHERE bloqued = 0'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /users/admins
router.get('/admins', async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, email, role_id, bloqued FROM users WHERE role_id = 'admin'"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /users/no_admins
router.get('/no_admins', async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, email, role_id, bloqued FROM users WHERE role_id != 'admin'"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /users/bloquear/:id?tipo_bloqueo=X
router.put('/bloquear/:id', async (req, res) => {
  const { id } = req.params;
  const tipo_bloqueo = parseInt(req.query.tipo_bloqueo ?? '1', 10);
  try {
    const [result] = await pool.query(
      'UPDATE users SET bloqued = ? WHERE id = ?',
      [tipo_bloqueo, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Bloqueo actualizado', bloqued: tipo_bloqueo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /users/:id/rol
router.put('/:id/rol', async (req, res) => {
  const { id } = req.params;
  const role_id = req.query.role_id || req.body.role_id;
  if (!role_id) return res.status(400).json({ error: 'Falta role_id' });
  try {
    const [result] = await pool.query(
      'UPDATE users SET role_id = ? WHERE id = ?',
      [role_id, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Rol actualizado', role_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /users/:id  (editar email, password, bloqued)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { email, password, bloqued } = req.body;
  try {
    const fields = [];
    const values = [];
    if (email !== undefined)  { fields.push('email = ?');   values.push(email); }
    if (password !== undefined) {
      const hash = await bcrypt.hash(password, 10);
      fields.push('password = ?');
      values.push(hash);
    }
    if (bloqued !== undefined) { fields.push('bloqued = ?'); values.push(bloqued); }
    if (fields.length === 0) return res.status(400).json({ error: 'Nada que actualizar' });
    values.push(id);
    const [result] = await pool.query(
      `UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario actualizado' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'El email ya existe' });
    res.status(500).json({ error: err.message });
  }
});

// DELETE /users/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
