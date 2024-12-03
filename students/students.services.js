import { promisePool } from "../connection.js";

// students.services.js

import { db } from '../config.js';  // Suponiendo que tienes una conexión a la base de datos

export const getAllStudents = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM estudiantes");  // Consulta a la base de datos
    return rows;  // Retorna todos los estudiantes
  } catch (err) {
    throw new Error("Error al obtener los estudiantes");
  }
};



// Obtener un estudiante por su numControl
export async function getStudentById(numControl) {
  try {
    const result = await promisePool.query(
      "SELECT * FROM estudiantes WHERE id= ?",
      [numControl]
    );
    return result;
  } catch (err) {
    throw new Error(err);
  }
}

// Eliminar un estudiante por su numControl
export async function deleteStudentById(numControl) {
  try {
    const result = await promisePool.query(
      "DELETE FROM estudiantes WHERE id = ?",
      [numControl]
    );
    return result;
  } catch (err) {
    throw new Error(err);
  }
}

// Crear un nuevo estudiante
export async function createNewStudent(req) {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { numControl, nombre, apellidoPaterno, apellidoMaterno, carrera } = req.body;

    // Verificar que todos los campos requeridos estén presentes
    if (!numControl || !nombre || !apellidoPaterno || !apellidoMaterno || !carrera) {
      throw new Error("Faltan campos en la solicitud");
    }

    // Realizar la consulta para insertar el nuevo estudiante
    const result = await promisePool.query(
      `INSERT INTO estudiantes (numControl, nombre, apellidoPaterno, apellidoMaterno, carrera) 
      VALUES (?, ?, ?, ?, ?)`,
      [numControl, nombre, apellidoPaterno, apellidoMaterno, carrera]
    );
    return result; // Devolver el resultado de la consulta (inserción)
  } catch (err) {
    throw new Error(err.message); // Manejar los errores
  }
}



// Actualizar los datos de un estudiante
export async function updateStudent(id, updateFields) {
  try {
    // Verificar que haya al menos un campo a actualizar
    if (!updateFields.nombre && !updateFields.apellidoPaterno && !updateFields.apellidoMaterno && !updateFields.carrera) {
      throw new Error("No hay campos para actualizar");
    }

    // Realizar la consulta de actualización usando el id
    const sql = "UPDATE estudiantes SET ? WHERE id = ?";
    const result = await promisePool.query(sql, [updateFields, id]);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
}

