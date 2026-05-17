-- ============================================================
-- SCHEMA MySQL para idiomas-web
-- ============================================================

CREATE DATABASE IF NOT EXISTS idiomas_web
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE idiomas_web;

-- ------------------------------------------------------------
-- Roles
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS roles (
  id   VARCHAR(50) PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

INSERT IGNORE INTO roles (id, nombre) VALUES
  ('1', 'Administrador'),
  ('2', 'Usuario'),
  ('3', 'Propietario');

-- ------------------------------------------------------------
-- Usuarios
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id         VARCHAR(100) PRIMARY KEY,
  email      VARCHAR(255) NOT NULL UNIQUE,
  username   VARCHAR(100) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  role_id    VARCHAR(50)  NOT NULL DEFAULT '2',
  bloqued    TINYINT(1)   NOT NULL DEFAULT 0,
  created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON UPDATE CASCADE
);

-- ------------------------------------------------------------
-- Idiomas
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS idioma (
  id         VARCHAR(100) PRIMARY KEY,
  nombre     VARCHAR(255) NOT NULL,
  user_id    VARCHAR(100) NOT NULL,
  lenguaje   VARCHAR(10)  NOT NULL,
  private    TINYINT(1)   NOT NULL DEFAULT 0,
  created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ------------------------------------------------------------
-- Idioma_Users  (idiomas copiados/seguidos por otros usuarios)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS idioma_users (
  id         VARCHAR(100) PRIMARY KEY,
  idioma_id  VARCHAR(100) NOT NULL,
  user_id    VARCHAR(100) NOT NULL,
  active     TINYINT(1)   NOT NULL DEFAULT 1,
  created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idioma_id) REFERENCES idioma(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (user_id)   REFERENCES users(id)  ON DELETE CASCADE ON UPDATE CASCADE
);

-- ------------------------------------------------------------
-- Grupo de Vocabulario
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS grupo_vocabulario (
  id          VARCHAR(100) PRIMARY KEY,
  nombre      VARCHAR(255) NOT NULL,
  idioma_id   VARCHAR(100) NOT NULL,
  nombre_col1 VARCHAR(255) NOT NULL DEFAULT 'Columna 1',
  nombre_col2 VARCHAR(255) NOT NULL DEFAULT 'Columna 2',
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idioma_id) REFERENCES idioma(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ------------------------------------------------------------
-- Palabra
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS palabra (
  id         VARCHAR(100) PRIMARY KEY,
  gv_id      VARCHAR(100) NOT NULL,
  col1       VARCHAR(500) NOT NULL,
  col2       VARCHAR(500) NOT NULL,
  created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (gv_id) REFERENCES grupo_vocabulario(id) ON DELETE CASCADE ON UPDATE CASCADE
);
