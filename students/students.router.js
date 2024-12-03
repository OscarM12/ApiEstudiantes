import { Router } from "express";
import { createNewStudent, deleteStudentById, getAllStudents, getStudentById, updateStudent } from './students.services.js';

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
 *          description: Lista de estudiantes en formato JSON
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Estudiante'  // Refleja el esquema Estudiante, que se obtiene de la base de datos
 */
studentRouter.get("/alumnos", async (req, res) => {
  try {
    const students = await getAllStudents(); // Obtiene los estudiantes de la base de datos
    res.status(200).json(students); // Devuelve los estudiantes en formato JSON
  } catch (err) {
    console.error("Error al obtener los estudiantes:", err.message);
    res.status(500).json({ error: "Error al obtener los estudiantes" });
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
 *          required: true
 *          description: ID del estudiante a consultar
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: Datos del estudiante específico
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Estudiante'  // Refleja el esquema Estudiante
 *        404:
 *          description: Estudiante no encontrado
 *        500:
 *          description: Error interno del servidor
 */
studentRouter.get("/alumnos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const student = await getStudentById(id);  // Obtiene el estudiante desde la base de datos
    if (student.length === 0) {
      return res.status(404).json({ message: `Estudiante con ID ${id} no encontrado` });
    }
    res.json(student[0]); // Devuelve solo el primer resultado
  } catch (err) {
    res.status(500).json({ message: "Error al obtener el estudiante", error: err.message });
  }
});

// Resto de las rutas de creación, actualización y eliminación

export default studentRouter;
