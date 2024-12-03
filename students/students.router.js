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
 *                  $ref: '#/components/schemas/Estudiante'
 */

studentRouter.get("/alumnos", async (req, res) => {
  try {
    const students = await getAllStudents(); // Obtiene solo las filas
    res.status(200).json(students); // Devuelve los datos en formato JSON
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
 *                $ref: '#/components/schemas/Estudiante'
 *        404:
 *          description: Estudiante no encontrado
 *        500:
 *          description: Error interno del servidor
 */

studentRouter.get("/alumnos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const student = await getStudentById(id);
    if (student.length === 0) {
      return res.status(404).json({ message: `Estudiante con ID ${id} no encontrado` });
    }
    res.json(student[0]); // Devuelve solo el primer resultado
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
 *          required: true
 *          description: ID del estudiante a eliminar
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: Estudiante eliminado correctamente
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Estudiante eliminado correctamente
 *        400:
 *          description: ID inválido
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: El ID debe ser un número válido
 *        404:
 *          description: Estudiante no encontrado
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Estudiante con ID 123 no encontrado
 *        500:
 *          description: Error interno del servidor
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error al eliminar el estudiante
 */

studentRouter.delete("/alumnos/:id", async (req, res) => {
  const { id } = req.params;

  // Validar que el ID sea un número
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ message: "El ID debe ser un número válido" });
  }

  try {
    const result = await deleteStudentById(id);

    // Verificar si el estudiante fue encontrado y eliminado
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `Estudiante con ID ${id} no encontrado` });
    }

    res.json({ message: "Estudiante eliminado correctamente" });
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
 *                  example: "20230001"
 *                nombre:
 *                  type: string
 *                  example: "Juan"
 *                apellidoPaterno:
 *                  type: string
 *                  example: "Pérez"
 *                apellidoMaterno:
 *                  type: string
 *                  example: "López"
 *                carrera:
 *                  type: string
 *                  example: "Ingeniería en Sistemas Computacionales"
 *              required:
 *                - numControl
 *                - nombre
 *                - apellidoPaterno
 *                - apellidoMaterno
 *                - carrera
 *      responses:
 *        201:
 *          description: Estudiante creado exitosamente
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Estudiante creado exitosamente"
 *                  estudiante:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        example: 1
 *                      numControl:
 *                        type: string
 *                        example: "20230001"
 *                      nombre:
 *                        type: string
 *                        example: "Juan"
 *                      apellidoPaterno:
 *                        type: string
 *                        example: "Pérez"
 *                      apellidoMaterno:
 *                        type: string
 *                        example: "López"
 *                      carrera:
 *                        type: string
 *                        example: "Ingeniería en Sistemas Computacionales"
 *        400:
 *          description: Solicitud inválida
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Faltan campos requeridos en la solicitud"
 *        500:
 *          description: Error interno del servidor
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Error al crear el estudiante"
 *                  error:
 *                    type: string
 *                    example: "Detalles del error interno"
 */

// Ruta POST para crear un nuevo estudiante
studentRouter.post("/alumnos", async (req, res) => {
  try {
    const result = await createNewStudent(req); // Llamar a la función para crear un nuevo estudiante
    res.status(200).json(result); // Devolver el resultado de la creación
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error al crear el estudiante",
      error: err.message,
    });
  }
});



/**
 * @swagger
 * /alumnos/{id}:
 *    put:
 *      tags:
 *        - Estudiantes
 *      summary: Editar un estudiante por su id
 *      description: Editar los datos de un estudiante mediante su id
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID del estudiante a editar
 *          schema:
 *            type: integer
 *            example: 1
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                nombre:
 *                  type: string
 *                  example: "Ana"
 *                apellidoPaterno:
 *                  type: string
 *                  example: "García"
 *                apellidoMaterno:
 *                  type: string
 *                  example: "Lopez"
 *                carrera:
 *                  type: string
 *                  example: "Ingeniería Industrial"
 *              required:
 *                - nombre
 *                - apellidoPaterno
 *                - apellidoMaterno
 *                - carrera
 *      responses:
 *        200:
 *          description: Estudiante actualizado correctamente
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Estudiante actualizado correctamente"
 *                  estudianteActualizado:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        example: 1
 *                      nombre:
 *                        type: string
 *                        example: "Ana"
 *                      apellidoPaterno:
 *                        type: string
 *                        example: "García"
 *                      apellidoMaterno:
 *                        type: string
 *                        example: "Lopez"
 *                      carrera:
 *                        type: string
 *                        example: "Ingeniería Industrial"
 *        400:
 *          description: Solicitud inválida
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Todos los campos son requeridos para actualizar el estudiante"
 *        500:
 *          description: Error interno del servidor
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Error al actualizar el estudiante"
 *                  error:
 *                    type: string
 *                    example: "Detalles del error interno"
 */

// Ruta PUT para actualizar un estudiante
studentRouter.put("/alumnos/:id", async (req, res) => {
  const { id } = req.params; // ID del estudiante a actualizar
  const { nombre, apellidoPaterno, apellidoMaterno, carrera } = req.body;

  // Validar que todos los campos requeridos estén presentes
  if (!nombre || !apellidoPaterno || !apellidoMaterno || !carrera) {
    return res.status(400).json({
      message: "Todos los campos son requeridos para actualizar el estudiante",
    });
  }

  try {
    // Actualizar al estudiante en la base de datos
    const result = await updateStudent(id, { nombre, apellidoPaterno, apellidoMaterno, carrera });
    res.json({
      message: "Estudiante actualizado correctamente",
      estudianteActualizado: result,
    });
  } catch (err) {
    res.status(500).json({ 
      message: "Error al actualizar el estudiante", 
      error: err.message 
    });
  }
});



export default studentRouter;
