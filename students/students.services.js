import { promisePool } from "../connection.js";
export async function getAllStudents() {
  try {
    const result = await promisePool.query("SELECT * FROM Alumno");
    return result;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getStudentById(id) {
  try {
    const result = await promisePool.query(
      "SELECT * FROM Alumno WHERE id_alumno = ?",
      [id]
    );
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteStudentById(id) {
  try {
    const result = await promisePool.query(
      "DELETE FROM Alumno WHERE id_alumno = ?",
      [id]
    );
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export async function createNewStudent(req) {
  try {
    const { nombre, apellido_materno, apellido_paterno } = req.body;
    const result = await promisePool.query(
      `INSERT INTO Alumno VALUES (null,'${nombre}', '${apellido_materno}', '${apellido_paterno}')`
    );
    return result;
  } catch (err) {
    throw new Error(err);
  }
}

export async function updateStudent(req) {
  try {
    const { id } = req.params;
    const updateFields = req.body;
    const sql = "UPDATE Alumno SET ? WHERE id_alumno = ?";
    const result = await promisePool.query(sql, [updateFields, id]);
    return result;
  } catch (err) {
    throw new Error(err);
  }
}