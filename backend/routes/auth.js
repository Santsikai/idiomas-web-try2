const express  = require('express');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const pool     = require('../db/pool');
const router   = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// POST /auth/register
router.post('/register', async (req, res) => {
  const { id, email, password, role_id, bloqued } = req.body;
  if (!id || !email || !password || !role_id) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (id, email, password, role_id, bloqued) VALUES (?, ?, ?, ?, ?)',
      [id, email, hash, role_id, bloqued ?? 0]
    );
    res.status(201).json({ message: 'Usuario creado', id });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }
    res.status(500).json({ error: err.message });
  }
});

// POST /auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
  }
  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ?', [email]
    );
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    const user = rows[0];
    if (user.bloqued) {
      return res.status(403).json({ error: 'Usuario bloqueado' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role_id: user.role_id },
      JWT_SECRET,
      { expiresIn: '8h' }
    );
    const { password: _, ...userData } = user;
    res.json({ token, user: userData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
