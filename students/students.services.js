import { promisePool } from "../connection.js";
export async function getAllStudents() {
  try {
    const result = await promisePool.query("select * from estudiantes");
    return result;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getStudentById(id) {
  try {
    const result = await promisePool.query(
      "SELECT * FROM estudiantes WHERE id = ?",
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
      "DELETE FROM estudiantes WHERE id = ?",
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
      `INSERT INTO estudiantes VALUES (null,'${nombre}', '${apellido_materno}', '${apellido_paterno}')`
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
    const sql = "UPDATE estudiantes SET ? WHERE id = ?";
    const result = await promisePool.query(sql, [updateFields, id]);
    return result;
  } catch (err) {
    throw new Error(err);
  }
}