import mysql from 'mysql2';
import config from './config.js'; // Importa el objeto config

const { DB, DB_PASSWORD, DB_USER, DB_PORT, HOST } = config; // Desestructurar las variables de config

export const pool = mysql.createPool({
  host: HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB,
  port: DB_PORT, // Asegúrate de que estás usando DB_PORT en lugar de PORT
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// Realizar una consulta simple para probar la conexión
promisePool.query('SELECT 1')
  .then(([rows, fields]) => {
    console.log("Conexión exitosa a la base de datos:", rows);
  })
  .catch(error => {
    console.error("Error al conectar a la base de datos:", error);
  });

  testConnection();

export const promisePool = pool.promise();
