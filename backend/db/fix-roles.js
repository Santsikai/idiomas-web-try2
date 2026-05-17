require('dotenv').config();
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

(async () => {
  await pool.query('SET FOREIGN_KEY_CHECKS=0');
  await pool.query('DELETE FROM roles');
  await pool.query(
    'INSERT INTO roles (id, nombre) VALUES (?, ?), (?, ?), (?, ?)',
    ['1', 'Administrador', '2', 'Usuario', '3', 'Propietario']
  );
  await pool.query("ALTER TABLE users ALTER COLUMN role_id SET DEFAULT '2'");
  await pool.query('SET FOREIGN_KEY_CHECKS=1');
  console.log('Roles actualizados: 1=Admin, 2=Usuario, 3=Propietario');
  process.exit(0);
})().catch(e => { console.error(e.message); process.exit(1); });
