import mysql from 'mysql2';
import { DB,DB_PASSWORD,DB_USER,PORT,HOST } from './config.js';

export const pool = mysql.createPool({
  host: HOST,
  user: DB_USER,
  password: DB_PASSWORD, 
  database: DB,
  port: PORT,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

export const promisePool = pool.promise();