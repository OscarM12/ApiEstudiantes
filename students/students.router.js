import { Router } from "express";
import redoc from 'redoc-express';
import {
  createNewStudent,
  deleteStudentById,
  getAllStudents,
  getStudentById,
  updateStudent,
} from "./students.services.js";

const studentRouter = Router();

/**
 * @swagger
 * /alumnos:
 *    get:
 *      tags:
 *        - Estudiantes
 *      summary: Consultar todos los estudiantes
 *      description: Obtiene todos los estudiantes
 *      responses:
 *        200:
 *          description: Regresa un Json con todos los usuarios
 */
studentRouter.get("/alumnos", async (_, res) => {
  try {
    const result = await getAllStudents();
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener los estudiantes", error: err.message });
  }
});

/**
 * @swagger
 * /alumnos/{id}:
 *    get:
 *      tags:
 *        - Estudiantes
 *      summary: Obtener un estudiante por su id
 *      description: Obtiene un estudiante mediante su id
 *      parameters:
 *        - in: path
 *          name: id
 *      responses:
 *        200:
 *          description: Regresa un estudiante específico
 */
studentRouter.get("/alumnos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getStudentById(id);
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener el estudiante", error: err.message });
  }
});

/**
 * @swagger
 * /alumnos/{id}:
 *    delete:
 *      tags:
 *        - Estudiantes
 *      summary: Eliminar un estudiante por su id
 *      description: Elimina un estudiante mediante su id
 *      parameters:
 *        - in: path
 *          name: id
 *      responses:
 *        200:
 *          description: Elimina un estudiante específico
 */
studentRouter.delete("/alumnos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteStudentById(id);
    res.json({ message: "Estudiante eliminado correctamente", result });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar el estudiante", error: err.message });
  }
});

/**
 * @swagger
 * /alumnos:
 *    post:
 *      tags:
 *        - Estudiantes
 *      summary: Crear un nuevo estudiante
 *      description: Se crea un nuevo estudiante
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                numControl:
 *                  type: string
 *                nombre:
 *                  type: string
 *                apellidoPaterno:
 *                  type: string
 *                apellidoMaterno:
 *                  type: string
 *                carrera:
 *                  type: string
 *                fotografia:
 *                  type: string
 *              required:
 *                - numControl
 *                - nombre
 *                - apellidoPaterno
 *                - apellidoMaterno
 *                - carrera
 *                - fotografia
 *      responses:
 *        200:
 *          description: Creación de un nuevo estudiante
 */
studentRouter.post("/alumnos", async (req, res) => {
  const { numControl, nombre, apellidoPaterno, apellidoMaterno, carrera, fotografia } = req.body;
  try {
    const result = await createNewStudent({ numControl, nombre, apellidoPaterno, apellidoMaterno, carrera, fotografia });
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ message: "Error al crear el estudiante", error: err.message });
  }
});

/**
 * @swagger
 * /alumnos/{id}:
 *    put:
 *      tags:
 *        - Estudiantes
 *      summary: Edita un estudiante por su id
 *      description: Edita un estudiante mediante su id
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID del estudiante a editar
 *          schema:
 *            type: integer
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                nombre:
 *                  type: string
 *                apellidoPaterno:
 *                  type: string
 *                apellidoMaterno:
 *                  type: string
 *                carrera:
 *                  type: string
 *                fotografia:
 *                  type: string
 *              required:
 *                - nombre
 *                - apellidoPaterno
 *                - apellidoMaterno
 *                - carrera
 *      responses:
 *        200:
 *          description: Se edita un estudiante en específico
 */
studentRouter.put("/alumnos/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, apellidoPaterno, apellidoMaterno, carrera, fotografia } = req.body;
  try {
    const result = await updateStudent(id, { nombre, apellidoPaterno, apellidoMaterno, carrera, fotografia });
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar el estudiante", error: err.message });
  }
});

export default studentRouter;
