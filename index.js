import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerTheme } from "swagger-themes";
import Redoc from "redoc-express";
import studentRouter from "./students/students.router.js"; // Rutas de estudiantes
import { testConnection } from "./connection.js";

const app = express();
const port = process.env.PORT || 8080;

// Configuración del tema de Swagger
const theme = new SwaggerTheme(); // Elimina la versión explícita

// Configuración de Swagger para documentación
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Estudiantes",
      version: "1.0.0",
      description: "API para la gestión de estudiantes. Consulta el README.md para más detalles.",
    },
    servers: [
      {
        url: `http://localhost:${port}`,  // Cambia a http si no necesitas HTTPS en local
        description: "Servidor local de desarrollo",
      },
    ],
    tags: [
      { name: "Estudiantes", description: "Operaciones relacionadas con estudiantes" },
    ],
  },
  apis: ["./students/students.router.js", "./index.js"], // Incluye este archivo para usar las definiciones Swagger
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Configuración de CORS
const corsOptions = {
  origin: '*', // Permite localhost o otros orígenes
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json()); 

// Rutas para documentación con tema "outline"
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocs, {
    explorer: true,
    customCss: theme.getBuffer("outline"), 
  })
);

// Endpoint para Redoc
app.use("/api-docs-json", (req, res) => {
  res.json(swaggerDocs); // Endpoint para Redoc
});
app.use(
  "/docs",
  Redoc({
    title: "Documentación de API de Estudiantes",
    specUrl: "/api-docs-json", // Usa el JSON generado por Swagger JSDoc
  })
);

// Rutas principales
app.use(studentRouter); // Rutas definidas en `students.router.js`

// Verifica la conexión a la base de datos antes de iniciar el servidor
testConnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor escuchando en: https://railwayapideploy-production.up.railway.app`);
    });
  })
  .catch((err) => {
    console.error("Error de conexión a la base de datos:", err);
    process.exit(1); // Finaliza el proceso si no se puede conectar a la base de datos
  });

/**
 * @swagger
 * components:
 *    schemas:
 *       Estudiante:
 *         type: object
 *         properties:
 *           id_estudiante:
 *             type: number
 *             example: 101
 *           nombre:
 *             type: string
 *             example: Juan
 *           apellido_paterno:
 *             type: string
 *             example: Pérez
 *           apellido_materno:
 *             type: string
 *             example: López
 *           carrera:
 *             type: string
 *             example: Ingeniería en Sistemas Computacionales
 */

/**
 * @swagger
 * tags:
 * - name: Estudiantes
 *   description: Gestión de estudiantes
 */
