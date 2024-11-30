import mysql from 'mysql2';  // Asegúrate de importar mysql2 correctamente
import { DB, DB_PASSWORD, DB_USER, HOST } from './config.js';  // Importa las variables de configuración

// Crear la conexión a la base de datos
const pool = mysql.createPool({
  host: HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB,
  port: 3306,  // Asegúrate de que el puerto sea correcto
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// Crear el promisePool
export const promisePool = pool.promise();

// Función para probar la conexión
export const testConnection = async () => {
  try {
    const [rows] = await promisePool.query('SELECT 1');
    console.log("Conexión exitosa a la base de datos:", rows);  // Imprime el resultado
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);  // Imprime el error
  }
};

// Exportar la conexión para utilizarla en otros archivos
export { pool };
