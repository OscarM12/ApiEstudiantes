export const PORT = process.env.PORT || 8080;  // Puerto del servidor de la API
export const HOST = process.env.HOST || 'junction.proxy.rlwy.net';  // Host de la base de datos
export const DB = process.env.DB || 'estudiante';  // Nombre de la base de datos
export const DB_USER = process.env.DB_USER || 'root';  // Usuario de la base de datos
export const DB_PASSWORD = process.env.DB_PASSWORD || 'lakDCfAdVJabwilxJXpIAXsFSinNxLJe';  // Contraseña de la base de datos
export const DB_PORT = process.env.DB_PORT || 55824;
  // Puerto de la base de datos

  import dotenv from 'dotenv';
dotenv.config();

