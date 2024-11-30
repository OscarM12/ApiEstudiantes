import { promisePool } from "../connection.js";

export async function getAllStudents() {
  try {
    const [rows] = await promisePool.query("SELECT * FROM estudiantes");
    return rows;  // Asegúrate de que `rows` es un array con los resultados
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

export async function createNewStudent(req, res) {
  try {
    // Verifica qué está llegando en el cuerpo de la solicitud
    console.log('Cuerpo de la solicitud:', req.body);

    // Verifica si req.body está vacío
    if (!req.body) {
      return res.status(400).json({ message: "Cuerpo de la solicitud vacío" });
    }

    // Desestructuración de los campos que se esperan en el cuerpo de la solicitud
    const { numControl, nombre, apellido_paterno, apellido_materno, carrera, fotografia } = req.body;

    // Verifica si alguno de los campos está ausente
    if (!numControl || !nombre || !apellido_paterno || !apellido_materno || !carrera || !fotografia) {
      return res.status(400).json({ message: "Faltan campos en la solicitud" });
    }

    // Inserta los datos en la base de datos
    const result = await promisePool.query(
      `INSERT INTO estudiantes (numControl, nombre, apellido_paterno, apellido_materno, carrera, fotografia) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [numControl, nombre, apellido_paterno, apellido_materno, carrera, fotografia]
    );

    // Devuelve el resultado de la inserción
    return res.status(200).json({ message: 'Estudiante creado exitosamente', result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error al crear el estudiante', error: err.message });
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