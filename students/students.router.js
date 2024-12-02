import { Router } from "express";
import express from 'express';
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
 *          description: Regresa un Json con todos los usuarios
 */
studentRouter.get('/', (req, res) => {
  req.getConnection((err, connection) => {
      if (err) return res.status(500).send(err);

      connection.query('SELECT * FROM estudiantes', (err, results) => {
          if (err) return res.status(500).send(err);

          res.json(results);
      });
  });
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
 *              required:
 *                - numControl
 *                - nombre
 *                - apellidoPaterno
 *                - apellidoMaterno
 *                - carrera
 *      responses:
 *        200:
 *          description: Creación de un nuevo estudiante
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
 *              required:
 *                - nombre
 *                - apellidoPaterno
 *                - apellidoMaterno
 *                - carrera
 *      responses:
 *        200:
 *          description: Se edita un estudiante en específico
 */
// Ruta PUT para actualizar un estudiante
studentRouter.put("/alumnos/:id", async (req, res) => {
  const { id } = req.params; // Obtener el id del estudiante desde la URL
  const { nombre, apellidoPaterno, apellidoMaterno, carrera } = req.body; // Obtener los campos a actualizar desde el cuerpo de la solicitud

  try {
    // Llamar a la función para actualizar el estudiante, pasando el id y los campos a actualizar
    const result = await updateStudent(id, { nombre, apellidoPaterno, apellidoMaterno, carrera });
    res.json(result); // Devolver el resultado de la actualización
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar el estudiante", error: err.message });
  }
});


export default studentRouter;
