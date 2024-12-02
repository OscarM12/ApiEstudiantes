# API de Estudiantes

Esta API permite gestionar información de estudiantes, incluyendo agregar, consultar, actualizar y eliminar registros. Está diseñada para facilitar la administración de datos como el número de control, nombre, carrera y foto.

## Tabla de Contenidos

- [Características](#características)
- [Endpoints](#endpoints)
  - [Crear Estudiante](#crear-estudiante)
  - [Consultar Todos los Estudiantes](#consultar-todos-los-estudiantes)
  - [Consultar Estudiante por ID](#consultar-estudiante-por-id)
  - [Actualizar Estudiante](#actualizar-estudiante)
  - [Eliminar Estudiante](#eliminar-estudiante)
- [Documentación](#documentación)
- [Instalación y Uso](#instalación-y-uso)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Licencia](#licencia)

## Características

- **CRUD completo**: Crea, consulta, actualiza y elimina información de estudiantes.
- **Soporte de JSON**: Los datos se envían y reciben en formato JSON.
- **Documentación interactiva**: Disponible en Swagger UI para probar todos los endpoints.

## Endpoints

### Crear Estudiante

**POST** `/estudiantes`

- **Descripción**: Crea un nuevo estudiante.
- **Campos requeridos**:
  - `numero_control` (string)
  - `nombre` (string)
  - `apellido_paterno` (string)
  - `apellido_materno` (string)
  - `carrera` (string)
- **Ejemplo de Request**:

```json
{
  "numero_control": "19100220",
  "nombre": "Juan",
  "apellido_paterno": "Pérez",
  "apellido_materno": "Ramón",
  "carrera": "Sistemas"
}
