import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerTheme } from "swagger-themes";
import Redoc from "redoc-express";
import studentRouter from "./students/students.router.js"; // Rutas de estudiantes
import { testConnection } from "./connection.js";
import { getTagsFromDatabase } from "./databaseQueries.js"; // Función para obtener datos de la base de datos

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Configuración de Swagger para documentación
const theme = new SwaggerTheme();

// Función que obtiene los tags de la base de datos
async function generateSwaggerTags() {
  try {
    const tagsFromDb = await getTagsFromDatabase(); // Obtener los datos desde la base de datos
    const tags = tagsFromDb.map((tag) => ({
      name: tag.name, // El nombre de la categoría o lo que sea relevante
      description: tag.description || "Descripción no disponible", // Descripción si está disponible
    }));
    
    return tags;
  } catch (error) {
    console.error("Error al obtener los tags desde la base de datos:", error);
    return [
      { name: "Estudiantes", description: "Operaciones relacionadas con estudiantes" }
    ]; // Valor por defecto
  }
}

// Función para generar la documentación Swagger
async function generateSwaggerDocs() {
  const tags = await generateSwaggerTags();

  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API de Estudiantes",
        version: "1.0.0",
        description: "API para la gestión de estudiantes. Consulta el README.md para más detalles.",
      },
      servers: [
        { url: `https://railwayapideploy-production.up.railway.app`, description: "Servidor en producción" },
        { url: `http://localhost:${port}`, description: "Servidor local de desarrollo" },
      ],
      tags, // Aquí se agregan los tags dinámicamente
    },
    apis: ["./students/students.router.js", "./index.js"], // Incluye este archivo para usar las definiciones Swagger
  };

  return swaggerJSDoc(swaggerOptions);
}

async function startServer() {
  const swaggerDocs = await generateSwaggerDocs(); // Obtener la documentación Swagger

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
  app.use(studentRouter);

  // Verifica la conexión a la base de datos antes de iniciar el servidor
  testConnection()
    .then(() => {
      app.listen(port, () => {
        console.log(`Servidor escuchando en: http://localhost:${port}`);
      });
    })
    .catch((err) => {
      console.error("Error de conexión a la base de datos:", err);
      process.exit(1); // Finaliza el proceso si no se puede conectar a la base de datos
    });
}

startServer(); // Inicia el servidor
