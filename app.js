const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost', // Cambia según la configuración de Railway
  user: 'root',
  password: 'password',
  database: 'estudiantes_db'
});

// Conexión a la base de datos
db.connect(err => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  console.log('Conectado a la base de datos');
});

const app = express();
app.use(express.json());

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Estudiantes',
      version: '1.0.0',
      description: 'API para gestionar estudiantes',
    },
    servers: [
      {
        url: 'http://localhost:5000', // Cambia según la URL de Railway
      },
    ],
  },
  apis: ['./app.js'], // Ruta a los archivos donde están los comentarios de Swagger
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Endpoint para crear un estudiante
/**
 * @swagger
 * /estudiantes:
 *   post:
 *     summary: Crear un nuevo estudiante
 *     tags: [Estudiantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero_control:
 *                 type: string
 *               nombre:
 *                 type: string
 *               apellido_paterno:
 *                 type: string
 *               apellido_materno:
 *                 type: string
 *               carrera:
 *                 type: string
 *               foto:
 *                 type: string
 *     responses:
 *       201:
 *         description: Estudiante creado exitosamente
 */
app.post('/estudiantes', upload.single('foto'), (req, res) => {
  const { numero_control, nombre, apellido_paterno, apellido_materno, carrera } = req.body;
  const foto_url = req.file ? `/uploads/${req.file.filename}` : null;

  const query = 'INSERT INTO estudiantes (numero_control, nombre, apellido_paterno, apellido_materno, carrera, foto_url) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [numero_control, nombre, apellido_paterno, apellido_materno, carrera, foto_url], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al crear el estudiante');
    }
    res.status(201).send('Estudiante creado');
  });
});

// Iniciar el servidor
app.listen(5000, () => {
  console.log('API corriendo en http://localhost:5000');
});