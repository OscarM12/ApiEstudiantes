import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import studentRouter from "./students/studensts.router.js";
import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerTheme } from "swagger-themes";
import Redoc from 'redoc-express'

import config from './config.js'; // Importar el objeto de configuración

const { DB, DB_PASSWORD, DB_USER, HOST, SERVER_PORT } = config; // Desestructurar las variables

const app = express();
const port = process.env.PORT || 8080;
const theme = new SwaggerTheme();
const customCss = theme.getBuffer('dark'); 

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
  apis: ["./students/studensts.router.js"],
};

const options = {
  explorer: true,
  customCss
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs, options));
app.use(studentRouter);

app.use('/api-docs-json', (req, res) => {
  res.json(swaggerDocs);
})

app.use('/redoc', Redoc({
  title: 'Documentación de Mi API',
  specUrl: '/api-docs-json',
}));

// Usar el puerto definido en config.js
app.listen(SERVER_PORT, () => {
  console.log(`Servidor corriendo en el puerto ${SERVER_PORT}`);
});
