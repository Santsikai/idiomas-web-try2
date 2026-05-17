require('dotenv').config();
const express      = require('express');
const cors         = require('cors');

const authRouter        = require('./routes/auth');
const usersRouter       = require('./routes/users');
const idiomasRouter     = require('./routes/idiomas');
const idiomaUsersRouter = require('./routes/idioma_users');
const gruposRouter      = require('./routes/grupos');
const palabraRouter     = require('./routes/palabra');

const app  = express();
const PORT = process.env.PORT || 8001;

// ── Middlewares globales ──────────────────────────────────────
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:4200')
  .split(',').map(o => o.trim());
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// ── Rutas ─────────────────────────────────────────────────────
app.use('/auth',          authRouter);
app.use('/users',         usersRouter);
app.use('/idiomas',       idiomasRouter);
app.use('/idioma_users',  idiomaUsersRouter);
app.use('/grupos',        gruposRouter);
app.use('/palabra',       palabraRouter);

// ── Health check ──────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// ── 404 catch-all ─────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

// ── Arranque ──────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Backend escuchando en http://localhost:${PORT}`);
});
