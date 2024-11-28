# API de Estudiantes

Esta API permite gestionar estudiantes, incluyendo agregar información como el número de control, nombre, carrera y foto.

## Endpoints

### Crear Estudiante

**POST** `/estudiantes`

- Crea un nuevo estudiante.
- Requiere los siguientes campos:
  - `numero_control` (string)
  - `nombre` (string)
  - `apellido_paterno` (string)
  - `apellido_materno` (string)
  - `carrera` (string)
  - `foto` (archivo de imagen)

### Documentación

La documentación de la API está disponible en [Swagger UI](http://localhost:5000/api-docs).