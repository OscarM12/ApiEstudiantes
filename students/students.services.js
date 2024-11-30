import { promisePool } from "../connection.js";

// Obtener todos los estudiantes
export async function getAllStudents() {
  try {
    const [rows] = await promisePool.query("SELECT * FROM estudiantes");
    return rows;
  } catch (err) {
    throw new Error(err);
  }
}

// Obtener un estudiante por su id
export async function getStudentById(id) {
  try {
    const [rows] = await promisePool.query(
      "SELECT * FROM estudiantes WHERE id = ?",
      [id]
    );
    return rows;
  } catch (error) {
    throw new Error(error);
  }
}

// Eliminar un estudiante por su id
export async function deleteStudentById(id) {
  try {
    const [result] = await promisePool.query(
      "DELETE FROM estudiantes WHERE id = ?",
      [id]
    );
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

// Crear un nuevo estudiante
export async function createNewStudent(req) {
  try {
    const { numControl, nombre, apellido_materno, apellido_paterno, carrera, fotografia } = req.body;

    // Verificar si todos los campos necesarios están presentes
    if (!numControl || !nombre || !apellido_materno || !apellido_paterno || !carrera) {
      throw new Error('Faltan campos requeridos');
    }

    // Usar parámetros preparados para evitar inyecciones SQL
    const sql = `INSERT INTO estudiantes (numControl, nombre, apellidoPaterno, apellidoMaterno, carrera, fotografia) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
    const [result] = await promisePool.query(sql, [numControl, nombre, apellido_materno, apellido_paterno, carrera, fotografia]);
    
    return { id: result.insertId, numControl, nombre, apellido_materno, apellido_paterno, carrera, fotografia };
  } catch (err) {
    throw new Error("Error al crear el estudiante: " + err.message);
  }
}

// Actualizar un estudiante
export async function updateStudent(req) {
  try {
    const { id } = req.params;
    const { numControl, nombre, apellido_materno, apellido_paterno, carrera, fotografia } = req.body;

    // Verificar que los datos estén presentes antes de hacer la actualización
    if (!numControl || !nombre || !apellido_materno || !apellido_paterno || !carrera) {
      throw new Error('Faltan campos requeridos para actualizar');
    }

    const sql = `UPDATE estudiantes 
                 SET numControl = ?, nombre = ?, apellidoPaterno = ?, apellidoMaterno = ?, carrera = ?, fotografia = ? 
                 WHERE id = ?`;
    const [result] = await promisePool.query(sql, [numControl, nombre, apellido_materno, apellido_paterno, carrera, fotografia, id]);

    if (result.affectedRows === 0) {
      throw new Error('No se encontró el estudiante con ese ID');
    }

    return { id, numControl, nombre, apellido_materno, apellido_paterno, carrera, fotografia };
  } catch (err) {
    throw new Error("Error al actualizar el estudiante: " + err.message);
  }
}
