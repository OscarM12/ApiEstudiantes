import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import studentRouter from "./students/students.router.js";  // Router importado
import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerTheme } from "swagger-themes";
import Redoc from 'redoc-express';
import { testConnection } from './connection.js';

const app = express();
app.use(express.json());  // Ya no necesitas bodyParser.json()
const port = process.env.PORT || 8080;
const theme = new SwaggerTheme('v3');

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Api de estudiantes",
      version: "1.0.0",
      description: "Descripción de la API Empleados. Consulta el README.md para más detalles:\n\n",
    },
    servers: [{ url: `https://railwayapideploy-production.up.railway.app` }],
    tags: [
      { name: "Estudiantes", description: "Operaciones relacionadas con estudiantes" },
    ],
  },
  apis: ["./students/students.router.js"],
};

const options = {
  explorer: true,
};

app.use(cors());
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs, options));
app.use(studentRouter);  // Rutas de estudiantes ya están incluidas en el router

app.use('/api-docs-json', (req, res) => {
  res.json(swaggerDocs);
});

app.use('/docs', Redoc({
  title: 'Documentación de Mi API',
  specUrl: '/api-docs-json', 
}));

// Verifica la conexión a la base de datos antes de iniciar el servidor
testConnection().then(() => {
  app.listen(port, () => {
    console.log(`Servidor express escuchando en el puerto: http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Error de conexión a la base de datos:', err);
});
